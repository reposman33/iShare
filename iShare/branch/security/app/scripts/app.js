angular.module('iShareApp', ['ngRoute','firebase','ui.bootstrap','ui.router'])
.constant('AppConstants',{
	FIREBASE_ISHARE_URL:'https://firelab.firebaseio.com/iShare/',
	FIREBASE_USERS_URL:'https://firelab.firebaseio.com/users/',
	MONGODB_API_KEY:'pW4VAHLo4f6q45xLCZXU77w-7g_As1N2',
	MONGODB_USERS_URL:'https://api.mongolab.com/api/1/databases/ishare/collections/users',
	MONGODB_CONTACTS_URL:'https://api.mongolab.com/api/1/databases/ishare/collections/contacts?apiKey=pW4VAHLo4f6q45xLCZXU77w-7g_As1N2',
	MONGODB_ITEMS_URL:'https://api.mongolab.com/api/1/databases/ishare/collections/items?apiKey=pW4VAHLo4f6q45xLCZXU77w-7g_As1N2'
})
.run(function($templateCache,$http){
	$http.get('app/templates/popup.html')
		.then(function(popup){
			$templateCache.put('popup',popup);
		});
})
.config(['$urlRouterProvider','$stateProvider',function($urlRouterProvider,$stateProvider){
	$urlRouterProvider.otherwise('/home');
	$stateProvider
		.state('home',{
			url:'/z`',
			templateUrl:"app/views/home.htm",
			controller:"SecurityController"
		})
		.state('contacts',{
			url:'/contacts',
			templateUrl:"app/views/contacts.htm",
			controller:"contactController"
		})
		.state('contactDetail',{
			url:'/contactDetail/:contactId',
			templateUrl:"app/views/contactDetail.htm",
			controller:"contactController"
		})
		.state('items',{
			url:'/items',
			templateUrl:"app/views/items.htm",
			controller:"itemController"
		})
		.state('itemDetail',{
			url:'/itemDetail/:contactId',
			templateUrl:"app/views/itemDetail.htm",
			controller:"itemDetailController"
		})
		.state('login',{
			url:'/login',
			templateUrl:"app/views/login.html",
			controller:"SecurityController"
		})
		.state('logout',{
			url:'/logout',
			templateUrl:"app/views/login.html",
			controller:"SecurityController"
		})
		.state('register',{
			url:'/register',
			templateUrl:"app/views/register.html",
			controller:"SecurityController"
		})
}])
//.config(["$routeProvider", function($routeProvider,locationProvider){
//	$routeProvider
//		.when("/contacts", {templateUrl:"views/contacts.htm", controller:"contactController" })
//		.when("/contactDetail/:contactId", {templateUrl:"views/contactDetail.htm", controller: "contactController" })
//		.when("/items",	{templateUrl:"views/items.htm", controller:"itemController" })
//		.when("/itemDetail/:contactId", {templateUrl:"views/itemDetail.htm", controller:"itemDetailController" })
//		.when('/login', {templateUrl: 'views/login.html',controller: 'SecurityController'})
//		.when('/register', {templateUrl: 'views/register.html',controller: 'SecurityController'})
//		.otherwise({redirectTo:"/contacts"})
//	 }]
//)
