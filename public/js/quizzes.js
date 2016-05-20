"use strict";

angular.module('kwizecalApp', [])
  .controller('qlCtrl', qlCtrl);

function qlCtrl($scope, $http, quizService) {

  function loadQuizzes(data) {
    if(data.length == 0) {
      $scope.msg = "There are no Kwizzes to take at this time. Please make one";
    }
    else { $scope.msg = "Select a Kwiz from the list below:"; }
    $scope.quizlist = data;
  }

  function showError(reason) {
    console.log(reason);
  }

  // send a request to the server for a quiz
  $scope.getQuiz = function(id) {
      console.log("Client sending request for quiz: " + id);
      var url = 'getquiz/' + id;
      $http
        .get(url)
        .success(quizService.setQuiz)
        .error(showError)
  }

  //fetch JSON data from server
  $http
    .get('/quizlist')
    .success(loadQuizzes)
    .error(showError)

}
