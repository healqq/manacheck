var Land = require('./Land.js');

function BattleLand(id, colors, gameState) {
	
	var self = this;
	//console.log(gameState);
	//calling base class constructor
	Land.call(self, id, colors, true, 'battle');
	self.isTapped = isTapped;

	return self;

	function isTapped() {
		return gameState.battleLandIsTapped();
	}
}

BattleLand.prototype = Land();
module.exports = BattleLand;