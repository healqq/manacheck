(function () {
    'use strict';

    angular
        .module('colors')
        .directive('colorIcon', colorIcon);

    function colorIcon() {

        colorIconController.$inject = [];

        function colorIconController() {
            /*jshint validthis:true */
            this.url = 'images/symbols.svg#' + this.color;
        }
        return {
            restrict: 'E',
            controller: colorIconController,
            controllerAs: '$ctrl',
            bindToController: true,
            scope: {
                'color': '@',
            },
            templateUrl: 'colors/color-icon.html',
        };
    }
})();
