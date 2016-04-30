var extend = require('util')._extend;
var Nonland = require(cardsModule + '/entities/Nonland.js');
var combinationsHelper = require(cardsModule + '/helpers/combinationsHelper.js');
/*
 *	DECK STORAGE LOGIC
 */
function landsCollection() {
	
	var _lands, _canFetch, _symbols, _colorsOrder, _fetchesPlayed, _basicLands;
	
	function _canBeFetched(land) {
		return (land.type === 'basic') || (land.type === 'battle');
	}

	function _isBasic(land) {
		return land.type === 'basic';
	}
	function _getLandsOfColor(lands, color) {

		var result = [];
		if (color === 'generic') {
			for (var i=0;i<lands.length;i++) {
				if (lands[i].getColors().length > 0) {
					result.push(lands[i]);
				}
			}	
		}
		else {
			for (var i=0;i<lands.length;i++) {
				if (lands[i].hasColor(color)) {
					result.push(lands[i]);
				}
			}
		}

		return result;
	}
	function sortColors() {
		var colorsArray = [];
		for (var color in _symbols) {
			if (_symbols[color] > 0) {
				colorsArray.push({color:color, value: _symbols[color]});
			}
		}

		_colorsOrder = colorsArray.sort(compareColors);
		function compareColors(element1, element2) {
			return element1.value - element2.value;
		}
	}
	function getLandsOfColor(color, untappedFirst) {
		
		result = _getLandsOfColor(_lands, color);
				
		return	result.sort(getSortFunction(untappedFirst));
		
		function getSortFunction(ascending) {
			var _ascending = ascending;
			function sortTapped(land1, land2) {
				return (_ascending?1:-1) * (land1.isTapped() - land2.isTapped());
			}
			return sortTapped;
		}

		
	}
	function addLandCanBeFetched(land) {
		var landColors;
		if ( _canBeFetched(land) ) {
			landColors = land.getColors();
			for (var i=0;i<landColors.length; i++) {
				if (_canFetch[landColors[i]][land.id] === undefined) {
					_canFetch[landColors[i]][land.id]= {
						count: 1,
						colors: landColors
					};
				}
				else {
					_canFetch[landColors[i]][land.id].count++;
				}
				
			}
			if (land.isBasicLand()) {
				if (_basicLands[landColors[0]].count === undefined) {
					_basicLands[landColors[0]] = {
						id: land.id,
						count: 1,
					}
				}
				else {
					_basicLands[landColors[0]].count++;
				}
			}
		}
	}

	function addLandColors(land) {
		var landColors = land.getColors();
		for (var i=0; i<landColors.length; i++) {
			_symbols[landColors[i]]++;
		}
	}
	function findLandWithId(id) {
		for (var i=0;i<_lands.length;i++) {
			if (_lands[i].id === parseInt(id) ) {
				return i;
			}
		}

		throw new Error('No land with id: ' + id + " left.");
	}
	/*public methods */
	function set(deck) {
		function getEmptyColorsCollection() {
			return {
				red: {},
				black: {},
				green: {},
				blue:{},
				white:{},
				colorless:{}
			};
		};

		_lands = [];
		_canFetch = getEmptyColorsCollection();
		_basicLands = getEmptyColorsCollection();
		_symbols = combinationsHelper.createCombination();
		for (var i=0; i< deck.length; i++) {
			add(deck[i]);		
		}
		sortColors();
	}
	function add(card) {
		if (card instanceof Nonland){
		}
		else {
			addLandColors(card);
			addLandCanBeFetched(card);
			_lands.push(card);
		}
	}
	function updateSymbols() {
		_symbols = combinationsHelper.createCombination();
		for (var i=0; i< _lands.length; i++) {
			addLandColors(_lands[i]);
		}
	}
	function find() {
		return _deck;
	}
	function splice(cards) {
		if (!Array.isArray(cards)) {
			cards = [cards];
		}
		//splice one by one
		for (var i=0;i<cards.length;i++) {
			spliceOne(cards[i]);
		}
		//resort colors after splice
		sortColors();

		function spliceOne(card) {
			var landColors, canBeFetched;
			if (card instanceof Nonland) {

			}
			else {
				landColors = card.getColors();

				canBeFetched = _canBeFetched(card);
				for (var i=0;i<landColors.length;i++) {
					_symbols[landColors[i]]--;
					if (canBeFetched) {
						_canFetch[landColors[i]][card.id].count--;
						if (card.isBasicLand()) {
							_basicLands[landColors[i]].count--;
						}
					}
				}
				_lands.splice(findLandWithId(card.id),1);
				if (canBeFetched) {
					updateSymbols();
				}
			}
		}
		
	}

	function getAll() {
		return {
			lands: get(),
			symbols: getSymbols(),
			// fetchedLands: getFetchedLands()
		}
	}
	function getLength() {
		return _lands.length;
	}
	function get() {
		return _lands;
	}
	function at(index) {
		return _lands[index];
	}
	function getSymbols() {
		return extend({}, _symbols);
	}
	function getSymbolsOrder() {
		return _colorsOrder;
	}
	function getFetchedLands() {
		return _canFetch;
	}
	function getBasicLands() {
		return _basicLands;
	}
	return {
		//setters
		set: set,
		add: add,
		//getters
		get: get,
		at: at,
		getLength: getLength,
		getAll: getAll,
		getFetchedLands: getFetchedLands,
		getBasicLands: getBasicLands,
		getSymbolsOrder: getSymbolsOrder,
		getSymbols: getSymbols,
		getLandsOfColor: getLandsOfColor,
		//helpers
		splice: splice,
		find: find,
		findLandWithId: findLandWithId,
	}
	
	
}

module.exports = landsCollection;