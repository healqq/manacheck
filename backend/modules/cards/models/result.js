var connection = require(appRoot +'/modules/cards/helpers/db.js');
var resultSchema = connection.Schema({
    rounds: [],
    startingHands: {},
    deckSymbols: [
    	{color:String, value: Number}
    ],
    hashes: {},
    mulligans: {
    	from7: Number,
    	from6: Number,
    },
    lands: [],
    colors: [],
});

var Result = connection.model('Result', resultSchema);

module.exports = Result;