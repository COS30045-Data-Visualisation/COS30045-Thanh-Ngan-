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
