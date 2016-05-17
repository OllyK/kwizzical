"use strict";

angular.module('kwizecalApp', [])
  .controller('formCtrl', formCtrl)

//controller for quiz form
function formCtrl($scope, $http) {
  $scope.formquiz = {
    "title":"",
    "questions":[]
  };

  $scope.formquestion = {
    "question":"",
    "choices":[{choice:""}, {choice:""}, {choice:""},{choice:""}],
    "answer":0
  };

  //needs validation(e.g. SQL injections, empty fields) before submitting
  $scope.addQuestion = function() {
    if($scope.formquiz.questions.length < 10){
      $scope.formquiz.questions.push($scope.formquestion);
      $scope.clearFields();
    }
    else{
      alert(" Maximum quiz length is " + $scope.formquiz.questions.length + " questions");
    }
  }

  $scope.clearFields = function() {
    $scope.formquestion = {
      "question":"",
      "choices":[{choice:""}, {choice:""}, {choice:""},{choice:""}],
      "answer":0
    };
  }

  $scope.formSubmit = function() {
    console.log("Submitting form.");
    var data = 5;
    $http.post("", data).success(function(data, status) {
      console.log("Form submitted.");
    })
  }

}
