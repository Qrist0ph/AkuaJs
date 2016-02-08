function _MultiTupleFilter(enumerable) {
    if(!enumerable.Select) throw "Kein linqjs";
	this._tuples = enumerable;
}

_MultiTupleFilter.prototype.Filter = function (enumerable) {
	if(!enumerable.Select) throw "Kein linqjs";
	return WhereExtends(enumerable,this._tuples);
};


_MultiTupleFilter.prototype.ToAkuaDsl = function () {
    var s="MultiTupleFilter([";
	s += this._tuples.Select(function(tuple){return tuple.ToAkuaDsl();}).ToArray().join(",");
	s += "])";
    return s;
};


