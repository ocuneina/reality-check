// ── QUIZ DATA ─────────────────────────────────────────
const quizQuestions = [
  {
    image: 'images/assessment image 1.png',
    options: ['AI-generated', 'Real photo', 'Edited / Photoshopped'],
  },
  {
    image: 'images/assessment image 2.png',
    options: ['AI-generated', 'Real photo', 'Edited / Photoshopped'],
  },
  {
    image: 'images/assessment image 3.png',
    options: ['AI-generated', 'Real photo', 'Edited / Photoshopped'],
  },
  {
    image: 'images/assessment image 4.png',
    options: ['AI-generated', 'Real photo', 'Edited / Photoshopped'],
  },
  {
    image: 'images/assessment image 5.png',
    options: ['AI-generated', 'Real photo', 'Edited / Photoshopped'],
  },
  {
    image: 'images/assessment image 6.png',
    options: ['AI-generated', 'Real photo', 'Edited / Photoshopped'],
  },
];

const correctAnswers = {
  q1: 'AI-generated',
  q2: 'AI-generated',
  q3: 'Real photo',
  q4: 'Real photo',
  q5: 'AI-generated',
  q6: 'Real photo',
};

// ── STATE ─────────────────────────────────────────────
let quizStep = 1;
const totalQuiz = quizQuestions.length;
const userAnswers = {};

// ── SELECTORS ─────────────────────────────────────────
let quizImage = document.getElementById('quizImage');
const quizOptions = document.getElementById('quizOptions');
const quizBadge = document.getElementById('quizBadge');
const quizNext = document.getElementById('quizNext');

// ── HELPERS ───────────────────────────────────────────
function getScoreStyle(score) {
  if (score >= 5)
    return {
      color: 'var(--green-600)',
      bg: '#f0fdf4',
      border: '#86efac',
      level: 'Advanced',
      emoji: '🏆',
      message: 'Great job! You have a sharp eye for spotting AI artifacts.',
    };
  if (score >= 3)
    return {
      color: 'var(--yellow-600)',
      bg: '#fefce8',
      border: '#fde047',
      level: 'Intermediate',
      emoji: '👍',
      message:
        'Good effort. You caught some clues, but there is still more to learn.',
    };
  return {
    color: 'var(--green-600)',
    bg: '#cfe7da',
    border: '#1ded6a',
    level: 'Novice',
    emoji: '📚',
    message:
      "Don't worry — that's exactly what this course is designed to teach you.",
  };
}

function getQuizSelection() {
  return document.querySelector('input[name="quiz"]:checked')?.value ?? null;
}

function calculateScore() {
  return Object.keys(correctAnswers).reduce((score, key) => {
    return userAnswers[key] === correctAnswers[key] ? score + 1 : score;
  }, 0);
}

function renderQuizStep(step) {
  const q = quizQuestions[step - 1];
  const key = `q${step}`;

  quizImage.src = q.image;
  quizImage.alt = `Question ${step}`;

  quizOptions.innerHTML = q.options
    .map(
      (opt) => `
    <label class="option">
      <input type="radio" name="quiz" value="${opt}"
        ${userAnswers[key] === opt ? 'checked' : ''} />
      ${opt}
    </label>
  `,
    )
    .join('');

  quizBadge.textContent = `Q ${step}/${totalQuiz}`;

  quizNext.innerHTML =
    step === totalQuiz
      ? 'Submit <i class="fas fa-check"></i>'
      : 'Next <i class="fas fa-arrow-right"></i>';
}

// ── SCORE DISPLAY ─────────────────────────────────────
function showQuizSummary() {
  const score = calculateScore();
  const { color, bg, border, level, emoji, message } = getScoreStyle(score);

  // replace image area with score card
  document.querySelector('.quiz__image').innerHTML = `
    <div class="score-card" style="background:${bg}; border-color:${border}">
    <div class="score-card__icon" style="background:${border}">
      <i class="fas fa-award" style="color:${color}"></i>
    </div>
    <div class="score-card__num" style="color:${color}">Score: ${score}/${totalQuiz}</div>
    <div class="score-card__level" style="color:${color}; background:${border}">Level: ${level}</div>
    <p class="score-card__msg">${message}</p>
  </div>
  `;

  quizOptions.innerHTML = `
  <button class="btn btn--retake" id="retakeBtn">
    <i class="fas fa-redo"></i> Retake Quiz
  </button>
`;

  document.getElementById('retakeBtn').addEventListener('click', () => {
    quizStep = 1;
    quizNext.disabled = false;
    Object.keys(userAnswers).forEach((k) => delete userAnswers[k]);
    // restore image area
    document.querySelector('.quiz__image').innerHTML =
      `<img id="quizImage" src="" alt="" />`;

    // re-query since old element is gone
    quizImage = document.getElementById('quizImage');

    renderQuizStep(quizStep);
    showToast({
      title: 'Quiz Reset',
      message: 'Starting from question 1.',
      type: 'info',
    });
  });
}

// ── EVENTS ────────────────────────────────────────────
quizNext.addEventListener('click', () => {
  const selected = getQuizSelection();
  if (!selected) {
    showToast({
      title: 'Select an answer',
      message: 'Please choose one option.',
      type: 'warning',
    });
    return;
  }

  userAnswers[`q${quizStep}`] = selected;

  if (quizStep < totalQuiz) {
    quizStep++;
    renderQuizStep(quizStep);
  } else {
    quizNext.disabled = true;
    showToast({
      title: 'Quiz Complete!',
      message: `You scored ${calculateScore()}/${totalQuiz}`,
      type: 'success',
    });
    showQuizSummary();
  }
});

// ── INIT ──────────────────────────────────────────────
renderQuizStep(quizStep);
