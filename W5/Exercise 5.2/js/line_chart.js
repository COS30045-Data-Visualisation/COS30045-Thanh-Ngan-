// Draw Line Chart
const drawLineChart = data => {
    // Set up inner chart margins & dimensions
    const margin = {
        top: 40,
        right: 170,
        bottom: 25,
        left: 40
    };
    const width = 1000;
    const height = 500;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom; 

    // Create x and y scales
    const xScale = d3.scaleLinear()
        // Find both min & max [1998, 2024]
        .domain(d3.extent(data, d => d.year))
        .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.averagePrice)])
        .range([innerHeight, 0]);

    // Set up Axes
    const bottomAxis = d3.axisBottom(xScale)
        .tickFormat(d3.format("d"));

    const leftAxis = d3.axisLeft(yScale);

    // Create SVG Container
    const svg = d3.select("#line-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`);

    // Create inner chart group
    const innerChart = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Add axis
    innerChart
        .append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);

    innerChart
        .append("g")
        .call(leftAxis);

    // Add y-axis label
    innerChart
        .append("text")
        .text("Average Price ($ per MWh)")
        .attr("x", -margin.left)
        .attr("y", -20)
        .attr("text-anchor", "start")

    // Draw a Scatter Plot
    innerChart
        .selectAll(".data-point")
        .data(data)
        .join("circle")
            .attr("class", ".data-point")
            .attr("r", 3)
            .attr("cx", d => xScale(d.year))
            .attr("cy", d => yScale(d.averagePrice))
            .attr("fill", "green");

    // Draw a Line
    const lineGenerator = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.averagePrice));

    innerChart
        .append("path")
        .attr("d", lineGenerator(data))
        .attr("fill", "none")
        .attr("stroke", "green");

}