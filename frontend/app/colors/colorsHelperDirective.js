(function(){
	'use strict';
	
	angular
	.module('colors')
	.directive('colorsHelper', colorsHelper);

	function colorsHelper() {

		colorsHelperController.$inject = ['colorsStorageFactory'];
		function colorsHelperController(colorsStorageFactory) {
			var vm = this;

			vm.colors = colorsStorageFactory.getColors();
			vm.addColor = addColor;
			vm.range = range;

			function range(value) {
				return new Array(value);
			}
			function addColor(color, value) {
				colorsStorageFactory.addColor(color, value);
			}
		}
		return {
			restrict: 'A',
			controller: colorsHelperController,
			controllerAs: 'chCtrl'
		}
	}

	
})();