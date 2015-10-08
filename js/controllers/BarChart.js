var barChart = angular.module('BarChart', ['d3', 'dataServiceModule']);

barChart.controller('BarChartCtrl', ['$scope', '$timeout', '$http', function($scope, $timeout, $http) {
    'use strict';

    $http.get('js/data.json').success(function(data) {
        $scope.list = data;
    });

}]);


barChart.directive('barChart', ['d3Service', '$http', 'dataService', function(d3Service, $http, dataService) {
    return {
        scope: {},
        restrict: 'AEC',
        link: function(scope, element, attrs) {
            'use strict';

            d3Service.d3().then(function(d3) {

                scope.clean = function() {
                    var svg = d3.select(element[0]);
                    svg.selectAll('*').remove();
                };

                scope.render = function(data) {
                    var svg = d3.select(element[0]),
                        barPadding = 5,
                        chartPadding = 50,
                        width = 400 - chartPadding,
                        height = 200 - chartPadding * 2,

                        xScale = d3.scale.ordinal()
                        .domain(data.map(function(d, i) { return d.name; }))
                        .rangeBands([chartPadding, width]),

                        yScale = d3.scale.linear()
                        .domain(d3.extent(data.map(function(d, i) { return parseFloat(d.price); })))
                        .range([0, height]),

                        yScaleAxis = d3.scale.linear()
                        .domain(d3.extent(data.map(function(d, i) { return parseFloat(d.price); })).reverse())
                        .range([0, height]),

                        xAxis = d3.svg.axis()
                        .scale(xScale),

                        yAxis = d3.svg.axis()
                        .scale(yScaleAxis)
                        .orient('left')
                        .ticks(4),

                        bars = svg.selectAll('rect')
                        .data(data)
                        .enter()
                        .append('rect')
                        .attr({
                            x: function(d,i) { return xScale(d.name) + barPadding },
                            y: function(d,i) { return height - yScale(parseFloat(d.price)) + chartPadding },
                            height: function(d,i) { return yScale(parseFloat(d.price)) },
                            width: xScale.rangeBand() - barPadding * 2,
                            fill: 'black',
                            data: function(d) { return d.price; }
                        });

                    bars.on('mouseover', function(d) {
                        d3.select(this).transition().duration(200).attr({
                            opacity: 0.6
                        });
                    }).on('mouseout', function(d) {
                        d3.select(this).transition().duration(500).attr({
                            opacity: 1
                        });
                    });

                    svg.append('g')
                        .classed({'axis': true, 'xAxis': true})
                        .call(xAxis)
                        .attr({
                            transform: 'translate(0, '+(height + chartPadding)+')'
                        });

                    svg.append('g')
                        .classed('axis', true)
                        .call(yAxis)
                        .attr({
                            transform: 'translate('+chartPadding+', '+chartPadding+')'
                        });
                };

                dataService.getData(function(data) {
                    scope.render(data);
                });

                scope.$on('dataUpdate', function() {
                    dataService.getData(function(data) {
                        scope.clean();
                        scope.render(data);
                    });
                });
            });
        }
    }

}]);

