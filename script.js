const questions = [
    {
        question: "What is the capital of France?",
        options: ["Madrid", "Paris", "Rome", "London"],
        answer: "Paris"
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4"
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Jupiter", "Mars", "Saturn"],
        answer: "Jupiter"
    }
];

const questionElement = document.getElementById('question');
const resultElement = document.getElementById('result');
const submitButton = document.getElementById('submit');

let currentQuestionIndex = 0;
let score = 0;

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    let optionsHTML = '';
    currentQuestion.options.forEach((option, index) => {
        optionsHTML += `<input type="radio" name="answer" value="${option}" id="option${index}">
                        <label for="option${index}">${option}</label><br>`;
    });

    questionElement.innerHTML = `<h2>${currentQuestion.question}</h2>${optionsHTML}`;

    // Add event listener to each radio button
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            // Reset background color for all labels
            const allLabels = document.querySelectorAll('label');
            allLabels.forEach(label => {
                label.style.backgroundColor = '#f2f2f2';
            });

            // Highlight the selected option
            const selectedLabel = this.nextElementSibling;
            selectedLabel.style.backgroundColor = '#4CAF50';
        });
    });
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        const userAnswer = selectedOption.value;
        const correctAnswer = questions[currentQuestionIndex].answer;
        if (userAnswer === correctAnswer) {
            score++;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    } else {
        alert("Please select an answer.");
    }
}

function showResult() {
    questionElement.innerHTML = '';
    resultElement.innerHTML = `<h2>Your Score: ${score} out of ${questions.length}</h2>`;
    submitButton.style.display = 'none';
}

showQuestion();
submitButton.addEventListener('click', checkAnswer);
