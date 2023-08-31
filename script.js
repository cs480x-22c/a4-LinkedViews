var params = [.015,.015,.015,.015,.015,.015];
const param_names = ["P/V", "Continentalness", "Erosion", "Temperature", "Humidity", "Depth"];
const param_abbreviations = ["pv", "c", "e", "t", "h", "y"];

const graph_width = 150;
const slider_width = 200;
const slider_height = 40;
const axis_width = 20;

let useAmidstColors = false;

function onButtonPress() {
	useAmidstColors = !useAmidstColors;
	document.getElementById("pallet-name").innerHTML = useAmidstColors ? "amidst" : "jj";
	update_charts();
}

for (let index = 0; index < 6; ++index) {
	
	// Code from https://bl.ocks.org/johnwalley/e1d256b81e51da68f7feb632a53c3518
	var slider = d3.sliderBottom()
		.min(-1.2)
		.max(1.2)
		.width(graph_width)
		.tickFormat(d3.format('.2'))
		.ticks(5)
		.default(0.015)
		.handle(
			d3.symbol()
				.type(d3.symbolCircle)
				.size(150)()
		)
		.on('onchange', val => {
			params[index] = val;
			console.log(param_names[index] + " changed to: " + params[index]);
			update_charts();
		});

	var gSlider = d3.select('#slider-' + param_abbreviations[index])
		.append('svg')
		.attr('width', slider_width)
		.attr('height', slider_height)
		.append('g')
		.attr('transform', 'translate(30,30)');

	gSlider.call(slider);
	// Copied code ends here
}

for (let i = 0; i < 6; ++i) {
	for (let j = 0; j < 6; ++j) {
		if (i <= j) {
			svg = d3.select("#graph-" + param_abbreviations[i] + "-" + param_abbreviations[j])
				.attr('width', graph_width + axis_width)
				.attr('height', graph_width + axis_width);
			
			svg.append("rect")
				.attr("x",axis_width)
				.attr("y",0)
				.attr("width",graph_width)
				.attr("height",graph_width)
				.style("stroke","black")
				.style("fill", "none");
		}
	}
}

let param_vals = [];
for (let i = 0; i < 6; ++i) {
	let pvals = [];
	for (let j = 0; j <= param_bins[i].length; ++j) {
		if (j == 0) {
			pvals.push(-1.2);
		} else if (j == param_bins[i].length) {
			pvals.push(1.2);
		} else {
			pvals.push((param_bins[i][j-1] + param_bins[i][j])/2);
		}
	}
	param_vals.push(pvals);
}
console.log(param_vals);

function getLowerBound(noisePoint, paramIndex) {
	if (noisePoint[paramIndex] < param_bins[paramIndex][0]) {
		return -1.2;
	} else {
		for (let i = (param_bins[paramIndex].length - 1); i >= 0 ; --i) {
			if (param_bins[paramIndex][i] <= noisePoint[paramIndex]) {
				return param_bins[paramIndex][i];
			}
		}
	}
	return 1.9E+35;
}

function getUpperBound(noisePoint, paramIndex) {
	if (noisePoint[paramIndex] > param_bins[paramIndex][param_bins[paramIndex].length - 1]) {
		return 1.2;
	} else {
		for (let i = 0; i < param_bins[paramIndex].length; ++i) {
			if (param_bins[paramIndex][i] >= noisePoint[paramIndex])
				return param_bins[paramIndex][i];
		}
	}
	return -1.9E+35;
}

