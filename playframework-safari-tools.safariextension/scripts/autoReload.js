// Auto Reload - reload the page automatically on changes in your app's code
// Requires play-auto-refresh sbt plug-in
(function () {
  'use strict';

  if (window.top !== window) return;

  var handleReloadMessage = function (event) {
    var ws = this;
    var reload = function () {
      ws.close();
      window.location.reload();
    };
    if (event.data.indexOf('reload') > -1) {
      var components = event.data.split(':');
      // Old plugin doesn't send port, so just reload default port
      if (components.length == 1 && window.location.host === 'localhost:9000') {
        reload();
      } // otherwise check if the current page is the correct one
      else if (window.location.host === 'localhost:' + components[1]) {
        reload();
      }
    }
  };

  var ws = new WebSocket('ws://localhost:9001');
  ws.onmessage = handleReloadMessage;

// In preparation of new sbt plugin:
// Must try both WebSockets as a network error does not result in onerror
//var newPort = parseInt(window.location.port) + 10000;
//var ws = new WebSocket('ws://localhost:' + newPort);
// 9001 is the statically coded port
//var fallbackWs = new WebSocket('ws://localhost:9001');
//ws.onmessage = fallbackWs.onmessage = handleReloadMessage;
})();

