/**
*  @ngdoc overview
*  @name app.core module
*  @description all dependencies are injected in this module
*/
(function(){
	'use strict';
	angular
	.module('app')
	.config(stateConfig); 
	
	stateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function stateConfig($stateProvider, $urlRouterProvider) {
    	$urlRouterProvider.otherwise("/");
    	$stateProvider
		    .state('Base', {
			    url: "/",
			    views: {
			    	side: {
			    		templateUrl: "information/information.html",
			    		controllerAs: 'infoCtrl',
			    		controller: 'informationController'
			    	},
			    	main: {
			    		templateUrl: "core/core.html",
			    	}
			    }
			    
		    })
		    .state('Base.Lands', {
		    	url: "land",
		    	views: {
		    		container: {
		    			templateUrl: "lands/lands.html",
			    		controllerAs: 'landsCtrl',
			    		controller: 'landsController'
		    		}
		    	}
		    })
		    .state('Base.Colors', {
		    	url: "color",
		    	views: {
		    		container: {
		    			templateUrl: "colors/colors.html",
			    		controllerAs: 'colorsCtrl',
			    		controller: 'colorsController'
		    		}
		    	}
		    })
		    .state('Base.Results', {
		    	url: "result",
		    	params: {
		    		rounds: [],
		    		lands: {},
		    		symbols: {},
		    	},
		    	views: {
		    		container: {
		    			templateUrl: "results/results.html",
			    		controllerAs: 'resultsCtrl',
			    		controller: 'resultsController'
		    		}
		    	}
		    })
		    .state('Base.Errors', {
		    	url: "error",
		    	params: {
		    		rounds: [],
		    		lands: {},
		    	},
		    	views: {
		    		container: {
		    			templateUrl: "errors/errors.html",
			    		controllerAs: 'errorsCtrl',
			    		controller: 'errorsController'
		    		}
		    	}
		    });

	    
    	
    }
})();