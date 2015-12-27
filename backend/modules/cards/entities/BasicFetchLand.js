var Land = require('./Land.js');

function BasicFetchLand(id, deck) {
	
	var self = this;
	var colors = ['red', 'green', 'blue', 'white', 'black', 'grey'];
	//calling base class constructor
	Land.call(self, id, colors, false, 'basicfetch');
	self.getColors = getColors;
	self.hasColor = hasColor;

	return self;

	// colors of fetchland depend on current deck
	function getColors() {
		var result = [];
		var allColors = deck.getBasicLands();
		for (var i=0; i< self.colors.length;i++) {
			if (allColors[self.colors[i]].count > 0) {
				result.push(colors[i]);
			} 
		}
		return result;
	}

	function hasColor(color) {
		return (getColors().indexOf(color) !== -1);
	}
}

BasicFetchLand.prototype = Land();
module.exports = BasicFetchLand;