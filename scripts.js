document.addEventListener("DOMContentLoaded", function() {
    const burgerMenu = document.querySelector(".burger-menu");
    const navLinks = document.querySelector(".nav-links");

    burgerMenu.addEventListener("click", function() {
        navLinks.classList.toggle("active");
    });

    // Smooth scroll animation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Close the menu on small screens after clicking
            if (window.innerWidth <= 768) {
                navLinks.classList.remove("active");
            }
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const quizContainer = document.querySelector('.quiz-container');
    const questionContainer = document.getElementById('question');
    const answerContainer = document.getElementById('answers');
    const nextButton = document.getElementById('next-btn');
    const resultContainer = document.getElementById('result');

    let currentQuestionIndex = 0;
    let currentCorrectAnswer = '';

    function fetchQuizData() {
        fetch('https://opentdb.com/api.php?amount=5&type=multiple') // Fetching 5 questions
            .then(response => response.json())
            .then(data => {
                if (data.results.length > 0) {
                    loadQuestion(data.results[currentQuestionIndex]);
                } else {
                    quizContainer.innerHTML = "<p>No quiz data available. Please try again later.</p>";
                }
            })
            .catch(error => {
                console.error('Error fetching quiz data:', error);
                quizContainer.innerHTML = "<p>Failed to fetch quiz data. Please try again later.</p>";
            });
    }

    function loadQuestion(questionData) {
        questionContainer.innerHTML = questionData.question;
        currentCorrectAnswer = questionData.correct_answer;

        // Shuffle the answer options (correct answer included)
        const shuffledAnswers = shuffleArray(questionData.incorrect_answers.concat(currentCorrectAnswer));
        answerContainer.innerHTML = '';

        shuffledAnswers.forEach(answer => {
            const button = document.createElement('button');
            button.textContent = answer;
            button.addEventListener('click', () => selectAnswer(answer));
            answerContainer.appendChild(button);
        });

        nextButton.style.display = 'none';
        resultContainer.style.display = 'none';
    }

    function selectAnswer(userAnswer) {
        const isCorrect = userAnswer === currentCorrectAnswer;
        resultContainer.textContent = isCorrect ? 'Correct! 🌟' : 'Wrong! 😢';
        resultContainer.style.color = isCorrect ? '#2ecc71' : '#e74c3c';
        resultContainer.style.display = 'block';

        if (!isCorrect) {
            setTimeout(nextQuestion, 1500); // Move to the next question after a delay for wrong answers
        } else {
            nextButton.style.display = 'block'; // Show next button after answering correctly
        }
    }

    function nextQuestion() {
        resultContainer.style.display = 'none';
        nextButton.style.display = 'none';

        if (currentQuestionIndex < 4) {
            currentQuestionIndex++;
            fetchQuizData();
        } else {
            quizContainer.innerHTML = "<p>You've completed the quiz! Thanks for participating.</p>";
        }
    }

    // Helper function to shuffle an array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Initial quiz load
    fetchQuizData();

    // Event listeners
    nextButton.addEventListener('click', nextQuestion);
});


