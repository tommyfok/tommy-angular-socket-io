# tommy-angular-socket-io

> angular socket.io plugin, with mini configuration and api

## Features
- no need to include socket.io.js
- auto apply event callbacks

## Install
1. `bower install -S tommy-angular-socket-io` or download `tomSocket.service.js` manually
2. Insert `<script src="/path/to/your/tomSocket.service.js"></script>` after angular.js

## Usage
1. Add `tomSocket` as your module dependency
2. config your module with `SocketProvider.pathToServer = 'path/to/your/real/socket/server'`
3. Inject `Socket` as a service and use it like this, just like original socket.io:
```javascript
  Socket.on('eventName', function (data) {
    // do something with data
  });
  Socket.emit('eventName', data);
```
