(function(){
	'use strict';
	
	angular
	.module('errors')
	.controller('errorsController', errorsController);

	errorsController.$inject = [
		'$state', 
	];

	function errorsController($state) {
		var vm = this;
		var errorData = Mock();
		vm.formattedErrors = [];

		errorData.forEach(
			function(item) {
				if (item.value < 0) {
					createErrorOfColor(item);
				}
			}
		);

		function createErrorOfColor(item) {
			vm.formattedErrors.push({
				color: item.color,
				value: -item.value
			});
		}

		function Mock() {
			return [
			  {
			    "color": "red",
			    "value": -1
			  },
			  {
			    "color": "green",
			    "value": -1
			  },
			  {
			    "color": "black",
			    "value": 0
			  },
			  {
			    "color": "blue",
			    "value": 20
			  },
			  {
			    "color": "white",
			    "value": 0
			  },
			  {
			    "color": "colorless",
			    "value": 0
			  }
			];
		}
	}
})();