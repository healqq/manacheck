var extend = require('util')._extend;
var combinationsHelper = require(cardsModule + '/helpers/combinationsHelper.js');

function fieldService() {
	var field = [];
	var combinations = [];
	var combinationsRemainingColors = [];
	var tempCombination = {};
	var Deck;
	var Hand;
	var basicLandsCount = 0;

	function getBasicLandsCount() {
		return basicLandsCount;
	}

	function addLand(land) {
		field.push(land);
		if (land.type === 'basic') {
			basicLandsCount++;
		}
	}
	function getField() {
		return field;
	}
	function getCombinations() {
		return combinations;
	}
	function updateCombinations() {
		for (var i=0;i<combinations.length; i++) {
			tempCombination = combinationsHelper.substractCombinations( neededColorsCombination, combinations[i]);
			tempCombination.index = i;
			combinationsRemainingColors.push(tempCombination);
		}
	}

	function findCombinationWithNeededColors(colors) {
		combinationsRemainingColors.sort(compareFunction);
		result = [];
		for (var i=0;i<combinationsRemainingColors.length;i++) {
			// yep, we did it somehow
			if (combinationsRemainingColors[i].count === 0) {
				console.log('###WOOOOT');
				console.log(combinationsRemainingColors[i]);
				return combinationsRemainingColors[i];
			}
			if (combinationsHelper.crossCombinations(colors, combinationsRemainingColors[i]).count > 0) {
				return combinationsRemainingColors[i];
			}
		}
		return undefined;

		function compareFunction(combination1, combination2) {
			return combination1.count - combination2.count;
		}
	}
	function addCombinations(land) {
			
		var result = [];
		var combinationCodes = [];
		var currentCombination;
		var updatedCombination;
		var currentColorCombination;
		//first land
		if (combinations.length === 0) {
			for (var j=0; j<land.colors.length; j++) {
				currentCombination = combinationsHelper.createCombination();
				currentCombination[land.colors[j]] = 1;
				result.push(currentCombination);
			}
		}
		else {
			//other cases
			while (combinations.length > 0) {
				currentCombination = combinations.splice(0,1)[0];
				for (var j=0; j<land.colors.length; j++) {
					//copying combination
					updatedCombination = extend({}, currentCombination);
					//updating combination
					updatedCombination[land.colors[j]]++;
					//calculating combination color code
					currentColorCombination = combinationsHelper.getCombinationCode(updatedCombination);
					//this combination is unique
					if (combinationCodes.indexOf(currentColorCombination) === -1) {

						result.push(updatedCombination);
						combinationCodes.push(currentColorCombination);
					}
					
				}
			}
		}

		return result;
	}
	
	function setHand(hand) {
		Hand = hand;
	}
	function setDeck(deck) {
		Deck = deck;
	}
	function reset() {
		field = [];
		combinations = [];
		combinationsRemainingColors = [];
		basicLandsCount = 0;
	}

	function getHash() {
		function sortFunc(land1, land2) {
			return land1.id < land2.id;
		}
		var result = '';
		field.sort(sortFunc).forEach(function(land) {
			result += land.id + '|';
		});

		return result;
	}
	return {
		updateCombinations: updateCombinations,
		getCombinations: getCombinations,
		findCombinationWithNeededColors: findCombinationWithNeededColors,
		getField: getField,
		addLand: addLand,
		addCombinations: addCombinations,
		reset: reset,
		setDeck: setDeck,
		setHand: setHand,
		getHash: getHash,
		getBasicLandsCount: getBasicLandsCount
	}
}


module.exports = fieldService;