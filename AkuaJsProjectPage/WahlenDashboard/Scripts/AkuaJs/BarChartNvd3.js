define(['Core/CoreBundle', 'nv.d3.min'], function() {

	_BarChartNvd3.prototype = new Apple();        
	_BarChartNvd3.prototype.constructor= _BarChartNvd3;       
	function _BarChartNvd3(configObject){
		Apple.call(this, configObject);
		this.axis0 = configObject.axis0;
		this.height = configObject.height ? configObject.height : 400;
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
	        me.chart = me.chart?me.chart: window.nv.models.discreteBarChart()
	            .x(function(d) { return d.key.ToCaption(); })
	            .y(function(d) { return d.y; })
	            .tooltips(true).staggerLabels(true)
				.color(['#aec7e8', '#7b94b5', '#486192'])				
				;

	        d3.select("#" + me.divid + " svg")			
                .datum(me.testdata())
              .transition().duration(1200)
                .call(me.chart)
			
			
			if(me.actAsFilter)	
			me.chart.discretebar.dispatch.on('elementClick', function(e){
				//console.log('element: ' + e.value);
				//console.log(e.point.key.ToCaption());
				//e.e.explicitOriginalTarget.attributes.style = "color:rgb(100,0,0);"
				me.selected = e.point.key;
				//d3.selectAll("rect").style("fill","#0ff");
				
				//reset previously selected bar
				if(me.selectedBar)
					me.selectedBar.style("fill",me.selectedStyle);
					
				me.selectedBar =d3.select(e.e.target);
				me.selectedStyle = me.selectedBar.style()[0][0].style.fill;
				
				me.selectedBar.style("fill","#0ff");
				if(me.parent)me.parent.onSelectionChanged(me);
			});
	        nv.utils.windowResize(me.chart.update);
	        return me.chart;
	    });
		
		
		 
	};


	_BarChartNvd3.prototype.testdata = function () {	    
	    var barAxis = this.axis0.Tuples().ToArray();
	    var dataArray = new Array();
	    for (var i = 0; i < barAxis.length; i++) {
	        dataArray.push({ key: barAxis[i], y: this.getValue(barAxis[i]) });
	    }
		
	    return [   { key: "Cumulative Return", values: dataArray  } ];
	};	
		
	
	
	_BarChartNvd3.prototype.getSelection = function() {    
		r =[];
		if(this.selected)r.push(this.selected );
		return Enumerable.From(r);
	}

    return function(configObject) { return new _BarChartNvd3.prototype.constructor(configObject); };
});