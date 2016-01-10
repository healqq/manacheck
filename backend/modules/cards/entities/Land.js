function Land(id, colors, tapped, type) {
	var self = this;
	self.colors = Array.isArray(colors)?colors:[colors];
	self.tapped = tapped;
	self.type = type;
	self.id = id;
	self.getColors = getColors;
	self.hasColor = hasColor;
	self.isTapped = isTapped;
	self.isFetchLand = isFetchLand;


	return self;

	function getColors() {
		return self.colors;
	}

	function hasColor(color) {
		return (self.colors.indexOf(color) !== -1);
	}

	function isTapped() {
		return self.tapped;
	}

	function isFetchLand(land) {
		return (self.type === 'fetch') || (self.type === 'basicfetch');
	}

}

module.exports = Land;