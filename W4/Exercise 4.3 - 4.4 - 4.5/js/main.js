// Exercise 4.3 - Step 2: Create SVG using D3
const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", "0 0 1200 1600")
    .style("border", "1px solid black");

// Exercise 4.3 - Step 3: Add a test SVG rectangle
svg
    .append("rect")
    .attr("x", 10)
    .attr("y", 10)
    .attr("width", 414)
    .attr("height", 16)
    .attr("fill", "blue");

// Exercise 4.4 - Step 1 & 2: Load and convert CSV data
d3.csv("./data/tvBrandCount.csv", d => {
    return {
        brand: d.brand,
        count: +d.count
    };
}).then(data => {
    // Display dataset in the console
    console.log(data);

    // Step 3: Find information about the dataset
    console.log(data.length);
    console.log(d3.max(data, d => d.count));
    console.log(d3.min(data, d => d.count));
    console.log(d3.extent(data, d => d.count));

    // Step 3: Sort data in descending order
    data.sort((a, b) => b.count - a.count);
 
    // Check sorted data
    console.log("Sorted data:", data);

    // Step 3: Pass data to the chart function
    drawBarChart(data);

}).catch(error => {
    console.error("Error loading CSV:", error);
});

function drawBarChart(data) {
    console.log("Data ready for chart:", data);
}

