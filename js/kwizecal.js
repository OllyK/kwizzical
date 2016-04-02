"use strict";

/*advantage of angular - no global variables - functions are local to module*/
var kwizecalApp = angular
  .module('kwizecalApp', ['ngRoute'])
  .config(routing)
  .controller('mainCtrl', mainCtrl)
  .controller('quizCtrl', quizCtrl)
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

    // GO !

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

  $scope.i = 0;
  $scope.score = 0;
  $scope.running = true;
  $scope.choicemade = false;

  function loadQuiz(data) {
    checkJSON(data);
    $scope.quiz = data;
  }

  function showError(reason) {
    console.log(reason);
  }

  //checks answer and updates score, ends quiz if last question is reached
  $scope.update = function(choice) {
    if(!$scope.choicemade) {
      if($scope.i >= $scope.quiz.questions.length - 1) { $scope.running = false; }
      else {
        if(choice == $scope.quiz.questions[$scope.i].answer) { $scope.score++; }
        $scope.choicemade = true;
      }
    }
  }

  $scope.next = function() {
    $scope.i++;
    $scope.choicemade = false;
  }

  //hides buttons, end of quiz message, resets q. number and score, updates
  $scope.restart = function() {
    $scope.i = 0;
    $scope.score = 0;
    $scope.running = true;
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
