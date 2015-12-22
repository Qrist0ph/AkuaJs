function _TCL(tuples) {
    this.tuples = tuples;
}

_TCL.prototype.Tuples = function () {
	return Enumerable.From(this.tuples);
};

_TCL.prototype.toString = function () {
    s = 'TCL([';
    for (i = 0; i < this.tuples.length; i++) {
        s += (this.tuples[i].toString()) + ',';
    }
    return s + '])';
};


_TCL.prototype.ToAkuaDsl = function () {
    return this.toString();
}

