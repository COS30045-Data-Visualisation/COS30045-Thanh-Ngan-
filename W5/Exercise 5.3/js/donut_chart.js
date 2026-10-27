const drawDonutChart = data => {
    // Set up margins
    const width = 1000;
    const height = 500;

    // Ex: radius = min(1000,500)/2 - 20 = 230
    // Why min? -> if the radius > half of the shortest side, 
    //             the circle might extend beyond the SVG and get clipped.
    const radius = Math.min(width, height) / 2 - 20; 

    // Create color scale
    const color = d3.scaleOrdinal()
        // Map screen category
        .domain(data.map(d => d.Screensize_Category))
        // Use D3's built-in color scheme
        .range(d3.schemeSet2)
        

    // Calculate angles for each slice
    const pie = d3.pie()
        .value(d => d.Count)
        // Disable sorting to maintain original data order
        .sort(null);

    // Set up the arcs
    const arcGenerator = d3.arc()
        // Inner radius = 60% of available radius
        .innerRadius(radius * 0.6)
        // Outer radius = 100% of available radius
        .outerRadius(radius * 1)
        .padAngle(0.02)
        .cornerRadius(6);

    // Create the svg containers
    const svg = d3.select("#donut-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("border", "1px solid black");

    const innerChart = svg
        .append("g")
        .attr("transform", `translate(${width/2}, ${height/2})`);

    // Draw our 'arcs'
    innerChart
        .selectAll("path")
        .data(pie(data))
        .join("path")
            .attr("d", arcGenerator)
            // Use category for color
            .attr("fill", d => color(d.data.Screensize_Category))
            .attr("stroke", "white")
            .attr("stroke-width", 2);

    // Add labels
    innerChart
        .selectAll(".donut-label")
        .data(pie(data))
        .join("text")
            .attr("class", "donut-label")
            // This function returns the [x, y] coordinates of a point located along a circular arc, based on an angle and a radius
            .attr("transform", d => `translate(${arcGenerator.centroid(d)})`)
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .attr("fill", "black")
            .style("font-size", "16px")
            .text(d => d.data.Screensize_Category);

};