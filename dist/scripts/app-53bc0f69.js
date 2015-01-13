"use strict";var tsdvrules=angular.module("tsdvrules",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngResource","ui.router","firebase","ui.bootstrap","ui.grid","ui.grid.edit","ui.grid.cellNav","ui.grid.selection"]);tsdvrules.constant("firebaseUrl","https://tsdvrules.firebaseio.com/"),tsdvrules.config(["$stateProvider","$urlRouterProvider",function(e,t){e.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainCtrl as mainCtrl"}).state("plan",{url:"/plan",templateUrl:"app/plan/plan.html",controller:"PlanCtrl as planCtrl"}).state("folder",{url:"/folder",templateUrl:"app/folder/folder.html",controller:"FolderCtrl as folderCtrl"}).state("form",{url:"/form",templateUrl:"app/form/form.html",controller:"FormCtrl as formCtrl"}).state("contact",{url:"/contact",templateUrl:"app/contact/contact.html",controller:"ContactCtrl as contactCtrl"}),t.otherwise("/")}]),tsdvrules.controller("GlobalCtrl",function(){this.message="ThisGlobal"}),angular.module("tsdvrules").controller("NavbarCtrl",["$scope",function(e){e.date=new Date}]),angular.module("tsdvrules").directive("tsdvrulesBasicList",function(){return{templateUrl:"components/basic-list/basic-list.html",transclude:!0,scope:{service:"="},controllerAs:"tsdvrulesBasicListCtrl",controller:["$scope","$element","$attrs","$transclude","$log","$q",function(e,t,l,r,o,s){o.log("tsdvrulesBasicListCtrl instantiated");var n=this;n.newTitle="",n.service=e.service,n.getList=function(){n.service.getList().then(function(e){n.list=e})},n.add=function(e){var t,l=s.defer();return n.service.add(e).then(function(e){t=e},function(e){o.log(e)}).then(n.list).then(function(){n.newTitle="",l.resolve(t)}).catch(function(e){o.log(e),l.reject(e)}),l.promise},n.remove=function(e){return n.service.remove(e).then(n.list)},n.getList()}]}}),angular.module("tsdvrules").factory("TsdvRulesService",["$window","$log","$q","$timeout","$http","firebaseUrl",function(e,t,l,r,o,s){t.log("TsdvRulesService instantiated");var n;return{getRules:function(){var e=l.defer();return o.get(s+"rules.json").success(function(l){t.log("TsdvRulesService getRules success",l),n=Object.keys(l).map(function(e){var t=l[e];return t.$id=e,t}),e.resolve(n)}).error(function(l){t.log("TsdvRulesService getRules error",l),e.reject(l)}),e.promise},addRule:function(e){var r=l.defer(),a=angular.copy(e);return o.post(s+"rules.json",a).success(function(e){t.log("TsdvRulesService addRule success",e),a.$id=e.name,n.push(a),r.resolve(a)}).error(function(e){t.log("TsdvRulesService addRule error",e),r.reject(e)}),r.promise},removeRule:function(e){var r=l.defer();return o.delete(s+"rules/"+e.$id+".json").success(function(l){t.log("TsdvRulesService removeRule success",l),n.splice(n.indexOf(e),1),r.resolve()}).error(function(e){t.log("TsdvRulesService removeRule error",e),r.reject(e)}),r.promise},saveRule:function(e){var r=l.defer(),n=angular.copy(e);return n.$id=void 0,o.put(s+"rules/"+e.$id+".json",n).success(function(l){t.log("TsdvRulesService saveRule success",l),r.resolve(e)}).error(function(e){t.log("TsdvRulesService saveRule error",e),r.reject(e)}),r.promise}}}]),angular.module("tsdvrules").factory("PlanService",["$log","$q","$http","firebaseUrl",function(e,t,l,r){var o,s="PlanService",n="plans";return e.log(s+" instantiated"),{getName:function(){return n},getList:function(){var a=t.defer();return l.get(r+n+".json").success(function(t){e.log(s+" getList success",t),o=Object.keys(t).map(function(e){var l=t[e];return l.$id=e,l}),a.resolve(o)}).error(function(t){e.log(s+" getList error",t),a.reject(t)}),a.promise},add:function(a){var i=t.defer(),c=angular.copy(a);return l.post(r+n+".json",c).success(function(t){e.log(s+" add success",t),c.$id=t.name,o.push(c),i.resolve(c)}).error(function(t){e.log(s+" add error",t),i.reject(t)}),i.promise},remove:function(a){var i=t.defer();return l.delete(r+n+"/"+a.$id+".json").success(function(t){e.log(s+" remove success",t),o.splice(o.indexOf(a),1),i.resolve()}).error(function(t){e.log(s+" remove error",t),i.reject(t)}),i.promise}}}]),angular.module("tsdvrules").factory("FolderService",["$log","$q","$http","firebaseUrl",function(e,t,l,r){var o,s="FolderService",n="folders";return e.log(s+" instantiated"),{getName:function(){return n},getList:function(){var a=t.defer();return l.get(r+n+".json").success(function(t){e.log(s+" getList success",t),o=Object.keys(t).map(function(e){var l=t[e];return l.$id=e,l}),a.resolve(o)}).error(function(t){e.log(s+" getList error",t),a.reject(t)}),a.promise},add:function(a){var i=t.defer(),c=angular.copy(a);return l.post(r+n+".json",c).success(function(t){e.log(s+" add success",t),c.$id=t.name,o.push(c),i.resolve(c)}).error(function(t){e.log(s+" add error",t),i.reject(t)}),i.promise},remove:function(a){var i=t.defer();return l.delete(r+n+"/"+a.$id+".json").success(function(t){e.log(s+" remove success",t),o.splice(o.indexOf(a),1),i.resolve()}).error(function(t){e.log(s+" remove error",t),i.reject(t)}),i.promise}}}]),angular.module("tsdvrules").factory("FormService",["$log","$q","$http","firebaseUrl",function(e,t,l,r){var o,s="FormService",n="forms";return e.log(s+" instantiated"),{getName:function(){return n},getList:function(){var a=t.defer();return l.get(r+n+".json").success(function(t){e.log(s+" getList success",t),o=Object.keys(t).map(function(e){var l=t[e];return l.$id=e,l}),a.resolve(o)}).error(function(t){e.log(s+" getList error",t),a.reject(t)}),a.promise},add:function(a){var i=t.defer(),c=angular.copy(a);return l.post(r+n+".json",c).success(function(t){e.log(s+" add success",t),c.$id=t.name,o.push(c),i.resolve(c)}).error(function(t){e.log(s+" add error",t),i.reject(t)}),i.promise},remove:function(a){var i=t.defer();return l.delete(r+n+"/"+a.$id+".json").success(function(t){e.log(s+" remove success",t),o.splice(o.indexOf(a),1),i.resolve()}).error(function(t){e.log(s+" remove error",t),i.reject(t)}),i.promise}}}]),angular.module("tsdvrules").controller("PlanCtrl",["$log","PlanService",function(e,t){e.log("PlanCtrl instantiated");var l=this;l.service=t}]),angular.module("tsdvrules").controller("FolderCtrl",["$log","FolderService",function(e,t){e.log("FolderCtrl instantiated");var l=this;l.service=t}]),angular.module("tsdvrules").controller("FormCtrl",["$log","FormService",function(e,t){e.log("FormCtrl instantiated");var l=this;l.service=t}]),angular.module("tsdvrules").controller("ModalDialogCtrl",["$scope","$log","$q","$modalInstance","plans","folders","forms","rule","TsdvRulesService",function(e,t,l,r,o,s,n,a,i){t.log("ModalDialogCtrl instantiated");var c=this;c.plans=o,c.folders=s,c.forms=n,c.rule=a,c.save=function(){var e;e=c.rule?c.editRule(c.rule):c.createRule(),r.close(e)},c.cancel=function(){r.dismiss("cancel")},c.editRule=function(e){e.Title=c.ruleTitle,e.Plan=c.selectedPlan.Title,e.Folder=c.selectedFolder.Title,e.Form=c.selectedForm.Title;var r,o=l.defer();return i.saveRule(e).then(function(e){r=e,o.resolve(r)},function(e){t.log(e)}).catch(function(e){t.log(e),o.reject(e)}),o.promise},c.createRule=function(){var e,r=l.defer();return i.addRule({Title:c.ruleTitle,Plan:c.selectedPlan.Title,Folder:c.selectedFolder.Title,Form:c.selectedForm.Title}).then(function(t){e=t,r.resolve(e)},function(e){t.log(e)}).catch(function(e){t.log(e),r.reject(e)}),r.promise},c.populateExistingRule=function(){if(c.rule){c.ruleTitle=c.rule.Title;var e=o.filter(function(e){return e.Title==c.rule.Plan});c.selectedPlan=e[0];var t=s.filter(function(e){return e.Title==c.rule.Folder});c.selectedFolder=t[0];var l=n.filter(function(e){return e.Title==c.rule.Form});c.selectedForm=l[0]}},c.populateExistingRule()}]),angular.module("tsdvrules").controller("MainCtrl",["$scope","$log","$q","$modal","PlanService","FolderService","FormService","TsdvRulesService",function(e,t,l,r,o,s,n,a){t.log("MainCtrl instantiated");var i=this;i.remove=function(e){t.log("MainCtrl remove childScope",e.$parent.row.entity);var l=e.$parent.row.entity;a.removeRule(l).then(i.rules)},i.editRule=function(e){t.log("MainCtrl editRule childScope",e.$parent.row.entity);var l=e.$parent.row.entity;i.open(l)},i.open=function(e){var l=r.open({templateUrl:"app/modal-dialog/modal-dialog.html",controller:"ModalDialogCtrl as modalDialogCtrl",resolve:{plans:function(){return i.plans},folders:function(){return i.folders},forms:function(){return i.forms},rule:function(){return e}}});l.result.then(function(e){e.then(i.rules)},function(){t.info("Modal dismissed at: "+new Date)})},i.uiGridOptions={enableRowSelection:!0,enableRowHeaderSelection:!1,multiSelect:!1,enableFiltering:!0,columnDefs:[{name:"$id",displayName:"User Id",enableCellEdit:!1},{name:"Title",enableCellEdit:!1},{name:"Plan",displayName:"Block Plan",enableCellEdit:!1},{name:"Folder",enableCellEdit:!1},{name:"Form",enableCellEdit:!1},{name:"Remove",headerCellClass:"noheader",cellTemplate:'<button class="btn-primary" ng-click="getExternalScopes().remove(this)"><span class="glyphicon glyphicon-remove-circle"/></button>'},{name:"Edit",headerCellClass:"noheader",cellTemplate:'<button class="btn-primary" ng-click="getExternalScopes().editRule(this)"><span class="glyphicon glyphicon-edit"/></button>'}],onRegisterApi:function(e){i.gridApi=e}},i.getPlans=function(){o.getList().then(function(e){i.plans=e})},i.getFolders=function(){s.getList().then(function(e){i.folders=e})},i.getForms=function(){n.getList().then(function(e){i.forms=e})},i.getRules=function(){a.getRules().then(function(e){i.rules=e,i.uiGridOptions.data=i.rules})},i.getPlans(),i.getFolders(),i.getForms(),i.getRules()}]),angular.module("tsdvrules").controller("ContactCtrl",["$scope",function(){console.log("ContactCtrl instantiated")}]),function(e){try{e=angular.module("tsdvrules")}catch(t){e=angular.module("tsdvrules",[])}e.run(["$templateCache",function(e){e.put("app/contact/contact.html",'<div class="container"><h1>Contact</h1><img src="../../assets/images/finalproject.JPG"> <img src="../../assets/images/voyager-graphic2.jpg"></div>')}])}(),function(e){try{e=angular.module("tsdvrules")}catch(t){e=angular.module("tsdvrules",[])}e.run(["$templateCache",function(e){e.put("app/folder/folder.html",'<div class="container"><tsdvrules-basic-list service="folderCtrl.service"></tsdvrules-basic-list></div>')}])}(),function(e){try{e=angular.module("tsdvrules")}catch(t){e=angular.module("tsdvrules",[])}e.run(["$templateCache",function(e){e.put("app/form/form.html",'<div class="container"><tsdvrules-basic-list service="formCtrl.service"></tsdvrules-basic-list></div>')}])}(),function(e){try{e=angular.module("tsdvrules")}catch(t){e=angular.module("tsdvrules",[])}e.run(["$templateCache",function(e){e.put("app/graphs/graphs.html",'<div class="container graphs-page"><h1>Graphs with D3</h1><button ng-click="graphsCtrl.generateData()">Generate new data</button><div class="row"><div class="col-md-12"><ajst-todo-graph todos="graphsCtrl.todos"></ajst-todo-graph></div></div></div>')}])}(),function(e){try{e=angular.module("tsdvrules")}catch(t){e=angular.module("tsdvrules",[])}e.run(["$templateCache",function(e){e.put("app/admin/admin.html",'<div class="container admin-page"><h1>You are an administrator! I\'m so proud.</h1><a ui-sref="admin.users">Users</a><ui-view></ui-view></div>')}])}(),function(e){try{e=angular.module("tsdvrules")}catch(t){e=angular.module("tsdvrules",[])}e.run(["$templateCache",function(e){e.put("app/main/main.html",'<div class="container"><h1>Rule</h1><div class="row"><div class="col-md-12"><button class="btn btn-default" ng-click="mainCtrl.open()">Create Rule</button></div></div><div class="row"><div class="col-md-12"><div class="control-group"><label class="control-label">Rules</label></div></div></div><div class="user-grid" external-scopes="mainCtrl" ui-grid="mainCtrl.uiGridOptions" ui-grid-selection=""></div></div>')}])}(),function(e){try{e=angular.module("tsdvrules")}catch(t){e=angular.module("tsdvrules",[])}e.run(["$templateCache",function(e){e.put("app/modal-dialog/modal-dialog.html",'<div class="modal-header"><h3 class="modal-title">Create Rule</h3></div><div class="modal-body"><form><div class="form-group"><label>Block Plan</label><div><select class="form-control" ng-model="modalDialogCtrl.selectedPlan" ng-options="plan.Title for plan in modalDialogCtrl.plans"></select></div></div><div class="form-group"><label>Title</label><div><input class="form-control" type="text" placeholder="Enter rule title" ng-model="modalDialogCtrl.ruleTitle"></div></div><div class="form-group"><label>Folder</label><div><select class="form-control" ng-model="modalDialogCtrl.selectedFolder" ng-options="folder.Title for folder in modalDialogCtrl.folders"></select></div></div><div class="form-group"><label>Form</label><div><select class="form-control" ng-model="modalDialogCtrl.selectedForm" ng-options="form.Title for form in modalDialogCtrl.forms"></select></div></div></form></div><div class="modal-footer"><button class="btn btn-primary" ng-click="modalDialogCtrl.save()">Save</button> <button class="btn btn-warning" ng-click="modalDialogCtrl.cancel()">Cancel</button></div>')}])}(),function(e){try{e=angular.module("tsdvrules")}catch(t){e=angular.module("tsdvrules",[])}e.run(["$templateCache",function(e){e.put("app/profile/profile.html",'<div class="container"><h4 id="ErrorMessage" class="row">{{profileCtrl.err.message}}</h4><h1>Profile</h1><h1 class="row">{{profileCtrl.mode}}</h1><form ng-submit="profileCtrl.submit(globalCtrl.user.uid, globalCtrl.user.name, globalCtrl.user.password.email)" class="row"><div class="form-group" ng-show="profileCtrl.mode==\'Edit\'"><label for="">User Name</label> <input type="name" class="form-control" placeholder="Name" ng-model="globalCtrl.user.name"></div><div class="form-group"><label for="">Email address</label> <input type="email" class="form-control" placeholder="Email" ng-model="globalCtrl.user.password.email"></div><div class="form-group"><label>Password</label> <input type="password" class="form-control" placeholder="Password" ng-model="profileCtrl.password"></div><button type="submit" class="btn btn-default">{{profileCtrl.mode}}</button></form><p class="row"><button type="button" class="btn btn-link" ng-click="profileCtrl.mode=\'Edit\'">Edit profile</button></p><p class="row"><button type="button" class="btn btn-link" ng-click="profileCtrl.mode=\'Delete\'">Delete profile</button></p></div>')}])}(),function(e){try{e=angular.module("tsdvrules")}catch(t){e=angular.module("tsdvrules",[])}e.run(["$templateCache",function(e){e.put("app/plan/plan.html",'<div class="container"><tsdvrules-basic-list service="planCtrl.service"></tsdvrules-basic-list></div>')}])}(),function(e){try{e=angular.module("tsdvrules")}catch(t){e=angular.module("tsdvrules",[])}e.run(["$templateCache",function(e){e.put("components/basic-list/basic-list.html",'<ng-transclude></ng-transclude><h1 style="text-transform: capitalize">{{ tsdvrulesBasicListCtrl.service.getName()}}</h1><div class="row"><div class="col-md-12"><form ng-submit="tsdvrulesBasicListCtrl.add({ Title : tsdvrulesBasicListCtrl.newTitle })"><input type="text" class="form-control" ng-model="tsdvrulesBasicListCtrl.newTitle" placeholder="Type title here"></form></div></div><div class="row"><div class="col-md-12"><ul class="todos"><li class="todo-item slide-animation" ng-repeat="item in tsdvrulesBasicListCtrl.list track by item.$id"><div class="input-group"><input type="text" class="form-control" ng-model="item.Title"> <span class="input-group-btn"><button class="btn btn-default" ng-click="tsdvrulesBasicListCtrl.remove(item)"><span class="glyphicon glyphicon-remove-circle"><span class="sr-only">Remove</span></span></button></span></div></li></ul></div></div>')}])}(),function(e){try{e=angular.module("tsdvrules")}catch(t){e=angular.module("tsdvrules",[])}e.run(["$templateCache",function(e){e.put("components/navbar/navbar.html",'<nav class="navbar navbar-default" ng-controller="NavbarCtrl"><div class="navbar-header"><a class="navbar-brand" href="https://github.com/Swiip/generator-gulp-angular"><span class="glyphicon glyphicon-home"></span> Gulp Angular</a></div><div class="collapse navbar-collapse" id="bs-example-navbar-collapse-6"><ul class="nav navbar-nav"><li class="active"><a ui-sref="home">Home</a></li><li><a ui-sref="plan">Plan</a></li><li><a ui-sref="folder">Folder</a></li><li><a ui-sref="form">Form</a></li><li><a ui-sref="contact">Contact</a></li></ul><ul class="nav navbar-nav navbar-center"><li>Message: {{ message }}</li></ul><ul class="nav navbar-nav navbar-right"><li>Current date: {{ date | date:\'yyyy-MM-dd\' }}</li></ul></div></nav>')}])}(),function(e){try{e=angular.module("tsdvrules")}catch(t){e=angular.module("tsdvrules",[])}e.run(["$templateCache",function(e){e.put("components/todo-list/todo-list.html",'<ng-transclude></ng-transclude><div>Inside directive template, new todo title: {{newTodoTitle}}<br><span ng-bind="newTodoTitle"></span><br><input ng-model="newTodoTitle" type="text"></div><ul class="todos"><li class="todo-item slide-animation" ng-repeat="todo in ajstTodoListCtrl.todos track by todo.$id" ng-class="ajstTodoListCtrl.getToDoClasses(todo)"><div class="input-group"><span class="input-group-addon"><input type="checkbox" ng-model="todo.completed" ng-change="ajstTodoListCtrl.saveTodo(todo)"></span> <input type="text" class="form-control" ng-model="todo.title" ng-change="ajstTodoListCtrl.saveTodo(todo)"> <span class="input-group-btn"><button class="btn btn-default" ng-click="ajstTodoListCtrl.removeTodo(todo)"><span class="glyphicon glyphicon-remove-circle"><span class="sr-only">Remove</span></span></button></span></div></li></ul>')}])}(),function(e){try{e=angular.module("tsdvrules")}catch(t){e=angular.module("tsdvrules",[])}e.run(["$templateCache",function(e){e.put("app/login/login.html",'<div class="container login-page"><h4 id="ErrorMessage" class="row">{{loginCtrl.err.message}}</h4><h1 class="row">{{loginCtrl.mode}}</h1><h2>{{globalCtrl.user}}</h2><form ng-submit="loginCtrl.submit()" class="row"><div class="form-group"><label for="">Email address</label> <input type="email" class="form-control" placeholder="Email" ng-model="loginCtrl.email"></div><div class="form-group" ng-show="loginCtrl.mode!=\'ResetPassword\'"><label>Password</label> <input type="password" class="form-control" placeholder="Password" ng-model="loginCtrl.password"></div><button type="submit" class="btn btn-default">{{loginCtrl.mode}}</button></form><p class="row" ng-show="loginCtrl.mode==\'Login\'"><button type="button" class="btn btn-link" ng-click="loginCtrl.mode=\'Register\'">Register new account</button></p><p class="row" ng-show="loginCtrl.mode==\'Login\'"><button type="button" class="btn btn-link" ng-click="loginCtrl.mode=\'ResetPassword\'">Reset password</button></p></div>')}])}(),function(e){try{e=angular.module("tsdvrules")}catch(t){e=angular.module("tsdvrules",[])}e.run(["$templateCache",function(e){e.put("app/admin/users/users.html",'<div class="row"><div class="col-md-12"><h2>Users</h2><div class="user-grid" ui-grid="adminUsersCtrl.uiGridOptions" ui-grid-edit="" ui-grid-cellnav=""></div></div></div>')}])}();