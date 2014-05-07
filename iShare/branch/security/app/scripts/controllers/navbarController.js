angular.module("iShareApp")
.controller("navbarController", ['$scope','$location','$state',
	function($scope,$location,$state){
		$scope.isSelected = function(path){
			return path.search($state.current.name) > -1;
		}
	$scope.path = $location.path();
}]);