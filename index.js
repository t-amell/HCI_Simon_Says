
let modal = document.getElementById("consentModal");
let wrongModal =  document.getElementById("wrongAnswerModal");
let grid = document.getElementById("grid");
let instructions = document.getElementById("instructions");
let agreeButton = document.getElementById("agreeButton");
let toggleButton = document.getElementById("toggleButton");

var playThrough = 0;
var timeoutIds = [];
var sequence = [];
var answer = [];
var colors = ["green", "red", "yellow", "blue"];
var allowedToPlay = false;
var correct = true;

function closeModal() {
    toggleVisual([toggleButton], [modal])
    beginStudy();
}

function beginStudy() {
    toggleVisual([grid], [agreeButton]);
    instructions.innerHTML = "Remember this sequence!"
    getSequence();
}

function getSequence() {
    var slot = Math.floor(Math.random() * 4);
    sequence.push(colors[slot]);
    playSequence();
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

function playSequence() {

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
    answer.push(color);
	if(!allowedToPlay){
		return;
	}
	if(answer.length == sequence.length){
        compareAnswer();
    }
}

function compareAnswer(){
	answer.forEach((color, index) => {
        if(sequence[index] != color) {
            toggleVisual([wrongModal], [grid])
            correct = false;
            console.log("Incorrect")
        }
    });

    if (correct) {
        if (answer.length >= 5) {
            playThrough++;
        }
        console.log("Correct");
        setTimeout(function(){
            restartGrid();
        }, 150);
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
    resetColors();
    if (modal.style.display == "none") {
        toggleVisual([modal], [grid]);
    } else {
        toggleVisual([grid], [modal]);
        instructions.innerHTML = "Remember this sequence!"
        playSequence();
    }
}

function restartGrid(){
    allowedToPlay = false;
    resetColors();
    if (playThrough > 4) {
        beginEndingSurvey();
    } else {
        if(answer.length >= 5 || !correct){
            sequence = [];
        }
        answer = [];
        toggleVisual([grid], [wrongModal]);
        instructions.innerHTML = "Remember this sequence!"
        getSequence();
    }
}

function resetColors(){
    timeoutIds.forEach((id) => {
        clearTimeout(id);
    });
    colors.forEach((color) => {
        document.getElementById(color).src="colors/" + color + ".png";
    });
}