define(['core/CoreBundle', 'nv.d3.min'], function () {

    _Sunburst.prototype = new Apple();
    _Sunburst.prototype.constructor = _Sunburst;
    function _Sunburst(configObject) {
        Apple.call(this, configObject);
        this.axis0 = configObject.axis0;
        this.schulden = configObject.schulden ? configObject.schulden : 0;
        this.height = configObject.height ? configObject.height : 400;
        this.captionLength = configObject.captionLength;
        this.numberFormat = configObject.numberFormat ? configObject.numberFormat : [2, ',', '.', ''];
        //http://www.rapidtables.com/web/color/RGB_Color.htm


       
    }

    _Sunburst.prototype.getView = function () {
        var me = this;
        var top = me.height / 2 - 50;
        var width = this.viewFrame.parent().width() - 50;
        var css = '<style>	 #' + me.divid + ' .outer { display: table; height: 100%; width: 100%; }' +
            ' #' + me.divid + ' .middle { display: table-cell; vertical-align: middle; } ' +
            '#' + me.divid + ' .inner { margin-left: auto; margin-right: auto; width:' + width + 'px  } ' +
            '  #' + me.divid + ' .mainn {  float: left;  }' +
            ' #' + me.divid + ' sidebar {  float: right;  width: 100px;}' +
            ' #' + me.divid + ' sequence {  width: 600px;  height: 70px;} ' +
            '#' + me.divid + ' .legend {  padding: 10px 0 0 3px;} ' +
            '#' + me.divid + ' .sequence text, #' + me.divid + ' .legend text {  font-weight: 600;  fill: #fff;} ' +
            '#' + me.divid + ' .chart {  position: relative;} ' +
            '#' + me.divid + ' .chart path {  stroke: #fff;} ' +
            '#' + me.divid + ' .explanation {  position: absolute;  top: ' + top + 'px;   text-align: center;  color: #666; width: 100% ;pointer-events:none} ' +
            '#' + me.divid + ' .percentage {  font-size: 2.5em; }	</style>';

        var content = css + '<div class="mainn outer"><div class="middle"><div class="inner">' +
            '<div class="sequence"></div>' +
            '<div class="chart" >' +
            '<div class="explanation" style="visibility: hidden;">' +
            '<span class="percentage" style="text-align:center"></span>' +
            '<br/>' +
            ' </div>' +
            '</div></div></div></div>';
        this.view = $('<div id="' + me.divid + '"/>').html(content);

        return this.view;
    };




    _Sunburst.prototype.updateValues = function () {



        // Dimensions of sunburst.
        //var width = this.height - 150;
        var width = this.view.parent().parent().parent().parent().width() - 60;
        var height = this.height-50;
        var radius = Math.min(width, height) / 2;
        var me = this;

        // Breadcrumb dimensions: width, height, spacing, width of tip/tail.
        var b = {
            w: 130, h: 30, s: 3, t: 10
        };

        // Mapping of step names to colors.


        // Total size of all segments; we set this later, after loading the data.
        var totalSize = 0;

        //var vis = d3.select("#" + me.divid + " .chart").append("svg:svg")
        var vis = d3.select("#" + me.divid + " .chart").append("svg:svg")
            .attr("width", width)
            .attr("height", height)
            .append("svg:g")
            .attr("class", "container")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var partition = d3.layout.partition()
            .size([2 * Math.PI, radius * radius])
            .value(function (d) { return d.size; });

        var arc = d3.svg.arc()
            .startAngle(function (d) { return d.x; })
            .endAngle(function (d) { return d.x + d.dx; })
            .innerRadius(function (d) { return Math.sqrt(d.y); })
            .outerRadius(function (d) { return Math.sqrt(d.y + d.dy); });

        // Use d3.text and d3.csv.parseRows so that we do not need to have a header
        // row, and can receive the csv as an array of arrays.
        var csvText = "account-account-account-account-account-account,22781\naccount-account-account-account-account-foo,2781";
        var csv = d3.csv.parseRows(csvText);
        var json = this.buildHierarchy(csv);
        createVisualization(json);
        /*  
        d3.text("visit-sequences.csv", function(text) {
          var csv = d3.csv.parseRows(text);
          var json = buildHierarchy(csv);
          createVisualization(json);
        });
        */
        // Main function to draw and set up the visualization, once we have the data.
        function createVisualization(json) {

            // Basic setup of page elements.
            initializeBreadcrumbTrail();
            drawLegend();
            d3.select("#" + me.divid + " .togglelegend").on("click", toggleLegend);

            // Bounding circle underneath the sunburst, to make it easier to detect
            // when the mouse leaves the parent g.
            vis.append("svg:circle")
                .attr("r", radius)
                .style("opacity", 0);

            // For efficiency, filter nodes to keep only those large enough to see.
            var nodes = partition.nodes(json)
                .filter(function (d) {
                    return (d.dx > 0.005); // 0.005 radians = 0.29 degrees
                });

            var path = vis.data([json]).selectAll("path")
                .data(nodes)
                .enter().append("svg:path")
                .attr("display", function (d) { return d.depth ? null : "none"; })
                .attr("d", arc)
                .attr("fill-rule", "evenodd")
                .style("fill", function (d) {
                    return me.getColorByName(d.name);
                })
                .style("opacity", 1)
                .on("mouseover", mouseover);

            // Add the mouseleave handler to the bounding circle.
            //d3.select("#" + me.divid + " .container").on("mouseleave", mouseleave);
            d3.select("#" + me.divid + " ").on("mouseleave", mouseleave);

            // Get total size of the tree = value of root node from partition.
            totalSize = path.node().__data__.value;
        };

        // Fade all but the current sequence, and show it in the breadcrumb trail.
        function mouseover(d) {

            var percentage = (100 * d.value / (totalSize + me.schulden)).toPrecision(3);
            var percentageString = percentage + "%";
            if (percentage < 0.1) {
                percentageString = "< 0.1%";
            }

            d3.select("#" + me.divid + " .percentage")
                .html(d.value.formatMoney(0, ',', '.', '&euro;') + " </br> " + percentageString);

            d3.select("#" + me.divid + " .explanation")
                .style("visibility", "");

            var sequenceArray = getAncestors(d);
            updateBreadcrumbs(sequenceArray, percentageString);

            // Fade all the segments.
            d3.selectAll("path")
                .style("opacity", 0.3);

            // Then highlight only those that are an ancestor of the current segment.
            vis.selectAll("path")
                .filter(function (node) {
                    return (sequenceArray.indexOf(node) >= 0);
                })
                .style("opacity", 1);
        }

        // Restore everything to full opacity when moving off the visualization.
        function mouseleave(d) {
            console.log("leave");
            // Hide the breadcrumb trail
            //d3.select("#" + me.divid + " .trail")
            //    .style("visibility", "hidden");

            // Deactivate all segments during transition.
            d3.selectAll("path").on("mouseover", null);

            // Transition each segment to full opacity and then reactivate it.
            d3.selectAll("path")
                .transition()
                .duration(100)
                .style("opacity", 1)
                .each("end", function () {
                    d3.select(this).on("mouseover", mouseover);
                });

            //d3.select("#" + me.divid + " .explanation")
            //    .style("visibility", "hidden");
        }

        // Given a node in a partition layout, return an array of all of its ancestor
        // nodes, highest first, but excluding the root.
        function getAncestors(node) {
            var path = [];
            var current = node;
            while (current.parent) {
                path.unshift(current);
                current = current.parent;
            }
            return path;
        }

        function initializeBreadcrumbTrail() {
            // Add the svg area.
            var trail = d3.select("#" + me.divid + " .sequence").append("svg:svg")
                .attr("width", width)
                .attr("height", 50)
                .attr("class", "trail");
            // Add the label at the end, for the percentage.
            trail.append("svg:text")
              .attr("id", "endlabel")
              .style("fill", "#000");
        }

        // Generate a string that describes the points of a breadcrumb polygon.
        function breadcrumbPoints(d, i) {
            var points = [];
            points.push("0,0");
            points.push(b.w + ",0");
            points.push(b.w + b.t + "," + (b.h / 2));
            points.push(b.w + "," + b.h);
            points.push("0," + b.h);
            if (i > 0) { // Leftmost breadcrumb; don't include 6th vertex.
                points.push(b.t + "," + (b.h / 2));
            }
            return points.join(" ");
        }

        // Update the breadcrumb trail to show the current sequence and percentage.
        function updateBreadcrumbs(nodeArray, percentageString) {

            // Data join; key function combines name and depth (= position in sequence).
            var g = d3.select("#" + me.divid + " .trail")
                .selectAll("g")
                .data(nodeArray, function (d) { return d.name + d.depth; });

            // Add breadcrumb and label for entering nodes.
            var entering = g.enter().append("svg:g");

            entering.append("svg:polygon")
                .attr("points", breadcrumbPoints)
                .style("fill", function (d) {
                    return me.getColorByName(d.name);
                });

            entering.append("svg:text")
                .attr("x", (b.w + b.t) / 2)
                .attr("y", b.h / 2)
                .attr("dy", "0.35em")
                .attr("text-anchor", "middle")
                .text(function (d) {
                    //speziell für Stockato
                    //return d.name;
                    var parts = d.name.split("-");
                    return parts[parts.length - 1];
                });

            // Set position for entering and updating nodes.
            g.attr("transform", function (d, i) {
                return "translate(" + i * (b.w + b.s) + ", 0)";
            });

            // Remove exiting nodes.
            g.exit().remove();

            // Now move and update the percentage at the end.
            d3.select("#" + me.divid + " .trail").select("#" + me.divid + " .endlabel")
                .attr("x", (nodeArray.length + 0.5) * (b.w + b.s))
                .attr("y", b.h / 2)
                .attr("dy", "0.35em")
                .attr("text-anchor", "middle")
                .text(percentageString);

            // Make the breadcrumb trail visible, if it's hidden.
            d3.select("#" + me.divid + " .trail")
                .style("visibility", "");

        }

        function drawLegend() {

            // Dimensions of legend item: width, height, spacing, radius of rounded rect.
            var li = {
                w: 75, h: 30, s: 3, r: 3
            };

            var legend = d3.select("#" + me.divid + " .legend").append("svg:svg")
                .attr("width", li.w)
                .attr("height", d3.keys(me.colors).length * (li.h + li.s));

            var g = legend.selectAll("g")
                .data(d3.entries(me.colors))
                .enter().append("svg:g")
                .attr("transform", function (d, i) {
                    return "translate(0," + i * (li.h + li.s) + ")";
                });

            g.append("svg:rect")
                .attr("rx", li.r)
                .attr("ry", li.r)
                .attr("width", li.w)
                .attr("height", li.h)
                .style("fill", function (d) { return d.value; });

            g.append("svg:text")
                .attr("x", li.w / 2)
                .attr("y", li.h / 2)
                .attr("dy", "0.35em")
                .attr("text-anchor", "middle")
                .text(function (d) { return d.key; });
        }

        function toggleLegend() {
            var legend = d3.select("#" + me.divid + " .legend");
            if (legend.style("visibility") == "hidden") {
                legend.style("visibility", "");
            } else {
                legend.style("visibility", "hidden");
            }
        }

    };



    // Take a 2-column CSV and transform it into a hierarchical structure suitable
    // for a partition layout. The first column is a sequence of step names, from
    // root to leaf, separated by hyphens. The second column is a count of how 
    // often that sequence occurred.
    _Sunburst.prototype.buildHierarchy = function (csv) {
        var root = { "name": "root", "children": [] };

        var barAxis = this.axis0.Tuples().ToArray();

        for (var i = 0; i < barAxis.length; i++) {
            var size = this.getValue(barAxis[i]);
            if (isNaN(size)) { // e.g. if this is a header row
                continue;
            }
            var parts = Enumerable.From(barAxis[i].elements).Select(function (e) { return e.Caption }).ToArray();
            var currentNode = root;
            for (var j = 0; j < parts.length; j++) {
                var children = currentNode["children"];
                var nodeName = parts[j];
                var childNode;
                if (j + 1 < parts.length) {
                    // Not yet at the end of the sequence; move down the tree.
                    var foundChild = false;
                    for (var k = 0; k < children.length; k++) {
                        if (children[k]["name"] == nodeName) {
                            childNode = children[k];
                            foundChild = true;
                            break;
                        }
                    }
                    // If we don't already have a child node for this branch, create it.
                    if (!foundChild) {
                        childNode = { "name": nodeName, "children": [] };
                        children.push(childNode);
                    }
                    currentNode = childNode;
                } else {
                    // Reached the end of the sequence; create a leaf node.
                    childNode = { "name": nodeName, "size": size };
                    children.push(childNode);
                }
            }
        }
        return root;
    };



    _Sunburst.prototype.getSelection = function () {
        r = [];
        if (this.selected) r.push(this.selected);
        return Enumerable.From(r);
    }

    return function (configObject) { return new _Sunburst.prototype.constructor(configObject); };
});