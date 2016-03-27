"use strict";

/*advantage of angular - no global variables - functions are local to module*/
var pageApp = angular
  .module("pageApp", []);
  
pageApp
  .directive("header", header)
  .directive("footer", footer);

function header() {
  return {
    templateUrl: 'pages/header.html',
    scope: true,
    transclude : false,
  };
}

function footer() {
  return {
    templateUrl: 'pages/footer.html',
    scope: true,
    transclude : false,
  };
}