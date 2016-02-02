define(['core/CoreBundle'], function () {
    GoogleHeatmap.prototype = new Apple();
    GoogleHeatmap.prototype.constructor = GoogleHeatmap;
    function GoogleHeatmap(configObject) {
        Apple.call(this, configObject);
        this.axis0 = configObject.axis0;
    }


    GoogleHeatmap.prototype.getView = function () {
        var me = this;
        var css = '<style>	' +
           '#' + me.divid + '  {position:relative;float:left;width:800px;height:600px;border:1px dashed black;}</style>'

        this.view = $('<div />').html(css + '<div  id="' + me.divid + '"  > </div> ');
        return this.view;
    };

    GoogleHeatmap.prototype.updateValues = function () {
        var me = this;

        var myLatlng = new google.maps.LatLng(48.3333, 16.35);

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
        map = new google.maps.Map(document.getElementById(me.divid), myOptions);

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

        var testData = {
            max: 46,
            data: [{ lat: 10.5363, lng: -117.044, count: 100 }, { lat: 33.5608, lng: -117.24, count: 10 }, { lat: 38, lng: -97, count: 60 }, { lat: 38.9358, lng: -77.1621, count: 10 }]
        };

		
		var markersData = me.data();
		  for (var i = 0; i < markersData.data.length; i++) {
		  new google.maps.Marker({
			position:  {lat:markersData.data[i].lat, lng: markersData.data[i].lng},
			map: map,
			title:markersData.data[i].key + ": "+ d3.locale(me.locale).numberFormat(me.numberFormat)(markersData.data[i].count)
		});
		  }
		  
  
  
        // this is important, because if you set the data set too early, the latlng/pixel projection doesn't work
        google.maps.event.addListenerOnce(map, "idle", function () {
            heatmap.setData(markersData);
        });

    };

    GoogleHeatmap.prototype.data = function () {

        var barAxis = this.axis0.Tuples().ToArray();

        var ret = { max: -Infinity, data: [] };
        for (var i = 0; i < barAxis.length; i++) {
            ret.max = this.getValue(barAxis[i]) > ret.max ? this.getValue(barAxis[i]) : ret.max;
            ret.data.push({
                key: barAxis[i].elements[1].Caption,
                lat: barAxis[i].elements[0].Caption.lat,
                lng: barAxis[i].elements[0].Caption.lng,
                count: this.getValue(barAxis[i])
            });
        }

        return ret;
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