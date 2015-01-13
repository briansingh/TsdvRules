'use strict';

angular.module('tsdvrules')
  .controller('FormCtrl', ['$log', 'FormService', function ($log, FormService) {

    $log.log('FormCtrl instantiated');
    var self = this;
    self.service = FormService;

  }]);
