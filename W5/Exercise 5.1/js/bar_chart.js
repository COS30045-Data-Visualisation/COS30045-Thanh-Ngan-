// Load in data
d3.csv("./data/Energy-55inch.csv", d => {
    return {
        Screen_Tech: d.Screen_Tech,
        Energy_consumption: +d.Energy_consumption
    };
}).then(data => {
    // Display dataset in the console
    console.log(data)

    // Sort data in descending order
    data.sort((a,b) => b.Energy_consumption - a.Screen_Tech);

    drawBarChart(data);

}).catch(error => {
    console.error("Error:", error);
})

// Set up chart function and margins
const drawBarChart = data => {
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

    // Create SVG container
    const svg = d3.select("#bar-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("border", "1px solid black");

    // Create an inner chart group & apply margins
    const innerChart = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Create the x and y scales
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.Screen_Tech))
        .range([0, innerWidth])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Energy_consumption)])
        .range([innerHeight, 0]);
    
    // Create axes
    const bottomAxis = d3.axisBottom(xScale)
    const leftAxis = d3.axisLeft(yScale);

    innerChart 
        .append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis)

    innerChart
        .append("g")
        .call(leftAxis);

    // Add y-axis label
    innerChart
        .append("text")
        .text("Energy Consumption (kWh)")
        .attr("x", -margin.left)
        .attr("y", -10)
        .attr("text-anchor", "start")

    // Draw bars
    innerChart
        .selectAll(".bar")
        .data(data)
        .join("rect")
            .attr("class", "bar")
            .attr("x", d => xScale(d.Screen_Tech))
            .attr("y", d => yScale(d.Energy_consumption))
            .attr("width", xScale.bandwidth())
            .attr("height", d => innerHeight - yScale(d.Energy_consumption))
            .attr("fill", "pink");

    // Add value lables for each bar
    innerChart
        .selectAll(".bar-label")
        // Data binding
        .data(data)
        .join("text")
            .attr("class", ".bar-label")
            .attr("x", d => xScale(d.Screen_Tech) + xScale.bandwidth() / 2)
            .attr("y", d => yScale(d.Energy_consumption) - 5)
            .attr("text-anchor", "middle")
            .style("font-size", "14px")
            .text(d => `${Math.round(d.Energy_consumption)} kWh`);
};


