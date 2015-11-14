asyncLoader.registerController("MyCtrl", function($scope, simpleLogger, $filter) {
	$scope.message = "Hi Class!";
	simpleLogger($scope.message);
});

asyncLoader.registerFilter("sapUpperCase", function(value) {
	return String(value).toUpperCase();
});

asyncLoader.registerDirective("sapBold", function() {

	return function(scope, element) {
		element.css("font-weight", "bold");
	};

});

asyncLoader.registerFactory("simpleLogger", function() {

	return function(msg) {
		console.log(msg);
	};

});
