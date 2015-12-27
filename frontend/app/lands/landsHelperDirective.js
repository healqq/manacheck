(function(){
	'use strict';
	
	angular
	.module('lands')
	.directive('landsHelper', landsHelper);

	function landsHelper() {

		helper.$inject =['landsStorageFactory'];
		function helper(landsStorageFactory) {
			

			var vm = this;
			vm._lands = landsStorageFactory.getLands();
			vm.addLand = addLand;
			vm.canAddLand = canAddLand;
			vm.removeLand = removeLand;
			vm.canRemoveLand = canRemoveLand;
			vm.getLandCount = getLandCount;

			function addLand(land) {
				landsStorageFactory.addLand(land);
			}
			function removeLand(land) {
				landsStorageFactory.removeLand(land);
			}

			function canAddLand(land) {
				return (land.type === 'basic') || (getLandCount(land) < 4);
			}

			function canRemoveLand(land) {
				return  (getLandCount(land) > 0);
			}
			function getLandCount(land) {
				return landsStorageFactory.getLandCount(land);
			}
			
		}

		return {
			restrict: 'A',
			controller: helper,
			controllerAs: 'llCtrl'
		};
	}
})();