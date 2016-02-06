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
		vm.errorType = $state.params.type;

		prepareErrorData($state.params.data);
		function prepareErrorData(data) {
			if (vm.errorType === "invalid") {
				vm.formattedErrors = [];
				data.forEach(
					function(item) {
						if (item.value < 0) {
							createErrorOfColor(item);
						}
					}
				);
			}
			function createErrorOfColor(item) {
				vm.formattedErrors.push({
					color: item.color,
					value: -item.value
				});
			}
		}
	}
})();