
let modal = document.getElementById("consentModal");
let wrongModal =  document.getElementById("wrongAnswerModal");
let grid = document.getElementById("grid");
let instructions = document.getElementById("instructions");
let agreeButton = document.getElementById("agreeButton");
let toggleButton = document.getElementById("toggleButton");
let midSurvey = document.getElementById("midSurvey");
let endSurvey = document.getElementById("endSurvey")
let end = document.getElementById("end")

let sound1 = document.getElementById("sound-1");
let sound2 = document.getElementById("sound-2");
let sound3 = document.getElementById("sound-3");
let sound4 = document.getElementById("sound-4");
let sound5 = document.getElementById("sound-5");

//Array for sounds
let sounds = [1, 2, 3, 4, 5]

var playThrough = 0;
var timeoutIds = [];
var sequence = [];
var answer = [];
var colors = ["green", "red", "yellow", "blue"];
var allowedToPlay = false;
var correct = true;
var timestamps = []
var start = new Date().getTime();

var userMidSurvey = "";

toggleVisual([modal], [toggleButton])

function closeModal() {
    toggleVisual([toggleButton], [modal])
    start = new Date().getTime();
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
        start = new Date().getTime();
    }, (sequence.length * 1500) - 500));
}

function enterSequence(color) {
    answer.push(color);
	if(!allowedToPlay){
		return;
	}
    compareAnswer();
}

function compareAnswer(){
	answer.forEach((color, index) => {
        if(sequence[index] != color) {
            toggleVisual([wrongModal], [grid])
            correct = false;
            console.log("Incorrect")
        }
    });
    if (correct && answer.length == sequence.length) {
        console.log("Correct");
        var end = new Date().getTime();
        timestamps.push((end - start))
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
    if (!correct){
        answer = [];
        sequence = [];
        correct = true;
    }
    if (playThrough > 4) {
        beginEndingSurvey();
    } else {
        if (answer.length >= 5) {
            playSound(playThrough);
            answer = [];
            sequence = [];
            toggleVisual([midSurvey], [grid, toggleButton]);
        } else {
            toggleVisual([grid, toggleButton], [midSurvey, wrongModal])
            answer = [];
            instructions.innerHTML = "Remember this sequence!"
            getSequence();
        }
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

function concat(){
    userMidSurvey += "Playthrough " + (playThrough + 1) + ": " + "Pleasant Rating-" + document.getElementById("pleasantRating").value + " " 
    + "Enhance Rating-" + document.getElementById("enhanceRating").value + " Time Between Last Flash and Correct Answer-" + timestamps[playThrough] + "ms<br>";
    console.log(userMidSurvey);
    playThrough++;
    restartGrid();
}

function beginEndingSurvey(){
    toggleVisual([endSurvey],[grid, toggleButton, midSurvey])
}

function submitExperiment(){
    var finalMessage = userMidSurvey + "<br>" + 
    "Age: " + document.getElementById("age").value + "<br>" +
    "Computer Usage: " + document.getElementById("compUsage").value + "<br>" +
    "Student Status: " + document.getElementById("student").value + "<br>" +
    "Did Sounds Change Experience: " + document.getElementById("experience").value + "<br>" +
    "Positive or Negative Change: " + document.getElementById("pos-neg").value + "<br>" +
    "Favorite Sound: " + document.getElementById("favorite").value + "<br>" +
    "Problems With Site: " + document.getElementById("siteProblems").value + "<br>" +
    "Suggestions: " + document.getElementById("suggestions").value + "<br><br>" +
    "Navigator: " + navigator.userAgent + "<br>";
    sendEmail(finalMessage);
    toggleVisual([end],[endSurvey]);
}

function playSound(element){
    switch(element){
        case 1:
            sound1.play();
            break;
        case 2:
            sound2.play();
            break;
        case 3:
            sound3.play();
            break;
        case 4:
            sound4.play();
            break;
        case 5:
            sound5.play();
            break;
        default:
            console.log("ERROR NO SOUND-" + soundID);
            break;
    }
}

function sendEmail(body) {
    Email.send({
      Host: "smtp.gmail.com",
      Username: "hci.simon.says@gmail.com",
      Password: "hcidavekopec",
      To: 'hci.simon.says@gmail.com',
      From: "hci.simon.says@gmail.com",
      Subject: "Test Results",
      Body: body,
    });
  }