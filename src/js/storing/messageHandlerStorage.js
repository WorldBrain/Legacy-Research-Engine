function handleMessage(data, sender, sendRespones) {
    // data is from message
    if (data.msg === 'pageContent' && shouldArchive(data)) {
        storeWebsite(data) // is in storing/storeWebsites.js
    } else if (data.msg === 'setPreferences') {
        preferences = data.preferences;
        chrome.storage.local.set({'preferences':preferences});
    } else if (data.msg === 'setBlacklist') {
        blacklist = data.blacklist;
        chrome.storage.local.set({'blacklist':blacklist});
    }
}

/////
///// TODO: Tests + Callbacks + Errorlogging
/////