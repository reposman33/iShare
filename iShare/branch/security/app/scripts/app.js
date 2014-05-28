angular.module('iShareApp', ['ngRoute','firebase','ui.bootstrap','ui.router'])
.constant('AppConstants',{
	FIREBASE_ISHARE_URL:'https://firelab.firebaseio.com/iShare/',
	FIREBASE_USERS_URL:'https://firelab.firebaseio.com/users/',
	MONGODB_API_KEY:'pW4VAHLo4f6q45xLCZXU77w-7g_As1N2',
	MONGODB_USERS_URL:'https://api.mongolab.com/api/1/databases/ishare/collections/users',
	MONGODB_CONTACTS_URL:'https://api.mongolab.com/api/1/databases/ishare/collections/contacts',
	MONGODB_ITEMS_URL:'https://api.mongolab.com/api/1/databases/ishare/collections/items'
})
.run(function($templateCache,$http){
	$http.get('app/templates/popup.html')
		.then(function(popup){
			$templateCache.put('popup',popup);
		});
})
.config(['$urlRouterProvider','$stateProvider',function($urlRouterProvider,$stateProvider){
	$urlRouterProvider.otherwise('/home');

	// Anonymous routes
	$stateProvider
	.state('login',{
		url:'/login',
		templateUrl:"app/views/login.html",
		controller:"SecurityController",
		data:{
			access: 'anon'
		}
	})
	.state('register',{
		url:'/register',
		templateUrl:"app/views/register.html",
		controller:"SecurityController",
		data:{
			access: 'anon'
		}
	})
	//secured routes
	.state('home',{
		url:'/home',
		templateUrl:"app/views/home.htm",
		controller:"SecurityController",
		data:{
			access: 'user'
		}
	})
	.state('contacts',{
		url:'/contacts',
		templateUrl:"app/views/contacts.htm",
		controller:"contactController",
		data:{
			access: 'user'
		}
	})
	.state('editContact',{
		url:'/contactDetail/:contactId',
		templateUrl:"app/views/contactDetail.htm",
		controller:"contactController",
		data:{
			access: 'user'
		}
	})
	// without contactId: show all items; with contactId: show items for this contact
	.state('contactItems',{
		url:'/items/:contactId',
		templateUrl:"app/views/itemDetail.htm",
		controller:"itemController",
		data:{
			access: 'user'
		}
	})
	.state('items',{
		url:'/items',
		templateUrl:"app/views/items.htm",
		controller:"itemController",
		data:{
			access: 'user'
		}
	})
	.state('itemDetail',{
		url:'itemDetail/:contactId',
		templateUrl:"app/views/itemDetail.htm",
		controller:"itemController",
		data:{
			access: 'user'
		}
	})
	.state('logout',{
		url:'/logout',
		templateUrl:"app/views/login.html",
		controller:"SecurityController",
		data:{
			access: 'user'
		}
	})
}]);
