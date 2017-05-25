/**
 *  @ngdoc overview
 *  @name app.core module
 *  @description all dependencies are injected in this module
 */
(function () {
    'use strict';
    angular
        .module('app')
        .config(html5ModeSettings)
        .run(gaConfig);

    html5ModeSettings.$inject = ['$locationProvider'];

    function html5ModeSettings($locationProvider) {
        $locationProvider.html5Mode(true);
    }

    gaConfig.$inject = ['$window', '$rootScope'];
    function gaConfig($window, $rootScope) {
        $rootScope.$on('$stateChangeSuccess', onSuccess);
        function onSuccess() {
            if ($window.ga) {
                $window.ga('send', 'pageview');
            }
        }
    }
})();
