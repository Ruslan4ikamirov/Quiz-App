const questions = [
    {
        question : 'Which is largest animal in the world?',
        answers : [
            {text : 'Shark', correct : false},
            {text : 'Blue Whale', correct : true},
            {text : 'Elephant', correct : false},
            {text : 'Giraffe', correct : false}
        ]
    },
    {
        question : 'Which is the smallest country in the world?',
        answers : [
            {text : 'Vatican City', correct : true},
            {text : 'Bhutan', correct : false},
            {text : 'Nepal', correct : false},
            {text : 'Shri Lanka', correct : false}
        ]
    },
    {
        question : 'Which is the largest desert in the world?',
        answers : [
            {text : 'Kalahari', correct : false},
            {text : 'Gobi', correct : false},
            {text : 'Sahara', correct : false},
            {text : 'Antarctica', correct : true}
        ]
    },
    {
        question : 'Which is the smallest continent in the world?',
        answers : [
            {text : 'Asia', correct : false},
            {text : 'Australia', correct : true},
            {text : 'Arctic', correct : false},
            {text : 'Africa', correct : false}
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}

function resetState() {
    nextButton.style.display = 'none';
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let numberNo = currentQuestionIndex + 1;
    questionElement.innerHTML = numberNo + '. ' + currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.classList.add('btn');
        button.innerHTML = answer.text;
        answerButtons.appendChild(button);
        button.dataset.correct = answer.correct;
        button.addEventListener('click', selectAnswer);
    });
}

function selectAnswer(element) {
    const selectedButton = element.target;
    const isCorrect = selectedButton.dataset.correct === 'true';
    if (isCorrect) {
        selectedButton.classList.add('correct');
        score += 1;
    }
    else {
        selectedButton.classList.add('incorrect');
    }
    [...answerButtons.children].forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block';
}   

function showScore() {
    resetState();
    questionElement.innerHTML = `You score ${score} out of ${questions.length}!`;
    nextButton.innerHTML = 'Play again';
    nextButton.style.display = 'block';
}

function handleNextButton() {
    currentQuestionIndex += 1;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
    }
});

startQuiz();