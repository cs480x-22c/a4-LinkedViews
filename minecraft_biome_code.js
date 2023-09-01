const param_bins = [
	[-.93333334, -.7666667, -.56666666, -.4, -.26666668, -.05, .05, .26666668, .4, .56666666, .7666667, .93333334], // P/V
	[-1.05, -.455, -.19, -.11, .03, .3, .8], // Continentalness
	[-.78, -.375, -.2225, .05, .45, .55], // Erosion
	[-.45, -.15, .2, .55], // Temperature
	[-.35, -.1, .1, .3, .7], // Humidity
	[.2, .9, 1.0, 1.1] // Depth
];

function getBiome(noisePoint) {
	if (noisePoint[5] >= param_bins[5][3] && noisePoint[2] < param_bins[2][1]) {
		return "Deep Dark";
	}
	else if (noisePoint[5] >= param_bins[5][0] && noisePoint[5] < param_bins[5][1] && noisePoint[4] >= param_bins[4][4]) {
		return "Lush Caves";
	}
	else if (noisePoint[5] >= param_bins[5][0] && noisePoint[5] < param_bins[5][1] && noisePoint[1] >= param_bins[1][6]) {
		return "Dripstone Caves";
	}
	else if (noisePoint[1] < param_bins[1][2]) {
		// Ocean biomes
		if (noisePoint[1] < param_bins[1][0]) {
			return "Mushroom Fields";
		} else if (noisePoint[1] < param_bins[1][1]) {
			if (noisePoint[3] < param_bins[3][0]) {
				return "Deep Frozen Ocean";
			} else if (noisePoint[3] < param_bins[3][1]) {
				return "Deep Cold Ocean";
			} else if (noisePoint[3] < param_bins[3][2]) {
				return "Deep Ocean";
			} else if (noisePoint[3] < param_bins[3][3]) {
				return "Deep Lukewarm Ocean";
			} else {
				return "Warm Ocean";
			}
		} else {
			if (noisePoint[3] < param_bins[3][0]) {
				return "Frozen Ocean";
			} else if (noisePoint[3] < param_bins[3][1]) {
				return "Cold Ocean";
			} else if (noisePoint[3] < param_bins[3][2]) {
				return "Ocean";
			} else if (noisePoint[3] < param_bins[3][3]) {
				return "Lukewarm Ocean";
			} else {
				return "Warm Ocean";
			}
		}
	} else {
		// Land biomes
		if (noisePoint[0] < param_bins[0][0]) {
			return getMidBiome(noisePoint, false);
		} else if (noisePoint[0] < param_bins[0][1]) {
			return getHighBiome(noisePoint, false);
		} else if (noisePoint[0] < param_bins[0][2]) {
			return getPeakBiome(noisePoint, false);
		} else if (noisePoint[0] < param_bins[0][3]) {
			return getHighBiome(noisePoint, false);
		} else if (noisePoint[0] < param_bins[0][4]) {
			return getMidBiome(noisePoint, false);
		} else if (noisePoint[0] < param_bins[0][5]) {
			return getLowBiome(noisePoint, false);
		} else if (noisePoint[0] < param_bins[0][6]) {
			return getValleyBiome(noisePoint, true);
		} else if (noisePoint[0] < param_bins[0][7]) {
			return getLowBiome(noisePoint, true);
		} else if (noisePoint[0] < param_bins[0][8]) {
			return getMidBiome(noisePoint, true);
		} else if (noisePoint[0] < param_bins[0][9]) {
			return getHighBiome(noisePoint, true);
		} else if (noisePoint[0] < param_bins[0][10]) {
			return getPeakBiome(noisePoint, true);
		} else if (noisePoint[0] < param_bins[0][11]) {
			return getHighBiome(noisePoint, true);
		} else {
			return getMidBiome(noisePoint, true);
		}
	}
	// If nothing was selected
	return "The Void";
}

function getPeakBiome(noisePoint, special) {
	if (noisePoint[2] < param_bins[2][0]) {
		return getPeakPeakBiome(noisePoint, special);
	} else if (noisePoint[2] < param_bins[2][1]) {
		if (noisePoint[1] < param_bins[1][4]) {
			return getMountainStartBiome(noisePoint, special);
		} else {
			return getPeakPeakBiome(noisePoint, special);
		}
	} else if (noisePoint[2] < param_bins[2][2]) {
		if (noisePoint[1] < param_bins[1][4]) {
			return getRegularBiome(noisePoint, special);
		} else {
			return getNearMountainBiome(noisePoint, special);
		}
	} else if (noisePoint[2] < param_bins[2][3]) {
		if (noisePoint[1] < param_bins[1][4]) {
			return getRegularBiome(noisePoint, special);
		} else if (noisePoint[1] < param_bins[1][5]) {
			return getBadlandsOrBiome(noisePoint, special);
		} else {
			return getNearMountainBiome(noisePoint, special);
		}
	} else if (noisePoint[2] < param_bins[2][4]) {
		return getRegularBiome(noisePoint, special);
	} else if (noisePoint[2] < param_bins[2][5]) {
		if (noisePoint[1] < param_bins[1][4]) {
			return getWindsweptSavannaOrBiome(noisePoint, special, getHillBiome);
		} else {
			return getHillBiome(noisePoint, special);
		}
	} else {
		return getRegularBiome(noisePoint, special);
	}
	return "The Void";
}

