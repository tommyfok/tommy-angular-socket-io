angular.module('tomSocket', [])

.provider('Socket', function () {
  // factory method will return the same object to all injectors
  // while service/provider mode will return an entirly `new` object
  // provider method is configurable, so we need to use provider mode here
  var Obj = this;
  Obj.$get = ['$rootScope', function ($rootScope) {
    var self             = this,
        isFetchingScript = false,
        onEvents         = {},
        ioTryCount       = 0,
        scriptTryCount   = 0,
        script;

    function injectSocketIo () {
      script = document.createElement('script');
      script.src = '//cdn.socket.io/socket.io-1.4.5.js';
      script.setAttribute('scriptTryCount', scriptTryCount);
      script.style.display = 'none';
      document.body.appendChild(script);
      scriptTryCount++;
    }

    function getIo (callback) {
      var io = io || window.io;
      if (io) {
        callback(io);
      } else {
        if (!isFetchingScript) {
          // these actions will only be excuted once
          self.on = function (event, callback) {
            onEvents[event] = callback;
          };
          self.emit = function () {};
          injectSocketIo();
          isFetchingScript = true;
        }

        if (ioTryCount < 500) {
          ioTryCount++;
        } else {
          // retry: connect the script
          ioTryCount = 0;
          document.body.removeChild(script);
          injectSocketIo();
        }

        if (scriptTryCount < 10) {
          setTimeout(function () {
            getIo(callback);
          }, 20);
        }
      }
    }

    getIo(function (io) {
      var socket = io(Obj.pathToServer);
      self.on = function (event, callback) {
        socket.on(event, function (data) {
          $rootScope.$apply(function () {
            callback.call(socket, data);
          });
        });
      };
      self.emit = function (event, data) {
        socket.emit(event, data);
      };
      // need to re-register all on events that registered before
      angular.forEach(onEvents, function (value, key) {
        self.on(key, value);
      });
      onEvents = {};
    });

    return self;
  }];
});
