'use strict';

angular.module('iShareApp')
.controller('SecurityController', ["$scope","User","dataService",function ($scope,User,dataService) {
	$scope.authenticate = function(credentials) {
		dataService.FBAuthenticate(credentials,function(user){
			console.log(user);
		});
	};

	$scope.register = function(user) {
		dataService.register(user).then(
			function(result){
				$scope.regResult = 'SUCCESS: ' + result;
			},
			function(result){
				$scope.regResult = 'ERROR: ' + result;
			}
		);
	}
}]);
