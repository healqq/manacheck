var Land = require('./Land.js');

function FastLand(id, colors, gameState) {
	
	var self = this;
	//console.log(gameState);
	//calling base class constructor
	Land.call(self, id, colors, true, 'fast');
	self.isTapped = isTapped;

	return self;

	function isTapped() {
		return gameState.fastLandIsTapped();
	}
}

FastLand.prototype = Land();
module.exports = FastLand;