var express = require('express');

var CardsService = require(appRoot + '/modules/cards/services/cardsService.js');

var router = express.Router();

/* POST play */
router.post('/play', function(req, res, next) {
	
	function sendResponse(res, data, status) {
		status = status || 200;
		res.status(status);
		res.send(data);
	}
	function transformLands(landsObject) {
		// console.log(landsObject);
		var lands = landsObject.lands;
		var result = [];
		lands.forEach(function(landItem) {
			for (var i=0; i<landItem.value; i++) {
				result.push(landItem.id);
			}
		});

		return result;
	}

	function getGenericMana(colors) {
		var value = 0;
		for (var i=0;i< colors.length; i++) {
			if (colors[i].color === 'generic') {
				value = colors[i].value;
				colors.splice(i, 1);
				return value;
			}
		}
	}
	var requestData = req.body;

	var lands = transformLands(requestData.lands);
	var genericMana = getGenericMana(requestData.colors.colors);
	var colors = requestData.colors.colors;

	var cardsService = new CardsService();
	cardsService.setColors(colors);
	cardsService.setLands(lands);
	cardsService.setGenericMana(genericMana);

	var result = cardsService.play();
	sendResponse(res, result.data, result.status);
});

module.exports = router;