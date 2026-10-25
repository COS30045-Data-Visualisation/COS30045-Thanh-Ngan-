/* =========================================================
   EXERCISE 6.2 - HISTOGRAM FILTERING
   ========================================================= */
const populateFilters = (data) => {

    // Create filter buttons
    d3.select("#filters_screen")
        .selectAll(".filter")
        .data(filters_screen)
        .join("button")
           .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
           .text(d => d.label)

        // Add click event listener
        .on("click", (e, d) => {
            console.log("Clicked filter:", e);
            console.log("Clicked filter data:", d);

            // If the clicked filter is not already active, update the active state of the filters
            if (!d.isActive) {
                filters_screen.forEach(filter => {
                    filter.isActive = d.id === filter.id ? true : false;
                });

                // Update the filter buttons based on which one was clicked 
                d3.selectAll("#filters_screen .filter")
                    .classed("active", filter => filter.id === d.id ? true : false);

                // Redraw histogram frequencies for selected group
                updateHistogram(d.id, data);
            }
        });

    // Update bar heights from the selected TV screen technology
    const updateHistogram = (filterId, data) => {

        // Filter the data
        const updatedData = filterId === "all"
            ? data
            : data.filter(tv => tv.screenTech === filterId);

        // Generate new bins
        const updatedBins = binGenerator(updatedData);

        // Update bars with animation
        d3.selectAll("#histogram rect")
            .data(updatedBins)
            .transition()
               .duration(500)
               .ease(d3.easeCubicInOut)
               .attr("y", d => yScale(d.length))
               .attr("height", d => innerHeight - yScale(d.length));
    };
};

/* =========================================================
   EXERCISE 6.4 - SCATTERPLOT TOOLTIPS
   ========================================================= */

// Add an initially hidden tooltip group to the scatterplot
const createTooltip = () => {
    const tooltip = innerChartS
        .append("g")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("pointer-events", "none");

    // Add background rectangle with rounded corners
    tooltip.append("rect")
        .attr("width", tooltipWidth)
        .attr("height", tooltipHeight)
        .attr("rx", 3)
        .attr("ry", 3)
        .attr("fill", barColor)
        .attr("fill-opacity", 0.75);

    // Add centred white placeholder text
    tooltip.append("text")
        .text("NA")
        .attr("x", tooltipWidth / 2)
        .attr("y", tooltipHeight / 2 + 2)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("fill", "white")
        .style("font-weight", 900);
};

// Attach mouse events to every scatterplot circle
const handleMouseEvents = () => {
    innerChartS.selectAll("circle")
        .on("mouseenter", (e, d) => {
            // 6.4.5 - Display the TV screen size in the tooltip
            innerChartS.select(".tooltip text")
                .text(`${d.screenSize}"`);

            // 6.4.6 - Get hovered circle's centre coordinates
            const cx = +e.target.getAttribute("cx");
            const cy = +e.target.getAttribute("cy");

            // 6.4.7 - Place tooltip above the point, then fade it in
            innerChartS.select(".tooltip")
                .interrupt()
                .attr("transform", `translate(${cx - tooltipWidth / 2}, ${cy - 1.5 * tooltipHeight})`)
                .transition()
                .duration(200)
                .style("opacity", 1);
        })
        .on("mouseleave", () => {
            // 6.4.8 - Hide tooltip when mouse leaves the data point
            innerChartS.select(".tooltip")
                .interrupt()
                .style("opacity", 0)
                .attr("transform", "translate(0, 500)");
        });
};


