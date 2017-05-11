var Land = require(cardsModule + '/entities/Land.js');
var BattleLand = require(cardsModule + '/entities/BattleLand.js');
var FetchLand = require(cardsModule + '/entities/FetchLand.js');
var BasicFetchLand = require(cardsModule + '/entities/BasicFetchLand.js');
var TypeLand = require(cardsModule + '/entities/TypeLand.js');
var LastRoundLand = require(cardsModule + '/entities/LastRoundLand.js');
var ShowLand = require(cardsModule + '/entities/ShowLand.js');
var FastLand = require(cardsModule + '/entities/FastLand.js');
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
			case 'type':
				land = new TypeLand(
					id, 
					landContext.colors, 
					landContext.tapped, 
					landContext.spellsType, 
					landContext.specialColors,
					_gameState);
			break;
			case 'lastround':
				land = new LastRoundLand(
					id, 
					landContext.colors, 
					landContext.specialColors, 
					_gameState);
			break;
			case 'show':
				land = new ShowLand(
					id, 
					landContext.colors, 
					_gameState);
			break;
			case 'fast':
				land = new FastLand(id, landContext.colors, _gameState);
			break;
			default:
				land = new Land(id, landContext.colors, landContext.tapped, landContext.type);
			break;
		}
		
		return land;
	}
	
	return {
		build: build,
	};
}
module.exports = landsFactory;