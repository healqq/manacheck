/*
 *	DECK LOGIC
 */
var extend = require('util')._extend;

var LandsFactory = require(cardsModule + '/factories/landsFactory.js');
var combinationsHelper = require(cardsModule + '/helpers/combinationsHelper.js');
var colorsCheckHelper = require(cardsModule + '/helpers/colorsCheckHelper.js');
var DeckRepository = require(cardsModule + '/repositories/deckRepository.js');
var HandRepository = require(cardsModule + '/repositories/handRepository.js');
var FieldService = require(cardsModule + '/services/fieldService.js');



function cardsService() {
	
	
	var Deck = new DeckRepository();
	var Hand = new HandRepository();
	var Field = new FieldService();
	var factory = new LandsFactory(Deck, Field);
	var _colors = undefined;
	var _deck = undefined;
	var _landIds = undefined;
	var _genericMana = undefined;

	function play() {
		var rounds = [];
		// check if there are enough symbols of needed colors
		var combinationCheck = colorsCheckHelper(_landIds, _colors);
		if (!combinationCheck.valid) {
			return {status: 422, data: combinationCheck.combination};
		}
		
		for (var bigLoop=0; bigLoop<1000; bigLoop++) {
			var round = 1;
			var neededColors = _colors.slice();
			var neededColorsCombination = combinationsHelper.combinationFromArray(neededColors);
			var neededGenericMana = _genericMana;
			var landsToPlayLeft = neededColorsCombination.count;
			var colorIndex, land, isLastLandTapped;
			setDeck(_landIds);
			//game start
			startGame();
			//sort needed colors according to the deck
			neededColors = sortColorsByAvailableColorSymbols(neededColors, Deck.getSymbolsOrder());
			// outer loop, rounds
			while ( (neededColors.length > 0) && (round < 30) ) {
				//inner loop colors selecting
				//resetting inner loop values
				land = undefined;
				colorIndex = 0;
				// sometimes you just don't drow dem lands
				if (Hand.getLength() > 0) {
					innerPlayLoop(neededColors);
					//we didn't find any land to play for current combination
					//need to test other combinations
					if (land === undefined) {
						Field.updateCombinations();
						if(!switchToAnotherCombination()) {
							if (neededGenericMana > 0) {
								playForGenericMana();
							}
						}

					}
				}
				Hand.add(Deck.draw());
				round = round + 1;
			}
			if (neededGenericMana > 0) {
				// get remaining generic mana
				while ( neededGenericMana > 0) {
					playForGenericMana();
					Hand.add(Deck.draw());
					round = round + 1;
				}
			}
			rounds.push((isLastLandTapped?round:round-1));
		}
		// Deck.draw();
		return {
			data: 
				{
					rounds: rounds,
					// neededColors: neededColorsCombination, 
					// deck: Deck.getAll(), 
					// hand: Hand.getAll(), 
					// field: field, 
					// combinations: combinations, 
					// remaining: combinationsRemainingColors,
					// round: (land.isTapped()?round:round-1)
				}
			};

		function playForGenericMana() {
			// console.log('playing generic');
			land = Hand.playLand('generic', (landsToPlayLeft + neededGenericMana === 1) );
			// it can happen if we have some fetches w/o lands to fetch.
			if (land === undefined) {
				return;
			}
			if (land.type === 'fetch') {
				land = Deck.fetchLand(land.getColors()[0]);
			}
			if (land.type === 'basicfetch') {
				land = Deck.fetchBasicLand(land.getColors()[0]);
			}
			Field.addLand(land);
			isLastLandTapped = land.isTapped();
			neededGenericMana--;
			Field.addCombinations(land);
		}

		function innerPlayLoop(neededColors) {
			while  ((colorIndex < neededColors.length) && (land === undefined) ) {
					
				land = Hand.playLand(neededColors[colorIndex].color, (landsToPlayLeft === 1) );
				if (land !== undefined) {
					if (land.type === 'fetch') {
						land = Deck.fetchLand(neededColors[colorIndex].color);
					}
					if (land.type === 'basicfetch') {
						land = Deck.fetchBasicLand(neededColors[colorIndex].color);
					}
					if ( neededColors[colorIndex].value === 1) {
						neededColors.splice(colorIndex,1);
					}
					else {
						neededColors[colorIndex].value--;
					}
					Field.addLand(land);
					isLastLandTapped = land.isTapped();
					landsToPlayLeft--;
					Field.addCombinations(land);
				}
				else {
					colorIndex++;
				}
			}
		}
		/*	
		 * checks, if any other combinations with available plays exist
		 */
		function switchToAnotherCombination() {
			var foundCombination = Field.findCombinationWithNeededColors(Hand.getSymbols());
			//we may switch to a new combination now
			if (foundCombination !== undefined) {
				tempCombination = sortColorsByAvailableColorSymbols(
					combinationsHelper.combinationToArray(combinations[foundCombination.index]), 
					Deck.getSymbolsOrder()
				);
				if (foundCombination.count === 0 ) {
					neededColors = [];
				}
				else {
					//set found combination as main
					var foundCombinationIntersect = combinationsHelper.substractCombinations(
						combinations[foundCombination.index],
						neededColorsCombination
					);
					// console.log('intersect mana: ' + foundCombinationIntersect);
					// console.log('needed mana: ' + neededGenericMana);
					if (landsToPlayLeft >= foundCombination.count) {
						neededColors = tempCombination;
						landsToPlayLeft = foundCombination.count;
					}
					innerPlayLoop(tempCombination);
				}

				return true;
			}

			return false;
		}

		function sortColorsByAvailableColorSymbols(colorsArray, symbols) {
			function compareColors(element1, element2) {
				return symbols[element1.color] - symbols[element2.value];
			}
			function removeEmptyColors(element) {
				return element.value > 0;
			}
			return colorsArray.filter(removeEmptyColors).sort(compareColors);
		}

		function startGame() {
			var cards;
			var cardsNumber = 7;
			cards = Deck.draw(cardsNumber);
			Hand.set(cards);
			while (!Hand.isKeepable()) {

				cardsNumber = cardsNumber - 1;
				// console.log('mulligan happened! cardsNumber: ' + cardsNumber);
				Deck.reset();
				cards = Deck.draw(cardsNumber);
				Hand.set(cards);
			}
			Field.reset();
			Field.setDeck(Deck); 
			Field.setHand(Hand);
		}
	}

	function setDeck(landIds) {
		
		var deck = [];
		var fetches = [];
		var land = undefined;
		// add all nonfetches to deck and store all fetches 
		// in different array
		landIds.forEach(
			function(landId) {
				land = factory.build(landId);
				if (land.isFetchLand()) {
					fetches.push(land);
				}
				else {
					deck.push(land);
				}
			}
		);
		// add fetches last
		fetches.forEach(
			function(land) {
				deck.push(land);
			}
		);
		Deck.set(deck);
		Deck.shuffle();

	}

	function setLands(lands) {
		_landIds = lands;
	}
	function setColors(colors) {
		_colors = colors;
	}
	function setGenericMana(amount) {
		_genericMana = amount;
	} 

	return {
		setColors: setColors,
		setLands: setLands,
		setGenericMana: setGenericMana,
		play: play,
	}
}



module.exports = cardsService;