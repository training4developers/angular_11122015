describe("Controllers Test", function() {

	var controller, mockScope, dataService;

	beforeEach(angular.mock.module('App'));

	beforeEach(angular.mock.inject(function($controller, $rootScope, customData) {

		mockScope = $rootScope.$new();

		dataService = customData;

		spyOn(dataService, 'update');

		controller = $controller('HomeCtrl', {
		  $scope: mockScope,
		  bsuData: dataService
		});

	}));

	it("check the scope", function() {

		expect(mockScope.person.firstName).toEqual("Bob");
		expect(mockScope.person.lastName).toEqual("Smith");

	});

	it("verify update calls the data service", function() {

		mockScope.update();

		expect(dataService.update).toHaveBeenCalled();
		expect(dataService.update).toHaveBeenCalledWith(mockScope.person);
	});

});
