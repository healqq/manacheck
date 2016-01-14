var Land = require(cardsModule + '/entities/Land.js');
var BattleLand = require(cardsModule + '/entities/BattleLand.js');
var FetchLand = require(cardsModule + '/entities/FetchLand.js');
var BasicFetchLand = require(cardsModule + '/entities/BasicFetchLand.js');
var LandsStorage = require(cardsModule + '/repositories/landsRepository.js');

function landsFactory(gameState) {
	var self = this;
	var _gameState = gameState;
	function build(id) {
		var land;
		var landContext = LandsStorage.getById(id);
		// console.log(landContext);
		switch (landContext.type) {
			case 'battle' :
				land = new BattleLand(id, landContext.colors, _gameState);
			break;
			case 'fetch':
				land = new FetchLand(id, landContext.colors, _gameState.getDeck());
			break;
			case 'basicfetch':
				land = new BasicFetchLand(id, _gameState.getDeck());
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