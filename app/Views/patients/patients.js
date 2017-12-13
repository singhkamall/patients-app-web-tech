'use strict';

angular.module('myApp.patients', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/patients', {
            templateUrl: 'Views/patients/patients.html',
            controller: 'PatientsController'
        });
    }])

    .controller('PatientsController', function ($scope, $http) {

        $http.get("http://127.0.0.1:5000/patients")
            .then(function (response) {
                console.log(response);
                $scope.patients = response.data;
            });

    });