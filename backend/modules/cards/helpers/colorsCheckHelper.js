var LandsFactory = require(cardsModule + '/factories/landsFactory.js');
var combinationsHelper = require(cardsModule + '/helpers/combinationsHelper.js');

function checkDeck(landIds, colorsArray) {
	var colors = combinationsHelper.combinationFromArray(colorsArray);
	var symbols = combinationsHelper.createCombination();
	var landsFactory = new LandsFactory();
	// fill symbols
	landIds.forEach( 
		function(landId) {
			function addColors(colors) {
				colors.forEach(function(color) {
					symbols[color]++;
				});
			}
			var land = landsFactory.build(landId);
			// ignore fetches
			if (!land.isFetchLand()) {
				addColors(land.getColors());
			}
		}
	);

	var membership = combinationsHelper.combinationsMembership(symbols, colors);

	return {
		valid: membership.belongs,
		combination: combinationsHelper.combinationToArray(membership)
	}
}

module.exports = checkDeck;