angular.module("iShareApp")
.controller("navbarController", ['$scope','$location','$state','User',
	function($scope,$location,$state,User){
		$scope.path = $location.path();
		$scope.User = User;

		$scope.isSelected = function(path){
			return path.search($state.current.name) > -1;
		}

		$scope.logOut = function(){
			$state.transitionTo('home');
			User.logOut();
		}
	}]);