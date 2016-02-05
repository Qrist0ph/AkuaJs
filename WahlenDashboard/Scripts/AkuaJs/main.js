//Stand 13.04.2014
requirejs.config({
    paths: {
        "jquery": [
            "https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min",
            // Wenn der CDN versagt, lade jQuery von unserem Server
            "libs/jquery"
        ],
		//'jquery-ui':['Libs/jquery-ui'],
		'linq.min':['Libs/linq.min'],
		'underscore-min':[ 'Libs/underscore-min'],
		'jshashtable-2.1':['Libs/jshashtable-2.1'],
		//'d3.v3.min':['Libs/d3.v3.min'],
		'nv.d3.min':['Libs/nvd3/nv.d3.min'],
		'cal-heatmap.min':['Libs/CalHeatmap/cal-heatmap.min'],
		

		'jquery.event.drag-2.2':['Libs/SlickGrid/lib/jquery.event.drag-2.2'],
		'slick.core':['Libs/SlickGrid/slick.core'],
		'slick.grid':['Libs/SlickGrid/slick.grid'],
		
		'leaflet':['Libs/leaflet/leaflet'],
		
		
    },
    shim: {
        "jquery-ui": {
            export: "$",
            deps: ['jquery']
        },
        "jquery.event.drag-2.2": {
            export: "jQuery",
            deps: ['jquery']
        },
        "slick.core": {
            //export: "jQuery",
            deps: ['jquery']
        },
        "slick.grid": {
            //export: "jQuery",
            deps: ['slick.core']
        },
        //"nv.d3.min": {
        //    export: "d3",
        //    deps: ['d3.v3.min']
        //},
        //'d3.v3.min': {
        //    export: 'd3'
        //}
    }
});





