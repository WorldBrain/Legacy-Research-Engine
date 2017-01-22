# Development Roadmap

You see the related projects in [the project list](https://github.com/WorldBrain/Research-Engine/projects).


### 1. PouchDB Transition

The currently the search is built on top of the browser's local storage, which is limited in the ability extend the data and to improve the search.

### 2. Restructuring of Code + Bugfixes

The current code is quite a mess, provides no modularity and is not contributor friendly.
It is a patchwork from the Falcon code and has some bugs we need to get rid of. 
Can start as soon as the PouchDB transition is done. 

### 3. (Overhaul) Web Interface + Add Web results / Change to React

We want to change the front-end framework to React and want to add a web interface to display the results and filter options. 

### 4. Port to Safari / Firefox

With the web interface running, the search can also be done with Firefox and Safari. 
With the current method of searching via the address bar, it is unfortunately not possible. 

### 4. Quick Blacklist function

Right now you have to go to the settings in order to blacklist a page. 
We need a quick version via the popup.

### 5. Improvement of search ranking

The search ranking sometimes is not very precise - we have to improve on that as well as the parsers for pages.
