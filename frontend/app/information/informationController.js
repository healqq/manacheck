(function () {
    'use strict';

    angular
        .module('information')
        .controller('informationController', informationController);

    informationController.$inject = [
        '$scope',
        '$document',
        '$state',
        'landsStorageFactory',
        'colorsStorageFactory',
        'calculationFactory'
    ];

    function informationController(
        $scope,
        $document,
        $state,
        landsStorageFactory,
        colorsStorageFactory,
        calculationFactory) {
        /*jshint validthis:true */
        var vm = this;

        vm.canCompute = canCompute;
        vm.isComputing = false;
        vm.spellTypes = [{
                title: 'no specific type',
                value: undefined
            },
            {
                title: 'allies',
                value: 'allies'
            },
            {
                title: 'devoid',
                value: 'devoid',
            },
        ];
        vm.cardsCountTypes = [{
                title: '60',
                value: 60
            },
            {
                title: '40',
                value: 40
            },
        ];
        vm.cardsCount = vm.cardsCountTypes[0];
        vm.spellsType = vm.spellTypes[0];

        vm.submitData = submitData;

        function canCompute() {
            return !((landsStorageFactory.getLands().count > 14) &&
                colorsStorageFactory.getColors().count);
        }

        function submitData() {
            var params = {
                lands: landsStorageFactory.getLands(),
                colors: colorsStorageFactory.getColors().colors.map(function (colorItem) {
                    return {
                        color: colorItem.color,
                        value: colorItem.value,
                    };
                }),
                spellsType: vm.spellsType.value,
                cardsCount: vm.cardsCount.value,
            };
            vm.isComputing = true;
            calculationFactory.calculate(params)
                .then(
                    function (data) {

                        $state.go('^.Results', {
                            isDataReady: true,
                            resultData: {
                                rounds: data.rounds,
                                landCombinations: data.hashes,
                                mulligans: data.mulligans,
                                hands: data.hands,
                                symbols: data.deckSymbols,
                                failsCount: data.failsCount,
                            },
                            id: data.id,
                        });
                        vm.isComputing = false;
                        return data;
                    },
                    function (error) {
                        vm.isComputing = false;
                        $state.go('^.Errors', {
                            data: error.data,
                            type: "invalid"
                        });
                    }
                );

        }
    }
})();
