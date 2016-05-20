"use strict";

angular.module('kwizecalApp', [])
  .controller('animationCtrl', animationCtrl)

// animates svg logo
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
