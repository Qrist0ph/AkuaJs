define(['core/CoreBundle', 'nv.d3.min'], function () {

    _StackedBarChartNvd3.prototype = new Apple();
    _StackedBarChartNvd3.prototype.constructor = _StackedBarChartNvd3;
    function _StackedBarChartNvd3(configObject) {
        Apple.call(this, configObject);
        this.barAxis = configObject.axis0;
        this.groupAxis = configObject.axis1;
        this.height = configObject.height ? configObject.height : 400;
        this.numberFormat = configObject.numberFormat ? configObject.numberFormat : ',.0f';
        this.stacked = configObject.stacked ? configObject.stacked : false;
        this.xAxisFormat = configObject.xAxisFormat ? configObject.xAxisFormat : function (d, i) { return truncateString(d, this.captionLength).replace("&hellip;", "..."); };

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

              return '<h3>' + key.data.key + '</h3>' +
    '<p>' + key.data.y.formatNumber(me.numberFormat) + '</p>';

              //return '<h3>' + key + '</h3>' +
              //    '<p>' + y + ' at ' + e.series.values[e.pointIndex].x + '</p>';
              //return '<h3>' + e.series.values[e.pointIndex].key.elements[me.textIndex].Caption + '</h3>' +
              //    '<p>' + graeph.series.values[e.pointIndex].y.formatNumber(me.numberFormat) + '</p>';
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

        me.foo44 = 0;
        me.chart.xAxis.tickFormat(function (d, i) {
            //return d3.locale(me.locale).timeformat('%x')(d);
            me.foo44 = (me.foo44 + 1) % 3;
            return me.foo44 == 1 ? d : "";
        });

        //me.chart.xAxis.tickFormat(d3.locale(me.locale).timeFormat('%x'));
        //me.chart.xAxis.tickFormat(me.xAxisFormat);


        d3.select(me.view[0]).datum(me.data()).transition().duration(500).call(me.chart);
    };


    _StackedBarChartNvd3.prototype.data = function () {
        var me = this;
        var barAxis = this.barAxis.Tuples().ToArray();
        var groupAxis = this.groupAxis.Tuples().ToArray();
        var dataArray = new Array();

        for (var j = 0; j < groupAxis.length; j++) {
            var series = { key: groupAxis[j].ToCaption(), color: me.getColorByName(groupAxis[j].ToCaption()), values: new Array() };
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