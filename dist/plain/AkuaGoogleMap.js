define(["core/CoreBundle"],function(){function a(b){Apple.call(this,b);this.axis0=b.axis0}a.prototype=new Apple;a.prototype.constructor=a;a.prototype.getView=function(){return this.view=$('<div id="'+this.divid+'" style="height:500px;width:500px"  > '+this.divid+"</div> ")};a.prototype.updateValues=function(b){b=this.axis0.Tuples().ToArray();for(var a={zoom:4,center:new google.maps.LatLng(-25.363882,131.044922)},a=new google.maps.Map(this.view[0],a),d=0;d<b.length;d++){var c=b[d];this.getValue(c)&&
new google.maps.Marker({position:new google.maps.LatLng(c.elements[0].Caption.x,c.elements[0].Caption.y),map:a,title:c.elements[1].Caption+" "+this.getValue(c)})}};return function(b){return new a.prototype.constructor(b)}});