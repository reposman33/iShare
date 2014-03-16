angular.module('iShareApp')
.factory("contactFactory",function(){
	var factory={};
	factory.getContactData = function(){
		return contactData;
	};

	factory.getContactById = function(id){
		return contactData;
	};
	return factory;
});