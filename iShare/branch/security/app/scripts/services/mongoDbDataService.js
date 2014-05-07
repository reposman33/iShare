angular.module('iShareApp')
.service("dataService",['AppConstants','$http',
	function(AppConstants,$http){
	var itemsRef = AppConstants.MONGODB_ISHARE_URL + 'items';
	var contactsRef = AppConstants.MONGODB_ISHARE_URL + 'contacts';
	var service={};

	//CONTACTS =================================
	service.getContacts = function(){
		return contacts;
	}

	service.getContactByContactId = function(id){
		return contacts.$child(id);
	}

	service.getContact = function(id){
		return contacts.$child(id);
	}

	service.addContact = function(contact){
		contacts.$add(contact);
	}

	service.updateContact = function(contactId,contact){
		var ref=contacts.$child(contactId);
		ref.$update(contact);
	}

	service.deleteContact = function(contactId){
		contacts.$remove(contactId);
	}


	// ITEMS =================================
	service.addItem = function(item){
		return items.$add(item);
	}

	service.getItems = function(){
		//return items;
	}


	service.getItemsByContact = function(contactId){
		return $filter('filter')(items,'{id:contactId}');
	}


	service.updateItem = function(item,itemId){
		return items.$save(itemId).then(function(){console.log(arguments)});
	}

	service.deleteItem = function(id){
		return items.$remove(id);
	}

	return service;
	}
]);