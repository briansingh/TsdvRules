'use strict';

angular.module('tsdvrules')
  .factory('TsdvRulesService', ['$window', '$log', '$q', '$timeout', '$http', 'firebaseUrl',
    function ($window, $log, $q, $timeout, $http, firebaseUrl) {

      $log.log('TsdvRulesService instantiated');

      var rules;

      return {

        getRules : function(){
          var deferred = $q.defer();
          $http.get(firebaseUrl + 'rules.json')
            .success(function(data, status){
              $log.log('TsdvRulesService getRules success', data);
              rules = Object.keys(data).map(function (key) {
                var rule = data[key];
                rule.$id = key;
                return rule;
              });
              deferred.resolve(rules);
            })
            .error(function(data, status){
              $log.log('TsdvRulesService getRules error', data);
              deferred.reject(data);
            });
          return deferred.promise;
        },

        addRule : function(options){
          var deferred = $q.defer();
          var rule = angular.copy(options);
          $http.post(firebaseUrl + 'rules.json', rule)
            .success(function(data, status) {
              $log.log('TsdvRulesService addRule success', data);
              rule.$id = data.name;
              rules.push(rule);
              deferred.resolve(rule);
            }).
            error(function(data, status) {
              $log.log('TsdvRulesService addRule error', data);
              deferred.reject(data);
            });
          return deferred.promise;
        },

        removeRule : function(rule){
          var deferred = $q.defer();
          $http.delete(firebaseUrl + 'rules/' + rule.$id + '.json')
            .success(function(data, status) {
              $log.log('TsdvRulesService removeRule success', data);
              rules.splice(rules.indexOf(rule),1);
              deferred.resolve();
            }).
            error(function(data, status) {
              $log.log('TsdvRulesService removeRule error', data);
              deferred.reject(data);
            });
          return deferred.promise;
        },

        saveRule : function(rule){
          var deferred = $q.defer();
          var updateRule = angular.copy(rule);
          updateRule.$id = undefined;
          $http.put(firebaseUrl + 'rules/' + rule.$id + '.json', updateRule)
            .success(function(data, status) {
              $log.log('TsdvRulesService saveRule success', data);
              deferred.resolve(rule);
            }).
            error(function(data, status) {
              $log.log('TsdvRulesService saveRule error', data);
              deferred.reject(data);
            });
          return deferred.promise;
        }
      };
    }]);