function getHighBiome(noisePoint, special) {
	if (noisePoint[2] < param_bins[2][0]) {
		if (noisePoint[1] < param_bins[1][3]) {
			return getRegularBiome(noisePoint, special);
		} else if (noisePoint[1] < param_bins[1][4]) {
			return getMountainSlopeBiome(noisePoint, special);
		} else {
			return getPeakPeakBiome(noisePoint, special);
		}
	} else if (noisePoint[2] < param_bins[2][1]) {
		if (noisePoint[1] < param_bins[1][3]) {
			return getRegularBiome(noisePoint, special);
		} else if (noisePoint[1] < param_bins[1][4]) {
			return getMountainStartBiome(noisePoint, special);
		} else {
			return getMountainSlopeBiome(noisePoint, special);
		}
	} else if (noisePoint[2] < param_bins[2][2]) {
		if (noisePoint[1] < param_bins[1][4]) {
			return getRegularBiome(noisePoint, special);
		} else {
			return getNearMountainBiome(noisePoint, special);
		}
	} else if (noisePoint[2] < param_bins[2][3]) {
		if (noisePoint[1] < param_bins[1][4]) {
			return getRegularBiome(noisePoint, special);
		} else if (noisePoint[1] < param_bins[1][5]) {
			return getBadlandsOrBiome(noisePoint, special);
		} else {
			return getNearMountainBiome(noisePoint, special);
		}
	} else if (noisePoint[2] < param_bins[2][4]) {
		return getRegularBiome(noisePoint, special);
	} else if (noisePoint[2] < param_bins[2][5]) {
		if (noisePoint[1] < param_bins[1][4]) {
			return getWindsweptSavannaOrBiome(noisePoint, special, getRegularBiome);
		} else {
			return getHillBiome(noisePoint, special);
		}
	} else {
		return getRegularBiome(noisePoint, special);
	}
	return "The Void";
}

function getMidBiome(noisePoint, special) {
	if (noisePoint[1] < param_bins[1][3] && noisePoint[2] < param_bins[2][2]) {
		return "Stony Shore";
	} else {
		if (noisePoint[2] < param_bins[2][0]) {
			return getMountainSlopeBiome(noisePoint, special);
		} else if (noisePoint[2] < param_bins[2][1]) {
			if (noisePoint[1] < param_bins[1][5]) {
				return getMountainStartBiome(noisePoint, special);
			} else if (noisePoint[3] < param_bins[3][0]) {
				// frozen
				return getMountainSlopeBiome(noisePoint, special);
			} else {
				return getNearMountainBiome(noisePoint, special);
			}
		} else if (noisePoint[2] < param_bins[2][2]) {
			if (noisePoint[1] < param_bins[1][4]) {
				return getRegularBiome(noisePoint, special);
			} else if (noisePoint[1] < param_bins[1][5]) {
				return getBadlandsOrBiome(noisePoint, special);
			} else {
				return getNearMountainBiome(noisePoint, special);
			}
		} else if (noisePoint[2] < param_bins[2][3]) {
			if (noisePoint[1] < param_bins[1][4]) {
				return getRegularBiome(noisePoint, special);
			} else {
				return getBadlandsOrBiome(noisePoint, special);
			}
		} else if (noisePoint[2] < param_bins[2][4]) {
			if (!special && noisePoint[1] < param_bins[1][3]) {
				return getShoreBiome(noisePoint);
			} else {
				return getRegularBiome(noisePoint, special);
			}
		} else if (noisePoint[2] < param_bins[2][5]) {
			if (noisePoint[1] < param_bins[1][3]) {
				return getFlatShoreBiome(noisePoint, special);
			} else if (noisePoint[1] < param_bins[1][4]) {
				return getWindsweptSavannaOrBiome(noisePoint, special, getRegularBiome);
			} else {
				return getHillBiome(noisePoint, special);
			}
		} else if (noisePoint[1] < param_bins[1][3]) {
			if (!special) {
				return getShoreBiome(noisePoint, special);
			} else {
				return getRegularBiome(noisePoint, special);
			}
		} else if (noisePoint[3] < param_bins[3][0]) {
			// frozen
			return getRegularBiome(noisePoint, special);
		} else if (noisePoint[3] < param_bins[3][2]) {
			return "Swamp";
		} else {
			return "Mangrove Swamp";
		}
	}
	return "The Void";
}

