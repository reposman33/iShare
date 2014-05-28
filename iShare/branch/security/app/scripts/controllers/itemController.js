angular.module('iShareApp')
.controller("itemController", function($scope,$rootScope,dataService,$stateParams,$location,User,$state,$timeout){
	if($stateParams.contactId){
		getItemsForContact($stateParams.contactId);
	}
	else{
		showMessage("Please wait... retrieving items...","info");
		dataService.getItems()
		.success(function(itemData,status,headers,config,statusText){
			// map all contactids of items
			var contactIds = itemData.map(function(item){
				if(item.contactId){
					return item.contactId;
				}
			});
			// get contactdata for each item
			dataService.getContactsInList(contactIds)
			.success(function(contactData,status,headers,config,statusText){
				// inject each item with contactNAme, contactEmail
				for(var i=0; i<itemData.length; i++){
					for(var j=0; j<contactData.length; j++){
						if(itemData[i].contactId == contactData[j]['_id']['$oid']){
							itemData[i].contactName = contactData[j].name;
							itemData[i].contactEmail = contactData[j].email;
						}
					}
				}
				$scope.items = itemData;
				showMessage("","");
			})
			.error(function(){
				showMessage("Error retrieving contactdata for items","danger");
				$timeout(function(){showMessage("","");},3000);

				})
		})
		.error(function(data,status,headers,config,statusText){
			console.log({msg:'Error retrieving all items',obj:arguments});
		})

	}

	function getItemsForContact(contactId){
		showMessage("Please wait... retrieving items...","info");
		dataService.getContactItems(contactId)
		.success(
			function(data,status,header,config){
				$scope.items = copyId(data);
				dataService.getContact(contactId)
				.success(
					function(data){
						showMessage("","");
						$scope.contact = copyId(data);
					}
				);
			}
		)
		.error(
			function(data,status,header,config,statusText ){
				showMessage("Error retrieving contacts: " + statusText,"danger");
			}
		);
	}

	$scope.saveItem = function(item){
		var _item = {
			userId: User.getId(),
			contactId: $scope.contact.id,
			startDate: item.startDate,
			endDate: item.endDate,
			name: item.name,
			notes: item.notes,
			fileSrc: item.fileSrc,
			fileName: item.fileName,
			fileType: item.fileType,
			fileSize: item.fileSize
		}

		showMessage("Please wait... adding item '" + item.name + "'","info");
		dataService.saveItem(_item)
		.success(
			function(data,status,headers,config){
				// refresh list with items for contact
				getItemsForContact($scope.contact.id);
			}
		)
		.error(
			function(data,status,headers,config,statusText){
				showMessage("Error saving item " + item.fileName + ": " + statusText,"danger");
			}
		)
	}

	$scope.updateItem = function(item){
		showMessage("Please wait... Updating item '" + item.name + "'...","info");
		$scope.editRow = false;
		if(item.fileName==''){
			item.fileSrc='';
			item.fileSize='';
			item.fileType='';
		}
		dataService.updateItem(item)
		.success(function(){
			showMessage("Succesfully updated item '" + item.name + "'","success");
			$rootScope.editRow = false;
							$timeout(
				function(){
					$rootScope.msg = '';
					$rootScope.msgType='';
					},3000);
		})
		.error(
			function(data,status,headers,config,statusText){
				showMessage("Error updating item '" + item.name + "' (" + statusText +")","danger");
				$timeout(
					function(){
						$rootScope.msg = '';
						$rootScope.msgType='';
					},3000);
		});
	}

	// utility functions

	// returned object from Mongolab contains an id with a object value: _id:{$oid:xxx}.
	// This value is not preserved ni ng-repeat, therefore copy this value to a top-level key 'id'
	// @ item: can be an object or an array of objects
	function copyId(item){
		if(Object.prototype.toString.call(item) === '[object Object]'){
			item.id = item._id.$oid;
			return item;
		}
		else if(Object.prototype.toString.call(item) === '[object Array]'){
			var result=[];
			for(var i=0; i<item.length; i++){
				result.push(copyId(item[i]));
			}
			return result;
		}
	}

	//@ msgType: one of 'success','warning','info','danger'
	function showMessage(msg,msgType){
		$rootScope.msg = msg;
		$rootScope.msgType = msgType;
	}

});