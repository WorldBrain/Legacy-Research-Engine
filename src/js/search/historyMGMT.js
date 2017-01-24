(function() {
    var allPageDisplay = null;

     
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
/*
    document.getElementById("save").onclick = save;
    document.getElementById("add").onclick = add;
    document.getElementById("loadmore").onclick = loadMore;

    document.getElementById("clear").onclick = function () {
        notie.confirm('Are you sure you want to do that?', 'Yes', 'Cancel', function() {
            clearAllData();
        });
    }

    document.getElementById("clear-rules").onclick = function () {
        notie.confirm('Are you sure you want to do that?', 'Yes', 'Cancel', function() {
            clearRules();
        });
    }

    document.getElementById("clear-history").onclick = function () {
        notie.confirm('Are you sure you want to do that?', 'Yes', 'Cancel', function() {
            clearHistory();
        });
    }

    document.getElementById("search_history").onkeyup = function () {
        getHistory(document.getElementById("search_history").value);
    };*/

})();


