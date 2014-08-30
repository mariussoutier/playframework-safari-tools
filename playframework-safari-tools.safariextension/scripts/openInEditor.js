// Open In Editor
// Replaces the error text on Play's error page with a link that opens the file in your editor at the corresponding line
// Configure via playEditorURL setting (accessible in Safari Preferences > Extensions)
(function() {
  'use strict';

  if (window.top !== window) return;

  var handleMessage = function (messageEvent) {
    if (messageEvent.name !== 'getPlayEditorURL')
      return;

    var playEditorURL = messageEvent.message;
    if (playEditorURL) {
      var replaceErrorMessageWithLink = function (file, line, replaceFn) {
        var editorInvocationURL = playEditorURL.replace('$file', file).replace('$line', line);
        var linkId = 'openInEditor';
        document.body.innerHTML = replaceFn(document.body.innerHTML, linkId);

        document.getElementById(linkId).onclick = function () {
          // Only send AJAX to http urls, otherwise open a new window so a system-defined handler can take care of it
          if (editorInvocationURL.indexOf('http') == -1) {
            window.open(editorInvocationURL, '_blank');
          } else {
            // Invoking XHR here would log an ugly CORS error message
            safari.self.tab.dispatchMessage('openUrl', editorInvocationURL);
          }
        };
      };

      var tryPlay23 = function () {
        // Error Message 2.3: /path/to/file.suffix:6
        var errorElement = document.getElementsByTagName('h2')[0];
        if (!errorElement) {
          return false;
        }

        var fileLinePattern = /In\s*([^ ]*):([0-9]*)/;
        var fileAndLineMatch = errorElement.textContent.match(fileLinePattern);
        if (!fileAndLineMatch) {
          return false;
        }

        var file = fileAndLineMatch[1];
        var line = fileAndLineMatch[2];
        replaceErrorMessageWithLink(file, line, function (html, id) {
          return html.replace(fileLinePattern,
              "In <span style='color: #FFA500; text-decoration: underline; cursor: pointer;' id='" +
              id + "'>" + file + ":" + line + "</span>");
        });

        return true;
      };

      var tryPlay22 = function () {
        // Error Message 2.0-2.2: In /path/to/file.suffix at line 6
        var filePattern = /In ([^ ]+)/;
        var linePattern = /at line ([^.]+)/;

        var fileMatch = document.body.textContent.match(filePattern);
        var lineMatch = document.body.textContent.match(linePattern);
        if (fileMatch && lineMatch) {
          var file = fileMatch[1];
          var line = lineMatch[1];
          replaceErrorMessageWithLink(file, line, function (html, id) {
            return html.replace(filePattern,
                "In <span style='color: #FFA500; text-decoration: underline; cursor: pointer;' id='" +
                id + "'>" + file + "</span>"
            )
          });
        }
        return fileMatch && lineMatch;
      };

      if (!tryPlay23()) {
        tryPlay22();
      }
    }
  };

  safari.self.addEventListener("message", handleMessage, false);
  safari.self.tab.dispatchMessage("get", "playEditorURL");
})();
