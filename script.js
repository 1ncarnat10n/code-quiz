// DOM variables
var title = document.getElementById('title');
var form = document.getElementById('form');
var startButton = document.getElementById('start-quiz');
var feedback = document.getElementById('feedback');
var timerDisplay = document.getElementById('timer');
var resetButton = document.getElementById('reset');
var submitScoreButton = document.getElementById('submit-score');
var clearScoresButton = document.getElementById('clear-scores');
var headerText = document.getElementById("header-text");
var viewScores = document.getElementById("view-scores");

// Non-DOM variables
var time = 60;
var providedAnswerIndex = 4;
var correctAnswerIndex = 0;
var deductedTime = '10';
var deductPoints = false;
var counter = 0;
var numberOfQuestions = 10;
var userInfo = {
    name: '',
    score: 0
}
var userScores = JSON.parse(localStorage.getItem("userScores"));
var counter2 = 0;

// Quiz questions
var questions = [
    {
        question:"What is the correct syntax for referring to an external script called 'xxx.js'?",
        choices: ["<script> name='xxx.js'","<script src='xxx.js'>","<script href='xxx.js'>","Trick question!"],
        answer: "<script src='xxx.js'>"
    },
    {
        question:"The external JavaScript file must contain the <script> tag.",
        choices: ["True", "False", "What?", "Trick question!"],
        answer: "False"
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        choices: ["alert('Hello World')", "msgBox('Hello World')", "msg('Hello World')", "alertBox('Hello World')"],
        answer: "alert('Hello World')"
    },
    {
        question:"How do you create a function in JavaScript?",
        choices: ["function:myFunction()", "function myFunction()", "function = myFunction()", "Trick question!"],
        answer: "function myFunction()"
    },
    {
        question: "How do you call a function named 'myFunction'?",
        choices: ["myFunction()", "call myFunction()", "call function myFunction()", "Trick question!"],
        answer:"myFunction()"
    },
    {
        question: "What is the correct way to write a JavaScript array?",
        choices: ["var colors = (1:'red', 2:'green', 3:'blue')", "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')", "var colors = 'red', 'green', 'blue'", "var colors = ['red', 'green', 'blue']"],
        answer: "var colors = ['red', 'green', 'blue']"},
    {
        question: "JavaScript is the same as Java.",
        choices: ["True", "False", "What?", "Trick question!"],
        answer: "False"
    },
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        choices: ["onmouseclick", "onmouseover", "onclick", "onchange"],
        answer: "onclick"
    },
    {
        question: "How do you declare a JavaScript variable?",
        choices: ["var firstName", "variable firstName", "v firstName", "Trick question!"],
        answer: "var firstName"
    },
    {
        question: "Which operator is used to assign a value to a variable?",
        choices: ["===", "==", "====", "="],
        answer: "="
    },
    {
        question: "What will the following code return: Boolean(10 > 9)",
        choices: ["true", "NaN", "false", "Trick question!"],
        answer: "true"
    },
];

// function to start the timer
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    var countdown = setInterval(function () {

        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        if (deductPoints) {
            timer = timer - parseInt(deductedTime);
        }

        deductPoints = false;
        display.textContent = "Time Left: " + minutes + ":" + seconds;

        if ((--timer < 0)||(counter == numberOfQuestions)) {
            userInfo.score = timer;          
            clearInterval(countdown);            
            form.style.display = "none";
            feedback.textContent = "Time's up! Your score is: " + timer;
            submitScoreButton.style.display = "block";
        }
    }, 1000);

    if (userInfo.score <= 0) {
        userInfo.score = 0;
    }
    
    return userInfo.score;
}

// Function to change to different question
function updateQuestion(){
    chosenQuestion = questions[(Math.floor(Math.random() * questions.length))];
    answer = chosenQuestion.answer;
    correctAnswerIndex = chosenQuestion.choices.indexOf(answer);

    document.getElementById('question').textContent = chosenQuestion.question;

    document.querySelector('label[for=option-1]').textContent = chosenQuestion.choices[0];
    document.querySelector('label[for=option-2]').textContent = chosenQuestion.choices[1];
    document.querySelector('label[for=option-3]').textContent = chosenQuestion.choices[2];
    document.querySelector('label[for=option-4]').textContent = chosenQuestion.choices[3];
}

