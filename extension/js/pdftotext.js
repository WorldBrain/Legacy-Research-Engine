
// get pdf via XMLHTTP request
function openPDF(url, epochTime){
var blob = null
var xhr = new XMLHttpRequest()
xhr.open("GET", url)
xhr.responseType = "blob"
xhr.onload = function() 
{
    blob = xhr.response
    getContentPDF(blob, function(pdf_content){
      storePDF(pdf_content, url ,epochTime)
    });
}
xhr.send()
}

// GET PDF TEXT VIA PDF.JS
function getContentPDF(blob, callback) {
      var arrayBuffer;
      var fileReader = new FileReader();
      fileReader.onload = function(a) {
          PDFJS.workerSrc = chrome.extension.getURL('js/pdf.min.worker.js');
          PDFJS.getDocument(a.target.result).then(function(pdf) {
            var items = [];
            var pagesRemaining = pdf.pdfInfo.numPages;
            var totalContent = [];
            var promises = []
            collectContent()
              function collectContent(){
                for(var i = 1; i <= pdf.pdfInfo.numPages; i++) {
                  promises.push(getPageContentForIndex(i, function(content){
                    totalContent.push(content) 
                  }))
                }              
              }
              function getPageContentForIndex(i, callback) {
                return pdf.getPage(i).then(function(page) {
                  return page.getTextContent().then(function(textContent) {
                    var pageContent = textContent.items.map((item) => item.str).join(" ")
                    callback(pageContent)
                  });
                });
              }

            Promise.all(promises).then( function(){
                totalContent = totalContent.join(" ");
                console.log(totalContent)
                callback(totalContent)
            });

          })
        }
  fileReader.readAsArrayBuffer(blob);
}

// STORE PDF VIA HANDLE_MESSAGE FUNCTION IN BACKGROUND.JS
function storePDF(pdf_content, url, epochTime){
    chrome.runtime.sendMessage({
        "msg":'pageContent',
        "time": epochTime,
        "url": url,
        "text": pdf_content, //relText,
        "title": "",
    })};








