angular.module('starter', ['ionic', 'starter.controllers' , 'ngResource'])

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    },
    isExist : function ( key ) {
      if ($window.localStorage.getItem(key) === null) {
        return  false;
      }
      return true;
    },
    removeObjectLocalStorage : function( key ) {
      $window.localstorage.removeItem(key);
      console.log ( "Key removed" , key );
    }
  }
}])