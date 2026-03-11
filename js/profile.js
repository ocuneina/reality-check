// ── STATE ─────────────────────────────────────────────
let formStep = 1;
const totalSteps = 4;

// ── SELECTORS ─────────────────────────────────────────
const formBadge = document.getElementById('formBadge');
const formNext = document.getElementById('formNext');
const formBack = document.getElementById('formBack');

// ── HELPERS ───────────────────────────────────────────
function goToStep(step) {
  // hide current
  document.getElementById(`step${formStep}`).classList.remove('active');

  // show next
  formStep = step;
  document.getElementById(`step${formStep}`).classList.add('active');

  // update badge
  formBadge.textContent = `Step ${formStep}/${totalSteps}`;

  // toggle back button
  formBack.style.display = formStep > 1 ? 'flex' : 'none';

  // update next button label on last step
  formNext.innerHTML =
    formStep === totalSteps
      ? 'Submit <i class="fas fa-check"></i>'
      : 'Next <i class="fas fa-arrow-right"></i>';
}

function getCurrentInput() {
  const active = document.querySelector('.form-step.active');

  // check what input type this step uses
  const text = active.querySelector('input[type="text"], textarea');
  const radios = active.querySelectorAll('input[type="radio"]');
  const checkboxes = active.querySelectorAll('input[type="checkbox"]');

  if (text) return text.value.trim() !== '';
  if (radios.length)
    return !!active.querySelector('input[type="radio"]:checked');
  if (checkboxes.length)
    return !!active.querySelector('input[type="checkbox"]:checked');

  return false;
}

// ── EVENTS ────────────────────────────────────────────
formNext.addEventListener('click', () => {
  if (!getCurrentInput()) {
    showToast({
      title: 'Required',
      message: 'Please complete this step.',
      type: 'warning',
    });
    return;
  }

  if (formStep < totalSteps) {
    goToStep(formStep + 1);
  } else {
    showToast({
      title: 'Profile Saved!',
      message: 'Your student profile is complete.',
      type: 'success',
    });
    formNext.disabled = true;
    showProfileSummary();
  }
});

formBack.addEventListener('click', () => {
  if (formStep > 1) goToStep(formStep - 1);
});
function showProfileSummary() {
  const active = document.querySelector('.form-step.active');
  active.innerHTML = `
    <div class="summary">
      <div class="summary__icon"><i class="fas fa-check-circle"></i></div>
      <p class="summary__msg">Profile saved! Want to make changes?</p>
      <button class="btn btn--retake" id="editBtn">
        <i class="fas fa-pencil-alt"></i> Edit Answers
      </button>
    </div>
  `;

  document.getElementById('editBtn').addEventListener('click', () => {
    // reload page to reset all steps
    location.reload();
  });
}

// ── INIT ──────────────────────────────────────────────
goToStep(1);
