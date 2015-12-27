var landsCollection = require(cardsModule + '/repositories/landsCollection.js');

function handRepository() {
	var self = this;
	var _lands = undefined;
	var _cardsCount;

		
	function findlandsByKeyValue(key, value) {
		var result = [];
		for (var i=0; i<_lands.length; i++) {
			if (_lands[i][key] === value) {
				result.push(_lands[i]);
			}
		}

	}
	function setHand(cards) {
		_cardsCount = cards.length;
		_lands = new landsCollection();
		_lands.set(cards);
	}

	function getSymbolsOrder() {
		return _lands.getSymbolsOrder();
	}
	function getSymbols() {
		return _lands.getSymbols();
	}
	function getLength() {
		return _lands.getLength();
	}
	function add(card) {
		if (Array.isArray(card)) {
			card = card[0];
		}
		_cardsCount +=1;
		_lands.add(card);
	}
	function isKeepable() {
		return ( 
			( (_lands.getLength() > 1) && (_lands.getLength() < 6) ) 
			|| 
			(_cardsCount < 6) 
		); 
	}
	function getNextPlay(color, lastLand) {
		var avalibleLands = _lands.getLandsOfColor(color, lastLand);
		if (avalibleLands.length === 0) {
			return undefined;
		}
		else {
			return avalibleLands[
				(
					lastLand?
					0:(avalibleLands.length-1)
				)
			];
		}
	}

	

	function playLand(color, lastLand) {
		var land = getNextPlay(color, lastLand);
		if (land !== undefined) {
			_lands.splice(land);
			return land;
		}
		return undefined;
	}
	function getAll() {
		return {
			lands: _lands.get(),
			symbols: _lands.getSymbolsOrder(),
			// fetchedLands: _lands.getFetchedLands()
		}
	}
	return {
		set: setHand,
		add: add,
		playLand: playLand,
		getAll: getAll,
		getSymbols: getSymbols,
		getSymbolsOrder: getSymbolsOrder,
		getLength: getLength,
		isKeepable: isKeepable,
	}
}



module.exports = handRepository;