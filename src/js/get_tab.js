chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
		try{
        // Fires only when details.url === currentTab.url
        chrome.tabs.get(tabId, function(tab) {
            if(tab.url === changeInfo.url) {
		        chrome.tabs.executeScript(tabId, { file: '/js/content.js'});
            }
        });}
        catch(e){}
});

chrome.tabs.onCreated.addListener(function(tabId, changeInfo, tab) {
		try{
        // Fires only when details.url === currentTab.url
        chrome.tabs.get(tabId, function(tab) {
            if(tab.url === changeInfo.url) {
		        chrome.tabs.executeScript(tabId, { file: '/js/content.js'});
            }
        });}
        catch(e){}
});
/*
var filter = {urls: ["<all_urls>"]}
var extraInfoSpec = []

chrome.webRequest.onCompleted.addListener(function(details) {
		console.log("start: ", details.method, details)
		try{
        // Fires only when details.url === currentTab.url
        chrome.tabs.get(details.tabId, function(tab) {
            //console.log("updated page: ", details.type)
            if(tab.url === details.url) {
            	//console.log("in the if: ", details.type)
		        chrome.tabs.executeScript(details.tabId, { file: '/js/content.js'});
            }
        });}
        catch(e){}
},filter, extraInfoSpec);*/


