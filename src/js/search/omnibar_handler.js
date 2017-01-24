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


function omnibarHandler(text, suggest) {
    dispatchSuggestions(text, suggestionsComplete, suggest);
}

function suggestionsComplete(suggestions, shouldDate, suggestCb) {
    var res = [];
    var i;
    for (i = 0; i < suggestions.length; i++) {
        var elem = suggestions[i];
        var urlToShow = elem.url;
        if (urlToShow.length >= MAX_URL_LEN_SHOWN) {
            urlToShow = urlToShow.substring(0,47) + '...';
        }
        var description = "<url>" + escape(urlToShow) + "</url> "
        var date = new Date(elem.time);
        var hour = date.getHours();
        if (hour > 12) {
            hour -= 12;
            if (hour === 12) {
                hour = hour.toString + 'am';
            } else {
                hour = hour.toString() + "pm";
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
            description += ':: <match>' + escape(fmt + " " + hour) + '</match> ';
        } else {
            description += ':: ' + escape(fmt) + ' ';
        }

        description += '- ' + escape(elem.title);
        res.push({content:elem.url, description:description});
    }
    if (res.length > 0) {
        chrome.omnibox.setDefaultSuggestion({description: "Select an option below"});
    } else {
        chrome.omnibox.setDefaultSuggestion({description: "No results found"})
    }
    suggestCb(res);
    window.setTimeout(clearCache, CLEAR_DELAY);
}


function makeSuggestions(query, candidates, cb, suggestCb) {
    var res = [];
    var urls = {};
    var keywords = query.keywords;
    //console.log(keywords)
    var keywordsLen = keywords.length;
    var negative = query.negative;
    var negativeLen = negative.length;
    var j = 0;
    for (var i = candidates.length - 1; i > -1; i--) {
        var text = candidates[i].text;
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
                var cleanedURL = cleanURL(candidates[i].url);
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


function dispatchSuggestions(text, cb, suggestCb) {
    var query = makeQueryFromText(text);
    query.text = text;
    if (query.before !== false && query.after !== false && query.after >= query.before) return;

    query.keywords.sort(function(a,b){return b.length-a.length});

    if (query.after >= CUTOFF_DATE) {
        var start = Math.floor(binarySearch(preloaded, {'time':+query.after}, LT_OBJ,
                                            GT_OBJ, 0, preloaded.length));
        var end;
        if (query.before) {
            end = Math.ceil(binarySearch(preloaded, {'time':+query.before}, LT_OBJ,
                                         GT_OBJ, 0, preloaded.length));
        } else {
            end = preloaded.length;
        }

        makeSuggestions(query, preloaded.slice(start, end), cb, suggestCb)
    } else {
        var start = Math.floor(binarySearch(timeIndex, +query.after, LT,
                                            GT, 0, timeIndex.length));
        var end;
        if (query.before) {
            end = Math.ceil(binarySearch(timeIndex, +query.before, LT,
                                         GT, 0, timeIndex.length));
        } else {
            end = timeIndex.length;
        }

        window.sorted = [];
        var get = timeIndex.slice(start, end);
        var index = Math.ceil(binarySearch(get, +CUTOFF_DATE, LT, GT, 0, get.length));
        if (index < get.length) {
            sorted = preloaded.slice(0, get.length - index + 1);
        }
        get = get.slice(0,index);

        chrome.storage.local.get(get, function(items) {
            for (var key in items) {
                sorted.push(items[key]);
            }
            sorted.sort(function(a,b) {return a.time - b.time});
            makeSuggestions(query, sorted, cb, suggestCb);
        });
    }
}
