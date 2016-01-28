var Land = require('./Land.js');

function LastRoundLand(id, colors, lastRoundColors, gameState) {
	
	var self = this;
	//calling base class constructor
	Land.call(self, id, colors, true, 'lastround');
	self.lastRoundColors = lastRoundColors;
	self.getColors = getColors;
	self.isTapped = isTapped;

	return self;

	function getColors() {
		return gameState.isOneLandLeft()? self.lastRoundColors : self.colors;
	}

	function hasColor(color) {
		return (getColors().indexOf(color) !== -1);
	}

	function isTapped() {
		return !gameState.isOneLandLeft();
	}
}

LastRoundLand.prototype = Land();
module.exports = LastRoundLand;