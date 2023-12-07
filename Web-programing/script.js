const questions = [
    {
        question: "Що таке амортизація?",
        answers:[
            { text:"Спосіб перевірки нявніості майнових цінностей", correct: false},
            { text:"Cистематичний розподіл вартості основих засобів ", correct: true},
            { text:"Спосіб угрупування витрат", correct: false},
            { text:"Показник економічної ефективності", correct: false},
        ]
    },
    {
        question: "Скільки методів нарахування амортизації?",
        answers:[
            { text:"1", correct: false},
            { text:"3 ", correct: false},
            { text:"8", correct: false},
            { text:"5", correct: true},
        ]
    },
    {
        question: "Чи можна встановити один метод амортизації?",
        answers:[
            { text:"Мінімум 2", correct: false},
            { text:"Ні", correct: false},
            { text:"Так", correct: true,},
            { text:"Не знаю", correct: false},
        ]
    },
    {
        question: "Амортизацію припиняють нараховувати...",
        answers:[
            { text:"взагалі не припиняють", correct: false},
            { text:"з місяця вибуття ОЗ", correct: true},
            { text:"з 2 місяця витбуття ОЗ", correct: true,},
            { text:"з настпуного місяця після вибуття ОЗ", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct ==="true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore (){
    resetState();
    questionElement.innerHTML = `Твій рахунок ${score} з ${questions.length}!`;
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQiiz();
    }
})
startQuiz();
