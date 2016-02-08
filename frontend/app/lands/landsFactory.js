(function(){
	'use strict';
	
	angular
	.module('lands')
	.factory('landsFactory', landsFactory);

	landsFactory.$inject = ['$resource'];

	function landsFactory($resource) {

		var landsHash = {};
		function Land(options) {
			var type = options.type;
			
			this.type = type;
			this.id = options.id;
			this.colors = options.colors;
			this.title = options.title;
			this.url = options.url;
		}
		var landsResource = $resource('api/lands');
		function getLands() {
			return (new landsResource()).$get()
			.then(function(data) {
				angular.forEach(data.lands, 
					function(land) {
						var type = land.type;
						if (type === 'basicfetch') {
							type = 'fetch';
						}
						if (type === 'type') {
							type = 'tribal';
						}
						if (type === 'lastround') {
							type = 'other';
						}
						land.type = type;
					});
				return data.lands;
			})
			.then(function(lands) {
				angular.forEach(lands, 
					function(value) {
						landsHash[value.id] = new Land(value);
					}
				);
				return lands;
			});
		}
		function getLandById(id) {
			return landsHash[id];
		}
		return {
			getLands: getLands,
			getLandById: getLandById
		}
	}
})();