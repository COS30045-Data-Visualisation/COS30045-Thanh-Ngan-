
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
