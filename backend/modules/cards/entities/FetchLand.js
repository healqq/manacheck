var Land = require('./Land.js');

function FetchLand(id, colors, deck) {
	
	var self = this;
	//calling base class constructor
	Land.call(self, id, colors, false, 'fetch');
	self.getColors = getColors;
	self.hasColor = hasColor;

	return self;

	// colors of fetchland depend on current deck
	function getColors() {
		var result = [];
		var allColors = deck.getFetchedLands();
		for (var i=0; i< self.colors.length;i++) {
			for (var key in allColors[self.colors[i]]) {
				if (allColors[self.colors[i]][key].count > 0) {
					addNewColors(result, allColors[self.colors[i]][key].colors)
				} 
			}
		}

		return result;
		function addNewColors(array, colors) {
			for (var i=0;i<colors.length;i++) {
				if (array.indexOf(colors[i]) === -1) {
					array.push(colors[i]);
				}
			}
		} 
	}

	function hasColor(color) {
		return (getColors().indexOf(color) !== -1);
	}
}

FetchLand.prototype = Land();
module.exports = FetchLand;