var myApp = angular.module('List', ['Filters', 'dataServiceModule']);

myApp.controller('ListController', ['$scope', '$timeout', '$http', '$rootScope', 'dataService', function($scope, $timeout, $http, $rootScope, dataService) {
    'use strict';

    $scope.itemOrder = 'name';

    dataService.getData(function(data) {
        $scope.list = data;
    });

    $scope.add = function($event) {
        $scope.list.push({
            name: $scope.addedItem.name,
            price: $scope.addedItem.price
        });

        $rootScope.$broadcast('dataUpdate');
    };

    $scope.delete = function(item) {
        $scope.list = $scope.list.filter(function(d, i) {
            return item !== d;
        });

        dataService.updateData($scope.list);
        $rootScope.$broadcast('dataUpdate');
    };

}]);


myApp.directive('listItem', function() {
    'use strict';

    return {
        restrict: 'AEC',
        replace: 'true',
        templateUrl: 'html/partials/listItem.html',
        link: function(scope, elem, attrs) {

        }
    };
});
