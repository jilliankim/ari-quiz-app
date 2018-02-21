$(function() {

    'use strict';

    let questionNumber = 0;
    let score = 0;

    function bindEventListeners() {
        beginQuiz();
        renderQuestion();
        handleFormSubmit();
        renderNextQuestion();
        handleRestart();
    }

    //generate new question
    function generateQuestion() {
        if (questionNumber < STORE.length) {
            console.log('question generated');
            return `<div class="question-${questionNumber}">
    <h2>${STORE[questionNumber].question}</h2>
        <form>
        <fieldset>
        <label class="answerChoice">
        <div>
        <input type="radio" value="${STORE[questionNumber].answers[0]}" class="option-input radio" name="answer" checked required>
        <span>${STORE[questionNumber].answers[0]}</span>
        </div>
        </label>
        <label class="answerChoice">
        <div>
        <input type="radio" value="${STORE[questionNumber].answers[1]}" class="option-input radio" name="answer" required>
        <span>${STORE[questionNumber].answers[1]}</span>
        </div>
        </label>
        <label class="answerChoice">
        <div>
        <input type="radio" value="${STORE[questionNumber].answers[2]}" class="option-input radio" name="answer" required>
        <span>${STORE[questionNumber].answers[2]}</span>
        </div>
        </label>
        <label class="answerChoice">
        <div>
        <input type="radio" value="${STORE[questionNumber].answers[3]}" class="option-input radio" name="answer" required>
        <span>${STORE[questionNumber].answers[3]}</span>
        </div>
        </label>
        </fieldset>
        <div class="button-container">
        <div class="next-btn">
            <button type="submit" class="js-submit-button">Submit</button>
        </div>
        <div class="restart-btn">
            <button type="button" class="js-restart-button">Restart Quiz</button>
        </div>
        </div>      
        </form>
        </div>`;
        } else {
            renderResults();
            $('.questionNumber').text(10);
        }
    }

    //render question in DOM 
    function renderQuestion() {
        $('.questionForm').html(generateQuestion());
    }

    //user selects answer, quiz responds
    function handleFormSubmit() {
        $('form').on('submit', function(event) {
            event.preventDefault();
            //replaced dash with colon
            const userAnswer = $('input:checked');
            const userAnswerValue = userAnswer.val();

            checkUserAnswer(userAnswerValue);
            //incrementQuestion();
            console.log('successful form submission')
        });
    }

    function checkUserAnswer(answer) {
        let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
        if (answer === correctAnswer) {
            console.log('answer correct');
            feedbackCorrect();
            //wrong function name
            //incrementScore();
        } else {
            console.log('answer wrong');
            feedbackWrong(correctAnswer);
        }
    }

    //increment question number
    function incrementQuestion() {
        questionNumber++;
        console.log(questionNumber);
        $('.questionNumber').text(questionNumber + 1);
        console.log('question number incremented')
    }

    //increment score
    function incrementScore() {
        score++;
        $('.score').text(score);
        console.log('score incremented')
    }

    //user answer is correct
    function feedbackCorrect() {
        //let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
        $('.questionForm-0').remove()
        $('.questionForm-0').html(`<div class="correctFeedback"></div><h2><b>That's correct!</b></h2>
        <div class="button-container">
        <div class="next-btn2">
        <button type="submit" class="js-submit-button">Next</button></div>
        <div class="restart-btn">
        <button type="button" class="js-restart-button">Restart</button></div>
        </div>`);

    }

    //user answer is wrong
    function feedbackWrong(correctAnswer) {
        //let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
        $('.questionForm-0').remove()
        $('.questionForm-0').html(`<div class="wrongFeedback"></div><h2><b>You got it wrong!</b></h2>
        <h2>The correct answer is <span class="answer">${correctAnswer}</span></h2>
        <div class="button-container">
        <div class="next-btn2">
        <button type="submit" class="js-submit-button">Next</button></div>
        <div class="restart-btn">
        <button type="button" class="js-restart-button">Restart</button></div>
        </div>`);
        //where's the next question???
        //click on js-submit-button
    }

    //begin the quiz, hide beginning div and show quiz form
    function beginQuiz() {
        $('.start-quiz').on('click', '.js-start-button', (function(event) {
            $('.row').remove();
            $('.questionForm').css('display', 'block');
            $('.js-hide-score').show();
            $('.questionNumber').text(1);
            console.log('quiz successfully started');
        }));
    }

    //render next question
    function renderNextQuestion() {
        $('.next-btn2').on('click', '.js-submit-button', function(event) {
            event.preventDefault();
            console.log('next question button clicked');

            if (questionNumber < STORE.length) {
                generateQuestion();
                //checkUserAnswer();
                incrementQuestion();
            } else {
                renderResults();
            }

        });
    }

    //results page when done with quiz
    function renderResults() {
        if (score >= 8) {
            $('.questionForm').html(`<div class="results feedbackCorrect"><h3>You're a true Toffee fan!</h3>
          <p>Your score is ${score} / 10</p><h4>Come on you Blues!</h4>
          <button type="button" class="js-restart-button">Restart Quiz</button></div>
          </div>`);
        } else if (score < 8 && score >= 4) {
            $('.questionForm').html(`<div class="results feedbackCorrect"><h3>Are you sure you're an Everton fan?</h3>
          <p>Your score is ${score} / 10</p><h4>True fandom requires more knowledge. Feel free to try again!</h4>
          <button type="button" class="js-restart-button">Restart Quiz</button></div>
          </div>`);
        } else {
            $('.questionForm').html(`<div class="results feedbackCorrect"><h3>You must be a Liverpool fan!</h3>
          <p>Your score is ${score} / 10</p><h4>Go back to Anfield!</h4>
          <div class="restart-btn">
          <button type="button" class="js-restart-button">Restart Quiz</button></div>
          </div>`);
        }
    }

    //handle restart button event
    function handleRestart() {
        $('main').on('click', '.js-restart-button', function(event) {
            event.preventDefault();
            location.reload();
            console.log('successful quiz restart');
        });
    }


    bindEventListeners();
});