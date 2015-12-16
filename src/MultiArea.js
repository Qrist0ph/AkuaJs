define(['Core/CoreBundle', 'nv.d3.min'], function () {

    _MultiArea.prototype = new Apple();        // Here's where the inheritance occurs 
    _MultiArea.prototype.constructor = _MultiArea;       // Otherwise instances of Cat would have a constructor of Mammal 
    function _MultiArea(configObject) {
        Apple.call(this, configObject);
        this.axis0 = configObject.axis0;
        this.axis1 = configObject.axis1;
        this.height = configObject.height ? configObject.height : 1800;
        this.showLegend = configObject.showLegend != null ? configObject.showLegend : true;
        this.barAxis = this.axis0.Tuples().ToArray();
    }

    _MultiArea.prototype.getView = function () {
        var me = this;
        this.view = $('<svg class="nvd3"  id="' + 'chart-container' + '" style="height:' + me.height + 'px; width:1000px"> </svg> ');
        return this.view;
    };


    _MultiArea.prototype.updateValues = function () {
       
	   
	   //-----------------------------------
	   
	   
	   
	   
	           foo=null;
        var margin = {top: 10, right: 40, bottom: 150, left: 60},
        width = 940 - margin.left - margin.right,
        height = 1800 - margin.top - margin.bottom,
        contextHeight = 50;
        contextWidth = width * .5;
							
         svg = d3.select("#chart-container").append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", (height + margin.top + margin.bottom))
					
          
					;
												
      
						
		createChart(this.data());
		
		foo.on("mousemove", function(d, i) {
							console.log("hu"+(d?d.values:""));
									  });
        function createChart(data){
            var countries = [];
            var charts = [];
            var maxDataPoint = 0;
							
            /* Loop through first row and get each country 
                and push it into an array to use later */
            for (var prop in data[0]) {
                if (data[0].hasOwnProperty(prop)) {
                    if (prop != 'Year') {
                        countries.push(prop);
                    }
                }
            };
							
            var countriesCount = countries.length;
            var startYear = data[0].Year;
            var endYear = data[data.length - 1].Year;
            var chartHeight = height * (1 / countriesCount);
							
            /* Let's make sure these are all numbers, 
                we don't want javaScript thinking it's text 
							
                Let's also figure out the maximum data point
                We'll use this later to set the Y-Axis scale
            */
          data.forEach(function(d) {
            for (var prop in d) {
			if(prop == "Year")continue;
              if (d.hasOwnProperty(prop)) {
                d[prop] = parseFloat(d[prop]);
                
                if (d[prop] > maxDataPoint) {
                  maxDataPoint = d[prop];
                }
              }
            }
            
            // D3 needs a date object, let's convert it just one time
            d.Year = d.Year;
          });
          
          for(var i = 0; i < countriesCount; i++){
            charts.push(new Chart({
                                  data: data.slice(),
                                  id: i,
                                  name: countries[i],
                                  width: width,
                                  height: height * (1 / countriesCount),
                                  maxDataPoint: maxDataPoint,
                                  svg: svg,
                                  margin: margin,
                                  showBottomAxis: (i == countries.length - 1)
                                }));
            
          }
          
         

                    
          function onBrush(){
            /* this will return a date range to pass into the chart object */
            var b = brush.empty() ? contextXScale.domain() : brush.extent();
            for(var i = 0; i < countriesCount; i++){
              charts[i].showOnly(b);
            }
          }
          }
          
          function Chart(options){
          this.chartData = options.data;
          this.width = options.width;
          this.height = options.height;
          this.maxDataPoint = options.maxDataPoint;
          this.svg = options.svg;
          this.id = options.id;
          this.name = options.name;
          this.margin = options.margin;
          this.showBottomAxis = options.showBottomAxis;
          
          var localName = this.name;
          
          /* XScale is time based */
          this.xScale = d3.time.scale()
                                .range([0, this.width])
                                .domain(d3.extent(this.chartData.map(function(d) { return d.Year; })));
          
          /* YScale is linear based on the maxData Point we found earlier */
          this.yScale = d3.scale.linear()
                                .range([this.height,0])
                                .domain([0,this.maxDataPoint]);
          var xS = this.xScale;
          var yS = this.yScale;
          
          /* 
            This is what creates the chart.
            There are a number of interpolation options. 
            'basis' smooths it the most, however, when working with a lot of data, this will slow it down 
          */
          this.area = d3.svg.area()
                                .interpolate("step-before")
                                .x(function(d) { return xS(d.Year); })
                                .y0(this.height)
                                .y1(function(d) { return yS(d[localName]); })
								
								;
         
          /*
            Assign it a class so we can assign a fill color
            And position it on the page
          */
          this.chartContainer = svg.append("g")
                                    .attr('class',this.name.toLowerCase())
                                    .attr("transform", "translate(" + this.margin.left + "," + (this.margin.top + (this.height * this.id) + (10 * this.id)) + ")")
									
									;
          
          /* We've created everything, let's actually add it to the page */
          // hat hier irgendwas mit dem Mouse Listener zu tun
		  //foo=foo?foo:
		  foo=
		  this.chartContainer.append("path")
                              .data([this.chartData])
                              .attr("class", "chart")
                              //.attr("clip-path", "url(#clip-" + this.id + ")")
                              .attr("d", this.area)
							  
							  ;
							
							
          this.xAxisTop = d3.svg.axis().scale(this.xScale).orient("bottom");
          this.xAxisBottom = d3.svg.axis().scale(this.xScale).orient("top");
          /* We only want a top axis if it's the first country */
          if(this.id == 0){
            this.chartContainer.append("g")
                  .attr("class", "x axis top")
                  .attr("transform", "translate(0,0)")
                  .call(this.xAxisTop);
          }
          
          /* Only want a bottom axis on the last country */
          if(this.showBottomAxis){
              this.chartContainer.append("g")
                  .attr("class", "x axis bottom")
                  .attr("transform", "translate(0," + this.height + ")")
                  .call(this.xAxisBottom);
            }  
            
          this.yAxis = d3.svg.axis().scale(this.yScale).orient("left").ticks(5);
            
          this.chartContainer.append("g")
                              .attr("class", "y axis")
                              .attr("transform", "translate(-15,0)")
                              .call(this.yAxis);
                              
          this.chartContainer.append("text")
                              .attr("class","country-title")
                              .attr("transform", "translate(15,40)")
                              .text(this.name);
          
		  
		  var marker = this.chartContainer.append('circle')
  .attr('r', 7)
  .style('display', 'none')
  .style('fill', '#FFFFFF')
  .style('pointer-events', 'none')
  .style('stroke', '#FB5050')
  .style('stroke-width', '3px');
  
		   foo.on("mousemove", function(d, i) {
					marker.style('display', 'inherit');
									   var mouse = d3.mouse(this);
				marker.attr('cx', mouse[0]);
									  })
          }
          
          Chart.prototype.showOnly = function(b){
            this.xScale.domain(b);
            //this.chartContainer.select("path").data([this.chartData]).attr("d", this.area);
            this.chartContainer.select(".x.axis.top").call(this.xAxisTop);
            this.chartContainer.select(".x.axis.bottom").call(this.xAxisBottom);
          }
	   
	   
	   
	   
	   
	   
	   
	   
	   
	   
	   
	   
	   
	   
	   
	   //---------------------------------------------
    };


	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

    _MultiArea.prototype.data = function () {

	// return [{Year:new Date(2000,1,1), France:200, Germany:30},{Year:new Date(2001,1,1), France:200, Germany:30},{Year:new Date(2002,1,1), France:0, Germany:30},{Year:new Date(2003,1,1), France:100, Germany:30},{Year:new Date(2004,1,1), France:100, Germany:30},{Year:new Date(2008,1,1), France:100, Germany:30}];
	//return [{Year:"1960", France:200, Germany:30},{Year:"1961", France:200, Germany:30},{Year:"1962", France:0, Germany:30},{Year:"1963", France:100, Germany:30},{Year:"1964", France:100, Germany:30}];
	
        
		var me = this;
        var barAxis = this.axis0.Tuples().ToArray();
        var groupAxis = this.axis1.Tuples().ToArray();
        var dataArray = new Array();


		for (var i = 0; i < barAxis.length; i++) {
                var cap = barAxis[i].elements[0];
				var item = {};
				item.Year = parseInt( cap.Caption)
				
				for (var j = 0; j < groupAxis.length; j++) {
					var r = me.getValue(barAxis[i].And(groupAxis[j]));
					item[groupAxis[j].ToCaption()]= r?r:0;
				
				}
				dataArray.push(item);                
		}
			
			
        return dataArray;

       

    };

    return function (configObject) { return new _MultiArea.prototype.constructor(configObject); };
});