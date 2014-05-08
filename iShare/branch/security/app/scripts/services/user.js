'use strict';

angular.module('iShareApp')
.factory('User', function(){
	var user = {
		loggedIn: false,
		lastLogin:'',
		id:''
	}
	var service = {};

	service.logIn = function(userId){
		user.loggedIn = true;
		user.id = userId;
	}

	service.logOut = function(){
		user.loggedIn = false;
		user.id = undefined;
	}

	service.isLoggedIn = function(){
		return user.loggedIn;
	}

	service.getId = function(){
		return user.id;
	}

	service.setLastLogin= function(timeStamp){
		user.lastLogin = timeStamp;
	}

	service.getLastLogin= function(){
		return user.lastLogin;
	}

	return service;
});
