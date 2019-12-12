// Takes in list of velocity data points and averages them over a specific interval
// Assumes all data points are equally spaced in time (Not true, but close enough)
inlets = 1;
outlets = 1;
var mean = 0;
var TAIL_FRAC = (1/3); // Fraction of the original data to average over (If TAIL_FRAC = 1/3 we only average over the last 1/3 of the data)

function list(v_in){
	var v = arrayfromargs(messagename,arguments);
	var bigSum = 0;
	var length = Math.ceil(v.length*TAIL_FRAC);
	
	for(var i = v.length-length; i < v.length; i++){
		bigSum += v[i];
	}
	outlet(0, bigSum/v.length);
}

function meanTime(v){
	mean = v;
}