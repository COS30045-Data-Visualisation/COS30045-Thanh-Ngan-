// ==================================================
// Exercise 4.3: Create an SVG container using D3
// ==================================================
const svg = d3.select(".responsive-svg-container")
    .append("svg")
    // .attr("viewBox", "0 0 1200 1600")
    .attr("viewBox", "0 0 500 700")
    .style("border", "1px solid black");

// ==================================================
// Exercise 4.4: Load and prepare CSV data
// ==================================================
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
    console.log("Sorted data:", data);

    // Pass data to the chart function
    drawBarChart(data);

}).catch(error => {
    console.error("Error:", error);
});

// ==================================================
// Exercise 4.5 - 4.6: Bind and draw SVG rectangles
// ==================================================

const drawBarChart = data => {

    // const barHeight = 20;
    // const barSpacing = 5;

    // Exercise 4.6 - Create linear scale
    const xScale = d3.scaleLinear()
        // Input value, 1200 > 1096
        .domain([0, 1200])
        // Output value in SVG units
        .range([0, 400]);

     
    // Exercise 4.6 - Create band scale
    const yScale = d3.scaleBand()
        // Create a band scale to organize the categories
        .domain(data.map(d => d.brand))
        // Collect brand names from the dataset
        .range([0, 700])
        .padding(0.1);

    // Exercise 4.7 - Step 2: Group rectangles and labels
    const barAndLabel = svg
       .selectAll("g")
       .data(data)
       .join("g")
       .attr("transform", d =>
           `translate(0, ${yScale(d.brand)})`
    );

    // Exercise 4.7 - Step 3: Add rectangles into groups
    barAndLabel
       .append("rect");

    // Exercise 4.7 - Step 3: Add back the rectangles
    barAndLabel
       .append("rect")
       .attr("class", d => `bar bar-${d.count}`)
       .attr("width", d => xScale(d.count))
       .attr("height", yScale.bandwidth())
       .attr("fill", "blue")
       .attr("x", 100)
       .attr("y", 0);

    // EXERCISE 4.7 - Step 4: Add category labels
    barAndLabel
        .append("text")
        .text(d => d.brand)
        .attr("x", 90)
        .attr("y", 15)
        .attr("text-anchor", "end")
        .style("font-size", "13px");

    // EXERCISE 4.7 - Step 5: Add value labels
    barAndLabel
        .append("text")
        .text(d => d.count)
        .attr("x", d => 100 + xScale(d.count) + 5)
        .attr("y", 15)
        .style("font-size", "13px");
} 

