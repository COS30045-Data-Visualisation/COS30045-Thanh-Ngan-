d3.csv("data/Ex6_TVdata_withStar.csv", d => ({
    brand: d.brand,
    model: d.model,
    screenSize: +d.screenSize,
    screenTech: d.screenTech,
    energyConsumption: +d.energyConsumption,
    star: +d.star
}))
.then(data => {
    console.log(data);

    // Exercise 6.1: Draw the histogram
    drawHistogram(data);

    // Exercise 6.2: Create the filter buttons
    populateFilters(data);

    // Exercise 6.3: Draw the scatter plot
    drawScatterplot(data);

    // Exercise 6.3: Create the tooltip
    createTooltip();

    // Exercise 6.3: Handle mouse events
    handleMouseEvents();

})
.catch(error => {
    console.error("Error loading the CSV file:", error);
});
