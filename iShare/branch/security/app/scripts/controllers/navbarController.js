angular.module("iShareApp")
.controller("navbarController", ['$scope','$location','$state','User','$rootScope',
	function($scope,$location,$state,User,$rootScope){
		if(!User.isLoggedIn()){
			// force the login page on page refresh
			$state.go('home');
		}
		$rootScope.$on('$stateChangeStart',
			function(event,toState,toParams,fromState,fromParams){
				if(User.getAccesLevel() != toState.data.access){
					$rootScope.error="Geen toegang";
					event.preventDefault();

					if(fromState.url === '^') { // parent???
						if(User.isLoggedIn()){
							$state.go('home');
						}
						else {
							$rootScope.error = null;
							$state.go('login');
						}
					}
				}
			}
		);

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