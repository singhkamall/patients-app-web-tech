'use strict';

angular.module('myApp.patients', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/patients', {
            templateUrl: 'patients/patients.html',
            controller: 'PatientsController'
        });
    }])

    .controller('PatientsController', [function () {

    }]);