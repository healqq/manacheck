/*
 *	DECK STORAGE LOGIC
 */
var extend = require('util')._extend;
var Nonland = require(cardsModule + '/entities/Nonland.js');
var shuffleHelper = require(cardsModule + '/helpers/shuffleHelper.js');
var landsCollection = require(cardsModule + '/repositories/landsCollection.js');

function deckRepository(gameState) {
	var _deck = [];
	var _deckCopy;
	var _lands;

	function set(deck, cardsCount) {
		
		_lands = new landsCollection();
		_lands.set(deck);
		_deck = deck.slice();
		for (var i=_deck.length; i < cardsCount; i++) {
			_deck.push(new Nonland());
		}
		_deckCopy = _deck.slice();
		
	}
	function getAll() {
		return {
			deck: get(),
			symbols: _lands.getSymbols(),
			fetchedLands: _lands.getFetchedLands()
		}
	}
	function get() {
		return _deck;
	}
	
	function getSymbolsOrder() {
		if (_lands === undefined) {
			throw new Exception('lands are not set');
		}
		return _lands.getSymbolsOrder();
	}

	function getSymbols() {
		return _lands.getSymbols();
	}
	function getBasicLands() {
		if (_lands === undefined) {
			throw new Error('lands are not set');
		}
		return _lands.getBasicLands();
	}

	function getFetchedLands() {
		if (_lands === undefined) {
			throw new Error('lands are not set');
		}
		return _lands.getFetchedLands();
	}

	function shuffle() {
		_deck = shuffleHelper(_deck);
	}
	function draw(number) {
		number = number || 1;
		if ( (!Array.isArray(_deck)) || (_deck.length < number) ) {
			throw new Error('not enough cards');
		}
		var cards = _deck.splice(0,number);
		_lands.splice(cards);
		return cards;
	}
	function find() {
		return _deck;
	}

	function fetchLand(color) {
		var avalibleLands = _lands.getFetchedLands();
		var currentId = undefined;
		var land, landIndex;
		for (var key in avalibleLands[color]) {
			if (avalibleLands[color][key].count > 0) {
				currentId = key;
			}
		}
		if (currentId === undefined) {
			console.log(avalibleLands[color]);
		}
		landIndex = _lands.findLandWithId(currentId);
		land = extend({}, _lands.at(landIndex));
		_lands.splice(land);
		return land;
	}

	function fetchBasicLand(color) {
		var avalibleLands = _lands.getBasicLands();
		var currentId = undefined;
		var land, landIndex;
		currentId = avalibleLands[color].id;
		// console.log(currentId);
		landIndex = _lands.findLandWithId(currentId);
		land = extend({}, _lands.at(landIndex));
		_lands.splice(land);
		return land;
	}
	function reset() {
		_deck = _deckCopy.slice();
		_lands.set(_deck);
		shuffle();
	}
	return {
		set: set,
		reset: reset,
		get: get,
		getSymbols: getSymbols,
		getSymbolsOrder: getSymbolsOrder,
		fetchLand: fetchLand,
		fetchBasicLand: fetchBasicLand,
		shuffle: shuffle,
		draw: draw,
		find: find,
		getAll: getAll,
		getFetchedLands: getFetchedLands,
		getBasicLands: getBasicLands,
		
	}
	
	
}

module.exports = deckRepository;