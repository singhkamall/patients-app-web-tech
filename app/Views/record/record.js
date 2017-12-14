'use strict';

angular.module('myApp.record', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/record/:patientId/:recordId', {
            templateUrl: 'Views/record/record.html',
            controller: 'RecordController'
            // ,resolve: {
            //     sharedName: "context"
            //   }
        });
    }])

    .controller('RecordController', function ($scope, $http, $routeParams, $location) {
        $scope.patientId = $routeParams.patientId;
        $scope.recordId = $routeParams.recordId;
        //$scope.route = $routeProvider;


        // var index = $location.path().substring(1).indexOf("/");
        // var page = $location.path().substring(1,index+1);

        // $scope.patientDataReadOnly = false;
        // $scope.recordDataReadOnly = false;
        // if( page == "record") {
        //     // Set input controls as read only
        //     $scope.patientDataReadOnly = true;
        //     $scope.recordDataReadOnly = true;
        // }

        $scope.patientDataReadOnly = true;
        $scope.recordDataReadOnly = true;
        
        

        $http.get("http://127.0.0.1:5000/patients/" + $scope.patientId)
        .then(function (response) {
            $scope.patient = response.data;
        });

        $http.get("http://127.0.0.1:5000/patients/" + $scope.patientId + "/records/" + $scope.recordId)
        .then(function (response) {
            $scope.recordDetails = response.data;
        });

    });


