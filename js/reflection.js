// ── SELECTORS ─────────────────────────────────────────
const reflectionText = document.getElementById('reflectionText');
const saveReflectionBtn = document.getElementById('saveReflectionBtn');
const stars = document.querySelectorAll('.star');
const feedbackGood = document.getElementById('feedbackGood');
const feedbackImprove = document.getElementById('feedbackImprove');
const submitFeedbackBtn = document.getElementById('submitFeedbackBtn');

// ── STATE ─────────────────────────────────────────────
let currentRating = 0;

// ── STAR RATING ───────────────────────────────────────
function updateStars(value) {
  stars.forEach((star) => {
    const v = parseInt(star.dataset.value);
    star.classList.toggle('star--active', v <= value);
    star.classList.toggle('star--inactive', v > value);
  });
}

stars.forEach((star) => {
  star.addEventListener('mouseover', () =>
    updateStars(parseInt(star.dataset.value)),
  );
  star.addEventListener('mouseout', () => updateStars(currentRating));
  star.addEventListener('click', () => {
    currentRating = parseInt(star.dataset.value);
    updateStars(currentRating);
  });
});

// ── SAVE REFLECTION ───────────────────────────────────
saveReflectionBtn.addEventListener('click', () => {
  const text = reflectionText.value.trim();
  if (!text) {
    showToast({
      title: 'Nothing to save',
      message: 'Please write something first.',
      type: 'warning',
    });
    return;
  }
  showToast({
    title: 'Reflection Saved!',
    message: 'Your thoughts have been recorded.',
    type: 'success',
  });
  reflectionText.value = '';
});

// ── SUBMIT FEEDBACK ───────────────────────────────────
submitFeedbackBtn.addEventListener('click', () => {
  if (!currentRating) {
    showToast({
      title: 'Rating required',
      message: 'Please select a star rating.',
      type: 'warning',
    });
    return;
  }
  if (!feedbackGood.value.trim() && !feedbackImprove.value.trim()) {
    showToast({
      title: 'Feedback required',
      message: 'Please fill in at least one field.',
      type: 'warning',
    });
    return;
  }

  submitFeedbackBtn.disabled = true;
  submitFeedbackBtn.innerHTML =
    '<i class="fas fa-spinner fa-spin"></i> Submitting...';

  setTimeout(() => {
    feedbackGood.value = '';
    feedbackImprove.value = '';
    currentRating = 0;
    updateStars(0);
    submitFeedbackBtn.innerHTML = '<i class="fas fa-check"></i> Submitted';
    showToast({
      title: 'Feedback Submitted!',
      message: 'Thank you for helping us improve.',
      type: 'success',
    });
  }, 800);
});
