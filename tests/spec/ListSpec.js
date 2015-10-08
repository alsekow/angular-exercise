xdescribe("Unit testing list module", function() {
    'use strict';

    var $compile, element, $http, controller, $scope;
    element = $compile = void 0;

    // Load the module, which contains the directive
    beforeEach(module("List"));

    var $controller;

    // Store references to $rootScope and $compile so they are available to all tests in this describe block
    beforeEach(inject(function(_$controller_, _$httpBackend_, _$rootScope_) {

        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
        $scope = _$rootScope_.$new();

        $httpBackend.when('GET', 'js/data.json')
            .respond([
                {"name":"onion", "price": "1.5"},
                {"name":"tomato", "price": "0.5"},
                {"name":"potato", "price": "2"},
                {"name":"celery", "price": "1"},
                {"name":"broccoli", "price": "2"}
            ]);

        controller = $controller('ListController', {$scope: $scope});

        $httpBackend.flush();
        //$scope.list = list;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });


    it("should have a list", function() {
        var test = $scope.hasOwnProperty('list');

        expect(test).toBeTruthy();
    });

    it("should have a list longer than 1", function() {

        expect($scope.list.length).toBeGreaterThan(1);
    });


    it("should add an item", function() {
        var currentListLength  = $scope.list.length;

        $scope.addedItem = 'Potato';
        $scope.add();

        expect($scope.list.length).toBeGreaterThan(currentListLength);
        expect($scope.list[$scope.list.length - 1].name).toEqual('Potato');
    });


    it("should delete an item", function() {
        var currentListLength  = $scope.list.length;

        $scope.delete($scope.list[1]);

        expect($scope.list.length).toEqual(currentListLength - 1);
    });

});