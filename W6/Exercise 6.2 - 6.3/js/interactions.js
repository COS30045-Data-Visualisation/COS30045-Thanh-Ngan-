const populateFilters = (data) => {

    // STEP 1: Create filter buttons
    d3.select("#filters_screen")
        .selectAll(".filter")
        .data(filters_screen)
        .join("button")
        .attr("class", d =>
            `filter ${d.isActive ? "active" : ""}`
        )
        .attr("type", "button")
        .attr("aria-pressed", d => d.isActive)
        .text(d => d.label)

        // STEP 2: Add click event listener
        .on("click", (e, d) => {

            console.log("Clicked filter:", d.id);

            // STEP 3: Update the active filter
            if (!d.isActive) {

                filters_screen.forEach(filter => {
                    filter.isActive = d.id === filter.id;
                });

                // STEP 4: Update button appearance
                d3.selectAll("#filters_screen .filter")
                    .classed("active", filter => filter.isActive)
                    .attr("aria-pressed", filter => filter.isActive);

                // STEP 5: Update histogram
                updateHistogram(d.id, data);
            }
        });

    // STEP 6: Function to update the histogram
    const updateHistogram = (filterId, data) => {

        // Filter the data
        const updatedData = filterId === "all"
            ? data
            : data.filter(tv => tv.screenTech === filterId);

        // Generate new bins
        const updatedBins = binGenerator(updatedData);

        console.log(
            `${filterId}: ${updatedData.length} TVs`,
            updatedBins
        );

        // Update bars with animation
        d3.selectAll("#histogram rect")
            .data(updatedBins)
            .transition()
            .duration(500)
            .ease(d3.easeCubicInOut)
            .attr("y", d => yScale(d.length))
            .attr("height", d =>
                innerHeight - yScale(d.length)
            );
    };
};

// Exercise 6.3: Create a tooltip inside the scatterplot's inner chart
const createTooltip = () => {
    const tooltip = innerChartS.append("g")
        .attr("class", "tooltip")
        .attr("pointer-events", "none")
        .style("opacity", 0);

    tooltip.append("rect")
        .attr("width", tooltipWidth)
        .attr("height", tooltipHeight)
        .attr("rx", 3)
        .attr("ry", 3)
        .attr("fill", "#6F2C91")
        .attr("fill-opacity", 0.85);

    tooltip.append("text")
        .attr("x", tooltipWidth / 2)
        .attr("y", tooltipHeight / 2)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("fill", "white")
        .style("font-weight", 700)
        .text("");
};

// Exercise 6.3: Display screen size while the mouse is over a TV point
const handleMouseEvents = () => {
    const tooltip = innerChartS.select(".tooltip");

    innerChartS.selectAll("circle.tv-point")
        .on("mouseenter", (e, d) => {
            const label = Number.isFinite(d.screenSize)
                ? `${d.screenSize}"`
                : "N/A";
            tooltip.select("text").text(label);

            const cx = +d3.select(e.currentTarget).attr("cx");
            const cy = +d3.select(e.currentTarget).attr("cy");
            const tooltipX = Math.max(0,
                Math.min(innerWidth - tooltipWidth, cx - tooltipWidth / 2));
            const tooltipY = Math.max(0, cy - tooltipHeight - 10);

            tooltip.interrupt()
                .attr("transform", `translate(${tooltipX}, ${tooltipY})`)
                .transition()
                .duration(200)
                .style("opacity", 1);
        })
        .on("mouseleave", () => {
            tooltip.interrupt().style("opacity", 0);
        });
};
