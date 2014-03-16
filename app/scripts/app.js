angular.module("iShareApp", ['ngRoute','firebase','ui.bootstrap'])
.constant('AppConstants',{
	FIREBASE_ISHARE_URL:'https://firelab.firebaseio.com/iShare/'
})
.run(function($templateCache,$http){
	$http.get('templates/popup.html')
		.then(function(popup){
			$templateCache.put('popup',popup);
		});
})
.config(["$routeProvider", function($routeProvider,locationProvider){
	$routeProvider
		.when("/contacts", {templateUrl:"views/contacts.htm", controller:"contactController" })
		.when("/contactDetail/:contactId", {templateUrl:"views/contactDetail.htm", controller: "contactController" })
		.when("/items",	{templateUrl:"views/items.htm", controller:"itemController" })
		.when("/itemDetail/:contactId", {templateUrl:"views/itemDetail.htm", controller:"itemDetailController" })
		.otherwise({redirectTo:"/contacts"})
	 }]
)
