(function () {
    'use strict';

    angular
        .module('colors')
        .factory('colorsSymbolsHelper', colorsSymbolsHelper);

    colorsSymbolsHelper.$inject = [];

    function colorsSymbolsHelper() {
        var SVG_URL = 'images/symbols.svg#';
        var colors = [{
                key: 'red',
                color: "#F9A88F"
            },
            {
                key: 'green',
                color: "#9AD1AF"
            },
            {
                key: 'blue',
                color: "#A7DFF9"
            },
            {
                key: 'white',
                color: "#FFFBD8"
            },
            {
                key: 'black',
                color: "#7A6F6E"
            },
            {
                key: 'colorless',
                color: "#CCC2C0"
            },
        ];

        function getByKey(key) {
            return colors.filter(function (color) {
                return key === color.key;
            })[0];
        }

        function getSymbolColor(key) {
            return getByKey(key).color;
        }

        function getSymbolUrl(key) {
            return SVG_URL + key;
        }
        return {
            getColorSymbols: function () {
                return colors;
            },
            getSymbolColor: getSymbolColor,
            getSymbolUrl: getSymbolUrl,
        };

    }
})();
