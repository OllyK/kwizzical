"use strict";

/*advantage of angular - no global variables - functions are local to module*/
var kwizecalApp = angular
  .module('kwizecalApp', ['ngRoute'])
  .config(routing)
  .directive("header", header)
  .directive("footer", footer)

function routing($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl : 'pages/home.html'
  })

  .when('/takequiz', {
    templateUrl : 'pages/takequiz.html',
    controller : 'quizCtrl'
  })

  .when('/makequiz', {
    templateUrl : 'pages/makequiz.html',
    controller : 'formCtrl'
   })

   .when('/congrats', {
     templateUrl : 'pages/congrats.html'
    });
}

function header() {
  return {
    templateUrl : 'pages/header.html',
    scope: true,
    transclude : false
  };
}

function footer() {
  return {
    templateUrl : 'pages/footer.html',
    scope : true,
    transclude : false
  };
}

//check JSON data is in the correct format(4 choices per question etc.)
function checkJSON(data) {
  for(var i = 0; i < data.length; i++) {
    if(data[i].choices.length != 4) {
      console.log("Error: question " +  i + " has incorrect number of choices.");
    }
  }
  //put other checks in
}
