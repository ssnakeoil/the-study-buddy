// let nextPageToken = ""
// function getVideos(){
//     fetch("https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCHbGq27OiwdNvLoJzYD2WLQ&maxResults=5&order=date&key=AIzaSyBJsQ7ilfRTtjKLJceZOR1zUXa1nVx24K4&pageToken="+nextPageToken)
//     .then((result)=>{
//         return result.json()
//     }).then((data)=>{
//         console.log(data)
//         let videos = data.items
//         nextPageToken = data.nextPageToken;
//         let videoContainer = document.querySelector(".youtube-containment-unit")
//         for (video of videos){
//             videoContainer.innerHTML += `
//                 <img src=${video.snippet.thumbnails.default.url}>
//             `
//         }
//     })
// }

// getVideos();

var previousBtn = document.querySelector('.previous-button');
var nextBtn = document.querySelector('.next-button');
var oneBtn = document.querySelector('.one-button');
var twoBtn = document.querySelector('.two-button');
var threeBtn = document.querySelector('.three-button');
var fourBtn = document.querySelector('.four-button');
var fiveBtn = document.querySelector('.five-button');
var sixBtn = document.querySelector('.six-button');
var sevenBtn = document.querySelector('.seven-button');
var eightBtn = document.querySelector('.eight-button');
var nineBtn = document.querySelector('.nine-button');
var tenBtn = document.querySelector('.ten-button');

var timerTxt = document.querySelector('.timer-text');

var titleCard = document.querySelector('.title-card');
var questions = document.querySelector('.questions');
var buttons = document.querySelector('.buttons');

// display the questions
var questionEl = document.createElement('h2');
questionEl.classList.add('question-style');

// buttons for choices 1-10 on the scale
var choiceEl1 = document.createElement('button');
var choiceEl2 = document.createElement('button');
var choiceEl3 = document.createElement('button');
var choiceEl4 = document.createElement('button');
var choiceEl5 = document.createElement('button');
var choiceEl6 = document.createElement('button');
var choiceEl7 = document.createElement('button');
var choiceEl8 = document.createElement('button');
var choiceEl9 = document.createElement('button');
var choiceEl10 = document.createElement('button');
var choiceSty = document.querySelector('.choice-style');
choiceEl1.classList.add('choice-style');
choiceEl2.classList.add('choice-style');
choiceEl3.classList.add('choice-style');
choiceEl4.classList.add('choice-style');
choiceEl5.classList.add('choice-style');
choiceEl6.classList.add('choice-style');
choiceEl7.classList.add('choice-style');
choiceEl8.classList.add('choice-style');
choiceEl9.classList.add('choice-style');
choiceEl10.classList.add('choice-style');
var valueCh1 = choiceEl1.getAttribute('value');
var valueCh2 = choiceEl2.getAttribute('value');
var valueCh3 = choiceEl3.getAttribute('value');
var valueCh4 = choiceEl4.getAttribute('value');
var valueCh5 = choiceEl1.getAttribute('value');
var valueCh6 = choiceEl2.getAttribute('value');
var valueCh7 = choiceEl3.getAttribute('value');
var valueCh8 = choiceEl4.getAttribute('value');
var valueCh9 = choiceEl1.getAttribute('value');
var valueCh10 = choiceEl2.getAttribute('value');

// to enter name and submit reults(socre) after completion
var formEl = document.createElement('form');
formEl.classList.add('input-form');

// enter name input
var inputEl = document.createElement('input');
inputEl.classList.add('input-style');
var inpuSty = document.querySelector('.input-style');

// variables for time,  index of questions, quiz score, empty array stores scores 
var timeVal;
var indexQues;
var quizScore;
var scores = [];

// create list elements to display all scores, and add style
var ulEl = document.createElement('ul');
var liEl = document.createElement('li');
liEl.classList.add('list-style');

// arrays to hold questions, empty array will be a copy of the constant array when starting the quiz each time
var questions = [];
const allQuestions = [
      {
        problem: "How much do you look forward to going to bed every night?",
        choices: {
          '1': 'true',
          '2': 'false',
          '3': 'false',
          '4': 'false',
          '5': 'false',
          '6': 'false',
          '7': 'false',
          '8': 'false',
          '9': 'false',
          '10': 'false',
        },
      },
      {
        problem: "How much do you dread the coming days?",
        choices:{
            '1': 'true',
            '2': 'false',
            '3': 'false',
            '4': 'false',
            '5': 'false',
            '6': 'false',
            '7': 'false',
            '8': 'false',
            '9': 'false',
            '10': 'false',
        },
      },
      {
        problem: "How similar does food taste on a daily basis?",
        choices: {
            '1': 'true',
            '2': 'false',
            '3': 'false',
            '4': 'false',
            '5': 'false',
            '6': 'false',
            '7': 'false',
            '8': 'false',
            '9': 'false',
            '10': 'false',
        },
      },
      {
        problem: "How miserable are you at 6PM?",
        choices: {
            '1': 'true',
            '2': 'false',
            '3': 'false',
            '4': 'false',
            '5': 'false',
            '6': 'false',
            '7': 'false',
            '8': 'false',
            '9': 'false',
            '10': 'false',
        },
      },
      {
        problem: "At 9PM how hungry are you?",
        choices: {
            '1': 'true',
            '2': 'false',
            '3': 'false',
            '4': 'false',
            '5': 'false',
            '6': 'false',
            '7': 'false',
            '8': 'false',
            '9': 'false',
            '10': 'false',
        },
      },
]

// set empty array to question by number
function restoreQuestions() {
    questions = [allQuestions[0], allQuestions[1], allQuestions[2], allQuestions[3], allQuestions[4]];
  }

// init, set timer to 0, gets localStorage scores
function init() {
    cardContent.classList.remove("scores-list-style");
    timerTxt.textContent = 0;
    getScores()
    cardContent.appendChild(questionEl);
    cardContent.classList.add('scores-list-style')
    questionEl.textContent = "Hit Next to Begin";
  }

// starts quiz, shows array of questions, sets intial score to 0, displays current score
function startQuiz() {
    restoreQuestions();
    disableBtns()
    titleCard.innerHTML = '';
    titleCard.classList.remove("scores-list-style");
  
    quizScore = 0;
    scoreEl.textContent = 'Current Score: ' + quizScore;
  
    cardBtm.appendChild(scoreEl);
    cardBtm.appendChild(correctEl);
    cardBtm.appendChild(quitEl);
  
    startTimer();
    renderProbs();
  }


// fetch('https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley',{
//      method: 'Post',
//      headers: {
//         'Content-Type': 'application/json'
//      },
//      body: JSON.stringify({
//         name: 'User 1'
//      })
// }).then(res => {
//     return res.json()
// })
// .then(data => console.log(data))
// .catch(error => console.log('Error'))
