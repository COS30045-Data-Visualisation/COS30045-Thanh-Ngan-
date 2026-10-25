// Exercise 6.3: Scatter plot of TV star rating and energy consumption
const drawScatterplot = (data) => {
    // STEP 1: Create the responsive SVG
    const svg = d3.select("#scatterplot")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("role", "img")
        .attr("aria-label", "TV star rating versus labelled energy consumption");

    // STEP 2: Shared inner chart, used later by tooltip functions
    innerChartS = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // STEP 3: Use records containing both numerical measures
    const plotData = data.filter(d =>
        Number.isFinite(d.star) && Number.isFinite(d.energyConsumption)
    );

    // STEP 4: Set up separate scatterplot scales
    const maxStar = d3.max(plotData, d => d.star);
    const maxEnergy = d3.max(plotData, d => d.energyConsumption);

    xScaleS.domain([0, maxStar]).range([0, innerWidth]).nice();
    yScaleS.domain([0, maxEnergy]).range([innerHeight, 0]).nice();

    // STEP 5: Use different hues for screen technologies
    const types = [...new Set(plotData.map(d => d.screenTech))];
    colorScale.domain(types).range(d3.schemeCategory10);

    // STEP 6: Draw circles (one circle for each TV)
    innerChartS.selectAll("circle.tv-point")
        .data(plotData)
        .join("circle")
        .attr("class", "tv-point")
        .attr("r", 3)
        .attr("cx", d => xScaleS(d.star))
        .attr("cy", d => yScaleS(d.energyConsumption))
        .attr("fill", d => colorScale(d.screenTech))
        .attr("opacity", 0.5);

    // STEP 7: Add the x-axis and label
    innerChartS.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(d3.axisBottom(xScaleS));

    svg.append("text")
        .attr("class", "axis-label")
        .attr("x", width - margin.right)
        .attr("y", height - 8)
        .attr("text-anchor", "end")
        .text("Star Rating");

    // STEP 8: Add the y-axis and label
    innerChartS.append("g")
        .call(d3.axisLeft(yScaleS));

    svg.append("text")
        .attr("class", "axis-label")
        .attr("transform", `translate(18, ${margin.top + innerHeight / 2}) rotate(-90)`)
        .attr("text-anchor", "middle")
        .text("Labelled Energy Consumption (kWh/year)");

    // STEP 9: Add legend in the upper-right corner
    const legend = svg.append("g")
        .attr("transform", `translate(${width - 100}, ${margin.top})`);

    colorScale.domain().forEach((screenTech, i) => {
        const legendRow = legend.append("g")
            .attr("transform", `translate(0, ${i * 20})`);

        legendRow.append("rect")
            .attr("width", 10)
            .attr("height", 10)
            .attr("fill", colorScale(screenTech));

        legendRow.append("text")
            .attr("x", 20)
            .attr("y", 10)
            .attr("text-anchor", "start")
            .style("alignment-baseline", "middle")
            .text(screenTech);
    });
};
