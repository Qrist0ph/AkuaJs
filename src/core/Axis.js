function _A(crosslists,permutation) {
    this.crosslists = crosslists;
    this.Permutation = permutation;
}


_A.prototype.toString = function () {
    s = 'A([';
	s += this.crosslists.join(",");
    return s + '])';
}

_A.prototype.ToAkuaDsl = function () {
    return this.toString();
}

_A.prototype.Tuples = function () {
	var me = this;
	var tuples = CartesianProduct(Enumerable.From(this.crosslists).Select(function (crosslist) { return crosslist.Tuples(); }).ToArray());
	
	//Axis must at least contain the empty tuple
	if(tuples.length == 0)tuples.push(T([]));
	return Enumerable.From(tuples).Select(function (tuple) { 
	if(me.Permutation)
		tuple.Permutation = me.Permutation; 
	return tuple; });	
}
