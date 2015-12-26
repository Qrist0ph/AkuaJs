define(['core/CoreBundle', 'nv.d3.min'], function () {

    _StackedAreaChartNvd3.prototype = new Apple();        // Here's where the inheritance occurs 
    _StackedAreaChartNvd3.prototype.constructor = _StackedAreaChartNvd3;       // Otherwise instances of Cat would have a constructor of Mammal 
    function _StackedAreaChartNvd3(configObject) {
        Apple.call(this, configObject);
        this.axis0 = configObject.axis0;
        this.axis1 = configObject.axis1;
        this.height = configObject.height ? configObject.height : 400;
        this.showLegend = configObject.showLegend != null ? configObject.showLegend : true;
        this.barAxis = this.axis0.Tuples().ToArray();
        this.style = configObject.style ? configObject.style : 'stream-center';
    }

    _StackedAreaChartNvd3.prototype.getView = function () {
        var me = this;
        this.view = $('<svg class="nvd3"  id="' + me.divid + '" style="height:' + me.height + 'px"> </svg> ');
        return this.view;
    };


    _StackedAreaChartNvd3.prototype.updateValues = function () {
        var me = this;

        me.chart = me.chart ? me.chart : nv.models.stackedAreaChart()
                  .margin({ right: 100 })
                  //.x(function(d) { return d.x[0] })   //We can modify the data accessor functions...
                  //.y(function(d) { return d[1] })   //...in case your data is formatted differently.
                  .useInteractiveGuideline(true)    //Tooltips which show all data points. Very nice!
                  .rightAlignYAxis(true)      //Let's move the y-axis to the right side.
                  //.transitionDuration(500)
                  .showControls(false)       //Allow user to choose 'Stacked', 'Stream', 'Expanded' mode.
                  .clipEdge(true)
                  .style(me.style)
                  .showLegend(me.showLegend);

        ;

        //Format x-axis labels with custom function.
        me.chart.xAxis.tickFormat(function (d) {
            return d3.time.format('%x')(new Date(d));
        });

        // me.chart.yAxis.tickFormat(d3.format(',.2f'));
        me.chart.yAxis.tickFormat(d3.locale(me.locale).numberFormat(me.numberFormat));


        d3.select(me.view[0])
            .attr("height", 500)
            .datum(me.testdata())
            .call(me.chart);

        nv.utils.windowResize(me.chart.update);

        return me.chart;
    };



    _StackedAreaChartNvd3.prototype.testdata = function () {
        var me = this;
        var barAxis = this.axis0.Tuples().ToArray();
        var groupAxis = this.axis1.Tuples().ToArray();
        var dataArray = new Array();

        for (var j = 0; j < groupAxis.length; j++) {
            var series = { key: groupAxis[j].ToCaption(), values: new Array() };
            dataArray.push(series);
            for (var i = 0; i < barAxis.length; i++) {
                var cap = barAxis[i].elements[0];
                series.values.push({ x: cap ? parseInt( cap.Caption) : "", y: me.getValue(barAxis[i].And(groupAxis[j])) });
            }
        }

        return dataArray;

       
    };

    return function (configObject) { return new _StackedAreaChartNvd3.prototype.constructor(configObject); };
});