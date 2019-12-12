// Calculates mean time between bangs over last NUM_BANG bangs
// NOTE: Needs NUM_BANG bangs before outputing a value
inlets = 1;
outlets = 1;

var bigSum = 0;
var count = 0;
var lastTime = -1;
var dt_list = [];
var NUM_BANGS = 1000;

function bang(){
	var d = new Date();	
	var t = d.getTime();
	if(lastTime == -1){
		lastTime = d.getTime();
	}else if(count < NUM_BANGS){
		var dt = t - lastTime;
		lastTime = t;
		bigSum += dt;
		dt_list.push(dt);
		count++;
	}else{
		var dt = t - lastTime;
		lastTime = t;
		bigSum -= dt_list.shift();
		bigSum += dt;
		dt_list.push(dt);
		outlet(0,bigSum/NUM_BANGS);
	}	
}