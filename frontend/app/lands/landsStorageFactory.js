(function(){
	'use strict';
	
	angular
	.module('lands')
	.factory('landsStorageFactory', landsStorageFactory);

	landsStorageFactory.$inject = ['$rootScope'];

	function landsStorageFactory($rootScope) {


		var _landsArray = {count: 0, lands: []};

		function getLandIndex(id) {
			var lands = _landsArray.lands;
			for (var i=0; i< lands.length; i++) {
				if (lands[i].id === id) {
					return i;
				}
			}
			return -1;
		}

		function getLands() {
			return _landsArray;
		}
		function addLand(land) {
			var index = getLandIndex(land.id);
			if (index === -1) {
				_landsArray.lands.push({
					id: land.id,
					value: 1
				});
			}
			else {
				_landsArray.lands[index].value++;
			}
			_landsArray.count++;
			$rootScope.$broadcast('lands-update', {});
		}
		function removeLand(land) {
			var index = getLandIndex(land.id);
			if (_landsArray.lands[index].value === 1) {
				_landsArray.lands.splice(index, 1);
			}
			else {
				_landsArray.lands[index].value--;
			}
			_landsArray.count--;
			$rootScope.$broadcast('lands-update', {});
		}

		function getLandCount(land) {
			var index = getLandIndex(land.id);
			return (index === -1)?0:_landsArray.lands[index].value;
		}

		function removeAll() {
			_landsArray.lands.splice(0, _landsArray.lands.length);
			_landsArray.count = 0;
		}

		function set(lands) {
			removeAll();
			lands.forEach(function(landId) {
				addLand({id:landId});
			});
		}

		return {
			getLands: getLands,
			addLand: addLand,
			removeLand: removeLand,
			getLandCount: getLandCount,
			removeAll: removeAll,
			set: set,
		}
	}
})();