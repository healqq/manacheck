/**
*  @ngdoc overview
*  @name app.core module
*  @description all dependencies are injected in this module
*/
(function(){
	'use strict';
	angular
	.module('app')
	.config(html5ModeSettings); 
	
	html5ModeSettings.$inject = ['$locationProvider'];
    function html5ModeSettings($locationProvider) {
    	$locationProvider.html5Mode(true);
    }
})();