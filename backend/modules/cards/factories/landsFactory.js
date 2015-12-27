var Land = require(cardsModule + '/entities/Land.js');
var BattleLand = require(cardsModule + '/entities/BattleLand.js');
var FetchLand = require(cardsModule + '/entities/FetchLand.js');
var BasicFetchLand = require(cardsModule + '/entities/BasicFetchLand.js');
var LandsStorage = require(cardsModule + '/repositories/landsRepository.js');

function landsFactory(deck) {
	var self = this;
	var _deck = deck;
	
	function build(id) {
		var land;
		var landContext = LandsStorage.getById(id);
		// console.log(landContext);
		switch (landContext.type) {
			case 'battle' :
				land = new BattleLand(id, landContext.colors);
			break;
			case 'fetch':
				land = new FetchLand(id, landContext.colors, _deck);
			break;
			case 'basicfetch':
				land = new BasicFetchLand(id, _deck);
			break;
			default:
				land = new Land(id, landContext.colors, landContext.tapped, landContext.type);
			break;
		}
		
		return land;
	}
	
	return {
		build: build,
	}
}



module.exports = landsFactory;