(function () {
    'use strict';

    angular
        .module('app')
        .controller('bodyController', bodyController);

    bodyController.$inject = ['$window', '$scope', '$timeout'];

    function bodyController($window, $scope, $timeout) {
        var NO_SCROLL_CSS = {
            overflow: 'hidden',
            position: 'fixed',
        };
        /*jshint validthis:true */
        var vm = this;
        vm.scrollValue = 0;
        vm.isMobile = $window.matchMedia("(max-width: 1023px)").matches;
        vm.isMenuOpen = !vm.isMobile;
        
        vm.toggleMenu = function() {
            if (!vm.isMobile) {
                return;
            }
            vm.isMenuOpen = !vm.isMenuOpen;
            vm.bodyStyle = vm.isMenuOpen ? NO_SCROLL_CSS : {};
            if (vm.isMenuOpen) {
                vm.scrollValue = $window.document.scrollingElement.scrollTop;
            } else {
                $timeout(function() {
                    $window.scrollTo(0, vm.scrollValue);
                });
            }
        }

        angular.element($window).on('resize', function() {
            $scope.$apply(function() {
                vm.isMobile = $window.matchMedia("(max-width: 1023px)").matches;
                vm.isMenuOpen = !vm.isMobile || vm.isMenuOpen;
            });
            
        });
    }
})();
