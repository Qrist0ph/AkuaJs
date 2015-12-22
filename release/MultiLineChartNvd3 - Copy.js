
MultiLineChartNvd3.prototype = new Apple();        // Here's where the inheritance occurs 
MultiLineChartNvd3.prototype.constructor = MultiLineChartNvd3;       // Otherwise instances of Cat would have a constructor of Mammal 
function MultiLineChartNvd3(configObject) {
    this.axis0 = configObject.axis0;
    this.axis1 = configObject.axis1;
    this.slicer = configObject.slicer;
    this.divid = guid();
}

MultiLineChartNvd3.prototype.getSelection = function () {
    return [];
};

MultiLineChartNvd3.prototype.getView = function () {
    var me = this;
    this.view = $('<div id="' + me.divid + '">  <svg style="height: 300px;"></svg></div> ');
    this.view.ready(function () { me.render(); });
    return this.view;
};

MultiLineChartNvd3.prototype.render = function () {
    var me = this;



    nv.addGraph(function () {
        var chart = nv.models.lineChart();

        //chart.xAxis.tickFormat(d3.format(',f'));       
        //chart.yAxis.tickFormat(d3.format(',.1f'));  
        d3.select("#" + me.divid + " svg")
            .datum(me.testdata())
          .transition().duration(500).call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
    });

};


MultiLineChartNvd3.prototype.testdata = function () {

    var barAxis = this.axis0[0].tuples;
    var colorAxis = this.axis1[0].tuples;

    var allSeries = new Array();
    for (var i = 0; i < colorAxis.length; i++) {


        var dataArray = new Array();
        for (var j = 0; j < barAxis.length; j++) {
            var val = this.getValue(barAxis[j].And(colorAxis[i]));
            dataArray.push({ y: val != null ? val : 0, x: j });
        }
        var series = {};
        series.values = dataArray;
        series.key = colorAxis[i].ToCaption();
        allSeries.push(series);
    }
     return allSeries;


    var sin = [],
       cos = [];

    for (var i = 0; i < 100; i++) {
        sin.push({ x: i, y: Math.sin(i / 10) });
        cos.push({ x: i, y: .5 * Math.cos(i / 10) });
    }

    var foo = [
      {
          values: sin,
          key: 'Sine Wave',
          color: '#ff7f0e'
      },
      {
          values: cos,
          key: 'Cosine Wave',
          color: '#2ca02c'
      }
    ];
    return foo;

};

MultiLineChartNvd3.prototype.selectionCallback = function () {
    str = "";
    this.getSelection().each(function () {
        str += $(this).text() + " ";
    });
    alert(str);
};
