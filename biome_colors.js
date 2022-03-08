/* This file contains ONLY biomes found in the Overworld.
   Excluded are:
   - The Void
   - all 5 Nether biomes
   - all 5 End biomes
*/
// Biomes to be added in 1.19 are commented out.

function getAmidstColor(biome)
{
	return amidstColors.get(biome);
}

function getJjColor(biome)
{
	return jjColors.get(biome);
}

const amidstColors = new Map([
	["Badlands",                 "#D94515"],
	["Bamboo Jungle",            "#768E14"],
	["Beach",                    "#FADE55"],
	["Birch Forest",             "#307444"],
	["Cold Ocean",               "#202070"],
	["Dark Forest",              "#40511A"],
	["Deep Cold Ocean",          "#202038"],
	//["Deep Dark",                "#142F38"], // color unknown
	["Deep Frozen Ocean",        "#404090"],
	["Deep Lukewarm Ocean",      "#000040"],
	["Deep Ocean",               "#000030"],
	["Desert",                   "#FA9418"],
	["Dripstone Caves",          "#C1A58F"],
	["Eroded Badlands",          "#FF6D3D"],
	["Flower Forest",            "#2D8E49"],
	["Forest",                   "#056621"],
	["Frozen Ocean",             "#7070D6"],
	["Frozen Peaks",             "#EAFBFB"],
	["Frozen River",             "#A0A0FF"],
	["Grove",                    "#DFECE5"],
	["Ice Spikes",               "#B4DCDC"],
	["Jagged Peaks",             "#E3ECED"],
	["Jungle",                   "#537B09"],
	["Lukewarm Ocean",           "#000090"],
	["Lush Caves",               "#DF9634"],
	//["Mangrove Swamp",           "#434F44"], // color unknown
	["Meadow",                   "#8CA470"],
	["Mushroom Fields",          "#FF00FF"],
	["Ocean",                    "#000070"],
	["Old Growth Birch Forest",  "#589C6C"],
	["Old Growth Pine Taiga",    "#596651"],
	["Old Growth Spruce Taiga",  "#818E79"],
	["Plains",                   "#8DB360"],
	["River",                    "#0000FF"],
	["Savanna",                  "#BDB25F"],
	["Savanna Plateau",          "#A79D64"],
	["Snowy Beach",              "#FAF0C0"],
	["Snowy Plains",             "#FFFFFF"],
	["Snowy Slopes",             "#DAF1F1"],
	["Snowy Taiga",              "#31554A"],
	["Sparse Jungle",            "#628B17"],
	["Stony Peaks",              "#D1D1D1"],
	["Stony Shore",              "#A2A284"],
	["Sunflower Plains",         "#B5DB88"],
	["Swamp",                    "#07F9B2"],
	["Taiga",                    "#0B6659"],
	["Warm Ocean",               "#0000AC"],
	["Windswept Forest",         "#22551C"],
	["Windswept Gravelly Hills", "#888888"],
	["Windswept Hills",          "#606060"],
	["Windswept Savanna",        "#E5DA87"],
	["Wooded Badlands",          "#B09765"]
]);

const jjColors = new Map([
	["Badlands",                 "#B2602D"],
	["Bamboo Jungle",            "#2EB709"],
	["Beach",                    "#DBCFA3"],
	["Birch Forest",             "#7F9B60"],
	["Cold Ocean",               "#3D57D6"],
	["Dark Forest",              "#417A22"],
	["Deep Cold Ocean",          "#3248AD"],
	//["Deep Dark",                "#142F38"],
	["Deep Frozen Ocean",        "#3131B2"],
	["Deep Lukewarm Ocean",      "#3A92C9"],
	["Deep Ocean",               "#3664C1"],
	["Desert",                   "#C1B178"],
	["Dripstone Caves",          "#876059"],
	["Eroded Badlands",          "#BF6721"],
	["Flower Forest",            "#598C38"],
	["Forest",                   "#6BA845"],
	["Frozen Ocean",             "#6678E4"],
	["Frozen Peaks",             "#A1C2FC"],
	["Frozen River",             "#759DF9"],
	["Grove",                    "#CCF9D0"],
	["Ice Spikes",               "#C6DBFE"],
	["Jagged Peaks",             "#D7DDE5"],
	["Jungle",                   "#259107"],
	["Lukewarm Ocean",           "#45ADF2"],
	["Lush Caves",               "#36661C"],
	//["Mangrove Swamp",           "#434F44"], // color not finalized
	["Meadow",                   "#8DBA92"],
	["Mushroom Fields",          "#856D79"],
	["Ocean",                    "#3F76E4"],
	["Old Growth Birch Forest",  "#688246"],
	["Old Growth Pine Taiga",    "#6A4B2A"],
	["Old Growth Spruce Taiga",  "#4F371F"],
	["Plains",                   "#91BD59"],
	["River",                    "#427DF4"],
	["Savanna",                  "#B5AA32"],
	["Savanna Plateau",          "#998C2A"],
	["Snowy Beach",              "#EAE7D6"],
	["Snowy Plains",             "#F9FEFE"],
	["Snowy Slopes",             "#DAF2F2"],
	["Snowy Taiga",              "#ADEDB2"],
	["Sparse Jungle",            "#64C73F"],
	["Stony Peaks",              "#94989E"],
	["Stony Shore",              "#B7B7B7"],
	["Sunflower Plains",         "#ABE060"],
	["Swamp",                    "#576658"],
	["Taiga",                    "#6B9968"],
	["Warm Ocean",               "#43D5EE"],
	["Windswept Forest",         "#688266"],
	["Windswept Gravelly Hills", "#847F7F"],
	["Windswept Hills",          "#849A84"],
	["Windswept Savanna",        "#968A67"],
	["Wooded Badlands",          "#97754A"]
]);

console.log("Biome colors loaded");
