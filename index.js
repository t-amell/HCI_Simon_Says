
let modal = document.getElementById("consentModal");
let wrongModal =  document.getElementById("wrongAnswerModal");
let grid = document.getElementById("grid");
let instructions = document.getElementById("instructions");
let agreeButton = document.getElementById("agreeButton");
let toggleButton = document.getElementById("toggleButton");
let newSeqButton = document.getElementById("newSeqButton");

var playThrough = 0;
var timeoutIds = [];
var sequence = [];
var answer = [];
var colors = ["green", "red", "yellow", "blue"];
var allowedToPlay = false;

function closeModal() {
    toggleVisual([toggleButton, newSeqButton], [modal])
    beginStudy();
}

function beginStudy() {
    toggleVisual([grid], [agreeButton]);
    instructions.innerHTML = "Remember this sequence!"
    getSequence();
}

function getSequence() {
    for (sequenceMax = 0; sequenceMax < 5; sequenceMax++) {
        var slot = Math.floor(Math.random() * 4);
        sequence.push(colors[slot]);
    }
    for (amount = 5; amount <= 5; amount++) {
        playSequence(sequence.slice(0, amount));
    }
}

function playerClick(color) {
    if(!allowedToPlay){
        return;
    }
    switch(color){
        case "red":
            document.getElementById(color).src="colors/" + color + "Up.png";
            setTimeout(function(){
                document.getElementById(color).src="colors/" + color + ".png";
            }, 150);
            break;
        case "green":
            document.getElementById(color).src="colors/" + color + "Up.png";
            setTimeout(function(){
                document.getElementById(color).src="colors/" + color + ".png";
            }, 150);
            break;
        case "yellow":
            document.getElementById(color).src="colors/" + color + "Up.png";
            setTimeout(function(){
                document.getElementById(color).src="colors/" + color + ".png";
            }, 150);
            break;
        case "blue":
            document.getElementById(color).src="colors/" + color + "Up.png";
            setTimeout(function(){
                document.getElementById(color).src="colors/" + color + ".png";
            }, 150);
            break;
        default:
            break;
    }   
    enterSequence(color);
}

function playSequence(sequence) {

    sequence.forEach((color, index) => {
        timeoutIds.push(setTimeout(function(){
            document.getElementById(color).src="colors/" + color + "Up.png";
        }, (index * 1500) + 500));
        timeoutIds.push(setTimeout(function(){
            document.getElementById(color).src="colors/" + color + ".png";
        }, ((index + 1) * 1500) - 500));
    }); 
    timeoutIds.push(setTimeout(function(){
        instructions.innerHTML = "Repeat the sequence!"
        allowedToPlay = true;
    }, (sequence.length * 1500) - 500));
}

function enterSequence(color) {
	if(!allowedToPlay){
		return;
	}
	
	answer.push(color);
    console.log(answer)
	
	compareAnswer();
}

function compareAnswer(){
    var works = true;
	answer.forEach((color, index) => {
        if(sequence[index] != color) {
            toggleVisual([wrongModal], [grid])
            works = false;
            console.log("Incorrect")
        }
    });

    if (works && answer.length >= sequence.length) {
        playThrough++;
        console.log("works");
        restartGrid();
    }
	
}

function toggleVisual(toShow, toHide) {
    toShow.forEach((element) => {
        element.style.display = "block";
    })
    toHide.forEach((element) => {
        element.style.display = "none";
    })
}

function toggleModal() {
    if (modal.style.display == "none") {
        resetColors();
        toggleVisual([modal], [grid, newSeqButton]);
    } else {
        toggleVisual([grid, newSeqButton], [modal]);
        restartGrid();
    }
}

function restartGrid(){
    allowedToPlay = false;
    resetColors();
    if (playThrough > 4) {
        beginEndingSurvey();
    } else {
        answer = [];
        sequence = [];
        toggleVisual([grid], [wrongModal]);
        instructions.innerHTML = "Remember this sequence!"
        getSequence();
    }
}

function getNewSequence() {
    instructions.innerHTML = "Getting New Sequence!"
    resetColors();
    timeoutIds.push(setTimeout(function(){
        restartGrid();
    }, 2000));
}

function resetColors(){
    timeoutIds.forEach((id) => {
        clearTimeout(id);
    });
    colors.forEach((color) => {
        document.getElementById(color).src="colors/" + color + ".png";
    });
}