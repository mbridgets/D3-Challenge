// @TODO: YOUR CODE HERE!
function makeResponsive() {

    // if the SVG area isn't empty when the browser loads,
    // remove it and replace it with a resized version of the chart
    var svgArea = d3.select("body").select("svg");
  
    // clear svg is not empty
    if (!svgArea.empty()) {
      svgArea.remove();
    }
  
    // SVG wrapper dimensions are determined by the current width and
    // height of the browser window.
    var svgWidth = window.innerWidth;
    var svgHeight = window.innerHeight;
  
    var margin = {
      top: 50,
      bottom: 50,
      right: 50,
      left: 50
    };
  
    var height = svgHeight - margin.top - margin.bottom;
    var width = svgWidth - margin.left - margin.right;
    var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

    var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    d3.csv("assets/data.csv").then(function(stateData){
        console.log(stateData);
      //   var xLinearScale = d3.scaleLinear()
      // .domain([0, d3.max(stateData, d => parseFloat(d.obesity))])
      // .range([0, width]);

      var xLinearScale = d3.scaleLinear()
      .domain([d3.min(stateData, function(d) {
        console.log(parseFloat(d.obesity));
      return parseFloat(d.obesity);
      }), d3.max(stateData, function(d) {
        console.log(parseFloat(d.obesity));
      return parseFloat(d.obesity);
      })])
      .range([0, width]);

      console.log(width);
      

      // console.log(+stateData[0].obesity);
      // console.log(d3.min(stateData.obesity));

        // var yLinearScale = d3.scaleLinear()
        // .domain([0, d3.min(stateData, d => parseFloat(d.poverty))])
        // .range([height, 0]);

      var yLinearScale = d3.scaleLinear()
        .domain([d3.min(stateData, function(d) {
          console.log(parseFloat(d.poverty));
        return parseFloat(d.poverty);
        }), d3.max(stateData, function(d) {
        console.log(parseFloat(d.poverty));
      return parseFloat(d.poverty);
      })])
      .range([height, 0]);


      console.log(d3.max(stateData, d => d.poverty));
      console.log(d3.min(stateData, d => d.poverty));


        var bottomAxis = d3.axisBottom(xLinearScale);
        var leftAxis = d3.axisLeft(yLinearScale);

        chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

        chartGroup.append("g")
      .call(leftAxis);

      var circlesGroup = chartGroup.selectAll("circle")
    .data(stateData)
    .enter();

    console.log(circlesGroup);
    circlesGroup.append("circle")
    .attr("cx", d => xLinearScale(d.obesity))
    .attr("cy", d => yLinearScale(d.poverty))
    .attr("r", "25")
    .attr("fill", "pink")
    .attr("opacity", ".5")
    .append("text")
    .text(d => d.abbr)
    .attr("cx", d => xLinearScale(d.obesity))
    .attr("cy", d => yLinearScale(d.poverty))
    .attr("class", "stateText")
    .attr("font-size", "16");

    console.log(xLinearScale(stateData[0].obesity));

    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Obesity");

    chartGroup.append("text")
      .attr("y", 0 - (width / 2))
      .attr("x", 0 - (margin.bottom-30))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Poverty");

    // chartGroup.append("text")
    //   .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    //   .attr("class", "axisText")
    //   .text("Poverty");
  });
};


makeResponsive();

d3.select(window).on("resize", makeResponsive);
