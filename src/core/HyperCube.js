function _HyperCube(sdtl) {
    //if(!tuplesLinq.Select)throw "Feler";

    this._sdtl = sdtl;
    this._memoizationFoldOnCubeCore = new Hashtable();
}


_HyperCube.prototype.get = function (tuple) {
    return this.FoldOnCubeCore(tuple.Domain()).get(tuple);
}

_HyperCube.prototype.Tuples = function () {
    return this._sdtl.Tuples();
}

_HyperCube.prototype.FoldOnCubeCore = function (domain) {
    var r = this._memoizationFoldOnCubeCore.get(domain);
    if (r) {
        return r;
    }
    r = this._FoldOnCubeCore(domain);
    this._memoizationFoldOnCubeCore.put(domain, r);
    return r;
}

_HyperCube.prototype._FoldOnCubeCore = function (domain) {
    var r = new Hashtable();
    this.__FoldOnCubeCore(domain).ForEach(function (tuple) { r.put(tuple, tuple.Payload); });
    return r;
}


_HyperCube.prototype.__FoldOnCubeCore = function (domain) {
    return FoldOn(this._sdtl, domain);
    //return this.FoldOn(domain, sdtl => sdtl).Where(f => f.TemporaryValue != null);
}

_HyperCube.prototype.ToAkuaDsl = function () {
    var s = "HyperCube(";
    s += this._sdtl.ToAkuaDsl();
    s += ")";
    return s;
};