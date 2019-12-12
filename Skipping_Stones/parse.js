// Parses MobMuPlat network data
// Handles situations where data can't be parsed (Number expected but received string for /gyro, /accel, and /motion)
inlets = 1;
outlets = 6;
// 0 = tilt, 1 = compass, 2 = button, 3 = gyro, 4 = accel, 5 = motion


var count=0;


function bang()
{
	outlet(0,"myvalue", "is", "probably", "not", Math.random());
}

function anything(){
	var a = arrayfromargs(messagename, arguments);
	if(typeof a == "object"){
		if(a[0] == "/tilt"){
			var output = [a[1], a[2]];
			if((typeof a[1] == "string") || (typeof a[2] == "string")){
				//do nothing
			}else{
				outlet(0,output);
			}
		}else if(a[0] == "/compass"){
			outlet(1, a[1]);
		}else if(a[0] == "/Button1"){
			outlet(2, a[1]);
		}else if(a[0] == "/gyro"){
			var output = [a[1], a[2], a[3]];
			var output = [a[1], a[2], a[3]];
			if((typeof a[1] == "string") || (typeof a[2] == "string") || (typeof a[3] == "string")){
				//do nothing
			}else{
				outlet(3,output);
			}
		}else if(a[0] == "/accel"){
			var output = [a[1], a[2], a[3]];
			if((typeof a[1] == "string") || (typeof a[2] == "string") || (typeof a[3] == "string")){
				//do nothing
			}else{
				outlet(4,output);
			}
		}else if(a[0] == "/motion"){
			var output = [a[1], a[2], a[3]];
			if((typeof a[1] == "string") || (typeof a[2] == "string") || (typeof a[3] == "string")){
				// do nothing
			}else{
				outlet(5,output);
			}
		}
		
		
	}else{
		post("Unidentifiable UDP packet");
	}
	
}