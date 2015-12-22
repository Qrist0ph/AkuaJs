function _Domain(dimensions) {
    this.Dimensions = dimensions.sort(function (a, b) {
        return a.Caption.localeCompare(b.Caption);
    });
    this.Length = dimensions.length;
}

_Domain.prototype.ToCaption = function () {
    s = '';
    for (i = 0; i < this.Dimensions.length; i++) {
        s += (this.Dimensions[i].Caption) + ',';
    }
    return s + '';
};

_Domain.prototype.equals = function (obj) {
    return (obj instanceof _Domain) && arraysEqualHash(this.Dimensions, obj.Dimensions);
};

_Domain.prototype.GetProjection = function (otherDomain) {
   return GetProjectionForOrderedSets(this.Dimensions, otherDomain.Dimensions);
};

_Domain.prototype.GetExceptProjection = function (otherDomain) {
   return GetExceptProjectionForOrderedSets(this.Dimensions, otherDomain.Dimensions);
};

_Domain.prototype.ToAkuaDsl = function () {
    return this.toString();
}



