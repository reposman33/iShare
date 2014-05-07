/**
 * Created by marc on 3/5/14.
 */
angular.module("iShareApp")
.filter('filterByPropertyValue',function(){
	return function(propertyValue,filterValue){
		return propertyValue == filterValue;
	}
})