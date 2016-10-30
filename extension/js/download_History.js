var initial = document.body.parentNode.innerHTML;
function downloadHistoryUtil(history_items, index) {
    if(parseInt(index) === history_items.length) {
        console.log('Finished Downloading ' + parseInt(index) + ' items');
        localStorage.setItem('downloaded_history_items', index);
        document.getElementById("title_download").innerHTML = "Success! Your History is imported!";
        document.getElementById("close_message").innerHTML = "You can close this window now.";
        document.getElementById("info_text").innerHTML = '<p>To activate the search, just type "w" + space + your keyword into the address bar.</p>';
        return;
    }
    else {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                try {
                    url_html = xhttp.responseText;
                    var doc = document.implementation.createHTMLDocument();
                    doc.documentElement.innerHTML = url_html

                    body_text = doc.body

                    divs = body_text.getElementsByTagName('div')

                    //console.log(divs)
                    var page_text = ""

                        for (i = 0; i< divs.length; i++) {
                        //console.log(divs[i].textContent)
                                page_text += divs[i].textContent

                        }
                    page_title = doc.title

                    data = {
                        msg: 'saveHistory',
                        time: history_items[index].lastVisitTime,
                        url: history_items[index].url,
                        text: page_text,
                        title: page_title
                    }
                    handleMessage(data, null, null);
                } catch (err) {
                    console.log('Download failed!: ' + err.message);
                }
                downloadHistoryUtil(history_items, index + 1);
            } else if (xhttp.readyState == 4 && xhttp.status != 200) {
                downloadHistoryUtil(history_items, index + 1);
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

document.body.onload = downloadHistory();

// we need to delete every url that has been already indexed so when people abort it, they dont carwl the whole thing again. 
// not started automatically
// maybe updating manifest.js for more relaxed security

