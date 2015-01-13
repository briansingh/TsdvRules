'use strict';

angular.module('tsdvrules')
  .controller('ModalDialogCtrl', function ($scope, $log, $q, $modalInstance, plans, folders, forms, rule, TsdvRulesService) {

    $log.log('ModalDialogCtrl instantiated');
    var self = this;
    self.plans = plans;
    self.folders = folders;
    self.forms = forms;
    self.rule = rule;

    self.save = function () {
      var promiseRule;
      if(self.rule)
        promiseRule = self.editRule(self.rule);
      else
        promiseRule = self.createRule();
      $modalInstance.close(promiseRule);
    };

    self.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    self.editRule = function(rule){
      rule.Title = self.ruleTitle;
      rule.Plan = self.selectedPlan.Title;
      rule.Folder = self.selectedFolder.Title;
      rule.Form = self.selectedForm.Title;
      var deferred = $q.defer();
      var updateRule;
      TsdvRulesService.saveRule(rule)
        .then(function (result) {
          updateRule = result;
          deferred.resolve(updateRule);
        },
        function (err) {
          $log.log(err);
        })
        .catch(function (err) {
          $log.log(err);
          deferred.reject(err);
        });
      return deferred.promise;
    };


    self.createRule = function () {
      var deferred = $q.defer();
      var newRule;
      TsdvRulesService.addRule({
        Title: self.ruleTitle,
        Plan: self.selectedPlan.Title,
        Folder: self.selectedFolder.Title,
        Form: self.selectedForm.Title
      })
        .then(function (result) {
          newRule = result;
          deferred.resolve(newRule);
        },
        function (err) {
          $log.log(err);
        })
        .catch(function (err) {
          $log.log(err);
          deferred.reject(err);
        });
      return deferred.promise;
    };

    self.populateExistingRule = function(){
      if(self.rule){
        self.ruleTitle = self.rule.Title;
        var filterPlans = plans.filter(function(item){
          return item.Title == self.rule.Plan;
        });
        self.selectedPlan = filterPlans[0];
        var filterFolders = folders.filter(function(item){
          return item.Title == self.rule.Folder;
        });
        self.selectedFolder = filterFolders[0];
        var filterForms = forms.filter(function(item){
          return item.Title == self.rule.Form;
        });
        self.selectedForm = filterForms[0];
      }
    };

    self.populateExistingRule();

  });
