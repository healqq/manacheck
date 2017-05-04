(function () {
    'use strict';

    angular
        .module('information')
        .factory('calculationFactory', calculationFactory);

    calculationFactory.$inject = ['$resource'];

    function calculationFactory($resource) {

        var serviceResource = $resource('api/cards', {}, {
            calculate: {
                method: 'POST',
                url: 'api/cards/play',
            }
        });

        function calculate(params) {
            return (new serviceResource(params)).$calculate();
        }

        return {
            calculate: calculate,
        };
    }

})();
