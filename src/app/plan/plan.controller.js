'use strict';

angular.module('tsdvrules')
  .controller('PlanCtrl', ['$log', 'PlanService', function ($log, PlanService) {

    $log.log('PlanCtrl instantiated');
    var self = this;
    self.service = PlanService;

  }]);
