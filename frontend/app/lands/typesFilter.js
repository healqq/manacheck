(function(){
    'use strict';
    
    angular
    .module('lands')
    .filter('typesFilter',typesFilter);

    function typesFilter() {
        return function(lands, types) {
        if (lands === undefined) {
            return [];
        }
        return lands.filter(function(land) {

            if ((types === undefined) || (types.length === 0) ) {
                return true;
            }
           
            if (-1 !== types.indexOf(land.type)) {
                    return true;
            }
            
            return false;
            
        });
    };
    }
    
})();