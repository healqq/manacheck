(function(){
	'use strict';
	
	angular
	.module('lands')
	.factory('landsFactory', landsFactory);

	landsFactory.$inject = ['$resource'];

	function landsFactory($resource) {

		var lands = {};
		function Land(options) {
			this.type = options.type;
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
					function(value) {
						lands[value.id] = new Land(value);
					}
				);
				return data;
			});
		}
		function getLandById(id) {
			return lands[id];
		}
		return {
			getLands: getLands,
			getLandById: getLandById
		}
	}
})();