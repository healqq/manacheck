(function(){
	'use strict';
	
	angular
	.module('results')
	.controller('resultsController', resultsController);

	resultsController.$inject = [
		'$state',
		'landsFactory', 
	];

	function resultsController($state, landsFactory) {
		var vm = this;
		
		var rounds =  $state.params.rounds; //mockRounds();//
		var lands =  $state.params.lands; //mockLands();//
		var symbols = $state.params.symbols;//mockSymbols();
		vm.lands = prepareLands(lands);
		var plotValues = buildRoundsPlot(rounds);
		// vm.numbers = prepareNumbers(plotValues);
		buildSymbolsPlot(symbols);
		function buildSymbolsPlot(values) {
			var margin = {top: 10, right: 30, bottom: 30, left: 30},
			    width = 330 - margin.left - margin.right,
			    height = 300 - margin.top - margin.bottom;
			var valuesArray = [];
			var ticksRange = [];
			var colorsArray = Object.keys(values);
			colorsArray.forEach(function(color, index) {
				valuesArray.push(values[color]);
				ticksRange.push(width/colorsArray.length*index);
			});
			var plot = d3.select(".symbols-plot");
			var ticks = colorsArray.length;

			var formatCount = d3.format(",.f");

			

			var x = d3.scale.ordinal()
			    .domain(colorsArray)
			    .range(ticksRange);

			var xAxis = d3.svg.axis()
			    .scale(x)
			    .orient("bottom");

			var y = d3.scale.linear()
			    .domain([0, d3.max(valuesArray, function(d) { return d; })])
			    .range([height, 0]);
			var svg = plot
				.append("svg")
			    .attr("width", width + margin.left + margin.right)
			    .attr("height", height + margin.top + margin.bottom)
			  .append("g")
			    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
			var bar = svg.selectAll(".bar")
			    .data(valuesArray)
			  .enter().append("g")
			    .attr("class", "bar")
			    .attr("transform", function(d, i) { return "translate(" + (ticksRange[i] - 0.5* ticksRange[1]) + "," + (height) + ")"; })
					    
			bar.append("rect")
			    .attr("x", 1)
			    .attr("width", ticksRange[1] - 1)
			    .transition()
			    .delay(function(d, i) { return i * 50; })
			    .style("height", function(d, i) { return (height - y(valuesArray[i])) + 'px'; });

			bar.append("text")
			    .attr("dy", ".75em")
			    .attr("x", ticksRange[0] + ticksRange[1]/ 2)
			    .attr("y", 
			    	function(d, i) {
			    		var currHeight = y(valuesArray[i]);
			    		var diff = height - currHeight;
			    		return -diff + ((diff < 20)?(-20): 6) 
			    	}
			    )
			    .attr("text-anchor", "middle")
			    .text(function(d, i) { return formatCount(valuesArray[i]); })
			    .transition()
			    .style("opacity", 1);

			svg.append("g")
			    .attr("class", "x axis")
			    .attr("transform", "translate(0," + height + ")")
			    .call(xAxis);

			// console.log(colorsArray);
			// console.log(valuesArray);
		};
		function buildRoundsPlot(values) {

			// getting plot container
			var plot = d3.select(".rounds-plot");

			var min = d3.min(values);
			var max = d3.max(values);
			var ticks = max - min + 1;
			// A formatter for counts.
			var formatCount = d3.format(",.1f");

			var margin = {top: 10, right: 30, bottom: 30, left: 30},
			    width = 960 - margin.left - margin.right,
			    height = 300 - margin.top - margin.bottom;

			var x = d3.scale.linear()
			    .domain([min, max])
			    .range([0, width]);
			

			// Generate a histogram 
			var data = d3.layout.histogram()
			    .bins(x.ticks(ticks))
			    (values);
			// we need copy of initial data to compute comulative stuff
			var dataCopy = d3.layout.histogram()
			    .bins(x.ticks(ticks))
			    (values);
			// making our gist cummulative

			data.forEach(function(item, index) {
				for (var i=0; i<index;i++) {
					item.y += dataCopy[i].y;
				}
				item.y = item.y / 10;
			});
			// split last 5% to one bin
			var lastIndex = data.length - 1;
			var sum = 0;
			for (var i=0; (i<data.length); i++ ){
				if (data[i].y > 95) {
					lastIndex = i;
					break;
				}
			}
			data.splice(lastIndex+1, data.length - lastIndex);
			data[lastIndex].y = 100;
			max = data[lastIndex].x;
			ticks = max - min + 1;

			// recount x
			var x = d3.scale.linear()
			    .domain([min, max])
			    .range([0, width]);

			var y = d3.scale.linear()
			    .domain([0, 100])
			    .range([height, 0]);

			var xAxis = d3.svg.axis()
			    .scale(x)
			    .orient("bottom")
			    .ticks(ticks)
			    .tickFormat(function(d, i) {
			    	return (i !== data.length-1)?d:d-1+'+';
			    });

			var svg = plot
				.append("svg")
			    .attr("width", width + margin.left + margin.right)
			    .attr("height", height + margin.top + margin.bottom)
			  .append("g")
			    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			var bar = svg.selectAll(".bar")
			    .data(data)
			  .enter().append("g")
			    .attr("class", "bar")
			    .attr("transform", function(d) { return "translate(" + (x(d.x) - x(min+1) * 0.5) + "," + (height) + ")"; })
			    
			    
			bar.append("rect")
			    .attr("x", 1)
			    .attr("width", x(min + 1) - 1)
			    .transition()
			    .delay(function(d, i) { return i * 50; })
			    .style("height", 
			    	function(d, index) {return (height - y(d.y)) + 'px'; });
			
			

			bar.append("text")
			    .attr("dy", ".75em")
			    .attr("x", x(min) + x(min + 1)/ 2)
			    .attr("y", 
			    	function(d) {
			    		var currHeight = y(d.y);
			    		var diff = height - currHeight;
			    		return -diff + ((diff < 20)?(-20): 6) 
			    	}
			    )
			    .attr("text-anchor", "middle")
			    .text(function(d) { return formatCount(d.y); })
			    .transition()
			    .style("opacity", 1);
			    

			svg.append("g")
			    .attr("class", "x axis")
			    .attr("transform", "translate(0," + height + ")")
			    .call(xAxis);

			return  data;
			
		}

		function prepareNumbers(plotData) {
			var numbers = {};
			var percentSum = 0;
			var i=0;
			while (percentSum < 900) {
				percentSum+= plotData[i].y;
				i++;
			}

			numbers.round = plotData[i].x;
			return numbers;
		}
		function prepareLands(values) {

			var landsArray = [];
			Object.keys(values).forEach(
				function(key) {
					landsArray.push({combination: getLands(key), value: values[key]});
				});
			return landsArray.sort(sortFunc).slice(0,5);

			function getLands(combination) {
				var landIds = combination.split('|');
				var lands = [];
				return landIds.reduce(
					function(result, currentId) {

						if (currentId === '') {
							return result;
						}
						var id = parseInt(currentId);
						if ((result.length === 0) || (result[result.length-1].landId !== id)) {
							result.push({landId: id, value: 1});
						}
						else {
							result[result.length-1].value++;
						}
					
						return result;
					}, 
					[]
				);
			}
			function sortFunc(combination1, combination2) {
				return combination2.value - combination1.value;
			}
		}

		function mockSymbols() {
			return {"red":8,"black":0,"green":11,"blue":0,"white":7,"grey":0};
		}
		function mockRounds() {
			return [
					9,
					3,
					7,
					7,
					3,
					13,
					7,
					6,
					21,
					8,
					5,
					9,
					16,
					3,
					3,
					3,
					11,
					4,
					10,
					9,
					4,
					3,
					6,
					3,
					9,
					13,
					3,
					4,
					3,
					4,
					3,
					3,
					3,
					3,
					19,
					3,
					11,
					9,
					14,
					9,
					3,
					3,
					3,
					3,
					9,
					7,
					3,
					3,
					18,
					4,
					17,
					12,
					4,
					4,
					5,
					19,
					24,
					7,
					10,
					6,
					3,
					12,
					5,
					4,
					3,
					4,
					5,
					18,
					3,
					3,
					6,
					12,
					17,
					14,
					3,
					3,
					7,
					12,
					3,
					5,
					3,
					10,
					17,
					8,
					6,
					3,
					7,
					7,
					3,
					17,
					15,
					3,
					12,
					12,
					6,
					4,
					6,
					3,
					22,
					3,
					14,
					3,
					8,
					3,
					18,
					3,
					19,
					8,
					5,
					6,
					3,
					3,
					8,
					3,
					7,
					3,
					14,
					13,
					27,
					3,
					3,
					11,
					5,
					3,
					8,
					10,
					15,
					5,
					6,
					10,
					3,
					3,
					3,
					3,
					6,
					13,
					8,
					20,
					3,
					3,
					5,
					5,
					3,
					3,
					11,
					5,
					11,
					4,
					5,
					3,
					16,
					13,
					3,
					17,
					7,
					3,
					3,
					5,
					3,
					3,
					16,
					17,
					3,
					3,
					3,
					6,
					7,
					3,
					3,
					13,
					8,
					6,
					3,
					9,
					18,
					6,
					3,
					20,
					10,
					3,
					11,
					7,
					11,
					12,
					10,
					10,
					6,
					6,
					5,
					3,
					4,
					3,
					3,
					3,
					3,
					6,
					27,
					3,
					22,
					5,
					3,
					19,
					3,
					12,
					3,
					11,
					4,
					21,
					11,
					3,
					3,
					3,
					4,
					19,
					18,
					9,
					5,
					5,
					10,
					3,
					5,
					3,
					3,
					6,
					3,
					12,
					4,
					3,
					9,
					3,
					7,
					9,
					8,
					3,
					5,
					5,
					6,
					19,
					3,
					3,
					15,
					3,
					3,
					3,
					14,
					8,
					4,
					7,
					3,
					5,
					9,
					3,
					4,
					11,
					3,
					7,
					4,
					3,
					6,
					3,
					3,
					5,
					5,
					3,
					7,
					3,
					13,
					4,
					5,
					11,
					8,
					7,
					3,
					13,
					3,
					9,
					6,
					10,
					8,
					6,
					3,
					3,
					16,
					11,
					3,
					3,
					21,
					6,
					21,
					3,
					22,
					23,
					3,
					10,
					3,
					3,
					7,
					3,
					6,
					4,
					3,
					13,
					18,
					7,
					11,
					3,
					6,
					8,
					4,
					5,
					11,
					3,
					13,
					3,
					6,
					9,
					16,
					5,
					3,
					4,
					3,
					11,
					13,
					8,
					3,
					13,
					8,
					7,
					5,
					9,
					3,
					3,
					8,
					3,
					9,
					7,
					4,
					5,
					3,
					3,
					4,
					5,
					6,
					19,
					3,
					3,
					5,
					7,
					10,
					4,
					3,
					9,
					3,
					9,
					3,
					3,
					7,
					18,
					6,
					6,
					5,
					13,
					3,
					3,
					3,
					4,
					11,
					3,
					4,
					3,
					3,
					3,
					11,
					3,
					3,
					13,
					5,
					8,
					8,
					3,
					9,
					20,
					8,
					3,
					24,
					3,
					15,
					3,
					3,
					11,
					13,
					11,
					8,
					10,
					3,
					5,
					5,
					4,
					8,
					3,
					12,
					3,
					3,
					3,
					10,
					5,
					3,
					6,
					11,
					5,
					14,
					15,
					3,
					3,
					8,
					18,
					5,
					4,
					3,
					5,
					3,
					8,
					5,
					10,
					11,
					17,
					7,
					14,
					15,
					3,
					4,
					6,
					6,
					13,
					3,
					3,
					3,
					13,
					3,
					10,
					12,
					10,
					4,
					6,
					8,
					3,
					5,
					9,
					8,
					11,
					3,
					7,
					6,
					3,
					12,
					8,
					3,
					7,
					22,
					8,
					9,
					3,
					19,
					6,
					4,
					3,
					5,
					4,
					8,
					3,
					7,
					3,
					3,
					17,
					8,
					18,
					20,
					3,
					3,
					17,
					4,
					14,
					4,
					3,
					5,
					3,
					3,
					10,
					3,
					8,
					13,
					12,
					11,
					17,
					3,
					16,
					3,
					22,
					17,
					12,
					3,
					3,
					12,
					11,
					10,
					8,
					14,
					3,
					8,
					3,
					11,
					3,
					9,
					3,
					16,
					7,
					12,
					4,
					10,
					3,
					3,
					12,
					5,
					8,
					3,
					6,
					10,
					3,
					3,
					3,
					13,
					3,
					3,
					5,
					9,
					3,
					5,
					16,
					3,
					5,
					3,
					9,
					3,
					3,
					5,
					3,
					14,
					9,
					12,
					29,
					13,
					13,
					3,
					20,
					5,
					5,
					6,
					3,
					14,
					3,
					17,
					12,
					3,
					16,
					3,
					4,
					13,
					8,
					16,
					5,
					6,
					5,
					3,
					3,
					3,
					15,
					10,
					19,
					4,
					3,
					3,
					16,
					29,
					3,
					22,
					3,
					14,
					7,
					9,
					11,
					3,
					4,
					3,
					3,
					3,
					8,
					6,
					4,
					5,
					3,
					16,
					6,
					3,
					9,
					13,
					3,
					3,
					15,
					16,
					7,
					8,
					3,
					18,
					3,
					3,
					23,
					9,
					14,
					3,
					3,
					16,
					3,
					11,
					4,
					3,
					4,
					5,
					5,
					10,
					3,
					15,
					12,
					6,
					3,
					9,
					22,
					3,
					3,
					6,
					3,
					16,
					4,
					4,
					21,
					3,
					7,
					3,
					3,
					23,
					3,
					18,
					3,
					8,
					8,
					6,
					3,
					6,
					19,
					12,
					7,
					6,
					5,
					11,
					6,
					10,
					11,
					3,
					10,
					5,
					3,
					29,
					7,
					12,
					3,
					7,
					6,
					6,
					4,
					3,
					5,
					11,
					6,
					5,
					10,
					7,
					6,
					3,
					6,
					18,
					3,
					3,
					18,
					5,
					7,
					10,
					11,
					3,
					3,
					18,
					6,
					3,
					18,
					13,
					11,
					3,
					3,
					3,
					3,
					3,
					3,
					4,
					10,
					10,
					3,
					7,
					3,
					3,
					6,
					16,
					4,
					4,
					19,
					16,
					16,
					3,
					3,
					3,
					18,
					15,
					3,
					4,
					3,
					8,
					14,
					17,
					5,
					3,
					11,
					6,
					3,
					3,
					3,
					11,
					5,
					3,
					4,
					8,
					3,
					7,
					12,
					4,
					4,
					3,
					3,
					3,
					10,
					3,
					16,
					16,
					19,
					3,
					12,
					3,
					3,
					3,
					25,
					3,
					3,
					16,
					3,
					3,
					9,
					4,
					10,
					13,
					8,
					3,
					4,
					9,
					3,
					4,
					3,
					8,
					10,
					5,
					4,
					12,
					5,
					3,
					11,
					12,
					3,
					3,
					6,
					16,
					12,
					14,
					9,
					9,
					3,
					14,
					9,
					23,
					3,
					9,
					11,
					8,
					9,
					7,
					6,
					3,
					3,
					17,
					11,
					3,
					13,
					3,
					5,
					28,
					6,
					5,
					6,
					7,
					16,
					8,
					10,
					3,
					3,
					7,
					9,
					6,
					14,
					19,
					3,
					4,
					12,
					3,
					11,
					5,
					6,
					14,
					5,
					4,
					6,
					3,
					21,
					9,
					22,
					9,
					7,
					13,
					3,
					3,
					3,
					21,
					3,
					7,
					27,
					13,
					5,
					3,
					17,
					7,
					8,
					3,
					5,
					4,
					5,
					3,
					3,
					3,
					7,
					22,
					4,
					12,
					3,
					5,
					10,
					3,
					3,
					5,
					3,
					6,
					4,
					5,
					16,
					3,
					3,
					3,
					4,
					11,
					4,
					4,
					10,
					15,
					9,
					3,
					3,
					6,
					5,
					8,
					11,
					3,
					9,
					3,
					3,
					3,
					7,
					6,
					4,
					24,
					3,
					12,
					4,
					3,
					21,
					9,
					3,
					12,
					18,
					3,
					17,
					3,
					3,
					11,
					9,
					3,
					17,
					3,
					14,
					10,
					8,
					21,
					4,
					4,
					10,
					4,
					3,
					3,
					17,
					6,
					3,
					14,
					16,
					8,
					9,
					3,
					12,
					11,
					9,
					10,
					3,
					3,
					7,
					12,
					3,
					6,
					5,
					6,
					4,
					3,
					3,
					9,
					6,
					4,
					13,
					8,
					3,
					25,
					12,
					3,
					3,
					5,
					3,
					7,
					10,
					3,
					7,
					5,
					3,
					9,
					8,
					11,
					7,
					3,
					11,
					14,
					9,
					3,
					3,
					13,
					9,
					12,
					23,
					3,
					5,
					4,
					14,
					4,
					6
					];
		}

		function mockLands() {
			return  {
				'3|2|1|': 56,
				'3|2|2|': 13,
				'54|2|1|': 100,
				'54|2|2|': 38,
				'55|3|1|': 61,
				'55|3|2|': 50,
				'55|54|1|': 90,
				'55|54|2|': 72,
				'58|3|2|': 97,
				'58|54|': 1,
				'58|54|2|': 148,
				'58|55|3|': 117,
				'58|55|54|54|': 157,
			}
		}

	}
})();