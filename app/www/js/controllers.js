




angular.module("MyApp", [])
	.controller("MyCtrl", function($scope, $ocLazyLoad, $injector) {

		$ocLazyLoad.load("/js/services.js").then(function() {
			var logger = $injector.get("logger");
			logger("it worked!");
		});

		$scope.message = "Hi Class!";
	});
