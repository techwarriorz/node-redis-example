(function(window, angular){
	angular.module('dojo')
	.controller('homeCtrl', ['$scope', '$state', '$http', function($scope, $state, $http){
		
		$scope.records = [];
		$scope.newRecord = {};

		$scope.createRecord = function(record){
			$http.post('/create-record', record).then(function(response){
				grabData();
			}, function(err){
				console.error(err);
			});
		}

		$scope.gotoRecord = function(id){
			$state.go('record', {recordId: id})
		}

		function grabData(){
			$http.get('/get-all-records').then(function(response){
				$scope.records = response.data.records;
			}, function(err){
				console.error(err);
			})
		}

		grabData();

	}])
})(window, window.angular)