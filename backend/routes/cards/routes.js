var express = require('express');

var extend = require('util')._extend;
var CardsService = require(appRoot + '/modules/cards/services/cardsService.js');
var Result = require(appRoot + '/modules/cards/models/result.js');
var connection = require(appRoot +'/modules/cards/helpers/db.js');

var router = express.Router();

function sendResponse(res, data, status) {
	status = status || 200;
	res.status(status);
	res.send(data);
}
/* POST play */
router.post('/play', function(req, res, next) {
	
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
	var genericMana = getGenericMana(requestData.colors);
	var colors = requestData.colors;
	var cardsCount = requestData.cardsCount || 60;

	var cardsService = new CardsService();
	cardsService.setColors(colors);
	cardsService.setLands(lands);
	cardsService.setGenericMana(genericMana);
	cardsService.setSpellsType(requestData.spellsType);
	console.log(requestData.spellsType);
	cardsService.setCardsCount(cardsCount);

	var result = cardsService.play();
	if (result.status === undefined) {
		var dataToSave = extend({
			lands: lands,
			colors: colors,
		}, result.data);
 		Result.create(dataToSave, function(err, dbResult) {
 			result.data.id = dbResult._id;
 			sendResponse(res, result.data, result.status);
		});
	}
	else {
		sendResponse(res, result.data, result.status);
	}
	
});

router.get('/result/:id', function(req, response, next) {
	Result.find({"_id": req.params.id}, function(err, result) {
		if (err || (Array.isArray(result) && result.length === 0)) {
			sendResponse(response, {}, 404);
		}
		else {
			sendResponse(response, result[0]);
		}
	});
})
module.exports = router;