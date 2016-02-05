//Filters out all null tuples
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

    this.parent = null;
    this.children = [];
    if (configObject) this.actAsFilter = configObject.actAsFilter ? configObject.actAsFilter : false;
    if (configObject) this.reactOnFilter = configObject.reactOnFilter ? configObject.reactOnFilter : false;
    if (configObject) this.numberFormat = configObject.numberFormat ? configObject.numberFormat : ',.0f';
    this.viewFrame = null;

    if (configObject && configObject.locale == "german") {
        this.locale = { "decimal": ",", "thousands": ".", "grouping": [3], "currency": ["$", ""], "dateTime": "%a %b %e %X %Y", "date": "%m/%d/%Y", "time": "%H:%M:%S", "periods": ["AM", "PM"], "days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], "shortDays": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], "months": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], "shortMonths": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] };
    } else {
        this.locale = { "decimal": ".", "thousands": ",", "grouping": [3], "currency": ["$", ""], "dateTime": "%a %b %e %X %Y", "date": "%m/%d/%Y", "time": "%H:%M:%S", "periods": ["AM", "PM"], "days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], "shortDays": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], "months": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], "shortMonths": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] };
    }
}

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
};