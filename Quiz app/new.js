const question = document.querySelector('#question');
const choices = document.querySelectorAll('.choice-text');
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestion = []

let questions = [
    {
        question: 'Which one of the following river flows between Vindhyan and Satpura ranges?',
        choice1: 'Narmada',
        choice2: 'Mahanadi',
        choice3: 'son',
        choice4: 'Netravati',
        answer: Narmada,
    },
    {
        question: 'The Central Rice Research Station is situated in?',
        choice1: 'Chennai',
        choice2: 'Cuttack',
        choice3: 'Bangalore',
        choice4: 'Quilon',
        answer: Cuttack,
    },
    {
        question: 'Who among the following wrote Sanskrit grammar?',
        choice1: 'Kalidasa',
        choice2: 'Charak',
        choice3: 'Panini',
        choice4: 'Aryabhatt',
        answer: Panini,
    },
    {
        question: 'The metal whose salts are sensitive to light is?',
        choice1: 'Zinc',
        choice2: 'Silver',
        choice3: 'Copper',
        choice4: 'Aluminum',
        answer: Silver,
    },
    {
        question: 'Where was the electricity supply first introduced in india?',
        choice1: 'Mumbai',
        choice2: 'Dehradun',
        choice3: 'Darjeeling',
        choice4: 'Chennai',
        answer: Darjeeling,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = 'Question ${questionCounter} of ${MAX_QUESTIONS}'
    progressBarFull.getElementsByClassName.width = '${(questionCounter/MAX_QUESTIONS) * 100}%'

    const questionsIndex = Math.floor(Math.random() * availablequestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset('number')

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
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