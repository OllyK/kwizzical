"use strict";

/*advantage of angular - no global variables - functions are local to module*/
var kwizecalApp = angular
  .module('kwizecalApp', ['ngRoute'])
  .config(routing)
  .controller('mainCtrl', mainCtrl)
  .controller('quizCtrl', quizCtrl)
  .controller('formCtrl', formCtrl)
  .controller('animationCtrl', animationCtrl)
  .directive("header", header)
  .directive("footer", footer)

function routing($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl : 'pages/home.html',
    controller: 'mainCtrl'
  })

  .when('/takequiz', {
    templateUrl : 'pages/takequiz.html',
    controller: 'quizCtrl'
  })

  .when('/makequiz', {
    templateUrl : 'pages/makequiz.html'
   });
}

function header() {
  return {
    templateUrl: 'pages/header.html',
    scope: true,
    transclude : false,
    controller: 'mainCtrl'
  };
}

function footer() {
  return {
    templateUrl: 'pages/footer.html',
    scope: true,
    transclude : false,
    controller: 'mainCtrl'
  };
}


//Dummy function - doesn't do anything yet
//Could possibly be used to control firing of SVG animation?
function mainCtrl() {}

function animationCtrl($scope){
  $scope.$on('$includeContentLoaded',function () {
   for (var i = 0; i < 2; i++) {
     var path = document.querySelector('#i' + i);
     var length = path.getTotalLength();
     path.style.transition = path.style.WebkitTransition = path.style.MozTransition = 'none';
     path.style.strokeDasharray = length + ' ' + length;
     path.style.strokeDashoffset = length ;
     path.getBoundingClientRect();
     path.style.transition = path.style.WebkitTransition = path.style.MozTransition = 'stroke-dashoffset 3s ease-in-out';
     path.style.strokeDashoffset = '0';
   }
 });
}

function quizCtrl($scope, $http) {

  //fetch JSON data from server
  $http
    .get('quizzes/testquiz.json')
    .success(loadQuiz)
    .error(showError)

  function loadQuiz(data) {
    checkJSON(data);
    $scope.quiz = data;
  }

  function showError(reason) {
    console.log(reason);
  }

  //initialises quiz variables
  $scope.init = function() {
    $scope.i = 0;
    $scope.score = 0;
    $scope.msg = "Current score: ";
    $scope.btnmsg = "Next";
    $scope.running = true;
    $scope.choicemade = false;
  }

  //checks answer and updates score, ends quiz if last question is reached
  $scope.update = function(choice) {
    if(!$scope.choicemade) {
      if(choice == $scope.quiz.questions[$scope.i].answer) { $scope.score++; }
      if($scope.i >= $scope.quiz.questions.length - 1) {
        $scope.running = false;
        $scope.msg = "Final score: ";
        $scope.btnmsg = "Restart";
      }
      $scope.choicemade = true;
    }
  }

  //moves on to next question -
  //if end of quiz, resets quiz
  $scope.next = function() {
    if($scope.running) {
      $scope.i++;
      $scope.choicemade = false;
    }
    else { $scope.init(); }
  }

  //call to init displays start of quiz
  $scope.init();
}

function formCtrl($scope) {
  $scope.quiz = [];

  $scope.addQuestion = function() {
    $scope.quiz.push(temp);
    $scope.qu = "";  //careful - do we want to reinit to a string? correct data type?
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
