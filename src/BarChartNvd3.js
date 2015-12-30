define(['core/CoreBundle', 'nv.d3.min'], function () {

    _BarChartNvd3.prototype = new Apple();
    _BarChartNvd3.prototype.constructor = _BarChartNvd3;
    function _BarChartNvd3(configObject) {
        Apple.call(this, configObject);
        this.axis0 = configObject.axis0;
        this.height = configObject.height ? configObject.height : 400;
        this.captionLength = configObject.captionLength;       
        this.xAxisFormat = configObject.xAxisFormat ? configObject.xAxisFormat : function (d, i) { return truncateString(d, this.captionLength).replace("&hellip;", "..."); };
    }

    _BarChartNvd3.prototype.getView = function () {
        var me = this;
        this.view = $('<div id="' + me.divid + '">  <svg style="height: ' + me.height + 'px;" class="nvd3"></svg></div> ');
        //this.view = $('<div id="' + me.divid + '">  <svg style="height: 400px;" class="nvd3"></svg></div> ');
        return this.view;
    };

    _BarChartNvd3.prototype.updateValues = function () {
        var me = this;
        nv.addGraph(function () {
            me.chart = me.chart ? me.chart : window.nv.models.discreteBarChart()
                .x(function (d) {
                    return d.key.ToCaption();
                })
                .y(function (d) { return d.y; })
                .tooltips(true)
                .staggerLabels(true)
                .tooltipContent(function (key) {

                    return '<h3>' + key.data.key.ToCaption() + '</h3>' +
                     '<p>' + d3.locale(me.locale).numberFormat(me.numberFormat)(key.data.y) + '</p>';                       
                })
                .color(me.colors);

            me.chart.xAxis.tickFormat(me.xAxisFormat);


            d3.select("#" + me.divid + " svg")
                .datum(me.testdata())
                .transition().duration(1200)
                .call(me.chart);


            if (me.actAsFilter)
                me.chart.discretebar.dispatch.on('elementClick', function (e) {

                    me.selected = e.data.key;

                    //reset previously selected bar
                    if (me.selectedBar)
                        me.selectedBar.style("fill", me.selectedStyle);

//                     me.selectedBar = d3.select(e.e.target);
//                     me.selectedStyle = me.selectedBar.style()[0][0].style.fill;
// 
//                     me.selectedBar.style("fill", "#0ff");
                    if (me.parent) me.parent.onSelectionChanged(me);
                });
            nv.utils.windowResize(me.chart.update);
           
            return me.chart;
        });

    };


    _BarChartNvd3.prototype.testdata = function () {
        var barAxis = this.axis0.Tuples().ToArray();
        var dataArray = new Array();
        this.textIndex = 0;
        for (var i = 0; i < barAxis[0].elements.length; i++) {
            if (barAxis[0].elements[i].Dimension.Caption == "text") this.textIndex = i;
        }

        for (var i = 0; i < barAxis.length; i++) {
            dataArray.push({ key: barAxis[i], y: this.getValue(barAxis[i]) });
        }

        return [{ key: "Cumulative Return", values: dataArray }];
    };



    _BarChartNvd3.prototype.getSelection = function () {
        var r = [];
        if (this.selected) r.push(this.selected);
        return Enumerable.From(r);
    }

    return function (configObject) { return new _BarChartNvd3.prototype.constructor(configObject); };
});