(function(){
	'use strict';
	
	angular
	.module('common')
	.directive('mcImage', imageDirective);

	function imageDirective() {
		return {
			restrict: 'A',
			scope: {
				url: '=mcImage',
			},
			link: {
				post: linkFunction
			},
		}
	}

	function linkFunction($scope, element, attrs, ctrls) {

		loadImage($scope.url);
		function loadImage(link) {
			var img = angular.element('<img/>')[0];
			img.src = link;
			angular.element(img).on('load', function() {
				angular.element(element).css('background-image', 'url(' + link + ')');
			})
		}
		
	}
	
})();