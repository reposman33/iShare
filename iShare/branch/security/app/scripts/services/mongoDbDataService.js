angular.module('iShareApp')
.service("dataService",['AppConstants','$http','$q',
	function(AppConstants,$http,$q){
	var itemsRef = AppConstants.MONGODB_ITEMS_URL;
	var contactsRef = AppConstants.MONGODB_CONTACTS_URL;
	var usersRef = AppConstants.MONGODB_USERS_URL;
	var apiKey = AppConstants.MONGODB_API_KEY;
	var texts = {
		userNotUnique: "This email address has already been registered",
		userRegistered: "User succesfully registered",
		addError: "Error adding user"
	};
	var service={};

	service.register = function(credentials){
		var deferred = $q.defer();
		checkUserIsUnique(credentials).then(
			function(data){
				if(data > 0){
					deferred.reject(texts.userNotUnique);
				}
				else{
					// add new user
					addUser(credentials)
					.success(
						function(data,status,headers,config){
							deferred.resolve(texts.userRegistered);
						}
					)
					.error(
						function(data,status,headers,config){
							deferred.reject(texts.addError + " - status: " + status);
						}
					)
					return deferred.promise;
				}
			},
			function(error){
				deferred.reject("ERROR: " + error.message);
			}
		)
		return deferred.promise;
	}

	service.authenticate = function(credentials){
		credentials = credentials || {};
		credentials.email = credentials.email || '';
		credentials.password = credentials.password || '';

		return $http.get(
			usersRef + '?apiKey=' + apiKey + '&q={email:\'' + credentials.email + '\',password:\'' + credentials.password + '\'}'
		)
	}

	service.setLastLogin = function(timeStamp,_id){
console.log(arguments)
		$http({
			url: usersRef + '/' + _id + '?apiKey=' + apiKey,
			method: 'PUT',
			data: JSON.stringify({'$set':{lastLogin:timeStamp}})
		});
	}

	function addUser(credentials){
		var data = {};
		angular.extend(data,credentials);
		data.registrationDate = new Date();
		data.lastLogin = '';

		return $http.post(
			usersRef + '?apiKey=' + apiKey,
			JSON.stringify(data)
		);
	}

	function checkUserIsUnique(credentials){
		var deferred = $q.defer();

		$http({method:'GET',url:usersRef + '?apiKey=' + apiKey + '&q={email:\'' + credentials.email + '\'}&c=true'})
			.success(
				function(data){
					deferred.resolve(data);
				}
			)
			.error(
				function(error){
					deferred.reject(error.message);
				}
			);

		return deferred.promise;
	}

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