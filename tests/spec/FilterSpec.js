xdescribe('Filters Test', function() {
    var $scope, $filter;


    beforeEach(module('Filters'));

    beforeEach(inject(function(_$rootScope_, _$filter_) {
        $filter = _$filter_;
        filters = angular.module(['Filters']);
    }));

    it('should have filters', function() {
        expect($filter('sentence')).toBeDefined();
        expect($filter('camel')).toBeDefined();
    });

    it('should convert word to sentence case', function() {
        var sentenceFilter = $filter('sentence');
        var testStr = 'AaAaAa';

        for (var i = 0; i < testStr.length; i++) {
            if (i == 0)
                expect(sentenceFilter(testStr)[i]).toEqual(testStr[i].toUpperCase());
            else
                expect(sentenceFilter(testStr)[i]).toEqual(testStr[i].toLowerCase());
        }
    });


    it('should convert word to camel case', function() {
        var sentenceFilter = $filter('camel');
        var testStr = 'AaaaaAAaaaa';

        for (var i = 0; i < testStr.length; i++) {
            if (i % 2 == 0)
                expect(sentenceFilter(testStr)[i]).toEqual(testStr[i].toUpperCase());
            else
                expect(sentenceFilter(testStr)[i]).toEqual(testStr[i].toLowerCase());
        }
    });
});