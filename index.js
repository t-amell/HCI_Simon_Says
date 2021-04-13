
var modal = document.getElementById("consentModal");
var wrongModal =  document.getElementById("wrongAnswerModal");
var grid = document.getElementById("grid");
var instructions = document.getElementById("instructions");
var agreeButton = document.getElementById("agreeButton");
var toggleButton = document.getElementById("toggleButton");
var sequence = [];
var answer = [];

function closeModal() {
    toggleVisual(toggleButton, modal)
    beginStudy();
}

function beginStudy() {
    toggleVisual(grid, agreeButton);
    instructions.innerHTML = "Remember this sequence!"
    getSequence();
}

function getSequence() {
    var colors = ["green", "red", "yellow", "blue"];
    for (sequenceMax = 0; sequenceMax < 5; sequenceMax++) {
        var slot = Math.floor(Math.random() * 4);
        sequence.push(colors[slot]);
    }
    for (amount = 5; amount <= 5; amount++) {
        playSequence(sequence.slice(0, amount));
    }
}

var allowedToPlay = false;
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
        setTimeout(function(){
            document.getElementById(color).src="colors/" + color + "Up.png";
        }, (index * 1500) + 500);
        setTimeout(function(){
            document.getElementById(color).src="colors/" + color + ".png";
        }, ((index + 1) * 1500) - 500);
    }); 
    setTimeout(function(){
        instructions.innerHTML = "Repeat the sequence!"
        allowedToPlay = true;
    }, (sequence.length * 1500) - 500)
}

function enterSequence(color) {
	if(!allowedToPlay){
		return;
	}
	
	answer.push(color);
    console.log(answer)
	
	if(answer.length >= sequence.length){
		compareAnswer();
	}
}

function compareAnswer(){
    var works = true;
	sequence.forEach((color, index) => {
        if(answer[index] != color) {
            toggleVisual(wrongModal, grid)
            works = false;
            console.log("Incorrect")
        }
    })

    if (works) {
        //GOOD MODAL
        console.log("works")
    }
	
}

function toggleVisual(toShow, toDisappear) {
    toShow.style.display = "block";
    toDisappear.style.display = "none";
}

function restartGrid(){
    answer = [];
    sequence = [];
    toggleVisual(grid, wrongModal);
    instructions.innerHTML = "Remember this sequence!"
    getSequence();
}