define(['core/CoreBundle', 'nv.d3.min'], function () {


    MultiLineChartNvd3.prototype = new Apple();        // Here's where the inheritance occurs 
    MultiLineChartNvd3.prototype.constructor = MultiLineChartNvd3;       // Otherwise instances of Cat would have a constructor of Mammal 
    function MultiLineChartNvd3(configObject) {
        Apple.call(this, configObject);
        this.axis0 = configObject.axis0;
        this.axis1 = configObject.axis1;
        this.slicer = configObject.slicer;
        this.height = configObject.height ? configObject.height : 400;
        this.divid = guid();
    }

    MultiLineChartNvd3.prototype.getSelection = function () {
        return [];
    };

    MultiLineChartNvd3.prototype.getView = function () {
        var me = this;
        this.view = $('<div id="' + me.divid + '">  <svg class="nvd3" id="' + me.divid + '" style="height:' + me.height + 'px"></svg></div> ');
        return this.view;
    };

    MultiLineChartNvd3.prototype.updateValues = function () {
        var me = this;

        nv.addGraph(function () {
            var chart = nv.models.lineChart();


            chart.xAxis
                //.showMaxMin(false)
                //.tickValues(tickvalues)
                .tickFormat(function (d) {
                return d3.locale(me.locale).timeFormat('%x')(new Date(d));
                })

            ;

         
            chart.yAxis
                .tickFormat(d3.locale(me.locale)
                .numberFormat(me.numberFormat))
            ;


            d3.select("#" + me.divid + " svg")
                .datum(me.testdata())
              .transition().duration(500).call(chart);

            return chart;
        });

    };


    MultiLineChartNvd3.prototype.testdata = function () {
        var me = this;
        this.barAxis = this.axis0.Tuples().ToArray();
        var barAxis = this.barAxis;
        var colorAxis = this.axis1.Tuples().ToArray();

        var allSeries = new Array();
        for (var i = 0; i < colorAxis.length; i++) {


            var dataArray = new Array();
            for (var j = 0; j < barAxis.length; j++) {
                var val = this.getValue(barAxis[j].And(colorAxis[i]));
                dataArray.push({ y: val != null ? val : 0, x: parseInt(barAxis[j].ToCaption()) });
            }
            var series = {};
            series.values = dataArray;
            series.key = colorAxis[i].ToCaption();
            series.color = me.getColorByName(colorAxis[i].ToCaption());
            allSeries.push(series);
        }
        return allSeries;

    };

    MultiLineChartNvd3.prototype.selectionCallback = function () {
        var str = "";
        this.getSelection().each(function () {
            str += $(this).text() + " ";
        });
        alert(str);
    };



    return function (configObject) { return new MultiLineChartNvd3.prototype.constructor(configObject); };
});