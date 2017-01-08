# WorldBrain (Re)Search Engine

Welcome to the WorldBrain project. We want to work on the goal of an increased (scientific) literacy in our global society through a better information quality on the internet.

**WorldBrain is an open-source project that aims to battle (scientific) misinformation by developing open source search tools for professional web-researchers like science communicators, STEM students, journalists and librarians and online debaters to find, rate and share qualitative and trustworthy web content/notes with their friends, followers and the public.** ([Watch the 5 min Vision Video](http://worldbrain.io/vision))

**Our first software,** The (Re)search engine, is an open-source search engine for a user’s digital knowledge. It lets them full-text search all the pages they visited and bookmarked, as well as other places like Evernote, Pocket, Google Drive, Asana, Mendeley etc. ([Watch 2 min Intro Video](worldbrain.io/intro))

## Status & Development Roadmap

[Here](https://github.com/WorldBrain/START-HERE/blob/master/ROADMAPS.md) you find the long term roadmap. 

### Current Stage

In it's current stage, the chrome extension lets you full-text search all the web pages and PDFs you visited and bookmarked.

### Under Development
We are currently working on replacing the DB with PouchDB and the default search implementation with [PouchDB Quick Search](https://github.com/nolanlawson/pouchdb-quick-search/) 

### Up next
#### Web-view for results and more filter options.
Currently the results can only be shown in the drop down of the adress bar and filters only applied by entering queries.

To change that, we are adding a web-based results and filter view (much like a google results page), where all results can be shown and a variety of filters applied. 

More info in our [projects section](https://github.com/WorldBrain/Research-Engine/projects)

### Want to contribute?
Just leave a comment under the respective issue or contact us via email (info@worldbrain.io), if you are unsure about where to contribute. 

## How to use the extension

You can watch our ["How to use the Research-Engine" Demo Video (2min)](http://worldbrain.io/tutorial)

**or** for a more detailed description, visit the text-based [tutorial](https://github.com/WorldBrain/Research-Engine/blob/master/TUTORIAL.md).

## FAQ
You can reach our FAQ here: [reddit.com*/*r*/*WorldBrain](http://reddit.com/r/WorldBrain/)

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



## Acknowledgement

This tool is originally released under the name "[Falcon](https://github.com/lengstrom/falcon)" and will be further developed to fit the needs of the scientific research community.  The original programmers are [@andrewilyas](https://github.com/andrewilyas) and [@lengstrom](https://github.com/lengstrom).


## License

Currently the (Re)search-Engine is released under GPL-3, as this has been the license of *Falcon*. 
We aim to release it under a more liberal license as soon as we have replaced all the code from the original Falcon tool. 

Our goal is to provide a set of reusable libraries, so that this client can be adapted to as many work-flows as possible. 
