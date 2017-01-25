# WorldBrain's (Re)search Engine

**Welcome to the WorldBrain project. We work on the goal of an increased (scientific) literacy in our global society through a better overall information quality on the internet.**

Doing so by developing open-source search tools for professional web-researchers like science communicators, (STEM-) students, journalists, librarians and online debaters to effortlessly find, rate and share qualitative and trustworthy web content/notes with their friends, followers and the public. 

With the software we build, we aim to gather a diverse community of people that loves working with fact-based and intellectually honest information. ([Watch the 3.5 min Vision Video](http://worldbrain.io/vision))

### **Our first tool** is the *(Re)search-engine*, a photographic memory for your web research. 

It's an open-source & decentralised search engine that lets you **full-text search all the pages you visited and bookmarked**, and later also other places like Evernote, Pocket, Google Drive, Asana, Mendeley and many more.
([Watch 2 min Intro Video](http://worldbrain.io/intro)) ([DOWNLOAD HERE](http://worldbrain.io/download))

## Table of Content

 1. [How to use the extension](https://github.com/WorldBrain/Research-Engine/blob/master/README.md#how-to-use-the-extension)
 1. [Status & Development Roadmap](https://github.com/WorldBrain/Research-Engine/blob/master/README.md#status-development-roadmap)
 2. [How to get involved](https://github.com/WorldBrain/Research-Engine/blob/master/README.md#how-to-get-involved)
 1. [FAQs](https://github.com/WorldBrain/Research-Engine/blob/master/README.md#faq)
 3. [Installation (as user & developer)](https://github.com/WorldBrain/Research-Engine/blob/master/README.md#installation)
 7. [How to get in touch with us](https://github.com/WorldBrain/Research-Engine/blob/master/README.md#how-to-get-in-touch-with-us)
 4. [Acknowledgements](https://github.com/WorldBrain/Research-Engine/blob/master/README.md#acknowledgements)
 8. [Licence](https://github.com/WorldBrain/Research-Engine/blob/master/README.md#license)


## How to use the extension

([Download it here](http://worldbrain.io/download)), then type in `w`+ `space`/`tab`+ `your keywords`into the address bar. 

For more detailed description, you can watch our [Demo Video (2min)](http://worldbrain.io/tutorial) **or** read the text-based [tutorial](https://github.com/WorldBrain/Research-Engine/blob/master/TUTORIAL.md).

**Important:** All your data is stored and processed locally

![](http://g.recordit.co/qgCwluEMpa.gif)


## Status & Development Roadmap

[Here](https://github.com/WorldBrain/Research-Engine/blob/master/ROADMAP.md) you find the long term roadmap. 

### Current Stage

Right now, the chrome extension lets you full-text search all the web pages and PDFs you visited and bookmarked.

#### Full Feature Set

 - full-text search history & bookmarks
 - filter by time and minuswords
 - blacklisting urls, domains, regex
 - supports PDFs you visited online
 - import existing history and bookmarks

### Under Development
We are currently working on replacing the DB with PouchDB and the default search implementation with [PouchDB Quick Search](https://github.com/nolanlawson/pouchdb-quick-search/) 

View all ["UNDER DEVELOPMENT" issues](https://github.com/WorldBrain/Research-Engine/issues?q=is%3Aissue+is%3Aopen+label%3A%22UNDER+DEVELOPMENT%22)

### Up next
#### Web-view for results and more filter options.
Currently the results can only be shown in the drop down of the adress bar and filters only applied by entering queries.

To change that, we are adding a web-based results and filter view (much like a google results page), where all results can be shown and a variety of filters applied. 

More info in our [projects section](https://github.com/WorldBrain/Research-Engine/projects)

## How to get involved

 - If you are **JAVASCRIPT DEVELOPER** you can check out [our current projects](https://github.com/WorldBrain/Research-Engine/projects) and [open tasks](https://github.com/WorldBrain/Research-Engine/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22)
 - Into **DECENTRALISATION**? You can join [our discussion](https://github.com/WorldBrain/Research-Engine/issues/43) about decentralising our server infrastructure.
 - Wanna help with **MARKETING**? Contact Oliver via email: oli@worldbrain.io
 - Wanna help us with **MONEYYYZ**? Wohoo! You can do so by [supporting us on Patreon](http://patreon.com/WorldBrain) 

## FAQ
You can reach our FAQ here: [reddit.com*/*r*/*WorldBrain](http://reddit.com/r/WorldBrain/)

## Installation

### AS A USER
[Install from the Chrome store here](https://chrome.google.com/webstore/detail/worldbrain-the-research-e/abkfbakhjpmblaafnpgjppbmioombali/related). (If you don't feel comfortable with that, look at [Transparent Installation](#transparent-installation)).
#### Transparent Installation
If you don't feel comfortable installing a Chrome extension that can read and modify all data on the websites you visit from the webstore (we wouldn't either!), you can clone this repository on your local machine, read through our code to verify that it is not malicious, and then install it as an unpacked local extension through the menu in `chrome://extensions/`. **But this way you also won't receive any updates**.

Wanna know if the extension installed on your computer has the same code as here on GitHub? [See here](https://www.reddit.com/r/WorldBrain/comments/5ok2h8/how_do_i_know_that_the_code_on_my_computer_is_not/).

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

## How to get in touch with us

 1. via Email: [info@worldbrain.io](mailto:info@worldbrain.io)
 2. Request Slack Invitation: [http://worldbrain.slack.com](http://worldbrain.slack.com)


## Acknowledgements

This tool is originally released under the name "[Falcon](https://github.com/lengstrom/falcon)" and will be further developed to fit the needs of the scientific research community.  The original programmers are [@andrewilyas](https://github.com/andrewilyas) and [@lengstrom](https://github.com/lengstrom).


## License

Currently the (Re)search-Engine is released under GPL-3, as this has been the license of *Falcon*. 
We aim to release it under a more liberal license (CC0, MIT, BSD-2/3) as soon as we have replaced all the code from the original Falcon tool. 

Our goal is to provide a set of reusable libraries, so that this client can be adapted to as many work-flows as possible. 
