// Keep scroll position after a reload
// Saves window offset in page's local storage to implement a per-page setting
(function () {
  'use strict';

  if (window.top !== window) return;

  var storageKey = '_playframework-safari-tools-offset';

  var revertToPreviousScroll = function (offset) {
    window.scroll(0, offset);
  };

  var installScrollHandler = function () {
    window.onscroll = function () {
      var offset = window.scrollY;
      localStorage[storageKey] = offset;
    };
  };

  var offset = localStorage[storageKey];
  if (offset > 0) {
    setTimeout(function () {
      revertToPreviousScroll(offset);
      installScrollHandler();
    }, 400);
  } else {
    installScrollHandler();
  }
})();
