chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
        try{
        // Fires only when tab and changeinfo are loaded
        if(tab.url && changeInfo.url){
		        chrome.tabs.executeScript(tabId, { file: '/js/content.js'});
            }   
        }
        catch(e){}
});



