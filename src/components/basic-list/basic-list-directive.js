angular.module('tsdvrules')
  .directive('tsdvrulesBasicList', function() {
    return {
      templateUrl : 'components/basic-list/basic-list.html',
      transclude : true,
      scope : {
        service : '='
      },
      controllerAs : 'tsdvrulesBasicListCtrl',
      controller : ['$scope', '$element', '$attrs', '$transclude', '$log', '$q',
        function ($scope, $element, $attrs, $transclude, $log, $q){
          $log.log('tsdvrulesBasicListCtrl instantiated');

          var self = this;
          self.newTitle = '';
          self.service = $scope.service;

          self.getList = function(){
            self.service.getList()
              .then(function(list){
                self.list = list;
              });
          };

          self.add = function(options){
            var deferred = $q.defer();
            var newItem;

            self.service.add(options)
              .then(function(result){
                newItem = result;
              },
              function(err){
                $log.log(err);
              })
              .then(self.list)
              .then(function(list){
                self.newTitle = '';
                deferred.resolve(newItem);
              })
              .catch(function(err){
                $log.log(err);
                deferred.reject(err);
              });
            return deferred.promise;
          };

          self.remove = function(item){
            return self.service.remove(item)
              .then(self.list);
          };

          self.getList();
        }
      ]
    };
  });
