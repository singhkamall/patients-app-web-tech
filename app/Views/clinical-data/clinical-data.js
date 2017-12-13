'use strict';
$(document).ready(function(){
    $("[data-toggle=tooltip]").tooltip();
});

angular.module('myApp.clinical-data', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/clinical-data', {
            templateUrl: 'Views/clinical-data/clinical-data.html',
            controller: 'ClinicalDataController'
        });
    }])

    .controller('ClinicalDataController', [function () {

    }]);