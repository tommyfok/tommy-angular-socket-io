# tommy-angular-socket-io

> angular socket.io plugin, with mini configuration and api

## Features
- no need to include socket.io.js
- auto apply event callbacks

## Install
1. `bower install -S tommy-angular-socket-io`
2. Insert `<script src="/path/to/your/tomSocket.service.js"></script>` after angular.js

## Usage
1. Add `tomSocket` as your module dependency
2. modify `tomSocket.service.js`, set `pathToServer` to your __real server url__ in line 15
3. Inject `tomSocket` as a service and use it like this, just like original socket.io:
```javascript
  tomSocket.on('eventName', function (data) {
    // do something with data
  });
  tomSocket.emit('eventName', data);
```
