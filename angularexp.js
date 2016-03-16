var testApp = angular.module('testApp', ['ngRoute']);

// configure our routes
testApp.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'pages/home.html',
            controller  : 'mainController'
        })

        // route for the about page
        .when('/about', {
            templateUrl : 'pages/about.html',
            controller  : 'aboutController'
        })

        // route for the contact page
        .when('/contact', {
            templateUrl : 'pages/contact.html',
            controller  : 'contactController'
        });
});



// angular.module('docsTemplateUrlDirective', [])
// .controller('Controller', ['$scope', function($scope) {
//   $scope.customer = {
//     name: 'Naomi',
//     address: '1600 Amphitheatre'
//   };
// }])
// .directive('myCustomer', function() {
//   return {
//     templateUrl: 'my-customer.html'
//   };
// });

testApp.directive("header", function() {
  return {
    templateUrl: 'pages/header.html',
    scope: true,
    transclude : false,
    controller: 'MainController'
  };
});

testApp.directive("footer", function() {
  return {
    templateUrl: 'pages/footer.html',
    scope: true,
    transclude : false,
    controller: 'MainController'
  };
});


// create the controller and inject Angular's $scope
testApp.controller('mainController', function($scope) {
    // create a message to display in our view
    $scope.message = 'Welcome to the home page! We have fun and games.';
});

testApp.controller('aboutController', function($scope) {
    $scope.message = 'About us: we are cool. We like cats.';
});

testApp.controller('contactController', function($scope) {
    $scope.message = 'Contact us: Our preferred method of contact is carrier pigeon. If you do not have access to a carrier pigeon, an email will suffice.';
});
