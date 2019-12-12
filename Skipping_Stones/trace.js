// Records and stores the last maxLength data points. If recording is set to true, trace.js outputs the new
// data list with every update
inlets = 1;
outlets = 2;

var maxLength = 400;
var recording = false;
var data = [];
var current_value;

function bang(){
	if(data.length > maxLength){
		data.shift();
	}
	data.push(current_value);
	if(recording){
		outlet(0, data);
	}
}

// Gets sub interval from 'start' entries ago to 'end' entries ago
function getSubInterval(start, end){
	var subInt = [];
	var s = 0;
	for(var i = (data.length - start); i < (data.length - end); i++){
		subInt[s] = data[i];
		s++;
	}
	
	outlet(1, subInt);
}

function input(v){
	current_value = v;
}

function record(v){
	if(v == 0){
		recording = false;
	}else{
		recording = true;
	}
}

function setmax(v){
	maxLength = v;
}