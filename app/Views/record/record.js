'use strict';

angular.module('myApp.record', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/patients/:patientId/records/:recordId', {
            templateUrl: 'Views/record/record.html',
            controller: 'RecordController'
        });
        $routeProvider.when('/patients/:patientId/editRecords/:recordId', {
            templateUrl: 'Views/record/record.html',
            controller: 'RecordController'
        });
        
    }])

    .controller('RecordController', function ($scope, $http, $routeParams, $location) {
        $scope.patientId = $routeParams.patientId;
        $scope.recordId = $routeParams.recordId;

        // By default, we assume "View action". Disable text input and hide Save Button
        $scope.patientDataReadOnly = true;
        $scope.recordDataReadOnly = true;
        $scope.showButton = false;

        // Get action from local url
        var segments = $location.path().split("/");
        if(segments[3] && segments[3] == "editRecords") {
            // If "Edit Action", enable text inputs and show Save Button
            $scope.recordDataReadOnly = false;
            $scope.showButton = true;
        }

        $http.get("http://127.0.0.1:5000/patients/" + $scope.patientId)
        .then(function (response) {
            $scope.patient = response.data;
        });

        $http.get("http://127.0.0.1:5000/patients/" + $scope.patientId + "/records/" + $scope.recordId)
        .then(function (response) {
            $scope.recordDetails = response.data;
        });

        $scope.updateRecord = function(){
            $http.put("http://127.0.0.1:5000/patients/" + $scope.patientId + "/records/" + $scope.recordId, 
            {
                "Practitioner": $scope.recordDetails.Practitioner,
                "MedicalCenter": $scope.recordDetails.MedicalCenter,
                "DateTime": $scope.recordDetails.DateTime,
                "DataType": $scope.recordDetails.DataType,
                "Reading": $scope.recordDetails.Reading
            })
            .then(function(response){
                console.log(response);
            })
        };


    });


