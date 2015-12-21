 jQuery.sap.declare("AkuaJs.Core");
 
 define([ 'underscore-min', 'linq.min', 'jshashtable-2.1'], function () {}); 
 
 
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

function _LocalCubeDataProvider() {	
}

_LocalCubeDataProvider.prototype.ExecuteVisualGeruestQuery = function (visualGeruestQuery,connection) {
    
    if(connection){
    var allAusduenner = visualGeruestQuery.GetAllAusduennFilters();
    var cubeTuples = connection.Tuples();
     $.each(allAusduenner.ToArray(), function (key, value) {
       cubeTuples = value.Filter(cubeTuples);
    });
    
    return new _HyperCube(SDTL(cubeTuples));
    }
}

function  DataProviderFacaceAsync(visualGeruestQuery,connection,callback) {
    //console.log("Feuer: "+ visualGeruestQuery.ToAkuaDsl());
    callback( new _LocalCubeDataProvider().ExecuteVisualGeruestQuery(visualGeruestQuery,connection));
}function _D(caption) {
    this.Caption = caption;
}



_D.prototype.equals = function (obj) {
    return (obj instanceof _D) && (obj.Caption === this.Caption)
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
}function _Domain(dimensions) {
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
﻿function _DumbTupleStore(sdtl) {
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
};function _HyperCube(sdtl) {
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
};function _MultiTupleFilter(enumerable) {
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


function _SDTL(tuplesLinq) {
	if(!tuplesLinq.Select)throw "Feler";
    
	this.tuplesLinq = tuplesLinq       ;
}

_SDTL.prototype.ToAkuaDsl = function () {
	var s="SDTL([";
	s += this.tuplesLinq.ToArray().join(" , "); 
	s += "])";
    return s;
};


_SDTL.prototype.Tuples = function () {
	var me = this;
	return this.tuplesLinq.Select(function (tuple) { return tuple; });
}

_SDTL.prototype.Domain = function () {
	var me = this;
	var first = this.tuplesLinq.FirstOrDefault()
	return first? first.Domain():Domain([]);
}

function GroupTuplesBy(sdtl, domaine)
{
    //var domain = new Domain(domaine.Intersect(sdtl.Domain));
	var domain = domaine;
    var proj = sdtl.Domain().GetProjection(domain);
		
    var exceptProj = sdtl.Domain().GetExceptProjection(domain);
	
	k=0;
	var groups = sdtl.Tuples().GroupBy(function (tuple) { return tuple.ApplyProjection(proj).toString(); }, 
	
	 null,
									 function (key, grouping) {  
									 return {Slicer:eval(key),
									 SameDomainTuplesList:SDTL(grouping)};
									 }
	);
	
	return groups;
}

function FoldOn(sdtl, domaine,foldingFunction){
	//if(!foldingFunction) foldingFunction = Enumerable.From().Sum
	return GroupTuplesBy(sdtl, domaine)
	.Select(function(group){
		var aggregatedValue = group.SameDomainTuplesList.Tuples().Select(function(tuple){return tuple.Payload;}).Sum();
		group.Slicer.Payload = aggregatedValue;
		return group.Slicer;
	}
	);	
}

function WhereExtends(sdtl, orFilters){
if(!sdtl.Select || !orFilters.Select) throw "kein linqjs supplied";
var doExtend = new Array();
return sdtl.Where(function(tuple){
return orFilters.Any(function(filter){return filter.IsSubsetOf(tuple);})
});
}﻿if (!String.format) {
    String.format = function (format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
              ? args[number]
              : match
            ;
        });
    };
}

Number.prototype.formatNumber = function (arguemnts) {
    var n = this;
    return n.formatMoney(arguemnts[0],arguemnts[1],arguemnts[2],arguemnts[3]);
}

Number.prototype.formatMoney = function (c, d, t, symbol) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "") + symbol;
};



function CssClassDefined(name) {
    var styles = $('head').children("style");
    for (var i = 0; i < styles.length; i++) {
        var text = $(styles[i]).html();
        if (text.indexOf("." + name) != -1) return true;
    }
    return false;
}


