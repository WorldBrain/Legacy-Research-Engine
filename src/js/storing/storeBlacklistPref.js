(function() {
    var allPageDisplay = null;

    // add element to the custom blacklist 
    //TODO: check if element is already there before adding. 
    var add = function(type, content) {
        var tab = document.getElementById("blacklist_tbl")
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

    function cutString(stringToCut) {
        if (stringToCut.length == 0)
            return "No title"
        if (stringToCut.length <= 50)
            return stringToCut
        return stringToCut.slice(0, 50) + "..."
    }

    ///// THIS FUNCTION PROBABLY HAS TO TO BE CALLED RIGHT IN THE BEGINNING, WITHOUT THE OPTIONS PAGE BEING LOADED. 
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


/// HERE ARE THE DOM ELEMENTS
    /*document.getElementById("save").onclick = save;
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


