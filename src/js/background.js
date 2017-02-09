var MILLIS_BEFORE_CLEAR = 1000 * 60; // 60 seconds
var CLEAR_DELAY = 20000;
var MAX_URL_LEN_SHOWN = 50;
var LT = function(a,b) {return a < b};
var GT = function(a,b) {return a > b};
var LT_OBJ = function(a,b) {
    return a.time < b.time;
}

var db

function ValidURL(text) {
    var valid = /((https?):\/\/)?(([w|W]{3}\.)+)?[a-zA-Z0-9\-\.]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?/
    return valid.test(text);
}

chrome.omnibox.onInputChanged.addListener(omnibarHandler);
chrome.omnibox.onInputEntered.addListener(acceptInput);
chrome.runtime.onMessage.addListener(handleMessage);
chrome.runtime.onInstalled.addListener(function (object) {
    chrome.storage.local.get("shouldOpenTab", function(item) {
        if (Object.keys(item).length == 0) {
            chrome.tabs.create({url: "assets/about.html"}, function (tab) {
            });
            chrome.storage.local.set({"shouldOpenTab": {"dontShow": true}})
        }
    })
});

function acceptInput(text, disposition) {
    // disposition: "currentTab", "newForegroundTab", or "newBackgroundTab"
    if (!ValidURL(text)) {
        return;
    }
    switch (disposition) {
    case "currentTab":
        chrome.tabs.update({url: text});
        break;
    case "newForegroundTab":
        chrome.tabs.create({url: text});
        break;
    case "newBackgroundTab":
        chrome.tabs.create({url: text, active: false});
        break;
    }
}

function init() {

    db = new PouchDB('main')
    // db.plugin()
    var remoteCouch = false;
    db.search({
        fields: ['title','url','text'],
        build: true
    }).then(function (info) {
        // if build was successful, info is {"ok": true}
    }).catch(function (err) {
        // handle error
        console.log(err);
    });
    transferToPouch();
    chrome.storage.local.get(['blacklist', 'preferences'], function(items) {
        var obj = items['blacklist'];
        if (obj === undefined || !('PAGE' in obj && 'SITE' in obj && 'REGEX' in obj)) {
            window.blacklist = {'PAGE':[], 'REGEX':[], 'SITE':[]}; // show example in page
            chrome.storage.local.set({'blacklist':blacklist});
        } else {
            window.blacklist = obj;
        }

        var obj = items['preferences'];
        if (obj === undefined) {
            window.preferences = {};
            chrome.storage.local.set({'preferences':preferences});
        } else {
            window.preferences = obj;
        }
    });
}

function transferToPouch() {
    var count = 0;
    var keys = null;
    chrome.storage.local.get(null, function(results) {
            keys = Object.keys(results);
            for (var i = 0 ; i < keys.length ; i++)
                if(keys[i] != "index" &&
                        keys[i] != "blacklist" &&
                        keys[i] != "preferences" &&
                        keys[i] != "shouldOpenTab")
                    count += store_url(results[keys[i]]);
        }
    );
    console.log('Successfully stored ' + count.toString() + ' / ' + (keys.length - 4).toString() + ' items to PDB');
}

function handleMessage(data, sender, sendRespones) {
    // data is from message
    if (data.msg === 'pageContent' && shouldArchive(data)) {
        delete data.msg;
        data.text = processPageText(data.text);
        //console.log("TEST"+ data.text)
        var time = data.time;
        var keyValue = {};
        keyValue[time] = data;
        chrome.storage.local.set(keyValue, function() {
            console.log("Stored: " + data.url);
        });


        store_url(data);
        //show_url()

        timeIndex.push(time.toString());
        preloaded.push(data);
        chrome.storage.local.set({'index':{'index':timeIndex}});

        //Add to list of not indexing anymore
        var existing_urls = [];
        if (localStorage.getItem('list_downloaded_urls') == null){
                localStorage['list_downloaded_urls'] = JSON.stringify([]);
                var existing_urls = JSON.parse(localStorage.getItem('list_downloaded_urls'));
            }
        else {
            var existing_urls = JSON.parse(localStorage.getItem('list_downloaded_urls'))
        };
        existing_urls.push(data.url);
        localStorage['list_downloaded_urls'] = JSON.stringify(existing_urls);
        //search_pouch('test')
    } else if (data.msg === 'setPreferences') {
        preferences = data.preferences;
        chrome.storage.local.set({'preferences':preferences});
    } else if (data.msg === 'setBlacklist') {
        blacklist = data.blacklist;
        chrome.storage.local.set({'blacklist':blacklist});
    }
}

function store_url(data) {
    var item = {
        _id: data.time.toString(),
        title: data.title,
        text: data.text,
        LastVisitTime: data.time,
        url: data.url,
    };
    db.put(item, function callback(err, result) {
        if (!err) {
            console.log('Successfully stored the page: ' + data.url);
            return 1;
        } else {
            console.log('Error ' + err + ' on URL: ' + data.url)
            return 0;
        }
    });
}

