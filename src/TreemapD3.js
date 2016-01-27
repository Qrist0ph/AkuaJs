define(['core/CoreBundle', 'nv.d3.min'], function () {
    _TreemapD3.prototype = new Apple();
    _TreemapD3.prototype.constructor = _TreemapD3;
    function _TreemapD3(configObject) {
        Apple.call(this, configObject);

        this.axis0 = configObject.axis0;

        this.size = configObject.pkm0 ? configObject.pkm0 : T([]);
        this.color = configObject.pkm1 ? configObject.pkm1 : T([]);
        this.divid = guid();
        this.height = configObject.height ? configObject.height : 400;
        this.pkm0Name = configObject.pkm0Name ? configObject.pkm0Name : "Value 1";
        this.pkm1Name = configObject.pkm1Name ? configObject.pkm1Name : "Value 2";

    }


    _TreemapD3.prototype.getView = function () {
        var me = this;

        var css = '<style>	' +
        ' .TreeTooltip {position: absolute;border:1px solid;margin:10px;padding: 6px;opacity: 0.9;z-index: 1000;} ' +
        '#' + me.divid + ' .node {border: solid 1px white;font: 10px sans-serif;line-height: 12px;overflow: hidden;position: absolute;text-indent: 2px;} </style>'

        this.view = $('<div />').html(css + '<div  id="' + me.divid + '"  ></div> ');

        return this.view;
    };

    _TreemapD3.prototype.updateValues = function () {
        var me = this;

        var margin = { top: 0, right: 0, bottom: 0, left: 0 },
            width = $("#" + me.divid).parent().parent().width(),
            height = me.height;

        me.chart = d3.layout.treemap()
           .size([width, height])
           .value(function (d) { return d.size; });

        var div = d3.select("#" + me.divid)
        .style("position", "relative")
        .style("width", (width + margin.left + margin.right) + "px")
        .style("height", (height + margin.top + margin.bottom) + "px")
        .style("left", margin.left + "px")
        .style("top", margin.top + "px");


        var tooltip = d3.select("body")
            .append("div")
       .attr('class', 'TreeTooltip')
       .style("visibility", "hidden")
       .style("background-color", "#ffffff");

        div.datum(me.testdata()).selectAll(".node")
            .data(me.chart.nodes)
            .enter()
            .append("div")
                 .attr("class", "node")
                 .call(position)
                  .style("cursor", "pointer")
                 .style("background", function (d) { return d.color ? d.color : null; })
                 .text(function (d) { return d.children ? null : me.writeTupleText(d.name); })
         .on("mouseover", function (d) {

             if (!d.size) return;
             tooltip.html(me.writeTupleText(d.name)
                 + " " + me.pkm0Name + " "
                 + d3.locale(me.locale).numberFormat(me.numberFormat)(d.size)
                 + " - "
                 + me.pkm1Name + " "
                 + d3.locale(me.locale).numberFormat(me.numberFormat)(d.pkm1));
             tooltip.style("visibility", "visible");
             this.style.cursor = "hand";
         }).on("mousemove", function () {
             tooltip
               .style("top", (d3.event.pageY) + "px")
               .style("left", (d3.event.pageX) + "px");
         })
          .on("mouseout", function () {
              tooltip.style("visibility", "hidden");
          })
          .on("click", function (d) {
              if (!d.size) return;
              if (me.click) me.click(d);
          });
        ;

        function position() {
            this.style("left", function (d) { return d.x + "px"; })
                .style("top", function (d) { return d.y + "px"; })
                .style("width", function (d) { return Math.max(0, d.dx - 1) + "px"; })
                .style("height", function (d) { return Math.max(0, d.dy - 1) + "px"; });
        }
    };

    _TreemapD3.prototype.testdata = function () {

        var barAxis = this.axis0.Tuples().ToArray();

        var max = -Infinity;
        for (var i = 0; i < barAxis.length; i++) {
            var colorVal = Math.abs(this.getValue(barAxis[i].And(this.color)));
            max = colorVal > max ? colorVal : max;
        }

        var dataArray = new Array();
        for (var i = 0; i < barAxis.length; i++) {
            var value = this.getValue(barAxis[i].And(this.color));
            var colorVal = value / max;
            var color = colorVal < 0 ? ColorLuminance("FF0000", 1 + colorVal) : ColorLuminance("00FF00", 1 - colorVal);

            dataArray.push({ name: barAxis[i], size: this.getValue(barAxis[i].And(this.size)), color: color, pkm1: value });
        }

        return {
            "name": "flare",
            "children": dataArray
        };
    };

    _TreemapD3.prototype.selectionCallback = function () {
        str = "";
        this.getSelection().each(function () {
            str += $(this).text() + " ";
        });
        alert(str);
    };

    return function (configObject) { return new _TreemapD3.prototype.constructor(configObject); };
});