define(['core/CoreBundle', 'jquery.event.drag-2.2', 'slick.core', 'slick.grid'], function () {
    SlickGrid.prototype = new Apple();        // Here's where the inheritance occurs 
    SlickGrid.prototype.constructor = SlickGrid;       // Otherwise instances of Cat would have a constructor of Mammal 
    function SlickGrid(configObject) {
        if (!window.Slick) {
            throw "SlickGrid missing";
        }
        Apple.call(this, configObject);
        this.axis0 = configObject.axis0;
        this.slicer = configObject.slicer;
        this.width = configObject.width ? configObject.width : 300;
        this.divid = guid();
    }



    SlickGrid.prototype.getView = function () {
        var me = this;
        var breite = me.width;
        this.view = $('<div id="' + me.divid + '" style="height:150px;width:' + breite + 'px">ssssfff</div> ');
        return this.view;
    };

    SlickGrid.prototype.updateValues = function () {
        var grid;
        var me = this;
        var gridAxis = this.axis0.Tuples().ToArray();
        var columns = this.TupleToHeader(this.axis0.Tuples().First());
        var lines = new Array();
        var options = {
            enableCellNavigation: false,
            enableColumnReorder: false,
            headerRowHeight: 50
        };


        for (var i = 0; i < gridAxis.length; i++) {
            lines.push(this.TupleToLine(gridAxis[i]));
        }


        //grid = new Slick.Grid("#" + me.divid, lines, columns, options);
        grid = new Slick.Grid(me.view, lines, columns, options);
    };


    SlickGrid.prototype.selectionCallback = function () {
        str = "";
        this.getSelection().each(function () {
            str += $(this).text() + " ";
        });
        alert(str);
    };

    function formatter(row, cell, value, columnDef, dataContext) {
        return value;
    }

    SlickGrid.prototype.TupleToHeader = function (tuple) {
        var columns = new Array();

        var elements = tuple.Permutate();
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            var ff = {};
            ff.id = element.Dimension.Caption;
            ff.name = element.Dimension.Caption;
            ff.field = element.Dimension.Caption;
            ff.formatter = formatter;
            ff.width = 180;
            columns.push(ff);
        }
        return columns;
    };

    SlickGrid.prototype.TupleToLine = function (tuple) {
        var ff = {};
        var elements = tuple.Permutate();
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            ff[element.Dimension.Caption] = element.Caption;
        }
        return ff;
    };
    return function (configObject) { return new SlickGrid.prototype.constructor(configObject); };
});