angular.module('iShareApp')
.factory("dataService",['AppConstants','$firebase','$filter',
	function(AppConstants,$firebase,$filter){
		var FBItemsRef = new Firebase(AppConstants.FIREBASE_ISHARE_URL + 'items');
		var FBContactsRef = new Firebase(AppConstants.FIREBASE_ISHARE_URL + 'contacts');

		var items = $firebase(FBItemsRef);
		var contacts = $firebase(FBContactsRef);
		var itemsWithContactData = [];

		FBItemsRef.once('value',function(snap){
			snap.forEach(function(item){
				//retrieve contact of item
				FBContactsRef.child(item.val().contactId)
				.on('value', function(contact){
					// create ref to item.contact
					var itemRef = item.child('contact').ref();
					itemRef.set(contact.val());
 					itemsWithContactData.push(item.val());
				});
			});
		});
		var factory={};

		//CONTACTS =================================

		factory.getContacts = function(){
			return contacts;
		}

		factory.getContactByContactId = function(id){
			return contacts.$child(id);
		}

		factory.getContact = function(id){
			return contacts.$child(id);
		}

		factory.addContact = function(contact){
			contacts.$add(contact);
		}

		factory.updateContact = function(contactId,contact){
			var ref=contacts.$child(contactId);
			ref.$update(contact);
		}

		factory.deleteContact = function(contactId){
			contacts.$remove(contactId);
		}


		// ITEMS =================================

		factory.addItem = function(item){
			return items.$add(item);
		}

		factory.getItems = function(){
			return items;
		}


		factory.getItemsByContact = function(contactId){
			return $filter('filter')(items,'{id:contactId}');
		}


		factory.updateItem = function(item,itemId){
			return items.$save(itemId).then(function(){console.log(arguments)});
		}

		factory.deleteItem = function(id){
			return items.$remove(id);
		}

		return factory;
	}]
);