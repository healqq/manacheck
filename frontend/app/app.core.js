/**
*  @ngdoc overview
*  @name app.core module
*  @description all dependencies are injected in this module
*/
(function(){
	'use strict';
	angular
	.module('app.core', 
		[
			/*angular*/
			'ngResource',
			'ngAnimate',
			'ngSanitize',
			/*ui-router*/
			'ui.router'
		]
	);
})();