function getLowBiome(noisePoint, special) {
	if (noisePoint[1] < param_bins[1][3] && noisePoint[2] < param_bins[2][2]) {
		return "Stony Shore";
	} else {
		if (noisePoint[2] < param_bins[2][1]) {
			if (noisePoint[1] < param_bins[1][4]) {
				return getBadlandsOrBiome(noisePoint, special);
			} else {
				return getMountainStartBiome(noisePoint, special);
			}
		} else if (noisePoint[2] < param_bins[2][3]) {
			if (noisePoint[1] < param_bins[1][3]) {
				return getShoreBiome(noisePoint, special);
			} else if (noisePoint[1] < param_bins[1][4]) {
				return getRegularBiome(noisePoint, special);
			} else {
				return getBadlandsOrBiome(noisePoint, special);
			}
		} else if (noisePoint[2] < param_bins[2][4]) {
			if (noisePoint[1] < param_bins[1][3]) {
				return getShoreBiome(noisePoint, special);
			} else {
				return getRegularBiome(noisePoint, special);
			}
		} else if (noisePoint[2] < param_bins[2][5]) {
			if (noisePoint[1] < param_bins[1][3]) {
				return getFlatShoreBiome(noisePoint, special);
			} else if (noisePoint[1] < param_bins[1][4]) {
				return getWindsweptSavannaOrBiome(noisePoint, special, getRegularBiome);
			} else {
				return getRegularBiome(noisePoint, special);
			}
		} else if (noisePoint[1] < param_bins[1][3]) {
			return getShoreBiome(noisePoint, special);
		} else if (noisePoint[3] < param_bins[3][0]) {
			// frozen
			return getRegularBiome(noisePoint, special);
		} else if (noisePoint[3] < param_bins[3][2]) {
			return "Swamp";
		} else {
			return "Mangrove Swamp";
		}
	}
	return "The Void";
}

function getValleyBiome(noisePoint, special) {
	if (noisePoint[2] < param_bins[2][1] && noisePoint[1] < param_bins[1][3] && !special) {
		return "Stony Shore";
	} else if (noisePoint[2] < param_bins[2][1] && noisePoint[1] >= param_bins[1][4]) {
		return getBadlandsOrBiome(noisePoint, special);
	} else if (noisePoint[3] < param_bins[3][0]) {
		return "Frozen River";
	} else if (noisePoint[2] >= param_bins[2][5] && noisePoint[1] >= param_bins[1][3]) {
		if (noisePoint[3] < param_bins[3][2]) {
			return "Swamp";
		} else {
			return "Mangrove Swamp";
		}
	} else {
		return "River";
	}
	return "The Void";
}

function getPeakPeakBiome(noisePoint, special) {
	if (noisePoint[3] >= param_bins[3][3]) {
		return getBadlandsBiome(noisePoint, special);
	} else if (noisePoint[3] >= param_bins[3][2]) {
		return "Stony Peaks";
	} else if (special) {
		return "Frozen Peaks";
	} else {
		return "Jagged Peaks";
	}
}

function getMountainStartBiome(noisePoint, special) {
	if (noisePoint[3] < param_bins[3][0]) {
		return getMountainSlopeBiome(noisePoint, special);
	} else {
		return getBadlandsOrBiome(noisePoint, special);
	}
}

function getBadlandsOrBiome(noisePoint, special) {
	if (noisePoint[3] >= param_bins[3][3]) {
		return getBadlandsBiome(noisePoint, special);
	} else {
		return getRegularBiome(noisePoint, special);
	}
}

function getBadlandsBiome(noisePoint, special) {
	if (noisePoint[4] >= param_bins[4][3]) {
		return "Wooded Badlands";
	} else if (noisePoint[4] < param_bins[4][2] && special) {
		return "Eroded Badlands";
	} else {
		return "Badlands";
	}
}

function getWindsweptSavannaOrBiome(noisePoint, special, otherBiome) {
	if (special && noisePoint[3] >= param_bins[3][1] && noisePoint[4] < param_bins[4][4]) {
		return "Windswept Savanna";
	} else {
		return otherBiome(noisePoint, special);
	}
}

function getMountainSlopeBiome(noisePoint, special) {
	if (noisePoint[3] >= param_bins[3][2]) {
		return getNearMountainBiome(noisePoint, special);
	} else if (noisePoint[4] < param_bins[4][1]) {
		return "Snowy Slopes";
	} else {
		return "Grove";
	}
}

function getShoreBiome(noisePoint) {
	if (noisePoint[3] < param_bins[3][0]) {
		return "Snowy Beach";
	} else if (noisePoint[3] >= param_bins[3][3]) {
		return "Desert";
	} else {
		return "Beach";
	}
}

