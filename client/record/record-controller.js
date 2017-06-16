(function(window, angular){
	angular.module('dojo')
	.controller('recordCtrl', ['$scope', '$state', '$http', function($scope, $state, $http){
		$scope.recordData = {};

		$http.get('/get-record?id=' + $state.params.recordId).then(function(response){
			$scope.recordData = response.data.record;
		}, function(err){
			console.log(err);
		});
	}])
})(window, window.angular)