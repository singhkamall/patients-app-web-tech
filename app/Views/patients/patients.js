'use strict';

angular.module('myApp.patients', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/patients', {
            templateUrl: 'Views/patients/patients.html',
            controller: 'PatientsController'
        });
        $routeProvider.when('/patients/criticalPatients', {
            templateUrl: 'Views/patients/patients.html',
            controller: 'PatientsController'
        });
    }])

    .controller('PatientsController', function ($scope, $http, $location) {
        // By default we config api call and page title for showing all patients
        $scope.title = "Patients";
        let apiUrl = "http://127.0.0.1:5000/patients";

        if( $location.path().split("/").length == 3 ) {
            // If path has one more component, then we config api call and title for critical patients
            apiUrl += "/criticalCondition";
            $scope.title += " in Critical Condition";
        }

        $http.get(apiUrl)
            .then(function (response) {
                console.log(response);
                $scope.patients = response.data;
            });

    });