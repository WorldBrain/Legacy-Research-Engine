var initial = document.body.parentNode.innerHTML;

//open list of already indexed urls from local storage
var existing_urls = JSON.parse(localStorage['list_downloaded_urls']);
var isAbortedByUser = false;    

// activiator in case user cancelles download
document.getElementById('abort_button').onclick = function(){
    isAbortedByUser = true;
};

function downloadHistoryUtil(history_items, index) {   
    //abort_status = localStorage.getItem('abort_status');
    // Process that runs, as soon as all urls from the lsit have been processed/downloaded
    if(parseInt(index) === history_items.length) {
        console.log('Finished Downloading ' + parseInt(index) + ' items');

        // updating list of existing urls and storing it to local storage
        localStorage.setItem('downloaded_history_items', index);
        localStorage['list_downloaded_urls'] = JSON.stringify(existing_urls);

        //changing information on downloaded_history.html AFTER succesfully working through list
        document.getElementById("title_download").innerHTML = "Success! Your History is imported!";
        document.getElementById("close_message").innerHTML = "You can close this window now.";
        document.getElementById("info_text").innerHTML = '<p>To activate the search, just type "w" + space + your keyword into the address bar.</p>';
    }


    else {

        var xhttp = new XMLHttpRequest();

        // check if user cancelled download
        xhttp.onreadystatechange = function() {
            if (isAbortedByUser == true) {
                localStorage['list_downloaded_urls'] = JSON.stringify(existing_urls);
                document.getElementById("title_download").innerHTML = "Download Stopped!";
                document.getElementById("close_message").innerHTML = "You can always restart it via the settings.";
                document.getElementById("info_text").innerHTML = '<a href="preferences.html">Go to settings</a>';
                document.getElementById('abort_button').remove()
                console.log("Download Stopped")
            }

            // if not, continue with download
            else {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    try {

                        //requesting HTML code of URL and converting it into DOM tree
                        url_html = xhttp.responseText;
                        var doc = document.implementation.createHTMLDocument();
                        doc.documentElement.innerHTML = url_html


                        // Reading out the Title and body of the article
                        var page_title = doc.title

                        var article = readability.grabArticle(doc);
                        var body_text =  readability.getInnerText(article);

                        //TEST log
                        /*console.log("PAGE TITLE" + page_title)
                        console.log(visible);
                        console.log("BODY TEXT" + body_text)*/

                        //preparing message for storing article to DB      
                        data = {
                            msg: 'saveHistory',
                            time: history_items[index].lastVisitTime,
                            url: history_items[index].url,
                            text: body_text,
                            title: page_title
                        }
                        handleMessage(data, null, null);
                        existing_urls.push(history_items[index].url);


                    } catch (err) {
                        console.log('Download failed!: ' + err.message);
                        localStorage['list_downloaded_urls'] = JSON.stringify(existing_urls);
                        existing_urls = JSON.parse(localStorage['list_downloaded_urls']);
                    }
                    downloadHistoryUtil(history_items, index + 1);
                } 

                else if (xhttp.readyState == 4 && xhttp.status != 200) {
                    downloadHistoryUtil(history_items, index + 1);
                    
                }      
            }    
    

        };
        xhttp.ontimeout = function() {
            console.log('Timeout!!');
            downloadHistoryUtil(history_items, index + 1);
        }
        xhttp.open('GET', history_items[index].url, true);
        xhttp.send();
    }
}

function downloadHistory() {
    chrome.storage.local.get('history', function(result) {
        var history_items = JSON.parse(result.history);
        downloadHistoryUtil(history_items, 0);
    });
};

// TODO: Better abort button/

document.body.onload = downloadHistory();
