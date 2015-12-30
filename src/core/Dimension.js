function _D(caption) {
    this.Caption = caption;
}



_D.prototype.equals = function (obj) {
    return this.ToAkuaDsl && obj.ToAkuaDsl && this.ToAkuaDsl() == obj.ToAkuaDsl();
    // return (obj instanceof _D) && (obj.Caption === this.Caption)
};

_D.prototype.compareTo = function (obj) {
    return this.Caption.localeCompare(obj.Caption);
};

_D.prototype.toString = function () {
    return "D('" + this.Caption + "')";
}

_D.prototype.ToAkuaDsl = function () {
    return this.toString();
}

//--------------
function BarChart() {
    return "BarChart";
}