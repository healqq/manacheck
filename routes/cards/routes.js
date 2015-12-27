var express = require('express');

var CardsService = require(appRoot + '/modules/cards/services/cardsService.js');

var router = express.Router();

/* GET home page. */
router.post('/play', function(req, res, next) {
	
	function transformLands(landsObject) {
		console.log(landsObject);
		var lands = landsObject.lands;
		var result = [];
		lands.forEach(function(landItem) {
			for (var i=0; i<landItem.value; i++) {
				result.push(landItem.id);
			}
		});

		return result;
	}
	var requestData = req.body;

	var lands = transformLands(requestData.lands);
	var colors = requestData.colors.colors;
	var cardsService = new CardsService();
	cardsService.setColors(colors);
	cardsService.setLands(lands);
	res.send(cardsService.play());
});
// router.get('/shuffle', function(req, res, next) {
//   res.send(new cardsService.shuffle());
// });
// router.get('/drow', function(req, res, next) {
//   res.send(new cardsService.drow());
// });


module.exports = router;