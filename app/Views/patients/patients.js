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
        console.log($location.path());

        $scope.title = "Patients";
        let apiUrl = "http://127.0.0.1:5000/patients";

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
        
        if ($routeParams.patientEditId)
            apiUrl += '/' + $scope.patientEditId;
        else if ($routeParams.patientViewId)
            apiUrl += '/' + $routeParams.patientViewId;

        var getPatientsData = function () {
            $http.get(apiUrl)
                .then(function (response) {
                    $scope.patients = response.data;
                });
        }
        getPatientsData();

        $scope.createEditPatient = "createPatient()";
        $scope.btnCreateEditPatient = "Create";
        $scope.createPatient = function () {

            if (!$routeParams.patientEditId) {

                //  Create
                console.log('creating');
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

                        console.log(response);
                    })
            } else {
                // Edit
                console.log('editing');

                $http.put(apiUrl,
                    {
                        "_id": $scope.patients._id,
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

                        console.log(response);
                    })
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
