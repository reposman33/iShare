angular.module("iShareApp")
.controller("contactController",
	function($scope,dataService,$location,$stateParams,arrayService){
		$scope.contacts = dataService.getContacts();

		//retrieve id of contact to edit
		if($stateParams.contactId){
			$scope.contact = dataService.getContact($stateParams.contactId);
		}

		$scope.addContact = function(){
			dataService.addContact({
				id: 			$scope.contacts.length + 1,
				name:		    $scope.newContact.name,
				address:		$scope.newContact.address,
				zipcode:		$scope.newContact.zipcode,
				city:			$scope.newContact.city,
				telephone:		$scope.newContact.telephone,
				email:		    $scope.newContact.email
			});
			//empty inputfields
			$scope.newContact.name = '';
			$scope.newContact.address = '';
			$scope.newContact.addressNr = '';
			$scope.newContact.zipcode = '';
			$scope.newContact.city = '';
			$scope.newContact.telephone = '';
			$scope.newContact.email= '';
		};

		$scope.deleteContact = function(contactId){
			var contactIndex = arrayService.retrieveItemIndex($scope.contacts,"id",contactId)
			var contactData = arrayService.retrieveItemData($scope.contacts,"id",contactId);
			if(confirm("Wilt u dit contact (" + contactData.itemData['name'] + ") verwijderen?")){
				dataService.deleteContact(contactId);
			}
		};
		
		$scope.editContact = function(contactId){
			$location.path("/contactDetail/" + contactId);
		};

		$scope.updateContact = function(contactId){
			dataService.updateContact(contactId,$scope.contact);
			$location.path("/contacts/");
		};
		
		// toon item detail partial om nieuw item aan contact toe te voegen
		$scope.itemDetail = function(contactId){
			$location.path("/itemDetail/" + contactId);
		};

		$scope.goTo = function(path){
			$location.path("/" + path);
		}
	}
);