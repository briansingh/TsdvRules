'use strict';

angular.module('tsdvrules')
  .controller('FolderCtrl', ['$log', 'FolderService', function ($log, FolderService) {

    $log.log('FolderCtrl instantiated');
    var self = this;
    self.service = FolderService;

  }]);
