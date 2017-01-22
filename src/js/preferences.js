(function() {
    var allPageDisplay = null;

    // add element to the custom blacklist 
    //TODO: check if element is already there before adding. 
    var add = function(type, content) {
        var tab = document.getElementById("blacklist_tbl")
        console.log("TODO: preferences page - understand why row is missing")
        if (!tab) return

        var row = tab.insertRow()
        var stringCell = row.insertCell()
        stringCell.innerHTML = content ? content : "Type your text here"
        stringCell.contentEditable = true
        stringCell.setAttribute("placeholder", "Add a site...");

        var typeCell = row.insertCell()
        var selectCell = document.createElement('select');
        selectCell.innerHTML = '<option value="REGEX">all URLs containing this text</option>'
        selectCell.value = type

        typeCell.appendChild(selectCell);

        var enabledCell = row.insertCell()
        enabledCell.innerHTML = "<input type='checkbox' checked></input>"
        var deleteThisCell = document.createElement("a");
        deleteThisCell.classList = ["delete"];
        deleteThisCell.innerHTML = "Delete"
        deleteThisCell.onclick = function(e) {
            var r = e.target.parentElement.parentElement
            r.parentNode.removeChild(r);
        }
        enabledCell.appendChild(deleteThisCell);

    }


    document.getElementById("restart_text").onclick = restartPlugin
    
    function restartPlugin(){
          chrome.runtime.reload()
        };


    function cutString(stringToCut) {
        if (stringToCut.length == 0)
            return "<em>No title</em>"
        if (stringToCut.length <= 50)
            return stringToCut
        return stringToCut.slice(0, 50) + "..."
    }

    function addHistoricPages(pages) {
        var history_table = document.getElementById("history_tbl")
        console.log("TODO: preferences page -undertand why history_table is not present")
        if(!history_table) return

        for(i in pages) {
            var thisRow = document.createElement("tr")
            var colOne = document.createElement("td")
            colOne.innerText =  cutString(pages[i].title) 
            var colTwo = document.createElement("td")
            colTwo.innerHTML = cutString(pages[i].url).link(pages[i].url)
            thisRow.appendChild(colOne)
            thisRow.appendChild(colTwo)
            var deletePage = document.createElement("td")
            var deleteButton = document.createElement("a")
            deleteButton.classList = ["delete"];
            deleteButton.innerHTML = "Delete"
            deleteButton.onclick = function(e) {
                var r = e.target.parentElement.parentElement
                chrome.storage.local.remove(r.id)
                notie.alert(4, "Page deleted.", 2)
                r.parentNode.removeChild(r)
            }
            deletePage.appendChild(deleteButton)
            thisRow.appendChild(deletePage)
            thisRow.id = pages[i].time;
            history_table.appendChild(thisRow)
        }
    }

    function getHistory(query="") {
        var history_table = document.getElementById("history_tbl")
        console.log("TODO: preferences page -undertand why history_table is not found")
        if (history_table)
            history_table.innerHTML = "<table class='table table-hover' id='history_tbl'></table>"
        
        chrome.storage.local.get(function(results) {
            var allPages = []
            for (key in results) {
                if (!isNaN(key) && (results[key].url + "/" + results[key].title).indexOf(query) > -1) {
                    allPages.push(results[key])
                }
            }
            allPages.reverse()
            allPageDisplay = nextPages(allPages)
            addHistoricPages(allPageDisplay.next().value)
        })
    }

    function* nextPages(allPages){
        while(true)
            yield allPages.splice(0, 20)
    }

    chrome.storage.local.get('blacklist', function(result) {
        var bl = result.blacklist
        if (Object.keys(bl).length > 0 && (bl['REGEX'].length > 0)) {
            var tab = document.getElementById("blacklist_tbl")
            var fields = ["REGEX"]
            for (var j = 0; j < fields.length; j++) {
                for (var i = 0; i < bl[fields[j]].length; i++) {
                    add(fields[j], bl[fields[j]][i])
                }
            }
        } else {
            add("REGEX", "login");
            add("REGEX", "Login");
            add("REGEX", "paypal.com");
            add("REGEX", "chrome-ui://newtab");
            save(false);
        }
    });

    function save(showAlert) {
        var showAlert = (typeof showAlert !== 'undefined') ?  showAlert : true;
        if (showAlert) { notie.alert(4, "Saved Preferences.", 2); }
        var tab = document.getElementById("blacklist_tbl");
        var indices = [];
        for (var i = 1; i < tab.rows.length; i++) {
            var row = tab.rows[i]
            if (row.cells[0].innerText === "") {
                indices.push(i)
            }
        }

        for (var j = indices.length-1; j > -1; j--) {
            tab.deleteRow(indices[j]);
        }



        if (tab.rows.length == 1) {
            chrome.runtime.sendMessage({
                "msg": 'setBlacklist',
                "blacklist": []
            });
            add("SITE", "");
        } else {
            var b = {
                'SITE': [],
                'PAGE': [],
                'REGEX': []
            }
            for(var i = 1; i < tab.rows.length; i++) {
                b[tab.rows[i].cells[1].childNodes[0].value].push(tab.rows[i].cells[0].innerText)
            }

            chrome.runtime.sendMessage({
                "msg": 'setBlacklist',
                "blacklist": b
            })
        }
    }

    function loadMore() {
        addHistoricPages(allPageDisplay.next().value)
    }

    function clearAllData() {
        chrome.storage.local.clear();
        localStorage.removeItem('list_downloaded_urls')
        notie.alert(1, 'Deleted All Data. Restarting WorldBrain...', 2)
        setTimeout(function() {
            chrome.runtime.reload()
        }, 2000);
    }

    function clearRules() {
        chrome.storage.local.get(['blacklist'], function(items) {
            var blacklist = items['blacklist'];
            blacklist['SITE'] = ['chrome-ui://newtab']
            chrome.storage.local.set({'blacklist':blacklist});
        });
        notie.alert(1, 'Deleted Rules. Restarting WorldBrain...', 2)
        setTimeout(function() {
            chrome.runtime.reload()
        }, 2000);
    }

    function clearHistory() {
        chrome.storage.local.get(function(results) {
            var timestaps = results['index']['index'];
            for(key in timestaps){
                chrome.storage.local.remove(timestaps[key]);
            }
            chrome.storage.local.set({'index':{'index':[]}});
        });
        notie.alert(1, 'Deleted History. Restarting WorldBrain...', 2)
        setTimeout(function() {
            chrome.runtime.reload()
        }, 2000);
    }

    getHistory()

    console.log("TODO: preferences page - fix the next ifs ")
    if (document.getElementById("save")) document.getElementById("save").onclick = save;
    if (document.getElementById("add")) document.getElementById("add").onclick = add;
    if (document.getElementById("loadmore")) document.getElementById("loadmore").onclick = loadMore;

    if (document.getElementById("clear")) {   
        document.getElementById("clear").onclick = function () {
            notie.confirm('Are you sure you want to do that?', 'Yes', 'Cancel', function() {
                clearAllData();
            });
        }
    }

    if (document.getElementById("clear-rules")) {   
        document.getElementById("clear-rules").onclick = function () {
            notie.confirm('Are you sure you want to do that?', 'Yes', 'Cancel', function() {
                clearRules();
            });
        }
    }

    if (document.getElementById("clear-history")) { 
        document.getElementById("clear-history").onclick = function () {
            notie.confirm('Are you sure you want to do that?', 'Yes', 'Cancel', function() {
                clearHistory();
            });
        }
    }

    if (document.getElementById("search_history")) { 
        document.getElementById("search_history").onkeyup = function () {
            getHistory(document.getElementById("search_history").value);
        };
    }

})();


