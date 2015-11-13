describe("Service Tests", function() {

	var service, httpBackend;

	function getData() {

		return {
			people: [
				{ firstName: "Eric", lastName: "Greene" },
				{ firstName: "Amy", lastName: "Greene" },
				{ firstName: "Sarah", lastName: "Greene" },
				{ firstName: "Natalie", lastName: "Greene" }
			]
		};
	}

	beforeEach(angular.mock.module('App'));

	beforeEach(angular.mock.inject(function (customData, $httpBackend) {

		service = customData;
		httpBackend = $httpBackend;

	}));

	it('get a list of people from the service', function () {

		httpBackend.expectGET('/js/app/data.js').respond(getData());

		service.getAll().then(function (result) {
			expect(result.data.people.length).toEqual(4);
		});

		httpBackend.flush();

	});

	afterEach(function () {
		httpBackend.verifyNoOutstandingExpectation();
		httpBackend.verifyNoOutstandingRequest();
	});


});
