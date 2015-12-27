var express = require('express');

var landsRepository = require(appRoot + '/modules/cards/repositories/landsRepository.js');
var landsFileParser = require(appRoot + '/modules/cards/helpers/landsFileParser.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	// var landsFactory = new LandsFactory();
	res.send(
		{
			lands:	landsRepository.getAll(), 
		}
	);
});

router.get('/update', function(req, res, next) {
	// var landsFactory = new LandsFactory();
	new landsFileParser().parseFile();
	res.send('oki');
});

module.exports = router;