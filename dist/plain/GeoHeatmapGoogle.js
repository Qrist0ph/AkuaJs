define(["core/CoreBundle"],function(){function d(a){Apple.call(this,a);this.axis0=a.axis0;this.showMarkers=a.showMarkers;this.zoom=a.zoom?a.zoom:2;this.center=a.center?new google.maps.LatLng(a.center.lat,a.center.lng):new google.maps.LatLng(48.3333,16.35)}d.prototype=new Apple;d.prototype.constructor=d;d.prototype.getView=function(){var a="<style>\t#"+this.divid+"  {width:800px;height:600px;border:1px dashed black;}</style>";return this.view=$("<div />").html(a+'<div  id="'+this.divid+'"  > </div> ')};
d.prototype.updateValues=function(){var a=this;new google.maps.LatLng(48.3333,16.35);var c={zoom:a.zoom,center:a.center,mapTypeId:google.maps.MapTypeId.ROADMAP,disableDefaultUI:!1,scrollwheel:!0,draggable:!0,navigationControl:!0,mapTypeControl:!1,scaleControl:!0,disableDoubleClickZoom:!1};map=new google.maps.Map(document.getElementById(a.divid),c);heatmap=new HeatmapOverlay(map,{radius:2,maxOpacity:.8,scaleRadius:!0,useLocalExtrema:!1,latField:"lat",lngField:"lng",valueField:"count"});var b=a.data();
if(a.showMarkers)for(c=0;c<b.data.length;c++){var d=new google.maps.Marker({position:{lat:b.data[c].lat,lng:b.data[c].lng},map:map,title:b.data[c].key+": "+d3.locale(a.locale).numberFormat(a.numberFormat)(b.data[c].count)}),e=b.data[c].tuple,f=b.data[c].count;a.click&&d.addListener("click",function(){a.click(e,f)})}google.maps.event.addListenerOnce(map,"idle",function(){heatmap.setData(b)})};d.prototype.data=function(){for(var a=this.axis0.Tuples().ToArray(),c={max:-Infinity,data:[]},b=0;b<a.length;b++)c.max=
this.getValue(a[b])>c.max?this.getValue(a[b]):c.max,c.data.push({key:a[b].elements[1].Caption,lat:a[b].elements[0].Caption.lat,lng:a[b].elements[0].Caption.lng,count:this.getValue(T([a[b].elements[0]])),tuple:a[b]});return c};d.prototype.selectionCallback=function(){str="";this.getSelection().each(function(){str+=$(this).text()+" "});alert(str)};return function(a){return new d.prototype.constructor(a)}});