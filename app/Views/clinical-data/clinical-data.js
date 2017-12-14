'use strict';

angular.module('myApp.clinical-data', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/clinical-data/:patientId', {
            templateUrl: 'Views/clinical-data/clinical-data.html',
            controller: 'ClinicalDataController'
        });
    }])

    .controller('ClinicalDataController', function ($scope, $http, $routeParams, $window) {
        $scope.patientId = $routeParams.patientId;

        $http.get("http://127.0.0.1:5000/patients/" + $scope.patientId)
        .then(function (response) {
            $scope.patient = response.data;
        });

        $http.get("http://127.0.0.1:5000/patients/" + $scope.patientId + "/records")
            .then(function (response) {
                $scope.records = response.data;
            });
        // $scope.RedirectToURL = function(recordId) {
        //     var host = $window.location.host;
        //     var landingUrl = "http://" + host + "/record/" + $scope.patientId + "/" + recordId;
        //     console.log(landingUrl);
        //     $window.location.href = landingUrl;
        // };
        
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