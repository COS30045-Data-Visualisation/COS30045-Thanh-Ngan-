// Load in data
d3.csv("./data/Energy-55inch.csv", d => {
    return {
        Screen_Tech: d.Screen_Tech,
        Energy_consumption: +d.Energy_consumption
    };
}).then(data => {
    // Display dataset in the console
    console.log(data)

    // Sort data in descending order
    data.sort((a,b) => b.Energy_consumption - a.Screen_Tech);

    drawBarChart(data);

}).catch(error => {
    console.error("Error:", error);
})