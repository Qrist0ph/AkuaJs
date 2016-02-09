define(['core/CoreBundle'], function () {
    GoogleHeatmap.prototype = new Apple();
    GoogleHeatmap.prototype.constructor = GoogleHeatmap;
    function GoogleHeatmap(configObject) {
        Apple.call(this, configObject);
        this.axis0 = configObject.axis0;
        this.showMarkers = configObject.showMarkers;
        this.zoom = configObject.zoom?configObject.zoom:2;
        this.center = configObject.center ? new google.maps.LatLng(configObject.center.lat,configObject.center.lng) : new google.maps.LatLng(48.3333, 16.35)
    }


    GoogleHeatmap.prototype.getView = function () {
        var me = this;
        var css = '<style>	' +
           '#' + me.divid + '  {width:800px;height:600px;border:1px dashed black;}</style>'

        this.view = $('<div />').html(css + '<div  id="' + me.divid + '"  > </div> ');
        return this.view;
    };

    GoogleHeatmap.prototype.updateValues = function () {
        var me = this;

        var myLatlng = new google.maps.LatLng(48.3333, 16.35);

        var myOptions = {
            zoom: me.zoom,
            center: me.center,
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
            "useLocalExtrema": false,
            // which field name in your data represents the latitude - default "lat"
            latField: 'lat',
            // which field name in your data represents the longitude - default "lng"
            lngField: 'lng',
            // which field name in your data represents the data value - default "value"
            valueField: 'count'
        };


        heatmap = new HeatmapOverlay(map, cfg);



        var markersData = me.data();
        if (me.showMarkers) {
            for (var i = 0; i < markersData.data.length; i++) {
                var marker = new google.maps.Marker({
                    position: { lat: markersData.data[i].lat, lng: markersData.data[i].lng },
                    map: map,
                    title: markersData.data[i].key + ": " + d3.locale(me.locale).numberFormat(me.numberFormat)(markersData.data[i].count)
                });
                var tuple = markersData.data[i].tuple;
                var value = markersData.data[i].count;
                if (me.click) {
                    marker.addListener('click', function () {
                        me.click(tuple, value)
                    });
                }
            }
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
                count: this.getValue(T([barAxis[i].elements[0]])),
                tuple: barAxis[i]
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