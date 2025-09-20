// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-question");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
    {
      question: "What is the Nickname of Krrish Kumar?",
      answers: [
        { text: "Mota Bhai", correct: false },
        { text: "Mota sharir but chhota lund", correct: false },
        { text: "Golu", correct: true },
        { text: "priyanshu ke lund ka cum", correct: false },
      ],
    },
    {
      question: "Why Golu is so fat?",
      answers: [
        { text: "Priyanshu Ka cum khata hai", correct: false },
        { text: "Universal Hunger", correct: true },
        { text: "Gym me exercise nhi gaand marwata hai", correct: false },
        { text: "apna lund khud chhusta hai", correct: false },
      ],
    },
    {
      question: "Who is boyfriend of Geetika rn?",
      answers: [
        { text: "Krrish Kumar", correct: false },
        { text: "Krish Jain", correct: false },
        { text: "Luv Kush", correct: false },
        { text: "Nischay Raj", correct: true },
      ],
    },
    {
      question: "Geetika kisko degi?",
      answers: [
        { text: "Luv Kush", correct: false },
        { text: "Krish Jain", correct: false },
        { text: "Krrish Kumar", correct: true },
        { text: "Nischay Raj", correct: false },
      ],
    },
    {
      question: "Jain kiska Lega?",
      answers: [
        { text: "Golu", correct: false },
        { text: "Luv kush", correct: false },
        { text: "Priyanshu Raj", correct: true },
        { text: "Mishra", correct: false },
      ],
    },
];

//QUIZ STATE VARS
let currentQuestionIndex=0;
let score = 0;
let answerDisabled=false;

totalQuestionsSpan.textContent=quizQuestions.length;
maxScoreSpan.textContent=quizQuestions.length*10;

// event listeners

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz(){
    currentQuestionIndex=0;
    score =0;
    scoreSpan.textContent=0;
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");
    showQuestion();
}

function showQuestion(){
    // reset state
    answerDisabled=false;
    const currentQuestion = quizQuestions[currentQuestionIndex];
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    const progresspercent = (currentQuestionIndex / quizQuestions.length)*100;
    progressBar.style.width = progresspercent+"%";

    questionText.textContent = currentQuestion.question;
    //todo
    answersContainer.innerHTML="";

    currentQuestion.answers.forEach(answer=> {
        const button=document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");
        // what is dataset?(to store custom data)
        button.dataset.correct = answer.correct;

        button.addEventListener("click", selectanswer);
        answersContainer.appendChild(button);
    });
}

function selectanswer(event) {
    // optimation check
    if(answerDisabled) return;

    answerDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct ==="true"

    Array.from(answersContainer.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        } else if(button===selectedButton){
            button.classList.add("incorrect");
        }
    });

    if(isCorrect){
        score=score+10;
        scoreSpan.textContent=score;
    }

    setTimeout(()=>{
        currentQuestionIndex++;
        // checkkk if there are more que. or over
        if(currentQuestionIndex < quizQuestions.length){
            showQuestion();
        } else{
            showResults();
        }
    },1000);

}

function showResults() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");
    finalScoreSpan.textContent=score;
    const percentage = (score/(10*quizQuestions.length)*100);

    if (percentage === 100) {
        resultMessage.textContent = "Perfect! You're a genius!";
      } else if (percentage >= 80) {
        resultMessage.textContent = "Great job! You know your stuff!";
      } else if (percentage >= 60) {
        resultMessage.textContent = "Good effort! Keep learning!";
      } else if (percentage >= 40) {
        resultMessage.textContent = "Not bad! Try again to improve!";
      } else {
        resultMessage.textContent = "Keep studying! You'll get better!";
      }
}

function restartQuiz(){
    resultScreen.classList.remove("active");
    startScreen.classList.add("active");
}

