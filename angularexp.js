"use strict";

/*place call to load angular in <head> - calls to angular.module can
only be compiled after the library has been loaded*/
/*advantage of angular - no global variables - functions are local to module*/

var testApp = angular.module('testApp', []);

testApp.directive("header", header);

testApp.directive("footer", footer);

testApp.directive("quiz", quiz);


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
testApp.controller('quizController', runQuiz);

function header() {
  return {
    templateUrl: 'pages/header.html',
    scope: true,
    transclude : false,
    controller: 'quizController'
  };
}

function footer() {
  return {
    templateUrl: 'pages/footer.html',
    scope: true,
    transclude : false,
    controller: 'quizController'
  };
}

function quiz() {
  return {
    templateUrl: 'pages/quiz.html',
    scope: true,
    transclude : false,
    controller: 'quizController'
  };
}

function runQuiz($scope, $http) {
  $http.get('/quizzes/testquiz.json')
  .success(initQuiz)
  .error(JSONError);

  $scope.choose = function(c) {
    console.log(c.choice);
  }

  processChoices($scope);

  function initQuiz(data) {
    $scope.info = angular.fromJson(data);
    checkJSON($scope.info.quiz);
    $scope.message = $scope.info.title;
    $scope.question = $scope.info.quiz[0].question;
  }
}

//check JSON data is in the correct format(4 choices per question etc.)
function checkJSON(data) {
  //check all questions have 4 choices
  for(var i = 0; i < data.length; i++) {
    if(data[i].choices.length != 4) {
      console.log("Error");
    }
  }
}

function processChoices($scope) {}

function JSONError() {
  console.log("Error: Could not retrieve JSON object");
}
