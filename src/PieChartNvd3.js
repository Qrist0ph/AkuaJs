define(['core/CoreBundle',   'nv.d3.min'], function () {
    PieChartNvd3.prototype = new Apple();        // Here's where the inheritance occurs 
    PieChartNvd3.prototype.constructor = PieChartNvd3;       // Otherwise instances of Cat would have a constructor of Mammal 
    function PieChartNvd3(configObject) {
        Apple.call(this, configObject);
        this.axis0 = configObject.axis0;
        this.height = configObject.height ? configObject.height : 400;      
        this.donut = configObject.donut ? configObject.donut : false;
        this.colors = configObject.colors ? configObject.colors : ["#51A351", "#01A351"];
      
    }

    PieChartNvd3.prototype.getView = function (parent) {
        var me = this;
        //this.view = $('<div id="' + me.divid + '">  <svg style="height: 300px;"></svg></div> ');				
        this.view = $('<svg  id="' + me.divid + '" class="nvd3"  style="height:' + me.height + 'px"></svg> ');
        this.view.attr("width", parent.width());
        return this.view;
    };

    PieChartNvd3.prototype.updateValues = function (div) {
        var me = this;
        nv.addGraph(function () {
            me.chart = me.chart ? me.chart : window.nv.models.pieChart()
                .x(function (d) { return d.key; })
                .y(function (d) { return d.y; })
                .showLabels(true)
                .showLegend(false)
                .color(me.colors)
                .labelType("key") //Configure what type of data to show in the label. Can be "key", "value" or "percent"
            ;

            if (me.donut) {
                me.chart
                    .donut(true) //Turn on Donut mode. Makes pie chart look tasty!
                    .donutRatio(0.35); //Configure how big you want the donut hole size to be.
            }

            d3.select("#" + me.divid )
                .datum(me.testdata())
              .transition().duration(1200)
                .call(me.chart);
            me.chart.valueFormat(
                //d3.format(me.numberFormat)
                d3.locale(me.locale).numberFormat(me.numberFormat)
                )
            ;

            return me.chart;
        });


    };


    PieChartNvd3.prototype.testdata = function () {

        var barAxis = this.axis0.Tuples().ToArray();

        var dataArray = new Array();
        for (var i = 0; i < barAxis.length; i++) {
            var y = this.getValue(barAxis[i]);
            dataArray.push({ key: barAxis[i].ToCaption(), y: y ? y : 0 });
        }
        return dataArray;

    };

    PieChartNvd3.prototype.selectionCallback = function () {
        str = "";
        this.getSelection().each(function () {
            str += $(this).text() + " ";
        });
        alert(str);
    };
    return function (configObject) { return new PieChartNvd3.prototype.constructor(configObject); };
});