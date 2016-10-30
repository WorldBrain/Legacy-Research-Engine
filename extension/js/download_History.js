var initial = document.body.parentNode.innerHTML;

//open list of already indexed urls from local storage
var existing_urls = JSON.parse(localStorage['list_downloaded_urls']);
var abort_status = 0

// activiator in case user cancelles download
document.getElementById('abort_button').onclick = function(){
    abort_status = 1
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
            if (abort_status == 1) {
                localStorage['list_downloaded_urls'] = JSON.stringify(existing_urls);
                //localStorage.setItem('abort_status',0)
                document.getElementById("title_download").innerHTML = "Download cancelled!";
                document.getElementById("close_message").innerHTML = "You can always restart it via the settings.";
                document.getElementById("info_text").innerHTML = '<a href="preferences.html">Go to settings</a>';
                document.getElementById('abort_button').remove()
                console.log("Cancelled Download")
            }

            // if not, continue with download
            else {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    try {

                        //requesting HTML code of URL and converting it into DOM tree
                        url_html = xhttp.responseText;
                        var doc = document.implementation.createHTMLDocument();
                        doc.documentElement.innerHTML = url_html
                        
                        // getting only the content with a div tag (therefore exluding script AND META (unfortunately) tags etc.)
                        // for this whole thing we need a better solution because many divs actually have the same textContent and 
                        //therefore we have things multiple times -> unecessary bloating of file, now ca 150kb, could be 30kb. 
                        body_text = doc.body
                        divs = body_text.getElementsByTagName('div')
                        var page_text = ""
                            for (i = 0; i< divs.length; i++) {
                            //console.log(divs[i].textContent)
                                    page_text += divs[i].textContent
                            }

                        page_title = doc.title

                        //preparing message for storing article to DB      
                        data = {
                            msg: 'saveHistory',
                            time: history_items[index].lastVisitTime,
                            url: history_items[index].url,
                            text: page_text,
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
