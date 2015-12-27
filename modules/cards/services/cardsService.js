/*
 *	DECK LOGIC
 */
var extend = require('util')._extend;

var LandsFactory = require(cardsModule + '/factories/landsFactory.js');
var combinationsHelper = require(cardsModule + '/helpers/combinationsHelper.js');
var DeckRepository = require(cardsModule + '/repositories/deckRepository.js');
var HandRepository = require(cardsModule + '/repositories/handRepository.js');
var FieldService = require(cardsModule + '/services/FieldService.js');


function cardsService() {
	
	
	var Deck = new DeckRepository();
	var Hand = new HandRepository();
	var Field = new FieldService();
	var factory = new LandsFactory(Deck, Field);
	var _colors = undefined;
	var _landIds = undefined;


	
	function mockCreate() {
		var deck = [];
		for (var i=0;i < 4;i++) {
			deck.push(factory.build(1));
			deck.push(factory.build(2));
			deck.push(factory.build(3));
			deck.push(factory.build(5));
			deck.push(factory.build(6));
			deck.push(factory.build(7));
			deck.push(factory.build(8));
		}
		//fetched lands should be added last
		deck.push(factory.build(4));
		deck.push(factory.build(4));
		deck.push(factory.build(4));
		Deck.set(deck);
		Deck.shuffle();
		
	}

	function setDeck(landIds) {
		var deck = [];
		for (var i=0;i<landIds.length; i++) {
			deck.push(factory.build(landIds[i]));
		}

		Deck.set(deck);
		Deck.shuffle();

	}
	function mockNeededColors() {
		return [
			{color:'red', value: 2}, 
			{color:'blue', value:1}, 
			{color: 'green', value: 1}, 
			{color: 'black', value: 0},
			{color:'grey', value: 0},
		];
	}
	function play() {
		
		// var _colors = _colors.slice();
		var rounds = [];

		for (var bigLoop=0; bigLoop<1000; bigLoop++) {
			var round = 1;
			var neededColors = _colors.slice();
			var neededColorsCombination = combinationsHelper.combinationFromArray(neededColors);
			var neededGenericMana = 0;
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
				rounds: rounds,
				// neededColors: neededColorsCombination, 
				// deck: Deck.getAll(), 
				// hand: Hand.getAll(), 
				// field: field, 
				// combinations: combinations, 
				// remaining: combinationsRemainingColors,
				// round: (land.isTapped()?round:round-1)
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
					console.log('intersect mana: ' + foundCombinationIntersect);
					console.log('needed mana: ' + neededGenericMana);
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
				console.log('mulligan happened! cardsNumber: ' + cardsNumber);
				Deck.reset();
				cards = Deck.draw(cardsNumber);
				Hand.set(cards);
			}
			Field.reset();
			Field.setDeck(Deck); 
			Field.setHand(Hand);
		}


		
		
	}

	function setLands(lands) {
		_landIds = lands;
	}
	function setColors(colors) {
		_colors = colors;
	}
	function shuffle() {
		mockCreate();
		Deck.shuffle();
		return Deck.get(); 
	}
	function drow() {
		mockCreate();
		Deck.drow();
		return Deck.drow();
	}
	return {
		setColors: setColors,
		setLands: setLands,
		play: play,
		shuffle: shuffle,
		drow: drow
	}
}



module.exports = cardsService;