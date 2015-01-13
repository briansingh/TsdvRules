'use strict';

var tsdvrules = angular.module('tsdvrules', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'firebase', 'ui.bootstrap', 'ui.grid', 'ui.grid.edit', 'ui.grid.cellNav', 'ui.grid.selection']);

tsdvrules.constant('firebaseUrl', 'https://tsdvrules.firebaseio.com/');

tsdvrules.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainCtrl as mainCtrl'
    })
    .state('plan', {
      url: '/plan',
      templateUrl: 'app/plan/plan.html',
      controller: 'PlanCtrl as planCtrl'
    })
    .state('folder', {
      url: '/folder',
      templateUrl: 'app/folder/folder.html',
      controller: 'FolderCtrl as folderCtrl'
    })
    .state('form', {
      url: '/form',
      templateUrl: 'app/form/form.html',
      controller: 'FormCtrl as formCtrl'
    })
    .state('contact', {
      url: '/contact',
      templateUrl: 'app/contact/contact.html',
      controller: 'ContactCtrl as contactCtrl'
    });

  $urlRouterProvider.otherwise('/');
});

tsdvrules.controller('GlobalCtrl', function(){
  this.message = 'ThisGlobal';
});
