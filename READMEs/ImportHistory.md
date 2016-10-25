Goal
---
Importing a user's existing Browser History using the Chrome's History API

Input
---
No particular input. Function is called on when user prompts from the frontend.

Output
---
Saves the History Items in the following format and returns the number of History URLs stored.
```
{
	url: '<URL of the page>',
	lastVisitTime: '<Last Visit of the page in ISO Date Time format>'
}
```

Technical Implementation
---
Query the history using [```chrome.history```](https://developer.chrome.com/extensions/history) API.<br>
Store the History Items in JSON format using [```chrome.storage.local```](https://developer.chrome.com/extensions/storage) API.
