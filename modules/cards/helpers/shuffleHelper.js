function shuffle(array) {
	var values = array;
	var length = values.length;
	var result = [];  
	
	for (var i = 0; i < length; i++) {
		var randomIndex = randomInt(0, values.length);
		// console.log(randomIndex + ' of ' + values.length + ' pers: ' + randomIndex/values.length);
		result.push(values.splice(randomIndex,1)[0]);
	}
	
	return result;
	
	function randomTest() {
		var test = [0,0,0,0,0];
		for (var i=0; i < 10000; i++) {
			var randomNumber = randomInt(0, 5);
			test[randomNumber]++;		
		}
		console.log(test);
	}
	function randomInt (low, high) {
    	return Math.floor(Math.random() * (high - low) + low);
	}
}

module.exports = shuffle;