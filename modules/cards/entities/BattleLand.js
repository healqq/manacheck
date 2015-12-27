var Land = require('./Land.js');

function BattleLand(id, colors) {
	
	var self = this;
	//calling base class constructor
	Land.call(self, id, colors, true, 'battle');
	self.trigger = function() {

	}
	
	return self;
}

BattleLand.prototype = Land();
module.exports = BattleLand;