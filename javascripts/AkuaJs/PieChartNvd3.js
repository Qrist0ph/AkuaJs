define(["core/CoreBundle","nv.d3.min"],function(){function c(a){Apple.call(this,a);this.axis0=a.axis0;this.height=a.height?a.height:400;this.donut=a.donut?a.donut:!1;this.colors=a.colors?a.colors:["#51A351","#01A351"]}c.prototype=new Apple;c.prototype.constructor=c;c.prototype.getView=function(a){this.view=$('<svg  id="'+this.divid+'" class="nvd3"  style="height:'+this.height+'px"></svg> ');this.view.attr("width",a.width());return this.view};c.prototype.updateValues=function(a){var b=this;nv.addGraph(function(){b.chart=
b.chart?b.chart:window.nv.models.pieChart().x(function(a){return a.key}).y(function(a){return a.y}).showLabels(!0).showLegend(!1).color(b.colors).labelType("key");b.donut&&b.chart.donut(!0).donutRatio(.35);d3.select("#"+b.divid).datum(b.testdata()).transition().duration(1200).call(b.chart);b.chart.valueFormat(d3.locale(b.locale).numberFormat(b.numberFormat));return b.chart})};c.prototype.testdata=function(){for(var a=this.axis0.Tuples().ToArray(),b=[],c=0;c<a.length;c++){var d=this.getValue(a[c]);
b.push({key:a[c].ToCaption(),y:d?d:0})}return b};c.prototype.selectionCallback=function(){str="";this.getSelection().each(function(){str+=$(this).text()+" "});alert(str)};return function(a){return new c.prototype.constructor(a)}});
