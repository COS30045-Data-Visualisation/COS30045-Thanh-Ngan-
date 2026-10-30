// Chart dimensions
const margin = {
    top: 40,
    right: 30,
    bottom: 50,
    left: 70
};

const width = 800;
const height = 400;

const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

// Colours
const barColor = "#606464";
const bodyBackgroundColor = "#fffaf0";

// Histogram Scales
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();

// Bin Generator
const binGenerator = d3.bin()
    .value(d => d.energyConsumption);

/* ---------------------------------------------------------
   EXERCISE 6.2 - FILTERING
   --------------------------------------------------------- */
// Array of filter options for screen types
const filters_screen = [
    { id: "all", label: "All", isActive: true },
    { id: "LED", label: "LED", isActive: false },
    { id: "LCD", label: "LCD", isActive: false },
    { id: "OLED", label: "OLED", isActive: false }
];

/* ---------------------------------------------------------
   EXERCISE 6.3 - SCATTERPLOT
   --------------------------------------------------------- */
// Set up inner chart variable for scatterplot
let innerChartS;

// Set up scatterplot scales & color scale
const xScaleS = d3.scaleLinear();
const yScaleS = d3.scaleLinear();
const colorScale = d3.scaleOrdinal();

// Tooltip dimensions for the scatterplot
const tooltipWidth = 65;
const tooltipHeight = 32;
