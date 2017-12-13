'use strict';

angular.module('myApp.record', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/record', {
            templateUrl: 'Views/record/record.html',
            controller: 'RecordController'
        });
    }])

    .controller('RecordController', [function () {

    }]);