(function(){
	'use strict';
	
	angular
	.module('results')
	.factory('colorsRangeFactory', colorsRangeFactory);

	colorsRangeFactory.$inject = [];

	function colorsRangeFactory() {

		function colorsRange(colorMin, colorMax, scale) {
			var self = this;
			colorMin = colorMin || {};
			colorMax = colorMax || {};
			scale = scale || {};
			self.scale = {};
			self.colorMin = {};
			self.colorMax = {};
			// setting initial data
			self.keys.forEach(function(key, index) {
				if (Array.isArray(colorMin)) {
					self.colorMin[key] = colorMin[index] || 0;
				}
				else {
					self.colorMin[key] = colorMin[key] || 0;
				}
				if (Array.isArray(colorMax)) {
					self.colorMax[key] = colorMax[index] || 0;
				}
				else {
					self.colorMax[key] = colorMax[key] || 255;
				}
				
			});
			// scale
			self.scale.min = scale.min || 0;
			self.scale.max = scale.max || 1;

		}

		colorsRange.prototype = {
			keys: ['r', 'g', 'b'],
			getColorObject: getColorObject,
			getColorString: getColorString,
		}

		function getScaleCoeff (value, min, max) {
			// value = (value>max)?max: value;
			// value = (value<min)?min: value;
			return value/(max-min);
		}
		function scaledValue(value, min, max) {
			return  min + Math.floor((max-min) * value);
 		}
		function getColorObject(value) {
			var self = this;
			// check if value in range
			var result = {};
			var coefficient = getScaleCoeff(value, self.scale.min, self.scale.max);
			 self.keys.forEach(function(key) {
			 	result[key] = scaledValue(
			 		coefficient, 
			 		self.colorMin[key], 
			 		self.colorMax[key]
			 	);
			 });

			 return result;
		}
 		function getColorString(value) {
 			var self = this;
			var result = self.getColorObject(value);
			var colorString = 'rgb(';
			self.keys.forEach(function(key, index) {
				colorString += (result[key] + ((index === 2)?'':','));
			});
			colorString += ')';
			return colorString;
    	}
		
		return colorsRange;

	}
})();