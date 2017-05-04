(function () {
    'use strict';

    angular
        .module('lands')
        .directive('landItem', landItem);

    function landItem() {
        return {
            restrict: 'E',
            controller: landItemController,
            controllerAs: 'liCtrl',
            scope: {
                id: '=landId',
                count: '=landCount',
            },
            templateUrl: 'lands/land-item.html'
        };
    }

    landItemController.$inject = ['$scope', 'landsFactory'];

    function landItemController($scope, landsFactory) {
        /*jshint validthis:true */
        var vm = this;
        vm.land = landsFactory.getLandById($scope.id);

    }
})();
