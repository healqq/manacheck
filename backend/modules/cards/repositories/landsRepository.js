var lands = require(cardsModule +'/data/lands.json');
function landsRepository() {
	var self = this;
	
		function getById(id) {
		if (lands[id-1] === undefined) {
			throw new Error('land with id: ' + id + ' does not exist');
		}
		return lands[id-1];
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