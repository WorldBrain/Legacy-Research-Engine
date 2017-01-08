# WorldBrain (Re)Search Engine

...is an open-source search engine for a user’s digital knowledge. It lets them full-text search all the web pages they visited and bookmarked, as well as other places like Evernote, Pocket, Google Drive, Asana, Mendeley etc. ([Watch 2 min Intro video](worldbrain.io/intro))

## How to use the extension

["How to use the Research-Engine" Demo Video (2min)](http://worldbrain.io/tutorial)

For more detailed description, visit the full [tutorial](https://github.com/WorldBrain/Research-Engine/blob/master/TUTORIAL.md).

## Installation

### AS A USER
[Install from the Chrome store here](https://chrome.google.com/webstore/detail/worldbrain-the-research-e/abkfbakhjpmblaafnpgjppbmioombali/related). (If you don't feel comfortable with that, look at [Transparent Installation](#transparent-installation)).
#### Transparent Installation
If you don't feel comfortable installing a Chrome extension that can read and modify all data on the websites you visit from the webstore (we wouldn't either!), you can clone this repository on your local machine, read through our code to verify that it is not malicious, and then install it as an unpacked local extension through the menu in `chrome://extensions/`. **But this way you also won't receive any updates**.

### AS A DEVELOPER

Fork the project, then...

#### Prerequisites
- Install ```browserify``` and ```watchify``` with ```npm install -g browserify```
- Run ```npm install``` to install dependencies

#### While Developing
- ```npm run watch```

#### Build
- ```npm run build```

#### Activate & Test the plugin on your browser

###### In Chrome
- go to ```chrome://extensions/```
- Activate *Developer Mode* (top right)
- Click *load unpacked extension* (top left)
- Select the ```/build``` folder from the project

## FAQ
You can reach our FAQ here: [reddit.com*/*r*/*WorldBrain](http://reddit.com/r/WorldBrain/)

## Acknowledgement

This tool is originally released under the name "[Falcon](https://github.com/lengstrom/falcon)" and will be further developed to fit the needs of the scientific research community.  The original programmers are [@andrewilyas](https://github.com/andrewilyas) and [@lengstrom](https://github.com/lengstrom).
