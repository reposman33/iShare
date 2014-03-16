angular.module("iShareApp")
.controller("navbarController", ['$scope','$location',
	function($scope,$location){
		$scope.isSelected = function(path){
		var path = path.split(',');
		found = false;
		for(var i=0;i<path.length;i++){
			var item = path[i];
			if($location.$$path.indexOf(item) >= 0){
				found = true;
			};
		}
		return found;
	}
	$scope.path = $location.path();
}]);