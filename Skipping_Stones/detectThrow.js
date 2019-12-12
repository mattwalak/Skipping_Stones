// Takes in a stream of input from linear acceleration in the x direction
// Outputs a sub-interval of data collected when a throw is detected
// A stone is thrown when x_lin_accel peaks above upper_v and then falls below lower_v within timeout_v seconds.
// start marks when x_lin_accel peaks above upper_v, end marks when x_lin_accel falls below zero
//		These markers are used to determine the in and out time points for our throw
inlets = 1;
outlets = 1;

var timeout_v = 800;
var upperPassed_time = -1;
var upper_v = 0.5;
var lower_v = -0.5;	

var start = -1;
var end = -1;

var current_value = -1;

function timeout(v){
	timeout_v = v;
}

function upper(v){
	upper_v = v;
}

function lower(v){
	lower_v = v;
}

function bang(){
	var v = current_value;
	
	// Update start and end (Recorded relative to how many samples ago they were seen)
	if(start != -1){
		start++;
	}
	if(end != 1){
		end++;
	}
	
	var d = new Date();
	if(upperPassed_time < 0){
		if(v > upper_v){
			// Passed upper_v
			upperPassed_time = d.getTime();
			start = 0;
		}
	}else{
		var n = d.getTime();
		
		if((n-upperPassed_time) > timeout_v){
			// TIMEOUT
			upperPassed_time = -1;
			start = -1;
			end = -1;
		}else{ 
			if(v < 0){
				// Found end time
				end = 0;
			}
			
			if(v < lower_v){
				// THROW DETECTED
				end = 0;
				var output = [start, end];
				outlet(0,output);
				upperPassed_time = -1;
				start = -1;
				end = -1;
			}
		}
	}	
}

// Stream of input is passed here
function input(v){
	current_value = v;
}