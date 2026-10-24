// Convert CSV strings into named values, including numeric conversions.
d3.csv("data/Ex6_TVdata_withStar.csv", d => ({
    brand: d.brand,
    model: d.model,
    screenSize: +d.screenSize,
    screenTech: d.screenTech,
    energyConsumption: +d.energyConsumption,
    star: +d.star
}))
.then(data => {
    console.log('Loaded TV records:', data.length);
    console.log(data);
    drawHistogram(data);
    populateFilters(data); // Placeholder now; functionality added in W6.2
})
.catch(error => {
    console.error('Error loading the CSV file:', error);
});
