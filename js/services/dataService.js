var dataModule = angular.module('dataServiceModule', []);

dataModule.factory('dataService', ['$http', '$q', '$rootScope', function getData($http, $q, $rootScope) {
    'use strict';

    var list = [];
    return {
        getData: function(callback) {
            if (list.length == 0) {
                $http.get('js/data.json').success(function(data) {
                    callback(data);
                    list = data;
                });
            } else {
                callback(list);
            }

        },
        updateData: function(data) {
            list = data;
        }
    };


}]);