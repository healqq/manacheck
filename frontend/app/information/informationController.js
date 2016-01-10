(function(){
	'use strict';
	
	angular
	.module('information')
	.controller('informationController', informationController);

	informationController.$inject = [
		'$state', 
		'landsStorageFactory', 
		'colorsStorageFactory', 
		'calculationFactory'
	];

	function informationController($state, landsStorageFactory, colorsStorageFactory, calculationFactory) {
		var vm = this;
		
		vm.submitData = submitData;
		function submitData() {
			var params = {
				lands: landsStorageFactory.getLands(),
				colors: colorsStorageFactory.getColors()
			};

			var response = calculationFactory.calculate(params)
			.then(
				function(data) {
					$state.go('^.Results', {data: data.rounds});
					return data;
				},
				function(error) {
					$state.go('^.Errors', {data: error.data});
				}
			);

		}

		function navigate(state) {
			$state.go(state);
		}
	}
})();