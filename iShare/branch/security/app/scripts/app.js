angular.module('iShareApp', ['ngRoute','firebase','ui.bootstrap','ui.router'])
.constant('AppConstants',{
	FIREBASE_ISHARE_URL:'https://firelab.firebaseio.com/iShare/',
	FIREBASE_USERS_URL:'https://firelab.firebaseio.com/users/',
	MONGODB_ISHARE_URL:'mongodb://mongoman:rundem@ds033818.mongolab.com:33818/ishare',
})
.run(function($templateCache,$http){
	$http.get('app/templates/popup.html')
		.then(function(popup){
			$templateCache.put('popup',popup);
		});
})
.config(['$urlRouterProvider','$stateProvider',function($urlRouterProvider,$stateProvider){
	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('contacts',{
			url:'/',templateUrl:"app/views/contacts.htm",
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
