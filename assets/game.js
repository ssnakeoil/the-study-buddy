const question= document.getElementById("question")
const choices= Array.from(document.getElementsByClassName("choice-text"))
const progressText= document.getElementById("progressText")
const scoreText= document.getElementById("score")
const progressBarFull= document.getElementById("progressBarFull")
const loader= document.getElementById("loader")
const game =document.getElementById("game")

let currentQuestion= {};
let acceptingAnswers= false;
let score= 0;
let questionCounter= 0;
let availableQuestions=[];


let questions = [];
// will fetch questions from API as well as answers. Converting variables to be used in the quiz format
fetch('https://opentdb.com/api.php?amount=25&category=17&difficulty=hard&type=multiple')
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions.results.map((loadedQuestion) => {
            const formattedQuestion = {
                question: loadedQuestion.question,
            };

            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
            answerChoices.splice(
                formattedQuestion.answer - 1,
                0,
                loadedQuestion.correct_answer
            );

            answerChoices.forEach((choice, index) => {
                formattedQuestion['choice' + (index + 1)] = choice;
            });

            return formattedQuestion;
        });

    
        startGame();
    })

    // will catch error and notify if page is not loaded properly (variables not properly changed)
    .catch((err) => {
        console.error(err);
    });


const CORRECT_BONUS = 10; //increment score value is based on
const MAX_QUESTIONS = 10; //number of questions pulled from the API list. Is adjustable


// function to start game. Question counter and score starts at 0 prior to start of game
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
       game.classList.remove("hidden");
        loader.classList.add("hidden");
};

// code that prompts new question after answer selected. Ends automatically if no more questions remain
getNewQuestion = () => {

   if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        //go to the end of game and takes most recent score into local storage
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign('end.html');
    }

    questionCounter++;

    // shows what question the user is on and fills bar according to the percent of quiz completed
    progressText.innerText = "Question " + questionCounter + "/"+ MAX_QUESTIONS;

    // takes current question number/ max number of questions and converts to % to be used to change style.width of progressBarFull
    progressBarFull.style.width = `${100* (questionCounter / MAX_QUESTIONS)}%`;

    // takes previous question out and randomly chooses next question from questions list
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;    
    
    
};

// event listener for choosing answers. Incorrect answers will turn red and not contribute to score
choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply=
            selectedAnswer==currentQuestion.answer ? "correct" : "incorrect";
             if (classToApply === "correct") {
             incrementScore(CORRECT_BONUS);
            }
          selectedChoice.parentElement.classList.add(classToApply);
        console.log(classToApply)
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion(); 
        }, 1000);
        });
    });
          
incrementScore = num => {
score += num;
 scoreText.innerText = score;
};