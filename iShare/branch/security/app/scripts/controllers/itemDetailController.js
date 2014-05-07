angular.module('iShareApp')
.controller("itemDetailController", function($scope,dataService,$stateParams){

	if($stateParams.contactId){
		$scope.contact = dataService.getContactByContactId($stateParams.contactId);
		$scope.contact.contactId = $stateParams.contactId;
		$scope.items = dataService.getItems();
	};

	$scope.saveItem = function(){
		$scope.item.contactId = $scope.contact.contactId;
		$scope.item.startDate = $scope.startDate;
		$scope.item.endDate = $scope.endDate;
		dataService.addItem($scope.item);
	};

	$scope.deleteItem = function(id){
		if(confirm('Wil je echt dit item (' + $scope.items[id].name + ') verwijderen?')){
			dataService.deleteItem(id);
		}
	};

	$scope.updateItem = function(item){
		item.contactId = $scope.contact.contactId;
		var result = dataService.updateItem(item,item.$id);
	};

});