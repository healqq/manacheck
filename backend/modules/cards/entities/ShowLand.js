var Land = require('./Land.js');

function ShowLand(id, colors, gameState) {
	
	var self = this;
	//console.log(gameState);
	//calling base class constructor
	Land.call(self, id, colors, true, 'show');
	self.isTapped = isTapped;

	return self;

	function isTapped() {
		return gameState.showLandIsTapped(self.colors);
	}
}

ShowLand.prototype = Land();
module.exports = ShowLand;