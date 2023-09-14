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
var numberOfQuestions = 5;
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
        choices: ["var carName", "variable carName", "v carName", "Trick question!"],
        answer: "var carName"
    },
    {
        question: "Which operator is used to assign a value to a variable?",
        choices: ["====", "==", "===", "="],
        answer: "="
    },
    {
        question: "What will the following code return: Boolean(10 > 9)",
        choices: ["true", "NaN", "false", "Trick question!"],
        answer: "true"
    },
];