function shouldArchive(data) {
    // blacklist =  {"REGEX", "PAGE", "SITE"}
    //var custom = JSON.parse(localStorage.getItem('blacklist_def'));     
    var site = blacklist["SITE"];
    var page = blacklist["PAGE"];
    var regex = blacklist["REGEX"];
    var url = data.url.replace("http://",  "").replace("https://", "");
    //console.log(custom)

    // for (var i=0; i<custom.length; i++){
    //     if (url.match("chrome/newtab?") !=null) {
    //         return false;
    //     }

    //     else if (url.match(custom[i]) != null) {
    //     console.log("blacklisted website, not stored: ", url)
    //     return false;
    //     }
    // }

    for (var i = 0; i < site.length; i++) {
        // var reg = new RegExp(escapeRegExp(page[i]) + ".*");
        if (url.indexOf(site[i].replace("http://",  "").replace("https://", "")) != -1) {
            return false;
        }
    }

    for (var i = 0; i < page.length; i++) {
        if (cleanURL(data.url).indexOf(page[i].replace("http://",  "").replace("https://", ""))) {
            return false;
        }
    }

    for (var i = 0; i < regex.length; i++) {
        if (url.match(regex[i]) != null) {
            return false;
        }
    }

    return true;
}
