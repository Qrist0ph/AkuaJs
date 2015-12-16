//Stand 13.04.2014
requirejs.config({
    paths: {
        "jquery": [
            "https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min",
            // Wenn der CDN versagt, lade jQuery von unserem Server
            "libs/jquery"
        ],
        'linq.min':['Libs/linq.min'],
        'underscore-min':[ 'Libs/underscore-min'],
        'jshashtable-2.1':['Libs/jshashtable-2.1'],
        'nv.d3.min':['Libs/nvd3/nv.d3.min'],
        //'cal-heatmap.min':['Libs/CalHeatmap/cal-heatmap.min'],
        'cal-heatmap':['Libs/CalHeatmap/cal-heatmap'],
        'leaflet':['Libs/leaflet/leaflet'],
    },
    shim: {
        //"jquery-ui": {
        //    export: "$",
        //    deps: ['jquery']
        //},
        //"slick.core": {
        //    deps: ['jquery']
        //},
        //"slick.grid": {
        //    deps: ['slick.core']
        //},
    }
});





