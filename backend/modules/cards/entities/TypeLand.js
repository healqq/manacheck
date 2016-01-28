var Land = require('./Land.js');

function TypeLand(id, colors, tapped, spellType, typeColors, gameState) {
	
	var self = this;
	//calling base class constructor
	Land.call(self, id, colors, tapped, 'type');
	self.spellType = spellType;
	self.typeColors = typeColors;

	self.getColors = getColors;
	self.hasColor = hasColor;

	return self;
	

	function getColors() {
		return (gameState.isSpellType(self.spellType)? self.typeColors : self.colors);
	}

	function hasColor(color) {
		return (getColors().indexOf(color) !== -1);
	}
}

TypeLand.prototype = Land();
module.exports = TypeLand;