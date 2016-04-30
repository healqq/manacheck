(function(){
	'use strict';
	
	angular
	.module('colors')
	.factory('colorsSymbolsHelper', colorsSymbolsHelper);

	colorsSymbolsHelper.$inject = [];

	function colorsSymbolsHelper() {

		var colors = [
			{key:'red', color: "#F9A88F", url: '../images/symbols/png/red.png'},
			{key:'green', color: "#9AD1AF", url: '../images/symbols/png/green.png'},
			{key:'blue', color: "#A7DFF9", url: '../images/symbols/png/blue.png'},
			{key:'white', color: "#FFFBD8", url: '../images/symbols/png/white.png'},
			{key:'black', color: "#7A6F6E", url: '../images/symbols/png/black.png'},
			{key:'colorless', color: "#CCC2C0", url: '../images/symbols/png/colorless.png'},
		];
		
		function getByKey(key) {
			return colors.filter(function(color) {
				return key === color.key;
			})[0];
		}
		function getSymbolColor(key) {
			return getByKey(key).color;
		}
		function getSymbolUrl(key) {
			return getByKey(key).url;
		}
		return {
			getColorSymbols: function() {
				return colors;
			},
			getSymbolColor: getSymbolColor,
			getSymbolUrl: getSymbolUrl,
		}

	}
})();