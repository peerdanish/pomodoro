//selectors
let minutes = document.querySelector('#minutes');
let seconds = document.querySelector('#seconds');
const plusSession = document.querySelector('div#session-time .buttons .plus');
const minusSession = document.querySelector('div#session-time .buttons .minus');
const plusBreak = document.querySelector('div#break-time .buttons .plus');
const minusBreak = document.querySelector('div#break-time .buttons .minus');
const sessionValue = document.getElementById('session-value');
const breakValue = document.getElementById('break-value');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
let sessionHeading = document.querySelector('div.container>h3');

//global variables
let sessionCount = sessionValue.innerText;
let breakCount = breakValue.innerText;
let intervalId1;
let intervalId2;
let sessionCountBlock = 1;

//event listeners
plusSession.addEventListener('click', incrementSession);
minusSession.addEventListener('click', decrementSession);
plusBreak.addEventListener('click', incrementBreak);
minusBreak.addEventListener('click', decrementBreak);
pauseBtn.addEventListener('click', pauseStart);
resetBtn.addEventListener('click', reset);

//functions
function incrementSession(e) {
	e.preventDefault();
	sessionCount++;
	sessionValue.innerText = sessionCount;
}

function decrementSession(e) {
	e.preventDefault();
	if (sessionCount > 0) sessionCount--;
	sessionValue.innerText = sessionCount;
}

function incrementBreak(e) {
	e.preventDefault();
	breakCount++;
	breakValue.innerText = breakCount;
}

function decrementBreak(e) {
	e.preventDefault();
	if (breakCount > 0) breakCount--;
	breakValue.innerText = breakCount;
}
function pauseStart(e) {
	e.preventDefault();
	if (pauseBtn.innerText == 'Start') {
		pauseBtn.innerText = 'Pause';
		interval();
	} else {
		pauseBtn.innerText = 'Start';
		sessionHeading.innerHTML = `<p id = "blink">Break!</p`;
		clearInterval(intervalId1);
	}
}

function interval() {
	//handle session time
	let breakStatus = false;
	if (minutes.innerText <= 0 && seconds.innerText <= 0) {
		sessionCountBlock++;
		minutes.innerText = sessionValue.innerText;
	} else if (minutes.innerText == 25 && seconds.innerText == 0) {
		minutes.innerText = sessionValue.innerText;
		console.log('aye bhai hogaya set');
	}
	disableBtns('true');
	sessionHeading.innerHTML = `<p>Session ${sessionCountBlock}</p`;
	console.log(sessionHeading.innerText);
	intervalId1 = setInterval(function () {
		if (
			!(minutes.innerText == 0 && seconds.innerText == 0) &&
			breakStatus == false
		) {
			if (seconds.innerText != 0) {
				seconds.innerText--;
				seconds.innerText =
					seconds.innerText < 10 ? '0' + seconds.innerText : seconds.innerText;
			} else if (minutes.innerText != 0 && seconds.innerText == 0) {
				seconds.innerText = 59;
				minutes.innerText--;

				minutes.innerText =
					minutes.innerText < 10 ? '0' + minutes.innerText : minutes.innerText;
			}
		}
		//handle break time
		if (minutes.innerText == 0 && seconds.innerText == 0) {
			clearInterval(intervalId1);
			breakStatus = !breakStatus;
			if (breakStatus == true) {
				sessionHeading.innerHTML = `<p id = "blink">Break!</p`;
				minutes.innerText = breakValue.innerText;
				intervalId2 = setInterval(function () {
					if (breakValue.innerText != 0) {
						console.log(minutes.innerText);
						if (seconds.innerText != 0) {
							seconds.innerText--;
							seconds.innerText =
								seconds.innerText < 10
									? '0' + seconds.innerText
									: seconds.innerText;
						} else if (minutes.innerText != 0 && seconds.innerText == 0) {
							seconds.innerText = 59;
							minutes.innerText--;
							if (minutes.innerText < 10) {
								minutes.innerText =
									minutes.innerText < 10
										? '0' + minutes.innerText
										: minutes.innerText;
							}
						} else {
							breakStatus = !breakStatus;
							clearInterval(intervalId2);
							interval();
						}
					}
				}, 1000);
			}
		}
	}, 1000);
}
//disable buttons when timer running
function disableBtns(value) {
	plusSession.disabled = value;
	minusSession.disabled = value;
	plusBreak.disabled = value;
	minusBreak.disabled = value;
	console.log(plusSession.disabled);
}
//reset to factory values
function reset(e) {
	clearInterval(intervalId1);
	clearInterval(intervalId2);
	minutes.innerText = 25;
	seconds.innerText = 0 + '0';
	sessionValue.innerText = 25;
	breakValue.innerText = 5;
	sessionCount = sessionValue.innerText;
	breakCount = breakValue.innerText;
	console.log('main chala');
	disableBtns(false);
	pauseBtn.innerText = 'Start';
	sessionHeading.innerHTML = `<p>Session</p`;
}
