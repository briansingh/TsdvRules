'use strict';

angular.module('tsdvrules')
  .controller('MainCtrl', ['$scope', '$log', '$q', '$modal', 'PlanService', 'FolderService', 'FormService', 'TsdvRulesService',
    function ($scope, $log, $q, $modal, PlanService, FolderService, FormService, TsdvRulesService) {
      $log.log('MainCtrl instantiated');

      var self = this;

      self.remove = function (childScope) {
        $log.log('MainCtrl remove childScope' , childScope.$parent.row.entity);
        var rule = childScope.$parent.row.entity;
        TsdvRulesService.removeRule(rule)
          .then(self.rules);
      };

      self.editRule = function (childScope) {
        $log.log('MainCtrl editRule childScope' , childScope.$parent.row.entity);
        var rule = childScope.$parent.row.entity;
        self.open(rule);
      };

      self.open = function (rule) {
        var modalInstance = $modal.open({
          templateUrl: 'app/modal-dialog/modal-dialog.html',
          controller: 'ModalDialogCtrl as modalDialogCtrl',
          resolve: {
            plans: function () {
              return self.plans;
            },
            folders: function () {
              return self.folders;
            },
            forms: function () {
              return self.forms;
            },
            rule: function () {
              return rule;
            }
          }
        });

        modalInstance.result.then(function (promiseRule) {
          promiseRule.then(self.rules);
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
      };

      self.uiGridOptions = {
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        multiSelect : false,
        enableFiltering: true,
        columnDefs : [
          {
            name : '$id',
            displayName : 'User Id',
            enableCellEdit: false
          },
          {
            name : 'Title',
            enableCellEdit: false
          },
          {
            name : 'Plan',
            displayName : 'Block Plan',
            enableCellEdit: false
          },
          {
            name : 'Folder',
            enableCellEdit: false
          },
          {
            name : 'Form',
            enableCellEdit: false
          },
          {
            name: 'Remove',
            headerCellClass: 'noheader',
            cellTemplate: '<button class="btn-primary" ng-click="getExternalScopes().remove(this)"><span class="glyphicon glyphicon-remove-circle"/></button>'
          },
          {
            name: 'Edit',
            headerCellClass: 'noheader',
            cellTemplate: '<button class="btn-primary" ng-click="getExternalScopes().editRule(this)"><span class="glyphicon glyphicon-edit"/></button>'
          }
        ],
        onRegisterApi : function(gridApi){
          self.gridApi = gridApi;
        }
      };

      self.getPlans = function(){
        PlanService.getList()
          .then(function(plans){
            self.plans = plans;
          });
      };

      self.getFolders = function(){
        FolderService.getList()
          .then(function(folders){
            self.folders = folders;
          });
      };

      self.getForms = function(){
        FormService.getList()
          .then(function(forms){
            self.forms = forms;
          });
      };

      self.getRules = function () {
        TsdvRulesService.getRules()
          .then(function (rules) {
            self.rules = rules;
            self.uiGridOptions.data = self.rules;
          });
      };

      self.getPlans();
      self.getFolders();
      self.getForms();
      self.getRules();

    }]);
