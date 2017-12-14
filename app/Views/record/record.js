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
        $routeProvider.when('/patients/:patientId/createRecords', {
            templateUrl: 'Views/record/create-record.html',
            controller: 'RecordController'
        });
    }])

    .controller('RecordController', function ($scope, $http, $routeParams, $location) {
        $scope.patientId = $routeParams.patientId;
        $scope.recordId = $routeParams.recordId;
        
        // Patient information is always readonly
        $scope.patientDataReadOnly = true;

        // If "Edit" or "Create" Actions, enable text inputs and show Save Button
        $scope.recordDataReadOnly = false;
        $scope.showButton = true;

        // Get action from local url
        var segments = $location.path().split("/");
        if(segments[3] && segments[3] == "records") {
            // "View action". Disable text input and hide Save Button
            $scope.recordDataReadOnly = true;
            $scope.showButton = false;
        }

        $http.get("http://127.0.0.1:5000/patients/" + $scope.patientId)
        .then(function (response) {
            $scope.patient = response.data;
        });

        if( $scope.recordId ) {
            $http.get("http://127.0.0.1:5000/patients/" + $scope.patientId + "/records/" + $scope.recordId)
            .then(function (response) {
                $scope.recordDetails = response.data;
            });
        }   

        $scope.updateRecord = function(){
            if( $scope.recordId ) {
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
            }
        };

        $scope.createRecord = function(){
            $http.post("http://127.0.0.1:5000/patients/" + $scope.patientId + "/records", 
            {
                "PatientID": $scope.recordDetails.PatientID,
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