function ColorLuminance(hex, lum) {

    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;

    // convert to decimal and change luminosity
    var rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        //c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        c = c == 0 ? Math.round(Math.min(c + 255 * lum), 255).toString(16) : c.toString(16);
        rgb += ("00" + c).substr(c.length);
    }

    return rgb;
}


function GetProjectionForOrderedSets(left, right) {
    var result = new Array();
    var rightCount = right.length;
    var leftCount = left.length;

    var r = 0, l = 0;
    while (r < rightCount && l < leftCount) {
        var comp = right[r].compareTo(left[l]);
        if (comp == 0) {
            result.push(l);
            result.push(r);
            l++;
            r++;
            continue;
        }

        if (comp == -1)
            r++;
        else
            l++;
    }
    return result;
}

function GetExceptProjectionForOrderedSets(left, right) {
    var result = new Array();
    var rightCount = right.length;
    var leftCount = left.length;

    var r = 0, l = 0, c = 0;;
    while (r < rightCount && l < leftCount) {
        var comp = right[r].compareTo(left[l]);
        if (comp == 0) {

            l++;
            r++;
            continue;
        }

        if (comp == -1)
            r++;
        else {
            result.push(l++);
            result.push(c++);
        }
    }
    while (l < leftCount) {
        result.push(l++);
        result.push(c++);
        r++;
    }
    return result;
}

function GetPermutation(ldims, rdims) {

    var result = new Array(ldims.length);
    for (var i = 0; i < ldims.length; i++) {
        result[i] = -1;
        var c = ldims[i];
        for (var j = 0; j < rdims.length; j++) {
            if (!c.equals(rdims[j])) continue;
            result[i] = j;
        }
    }
    return result;
}


function truncateString(s,n){
    return s.length>n ? s.substr(0,n-1)+'&hellip;' : s;
};

function arraysEqual2(arr1, arr2) {
    if (arr1.length !== arr2.length)
        return false;
    for (var i = arr1.length; i--;) {
        if (arr1[i] !== arr2[i])
            return false;
    }

    return true;
}

function arraysEqualHash(arr1, arr2) {
    if (arr1.length !== arr2.length)
        return false;
    for (var i = arr1.length; i--;) {
        if (!arr1[i].equals(arr2[i]))
            return false;
    }

    return true;
}

function Serialize(vis) { return vis; }

function Selection(selection) { return selection; }



//-------------------------------

function ArrayIterator(array) {
    this.index = 0;
    this.array = array;
}

ArrayIterator.prototype.next = function () {
    if (this.index < this.array.length) return this.array[this.index++];
    return undefined;
}

ArrayIterator.prototype.reset = function () {
    this.index = 0;
    return this;
}
//-------------------------------



function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
};

function guid() {
    return "a" + s4() + s4();// + '-' + s4() + '-' + s4() + '-' +s4() + '-' + s4() + s4() + s4();
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}function _T(elements, payload) {
    if (!elements) {
        console.log("dd");
    }
    this.elements = elements.sort(function (a, b) {
        return a.Dimension.compareTo(b.Dimension);
    });
    this.Length = elements.length;
    this.Permutation = Enumerable.Range(0, this.Length).ToArray();
    this.Payload = payload ? payload : 0;
}
_T.prototype.toString = function () {
    s = 'T([';

    s += this.elements.join(",");
    s = s + ']';
    s = s + ')';
    return s;
}

_T.prototype.ToAkuaDsl = function () {
    s = 'T([';

    s += this.elements.join(",");
    s = s + ']';
    if (this.Payload) {
        s += ',' + this.Payload;
    }
    s = s + ')';
    return s;
}

_T.prototype.Domain = function () {
    this._Domain = this._Domain ? this._Domain : Domain(Enumerable.From(this.elements).Select(function (el) { return el.Dimension; }).ToArray());
    return this._Domain;
};

_T.prototype.ToCaption = function () {
    s = '';
    for (var i = 0; i < this.elements.length; i++) {
        s += (this.elements[i].Caption);
        if (i != this.elements.length - 1) {
            s += ',';
        }

    }

    return s + '';

    //return elements.join(",");
}

_T.prototype.equals = function (obj) {
    return (obj instanceof _T) && arraysEqualHash(this.elements, obj.elements);
};

