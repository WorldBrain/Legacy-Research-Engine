/**
  * Author: Amit Kumar Jaiswal
  */

!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.estimate=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){

/**
 * get the window's scrolltop.
 * 
 * @return {Number}
 */

module.exports = function(){
  if (window.pageYOffset) return window.pageYOffset;
  return document.documentElement.clientHeight
    ? document.documentElement.scrollTop
    : document.body.scrollTop;
};

},{}],2:[function(_dereq_,module,exports){
'use strict';

var scrolltop = _dereq_('scrolltop');
var defaults = {
  speed: 150, // words per minute
  spaces: /\W+/g
};

function resolveOptions (options) {
  var no;
  var o = options;
  if (o === no) { return defaults; }
  if (o.speed === no) { o.speed = defaults.speed; }
  if (o.spaces === no) { o.spaces = defaults.spaces; }
  return options;
}

function measureText (text, options) {
  var o = resolveOptions(options);
  var words = text.split(o.spaces).length;
  var seconds = Math.round(words / o.speed * 60);
  return seconds;
}

function measureElement (element, options) {
  var calc = {
    initialize: initialize,
    update: update
  };

  function initialize () {
    calc.total = measureText(element.innerText || element.textContent, options);
  }

  function update () {
    calc.progress = getProgress();
    calc.remaining = Math.ceil(calc.total * (1 - (calc.progress / 100)));
  }

  function getProgress () {
    var scroll = scrolltop();
    var rect = element.getBoundingClientRect();
    var diffTop = scroll - element.offsetTop + window.innerHeight / 2;
    var diffHeight = rect.height;
    var scaled = diffTop / diffHeight * 100;
    var bounded = Math.max(0, Math.min(scaled, 100));
    return bounded; // progress bounded within 0..100
  }

  initialize();
  update();

  return calc;
}

module.exports = {
  element: measureElement,
text: measureText
};
},{"scrolltop":1}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9uaWNvL25pY28vZ2l0L2VzdGltYXRlL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbmljby9uaWNvL2dpdC9lc3RpbWF0ZS9ub2RlX21vZHVsZXMvc2Nyb2xsdG9wL2luZGV4LmpzIiwiL1VzZXJzL25pY28vbmljby9naXQvZXN0aW1hdGUvc3JjL2VzdGltYXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG4vKipcbiAqIGdldCB0aGUgd2luZG93J3Mgc2Nyb2xsdG9wLlxuICogXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpe1xuICBpZiAod2luZG93LnBhZ2VZT2Zmc2V0KSByZXR1cm4gd2luZG93LnBhZ2VZT2Zmc2V0O1xuICByZXR1cm4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodFxuICAgID8gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcFxuICAgIDogZG9jdW1lbnQuYm9keS5zY3JvbGxUb3A7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc2Nyb2xsdG9wID0gcmVxdWlyZSgnc2Nyb2xsdG9wJyk7XG52YXIgZGVmYXVsdHMgPSB7XG4gIHNwZWVkOiAxNTAsIC8vIHdvcmRzIHBlciBtaW51dGVcbiAgc3BhY2VzOiAvXFxXKy9nXG59O1xuXG5mdW5jdGlvbiByZXNvbHZlT3B0aW9ucyAob3B0aW9ucykge1xuICB2YXIgbm87XG4gIHZhciBvID0gb3B0aW9ucztcbiAgaWYgKG8gPT09IG5vKSB7IHJldHVybiBkZWZhdWx0czsgfVxuICBpZiAoby5zcGVlZCA9PT0gbm8pIHsgby5zcGVlZCA9IGRlZmF1bHRzLnNwZWVkOyB9XG4gIGlmIChvLnNwYWNlcyA9PT0gbm8pIHsgby5zcGFjZXMgPSBkZWZhdWx0cy5zcGFjZXM7IH1cbiAgcmV0dXJuIG9wdGlvbnM7XG59XG5cbmZ1bmN0aW9uIG1lYXN1cmVUZXh0ICh0ZXh0LCBvcHRpb25zKSB7XG4gIHZhciBvID0gcmVzb2x2ZU9wdGlvbnMob3B0aW9ucyk7XG4gIHZhciB3b3JkcyA9IHRleHQuc3BsaXQoby5zcGFjZXMpLmxlbmd0aDtcbiAgdmFyIHNlY29uZHMgPSBNYXRoLnJvdW5kKHdvcmRzIC8gby5zcGVlZCAqIDYwKTtcbiAgcmV0dXJuIHNlY29uZHM7XG59XG5cbmZ1bmN0aW9uIG1lYXN1cmVFbGVtZW50IChlbGVtZW50LCBvcHRpb25zKSB7XG4gIHZhciBjYWxjID0ge1xuICAgIGluaXRpYWxpemU6IGluaXRpYWxpemUsXG4gICAgdXBkYXRlOiB1cGRhdGVcbiAgfTtcblxuICBmdW5jdGlvbiBpbml0aWFsaXplICgpIHtcbiAgICBjYWxjLnRvdGFsID0gbWVhc3VyZVRleHQoZWxlbWVudC5pbm5lclRleHQgfHwgZWxlbWVudC50ZXh0Q29udGVudCwgb3B0aW9ucyk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGUgKCkge1xuICAgIGNhbGMucHJvZ3Jlc3MgPSBnZXRQcm9ncmVzcygpO1xuICAgIGNhbGMucmVtYWluaW5nID0gTWF0aC5jZWlsKGNhbGMudG90YWwgKiAoMSAtIChjYWxjLnByb2dyZXNzIC8gMTAwKSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0UHJvZ3Jlc3MgKCkge1xuICAgIHZhciBzY3JvbGwgPSBzY3JvbGx0b3AoKTtcbiAgICB2YXIgcmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgdmFyIGRpZmZUb3AgPSBzY3JvbGwgLSBlbGVtZW50Lm9mZnNldFRvcCArIHdpbmRvdy5pbm5lckhlaWdodCAvIDI7XG4gICAgdmFyIGRpZmZIZWlnaHQgPSByZWN0LmhlaWdodDtcbiAgICB2YXIgc2NhbGVkID0gZGlmZlRvcCAvIGRpZmZIZWlnaHQgKiAxMDA7XG4gICAgdmFyIGJvdW5kZWQgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihzY2FsZWQsIDEwMCkpO1xuICAgIHJldHVybiBib3VuZGVkOyAvLyBwcm9ncmVzcyBib3VuZGVkIHdpdGhpbiAwLi4xMDBcbiAgfVxuXG4gIGluaXRpYWxpemUoKTtcbiAgdXBkYXRlKCk7XG5cbiAgcmV0dXJuIGNhbGM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBlbGVtZW50OiBtZWFzdXJlRWxlbWVudCxcbiAgdGV4dDogbWVhc3VyZVRleHRcbn07XG4vKlxuICAgICAgICBpc1JlYWRhYmxlOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGVsZW1lbnQuaXMoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICB2YXIgaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IC8gMixcbiAgICAgICAgICAgICAgICAgICAgcmVjdCA9IHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICAgICAgICAgICAgICAgIHJlYWRhYmxlID0gKFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVjdC5ib3R0b20gPiBoZWlnaHQgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlY3QudG9wIDwgaGVpZ2h0XG4gICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVhZGFibGU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKXtcbiAgICAgICAgICAgIHZhciBwbHVnaW4gPSB0aGlzLFxuICAgICAgICAgICAgICAgIG1lYXN1cmVtZW50cyA9IG1lYXN1cmUocGx1Z2luLiRlbGVtZW50KSxcbiAgICAgICAgICAgICAgICB0ZXh0ID0gZ2V0QnViYmxlVGV4dChtZWFzdXJlbWVudHMpLFxuICAgICAgICAgICAgICAgIHJlYWRhYmxlID0gcGx1Z2luLmlzUmVhZGFibGUoKTtcblxuICAgICAgICAgICAgaWYocmVhZGFibGUgJiYgdGV4dCl7XG4gICAgICAgICAgICAgICAgaWYoJHdpbmRvdy53aWR0aCgpID49IDc2OCl7XG4gICAgICAgICAgICAgICAgICAgIHBsdWdpbi4kYnViYmxlLmNzcygndG9wJywgbWVhc3VyZW1lbnRzLmRpc3RhbmNlKS50ZXh0KHRleHQpO1xuICAgICAgICAgICAgICAgICAgICBwbHVnaW4uZmFkZUJ1YmJsZSgwLjQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGZhZGUgb3V0IHRoZSBhbm5vdGF0aW9uIGFmdGVyIGEgc2Vjb25kIG9mIG5vIHNjcm9sbGluZyB0aHJvdWdoLlxuICAgICAgICAgICAgICAgIHBsdWdpbi5zdG9wRmFkaW5nKCk7XG4gICAgICAgICAgICAgICAgcGx1Z2luLnN0YXJ0RmFkaW5nKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiovXG4iXX0=
(2)
});
