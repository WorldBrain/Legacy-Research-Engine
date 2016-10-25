Goal
---
Downloading History URLs for processing.

Input
---
No particular input. History items already stored in ```chrome.storage.local``` by ```importHistory``` are used.

Output
---
Creates a data object and sends it to ```handleMessage``` for processing. The format is shown below: 
```
{
	msg: 'saveHistory',
	text: 'Raw HTML of the URL',
	time: 'Time of visit of the URL'
}
```

Technical Implementation
---
Retrieve the History Items in JSON format using [```chrome.storage.local```](https://developer.chrome.com/extensions/storage) API.
Use *[Readability](https://github.com/mozilla/readability)* to obtain HTML for a URL.
