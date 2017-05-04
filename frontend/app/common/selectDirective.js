(function () {
    'use strict';

    angular
        .module('common')
        .directive('mcSelect', selectDirective);

    function selectDirective() {
        return {
            restrict: 'E',
            controller: selectController,
            controllerAs: 'selectCtrl',
            bindToController: true,
            scope: {
                values: '=values',
                label: '=label',
                ngModel: '=',
            },
            require: ['ngModel'],
            templateUrl: 'common/select.html'
        };
    }

    selectController.$inject = ['$scope', '$document'];

    function selectController($scope, $document) {
        /*jshint validthis:true */
        var vm = this;

        vm.dropdownIsActive = false;
        vm.setValue = setValue;
        vm.isSelectedValue = isSelectedValue;
        vm.showDropdown = showDropdown;

        function onDocumentClick(evt) {
            if (!angular.element(evt.target).hasClass('option')) {
                $scope.$apply(hideDropdown());
            }
        }

        function showDropdown(event) {
            event.stopPropagation();
            vm.dropdownIsActive = true;
            angular.element($document).on('click', onDocumentClick);
        }

        function hideDropdown() {
            angular.element($document).off('click', onDocumentClick);
            vm.dropdownIsActive = false;
        }

        function setValue(value) {
            vm.ngModel = value;
            hideDropdown();
        }

        function isSelectedValue(value) {
            return (vm.ngModel === value);
        }

    }
})();
