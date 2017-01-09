# Full Tutorial for the (Re)Search Engine

Chrome extension for full-text browsing history & bookmarks search. 

**To activate**, press `w`, then `space` or `tab`, in the omnibar to start searching your previously visited websites! 
Every time you visit a website in Chrome, WorldBrain indexes all the text on the page so that the site can be easily found later. Then, for example, if you type `w <tab> mugwort`, WorldBrain will show the websites you visited containing the text "mugwort"! 

You can watch a short 2 minute video here: [worldbrain.io*/*tutorial](http://worldbrain.io/tutorial)

## More options:
- Import existing history and bookmarks via the dashboard. (Reachable via the small brain icon in the top-right corner of the browser)
- Use `before:date` and `after:date` to search your history in a certain time range
  - You can use natural language along with quotes to specify dates as well, e.g. `before:"yesterday at 5pm"`
- Use quotations to look for exact matches of strings containing whitespace
- Only documents containing all words will be returned

## Example Queries

`before: "yesterday at 5pm" after: "three weeks ago" emscripten blog "anish athalye"` 
- Searches for websites that you browsed between yesterday at 5pm and 3 weeks ago containing the keywords "emscripten" and "blog" and "anish athalye"

`-"cat food" just "a dog"`
- Searches for websites you visited containing the keywords "just" and "a dog", and without the phrase "cat food".

`ethereum medium` 
- Searches for websites you visited in the last 2 weeks containing the keywords "ethereum" and "medium"

`ethereum medium after:11/29/2015 before:3/26/2016` 
- Searches for websites you visited between 11/29/2015 and 3/26/2016 containing the keywords "ethereum" and "medium"

## Blacklist and Delete Pages
To manage which URLs WorldBrain can index, delete websites from the index, and more, go to the preferences page.
!["Extension Bar"](https://cloud.githubusercontent.com/assets/7870039/19575579/98d64ea4-970f-11e6-958b-8bdc9fd87baf.png "Extension Bar")