_T.prototype.And = function (otherTuple) {
    return AndTupleElements(false, this.elements, otherTuple.elements);
}



_T.prototype.IsSubsetOf = function (otherTuple) {
    var projection = GetProjectionForOrderedSets(this.Domain().Dimensions, otherTuple.Domain().Dimensions);
    if (projection.length / 2 != this.elements.length) return false;

    var subset = true;
    for (var i = 0; i < projection.length / 2; i++) {
        //falls sich die Filter und CubeTuple schneiden
        if (this.elements[projection[2 * i]].equals(otherTuple.elements[projection[2 * i + 1]])) continue;
        subset = false;
        break;
    }
    return subset;
}


//-------------------------------

function AndTupleElements(overwrite, rightTuple, leftTuple) {

    if (rightTuple.length == 0) {
        return T(leftTuple);
    }
    if (leftTuple.length == 0) {
        return T(rightTuple);
    }

    var newTuple = new Array(leftTuple.length + rightTuple.length);
    var count = 0;
    var lCount = 0;
    var rCount = 0;

    while (lCount < leftTuple.length || rCount < rightTuple.length) {
        var left = lCount < leftTuple.length ? leftTuple[lCount] : null;
        var right = rCount < rightTuple.length ? rightTuple[rCount] : null;

        if (left == null) {
            newTuple[count++] = right;
            rCount++;
            continue;
        }
        if (right == null) {
            newTuple[count++] = left;
            lCount++;
            continue;
        }

        if (left.Dimension.compareTo(right.Dimension) == -1) {
            newTuple[count++] = left;
            lCount++;
            continue;
        }
        //>
        if (left.Dimension.compareTo(right.Dimension) == 1) {
            newTuple[count++] = right;
            rCount++;
            continue;
        }
        //falls gleiche Dimension and dieser stelle

        //falls elemente identisch
        if (left.equals(right)) {
            newTuple[count++] = left;
            lCount++;
            rCount++;
            continue;
        }

        if (overwrite) {
            newTuple[count++] = right;
            lCount++;
            rCount++;
            continue;
        }
        return null;
    }

    var andTuples = new Array(count);
    //Array.Copy(newTuple, andTuples, count);
    return T(newTuple);
}

_T.prototype.Permutate = function () {
    var count = 0;
    for (var i = 0; i < this.Permutation.length; ++i) {
        if (this.Permutation[i] >= 0)
            count++;
    }

    var result = new Array(count);
    for (var i = 0; i < this.elements.length; i++) {
        if (this.Permutation[i] >= 0)
            result[i] = this.elements[this.Permutation[i]];
    }
    return result;
};

_T.prototype.ApplyProjection = function (projection) {
    return T(this.ApplyCompressedProjection(projection, new Array(projection.length / 2)));
};

_T.prototype.ApplyCompressedProjection = function (projection, target) {
    for (var i = 0; i < projection.length / 2; i++) {
        target[projection[2 * i + 1]] = this.elements[projection[2 * i]];
    }
    return target;
}﻿//Filters out all null tuples
function CartesianProduct(listOfTupleLists) {

    listOfTupleLists = Enumerable.From(listOfTupleLists).Select(function (enumerable) { return enumerable.ToArray() }).ToArray();

    var allCombinations;
    if (listOfTupleLists.length != 0) {

        allCombinations = cartesianProductOf.apply(this || window, listOfTupleLists);
    }
    else {
        allCombinations = Array();
        //allCombinations.push(T([]));
    }
    var ands = Enumerable.From(allCombinations).Select(function (list) { return Enumerable.From(list).Aggregate(T([]), function (a, b) { return a.And(b); }); });
    return ands.Where(function (a) { return a != null; }).ToArray();;
}

function cartesianProductOf() {
    return _.reduce(arguments, function (a, b) {
        return _.flatten(_.map(a, function (x) {
            return _.map(b, function (y) {
                return x.concat([y]);
            });
        }), true);
    }, [[]]);
};

