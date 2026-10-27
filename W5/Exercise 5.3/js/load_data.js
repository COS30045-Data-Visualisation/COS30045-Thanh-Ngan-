// Load in data 5.1
d3.csv("./data/Energy-55inch.csv", d => {
    return {
        Screen_Tech: d.Screen_Tech,
        Energy_consumption: +d.Energy_consumption
    };
}).then(data => {
    // Display dataset in the console
    console.log(data)

    // Sort data in descending order
    data.sort((a,b) => b.Energy_consumption - a.Energy_consumption);

    drawBarChart(data);

}).catch(error => {
    console.error("Error 5.1:", error);
})

// Load in data 5.2
d3.csv("./data/ARE_Spot_Prices.csv", d => {
    return {
        year: +d.Year,
        averagePrice: +d["Average Price (notTas-Snowy)"]
    };
}).then(data => {
    // Display dataset in the console
    console.log(data);

    // Sort data by year 
    data.sort((a,b) => a.year - b.year);

    drawLineChart(data);

}).catch(error => {
    console.error("Error 5.2:", error);
})