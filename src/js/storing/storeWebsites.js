function storeWebsites(data, sender, sendRespones) {
    // data is from message
        delete data.msg;
        data.text = processPageText(data.text);
        //console.log("TEST"+ data.text)
        var time = data.time;
        var keyValue = {};
        keyValue[time] = data;
        chrome.storage.local.set(keyValue, function() {
            console.log("Stored: " + data.url);
        });

        //// function is activated with PouchDB implementation
        //store_url(data);

        if (localStorage.getItem('list_downloaded_urls') == null){
                localStorage['list_downloaded_urls'] = JSON.stringify([]);
                var existing_urls = JSON.parse(localStorage.getItem('list_downloaded_urls'));
            }
        else {
            var existing_urls = JSON.parse(localStorage.getItem('list_downloaded_urls'))
            };
        existing_urls.push(data.url);
        localStorage['list_downloaded_urls'] = JSON.stringify(existing_urls);
}

/////
///// TODO: Tests + Callbacks + Errorlogging
/////