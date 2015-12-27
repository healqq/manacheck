function combinationsHelper() {
	
	var colors = ['red', 'green', 'black', 'blue', 'white', 'grey'];
	var symbols = ['r', 'g', 'b', 'u', 'w', 'c'];
	function createCombination() {
			return {
				'red': 0,
				'blue': 0,
				'white': 0,
				'green': 0,
				'black': 0,
				'grey': 0,
			}
		}
	function combinationFromArray(array) {
		var result = createCombination();
		var sum = 0;
		for (var i=0; i<array.length; i++) {
			result[array[i].color] = array[i].value;
			sum += array[i].value;
		}
		result.count = sum;
		return result;
	}

	function combinationToArray(combination) {
		var result = [];
		var sum = 0;
		for (var i=0;i< colors.length;i++) {
			result.push(
				{
					color: colors[i],
					value: combination[colors[i]],
				}
			);
		}
		return result;
	}

	function crossCombinations(combination1, combination2) {
		var result = {};
		var sum = 0;
		for (var i=0;i< colors.length;i++) {
			result[colors[i]] = Math.min( combination1[colors[i]], combination2[colors[i]] );
			sum+= result[colors[i]];
		}
		result.count = sum;

		return result;
	}

	function substractCombinations(combination1, combination2) {
		var result = {};
		var sum = 0;
		for (var i=0;i< colors.length;i++) {
			result[colors[i]] = Math.max((combination1[colors[i]] - combination2[colors[i]]), 0);
			sum+= result[colors[i]];
		}
		result.count = sum;

		return result;
	}

	function getCombinationCode(combination) {
		function repeatString(str, count) {
			if (count === undefined) {
				return '';
			}
			var result = '';
			for (var i = 0;i< count;i++) {
				result += str;
			}
			return result;
		}

		var result = '';
		for (var i=0;i< colors.length;i++) {
			result += repeatString(symbols[i], combination[colors[i]]);
		}
		return result;
	}

	return {
		combinationToArray: combinationToArray,
		combinationFromArray: combinationFromArray,
		createCombination: createCombination,
		substractCombinations: substractCombinations,
		crossCombinations: crossCombinations,
		getCombinationCode: getCombinationCode,
	}
}

module.exports = combinationsHelper();