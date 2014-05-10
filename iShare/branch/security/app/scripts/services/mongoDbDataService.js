angular.module('iShareApp')
.service("dataService",['AppConstants','$http','$q','User',
	function(AppConstants,$http,$q,User){
	var itemsRef = AppConstants.MONGODB_ITEMS_URL;
	var contactsRef = AppConstants.MONGODB_CONTACTS_URL;
	var usersRef = AppConstants.MONGODB_USERS_URL;
	var apiKey = AppConstants.MONGODB_API_KEY;
	var texts = {
		emailNotUnique: "This email address has already been registered",
		userRegistered: "User succesfully registered",
		addError: "Error adding user"
	};
	var service={};

	service.register = function(credentials){
		var deferred = $q.defer();
		emailIsUnique(credentials).then(
			// given email address is unique
			function(){
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
			},
			// given email address is NOT unique OR error retrieving data from backend
			function(error){
				deferred.reject(error);
			}
		);
		return deferred.promise;
	};

	service.authenticate = function(credentials){
		credentials = credentials || {};
		credentials.email = credentials.email || '';
		credentials.password = credentials.password || '';

		return $http.get(
			usersRef + '?apiKey=' + apiKey + '&q={email:\'' + credentials.email + '\',password:\'' + credentials.password + '\'}'
		)
	};

	service.setLastLogin = function(timeStamp,_id){
		$http({
			url: usersRef + '/' + _id + '?apiKey=' + apiKey,
			method: 'PUT',
			data: JSON.stringify({'$set':{lastLogin:timeStamp}})
		});
	};

	function addUser(credentials){
		var data = {};
		angular.extend(data,credentials);
		data.registrationDate = new Date().toString();
		data.lastLogin = '';

		return $http.post(
			usersRef + '?apiKey=' + apiKey,
			JSON.stringify(data)
		);
	}

	function emailIsUnique(credentials){
		var deferred = $q.defer();

		$http({method:'GET',url:usersRef + '?apiKey=' + apiKey + '&q={email:\'' + credentials.email + '\'}&c=true'})
			.success(
				// could retrieve info from backend
				function(data){
					if(data==0){
						// given email address is unique
						deferred.resolve();
					}
					else{
						// given email address is NOT unique
						deferred.reject(texts.emailNotUnique);
					}
				}
			)
			// something went wrong with request
			.error(
				function(error){
					deferred.reject(error.message);
				}
			);
		return deferred.promise;
	}

	//CONTACTS =================================
	service.getContacts = function(userId){
		return $http({
			method:'GET',url:contactsRef + '?apiKey=' + apiKey + '&q={userId:\'' + userId + '\'}'
		});
	};

	service.getContactByContactId = function(id){
		return $http({
			method:'GET',url:contactsRef + '?apiKey=' + apiKey + '&q={userId:' + userId + ',_id: + ObjectId(' + id + ')}'
		});
	};

	service.addContact = function(contact){
		return $http({
			method:'POST',
			url: contactsRef + '?apiKey=' + apiKey,
			data: contact
		});
	};

	service.updateContact = function(contactId,contact){
		var ref=contacts.$child(contactId);
		ref.$update(contact);
	};

	service.deleteContact = function(contactId){
		contacts.$remove(contactId);
	};


	// ITEMS =================================
	service.addItem = function(item){
		return items.$add(item);
	};

	service.getItems = function(){
		//return items;
	};


	service.getItemsByContact = function(contactId){
		return $filter('filter')(items,'{id:contactId}');
	};


	service.updateItem = function(item,itemId){
		return items.$save(itemId).then(function(){console.log(arguments)});
	};

	service.deleteItem = function(id){
		return items.$remove(id);
	};

	return service;
	}
]);