function correctAnswerCheck() {
    if (providedAnswerIndex == correctAnswerIndex) {
        feedback.textContent = 'Correct!';
        deductPoints = false;
    }
    else {
        feedback.textContent = 'Incorrect! ' + deductedTime + ' seconds have been deducted!';
        deductPoints = true;
    }
}

// Function to save the scores
function saveScore() {
    if (!userScores) {
        userScores = [];
    }
    userScores.push(userInfo);
    localStorage.setItem("userScores", JSON.stringify(userScores));
}

// Function for displaying previous scores
function displayScores() {
    title.textContent = "Recent Scores";
    viewScores.style.display = "none";
    form.style.display = "none";
    timerDisplay.style.display = "none";
    submitScoreButton.style.display = "none";
    clearScoresButton.style.display = "block";

    if (counter2 == 0) {
        submitScoreButton.style.display = "block";
    }

    headerText.textContent = '';

    for (var i = 0; i < userScores.length; i++) {
        headerText.textContent += userScores[i].name + " had a score of " + userScores[i].score + ". " + "| ";
    }
}

// Function for clearing your scores
function clearScores() {
    localStorage.clear();
    submitScoreButton.style.display = "none"
    headerText.textContent = 'Scores have been cleared!';
}

userInfo.name = window.prompt("What is your name?");
form.style.display = "none";
submitScoreButton.style.display = "none";
clearScoresButton.style.display = "none";

// Displays the recent scores
viewScores.addEventListener('click', function() {
    if (JSON.parse(localStorage.getItem("userScores"))) {
        counter2++;
        displayScores();
    }
    else {
        window.alert("There are no recent scores.")
    }
});

// Displays the form
startButton.addEventListener('click', function() {
    counter2 = 0;
    
    title.textContent = "JavaScript Coding Quiz";
    headerText.textContent = "You will answer 10 random questions. Your score equals the seconds remaining from the timer. For each incorrect answer, 10 seconds will be deducted from the timer and score. If the time falls to 0 or below, you lose."

    updateQuestion();
    viewScores.style.display = "block";
    timerDisplay.style.display = "block";
    startButton.style.display = "none";
    form.style.display = "block";
    userInfo.score = startTimer(time, timerDisplay);
});

// Submits data from the form
form.addEventListener('submit', function(event){
    event.preventDefault();

    var firstOption = document.getElementById("option-1");
    var secondOption = document.getElementById("option-2");
    var thirdOption = document.getElementById("option-3");
    var fourthOption = document.getElementById("option-4");

    if (firstOption.checked){
        providedAnswerIndex = firstOption.value; 
        correctAnswerCheck();
        firstOption.checked = false;
    }
    if (secondOption.checked){
        providedAnswerIndex = secondOption.value;
        correctAnswerCheck();
        secondOption.checked = false;
    }
    if (thirdOption.checked){
        providedAnswerIndex = thirdOption.value;
        correctAnswerCheck();
        thirdOption.checked = false;
    }
    if (fourthOption.checked){
        providedAnswerIndex = fourthOption.value;
        correctAnswerCheck();
        fourthOption.checked = false;
    }

    counter++;

    if (counter < numberOfQuestions){
        updateQuestion();
    } 
});

// Resets the quiz by reloading the page
resetButton.addEventListener('click', function(){
    location.reload();
});

// Submits the user's score
submitScoreButton.addEventListener('click', function(){
    counter2++;
    saveScore();
    displayScores();
    viewScores.style.display = "none";
    timerDisplay.style.display = "none";
    feedback.style.display = "none";
    clearScoresButton.style.display = "block";
});

// Clears the recent scores from localStorage
clearScoresButton.addEventListener('click', function(){
    clearScores();
});