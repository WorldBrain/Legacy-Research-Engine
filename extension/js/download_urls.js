var initial = document.body.parentNode.innerHTML;
var get_text = require('./html.js')

//open list of already indexed urls from local storage
var existing_urls = JSON.parse(localStorage['list_downloaded_urls']);
var isAbortedByUser = false;    

// activiator in case user cancelles download
document.getElementById('abort_button').addEventListener("click", function(){
    isAbortedByUser = true;
    document.getElementById('abort_button').remove();
    restartPlugin();
});


function downloadUtil(download_items, index) {   

    // Process that runs, as soon as all urls from the list have been processed/downloaded
    if(parseInt(index) === download_items.length) {
        console.log('Finished Downloading ' + parseInt(index) + ' items');

        // updating list of existing urls and storing it to local storage
        localStorage.setItem('list_downloaded_urls', index);
        localStorage['list_downloaded_urls'] = JSON.stringify(existing_urls);

        //changing information on downloaded_history.html AFTER succesfully working through list
        document.getElementById('abort_button').remove();
        document.getElementById("title_download").innerHTML = "Success! Your History is imported!";
        document.getElementById("close_message").innerHTML = "To rebuild the search index with the new entries, THE EXTENSION RESTARTS IN 10 SECONDS.";
        document.getElementById("info_text").innerHTML = '';
        restartPlugin();
    }


    else {

        var xhttp = new XMLHttpRequest();

        // check if user cancelled download
        xhttp.onreadystatechange = function() {
            if (isAbortedByUser == true) {
                localStorage['list_downloaded_urls'] = JSON.stringify(existing_urls);
                document.getElementById("title_download").innerHTML = "Download Stopped!";
                document.getElementById("close_message").innerHTML = "The extension will RESTART in 10 SECONDS. You can always resume your download via the settings.";
                document.getElementById("info_text").innerHTML = '';
                console.log("Download Stopped")
            }

            // if not, continue with download
            else {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    
                    //callback nesting to extract the content from xhttp request
                    try {       
                        getcontent(xhttp, function(page_text,page_title){    
                            // build the message that is sent to the "handleMessage"-function that stores it to DB           
                             build_data(page_text,page_title,download_items, function(data){
                                handleMessage(data,null,null);
                             })
                        
                        });
                        //adding Url to list of already downloaded items.
                        existing_urls.push(download_items[index].url);

                    } catch (err) {
                        console.log('Download failed!: ' + err.message +': ' + download_items[index].url);
                        localStorage['list_downloaded_urls'] = JSON.stringify(existing_urls);
                        existing_urls = JSON.parse(localStorage['list_downloaded_urls']);
                    }
                    downloadUtil(download_items, index + 1);
                } 

                else if (xhttp.readyState == 4 && xhttp.status != 200) {
                    downloadUtil(download_items, index + 1);
                    
                }      
            }    
    

        };
        xhttp.ontimeout = function() {
            console.log('Timeout!!');
            downloadUtil(download_items, index + 1);
        }
        xhttp.open('GET', download_items[index].url, true);
        xhttp.send();

        function build_data(page_text,page_title,download_items,callback){
            data = {
                        msg: 'pageContent',
                        time: download_items[index].lastVisitTime,
                        url: download_items[index].url,
                        text: page_text,
                        title: page_title
                    }
            callback(data)
        };

    }
}

// combines the lists of bookmarks with the lists of history items and removes duplicates
function gather_urls(callback){
    get_history(function(result1){
        var history_items = result1;
        get_bookmarks(function(result2){
            var bookmarks_items = result2;
            var history_bookmarks_items = _.unionBy(bookmarks_items, history_items);
            callback(history_bookmarks_items)    
        })
    })
};

//starts the actual download process of the combined list (gather_urls())
function start_download(){
    gather_urls(function(result){
        downloadUtil(result, 0);
    })
};


// selection function for history. Is true, if checkbox for history is active in analyse_urls.html
function get_history_checked(callback){
    var checked = localStorage.getItem('checkbox_history')
    localStorage.setItem('checkbox_history',false);
    callback(checked)
}


// selection function for bookmarks. Is true, if checkbox for bookmarks is active in analyse_urls.html
function get_bookmarks_checked(callback){
    var checked = localStorage.getItem('checkbox_bookmarks')
    localStorage.setItem('checkbox_bookmarks',false);
    callback(checked)
}



//gets the history in case get_history_checked = true
function get_history(callback){ 
    get_history_checked(function(checked_h){
        checked=checked_h
            if (checked=="true"){
                chrome.storage.local.get('history', function(result) {
                var history_items = JSON.parse(result.history);        
                callback(history_items)
                })
            }
            else {
                var history_items=[]
                callback(history_items)
            
            }
    
    })
};

//gets the bookmarks in case get_bookmarks_checked = true
function get_bookmarks(callback){
    get_bookmarks_checked(function(checked_b){
        var checked = checked_b

            if (checked=="true"){
                chrome.storage.local.get('bookmarks', function(result) {
                var bookmarks_items = JSON.parse(result.bookmarks);
                callback(bookmarks_items)
                })
            }
            else {
                var bookmarks_items = []
                callback(bookmarks_items)
            }
    })   

};

//function to get the content of a page that is received via a XMLHTTPrequest. 
function getcontent(xhttp,callback){
 //requesting HTML code of URL and converting it into DOM tree
        url_html = xhttp.responseText;
        var doc = document.implementation.createHTMLDocument();
        doc.documentElement.innerHTML = url_html
        page_title = doc.title

        // get all visible text from HTML file
        get_text.extractFromText(url_html, function(err,text){
          var page_text=text
          callback(page_text, page_title)
        })

}


// restarts the plugin after download, so that index can be rebuilt. 
function restartPlugin(){
    setTimeout(function(){
    chrome.runtime.reload()}, 15000);
};


document.body.onload = start_download();
