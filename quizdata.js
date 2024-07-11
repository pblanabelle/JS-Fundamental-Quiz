 // Quiz data
        const quizData = [
            {
                question: "What is the correct way to declare a JavaScript variable where the value is changeable?",
                choices: ["const x;", "x = 5;", "let x = 5;", "both 2 and 3"],
                correctAnswer: 2
            },
            {
                question: "How do you write an IF statement in JavaScript?",
                choices: ["if i = 5 then", "if (i == 5)", "if i = 5", "if {i == 5}"],
                correctAnswer: 1
            },
            {
                question: "Which operator is used for modulus division?",
                choices: ["*","/", "%", "//"],
                correctAnswer: 2
            },
            {
                question: "Which statement allows you to chain multiple conditions?",
                choices: ["if statement","if - else if - else statement", "if - else statement", "switch statement"],
                correctAnswer: 1
            },
            {
                question: "Which keyword has some potential pitfalls related to scope?",
                choices: ["const","var", "let", "null"],
                correctAnswer: 1
            },
            {
                question: "Which data type represents a unique and immutable identifier?",
                choices: ["Number","BigInt", "String", "Symbol"],
                correctAnswer: 3
            },
            {
                question: "How do you access the third element in an array named 'myArray?'",
                choices: ["myArray[2]","myArray[3]", "myArray[1]", "myArray.third"],
                correctAnswer: 0
            },
            {
                question: "Which logical operator is used to return 'true' if both operands are true?",
                choices: ["&& (AND)","|| (OR)", "! (NOT)", "All of the above"],
                correctAnswer: 0
            },
            {
                question: "This statements allow you to execute certain pieces of code based on whether a condition is true or false?",
                choices: ["if statement","if - else if - else statement", "if - else statement", "conditional statement"],
                correctAnswer: 3
            },
            {
                question: "This represents the intentional absence of any object value.",
                choices: ["String","Boolean", "Undefined", "Null"],
                correctAnswer: 3
            },
            
        ];

let currentQuestion = 0;
let score = 0;
let userAnswers = [];

function loadQuestion() {
    document.body.classList.add('noscroll');

    const questionElement = document.getElementById('question');
    const choicesElement = document.getElementById('choices');

    questionElement.textContent = quizData[currentQuestion].question;
    choicesElement.innerHTML = '';

    for (let i = 0; i < quizData[currentQuestion].choices.length; i++) {
        const choice = quizData[currentQuestion].choices[i];
        const button = document.createElement('button');
        button.textContent = choice;
        button.onclick = function() {
            userAnswers[currentQuestion] = i; // Store the user's answer

            if (i === quizData[currentQuestion].correctAnswer) {
                score++;
                document.getElementById('score').textContent = `Score: ${score}`;
            }
            nextQuestion();
        };
        choicesElement.appendChild(button);
    }
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        document.body.classList.remove('noscroll');
        displayResults();
    }
}

function displayResults() {
    let resultsHTML = `
        <h2>Quiz Complete!</h2>
        <p>Your score is ${score} out of ${quizData.length}.</p>
        <button onclick="location.reload()">Retry Quiz</button>
        <h3>Review your answers:</h3>
    `;

    for (let i = 0; i < quizData.length; i++) {
        const question = quizData[i].question;
        const correctAnswer = quizData[i].choices[quizData[i].correctAnswer];
        const userAnswer = quizData[i].choices[userAnswers[i]];

        resultsHTML += `
            <div>
                <p><strong>Question ${i + 1}:</strong> ${question}</p>
                <p><strong>Your Answer:</strong> ${userAnswer}</p>
                <p><strong>Correct Answer:</strong> ${correctAnswer}</p>
                ${userAnswers[i] !== quizData[i].correctAnswer ? '<p style="color: #84D2F6;font-weight: bold;">You got this WRONG.</p>' : ''}
            </div>
        `;
    }

    document.getElementById('quiz').innerHTML = resultsHTML;
}

loadQuestion();