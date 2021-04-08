
var modal = document.getElementById("consentModal");
var grid = document.getElementById("grid");
var instructions = document.getElementById("instructions")

function closeModal() {
    modal.style.display = "none";
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
    for (amount = 3; amount <= 5; amount++) {
        playSequence(sequence.slice(0, amount));
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
}