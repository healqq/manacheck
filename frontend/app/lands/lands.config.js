(function(){
	'use strict';
	
	angular
	.module('lands')
	.run(landsFactoryInit);

	landsFactoryInit.$inject = ['landsFactory'];
    function landsFactoryInit(landsFactory) {
    	// console.log(landsFactory.getLands());
    }
})();