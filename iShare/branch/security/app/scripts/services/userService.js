'use strict';

angular.module('iShareApp')
.factory('User', function(){
	var user = {
		loggedIn: false,
		lastLogin:'',
		id:'',
		accessLevel:'anon' //default level
	}
	var service = {};

	service.logIn = function(data){
		user.loggedIn = true;
		user.id = data.userId;
		user.accessLevel = data.accessLevel;
	}

	service.logOut = function(){
		user.loggedIn = false;
		user.id = undefined;
		user.accessLevel = 'anon';
	}

	service.isLoggedIn = function(){
		return user.loggedIn;
	}

	service.getId = function(){
		return user.id;
	}

	service.setId = function(id){
		return user.id = id;
	}

	service.setLastLogin= function(timeStamp){
		user.lastLogin = timeStamp;
	}

	service.getLastLogin= function(){
		return user.lastLogin;
	}

	service.getAccesLevel = function(){
		return user.accessLevel;
	}

	return service;
});