function getParameterBinLabel(noisePoint, paramIndex) {
	if (paramIndex == 0) {
		// P/V has special names
		if (param_bins[paramIndex][0] >= noisePoint[paramIndex]) {
			return "Mid";
		} else if (param_bins[paramIndex][1] >= noisePoint[paramIndex]) {
			return "High";
		} else if (param_bins[paramIndex][2] >= noisePoint[paramIndex]) {
			return "Peak";
		} else if (param_bins[paramIndex][3] >= noisePoint[paramIndex]) {
			return "High";
		} else if (param_bins[paramIndex][4] >= noisePoint[paramIndex]) {
			return "Mid";
		} else if (param_bins[paramIndex][5] >= noisePoint[paramIndex]) {
			return "Low";
		} else if (param_bins[paramIndex][6] >= noisePoint[paramIndex]) {
			return "Valley";
		} else if (param_bins[paramIndex][7] >= noisePoint[paramIndex]) {
			return "Low";
		} else if (param_bins[paramIndex][8] >= noisePoint[paramIndex]) {
			return "Mid";
		} else if (param_bins[paramIndex][9] >= noisePoint[paramIndex]) {
			return "High";
		} else if (param_bins[paramIndex][10] >= noisePoint[paramIndex]) {
			return "Peak";
		} else if (param_bins[paramIndex][11] >= noisePoint[paramIndex]) {
			return "High";
		} else {
			return "Mid";
		}
	} else if (paramIndex == 1) {
		// Continentalness also has special names
		if (param_bins[paramIndex][0] >= noisePoint[paramIndex]) {
			return "Mushroom Island";
		} else if (param_bins[paramIndex][1] >= noisePoint[paramIndex]) {
			return "Deep Ocean";
		} else if (param_bins[paramIndex][2] >= noisePoint[paramIndex]) {
			return "Ocean";
		} else if (param_bins[paramIndex][3] >= noisePoint[paramIndex]) {
			return "Shore";
		} else if (param_bins[paramIndex][4] >= noisePoint[paramIndex]) {
			return "Near Inland";
		} else if (param_bins[paramIndex][5] >= noisePoint[paramIndex]) {
			return "Mid Inland";
		} else if (param_bins[paramIndex][6] >= noisePoint[paramIndex]) {
			return "Far Inland";
		} else {
			return "Very Far Inland";
		}
	} else if (paramIndex == 5) {
		// Depth bins work differently
		if (param_bins[paramIndex][0] >= noisePoint[paramIndex]) {
			return "Surface";
		} else if (param_bins[paramIndex][1] >= noisePoint[paramIndex]) {
			return "Cave";
		} else if (param_bins[paramIndex][3] < noisePoint[paramIndex]) {
			return "Deep";
		} else {
			return "Surface";
		}
	} else {
		for (let i = 0; i < param_bins[paramIndex].length; ++i) {
			if (param_bins[paramIndex][i] >= noisePoint[paramIndex])
				return i;
		}
		// Final point
		if (paramIndex == 4) {
			// Lush Caves humidity
			return "Above " + (param_bins[paramIndex].length - 1);
		} else {
			return param_bins[paramIndex].length;
		}
	}
}

function convert(value) {
	return graph_width*(value + 1.2)/2.4;
}

function describeParameterBin(noisePoint, paramIndex) {
	let description = "";
	description += getParameterBinLabel(noisePoint,paramIndex);
	description += " (" + getLowerBound(noisePoint,paramIndex);
	description += " to " + getUpperBound(noisePoint,paramIndex);
	description += ")\n";
	return description;
}

function update_charts() {
	
	for (let i = 0; i < 6; ++i) {
		d3.select("#current-" + param_abbreviations[i])
			.text(describeParameterBin(params,i));
	}
	
	d3.select("#current-biome")
		.text(getBiome(params));
	
	d3.select("#current-color")
		.select("rect")
		.style("stroke", "black")
		.style("fill", useAmidstColors ? getAmidstColor(getBiome(params)) : getJjColor(getBiome(params)));
	
	for (let i = 0; i < 6; ++i) {
		for (let j = 0; j < 6; ++j) {
			if (i <= j) {
				let points = [];
				for (let k = 0; k < param_vals[i].length; ++k) {
					for (let l = 0; l < param_vals[j].length; ++l) {
						let point = [...params];
						point[i] = param_vals[i][k];
						point[j] = param_vals[j][l];
						points.push(point);
					}
				}
				
				d3.select("#graph-" + param_abbreviations[i] + "-" + param_abbreviations[j])
					.selectAll("biomes")
					.data(points)
					.join("rect")
					.style("stroke", "none")
					.style("fill", (d) => useAmidstColors ? getAmidstColor(getBiome(d)) : getJjColor(getBiome(d)))
					.attr("x", (d) => axis_width + convert(getLowerBound(d,j)))
					.attr("y", (d) => convert(getLowerBound(d,i)))
					.attr("width", (d) => (convert(getUpperBound(d,j)) - convert(getLowerBound(d,j))))
					.attr("height", (d) => (convert(getUpperBound(d,i)) - convert(getLowerBound(d,i))))
					.on('click', (e, d) => {
						// e is the click event
						params[i] = d[i];
						params[j] = d[j];
						update_charts();
					}).append("title")
					.html((d) => {
						let tooltip = "Noise:\n";
						for (let i = 0; i < 6; ++i) {
							tooltip += "  " + param_names[i] + ": " + describeParameterBin(d,i);
						}
						tooltip += "Biome: " + getBiome(d);
						return tooltip;
					});
			}
		}
	}
}

update_charts();