function getFlatShoreBiome(noisePoint, special) {
	if (!special) {
		return getWindsweptSavannaOrBiome(noisePoint, special, getShoreBiome);
	} else {
		return getWindsweptSavannaOrBiome(noisePoint, special, getRegularBiome);
	}
}

const commonBiomes = [
	["Snowy Plains", "Snowy Plains", "Snowy Plains", "Snowy Taiga", "Taiga"],
	["Plains", "Plains", "Forest", "Taiga", "Old Growth Spruce Taiga"],
	["Flower Forest", "Plains", "Forest", "Birch Forest", "Dark Forest"],
	["Savanna", "Savanna", "Forest", "Jungle", "Jungle"],
	["Desert", "Desert", "Desert", "Desert", "Desert"]
];
const specialCommonBiomes = [
	["Ice Spikes", null, "Snowy Taiga", null, null],
	[null, null, null, null, "Old Growth Pine Taiga"],
	["Sunflower Plains", null, null, "Old Growth Birch Forest", null],
	[null, null, "Plains", "Sparse Jungle", "Bamboo Jungle"],
	[null, null, null, null, null]
];
const nearMountainBiomes = [
	["Snowy Plains", "Snowy Plains", "Snowy Plains", "Snowy Taiga", "Snowy Taiga"],
	["Meadow", "Meadow", "Forest", "Taiga", "Old Growth Spruce Taiga"],
	["Meadow", "Meadow", "Meadow", "Meadow", "Dark Forest"],
	["Savanna Plateau", "Savanna Plateau", "Forest", "Forest", "Jungle"],
	["Badlands", "Badlands", "Badlands", "Wooded Badlands", "Wooded Badlands"]
];
const specialNearMountainBiomes = [
	["Ice Spikes", null, null, null, null],
	["Cherry Grove", null, "Meadow", "Meadow", "Old Growth Pine Taiga"],
	["Cherry Grove", "Cherry Grove", "Forest", "Birch Forest", null],
	[null, null, null, null, null],
	["Eroded Badlands", "Eroded Badlands", null, null, null]
];
const hillBiomes = [
	["Windswept Gravelly Hills", "Windswept Gravelly Hills", "Windswept Hills", "Windswept Forest", "Windswept Forest"],
	["Windswept Gravelly Hills", "Windswept Gravelly Hills", "Windswept Hills", "Windswept Forest", "Windswept Forest"],
	["Windswept Hills", "Windswept Hills", "Windswept Hills", "Windswept Forest", "Windswept Forest"],
	[null, null, null, null, null],
	[null, null, null, null, null]
];

function getRegularBiome(noisePoint, special) {
	let temperature_index = -1;
	let humidity_index = -1;
	for (let i = 0; i < 4; ++i) {
		if (noisePoint[3] < param_bins[3][i] && temperature_index == -1) {
			temperature_index = i;
		}
		if (noisePoint[4] < param_bins[4][i] && humidity_index == -1) {
			humidity_index = i;
		}
	}
	if (temperature_index == -1) {
		temperature_index = 4;
	}
	if (humidity_index == -1) {
		humidity_index = 4;
	}
	
	let biome = commonBiomes[temperature_index][humidity_index];
	let biome2 = specialCommonBiomes[temperature_index][humidity_index];
	if (special && biome2 != null) {
		return biome2;
	} else {
		return biome;
	}
}

function getNearMountainBiome(noisePoint, special) {
	let temperature_index = -1;
	let humidity_index = -1;
	for (let i = 0; i < 4; ++i) {
		if (noisePoint[3] < param_bins[3][i] && temperature_index == -1) {
			temperature_index = i;
		}
		if (noisePoint[4] < param_bins[4][i] && humidity_index == -1) {
			humidity_index = i;
		}
	}
	if (temperature_index == -1) {
		temperature_index = 4;
	}
	if (humidity_index == -1) {
		humidity_index = 4;
	}
	
	let biome = nearMountainBiomes[temperature_index][humidity_index];
	let biome2 = specialNearMountainBiomes[temperature_index][humidity_index];
	if (special && biome2 != null) {
		return biome2;
	} else {
		return biome;
	}
}

function getHillBiome(noisePoint, special) {
	let temperature_index = -1;
	let humidity_index = -1;
	for (let i = 0; i < 4; ++i) {
		if (noisePoint[3] < param_bins[3][i] && temperature_index == -1) {
			temperature_index = i;
		}
		if (noisePoint[4] < param_bins[4][i] && humidity_index == -1) {
			humidity_index = i;
		}
	}
	if (temperature_index == -1) {
		temperature_index = 4;
	}
	if (humidity_index == -1) {
		humidity_index = 4;
	}
	
	let biome = hillBiomes[temperature_index][humidity_index];
	if (biome === null) {
		return getRegularBiome(noisePoint, special);
	} else {
		return biome;
	}
}
