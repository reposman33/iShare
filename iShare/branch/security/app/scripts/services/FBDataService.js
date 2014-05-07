angular.module('iShareApp')
.factory('dataService',['AppConstants','$firebase','$filter','$timeout','$q',
	function(AppConstants,$firebase,$filter,$timeout,$q){
		var itemsRef = new Firebase(AppConstants.FIREBASE_ISHARE_URL + 'items');
		var contactsRef = new Firebase(AppConstants.FIREBASE_ISHARE_URL + 'contacts');
		var usersRef = new Firebase(AppConstants.FIREBASE_USERS_URL);

		var items = $firebase(itemsRef);
		var contacts = $firebase(contactsRef);
		var callbacks = [];
		var service = {};
		var users = [];

		usersRef.on('value',function(snapshot){
			users = snapshot.val();
		});

		// AUTHENTICATE - REGISTER =================

		var authClient = new FirebaseSimpleLogin(new Firebase(AppConstants.FIREBASE_ISHARE_URL), function(error, user) {
			if(user){
				angular.forEach(callbacks, function(cb,ind){
					//execute all registered callbacks
					cb({
						'success':true,
						'data':user
					});
				});
			}
			else if(error){
				cb({
					'success':false,
					'data':error
				});
			}
		});

 		// Authenticate use FireBaseSimpleLogin
		service.FBAuthenticate = function (credentials,callback) {
			callbacks.push(callback);
			authClient.login('password',{
				email: credentials.email,
				password: credentials.password
			});
		};

		// Register use FireBaseSimpleLogin
		service.BRegister = function (credentials, callback) {
			authClient.createUser(credentials.email, credentials.password, function (error, user) {
				callback(error, user)
			});
		}

		// Authenticate use FireBase custom location
		service.authenticate = function (credentials,callback) {

		}

		// Register use FireBase custom location
		service.register = function (credentials) {
			var deferred = $q.defer();
			var userExists = false; // trivial assumption
			var registerSuccess = false;
			var texts = {
				userExists:"Dit e-mail adres is al geregistreerd",
				registerSuccess: "Nieuwe gebruiker is geregistreerd",
				registerFail: "Error toevoegen nieuwe gebruiker"
			}

			$timeout(function(){
				for(var key in users){
					// check for uniqueness provided email
					if(users[key].email == credentials.email){
						userExists = true;
					}
				}
				if(!userExists){
					// add user to location
					usersRef.push(credentials,function(error){
						if(error){
							console.log(error);
							deferred.reject(texts.registerFail);
						}
						else{
							deferred.resolve(texts.registerSuccess);
						}
					})
				}
				else{
					deferred.reject(texts.userExists);
				}
			},100);

			return deferred.promise;
		}

		//CONTACTS =================================
		service.getContacts = function () {
			return contacts;
		}

		service.getContactByContactId = function (id) {
			return contacts.$child(id);
		}

		service.getContact = function (id) {
			return contacts.$child(id);
		}

		service.addContact = function (contact) {
			contacts.$add(contact);
		}

		service.updateContact = function (contactId, contact) {
			var ref = contacts.$child(contactId);
			ref.$update(contact);
		}

		service.deleteContact = function (contactId) {
			contacts.$remove(contactId);
		}


		// ITEMS =================================

		service.addItem = function (item) {
			return items.$add(item);
		}

		service.getItems = function () {
			return items;
		}


		service.getItemsByContact = function (contactId) {
			return $filter('filter')(items, '{id:contactId}');
		}


		service.updateItem = function (item, itemId) {
			return items.$save(itemId).then(function () {
				console.log(arguments)
			});
		}

		service.deleteItem = function (id) {
			return items.$remove(id);
		}

		return service;
	}
]);