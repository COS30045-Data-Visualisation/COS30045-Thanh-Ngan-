/* =========================================================
   EXERCISE 6.1 - HISTOGRAM
   EXERCISE 6.2 - Keep the same bins for filtering
   ========================================================= */
const drawHistogram = (data) => {
    
    // 1. Add SVG and translate to the inner chart area.
    const svg = d3.select('#histogram')
        .append('svg')
        .attr('viewBox', `0 0 ${width} ${height}`)

    const innerChart = svg
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // 2. Generate bins
    const bins = binGenerator(data);
    // Exercise 6.2: Keep the same bin boundaries for every filter
    binGenerator
        .domain([bins[0].x0, bins[bins.length - 1].x1])
        .thresholds(bins.slice(0, -1).map(d => d.x1));

    console.log('Bins:', bins);

    // 3. Calculate domains and ranges.
    const minEng = bins[0].x0;
    const maxEng = bins[bins.length - 1].x1;
    const binsMaxLength = d3.max(bins, d => d.length);
    console.log({minEng, maxEng, binsMaxLength});

    xScale
        .domain([minEng, maxEng])
        .range([0, innerWidth]);

    yScale
        .domain([0, binsMaxLength])
        .range([innerHeight, 0])
        .nice();

    // 4. Draw one rectangle for each bin
    innerChart
        .selectAll('rect')
        .data(bins)
        .join('rect')
        .attr('x', d => xScale(d.x0))
        .attr('y', d => yScale(d.length))
        .attr('width', d => xScale(d.x1) - xScale(d.x0))
        .attr('height', d => innerHeight - yScale(d.length))
        .attr('fill', barColor)
        .attr('stroke', bodyBackgroundColor)
        .attr('stroke-width', 2);

    // Add x-axis (energy consumption)
    innerChart
        .append('g')
        .attr('transform', `translate(0, ${innerHeight})`)
        .call(d3.axisBottom(xScale));

    // Add x-axis label
    svg.append("text")
        .attr("class", "axis-label")
        .text("Labelled Energy Consumption (kWh/year)")
        .attr("text-anchor", "end")
        .attr("x", width - margin.right)
        .attr("y", height - 8);
    
    // Add y-axis (frequency)
    innerChart
        .append("g")
        .call(d3.axisLeft(yScale));

    // Add y-axis label
    svg.append('text')
        .attr('class', 'axis-label')
        .attr('x', margin.left - 55)
        .attr('y', margin.top - 12)
        .text('Frequency');
};
