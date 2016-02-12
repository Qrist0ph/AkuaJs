define(['core/CoreBundle', 'nv.d3.min'], function () {


    AnnotatedMultiLineChart.prototype = new Apple();        // Here's where the inheritance occurs 
    AnnotatedMultiLineChart.prototype.constructor = AnnotatedMultiLineChart;       // Otherwise instances of Cat would have a constructor of Mammal 
    function AnnotatedMultiLineChart(configObject) {
        Apple.call(this, configObject);      
     
        this.height = configObject.height ? configObject.height : 400;
        this.divid = guid();
    }

    AnnotatedMultiLineChart.prototype.getSelection = function () {
        return [];
    };

    AnnotatedMultiLineChart.prototype.getView = function () {
        var me = this;
        this.view = $('<div id="' + me.divid + '">  </div> ');
        return this.view;
    };

    AnnotatedMultiLineChart.prototype.updateValues = function () {
        var me = this;

         google.charts.load('current', {'packages':['annotationchart']});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('date', 'Date');
        data.addColumn('number', 'Kepler-22b mission');
        data.addColumn('string', 'Kepler title');
        data.addColumn('string', 'Kepler text');
        data.addColumn('number', 'Gliese 163 mission');
        data.addColumn('string', 'Gliese title');
        data.addColumn('string', 'Gliese text');
        data.addRows([
          [new Date(2314, 2, 15), 12400, undefined, undefined,
                                  10645, undefined, undefined],
          [new Date(2314, 2, 16), 24045, 'Lalibertines', 'First encounter',
                                  12374, undefined, undefined],
          [new Date(2314, 2, 17), 35022, 'Lalibertines', 'They are very tall',
                                  15766, 'Gallantors', 'First Encounter'],
          [new Date(2314, 2, 18), 12284, 'Lalibertines', 'Attack on our crew!',
                                  34334, 'Gallantors', 'Statement of shared principles'],
          [new Date(2314, 2, 19), 8476, 'Lalibertines', 'Heavy casualties',
                                  66467, 'Gallantors', 'Mysteries revealed'],
          [new Date(2314, 2, 20), 0, 'Lalibertines', 'All crew lost',
                                  79463, 'Gallantors', 'Omniscience achieved']
        ]);

        var chart = new google.visualization.AnnotationChart(me.view[0]);

        var options = {
          displayAnnotations: true,
          fill: 10,
          thickness: 5
        };

        chart.draw(data, options);
      }

    };


    AnnotatedMultiLineChart.prototype.testdata = function () {
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

    AnnotatedMultiLineChart.prototype.selectionCallback = function () {
        var str = "";
        this.getSelection().each(function () {
            str += $(this).text() + " ";
        });
        alert(str);
    };



    return function (configObject) { return new AnnotatedMultiLineChart.prototype.constructor(configObject); };
});