function Apple(configObject) {
    this._axes = [];
    this._pkms = [];
    this.divid = guid();
    if (configObject) this.InitFromConfigObject(configObject);
    this.type = configObject;
    this.configObject = configObject;

    this.parent = null;
    this.children = [];
    this.nameIndexes = [];
    if (configObject) {
        this.actAsFilter = configObject.actAsFilter ? configObject.actAsFilter : false;

        this.reactOnFilter = configObject.reactOnFilter ? configObject.reactOnFilter : false;
        this.numberFormat = configObject.numberFormat ? configObject.numberFormat : ',.0f';

        this.colors = configObject.colors ? configObject.colors : ["#FFD700", "#F4A460", "#66CDAA", "#a173d1", "#DDA0DD", "#6A5ACD", "#A0522D"];
        this.colorDict = configObject.colorDict ? configObject.colorDict : {};
    }

    this.viewFrame = null;

    if (configObject && configObject.locale == "german") {
        this.locale = { "decimal": ",", "thousands": ".", "grouping": [3], "currency": ["\u20AC", ""], "dateTime": "%a %b %e %X %Y", "date": "%d.%m.%Y", "time": "%H:%M:%S", "periods": ["AM", "PM"], "days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], "shortDays": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], "months": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], "shortMonths": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] };
    } else {
        this.locale = { "decimal": ".", "thousands": ",", "grouping": [3], "currency": ["$", ""], "dateTime": "%a %b %e %X %Y", "date": "%m/%d/%Y", "time": "%H:%M:%S", "periods": ["AM", "PM"], "days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], "shortDays": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], "months": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], "shortMonths": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] };
    }
}

Apple.prototype.getColorByName = function (name) {
    var col = this.colorDict[name];
    if (col) {
        return col;
    }

    var index = this.nameIndexes.indexOf(name);
    if (index == -1) {
        this.nameIndexes.push(name);
        index = this.nameIndexes.length - 1;
    }

    return this.colors[index % this.colors.length];
};

Apple.prototype.InitFromConfigObject = function (configObject) {
    this.slicer = configObject.slicer ? configObject.slicer : T([]);
    this.Connection = configObject.Connection ? configObject.Connection : null;
    for (i in configObject) {
        if (/axis/.test(i)) this.InitAxis(configObject[i]);
        if (/pkm/.test(i)) this.InitPkm(configObject[i]);
    }

    //this.DataSet = this.Connection;
};

Apple.prototype.getSelection = function () {
    return Enumerable.From([T([])]);
}


Apple.prototype.getMyAusduennFilters = function () {
    var selectedTuples = this.getSelection();
    if (!selectedTuples.Select) throw "keinee linqjs ";
    if (selectedTuples.Any())
        return [new _MultiTupleFilter(selectedTuples)];
    return [];
}



Apple.prototype.getInfo = function () {
    alert(this.type);
    return this.color + ' ' + this.type + ' apple';
};

Apple.prototype.addChild = function (child) {
    this.children.push(child);
    child.parent = this;
};
// Will be called from selectionChanged
Apple.prototype.updateValuesCaller = function (meRef) {
    var me = meRef ? meRef : this;
    DataProviderFacaceAsync(me.GetVisualGeruestQuery(), me.Connection,
        function (dataSet) {
            me.DataSet = dataSet;
            me.updateValues();
        }
    );
};

//Will render the
Apple.prototype.getViewCaller = function (domId) {
    //Query the Connection:
    var me = this;
    DataProviderFacaceAsync(this.GetVisualGeruestQuery(), this.Connection,
        function (dataSet) {
            me.DataSet = dataSet;

            if (me.viewFrame) me.viewFrame.empty();
            me.viewFrame = jQuery('<div></div> ');
            domId.append(me.viewFrame);
            me.viewFrame.append(me.getView(me.viewFrame));
            //Falls update Values ueberschrieben ist
            if (Apple.prototype.updateValues != me.updateValues) me.updateValues();
        }
    );
}

Apple.prototype.getView = function () {

    throw "Bitte in SubClass implementieren";
};



// Default Implementation will call getView again
Apple.prototype.updateValues = function () {
    this.viewFrame.empty();
    this.viewFrame.append(this.getView(this.viewFrame));
};

Apple.prototype.onSelectionChanged = function (child) {

    $.each(this.children, function (key, value) {
        var m = value;
        if (value.reactOnFilter) _.defer(m.updateValuesCaller, m);
    });
};

Apple.prototype.getValue = function (tuple) {
    return this.DataSet.get(tuple.And(this.slicer));
};



Apple.prototype.GetAllAusduennFilters = function () {
    var me = this;
    var filterLists = [];
    if (!this.parent) return Enumerable.From(filterLists);
    $.each(this.parent.children, function (i, c) {
        if (c !== me) {
            var ausduennFilters = c.getMyAusduennFilters();
            $.each(ausduennFilters, function (i, c) {
                filterLists.push(c);
            });
        }
    });
    return Enumerable.From(filterLists);
}

Apple.prototype.InitPkm = function (pkm) {
    this._pkms.push(pkm);
};

Apple.prototype.InitAxis = function (axis) {
    this._axes.push(axis);
};

Apple.prototype.GetAxes = function () {
    return Enumerable.From(this._axes);
};

Apple.prototype.GetPkms = function () {
    return Enumerable.From(this._pkms);
};



Apple.prototype.GetVisualGeruestQuery = function () {
    var r = {
        AusduennFilters: this.GetAllAusduennFilters(),
        Axes: this.GetAxes(),
        PKMs: this.GetPkms(),
        Slicer: this.slicer
    };
    return VGQ(r);
};


Apple.prototype.GetConfigObjectAsAkuaDsl = function () {
    var coString = "{";
    for (prop in this._configObject) {

    }
    coString += "}";
    return coString;
    ;
}



Apple.prototype.calculateBuckets = function (minV, maxV) {
    var result = [];
    var diffV = Math.abs(maxV - minV) / 8;
    var max = Math.abs(maxV) > Math.abs(minV) ? Math.abs(maxV) : Math.abs(minV);

    var grades = Enumerable.Range(0, 8).Select("x => " + diffV + "*x+" + minV).ToArray(),
            labels = [],
            from, to;

    for (var i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];

        var colorVal = to / max;
        var color = colorVal < 0 ? ColorLuminance("FF0000", 1 + colorVal) : ColorLuminance("00FF00", 1 - colorVal);

        result.push({ color: color, from: from, to: to });
    }
    return result;
}

Apple.prototype.calculateMinMax = function (axis) {
    var result = {};
    var barAxis = axis ? axis : this.axis0.Tuples().ToArray();
    var maxV = -Infinity;
    var minV = Infinity;
    for (var i = 0; i < barAxis.length; i++) {
        var val = this.getValue(barAxis[i]);
        maxV = val > maxV ? val : maxV;
        minV = val < minV ? val : minV;
    }
    result.min = minV;
    result.max = maxV;
    return result;
}


Apple.prototype.getGradientColor = function (value, max) {
    var colorVal = value / max;
    var color = colorVal < 0 ? ColorLuminance("FF0000", 1 + colorVal) : ColorLuminance("00FF00", 1 - colorVal);
    return color;
}

Apple.prototype.MakeRemoteCall = function () {
    var chart = ' <div>\
        <div id="chart_container">Loading chart...</div> \
<script type="text/javascript"> \
var myChart = new JSChart(\'chart_container\', \'bar\', \'\'); \
myChart.setDataArray([[\'Jun-04\', 22.5],[\'Oct-04\', 28],[\'Feb-05\', 32]]); \
myChart.colorize([\'#44A622\',\'#A7B629\',\'#CAD857\']); \
myChart.setSize(550, 300); \
myChart.setBarValues(false); \
myChart.setBarSpacingRatio(45); \
myChart.setBarOpacity(1); \
myChart.setBarBorderWidth(0); \
myChart.setTitle(\'Home broadband penetrationnn\'); \
myChart.setTitleFontSize(10); \
myChart.setTitleColor(\'#607985\'); \
myChart.setAxisValuesColor(\'#607985\'); \
myChart.setAxisNameX(\'\' ); \
myChart.setAxisNameY(\'%\' ); \
myChart.setGridOpacity(0.8); \
myChart.draw(); \
</script></div> '

    return chart;
};function _VisualGeruestQuery (configObject) {	
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