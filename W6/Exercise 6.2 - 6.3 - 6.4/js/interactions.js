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

    // Add background rectangle with rounded corners
    tooltip
        .append("rect")
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
            console.log("Mouse entred circle", d);

        // Update the text in the tooltip with the screenTech value
            d3.select(".tooltip text")
                .text(`${d.screenSize}''`);

            // Get hovered circle's centre coordinates
            const cx = e.target.getAttribute("cx");
            const cy = e.target.getAttribute("cy");

            // Place tooltip above the point, then fade it in
            d3.select(".tooltip")
                .attr("transform", `translate(${cx - 0.5*tooltipWidth}, ${cy - 1.5 * tooltipHeight})`)
                .transition()
                   .duration(200)
                   .style("opacity", 1);
        })

        .on("mouseleave", (e, d) => {
            console.log("Mouse left circle", d);
        
            d3.seclect(".tooltip")
            .style("opacity", 0)
            .attr("transform", `translate(0, 500)`);
        });
};


