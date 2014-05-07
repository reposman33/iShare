angular.module('iShareApp')
.controller("itemController", function($scope,dataService,$stateParams,$location){

	$scope.getItems = function(){
		return dataService.getItems();
	}

	$scope.getContact = function(contactId){
		var contact = dataService.getContactByContactId(contactId);
		contact.on('value',function(snap){
			$scope.contact = snap.val();
		});
	}

	$scope.items = $scope.getItems();

	if($stateParams.contactId){
		$scope.contact = dataService.getContactByContactId($stateParams.contactId);
	}

});