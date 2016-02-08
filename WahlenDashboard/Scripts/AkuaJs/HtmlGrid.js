define(['Core/CoreBundle',   'nv.d3.min'], function () {
    _HtmlGrid.prototype = new Apple();        // Here's where the inheritance occurs 
    _HtmlGrid.prototype.constructor = _HtmlGrid;       // Otherwise instances of Cat would have a constructor of Mammal 
    function _HtmlGrid(configObject) {

        Apple.call(this, configObject);
        this.axis0 = configObject.axis0;
        this.height = configObject.height ? configObject.height : 400;
    }

    _HtmlGrid.prototype.getSelection = function () {
        return [];
    };

    _HtmlGrid.prototype.getView = function () {
        var me = this;
        //this.view = $('<div class="mygrid-wrapper-div" style="height: "' + me.height + '"px;"> <table id="' + me.divid + '" class="table table-striped" >  </table></div> ');
        this.view = $('<div class="mygrid-wrapper-div" > <table id="' + me.divid + '" class="table table-striped" >  </table></div> ');
        //this.view = $('<span ><table id="' + me.divid + '" class="table table-striped">  </table> </span>');
        return this.view;
    };

    _HtmlGrid.prototype.updateValues = function () {


        var thead = $("<thead />");
        this.view.children().append(thead);
        thead.append(this.TupleToHeader(this.axis0.Tuples().First()));
        var tbody = $("<tbody />");
        this.view.children().append(tbody);
        var me = this;
        //for (var i = 0; i < gridAxis.length; i++) {
        //    tbody.append(this.TupleToLine(gridAxis[i]));
        //}
        this.axis0.Tuples().ForEach(function (t) { tbody.append(me.TupleToLine(t)); });
    };


    _HtmlGrid.prototype.selectionCallback = function () {
        str = "";
        this.getSelection().each(function () {
            str += $(this).text() + " ";
        });
        alert(str);
    };

    _HtmlGrid.prototype.TupleToHeader = function (tuple) {
        var ff = '<tr style="font-weight: bold;">';
        var elements = tuple.Permutate();
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            //ff[element.Dimension.Caption] = element.Caption;
            ff += '<td>' + element.Dimension.Caption + '</td>';
        }
        ff += '</tr>';
        return ff;
    };

    _HtmlGrid.prototype.TupleToLine = function (tuple) {
        var ff = '<tr >';
        var elements = tuple.Permutate();
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            //ff[element.Dimension.Caption] = element.Caption;
            ff += '<td>' + element.Caption + '</td>';
        }
        ff += '</tr>';
        return ff;
    };


    return function (configObject) { return new _HtmlGrid.prototype.constructor(configObject); };
});