'use strict';

angular.module('myApp.tables', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/tables', {
            templateUrl: 'Views/table/tables.html',
            controller: 'TableController'
        });
    }])

    .controller('TableController', [function () {

    }]);