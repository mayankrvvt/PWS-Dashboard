const quizQuestions = [
  {
    question: "Where are you in your career right now?",
    answers: [
      { label: "Exploring", score: 0 },
      { label: "In training", score: 1 },
      { label: "Just certified", score: 2 },
      { label: "Job hunting", score: 3 },
    ],
  },
  {
    question: "Is your resume tailored to care employers?",
    answers: [
      { label: "Yes", score: 2 },
      { label: "Partly", score: 1 },
      { label: "Not yet", score: 0 },
    ],
  },
  {
    question: "How confident are you in interviews?",
    answers: [
      { label: "Very", score: 2 },
      { label: "Somewhat", score: 1 },
      { label: "Not at all", score: 0 },
    ],
  },
];

const quizStep = document.querySelector("#quiz-step");
const quizProgress = document.querySelector("#quiz-progress");
const quizQuestion = document.querySelector("#quiz-question");
const quizAnswers = document.querySelector("#quiz-answers");
const quizResult = document.querySelector("#quiz-result");
const resultTitle = document.querySelector("#result-title");
const resultCopy = document.querySelector("#result-copy");
const retakeButton = document.querySelector("#retake-quiz");
const scenarioAnswers = document.querySelectorAll(".scenario-answer");
const scenarioFeedback = document.querySelector("#scenario-feedback");
const scenarioFeedbackTitle = document.querySelector("#scenario-feedback-title");
const scenarioFeedbackCopy = document.querySelector("#scenario-feedback-copy");
const menuToggle = document.querySelector(".menu-toggle");
const primaryNavigation = document.querySelector("#primary-navigation");

let currentQuestion = 0;
let totalScore = 0;

function closeNavigation() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open menu");
  primaryNavigation.classList.remove("is-open");
}

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open menu" : "Close menu");
  primaryNavigation.classList.toggle("is-open", !isExpanded);
});

primaryNavigation.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    closeNavigation();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    closeNavigation();
    menuToggle.focus();
  }
});

function renderQuestion() {
  const question = quizQuestions[currentQuestion];
  quizStep.hidden = false;
  quizResult.hidden = true;
  quizProgress.textContent = `Question ${currentQuestion + 1} of ${quizQuestions.length}`;
  quizQuestion.textContent = question.question;
  quizAnswers.replaceChildren();

  for (const answer of question.answers) {
    const button = document.createElement("button");
    button.className = "quiz-answer";
    button.type = "button";
    button.textContent = answer.label;
    button.addEventListener("click", () => {
      totalScore += answer.score;
      currentQuestion += 1;

      if (currentQuestion < quizQuestions.length) {
        renderQuestion();
      } else {
        renderResult();
      }
    });
    quizAnswers.append(button);
  }
}

function renderResult() {
  const level =
    totalScore <= 2
      ? {
          title: "I'm still training",
          copy: "Review key concepts, rehearse scenarios, and prepare for assessments.",
        }
      : totalScore <= 4
        ? {
            title: "Almost there",
            copy: "We'll point you to the tools that close your gaps fastest.",
          }
        : {
            title: "I'm ready to work",
            copy: "Resume, cover letters, interview prep — everything to get hired.",
          };

  quizStep.hidden = true;
  resultTitle.textContent = level.title;
  resultCopy.textContent = level.copy;
  quizResult.hidden = false;
}

function resetQuiz() {
  currentQuestion = 0;
  totalScore = 0;
  renderQuestion();
}

retakeButton.addEventListener("click", resetQuiz);

for (const answer of scenarioAnswers) {
  answer.addEventListener("click", () => {
    for (const option of scenarioAnswers) {
      option.disabled = true;
    }

    const isCorrect = answer.dataset.correct === "true";
    answer.classList.add(isCorrect ? "is-correct" : "is-wrong");

    if (!isCorrect) {
      for (const option of scenarioAnswers) {
        if (option.dataset.correct === "true") {
          option.classList.add("is-correct");
        }
      }
    }

    scenarioFeedbackTitle.textContent = isCorrect ? "Correct. " : "Not quite. ";
    scenarioFeedbackCopy.textContent =
      "Safety comes first: control the descent, don't leave them alone, and bring in support before trying again.";
    scenarioFeedback.hidden = false;
  });
}

renderQuestion();
