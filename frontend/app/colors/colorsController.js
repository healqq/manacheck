(function(){
	'use strict';
	
	angular
	.module('colors')
	.controller('colorsController', colorsController);

	colorsController.$inject = ['colorsStorageFactory'];

	function colorsController(colorsStorageFactory) {

		var vm = this;
	}
})();