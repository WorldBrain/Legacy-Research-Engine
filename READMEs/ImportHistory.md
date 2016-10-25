Goal
---
Importing a user's existing History using the Chrome's History API

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
Query the history using Chrome's [```chrome.history```](https://developer.chrome.com/extensions/history) API.
