chrome.webNavigation.onHistoryStateUpdated.addListener(function(details){
    if(details.frameId == 0)
        chrome.tabs.executeScript(details.tabId, { file: '/js/content.js'});
});