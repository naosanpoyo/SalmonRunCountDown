const x0 = -6000;
const x1 = 6200;
const z0 = -33900;
const z1 = 32700;
var xmin = 0;
var xmax = 0;
var str = "";
var cflg;
var xa;
var za;
var numitr = 0;

function findz()
{
	textbox_xmin = document.getElementById("xmin");
 	xmin = Math.fround(textbox_xmin.value);
	textbox_xmax = document.getElementById("xmax");
 	xmax = Math.fround(textbox_xmax.value);
	str = "x:" + xmin + "~" + xmax + "の検索結果<br><br>";
	for(var x=xmin;x<=xmax;x=nextFloat(x)){
		za = Math.fround((x+6000)/(6200+6000)*(32700+33900)-33900);
		cflg = 3;
		z = za;
		while(cflg>0){
			z = prevFloat(z);
			console.log(checkFloor(x,z));
			if(!checkFloor(x,z)){
				cflg -= 1;
				if(cflg===0){
					str = str + "x=" + x +"<br> z=" + z + " NG<br>";
				}
			}
		}
		cflg = 6;
		while(cflg>0){
			z = nextFloat(z);
			if(checkFloor(x,z)){
				str = str + " z=" + z + " OK<br>";
			}else{
				cflg -= 1;
				str = str + " z=" + z + " NG<br>";
				if(cflg===0){
					str = str + "<br>";
				}
			}
		}
		document.getElementById('resultlist').innerHTML = str;
		numitr++;
		if(numitr>100){
			str += "範囲が広すぎます。<br><br>"
			break;
		}
	}
	document.getElementById('resultlist').innerHTML = str + "end";
}

function findx()
{
	textbox_zmin = document.getElementById("zmin");
 	zmin = Math.fround(textbox_zmin.value);
	textbox_zmax = document.getElementById("zmax");
 	zmax = Math.fround(textbox_zmax.value);
	str = "z:" + zmin + "~" + zmax + "の検索結果<br><br>";
	for(var z=zmin;z<=zmax;z=nextFloat(z)){
		xa = Math.fround((z+33900)/(32700+33900)*(6200+6000)-6000);
		cflg = 3;
		x = xa;
		while(cflg>0){
			x = prevFloat(x);
			console.log(checkFloor(x,z));
			if(!checkFloor(x,z)){
				cflg -= 1;
				if(cflg===0){
					str = str + "z=" + z +"<br> x=" + x + " NG<br>";
				}
			}
		}
		cflg = 6;
		while(cflg>0){
			x = nextFloat(x);
			if(checkFloor(x,z)){
				str = str + " x=" + x + " OK<br>";
			}else{
				cflg -= 1;
				str = str + " x=" + x + " NG<br>";
				if(cflg===0){
					str = str + "<br>";
				}
			}
		}
		document.getElementById('resultlist').innerHTML = str;
		numitr++;
		if(numitr>100){
			str += "範囲が広すぎます。<br><br>"
			break;
		}
	}
	document.getElementById('resultlist').innerHTML = str + "end";
}

function checkFloor(x,z){
	return Math.fround(Math.fround(z0-z)*Math.fround(x1-x0)-Math.fround(Math.fround(x0-x)*Math.fround(z1-z0)))<-1 && Math.fround((Math.fround(z1-z)*Math.fround(x0-x1))-(Math.fround(x1-x)*Math.fround(z0-z1)))<-1;
}

function nextFloat(f) {
    // Note that this moves away from 0.0
    // It will fail at +/- infinity and result in an NaN
    var bitRepr = floatToBits(f);
    bitRepr++;
    return bitsToFloat(bitRepr);
}

function prevFloat(f) {
    // Note that this moves towards 0.0
    // This will fail at 0.0 and result in an NaN
    var bitRepr = floatToBits(f);
    bitRepr--;
    return bitsToFloat(bitRepr);
}

function floatToBits(f) {
    var buf = new ArrayBuffer(4);
    (new Float32Array(buf))[0] = f;
    return (new Uint32Array(buf))[0];
}

function bitsToFloat(b) {
    var buf = new ArrayBuffer(4);
    (new Uint32Array(buf))[0] = b;
    return (new Float32Array(buf))[0];
}