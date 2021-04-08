
var modal = document.getElementById("consentModal");
var grid = document.getElementById("grid");
var instructions = document.getElementById("instructions");
var agreeButton = document.getElementById("agreeButton");
var toggleButton = document.getElementById("toggleButton");

function closeModal() {
    modal.style.display = "none";
    agreeButton.style.display = "none";
    toggleButton.style.display = "initial";
    beginStudy();
}

function beginStudy() {
    grid.style.display = "block";
    instructions.innerHTML = "Remember this sequence!"
    getSequence();
}

function getSequence() {
    var colors = ["green", "red", "yellow", "blue"];
    var sequence = [];
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
            console.log("RED");
            break;
        case "green":
            console.log("GREEN");
            break;
        case "yellow":
            console.log("YELLOW");
            break;
        case "blue":
            console.log("BLUE");
            break;
        default:
            break;
    } 
}

function playSequence(sequence) {
    sequence.forEach((color, index) => {
        setTimeout(function(){
            document.getElementById(color).src="colors/" + color + "Up.png";
        }, (index * 2000) + 500);
        setTimeout(function(){
            document.getElementById(color).src="colors/" + color + ".png";
        }, ((index + 1) * 2000) - 500);
    }); 
    setTimeout(function(){
        allowedToPlay = true;
    }, (sequence.length * 2000) - 500)
}

var shown = false
function toggleModal() {
    if(!shown)
    {
        grid.style.display = "none";
        modal.style.display = "initial";
        shown = true;
    }   
    else
    {
        grid.style.display = "block";
        modal.style.display = "none";
        shown = false;
    }
        
}