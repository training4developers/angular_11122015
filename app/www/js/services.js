

angular.module("MyApp")
	.factory("logger", function() {

		return function(msg) {
			console.log(msg);
		};

	})
