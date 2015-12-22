function _E(d, e) {
    //return [ {NetFunc: "T", Dimension:d, Element:e}];
    this.Dimension = d;
    this.Caption = e;
}
_E.prototype.toString = function () {
	if(typeof this.Caption == "object")
	return 'E(' + this.Dimension + ',\'' + JSON.stringify(this.Caption) + '\')';
	else
    return 'E(' + this.Dimension + ',\'' + this.Caption + '\')';
}
/*
_E.prototype.toCaption = function () {
    return this.Caption;
}
*/
_E.prototype.equals = function (obj) {
    return (obj instanceof _E) && (obj.Dimension.equals(this.Dimension)) &&
	obj.toString() === this.toString();
	//(obj.Caption === this.Caption)
};

_E.prototype.ToAkuaDsl = function () {
    return this.toString();
};