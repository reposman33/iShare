'use strict';

angular.module('iShareApp')
.controller('SecurityController', ["$scope","User","dataService","dateFilter",
	function ($scope,User,dataService,dateFilter) {
		$scope.authenticate = function(credentials) {
			dataService.authenticate(credentials).then(
				function(resp){
	console.log(resp);
					if(resp.data.length == 1){
						var now = (new Date()).toString();
						User.logIn(resp.data[0]._id);
						User.setLastLogin(resp.data[0].lastLogin.length > 0 ? resp.data[0].lastLogin : now);
						dataService.setLastLogin(now, resp.data[0]._id.$oid);
						$scope.regResult = "SUCCESS: user authenticated. Lastlogin: " + dateFilter(User.getLastLogin(),'EEEE, dd MMMM yyyy @ hh:mm:ss');
					}
					else{
						$scope.regResult = "ERROR: user not authenticated";
					}
				},
				function(resp){
					$scope.regResult = "Error authenticating";
				}
			);
		};

		$scope.register = function(user){
			dataService.register(user).then(
				function(data){
					$scope.regResult = "SUCCESS: " + data;

				},
				function(data) {
					$scope.regResult = "ERROR: " + data;
				}
			);
		}
	}
]);
