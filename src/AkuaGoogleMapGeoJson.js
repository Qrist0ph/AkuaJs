define(['core/CoreBundle'], function() {

	_AkuaGoogleMap.prototype = new Apple();        // Here's where the inheritance occurs 
	_AkuaGoogleMap.prototype.constructor= _AkuaGoogleMap;       // Otherwise instances of Cat would have a constructor of Mammal 
	function _AkuaGoogleMap(configObject){
		Apple.call(this, configObject);
	    this.axis0 = configObject.axis0;	  	   
	}
	
	_AkuaGoogleMap.prototype.getView = function () {
	    var me = this;
	    this.view = $('<div id="' + me.divid + '" style="height:500px;width:500px"  > '+me.divid +'</div> ');
		//this.view.ready( function() { me.updateValues(true); });		   
		return this.view;
	};

	_AkuaGoogleMap.prototype.updateValues = function (ok) {
		var gridAxis = this.axis0.Tuples().ToArray();
	
		var me = this;
	    var myLatlng = new google.maps.LatLng(0,0);
		var mapOptions = {
			zoom: 4,
			center: myLatlng
		}
		//var map = new google.maps.Map(document.getElementById(me.divid), mapOptions);
		//var map = new google.maps.Map($("#"+me.divid)[0], mapOptions);
		var map = new google.maps.Map(this.view[0], mapOptions);
		
		map.data.loadGeoJson('countries.geo.json');
 var featureStyle = {
    fillColor: 'green',
    strokeWeight: 1
  }
  map.data.setStyle(featureStyle);


}

    return function(configObject) { return new _AkuaGoogleMap.prototype.constructor(configObject); };
});