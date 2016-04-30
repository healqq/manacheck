var connection = require(appRoot +'/modules/cards/helpers/db.js');
var resultSchema = connection.Schema({
    rounds: [],
    startingHands: {},
    deckSymbols: {},
    hashes: {},
    mulligans: {
    	from7: Number,
    	from6: Number,
    },
    failsCount: Number,
    lands: [],
    colors: [],
    hands: {},
});

var Result = connection.model('Result', resultSchema);

module.exports = Result;