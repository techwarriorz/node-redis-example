(function(window, angular){
	angular.module('dojo', ['ui.router']);

	angular.module('dojo')
	.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider){
		$urlRouterProvider.otherwise('/');

		$stateProvider
		.state('home', {
			url: '/',
			templateUrl: '/home/home.html',
			controller: 'homeCtrl'
		})
		.state('create', {
			url: '/create',
			templateUrl: '/create/create.html',
			controller: 'createCtrl'
		})
		.state('record', {
			url: '/record/:recordId',
			templateUrl: '/record/record.html',
			controller: 'recordCtrl'
		})		
	}])
})(window, window.angular)