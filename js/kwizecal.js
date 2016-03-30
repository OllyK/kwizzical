"use strict";

/*advantage of angular - no global variables - functions are local to module*/
var kwizecalApp = angular
.module('kwizecalApp', ['ngRoute'])
.controller('mainController', runQuiz)
.controller('MyCtrl', runAnimation)
.config(routing)
.directive("header", header)
.directive("footer", footer)
.directive("quiz", quiz);



function routing($routeProvider) {
  $routeProvider
  .when('/', { templateUrl : 'pages/home.html' })
  .when('/takequiz', { templateUrl : 'pages/quiz.html' });
}

function header() {
  return {
    templateUrl: 'pages/header.html',
    scope: true,
    transclude : false,
    controller: 'mainController'
  };
}

function footer() {
  return {
    templateUrl: 'pages/footer.html',
    scope: true,
    transclude : false,
    controller: 'mainController'
  };
}

function quiz() {
  return {
    templateUrl: 'pages/quiz.html',
    scope: true,
    transclude : false,
    controller: 'mainController'
  };
}

function runAnimation($scope){
  $scope.$on('$includeContentLoaded',function () {
   for (var i = 0; i < 2; i++) {
     var path = document.querySelector('#i' + i);
     var length = path.getTotalLength();

     path.style.transition = path.style.WebkitTransition = path.style.MozTransition = 'none';

     path.style.strokeDasharray = length + ' ' + length;
     path.style.strokeDashoffset = length ;

     path.getBoundingClientRect();

     path.style.transition = path.style.WebkitTransition = path.style.MozTransition = 'stroke-dashoffset 3s ease-in-out';

    // GO !

    path.style.strokeDashoffset = '0';
    
  }
});
}

function runQuiz($scope, $http, $log) {
  var i, score, quizdata, choices, answer;

  //fetch the data and run initQuiz to start the quiz
  $http({
    method:'GET',
    url:'/quizzes/testquiz.json'
  }).then(initQuiz, error);

  //I noticed that this function is being called multiple times (3) -
  //apparently Angular is entering a $digest loop - probably not a problem but something to keep an eye on
  //http://stackoverflow.com/questions/15951984/angularjs-ng-class-method-is-getting-invoked-multiple-times
  //checks data validity, initialises score, question number, quiz title, calls update
  function initQuiz(response) {
    quizdata = response.data;
    checkJSON(quizdata.questions);
    $scope.quizname = quizdata.title;
    $scope.quizlength = quizdata.questions.length;
    i = 0;
    score = 0;
    update($scope);
  }

  function error(reason) {
    console.log(reason);
  }

  //displays question, choices, current score, sets correct answer for checking later
  function update($scope) {
    $scope.qnum = i + 1;
    $scope.question = quizdata.questions[i].question;
    $scope.choices = quizdata.questions[i].choices;
    answer = $scope.choices[quizdata.questions[i].answer].choice;
    $scope.score = score;
    $scope.currentscore = true;
  }

  //displays end of quiz message, score
  function endQuiz($scope) {
    $scope.finish = true;
    $scope.nextbutton = false;
    $scope.restartbutton = true;
    $scope.score = score;
    $scope.currentscore = false;
    $scope.showfinalscore = true;
  }

  //checks answer and updates score, ends quiz if last question is reached
  $scope.checkAnswer = function(choice) {
    if($scope.nextbutton) {}
      else {
        if(i >= $scope.quizlength - 1) { endQuiz($scope); }
        else {
          if(choice == answer) { score++; }
          $scope.score = score;
          $scope.nextbutton = true;
        }
      }
    }

  //increments question number, hides Next button, calls update
  $scope.next = function() {
    i++;
    $scope.nextbutton = false;
    update($scope);
  }

  //hides buttons, end of quiz message, resets q. number and score, updates
  $scope.restart = function() {
    $scope.nextbutton = false;
    $scope.restartbutton = false;
    $scope.finish = false;
    $scope.currentscore = true;
    i = 0;
    score = 0;
    update($scope);
  }
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

var JSONError = function() {
  console.log("Error: Could not retrieve JSON object");
}
