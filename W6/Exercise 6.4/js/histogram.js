const drawHistogram = (data) => {
    // 1. Add SVG and translate to the inner chart area.
    const svg = d3.select("#histogram")
        .append('svg')
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("role", "img")
        .attr("aria-label", "Distribution of labelled TV energy consumption in kilowatt-hours per year");

    const innerChart = svg.append('g')
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // 2. Make bins from energyConsumption.
    const bins = binGenerator(data);
    console.log("Bins:", bins);
    if (bins.length === 0) {
        console.warn("No valid energyConsumption values to chart.");
        return;
    }

    // 3. Calculate domains and ranges.
    const minEng = bins[0].x0;
    const maxEng = bins[bins.length - 1].x1;
    const binsMaxLength = d3.max(bins, d => d.length);
    console.log({minEng, maxEng, binsMaxLength});

    xScale.domain([minEng, maxEng]).range([0, innerWidth]);
    yScale.domain([0, binsMaxLength]).range([innerHeight, 0]).nice();

    // 4. Draw rectangles
    innerChart.selectAll("rect")
        .data(bins)
        .join("rect")
        .attr("x", d => xScale(d.x0))
        .attr("y", d => yScale(d.length))
        .attr("width", d => xScale(d.x1) - xScale(d.x0))
        .attr("height", d => innerHeight - yScale(d.length))
        .attr("fill", barColor)
        .attr("stroke", bodyBackgroundColor)
        .attr("stroke-width", 2);

    // 5. Add the axes and labels.
    innerChart.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(d3.axisBottom(xScale));

    innerChart.append("g")
        .call(d3.axisLeft(yScale));

    svg.append("text")
        .attr("class", "axis-label")
        .attr("x", width - margin.right)
        .attr("y", height - 8)
        .attr("text-anchor", "end")
        .text("Labelled Energy Consumption (kWh/year)");

    svg.append("text")
        .attr("class", "axis-label")
        .attr("x", margin.left - 55)
        .attr("y", margin.top - 12)
        .text("Frequency");
};
