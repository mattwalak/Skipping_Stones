// Takes in list of acceleration data points, adds them together (Discrete integral) and outputs expected velocity 
// Assumes all data points are equally spaced in time (Not true but close enough)
inlets = 1;
outlets = 1;
var mean = 0;

function list(v_in){
	var v = arrayfromargs(messagename,arguments);
	var bigSum = 0;
	for(var i = 0; i < v.length; i++){
		bigSum += v[i] * (mean/1000);
	}
	outlet(0, bigSum);
}

function meanTime(v){
	mean = v;
}