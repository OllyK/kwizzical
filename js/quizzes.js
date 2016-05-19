"use strict";

angular.module('kwizecalApp', [])
  .controller('qlCtrl', qlCtrl);

function qlCtrl($scope, $http) {

  //fetch JSON data from server
  $http
    .get('/quizlist')
    .success(loadQuizzes)
    .error(showError)

  function loadQuizzes(data) {
    $scope.quizlist = data;
  }

  function showError(reason) {
    console.log(reason);
  }

  //initialises quiz variables
  $scope.init = function() {

  }

  //checks answer and updates score, ends quiz if last question is reached
  // $scope.update = function(choice) {
  //   if(!$scope.choicemade) {
  //     if(choice == $scope.quiz.questions[$scope.i].answer) { $scope.score++; }
  //     if($scope.i >= $scope.quiz.questions.length - 1) {
  //       $scope.running = false;
  //       $scope.msg = "Final score: ";
  //       $scope.btnmsg = "Restart";
  //     }
  //     $scope.choicemade = true;
  //   }
  // }

  //moves on to next question -
  //if end of quiz, resets quiz
  // $scope.next = function() {
  //   if($scope.running) {
  //     $scope.i++;
  //     $scope.choicemade = false;
  //   }
  //   else { $scope.init(); }
  // }
  //
  // //call to init displays start of quiz
  // $scope.init();
}
