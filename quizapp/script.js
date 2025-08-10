

let timer;
let timeLeft = 10; // seconds for each question
const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false }
        ]
    },
    {
        question: "What is the capital city of Japan?",
        answers: [
            { text: "Seoul", correct: false },
            { text: "Tokyo", correct: true },
            { text: "Beijing", correct: false },
            { text: "Bangkok", correct: false }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Earth", correct: false },
            { text: "Jupiter", correct: false },
            { text: "Mars", correct: true }
        ]
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        answers: [
            { text: "Charles Dickens", correct: false },
            { text: "William Shakespeare", correct: true },
            { text: "George Orwell", correct: false },
            { text: "Leo Tolstoy", correct: false }
        ]
    },
    {
        question: "What is H2O commonly known as?",
        answers: [
            { text: "Salt", correct: false },
            { text: "Sugar", correct: false },
            { text: "Water", correct: true },
            { text: "Acid", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    startTimer();

    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = "true";
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    answerButtons.innerHTML = "";
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    clearInterval(timer);

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    saveScore();
loadLeaderboard();



}
// function saveScore() {
//     const username = localStorage.getItem("currentUser") || "Guest";
//     fetch("save_score.php", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, score })
//     })
//     .then(() => {
//         setTimeout(() => {
//             window.location.href = "leaderboard.html";
//         }, 1500); // Delay to ensure saving completes
//     });
// }

function saveScore() {
  const username = localStorage.getItem("currentUser") || "Guest";
  console.log("Sending to save_score.php:", username, score); // Debug

  fetch("save_score.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, score })
  })
  .then(res => res.text())
  .then(data => {
    console.log("Response from PHP:", data); // ✅ See response
    setTimeout(() => {
      window.location.href = "leaderboard.html";
    }, 1500);
  })
  .catch(err => {
    console.error("Error saving score:", err);
  });
}


function loadLeaderboard() {
    fetch("leaderboard.php")
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById("leaderboard-list");
            list.innerHTML = "";
            data.forEach(entry => {
                const li = document.createElement("li");
                li.textContent = `${entry.username} — ${entry.score}`;
                list.appendChild(li);
            });
        });
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        startTimer();
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

function startTimer() {
    timeLeft = 10;
    const timerDisplay = document.getElementById("timer");
    timerDisplay.innerHTML = `Time Left: ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerHTML = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);

            // Automatically mark correct answer and disable all buttons
            Array.from(answerButtons.children).forEach(button => {
                if (button.dataset.correct === "true") {
                    button.classList.add("correct");
                }
                button.disabled = true;
            });

            nextButton.style.display = "block";
            // auto submit
        }
    }, 1000);
}

startQuiz(); // Automatically start the quiz
