angular.module('iShareApp')
.factory("arrayService",function(){
	// Array helpers
	var service = {};

	// haal array index van arrayitem met id @id op
	service.retrieveItemIndex = function (array,key,value){
		var item = {}
		item.found = false;
		item.itemData = -1
		for (var i = 0; i < array.length; i++) {
			if(array[i][key] == value){
				item.found = true;
				item.itemData = i
				break;
			}
		}
		return item;
	}

	// haal arrayitem id @id op
	service.retrieveItemData = function(array,key,value){
		var item = {};
		item.found = false;
		item.itemData = {};
		for (var i = 0; i < array.length; i++) {
			if(array[i][key] == value){
				item.found = true;
				item.itemData = array[i];
				break;
			}
		}
		return item;
	}
	
	service.getItemsByKey = function(array,key,value){
		var result=[];
		for(var i=0; i<array.length; i++){
			if(array[i][key] == value){
				result.push(array[i]);
			}
		}
		return result;
	}
	
	return service;
})