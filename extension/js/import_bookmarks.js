document.getElementById('checkbox_bookmarks').addEventListener("click", function(){
	var checkbox = document.getElementById('checkbox_bookmarks').checked;
	if(checkbox == true){
		localStorage.setItem('checkbox_bookmarks',true);
	}
	else {
		localStorage.setItem('checkbox_bookmarks',false);
	}
	;})
	
function importBookmarks(){
	chrome.bookmarks.getRecent(100000 , function(bookmarks) {
		var bookmarks_items = new Array();

		//create list of already downloaded urls, if not exists
	    if (localStorage.getItem('list_downloaded_urls')==null){
	            localStorage['list_downloaded_urls'] = JSON.stringify(['','']);
	    };

	    //adding all urls that are new to the list of urls to be downloaded
	    var existing_urls = JSON.parse(localStorage['list_downloaded_urls']); 


	    for (var i = 0; i < bookmarks.length ; i++) {

	    	//var archive_b = shouldArchive(bookmarks[i])

	        if (existing_urls.indexOf(bookmarks[i].url) > -1) {
	            continue;
	            }
	        else {
	            var item = {
	                url: bookmarks[i].url,
	                lastVisitTime: new Date(bookmarks[i].dateAdded).getTime()
	            }
	            bookmarks_items.push(item);
	            //console.log(item)
	        }
		}


		console.log("TOTAL ITEMS IN BOOKMARKS:" + bookmarks_items.length)    
	    chrome.storage.local.set({bookmarks: JSON.stringify(bookmarks_items)});
	    localStorage.setItem('number_bookmarks',bookmarks_items.length)

    //adding amount, time and size estimation to analyse_urls.html
    document.getElementById("amount_urls_bm").innerHTML = bookmarks_items.length
    document.getElementById("size_urls_bm").innerHTML = Math.ceil(bookmarks_items.length * 15 / 1000)  //15KB and /1000 to convert it into MB
    document.getElementById("time_to_download_bm").innerHTML = Math.ceil(bookmarks_items.length * 1.5 / 60) // 1.5 seconds per download /3600 to calculate in hours

  })};

//onpageload start request to chrome history api
document.body.onload = importBookmarks();