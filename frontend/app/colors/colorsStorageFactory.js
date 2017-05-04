(function () {
    'use strict';

    angular
        .module('colors')
        .factory('colorsStorageFactory', colorsStorageFactory);

    colorsStorageFactory.$inject = [];

    function colorsStorageFactory() {

        var colors = [{
                color: 'red',
                value: 0
            },
            {
                color: 'green',
                value: 0
            },
            {
                color: 'blue',
                value: 0
            },
            {
                color: 'white',
                value: 0
            },
            {
                color: 'black',
                value: 0
            },
            {
                color: 'colorless',
                value: 0
            },
            {
                color: 'generic',
                value: 0
            },
        ];
        var colorsArray = {
            count: 0,
            colors: colors
        };

        var colorsList = ['red', 'green', 'blue', 'white', 'black', 'colorless', 'generic'];

        function addColor(color, value) {
            function getColorIndex(color) {
                return colorsList.indexOf(color);
            }
            colorsArray.colors[getColorIndex(color)].value += value;
            colorsArray.count += value;
        }

        function getColors() {
            return colorsArray;
        }

        function removeAll() {
            colorsArray.colors.forEach(function (color) {
                color.value = 0;
            });
            colorsArray.count = 0;
        }

        function set(colors) {
            removeAll();
            colors.forEach(function (colorItem) {
                addColor(colorItem.color, colorItem.value);
            });
        }
        return {
            getColors: getColors,
            addColor: addColor,
            removeAll: removeAll,
            set: set,
        };

    }
})();
