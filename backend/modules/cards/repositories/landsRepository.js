var lands = require(cardsModule +'/data/lands.json');
function landsRepository() {
	var self = this;
	
		function getById(id) {
		var land = lands.filter(function(land) {
			return land.id === id;
		});
		if (!(land && land.length)) {
			throw new Error('land with id: ' + id + ' does not exist');
		}

		return land[0];
	}
	
	function getAll() {
		return lands;
	}
	return {
		getById: getById,
		getAll: getAll,
	}
}



module.exports = landsRepository();