define(['core/CoreBundle', "leaflet"], function () {

    _LeafletMap.prototype = new Apple();
    _LeafletMap.prototype.constructor = _LeafletMap;
    function _LeafletMap(configObject) {
        Apple.call(this, configObject);
        this.axis0 = configObject.axis0;
        this.height = configObject.height ? configObject.height : 450;
        this.InfoMessage = configObject.InfoMessage ? configObject.InfoMessage : "Info:";
        this.Unit = configObject.Unit ? configObject.Unit : "";
        this.mapCenter = configObject.mapCenter ? configObject.mapCenter : [52.8, 13];
        this.zoom = configObject.zoom ? configObject.zoom : 8;
		this.geoJson = configObject.geoJson;
		
    }

    _LeafletMap.prototype.getView = function () {
        var me = this;
		 var css = '<style>	' +           
            '#' + me.divid + ' .info {padding: 6px 8px;font: 14px/16px Arial, Helvetica, sans-serif;background: white;background: rgba(255,255,255,0.8);box-shadow: 0 0 15px rgba(0,0,0,0.2);border-radius: 5px;}' +       
            '#' + me.divid + ' .info h4 {margin: 0 0 5px;color: #777;}' +
			'#' + me.divid + ' .legend {text-align: left;line-height: 18px;color: #555;}'+
			'#' + me.divid + ' .legend i {width: 18px;height: 18px;float: left;margin-right: 8px;opacity: 0.7;}</style>	';
			
		this.view = $('<div id="' + me.divid + '" />').html(css+ '<div style="height:' + me.height + 'px;"  > ' + me.divid + '</div> ');	
      
        return this.view;
    };

    _LeafletMap.prototype.updateValues = function (ok) {
        var me = this;

        if (!me.map) {           

            //me.map =  L.map(me.divid).setView([52.8, 13], 8);
            me.map = L.map(me.view[0].children[1]).setView(me.mapCenter, me.zoom);
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
            var osm = new L.TileLayer(osmUrl, { minZoom: 0,  attribution: osmAttrib }).addTo(me.map);



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
        me.geojson = L.geoJson( this.geoJson, {
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
                    click: function(e){
						if (me.click){
					   var tuple = me.axis0.Tuples().FirstOrDefault(null, function (t) { return t.ToCaption() == e.target.feature.properties.Name });
						var value = tuple ? me.getValue(tuple) : 0;
					    me.click(tuple,value);
					  }
					}
                });
            }
        }).addTo(me.map);

    };



    return function (configObject) { return new _LeafletMap.prototype.constructor(configObject); };
});