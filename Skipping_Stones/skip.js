inlets = 1;
outlets = 3;
// Outlet 0 = skip number (1, 2, 3, etc...)
// Outlet 1 = new data (v_ang, v_lin, pos) -> only if no skip! This sets the stones location to somewhere it can't be seen
// Outlet 2 = reason for skip end

var PITCH_CENTER = -90;
var PITCH_BOUND = 20; // How many degrees we can be off from the center on either side
var ROLL_CENTER = 0;
var ROLL_BOUND = 20;
var V_MIN = 20;
var V_VERT_MIN = 1;
var V_VERT_MAX = 10;
var YAW_MIN = 20;
var YEET_MIN = 6000000000;

var v_lin = [];
var v_ang = [];
var rot = [];
var pos = [];

var skipNum = 1;

function bang(){
	if(-v_lin[2] < V_MIN){
		noSkip("velocity too slow\n");
		return;
	}else if((v_lin[1]<0) && (-v_lin[1] < V_VERT_MIN)){
		noSkip("Vertical velocity too slow\n");
		return;	 
	}else if((v_lin[1]<0) && (-v_lin[1] > V_VERT_MAX)){
		noSkip("Vertical velocity too great\n");
		return;	 
	}else if(Math.abs(rot[0] - PITCH_CENTER) > PITCH_BOUND){
		noSkip("Outside pitch bound\n");
		return;
	}else if(Math.abs(rot[2] - ROLL_CENTER) > ROLL_BOUND){
		noSkip("Outside roll bound\n");
		return;	 
	}

	outlet(0, skipNum);
	skipNum++;
	
}

function noSkip(reason){
	var newData = []; // (pitch, yaw, rool, forward/back, up/down, direction of throw)
	newData[0] = 0;
	newData[1] = 0;
	newData[2] = 0;
	newData[3] = 0;
	newData[4] = 0;
	newData[5] = 0;
	newData[6] = 0;
	newData[7] = -15;
	newData[8] = 0;
	outlet(0, skipNum);
	skipNum++;
	outlet(1, newData);
	outlet(2, reason);
	skipNum = 1;
}

function position(x, y, z){
	pos = [];
	pos[0] = x;
	pos[1] = y;
	pos[2] = z;
}

function velocity(x, y, z){
	v_lin = [];
	v_lin[0] = x;
	v_lin[1] = y;
	v_lin[2] = z;
}

function velocity_ang(x, y, z){
	v_ang = [];
	v_ang[0] = x;
	v_ang[1] = y;
	v_ang[2] = z;
}

function rotatexyz(x, y, z){
	rot = [];
	rot[0] = x;
	rot[1] = y;
	rot[2] = z;
}