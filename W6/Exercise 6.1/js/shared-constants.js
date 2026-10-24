// Shared dimensions and margins, from Lab W6.1.
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

// Shared colors.
const barColor = '#606464';
const bodyBackgroundColor = '#fffaf0';

// Shared D3 scales and bin generator.
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();
const binGenerator = d3.bin().value(d => d.energyConsumption);
