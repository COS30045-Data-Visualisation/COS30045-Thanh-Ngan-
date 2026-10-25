const drawHistogram = (data) => {

    // STEP 1: Set up the SVG container
    const svg = d3.select("#histogram")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`);

    // STEP 2: Create the inner chart with margins
    const innerChart = svg
        .append("g")
        .attr("transform",
            `translate(${margin.left}, ${margin.top})`
        );

    // STEP 3: Generate bins
    const bins = binGenerator(data);

    console.log("Bins:", bins);

    // Keep consistent bin boundaries for filtering
    binGenerator
        .domain([bins[0].x0, bins[bins.length - 1].x1])
        .thresholds(bins.slice(0, -1).map(d => d.x1));

    // STEP 4: Define minimum and maximum values
    const minEng = bins[0].x0;
    const maxEng = bins[bins.length - 1].x1;

    const binsMaxLength = d3.max(bins, d => d.length);

    // STEP 5: Set up the X and Y scales
    xScale
        .domain([minEng, maxEng])
        .range([0, innerWidth]);

    yScale
        .domain([0, binsMaxLength])
        .range([innerHeight, 0])
        .nice();

    // STEP 6: Draw the histogram bars
    innerChart
        .selectAll("rect")
        .data(bins)
        .join("rect")
        .attr("x", d => xScale(d.x0))
        .attr("y", d => yScale(d.length))
        .attr("width", d =>
            xScale(d.x1) - xScale(d.x0)
        )
        .attr("height", d =>
            innerHeight - yScale(d.length)
        )
        .attr("fill", barColor)
        .attr("stroke", bodyBackgroundColor)
        .attr("stroke-width", 2);

    // STEP 7: Add the X-axis
    const bottomAxis = d3.axisBottom(xScale);

    innerChart
        .append("g")
        .attr("transform",
            `translate(0, ${innerHeight})`
        )
        .call(bottomAxis);

    // STEP 8: Add the X-axis label
    svg
        .append("text")
        .attr("class", "axis-label")
        .text("Labelled Energy Consumption (kWh/year)")
        .attr("text-anchor", "end")
        .attr("x", width - margin.right)
        .attr("y", height - 8);

    // STEP 9: Add the Y-axis
    const leftAxis = d3.axisLeft(yScale);

    innerChart
        .append("g")
        .call(leftAxis);

    // STEP 10: Add the Y-axis label
    svg
        .append("text")
        .attr("class", "axis-label")
        .text("Frequency")
        .attr("x", margin.left - 55)
        .attr("y", margin.top - 12);

};
