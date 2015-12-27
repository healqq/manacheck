(function(){
    'use strict';
    
    angular
    .module('lands')
    .filter('colorsFilter',colorsFilter);

    function colorsFilter() {
        return function(lands, colors) {
        if (lands === undefined) {
            return [];
        }
        return lands.filter(function(land) {

            if ((colors === undefined) || (colors.length === 0) ) {
                return true;
            }
            for (var i=0; i<colors.length;i++) {
                if (-1 !== land.colors.indexOf(colors[i])) {
                    return true;
                }
            }
            return false;
            
        });
    };
    }
    
})();