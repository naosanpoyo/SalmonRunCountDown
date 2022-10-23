var count = 100;
var prevCount = 100;
var isMoving = false;
var startTime = new Date();
var currentTime = new Date();
var spawnTime = [100, 85.6, 71.2, 56.8, 42.4, 28, 13.6];
var spawnTimeLength = 7;
var spawnNum = 0;
onHazardLevel();
console.log(startTime.toString());

function onStart() {
	console.log('start');
	isMoving = true;
	startTime = new Date();
	if ($("#start10Sec").prop("checked")) {
		count = 110;
		prevCount = 110;
		spawnNum = 0;
	} else {
		count = 100;
		prevCount = 100;
		spawnNum = 1;
	}
	$("#timer").html(`${Math.floor(count)}`);
	var sound = new Audio('sound/205_system/start_02.wav');
	sound.play();
	countDown();
}

function onStop() {
	console.log('start');
	isMoving = false;
	if ($("#start10Sec").prop("checked")) {
		count = 110;
		prevCount = 110;
		spawnNum = 0;
	} else {
		count = 100;
		prevCount = 100;
		spawnNum = 1;
	}
	$("#timer").html(`${Math.floor(count)}`);
}

function countDown() {
	currentTime = new Date();
	prevCount = count;
	if ($("#start10Sec").prop("checked")) {
		count = 110 + (startTime.getTime() - currentTime.getTime())/1000;
	} else {
		count = 100 + (startTime.getTime() - currentTime.getTime())/1000;
	}
	if (prevCount >= 51 && count < 51 &&
		$("#notify50Sec").prop("checked")) {
		notify50Sec();
	}
	if (prevCount >= 31 && count < 31 &&
		$("#notify50Sec").prop("checked")) {
		notify30Sec();
	}
	if (prevCount >= 11 && count < 11 &&
		$("#notify50Sec").prop("checked")) {
		notify10Sec();
	}
	if (prevCount >= spawnTime[spawnNum] + 4 &&
		 count < spawnTime[spawnNum] + 4 &&
		 $("#notifySpawn").prop("checked")) {
		notifySpawn();
	}
	if (count <= 0) {
		count = 100;
		prevCount = 100;
		isMoving = false;
	}
	if (isMoving) {
		$("#timer").html(`${Math.floor(count)}`);
		setTimeout(countDown, 100);
	}
}

function notify50Sec() {
	var sound = new Audio('sound/502_jikan/jihou_50byou_01.wav');
	sound.play();
}

function notify30Sec() {
	var sound = new Audio('sound/502_jikan/jihou_30byou_01.wav');
	sound.play();
}

function notify10Sec() {
	var sound = new Audio('sound/502_jikan/jihou_10byou_01.wav');
	sound.play();
}

function notifySpawn() {
	console.log(`spawn ${spawnNum}`);
	var sound = new Audio('sound/503_count/3-0_01.wav');
	sound.play();
	spawnNum++;
}

function onHazardLevel() {
	value = $("#hazardLevel").val();
	console.log(`hazardLevel: ${value}`);
	switch (value) {
		case '1':
			spawnTime = [100, 85.6, 71.2, 56.8, 42.4, 28.0, 13.6];
			spawnTimeLength = 7;
			break;
		case '2':
			spawnTime = [100, 88.0, 76.0, 64.0, 52.0, 40.0, 28.0, 16.0, 4.0];
			spawnTimeLength = 9;
			break;
		case '3':
			spawnTime = [100, 89.7, 79.4, 69.1, 58.8, 48.5, 38.2, 27.9, 17.6, 7.3];
			spawnTimeLength = 10;
			break;
		case '4':
			spawnTime = [100, 91.0, 82.0, 73.0, 64.0, 55.0, 46.0, 37.0, 28.0, 19.0, 10.0, 1.0];
			spawnTimeLength = 12;
			break;
		case '5':
			spawnTime = [100, 92.0, 84.0, 76.0, 68.0, 60.0, 52.0, 44.0, 36.0, 28.0, 20.0, 12.0, 4.0];
			spawnTimeLength = 13;
			break;
	}
	var spawnStr = "オオモノ出現<br>";
	spawnNum = 0;
	for (i=0; i<spawnTimeLength; i++) {
		if (spawnTime[i] >= 28) {
			spawnStr += ` ${Math.round(spawnTime[i])},`;
		} else if (i !== spawnTimeLength - 1) {
			spawnStr += ` \(${Math.round(spawnTime[i])}\),`;
		} else {
			spawnStr += ` \(${Math.round(spawnTime[i])}\)`;
		}
		if (i === 6) {
			spawnStr += '<br>';
		}
		if (isMoving && count < spawnTime[i]) {
			spawnNum = i+1;
		}
	}
	$("#spawn").html(`<p>${spawnStr}</p>`);
}