function search_pouch(query, text, cb, suggestCb) {


    for(var i = 0 ; i < query.keywords.length ; i++)
        if(query.keywords[i].length == 0)
            query.keywords.splice(i, 1)
    // Regular search through PouchDB
    db.search({
        query: query.text,
        fields: ['title','url','text'],
        include_docs: true,
        build: false
    }).then(function (res) {

        var results = [];
        for(var i = 0; i < res.rows.length ; i++) {
            var doc = res.rows[i];
            if (query.before != false) {
                if (doc.doc.LastVisitTime <= query.before.getTime() && doc.doc.LastVisitTime >= query.after.getTime())
                    results.push(doc);
            }
            else if (doc.doc.LastVisitTime >= query.after.getTime())
                results.push(doc);
        }

        // If Minuswords are entered in the query
        var final_results = [];
        if(query.negative.length > 0) {

        	//calculating the precision, if more than 1 minus word is entered: https://github.com/nolanlawson/pouchdb-quick-search#minimum-should-match-mm
        	var full_percent = 100
        	divisor = query.negative.length
        	var mm = 100 / divisor + "%"

        	// searching for two minus words
        	query.negative= query.negative.join(" ")
            db.search({
                query: query.negative,
                fields: ['title','url','text'],
                mm: mm,
                include_docs: true,
                build: false
            }).then(function (res_negative) {
                for(var i = 0 ; i < res.rows.length ; i++) {
                    var flag = 0;
                    for(var j = 0 ; j < res_negative.rows.length ; j++) {
                        if(res.rows[i].id === res_negative.rows[j].id)
                            flag = 1;
                    }
                    if(flag === 0)
                        final_results.push(res.rows[i]);
                }
                return suggestionsComplete(final_results, query.shouldDate, suggestCb);
            });
        } else {
            final_results = results;
        }
        if(final_results.length > 0)
            return suggestionsComplete(final_results, query.shouldDate, suggestCb);
    }).catch(function (err) {
        console.log(err)
    });
}

function omnibarHandler(text, suggest) {
    dispatchSuggestions(text, suggestionsComplete, suggest);
}

function suggestionsComplete(suggestions, shouldDate, suggestCb) {
    var res = [];
    var i;
    for (i = 0; i < suggestions.length; i++) {
        var elem = suggestions[i];
        var urlToShow = elem.doc.url;
        if (urlToShow.length >= MAX_URL_LEN_SHOWN) {
            urlToShow = urlToShow.substring(0,47) + '...';
        }
        var description = "<url>" + escape(urlToShow) + "</url> "
        var date = new Date(elem.doc.LastVisitTime);
        var hour = date.getHours();
        var minutes = date.getMinutes();
        if (hour > 12) {
            hour -= 12;
            if (hour === 12) {
                hour = hour.toString + ":" + minutes + 'am';
            } else {
                hour = hour.toString() + ":" + minutes + "pm";
            }
        } else {
            if (hour === 12) {
                hour = hour.toString() + "pm";
            } else {
                hour = hour.toString() + "am";
            }
        }

        var fmt =  (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getUTCFullYear().toString().substring(2,4);
        if (shouldDate) {
            description += ':: <match>' + escape(fmt + " " + hour) +'</match> ';
        } else {
            description += ':: ' + escape(fmt) + ' ';
        }

        description += '- ' + escape(elem.doc.title);
        res.push({content:elem.doc.url, description:description});
    }
    if (res.length > 0) {
        chrome.omnibox.setDefaultSuggestion({description: "Select an option below"});
    } else {
        chrome.omnibox.setDefaultSuggestion({description: "No results found"})
    }
    suggestCb(res);
}

function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

function shouldArchive(data) {
    // blacklist =  {"REGEX", "PAGE", "SITE"}
    //var custom = JSON.parse(localStorage.getItem('blacklist_def'));
    var site = blacklist["SITE"];
    var page = blacklist["PAGE"];
    var regex = blacklist["REGEX"];
    var url = data.url.replace("http://",  "").replace("https://", "");
    //console.log(custom)
    // for (var i=0; i<custom.length; i++){
    //     if (url.match("chrome/newtab?") !=null) {
    //         return false;
    //     }
    //     else if (url.match(custom[i]) != null) {
    //     console.log("blacklisted website, not stored: ", url)
    //     return false;
    //     }
    // }
    for (var i = 0; i < site.length; i++) {
        // var reg = new RegExp(escapeRegExp(page[i]) + ".*");
        if (url.indexOf(site[i].replace("http://",  "").replace("https://", "")) != -1) {
            return false;
        }
    }

    for (var i = 0; i < page.length; i++) {
        if (cleanURL(data.url).indexOf(page[i].replace("http://",  "").replace("https://", ""))) {
            return false;
        }
    }

    for (var i = 0; i < regex.length; i++) {
        if (url.match(regex[i]) != null) {
            return false;
        }
    }

    return true;
}

function makeSuggestions(query, candidates, cb, suggestCb) {
    var res = [];
    var urls = {};
    var keywords = query.keywords;
    console.log(candidates);
    var keywordsLen = keywords.length;
    var negative = query.negative;
    var negativeLen = negative.length;
    var j = 0;
    for (var i = candidates.length - 1; i > -1; i--) {
        var text = candidates[i].doc.text;
        var isMatching = true;
        for (var k = 0; k < negativeLen; k++) {
            if (text.indexOf(negative[k]) > -1) {
                isMatching = false;
            }
        }

        if (isMatching) {
            for (var k = 0; k < keywordsLen; k++) {
                if (text.indexOf(keywords[k]) === -1) {
                    isMatching = false;
                    break;
                }
            }

            if (isMatching) {
                var cleanedURL = cleanURL(candidates[i].doc.url);
                if (!(cleanedURL in urls)) {
                    res.push(candidates[i]);
                    urls[cleanedURL] = true;
                    j += 1;
                    if (j === 6) {
                        break;
                    }
                }
            }
        }
    }

    cb(res,query.shouldDate,suggestCb);
}

function cleanURL(url) {
    return url.trim().replace(/(#.+?)$/, '');
}


// Early work on pouchDB search implementation
function dispatchSuggestions(text, cb, suggestCb){
    var query = makeQueryFromText(text);
    if (query.before !== false && query.after !== false && query.after >= query.before) return;

    query.keywords.sort(function(a,b){return b.length-a.length});
    // console.log(query);
    search_pouch(query, text, cb, suggestCb);
}

init();
