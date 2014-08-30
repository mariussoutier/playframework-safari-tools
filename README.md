# Playframework Safari Tools

Safari extension for [Playframework 2](http://www.playframework.com) developers.
A port of the [Playframework Chrome Tools](https://github.com/jamesward/play-framework-chrome-tools) by 
[James Ward](https://github.com/jamesward).

## Auto Reload

Reload the browser window automatically when you make a change in your code.
Requires the [play-auto-refresh](https://github.com/jamesward/play-auto-refresh) sbt plug-in to be enabled in your
project.

The extension also maintains the scrolling position between reloads.

## Open Errors in Editor

Make an error clickable to jump directly to the corresponding source file. 

Requires configuring a URL in the preferences to which the absolute path to the file in error and the line triggering the 
error are passed (you can find the setting in `Safari > Preferences > Extensions`).

For IntelliJ IDEA, the RemoteCall plugin (https://github.com/Zolotov/RemoteCall), also available from the plugin 
repository, can be used. In this case the URL to configure is `http://localhost:8091?message=$file:$line`. It is also
possible to use a different port.

For SublimeText, you can use [subl-handler](https://github.com/mariussoutier/subl-handler) and configure the URL to
`subl://open/?file=/path/to/$file&line=$line`.
