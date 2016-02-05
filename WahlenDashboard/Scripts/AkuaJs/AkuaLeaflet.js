define(['Core/CoreBundle', "leaflet"], function () {

    _LeafletMap.prototype = new Apple();
    _LeafletMap.prototype.constructor = _LeafletMap;
    function _LeafletMap(configObject) {
        Apple.call(this, configObject);
        this.axis0 = configObject.axis0;
        this.height = configObject.height ? configObject.height : 400;
        this.InfoMessage = configObject.InfoMessage ? configObject.InfoMessage : "Info:";
        this.Unit = configObject.Unit ? configObject.Unit : "";
        this.MapCenter = configObject.MapCenter ? configObject.MapCenter : [52.8, 13];
        this.Zoom = configObject.Zoom ? configObject.Zoom : 8;
    }

    _LeafletMap.prototype.getView = function () {
        var me = this;
        this.view = $('<div id="' + me.divid + '" style="height:' + me.height + 'px;"  > ' + me.divid + '</div> ');

        return this.view;
    };

    _LeafletMap.prototype.updateValues = function (ok) {
        var me = this;

        if (!me.map) {
            //todo rest ?

            //me.map =  L.map(me.divid).setView([52.8, 13], 8);
            me.map = L.map(me.view[0]).setView(me.MapCenter, me.Zoom);
            //var map = L.map('map').setView([37.8, -96], 4);

            /*
            var cloudmade = L.tileLayer('http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png', {
                attribution: 'Map data  2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade',
                key: 'BC9A493B41014CAABB98F0471D759707',
                styleId: 22677
            }).addTo(map);
            */

            //Mit OpenStreetMap verwenden
            var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
            var osmAttrib = 'Map data <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
            var osm = new L.TileLayer(osmUrl, { minZoom: 0, maxZoom: 12, attribution: osmAttrib }).addTo(me.map);



            // control that shows state info on hover
            me.info = L.control();

            me.info.onAdd = function (map) {
                this._div = L.DomUtil.create('div', 'info');
                this.update();
                return this._div;
            };

            me.info.update = function (props) {

                this._div.innerHTML = '<h4>' + me.InfoMessage + '</h4>' + (props ?
                     '<b>' + props.Name + '</b><br />' + props.value.formatMoney(0, ',', '.', '') + ' ' + me.Unit
                     : '');
            };

            me.info.addTo(this.map);


            var legend = L.control({ position: 'bottomright' });
            legend.onAdd = function (map) {

                var div = L.DomUtil.create('div', 'info legend');

                me.legend = div;
                return div;
            };
            legend.addTo(me.map);

        } // Ende Lazy Init






        var geoJsonString = {
            "type": "FeatureCollection", "features": [
                            { "type": "Feature", "id": "AFG", "properties": { "name": "geoJsonStringnn" }, "geometry": { "type": "Polygon", "coordinates": [[[61.210817, 35.650072], [62.230651, 35.270664], [62.984662, 35.404041], [63.193538, 35.857166], [63.982896, 36.007957], [64.546479, 36.312073], [64.746105, 37.111818], [65.588948, 37.305217], [65.745631, 37.661164], [66.217385, 37.39379], [66.518607, 37.362784], [67.075782, 37.356144], [67.83, 37.144994], [68.135562, 37.023115], [68.859446, 37.344336], [69.196273, 37.151144], [69.518785, 37.608997], [70.116578, 37.588223], [70.270574, 37.735165], [70.376304, 38.138396], [70.806821, 38.486282], [71.348131, 38.258905], [71.239404, 37.953265], [71.541918, 37.905774], [71.448693, 37.065645], [71.844638, 36.738171], [72.193041, 36.948288], [72.63689, 37.047558], [73.260056, 37.495257], [73.948696, 37.421566], [74.980002, 37.41999], [75.158028, 37.133031], [74.575893, 37.020841], [74.067552, 36.836176], [72.920025, 36.720007], [71.846292, 36.509942], [71.262348, 36.074388], [71.498768, 35.650563], [71.613076, 35.153203], [71.115019, 34.733126], [71.156773, 34.348911], [70.881803, 33.988856], [69.930543, 34.02012], [70.323594, 33.358533], [69.687147, 33.105499], [69.262522, 32.501944], [69.317764, 31.901412], [68.926677, 31.620189], [68.556932, 31.71331], [67.792689, 31.58293], [67.683394, 31.303154], [66.938891, 31.304911], [66.381458, 30.738899], [66.346473, 29.887943], [65.046862, 29.472181], [64.350419, 29.560031], [64.148002, 29.340819], [63.550261, 29.468331], [62.549857, 29.318572], [60.874248, 29.829239], [61.781222, 30.73585], [61.699314, 31.379506], [60.941945, 31.548075], [60.863655, 32.18292], [60.536078, 32.981269], [60.9637, 33.528832], [60.52843, 33.676446], [60.803193, 34.404102], [61.210817, 35.650072]]] } },
            ]
        };
        geoJsonString = berlin;



        var minMax = this.calculateMinMax();
        var maxV = minMax.max;
        var minV = minMax.min;
        var max = Math.abs(maxV) > Math.abs(minV) ? Math.abs(maxV) : Math.abs(minV);


       
        var labels = Enumerable.From(this.calculateBuckets(minV, maxV)).Select(function (x) {
            return '<i style="background:' + x.color + '"></i> ' +
                x.from.formatMoney(0, ',', '.', '') + (x.to ? '&ndash;' + x.to.formatMoney(0, ',', '.', '') : '+');
        }).ToArray();

        me.legend.innerHTML = labels.join('<br>');



        var highlightFeature = function (e) {
            var layer = e.target;
            layer.setStyle({
                weight: 2,
                color: '#666',
                dashArray: '',
                fillOpacity: 0.7
            });

            if (!L.Browser.ie && !L.Browser.opera) {
                layer.bringToFront();
            }

            me.info.update(layer.feature.properties);
        }

        var resetHighlight = function (e) {
            me.geojson.resetStyle(e.target);
            me.info.update();
        }


        if (me.geojson) me.map.removeLayer(me.geojson);
        //Geojson decoden
        //todo Logik f�r F�rbung aus Treemap holen
        me.geojson = L.geoJson(geoJsonString, {
            style: function (feature) {

                var tuple = me.axis0.Tuples().FirstOrDefault(null, function (t) { return t.ToCaption() == feature.properties.Name });
                var value = tuple ? me.getValue(tuple) : 0;

                // Save values in object
                feature.properties.value = value;

                var color = me.getGradientColor(value, max);

                return {
                    weight: 2,
                    opacity: 1,
                    color: 'white',
                    dashArray: '1',
                    fillOpacity: 0.7,
                    fillColor: color   //getColor(feature.properties.density)
                };
            },


            onEachFeature: function (feature, layer) {

                layer.on({
                    mouseover: highlightFeature,
                    mouseout: resetHighlight,
                    //click: zoomToFeature
                });
            }
        }).addTo(me.map);

    };







    return function (configObject) { return new _LeafletMap.prototype.constructor(configObject); };
});