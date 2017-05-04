(function () {
    'use strict';

    angular
        .module('colors')
        .directive('colorsHelper', colorsHelper);

    function colorsHelper() {

        colorsHelperController.$inject = ['$timeout', 'colorsStorageFactory'];

        function colorsHelperController($timeout, colorsStorageFactory) {
            /*jshint validthis:true */
            var vm = this;
            //we need to wrap our setter in timeout to have cure animations 
            $timeout(function () {
                vm.colors = colorsStorageFactory.getColors();
            }, 0);

            vm.addColor = addColor;
            vm.range = range;
            vm.clearColors = clearColors;

            function range(value) {
                return new Array(value);
            }

            function addColor(color, value) {
                colorsStorageFactory.addColor(color, value);
            }

            function clearColors() {
                colorsStorageFactory.removeAll();
            }
        }
        return {
            restrict: 'A',
            controller: colorsHelperController,
            controllerAs: 'chCtrl'
        };
    }


})();
