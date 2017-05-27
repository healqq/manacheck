/**
 *  @ngdoc overview
 *  @name app.core module
 *  @description all dependencies are injected in this module
 */
(function () {
    'use strict';
    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function stateConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('Base', {
                url: "/",
                views: {
                    side: {
                        templateUrl: "information/information.html",
                        controllerAs: 'infoCtrl',
                        controller: 'informationController'
                    },
                    main: {
                        templateUrl: "promo/promo.html",
                    }
                }
            })
            .state('Base.Lands', {
                url: "land",
                views: {
                    container: {
                        templateUrl: "lands/lands.html",
                        controllerAs: 'landsCtrl',
                        controller: 'landsController'
                    }
                }
            })
            .state('Base.Colors', {
                url: "color",
                views: {
                    container: {
                        templateUrl: "colors/colors.html",
                        controllerAs: 'colorsCtrl',
                        controller: 'colorsController'
                    }
                }
            })
            .state('Base.Results', {
                url: "result/:id",
                params: {
                    resultData: {},
                    isDataReady: false,
                },
                views: {
                    container: {
                        templateUrl: "results/results.html",
                        controllerAs: 'resultsCtrl',
                        controller: 'resultsController'
                    }
                },
                resolve: {
                    resultData: [
                        '$state',
                        '$stateParams',
                        '$q',
                        'resultsFactory',
                        'landsStorageFactory',
                        'colorsStorageFactory',
                        function ($state, $stateParams, $q, resultsFactory, landsStorageFactory, colorsStorageFactory) {
                            if ($stateParams.isDataReady) {
                                return $q.when($stateParams.resultData);
                            } else {
                                return resultsFactory.view({
                                        id: $stateParams.id
                                    })
                                    .then(
                                        function (data) {
                                            landsStorageFactory.set(data.lands);
                                            colorsStorageFactory.set(data.colors);
                                            return data;
                                        },

                                        function (error) {
                                            $state.go('Base.Errors', {
                                                data: error,
                                                type: "notFound"
                                            });
                                        }
                                    );
                            }
                        }
                    ],
                }
            })
            .state('Base.Errors', {
                url: "error",
                params: {
                    type: '',
                    data: {}
                },
                views: {
                    container: {
                        templateUrl: "errors/errors.html",
                        controllerAs: 'errorsCtrl',
                        controller: 'errorsController'
                    }
                }
            });
    }
})();
