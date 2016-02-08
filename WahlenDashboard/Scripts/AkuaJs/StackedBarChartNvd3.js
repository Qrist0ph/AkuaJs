define(['Core/CoreBundle',   'nv.d3.min'], function () {

    _StackedBarChartNvd3.prototype = new Apple();       
    _StackedBarChartNvd3.prototype.constructor = _StackedBarChartNvd3;      
    function _StackedBarChartNvd3(configObject) {
        Apple.call(this, configObject);
        this.barAxis = configObject.axis0;
        this.groupAxis = configObject.axis1;
        this.height = configObject.height ? configObject.height : 400;
        this.numberFormat = configObject.numberFormat ? configObject.numberFormat : ',.0f';
        this.stacked = configObject.stacked ? configObject.stacked : false;
        this.colors = configObject.colors ? configObject.colors : ["#51A351", "#01A351"];
    }

    _StackedBarChartNvd3.prototype.getView = function (parent) {
        var me = this;
        this.view = $('<svg class="nvd3" id="' + me.divid + '" style="height:' + me.height + 'px"></svg> ');

        //so firefox renders svg correctly:
        this.view.attr("width", parent.width());

        return this.view;
    };

    _StackedBarChartNvd3.prototype.updateValues = function () {
        var me = this;

        //me.chart = me.chart ? me.chart : nv.models.multiBarHorizontalChart();
        me.chart = me.chart ? me.chart : nv.models.multiBarChart()
          .reduceXTicks(false)
          .tooltipContent(function (key, x, y, e, graph) {
                return '<h3>' + key + '</h3>' +
                    '<p>' + y + ' at ' + x + '</p>';
          })

        .showControls(false)
        .stacked(me.stacked)

        ;
        me.chart.xAxis
        .staggerLabels(true)
        ;
        me.chart.yAxis
        //.tickFormat(d3.format(me.numberFormat));
        .tickFormat(d3.locale(me.locale).numberFormat(me.numberFormat));

        d3.select(me.view[0]).datum(me.data()).transition().duration(500).call(me.chart);
    };


    _StackedBarChartNvd3.prototype.data = function () {
        var me = this;
        var barAxis = this.barAxis.Tuples().ToArray();
        var groupAxis = this.groupAxis.Tuples().ToArray();
        var dataArray = new Array();

        for (var j = 0; j < groupAxis.length; j++) {
            var series = { key: groupAxis[j].ToCaption(), color: me.colors[j%me.colors.length], values: new Array() };
            dataArray.push(series);
            for (var i = 0; i < barAxis.length; i++) {

                series.values.push({ x: barAxis[i].ToCaption(), y: me.getValue(barAxis[i].And(groupAxis[j])) });
            }
        }


        return dataArray;

    };

    _StackedBarChartNvd3.prototype.selectionCallback = function () {
        str = "";
        this.getSelection().each(function () {
            str += $(this).text() + " ";
        });
        alert(str);
    };


    return function (configObject) { return new _StackedBarChartNvd3.prototype.constructor(configObject); };
});