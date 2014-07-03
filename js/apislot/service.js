app.factory('Onvif', function($http) {
  return {
    getData: function() {
      return $http.get('model.onvif.json');
    }
  };
});

app.factory('Uapi', function($http) {
  return {
    getData: function() {
      return $http.get('model.uapi.json');
    }
  };
});

app.factory('Storage', function($http) {
  var data = [];

  var promise = $http.get('model.default.json').success(function(response) {
    data = response;
  });

  return {
    promise: promise,
    set: function(obj) {
      data = obj;
    },
    get: function(key) {
      if (!key) {
        return data;
      }
      var type = typeof key;
      var obj = data;
      if (type === 'string' || type === 'number') {
        key = ('' + key).replace(/\[(.*?)\]/g, function(m, key) {
          return '.' + key;
        }).split('.');

        for (var i = 0, l = key.length; i < l; i++) {
          if (obj.hasOwnProperty(key[i])) {
            obj = obj[key[i]];
          } else {
            // Todo:
            // Read Default Value
            return undefined;
          }
        }
        return obj;
      }
    }
  };
});

app.factory('Appconfig', function($injector) {
  var currentSlot = 'Onvif';

  return {
    getApiSlot: function(slotname) {
      var slot;
      if (slotname) {
        slot = $injector.get(slotname);
      } else {
        slot = $injector.get(currentSlot);
      }
      return slot;
    },
    setApiSlot: function(slotname) {
      currentSlot = slotname;
    }
  };
});

app.factory('Coreconfig', function($q, Appconfig, Storage) {
  var apislot;
  var data;

  return {
    setApiSlot: function(slotname) {
      Appconfig.setApiSlot(slotname);
    },
    merge: function(target, src) {
      var array = Array.isArray(src);
      var dst = array && [] || {};

      if (array) {
        target = target || [];
        dst = dst.concat(target);
        src.forEach(function(e, i) {
          if (typeof dst[i] === 'undefined') {
            dst[i] = e;
          } else if (typeof e === 'object') {
            dst[i] = deepmerge(target[i], e);
          } else {
            if (target.indexOf(e) === -1) {
              dst.push(e);
            }
          }
        });
      } else {
        if (target && typeof target === 'object') {
          Object.keys(target).forEach(function(key) {
            dst[key] = target[key];
          });
        }
        Object.keys(src).forEach(function(key) {
          if (typeof src[key] !== 'object' || !src[key]) {
            dst[key] = src[key];
          } else {
            if (!target[key]) {
              dst[key] = src[key];
            } else {
              dst[key] = deepmerge(target[key], src[key]);
            }
          }
        });
      }
      return dst;
    },
    getData: function() {
      var deffered = $q.defer();
      var api = Appconfig.getApiSlot(apislot);
      if (api.getData) {
        var $this = this;
        api.getData().then(function(response) {
          data = $this.merge(Storage.get(), response.data);
          deffered.resolve(data);
        });
      }
      return deffered.promise;
    }
  };
});
