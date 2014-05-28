angular.module("iShareApp")
.controller("contactController",
	function($rootScope,$scope,dataService,$location,$stateParams,arrayService,User,$state,$timeout){
		if($stateParams.contactId){
			showMessage("Please wait...retrieving contactDetails","info");
			//retrieve contactdetail
			dataService.getContact($stateParams.contactId)
			.success(
				function(data){
					$scope.contact = data;
					showMessage("","");
				}
			)
			.error(
				function(error){
					showMessage("ERROR retrieving contactDetails","danger");
					$timeout(function(){showMessage("","");},3000);
				}
			)
		}
		else{
			// retrieve all contacts for user
			getContactsByUserId(User.getId());
		}

		// $scope API =====================

		function getContactsByUserId(userId){
			showMessage("Please wait...retrievinging contactDetails for user","info");
			dataService.getContactsByUserId(userId)
			.success(
				function(data){
					// inject contactId
					for(var i=0,length=data.length; i<length; i++){
						data[i].id = data[i]._id.$oid;
					};
					$scope.contacts = data;
					showMessage("","");
				}
			)
			.error(
				function(data){
					showMessage("Error retrieving contacts: " + data.message,"danger");
					$timeout(function(){showMessage("","");},3000);
				}
			)
		}

		$scope.addContact = function(){
			showMessage("Please wait...adding contact","info");
			dataService.addContact({
				name:		    $scope.newContact.name,
				address:		$scope.newContact.address,
				zipcode:		$scope.newContact.zipcode,
				city:			$scope.newContact.city,
				telephone:		$scope.newContact.telephone,
				email:		    $scope.newContact.email,
				userId:         User.getId()
			});
			//empty inputfields
			$scope.newContact.name = '';
			$scope.newContact.address = '';
			$scope.newContact.addressNr = '';
			$scope.newContact.zipcode = '';
			$scope.newContact.city = '';
			$scope.newContact.telephone = '';
			$scope.newContact.email= '';

			// retrieve all contacts for user
			showMessage("Please wait...retrieving contacts","info");
			getContacts(User.getId());
			$timeout(function(){showMessage("","");},1000);
		};

		$scope.deleteContact = function(contactId){
			var contactIndex = arrayService.retrieveItemIndex($scope.contacts,"id",contactId)
			var contactData = arrayService.retrieveItemData($scope.contacts,"id",contactId);
			if(confirm("Wilt u dit contact (" + contactData.itemData['name'] + ") verwijderen?")){
				showMessage("Please wait...deleting contact","info");
				dataService.deleteContact(contactId);
				$timeout(function(){showMessage("","");},1000);
			}
		};

		$scope.updateContact = function(contactId,contact){
			showMessage("Please wait...updateing contact","info");
			delete contact['id'];
			dataService.updateContact(contactId,contact)
			.success(
				function(data,status,headers,config){
					showMessage("","");
					$location.path("/contacts");
				}
			)
			.error(
				function(data,status,headers,config){
					showMessage("Error updating contact: " + data.msg,"danger");
				}
			)
		};
		
		// toon item detail partial om nieuw item aan contact toe te voegen
		$scope.itemDetail = function(contactId){
			$location.path("/items/itemDetail/" + contactId);
		};

		$scope.goTo = function(path){
			$location.path("/" + path);
		}

		//@ msgType: one of 'success','warning','info','danger'
		function showMessage(msg,msgType){
			$rootScope.msg = msg;
			$rootScope.msgType = msgType;
		}

	}
);