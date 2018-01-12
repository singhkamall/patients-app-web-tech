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

    .controller('RecordController', function ($scope, $http, $routeParams, $location, $window) {
        $scope.patientId = $routeParams.patientId;
        $scope.recordId = $routeParams.recordId;
        
        // Patient information is always readonly
        $scope.patientDataReadOnly = true;
        $scope.title = "Clinical Data";

        // Get action from local url
        if($location.path().indexOf("editRecords") >= 0 ||
           $location.path().indexOf("createRecords") >= 0) {
            // If "Edit" Actions, enable text inputs and show Save Button
            $scope.recordDataReadOnly = false;
            $scope.showButton = true;
            $scope.title = "Edit Clinical Data Record";
        }
        else {
            // "View action". Disable text input and hide Save Button
            $scope.recordDataReadOnly = true;
            $scope.showButton = false;
            $scope.title = "View Clinical Data Record";
        }

        $http.get("https://mongo-patient-api.herokuapp.com/patients/" + $scope.patientId)
        .then(function (response) {
            $scope.patient = response.data;

            $('[name=MeasurementDate]').datepicker({
            });
        });

        if( $scope.recordId ) {
            $http.get("https://mongo-patient-api.herokuapp.com/patients/" + $scope.patientId + "/records/" + $scope.recordId)
            .then(function (response) {
                $scope.recordDetails = response.data[0];
                console.log(response.data[0]);
            });
        }   

        $scope.updateRecord = function(){
            if( $scope.recordId ) {
                $http.put("https://mongo-patient-api.herokuapp.com/patients/" + $scope.patientId + "/records/" + $scope.recordId, 
                {
                    "Practitioner": $scope.recordDetails.Practitioner,
                    "MedicalCenter": $scope.recordDetails.MedicalCenter,
                    "DateTime": $scope.recordDetails.DateTime,
                    "DataType": $scope.recordDetails.DataType,
                    "Reading": $scope.recordDetails.Reading
                })
                .then(function(response){
                    console.log(response);
                    $window.location.href = 'index.html#!/patients/' + $scope.patientId + '/records' ;
                })
            }
        };

        $scope.createRecord = function(){
            $http.post("https://mongo-patient-api.herokuapp.com/patients/" + $scope.patientId + "/records", 
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
                $window.location.href = 'index.html#!/patients/' + $scope.patientId + '/records' ;
            })
        };


    });


