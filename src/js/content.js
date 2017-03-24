window.setTimeout((function(){
    var epochTime = (new Date()).getTime();
    var url = window.location.href;
    /*var nlparser = new NLParser()
    var docString = document.documentElement.cloneNode(deep=true).outerHTML
    var relText = document.body.innerText
    if(!((window.location.protocol + "//" + window.location.host + "/") === url)) {
        relText = nlparser.getRelevantText(docString)
        if (!relText) {
            relText = document.body.innerText
        }
        }*/

    // CHECK IF PDF
    if (url.includes(".pdf") === true){
        openPDF(url,epochTime)
        }

    // IF NOT, GET CONTENT VIA BROWSER AND STORE IT
    else {
        chrome.runtime.sendMessage({
        "msg":'pageContent',
        "time": epochTime,
        "url": url,
        "text": document.body.innerText, //relText,
        "title": document.title,
    });}
}), 1000)


