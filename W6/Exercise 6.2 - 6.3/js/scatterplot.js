/* =========================================================
   EXERCISE 6.3 - TV STAR RATING VS ENERGY CONSUMPTION
   x-axis: Star Rating | y-axis: Energy Consumption
   Colour: screen technology (LED / LCD / OLED)
========================================================= */
const drawScatterplot = (data) => {

    // Set the dimensions and margins of the chart area
    const svg = d3.select("#scatterplot")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)

    // Create an inner chart group with margins
    // innerChartS was declared in shared-constants.js
    innerChartS = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Set x-scale: TV star ratings (0 to maximum star rating)
    xScaleS
        .domain([0, d3.max(data, d => d.star)])
        .range([0, innerWidth]);

    // Set y-scale: yearly TV energy consumption
    yScaleS
        .domain([0, d3.max(data, d => d.energyConsumption)])
        .range([innerHeight, 0])
        .nice();

    // Map screen technologies to distinct category colours
    colorScale
        .domain(["LED", "LCD", "OLED"])
        .range(d3.schemeCategory10);

    // Draw circles (one circle for each TV)
    innerChartS
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("r", 3)
        .attr("cx", d => xScaleS(d.star))
        .attr("cy", d => yScaleS(d.energyConsumption))
        .attr("fill", d => colorScale(d.screenTech))
        .attr("opacity", 0.5); 

    // Add the x-axis (Star Rating)
    innerChartS
        .append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(d3.axisBottom(xScaleS));

    // Add the y-axis (Energy Consumption)
    innerChartS
        .append("g")
        .call(d3.axisLeft(yScaleS));

    // Label the two axes
    svg.append("text")
        .attr("class", "axis-label")
        .attr("x", width - margin.right)
        .attr("y", height - 8)
        .attr("text-anchor", "end")
        .text("Star Rating");

    svg.append("text")
        .attr("class", "axis-label")
        .attr("x", margin.left - 58)
        .attr("y", margin.top - 12)
        .text("Labelled Energy Consumption (kWh/year)");

    // Position the legend in the upper-right corner
    const legend = svg
        .append("g")
        .attr("transform", `translate(${width - 100}, ${margin.top})`);

    // Loop through the color scale domain to create legend entries
    colorScale.domain().forEach((screenTech, i) => {

        // Create a group for each legend entry
        const legendRow = legend
            .append("g")
            .attr("transform", `translate(0, ${i * 20})`);

        // Add a colored rectangle for each screenTech
        legendRow.append("rect")
            .attr("width", 10)
            .attr("height", 10)
            .attr("fill", colorScale(screenTech));

        // Add text next to the rectangle
        legendRow.append("text")
            // Position text to the right of the rectangle
            .attr("x", 20) 
            // Align text with the rectangle
            .attr("y", 10)
            .attr("text-anchor", "start")
            .style("alignment-baseline", "middle")
            // Display screenTech value
            .text(screenTech);
    });
};
