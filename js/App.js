var myApp = angular.module('myApp', ['List', 'BarChart', 'Filters', 'dataServiceModule', 'ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {
    'use strict';

    $routeProvider.when('/list', {
        templateUrl: 'html/views/list.html',
        controller: 'ListController'
    }).when('/bar', {
        templateUrl: 'html/views/barchart.html',
        controller: 'BarChartCtrl'
    }).otherwise({
        redirectTo: 'list'
    });

}]);

myApp.controller('myAppCtrl', ['$scope', '$http', 'dataService', function($scope, $http, dataService) {
}]);