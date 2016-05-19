"use strict";

angular.module('kwizecalApp', [])
  .controller('qlCtrl', qlCtrl);

function qlCtrl($scope, $http, quizService) {

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

  $scope.doStuff = function(id) {
      var url = 'getquiz/' + id;
      $http
        .get(url)
        .success(quizService.setQuiz)
        .error(showError)
  }

}
