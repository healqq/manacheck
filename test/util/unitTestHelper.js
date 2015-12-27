var expect = require("chai").expect;
var path = require('path');

function unitTestHelper() {

	function compareObjects(expected, actual) {
		
		var expectedKeys = Object.keys(expected);
		expectedKeys.forEach(
			function(key) {
				expect(expected[key]).equal(actual[key]);
			}
		);
	}

	function setGlobalVars() {
        global.appRoot = path.resolve(__dirname);
        global.cardsModule = appRoot + '/../../modules/cards';
	}
	return {
		compareObjects: compareObjects,
		setGlobalVars: setGlobalVars,
	}
}

module.exports = unitTestHelper();