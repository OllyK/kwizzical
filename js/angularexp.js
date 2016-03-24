"use strict";

/*advantage of angular - no global variables - functions are local to module*/

var testApp = angular.module('testApp', []);

testApp.directive("header", header);

testApp.directive("footer", footer);

testApp.directive("quiz", quiz);

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
  var i = 0;
  $http.get('/quizzes/testquiz.json')
  .success(init)
  .error(JSONError);

//I noticed that this function is being called multiple times (3) -
//apparently Angular is entering a $digest loop - probably not a problem but something to keep an eye on
//http://stackoverflow.com/questions/15951984/angularjs-ng-class-method-is-getting-invoked-multiple-times
  function init(data) {
    $scope.quizdata = angular.fromJson(data);
    $scope.quizname = $scope.quizdata.title;
    $scope.quizlength = $scope.quizdata.quiz.length;
    update($scope.quizdata.quiz, i);
  }

  $scope.next = function(choice, index) {
//    checkAnswer($scope.quiz.answer, choice.choice);
    console.log("You chose: " + choice.choice);
    console.log("Answer: " + $scope.answer);
    update($scope.quizdata.quiz, ++i);
  }

  function update(info, i) {
    if(i >= $scope.quizlength) { $scope.finish = "End of quiz!"; }
    $scope.question = info[i].question;
    $scope.choices = info[i].choices;
    $scope.answer = $scope.choices[info[i].answer].choice;
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
  //put other checks in
}

function JSONError() {
  console.log("Error: Could not retrieve JSON object");
}
