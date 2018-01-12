'use strict';

angular.module('myApp.patients', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/patients', {
            templateUrl: 'Views/patients/patients.html',
            controller: 'PatientsController'
        });
        $routeProvider.when('/createPatients', {
            templateUrl: 'Views/patients/create-patient.html',
            controller: 'PatientsController'
        });
        $routeProvider.when('/patients/:patientEditId/edit', {
            templateUrl: 'Views/patients/create-patient.html',
            controller: 'PatientsController'
        });
        $routeProvider.when('/patients/:patientViewId/view', {
            templateUrl: 'Views/patients/create-patient.html',
            controller: 'PatientsController'
        });
        $routeProvider.when('/patients/criticalPatients', {
            templateUrl: 'Views/patients/patients.html',
            controller: 'PatientsController'
        });
    }])

    .controller('PatientsController', function ($scope, $http, $location, $window, $routeParams) {
        // By default we config api call and page title for showing all patients

        $scope.$watch('createBusinessForm.$valid', function (newVal) {
            //$scope.valid = newVal;
            $scope.informationStatus = true;
        });

        $scope.title = "Patients";
        let apiUrl = "https://mongo-patient-api.herokuapp.com/patients";

        $scope.patientEditId = $routeParams.patientEditId;

        // If "Edit" or "Create" Actions, enable text inputs and show Save Button

        if ($routeParams.patientViewId) {
            $scope.showButton = false;
            $scope.recordDataReadOnly = true;
        }
        else {
            $scope.showButton = true;
            $scope.recordDataReadOnly = false;
        }

        if ($location.path().indexOf('criticalPatients') >= 0) {
            //// If path has one more component, then we config api call and title for critical patients
            apiUrl += "/criticalCondition";
            $scope.title += " in Critical Condition";
        }
        if ($location.path().indexOf('createPatients') >= 0) {
            $scope.title = "Create New Patient Form";
            $scope.btnCreateEditPatient = "Create";
        }

        if ($routeParams.patientEditId) {
            apiUrl += '/' + $scope.patientEditId;
            $scope.title = "Edit Patient Information Form";
            $scope.btnCreateEditPatient = "Save";
        }
        else if ($routeParams.patientViewId) {
            apiUrl += '/' + $routeParams.patientViewId;
            $scope.title = "View Patient Information";
        }

        var getPatientsData = function () {
            $http.get(apiUrl)
                .then(function (response) {
                    $scope.patients = response.data;
                    console.log(response.data);
                    $('[name=DateOfBirth]').datepicker({
                    });
                });
        }
        getPatientsData();

        $scope.createEditPatient = "createPatient()";
        $scope.createPatient = function () {
            if (!$routeParams.patientEditId) {

                //  Create

                if ($scope.frmPatient.$valid) {
                    // Code here if valid

                    $http.post(apiUrl,
                        {
                            "FirstName": $scope.patients.FirstName,
                            "LastName": $scope.patients.LastName,
                            "Address": $scope.patients.Address,
                            "DateOfBirth": $scope.patients.DateOfBirth,
                            "Gender": $scope.patients.Gender,
                            "Telephone": $scope.patients.Telephone,
                            "EmergencyContact": {
                                "Name": $scope.patients.EmergencyContact.Name,
                                "Address": $scope.patients.EmergencyContact.Address,
                                "Relationship": $scope.patients.EmergencyContact.Relationship,
                                "Telephone": $scope.patients.EmergencyContact.Telephone
                            },
                            "BloodType": $scope.patients.BloodType,
                            "InsurancePlan": $scope.patients.InsurancePlan,
                            "IsInCritcalCondition": $scope.patients.IsInCritcalCondition
                        })
                        .then(function (response) {

                            $window.location.href = 'index.html#!/patients';
                            
                        })
                }
            } else {
                // Edit

                $scope.title = "Edit Patient Information Form";

                if ($scope.frmPatient.$valid) {
                    // Code here if valid
                    $http.put(apiUrl,
                        {
                            // "_id": $scope.patients._id,
                            "FirstName": $scope.patients.FirstName,
                            "LastName": $scope.patients.LastName,
                            "Address": $scope.patients.Address,
                            "DateOfBirth": $scope.patients.DateOfBirth,
                            "Gender": $scope.patients.Gender,
                            "Telephone": $scope.patients.Telephone,
                            "EmergencyContact": {
                                "Name": $scope.patients.EmergencyContact.Name,
                                "Address": $scope.patients.EmergencyContact.Address,
                                "Relationship": $scope.patients.EmergencyContact.Relationship,
                                "Telephone": $scope.patients.EmergencyContact.Telephone
                            },
                            "BloodType": $scope.patients.BloodType,
                            "InsurancePlan": $scope.patients.InsurancePlan,
                            "IsInCritcalCondition": $scope.patients.IsInCritcalCondition
                        })
                        .then(function (response) {

                            $window.location.href = 'index.html#!/patients';
                            
                        })
                }
            }
        };

        $scope.deletePatient = function (patientId) {

            if (confirm('Are you sure you want to delete this?')) {

                $http.delete(apiUrl + '/' + patientId)
                    .then(function () {
                        alert('Deleted Successfully');
                        getPatientsData();
                    });

            }

        }

    });
