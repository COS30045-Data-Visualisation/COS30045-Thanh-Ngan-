// ==================================================
// EXERCISE 4.3: Create an SVG container using D3
// ==================================================
const svg = d3.select(".responsive-svg-container")
    .append("svg")
    // .attr("viewBox", "0 0 1200 1600")
    .attr("viewBox", "0 0 500 700")
    .style("border", "1px solid black");

// Step 3: Add a test SVG rectangle
// svg
//     .append("rect")
//     .attr("x", 10)
//     .attr("y", 10)
//     .attr("width", 414)
//     .attr("height", 16)
//     .attr("fill", "blue");

// ==================================================
// EXERCISE 4.4: Load and prepare CSV data
// ==================================================
// Step 1 & 2: Load and convert CSV data
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
// EXERCISE 4.5 - 4.6: Bind and draw SVG rectangles
// ==================================================

const drawBarChart = data => {

    // const barHeight = 20;
    // const barSpacing = 5;

    
    // EXERCISE 4.6 - Create linear scale
    const xScale = d3.scaleLinear()
        // Input value range from 0 to 1200. It's enough to contain max-count=1096
        .domain([0, 1200])
        // Output value range from 0 to 400 SVG units
        .range([0, 400]);

     
    // EXERCISE 4.6 - Create band scale
    const yScale = d3.scaleBand()
        // Create a band scale to organize the categories
        .domain(data.map(d => d.brand))
        // Collect brand names from the dataset
        .range([0, 700])
        .padding(0.1);

    // EXERCISE 4.5 - Step 1: Bind data to rectangles
    svg
        .selectAll("rect")
        .data(data)
        // Link the dataset to the selection
        .join("rect")
        .attr("class", d => {
            console.log(d);
            // Generate a class name based on the count value. 
            // Ex: d.count = 44; --> <rect class="bar bar-44"></rect>
            // `bar` is the common class for the bars.
            // `bar-44` is a class generated based on the count.
            return `bar bar-${d.count}`;
        })
    
    // EXERCISE 4.6 - Scale bar widths
    .attr("width", d => xScale(d.count))
    // EXERCISE 4.6 - Scale bar heights
    .attr("height", yScale.bandwidth())
    .attr("fill", "blue")

    // Step 3: Space out the bars
    // All rects start with x=0
    .attr("x", 0)
    .attr("y", d => yScale(d.brand));
} 

