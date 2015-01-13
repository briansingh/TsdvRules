'use strict';

angular.module('tsdvrules')
  .factory('FolderService', ['$log', '$q', '$http', 'firebaseUrl',
    function ($log, $q, $http, firebaseUrl) {

      var serviceName = 'FolderService';
      var remoteName = 'folders';
      var list;

      $log.log(serviceName + ' instantiated');

      return {

        getName : function(){
          return remoteName;
        },

        getList : function(){
          var deferred = $q.defer();
          $http.get(firebaseUrl + remoteName +  '.json')
            .success(function(data, status){
              $log.log(serviceName + ' getList success', data);
              list = Object.keys(data).map(function (key) {
                var item = data[key];
                item.$id = key;
                return item;
              });
              deferred.resolve(list);
            })
            .error(function(data, status){
              $log.log(serviceName + ' getList error', data);
              deferred.reject(data);
            });
          return deferred.promise;
        },

        add : function(options){
          var deferred = $q.defer();
          var item = angular.copy(options);
          $http.post(firebaseUrl + remoteName + '.json', item)
            .success(function(data, status) {
              $log.log(serviceName + ' add success', data);
              item.$id = data.name;
              list.push(item);
              deferred.resolve(item);
            })
            .error(function(data, status) {
              $log.log(serviceName + ' add error', data);
              deferred.reject(data);
            });
          return deferred.promise;
        },

        remove : function(item){
          var deferred = $q.defer();
          $http.delete(firebaseUrl + remoteName + '/' + item.$id + '.json')
            .success(function(data, status) {
              $log.log(serviceName + ' remove success', data);
              list.splice(list.indexOf(item),1);
              deferred.resolve();
            })
            .error(function(data, status) {
              $log.log(serviceName + ' remove error', data);
              deferred.reject(data);
            });
          return deferred.promise;
        }
      };
    }]);
