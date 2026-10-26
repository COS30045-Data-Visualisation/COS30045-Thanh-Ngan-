// Step 2: Apply a style to html element using D3
// Select the first element with the class head2
d3.select(".head2")
    .style("color", "green");

// Step 3: Append an element using D3
// Select the div with the class 'wrap' in HTML
d3.select(".wrap")
  .append("p")
  .text("Purchasing a low energy consumption TV will help with your energy bills!");

// Step 4: Append a svg using D3
d3.select("svg")
  .append("rect")
   .attr("x", 50)
   .attr("y", 50)
   .attr("width", 100)
   .attr("height", 100)
// color for border
   .attr("stroke", "orange")
// border thickness
   .attr("stroke-width", 3)
   .style("fill", "green");