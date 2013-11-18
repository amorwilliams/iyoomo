var Projects = [
		{name: '知乎', description:'this is a good site', site: 'www.zhihu.com', $id: '123123'},
		{name: '百度', description:'welecom to my site', site: 'www.baidu.com', $id: '123123'},
		{name: '百度', description:'welecom to my site', site: 'www.baidu.com', $id: '123123'},
		{name: '百度', description:'welecom to my site', site: 'www.baidu.com', $id: '123123'},
		{name: '百度', description:'welecom to my site', site: 'www.baidu.com', $id: '123123'},
		{name: '百度', description:'welecom to my site', site: 'www.baidu.com', $id: '123123'},
		{name: '百度', description:'welecom to my site', site: 'www.baidu.com', $id: '123123'},
	];

// Declare app level module which depends on filters, and services

var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'create/partials/list',
			controller: 'ListCtrl'
		})
		.when('/new', {
	      templateUrl: 'create/partials/detail',
	      controller: 'CreateCtrl'
	    })
	    .otherwise({
	      redirectTo: '/'
	    });
}]);

/*
var myApp = angular.module('myApp', ['ngRoute', 'firebase'])
	.value('fbURL', 'https://angularjs-projects.firebaseio.com/')
	.factory('Projects', function(angularFireCollection, fbURL))
	.config(function ($routeProvider) {
	  $routeProvider
	    .when('/', {
	      templateUrl: 'product/create/partials/list',
	      controller: 'ListCtrl'
	    }).
	    when('/new', {
	      templateUrl: 'product/create/partials/detail',
	      controller: 'CreateCtrl'
	    }).
	    otherwise({
	      redirectTo: '/'
	    });
});
*/

var ListCtrl = ['$scope', '$http', function($scope, $http){
	$scope.projects = Projects;
}];

function CreateCtrl($scope, $location, $timeout) {
  $scope.save = function() {
    Projects.add($scope.project, function() {
      $timeout(function() { $location.path('/'); });
    });
  }
}

/*
function EditCtrl($scope, $location, $routeParams, angularFire, fbURL) {
  angularFire(fbURL + $routeParams.projectId, $scope, 'remote', {}).
  then(function() {
    $scope.project = angular.copy($scope.remote);
    $scope.project.$id = $routeParams.projectId;
    $scope.isClean = function() {
      return angular.equals($scope.remote, $scope.project);
    }
    $scope.destroy = function() {
      $scope.remote = null;
      $location.path('/');
    };
    $scope.save = function() {
      $scope.remote = angular.copy($scope.project);
      $location.path('/');
    };
  });
}
*/