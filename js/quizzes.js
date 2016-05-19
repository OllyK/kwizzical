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
}
