"use strict";

var kwizecalApp = angular
  .module('kwizecalApp', ['ngRoute'])
  .config(routing)
  .directive("header", header)
  .directive("footer", footer)

// Service that holds quiz data for sharing between controllers
kwizecalApp.factory('quizService', function() {
  var quiz = {};

  return {
    quiz:function() {
        return quiz;
    },
    setQuiz: function(q) {
        quiz = q;
    },
    getQuiz: function() {
        return quiz;
    }
  };
});

//provides routing for each page template
function routing($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl : 'pages/home.html'
  })

  .when('/takequiz', {
    templateUrl : 'pages/takequiz.html',
    controller : 'quizCtrl'
  })

  .when('/quizzes', {
    templateUrl : 'pages/quizzes.html',
    controller : 'qlCtrl'
  })

  .when('/makequiz', {
    templateUrl : 'pages/makequiz.html',
    controller : 'formCtrl'
   })

   .when('/congrats', {
     templateUrl : 'pages/congrats.html'
   })

   .when('/about', {
     templateUrl : 'pages/about.html'
    });
}

// load header.html
function header() {
  return {
    templateUrl : 'pages/header.html',
    scope: true,
    transclude : false
  };
}

// load footer.html
function footer() {
  return {
    templateUrl : 'pages/footer.html',
    scope : true,
    transclude : false
  };
}
