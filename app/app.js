'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.view1',
    'myApp.view2',
    'myApp.version',
    'myApp.patients',
    'myApp.tables',
    'myApp.clinical-data',
    'myApp.record'
]).
    config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        console.log($locationProvider);

        $locationProvider.hashPrefix('!');

        $routeProvider.otherwise({ redirectTo: '/' });
    }])

   
    .controller('ScrollController', ['$scope', '$location', '$anchorScroll',
      function($scope, $location, $anchorScroll) {
        $scope.scrollToTop = function() {
          // set the location.hash to the id of
          // the element you wish to scroll to.
          $location.hash('page-top');
    
          // call $anchorScroll()
          $anchorScroll();
        };
      }]);
