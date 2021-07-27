const question= document.querySelector("#question");
const choices= Array.from(document.querySelectorAll(".choice-text"));
const progressText= document.querySelector("#progressText");
const scoreText= document.querySelector("#score");
const progressBarFull= document.querySelector("#progressBarFull");

let current= {};
let acceptingAnswers= true;
let score= 0;
let questionCounter= 0;
let availableQuestions= [];
 
let questions= [
    {
        question: 'What is capital of Telangana?',
        choice1: 'Vishakapatnam',
        choice2: 'Indore',
        choice3: 'Warangal',
        choice4: 'Hyderabad',
        answer: 4,
    },
    {
        question: 'Which are the smallest & largest states of India?',
        choice1: 'Kakinada ,Kerala', 
        choice2: 'Goa ,Rajasthan',
        choice3: 'Gujarat, Goa',
        choice4: 'Tamilnadu, Goa',
        answer: 2,
    },
    {
        question: 'Where did British first open their factories in Eastern part of India?',
        choice1: 'Orissa',
        choice2: 'Bihar',
        choice3: 'Calcutta',
        choice4: 'Gujarat',
        answer: 1,
    },
    {
        question: 'Who among the following was the 23rd Jain Tirthankara ?',
        choice1: 'Nemi Natha',
        choice2: 'Mahavira',
        choice3: 'Parshvanath',
        choice4: 'Malinath',
        answer: 3,
    },
    {
        question: 'Which River flows near the Taj Mahal ?',
        choice1: 'Godavari',
        choice2: 'Saraswati',
        choice3: 'Yamuna',
        choice4: 'Brahmaputra',
        answer: 3,
    }    
]

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter= 0;
    score= 0;
    availableQuestions = [...questions]
    getNewQuestion()
}
getNewQuestion = () =>{
   if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
       localStorage.setItem('mostRecentScore',score)

       return window.location.assign('end.html')
    }
  
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    // UPDATE THE PROGRESS BAR
    // console.log(questionCounter / MAX_QUESTIONS)
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random()*availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice =>{
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice'+ number]
    })
    availableQuestions.splice(questionsIndex, 1)
    acceptingAnswers = true
}

choices.forEach(choice =>{
    choice.addEventListener('click', e =>{
         if(!acceptingAnswers) return

         acceptingAnswers = false
         const selectedChoice = e.target
         const selectedAnswer = selectedChoice.dataset['number']

         let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
         
         if(classToApply === 'correct'){
             incrementScore(SCORE_POINTS)
         }

         selectedChoice.parentElement.classList.add(classToApply)

         setTimeout(() =>{
             selectedChoice.parentElement.classList.remove(classToApply)
             getNewQuestion()

         }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()