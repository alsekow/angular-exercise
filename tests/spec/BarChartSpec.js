xdescribe('Bar Chart test suite', function() {
    var $scope, controller, $controller, $httpBackend;

    beforeEach(function() {
        angular.mock.module('d3', []);
        module('BarChart');
    });

    beforeEach(inject(function(_$controller_, _$httpBackend_, _$rootScope_) {

        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
        $scope = _$rootScope_.$new();

        $httpBackend.when('GET', 'js/data.json')
            .respond([
                {name: 'tomato', price: 2},
                {name: 'potato', price: 1}
            ]);


        controller = $controller('BarChartCtrl', {$scope: $scope, d3Service: {}});

        $httpBackend.flush();

    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });


    it('should initialize', function() {
        expect($scope).toBeDefined();
    });

    it('should read the data', function() {
        expect($scope.list).toBeDefined();
        expect($scope.list.length).toBeGreaterThan(0);
    });


});