define(['core/CoreBundle'], function () {
GoogleHeatmap.prototype = new Apple();
GoogleHeatmap.prototype.constructor = GoogleHeatmap;
function GoogleHeatmap(configObject) {
    this.axis0 = configObject.axis0;
    this.slicer = configObject.slicer ? configObject.slicer : T([]);
    this.size = configObject.pkm0 ? configObject.pkm0 : T([]);
    this.color = configObject.pkm1 ? configObject.pkm1 : T([]);
    this.divid = "heatmapArea";// guid();
}


GoogleHeatmap.prototype.getView = function () {
    var me = this;
    this.view = $('<div> click me<div id="' + me.divid + '"></div></div> ');
    this.view.click(function () { me.render(); });
    return this.view;
};

GoogleHeatmap.prototype.render = function () {
    var me = this;

   var myLatlng = new google.maps.LatLng(48.3333, 16.35);
	// sorry - this demo is a beta
	// there is lots of work todo
	// but I don't have enough time for eg redrawing on dragrelease right now
	var myOptions = {
	  zoom: 2,
	  center: myLatlng,
	  mapTypeId: google.maps.MapTypeId.ROADMAP,
	  disableDefaultUI: false,
	  scrollwheel: true,
	  draggable: true,
	  navigationControl: true,
	  mapTypeControl: false,
	  scaleControl: true,
	  disableDoubleClickZoom: false
	};
	map = new google.maps.Map(document.getElementById(me.divid ), myOptions);	
	
	var cfg = {
  // radius should be small ONLY if scaleRadius is true (or small radius is intended)
  // if scaleRadius is false it will be the constant radius used in pixels
  "radius": 2,
  "maxOpacity": .8, 
  // scales the radius based on map zoom
  "scaleRadius": true, 
  // if set to false the heatmap uses the global maximum for colorization
  // if activated: uses the data maximum within the current map boundaries 
  //   (there will always be a red spot with useLocalExtremas true)
  "useLocalExtrema": true,
  // which field name in your data represents the latitude - default "lat"
  latField: 'lat',
  // which field name in your data represents the longitude - default "lng"
  lngField: 'lng',
  // which field name in your data represents the data value - default "value"
  valueField: 'count'
};


	heatmap = new HeatmapOverlay(map, cfg);
	
	var testData={
    		max: 46,
    		data: [{lat: 10.5363, lng:-117.044, count: 100},{lat: 33.5608, lng:-117.24, count: 10},{lat: 38, lng:-97, count: 60},{lat: 38.9358, lng:-77.1621, count: 10}]
    	};
    	
	// this is important, because if you set the data set too early, the latlng/pixel projection doesn't work
	google.maps.event.addListenerOnce(map, "idle", function(){
		heatmap.setData(testData);
	});

};


GoogleHeatmap.prototype.testdata = function () {

    var barAxis = CartesianProduct(Enumerable.From(this.axis0).Select(function (crosslist) { return crosslist.tuples; }).ToArray());

    var dataArray = new Array();
    for (var i = 0; i < barAxis.length; i++) {
        var colorVal = this.getValue(barAxis[i].And(this.color));
        var color = colorVal < 0 ? ColorLuminance("FF0000", -1*(1+colorVal)) : ColorLuminance("00FF00",  -1*(1- colorVal));
        dataArray.push({ name: barAxis[i].ToCaption(), size: this.getValue(barAxis[i].And(this.size)), color: color });
    }

    return {
        "name": "flare",
        "children": dataArray
    };

    return {
        "name": "flare",
        "children": [{ "name": "BetweennessCentrality", "size": 4000, "color": "#AA000A" },
        { "name": "bar", "size": 3534, "color": "#00AA00" },
		  { "name": "baddr", "size": 200, "color": "#00AA00" }]
    };
};

GoogleHeatmap.prototype.selectionCallback = function () {
    str = "";
    this.getSelection().each(function () {
        str += $(this).text() + " ";
    });
    alert(str);
};
   return function (configObject) { return new GoogleHeatmap.prototype.constructor(configObject); };
});