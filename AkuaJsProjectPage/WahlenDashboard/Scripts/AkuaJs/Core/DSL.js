function T(elements,payload) {
    return new _T(elements,payload);
}

function TCL(tuples) {
    return new _TCL(tuples);
}

function E(d, e) {
    return new _E(d, e);
}

function D(caption) {
    return new _D(caption);
}

function A(configObject) {   
    return new _A(configObject.crosslists, configObject.permutation);
}

function Domain(dimensions) {
    return new _Domain(dimensions);
}

function SDTL(tuplesLinq) {
	if (Array.isArray(tuplesLinq))  return new _SDTL(Enumerable.From(tuplesLinq));
	if(!tuplesLinq.Select) throw "Error";
    return new _SDTL(tuplesLinq);
}

function HyperCube(sdtl) {
	return new _HyperCube(sdtl);
}

function DumbTupleStore(sdtl) {
    return new _DumbTupleStore(sdtl);
}

function VGQ (configObject) {
	return new _VisualGeruestQuery(configObject);
}


function LocalCubeConnection(cube) {
	return cube;
}

function MultiTupleFilter(enumerable) {
	if (Array.isArray(enumerable))  return new _SDTL(Enumerable.From(enumerable));
	return new _MultiTupleFilter(enumerable);
}


function Enum(array) {
	return Enumerable.From(array);
}



//----------------------
//function BarChartNvd3(configObject) {
//	return new _BarChartNvd3(configObject);
//}
