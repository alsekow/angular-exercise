var myFilters = angular.module('Filters', []);

myFilters.filter('sentence', function() {
    'use strict';

    return function(input) {
        var output = '';
        for (var i = 0; i < input.length; i++) {
            if (i == 0)
                output += input[i].toUpperCase();
            else
                output += input[i].toLowerCase();
        }
        return output;
    }
});

myFilters.filter('camel', function() {
    'use strict';

    return function(input) {
        var output = '';
        for (var i = 0; i < input.length; i++) {
            if (i % 2 == 0)
                output += input[i].toUpperCase();
            else
                output += input[i].toLowerCase();
        }
        return output;
    }
});