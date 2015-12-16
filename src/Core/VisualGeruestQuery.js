function _VisualGeruestQuery (configObject) {	
	this._ausduennFilters = configObject.AusduennFilters;
	if(!this._ausduennFilters .Select) throw "Fehler";
    this._axes= configObject.Axes;
	
	if(Object.prototype.toString.call( this._axes) === '[object Array]') this._axes = Enumerable.From(configObject.Axes);
	else if(!this._axes .Select) throw "Fehler - Axes kein linq";
    
	this._pkms=  configObject.PKMs;
	if(Object.prototype.toString.call( this._pkms) === '[object Array]') this._pkms = Enumerable.From(configObject.PKMs);
	else if(!this._pkms .Select) throw "Fehler - Pkms kein linq";
    this._slicer= configObject.Slicer;

}

_VisualGeruestQuery.prototype.GetAllAusduennFilters = function() {
	return this._ausduennFilters;
}
	
_VisualGeruestQuery.prototype.ToAkuaDsl = function() {
	
	var akuaDsl = "VGQ({";
	akuaDsl += "AusduennFilters:Enum([" + this._ausduennFilters.Select(
		function(filter){return filter.ToAkuaDsl();}
	).ToArray().join(",")+"])"; 
	
	akuaDsl += ",Axes:["+ this._axes.Select(function(a){return a.ToAkuaDsl();}).ToArray().join(",")+"]";
	akuaDsl += ",PKMs:["+ this._pkms.Select(function(a){return a.ToAkuaDsl();}).ToArray().join(",")+"]";
	akuaDsl += "})";
	return akuaDsl;
};