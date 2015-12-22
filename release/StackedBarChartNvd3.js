define(["Core/CoreBundle","nv.d3.min"],function(){function b(a){Apple.call(this,a);this.barAxis=a.axis0;this.groupAxis=a.axis1;this.height=a.height?a.height:400;this.numberFormat=a.numberFormat?a.numberFormat:",.0f";this.stacked=a.stacked?a.stacked:!1;this.xAxisFormat=a.xAxisFormat?a.xAxisFormat:function(a,b){return truncateString(a,this.captionLength).replace("&hellip;","...")}}b.prototype=new Apple;b.prototype.constructor=b;b.prototype.getView=function(a){this.view=$('<svg class="nvd3" id="'+this.divid+
'" style="height:'+this.height+'px"></svg> ');this.view.attr("width",a.width());return this.view};b.prototype.updateValues=function(){var a=this;a.chart=a.chart?a.chart:nv.models.multiBarChart().reduceXTicks(!1).tooltipContent(function(b,e,c,f,d){return"<h3>"+b.data.key+"</h3><p>"+b.data.y.formatNumber(a.numberFormat)+"</p>"}).showControls(!1).stacked(a.stacked);a.chart.xAxis.staggerLabels(!0);a.chart.yAxis.tickFormat(d3.locale(a.locale).numberFormat(a.numberFormat));a.foo44=0;a.chart.xAxis.tickFormat(function(b,
e){a.foo44=(a.foo44+1)%3;return 1==a.foo44?b:""});d3.select(a.view[0]).datum(a.data()).transition().duration(500).call(a.chart)};b.prototype.data=function(){for(var a=this.barAxis.Tuples().ToArray(),b=this.groupAxis.Tuples().ToArray(),e=[],c=0;c<b.length;c++){var f={key:b[c].ToCaption(),color:this.getColorByName(b[c].ToCaption()),values:[]};e.push(f);for(var d=0;d<a.length;d++)f.values.push({x:a[d].ToCaption(),y:this.getValue(a[d].And(b[c]))})}return e};b.prototype.selectionCallback=function(){str=
"";this.getSelection().each(function(){str+=$(this).text()+" "});alert(str)};return function(a){return new b.prototype.constructor(a)}});
