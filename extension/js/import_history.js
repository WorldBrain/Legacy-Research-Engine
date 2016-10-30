function importHistory(){
chrome.history.search({'text': '','maxResults': 200000, 'startTime':0 }, function(history) {
    var history_items = new Array(); 
    for (var i = 0; i < 10 ; i++) { 
            var item = {
                url: history[i].url,
                lastVisitTime: new Date(history[i].lastVisitTime).toISOString()
            }
            history_items.push(item);
    //console.log(history_items.length)    
    }
    console.log("TOTAL ITEMS IN HISTORY:" + history_items.length)    
    chrome.storage.local.set({history: JSON.stringify(history_items)});
    localStorage.setItem('number_urls',history_items.length)

    document.getElementById("amount_urls").innerHTML = history_items.length
    document.getElementById("size_urls").innerHTML = Math.ceil(history_items.length * 100 / 1000)  //100KB and /1000 to convert it into MB
    document.getElementById("time_to_download").innerHTML = Math.ceil(history_items.length * 1 / 3600) // 1 seconds per download /3600 to calculate in hours

  })};

document.getElementById("main").onload = importHistory();

// store item as array key / value pair in localstorage, so we can delete them as soon as they have been indexed
// not automatically loaded!! 