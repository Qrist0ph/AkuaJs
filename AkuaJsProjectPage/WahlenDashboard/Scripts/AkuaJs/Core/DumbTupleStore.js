function _DumbTupleStore(sdtl) {
    if (!sdtl.Tuples) throw "Feler";
    var me = this;
    this._sdtl = sdtl;
    this._hashtable = new Hashtable();
    this._sdtl.Tuples().ForEach(function (tuple) { me._hashtable.put(tuple, tuple.Payload); });
}

_DumbTupleStore.prototype.get = function (tuple) {
    return this._hashtable.get(tuple);
}

_DumbTupleStore.prototype.Tuples = function () {
    return this._sdtl.Tuples();
}

_DumbTupleStore.prototype.ToAkuaDsl = function () {
    var s = "DumbTupleStore(";
    s += this._sdtl.ToAkuaDsl();
    s += ")";
    return s;
};
