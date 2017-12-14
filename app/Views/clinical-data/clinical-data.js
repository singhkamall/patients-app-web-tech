'use strict';

angular.module('myApp.clinical-data', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/patients/:patientId/records', {
            templateUrl: 'Views/clinical-data/clinical-data.html',
            controller: 'ClinicalDataController'
        });
    }])

    .controller('ClinicalDataController', function ($scope, $http, $routeParams) {
        $scope.patientId = $routeParams.patientId;

        $http.get("http://127.0.0.1:5000/patients/" + $scope.patientId)
        .then(function (response) {
            $scope.patient = response.data;
        });

        $http.get("http://127.0.0.1:5000/patients/" + $scope.patientId + "/records")
            .then(function (response) {
                $scope.records = response.data;
        });

        $scope.openModal=function (recordId){
            $scope.selectedRecordId = recordId;
        }

        $scope.deleteRecord = function(selectedRecordId) {
            $http.delete("http://127.0.0.1:5000/patients/" + $scope.patientId + "/records/" + selectedRecordId)
            .then(function (response) {
                console.log(response);
                //$scope.records.splice(selectedRecordId,1);
                $http.get("http://127.0.0.1:5000/patients/" + $scope.patientId + "/records")
                .then(function (response) {
                    $scope.records = response.data;
            });
            });
        };

        
    });


// angular.module('myApp.clinical-data', ['ngRoute', 'ngResource'])

//     .config(['$routeProvider', function ($routeProvider) {
//         $routeProvider.when('/clinical-data', {
//             templateUrl: 'Views/clinical-data/clinical-data.html',
//             controller: 'ClinicalDataController'
//         });
//     }])

//     .factory('RecordsService', function ($resource) {
//         var data = $resource('http://127.0.0.1:5000/patients/:patientId/records/:recordId',
//                                     {patientId:'@patientId', recordId:'@recordId'},
//                                     {update:{ method:'PUT'}} );


//         return data;
//     })

//     .controller('ClinicalDataController', ['$scope', '$resource', function ($scope, $resource) {

//         // Using Factory to create a service
//          $scope.records = RecordsService.query( {patientId:1});

        // //GET Action Method for ALL records of a specific patient
        // var AllRecords = $resource('http://127.0.0.1:5000/patients/:patientId/records', {patientId:'@patientId'});
        // AllRecords.query( {patientId:1}, function(records){
        //     $scope.records = records;
        // })

        // //GET Action Method for ONE specific record of a specific patient
        // var OneRecord = $resource('/patients/:patientId/records/:recordId', {patientId:'@patientId', recordId:'@recordId'});
        // OneRecord.get( {patientId:1, recordId:1}, function(record){
        //     $scope.record = record;
        // })
        
        // //GET Action Method for all records 
        // var CriticalPatients = $resource('/patients/criticalCondition');
        // CriticalPatients.query(function(criticalPatients){
        //     $scope.criticalPatients = criticalPatients;					
        // });
    //}]);


    // { 'get':    {method:'GET'},
    // 'save':   {method:'POST'},
    // 'query':  {method:'GET', isArray:true},
    // 'remove': {method:'DELETE'},
    // 'delete': {method:'DELETE'} };