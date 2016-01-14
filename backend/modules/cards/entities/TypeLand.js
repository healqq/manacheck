var Land = require('./Land.js');

function TypeLand(id, colors, tapped, type, typeColors, gameState) {
	
	var self = this;
	//calling base class constructor
	Land.call(self, id, colors, tapped, 'type');
	self.type = type;
	self.typeColors = typeColors;
	self.isTapped = isTapped;
	self.getColors = getColors;

	return self;

	function getColors() {
		return gameState.isSpellType(self.type)? self.typeColors : self.colors;
	}

	function hasColor(color) {
		return (getColors().indexOf(color) !== -1);
	}
}

TypeLand.prototype = Land();
module.exports = TypeLand;