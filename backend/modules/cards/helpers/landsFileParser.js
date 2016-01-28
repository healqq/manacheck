var fs = require('fs');
var parse = require('csv-parse');

function landsFileParser() {
	var self = this;
	function parseFile() {
		function Land(data, id) {
			var colorKeys = ['R', 'W', 'G', 'B', 'C', 'U'];
			var colors = ['red', 'white', 'green', 'black', 'colorless', 'blue'];
			function getColorsArray(colorStr) {
				//split str into letters
				var result = [];
				var keysArray = colorStr.split("");
				keysArray.forEach(function(colorKey) {
					var index = colorKeys.indexOf(colorKey);
					result.push(colors[index]);
				})

				return result;
			}
			// 0 - name,
			// 1 - group
			// 2 - ETB
			// 3 - type (not needed)
			// 4 - colors
			// 5 - actual group (tolover, trim after first space)
			// 6 - rus name
			// 7 - eng name copy
			// 8 - url
			// 9 - spells type
			// 10 - typeColors
			this.title = data[0];
			this.type = data[5];
			this.tapped = (data[2] === 'T')? true: false;
			this.colors = getColorsArray(data[4]);
			this.title_rus = data[6];
			this.url = data[8];
			this.spellsType = data[9];
			this.specialColors = getColorsArray(data[10]);
			this.id = id;
		}
		var parser = parse({delimiter: ','}, 
			function(err, data){
				var lands = [];

				data.forEach( function (value, index) {
					if (index === 0) {
						return;
					}
					lands.push(new Land(value, index));
				});

				fs.writeFile(__dirname+"/../data/lands.json", JSON.stringify(lands), "utf8", function() {
					console.log('done');
				} );
			}
		);
		fs.createReadStream(__dirname+'/../data/lands.csv').pipe(parser);
	}
	return {
		parseFile: parseFile,
	}

}

module.exports = landsFileParser;