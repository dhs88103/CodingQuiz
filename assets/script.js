var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("endGame");
var questionsEl = document.getElementById("quizQuestions");
var quizTimer = document.getElementById("timeRemaining");
var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startQuiz");
var buttonA = document.getElementById("A");
var buttonB = document.getElementById("B");
var buttonC = document.getElementById("C");
var buttonD = document.getElementById("D");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("highScorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscoreInitials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highScoreRecord");

var quizQuestions = [
  {
    question: "What tag is used to specify a section of text that has <br> been quoted from another source?",
    choiceA: "a",
    choiceB: "em",
    choiceC: "blockquote",
    choiceD: "h1",
    correctAnswer: "c",
  },
  {
    question: "What does HTML stand for?",
    choiceA: "Hyper Text Markup Language",
    choiceB: "Hyper Trainer Marking Language",
    choiceC: "Hyper Text Marking Language",
    choiceD: "Hper Training Model Language",
    correctAnswer: "a",
  },
  {
    question: "What tag can be used to insert a line break <br> or a blank line in an HTML document?",
    choiceA: "title",
    choiceB: "br",
    choiceC: "head",
    choiceD: "li",
    correctAnswer: "b",
  },
  {
    question: "What are the CSS properties used to <br> add space around sections of content?",
    choiceA: "Spacing",
    choiceB: "Break",
    choiceC: "Cleaner",
    choiceD: "Padding",
    correctAnswer: "d",
  },
  {
    question: "In JavaScript, what element is used to store <br> multiple vallues in a single variable?",
    choiceA: "Arrays",
    choiceB: "Functions",
    choiceC: "Strings",
    choiceD: "Variables",
    correctAnswer: "a",
  },
  {
    question: "In JavaScript, what is used in conjunction with <br> HTML to react to certain elements?",
    choiceA: "Boolean",
    choiceB: "Condition",
    choiceC: "Events",
    choiceD: "RegExp",
    correctAnswer: "c",
  },
  {
    question: "CSS stands for _______ Style Sheets",
    choiceA: "Concept",
    choiceB: "Cascading",
    choiceC: "Class",
    choiceD: "Concave",
    correctAnswer: "b",
  },
  {
    question: "What is the format called that is used for storing and transporting data?",
    choiceA: "HTML",
    choiceB: "JSON",
    choiceC: "Syntax",
    choiceD: "Font",
    correctAnswer: "b",
  },
  {
    question: "What is the type of loop that continues through a <br> block of code as long as the specified condition remains TRUE?",
    choiceA: "While Loop",
    choiceB: "Else Loop",
    choiceC: "For Loop",
    choiceD: "Conditional Loop",
    correctAnswer: "c",

  },
  {
    question: "In CSS and HTML, colors are displayed by <br> combining these three shades of light",
    choiceA: "Red, Green, and Blue",
    choiceB: "Violet, Red, and Orange",
    choiceC: "Yellow, Blue, and Green",
    choiceD: "Red, White, Black",
    correctAnswer: "a",
  },
];
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 60;
var timerInterval;
var score = 0;
var correct;

function generateQuizQuestion() {
  gameoverDiv.style.display = "none";
  if (currentQuestionIndex === finalQuestionIndex) {
    return showScore();
  }
  var currentQuestion = quizQuestions[currentQuestionIndex];
  questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
  buttonA.innerHTML = currentQuestion.choiceA;
  buttonB.innerHTML = currentQuestion.choiceB;
  buttonC.innerHTML = currentQuestion.choiceC;
  buttonD.innerHTML = currentQuestion.choiceD;
}

function startQuiz() {
  gameoverDiv.style.display = "none";
  startQuizDiv.style.display = "none";
  generateQuizQuestion();

  timerInterval = setInterval(function () {
    timeLeft--;
    quizTimer.textContent = "Time Remaining: " + timeLeft;

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      showScore();
    }
  }, 1000);
  quizBody.style.display = "block";
}
function showScore() {
  quizBody.style.display = "none";
  gameoverDiv.style.display = "flex";
  clearInterval(timerInterval);
  highscoreInputName.value = "";
  finalScoreEl.innerHTML =
    "You got " + score + " out of " + quizQuestions.length + " correct!";
}

submitScoreBtn.addEventListener("click", function highscore() {
  if (highscoreInputName.value === "") {
    alert("Initials cannot be blank");
    return false;
  } else {
    var savedHighscores =
      JSON.parse(localStorage.getItem("savedHighscores")) || [];
    var currentUser = highscoreInputName.value.trim();
    var currentHighscore = {
      name: currentUser,
      score: score,
    };

    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    savedHighscores.push(currentHighscore);
    localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
    generateHighScores();
  }
});

function generateHighScores() {
  highscoreDisplayName.innerHTML = "";
  highscoreDisplayScore.innerHTML = "";
  var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
  for (i = 0; i < highscores.length; i++) {
    var newNameSpan = document.createElement("li");
    var newScoreSpan = document.createElement("li");
    newNameSpan.textContent = highscores[i].name;
    newScoreSpan.textContent = highscores[i].score;
    highscoreDisplayName.appendChild(newNameSpan);
    highscoreDisplayScore.appendChild(newScoreSpan);
  }
}

function showHighscore() {
  startQuizDiv.style.display = "none";
  gameoverDiv.style.display = "none";
  highscoreContainer.style.display = "flex";
  highscoreDiv.style.display = "block";
  endGameBtns.style.display = "flex";

  generateHighScores();
}

function clearScore() {
  window.localStorage.clear();
  highscoreDisplayName.textContent = "";
  highscoreDisplayScore.textContent = "";
}

function replayQuiz() {
  highscoreContainer.style.display = "none";
  gameoverDiv.style.display = "none";
  startQuizDiv.style.display = "flex";
  timeLeft = 60;
  score = 0;
  currentQuestionIndex = 0;
}

function checkAnswer(answer) {
  correct = quizQuestions[currentQuestionIndex].correctAnswer;

  if (answer === correct && currentQuestionIndex !== finalQuestionIndex) {
    score++;
    alert("CORRECT!");
    currentQuestionIndex++;
    generateQuizQuestion();
  } else if (
    answer !== correct &&
    currentQuestionIndex !== finalQuestionIndex
  ) {
    alert("Sorry, that is Incorrect.");
    currentQuestionIndex++;
    generateQuizQuestion();
  } else {
    showScore();
  }
}

startQuizButton.addEventListener("click", startQuiz);
