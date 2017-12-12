'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.view1',
    'myApp.view2',
    'myApp.version',
    'myApp.patients',
    'myApp.tables'
]).
    config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        console.log($locationProvider);

        $locationProvider.hashPrefix('!');

        $routeProvider.otherwise({ redirectTo: '/view1' });
    }]);
