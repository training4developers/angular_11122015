(function() {

	angular.module("App", [])
		.controller("HomeCtrl", function($scope, customData) {

			$scope.person = {
				firstName: "Bob",
				lastName: "Smith"
			};

			$scope.update = function() {
				customData.update($scope.person);
			};

		})
		.directive("customRequired", function() {

			return {
				require: "ngModel",
				link: function(scope, element, attrs, ctrl) {

					function setValidity(value) {
						if (value != null && String(value).length > 0) {
							ctrl.$setValidity("custom-required", true);
							return value;
						} else {
							ctrl.$setValidity("custom-required", false);
							return;
						}
					}

					ctrl.$formatters.unshift(setValidity);
					ctrl.$parsers.unshift(setValidity);
				}
			};

		})
		.filter("customUpperCase", function() {

			return function(value) {
				return String(value).toUpperCase();
			};

		})
		.factory("customData", function($http) {

			return {
				getAll: function() {
					return $http.get("/js/app/data.js");
				},
				update: function(data) {
					return $http.post("/js/app/data.js", data);
				}
			};
		});

}(jQuery, angular));
