(function () {
    'use strict';

    angular
        .module('common')
        .directive('mcImage', imageDirective);

    imageDirective.$inject = ['$window', '$document'];
    function imageDirective($window, $document) {
        var DISPLAY_NONE = 'none';
        function linkFunction($scope, element) {
            if (isVisible()) {
                loadImage($scope.url);
            } 

            function isVisible() {
                return $window.getComputedStyle(element[0]).display !== DISPLAY_NONE;
            }

            function loadImage(link) {
                var img = angular.element('<img/>')[0];
                img.src = link;
                angular.element(img).on('load', function () {
                    var $element = angular.element(element);
                    $element
                        .css('background-image', 'url(' + link + ')')
                        .css('opacity', 1);
                });
                img = null;
            }

        }
        return {
            restrict: 'A',
            scope: {
                url: '=mcImage',
            },
            link: {
                post: linkFunction
            },
        };
    }
    

})();
