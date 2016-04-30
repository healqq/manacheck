(function(){
	'use strict';
	
	angular
	.module('results')
	.controller('resultsController', resultsController);

	resultsController.$inject = [
		'$state',
		'landsFactory',
		'resultData' 
	];

	function resultsController($state, landsFactory, resultData) {
		var vm = this;
		vm.symbols = resultData.symbols;
		vm.landsInHand = resultData.hands;
		vm.rounds = resultData.rounds;
		vm.failsCount = resultData.failsCount;
		vm.dimensions = {
			width: 300,
			height: 300,
		};
		var graphWidth = 300;
		var graphHeight = 300;
		var lands =  resultData.landCombinations; //mockLands();//
		var mulligans = resultData.mulligans;//mockMulligans();
		
		vm.lands = prepareLands(lands);
		vm.mulligans = prepareNumbers(mulligans);

		
		
		
		function prepareNumbers(mulligans) {
			
			return {
				to6: mulligans.from7/10,
				to5: mulligans.from6/10
			};
		}
		function prepareLands(values) {

			var landsArray = [];
			Object.keys(values).forEach(
				function(key) {
					landsArray.push({combination: getLands(key), value: values[key]});
				});
			return landsArray.sort(sortFunc).slice(0,5);

			function getLands(combination) {
				var landIds = combination.split('|');
				var lands = [];
				return landIds.reduce(
					function(result, currentId) {

						if (currentId === '') {
							return result;
						}
						var id = parseInt(currentId);
						if ((result.length === 0) || (result[result.length-1].landId !== id)) {
							result.push({landId: id, value: 1});
						}
						else {
							result[result.length-1].value++;
						}
					
						return result;
					}, 
					[]
				);
			}
			function sortFunc(combination1, combination2) {
				return combination2.value - combination1.value;
			}
		}
	}
})();