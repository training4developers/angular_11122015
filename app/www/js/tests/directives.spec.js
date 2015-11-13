describe("Directives Test", function() {

	var compileService, mockScope;

	beforeEach(angular.mock.module('App'));

	beforeEach(angular.mock.inject(function($compile, $rootScope) {

		mockScope = $rootScope;

		mockScope.person = {
			firstName: "Bob",
			lastName: "Smith"
		};

		compileService = $compile;

	}));

	it("check for custom required class", function() {

		var
			linkingFn = compileService("<form name='form'><input ng-model='person.firstName' custom-required name='firstName'></form>"),
			element = linkingFn(mockScope);

		mockScope.$digest();
		expect(element.find("input").hasClass("ng-valid-custom-required")).toEqual(true);

		mockScope.form.firstName.$setViewValue("");
		expect(element.find("input").hasClass("ng-invalid-custom-required")).toEqual(true);
	});

});
