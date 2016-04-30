(function(){
	'use strict';
	
	angular
	.module('results')
	.factory('resultsFactory', resultsFactory);

	resultsFactory.$inject = ['$resource'];

	function resultsFactory($resource) {

		var serviceResource = $resource('api/cards/result/:id', {id:'@id'});
		
		function view(params) {
			return (new serviceResource(params)).$get()
			.then(function(data) {
				return {
					rounds: data.rounds, 
					landCombinations: data.hashes, 
					lands: data.lands,
					colors: data.colors,
					symbols: data.deckSymbols, 
					mulligans: data.mulligans,
					hands: data.hands,
					id: data._id,
					failsCount: data.failsCount,
				};
			});
		}
		
		return {
			view: view,
		}
	}
	
})();