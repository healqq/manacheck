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
					$state.go('^.Results', {rounds: data.rounds, lands: data.hashes});
					return data;
				},
				function(error) {
					$state.go('^.Errors', {data: error.data, lands:{} });
				}
			);

		}

		function navigate(state) {
			$state.go(state);
		}
	}
})();