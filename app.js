/* app.js (ES2022) */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const show = (el) => el && el.classList.remove('is-hidden');
const hide = (el) => el && el.classList.add('is-hidden');

/* -----------------------------
   Instructor Booking
------------------------------ */
const instructorSlots = {
  'Tanya Gabie': {
    date1: ['09:00 AM', '09:15 AM', '10:30 AM', '10:45 AM', '02:00 PM'],
    date2: ['01:15 PM', '01:30 PM', '03:00 PM', '03:15 PM'],
  },
  'Yifan Liu': {
    date1: ['11:00 AM', '11:15 AM', '01:00 PM', '01:15 PM', '04:30 PM'],
    date2: ['09:30 AM', '09:45 AM', '10:00 AM', '02:45 PM'],
  },
};

const bookingModal = $('#bookingModal');
const bookingInstructorName = $('#bookingInstructorName');
const bookingSuccessMessage = $('#bookingSuccessMessage');
const slotContainerDate1 = $('#slotContainerDate1');
const slotContainerDate2 = $('#slotContainerDate2');
const bookingCloseBtn = $('#bookingCloseBtn');

const openBookingModal = (instructor) => {
  if (!bookingModal) return;

  bookingInstructorName.innerHTML = `<i class="fas fa-chalkboard-teacher"></i> with ${instructor}`;
  hide(bookingSuccessMessage);

  const renderSlots = (container, slots) => {
    container.innerHTML = '';
    if (!slots?.length) {
      const span = document.createElement('span');
      span.className = 'text-muted';
      span.textContent = 'No available slots';
      container.appendChild(span);
      return;
    }

    slots.forEach((time) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'slot';
      btn.textContent = time;
      btn.addEventListener('click', () => confirmBooking(instructor, time));
      container.appendChild(btn);
    });
  };

  renderSlots(slotContainerDate1, instructorSlots[instructor]?.date1 ?? []);
  renderSlots(slotContainerDate2, instructorSlots[instructor]?.date2 ?? []);

  show(bookingModal);
};

const closeBookingModal = () => hide(bookingModal);

const confirmBooking = (instructor, time) => {
  bookingSuccessMessage.innerHTML = `
    <div style="font-size:24px;margin-bottom:6px;"><i class="fas fa-check-circle"></i></div>
    <div>Confirmed! Your 15-minute session with <strong>${instructor}</strong> is booked for <strong>${time}</strong>.</div>
  `;
  show(bookingSuccessMessage);

  window.setTimeout(() => closeBookingModal(), 4000);
};

/* -----------------------------
   Hook Image Shuffler
------------------------------ */
const shuffleData = [
  { src: 'images/hook picture 1.png', desc: '' },
  {
    src: 'images/hook pic 2.png',
    desc: 'What is happening around the world at this moment?',
  },
  { src: 'images/hook pic 3.png', desc: 'Dinosaur in Times Square' },
  {
    src: 'images/hook pic 4.png',
    desc: 'Cleopatra enjoying a ride on her motorcycle',
  },
  {
    src: 'https://placehold.co/800x400/fee2e2/ef4444?text=Example+Image+5',
    desc: 'Why do these images feel believable even though we know it’s impossible?',
  },
];

let currentImageIndex = 0;

const shufflingMainImage = $('#shufflingMainImage');
const shufflingDescription = $('#shufflingDescription');
const imageCounter = $('#imageCounter');
const prevImageBtn = $('#prevImageBtn');
const nextImageBtn = $('#nextImageBtn');

const updateShufflerUI = () => {
  if (!shufflingMainImage || !shufflingDescription || !imageCounter) return;
  const item = shuffleData[currentImageIndex];

  shufflingMainImage.style.opacity = '0.35';
  shufflingDescription.style.opacity = '0.35';

  window.setTimeout(() => {
    shufflingMainImage.src = item.src;
    shufflingDescription.textContent = item.desc;
    imageCounter.textContent = `${currentImageIndex + 1} of ${shuffleData.length}`;

    shufflingMainImage.style.opacity = '1';
    shufflingDescription.style.opacity = '1';
  }, 120);
};

const nextImage = () => {
  currentImageIndex = (currentImageIndex + 1) % shuffleData.length;
  updateShufflerUI();
};

const prevImage = () => {
  currentImageIndex =
    (currentImageIndex - 1 + shuffleData.length) % shuffleData.length;
  updateShufflerUI();
};

/* -----------------------------
   Quiz Logic
------------------------------ */
let currentQuizStep = 1;
const totalQuizSteps = 6;

const quizProgressBadge = $('#quizProgressBadge');
const quizResult = $('#quizResult');

const updateQuizUI = () => {
  $$('.quiz-question').forEach((el) => el.classList.add('is-hidden'));
  $(`#q-step-${currentQuizStep}`)?.classList.remove('is-hidden');
  if (quizProgressBadge)
    quizProgressBadge.textContent = `Q ${currentQuizStep}/${totalQuizSteps}`;
};

const nextQuizQuestion = () => {
  const selected = $(`input[name="q${currentQuizStep}"]:checked`);
  if (!selected) {
    alert('Please select an answer to proceed.');
    return;
  }
  if (currentQuizStep < totalQuizSteps) {
    currentQuizStep += 1;
    updateQuizUI();
  }
};

const prevQuizQuestion = () => {
  if (currentQuizStep > 1) {
    currentQuizStep -= 1;
    updateQuizUI();
  }
};

const submitQuiz = () => {
  const selected = $(`input[name="q${totalQuizSteps}"]:checked`);
  if (!selected) {
    alert('Please select an answer to submit.');
    return;
  }

  const correctAnswers = {
    q1: 'AI-generated',
    q2: 'AI-generated',
    q3: 'Real photograph',
    q4: 'Real photograph',
    q5: 'AI-generated',
    q6: 'Real photograph',
  };

  let score = 0;
  for (let i = 1; i <= totalQuizSteps; i++) {
    const checked = $(`input[name="q${i}"]:checked`);
    if (checked?.value === correctAnswers[`q${i}`]) score += 1;
  }

  let level = '';
  let message = '';

  if (score >= 5) {
    level = 'Advanced';
    message = 'Great job! You have a sharp eye for spotting AI artifacts. ';
  } else if (score >= 3) {
    level = 'Intermediate';
    message =
      'Good effort. You caught some clues, but there is still more to learn. ';
  } else {
    level = 'Novice';
    message =
      "Don't worry! That's exactly what this course is designed to teach you. ";
  }

  message +=
    'Please take consideration of the level you are currently at to choose your course pace and training modules accordingly.';

  $('#quizScoreDisplay').textContent = `Score: ${score}/${totalQuizSteps}`;
  $('#quizLevelDisplay').textContent = `Level: ${level}`;
  $('#quizMessageDisplay').textContent = message;

  $$('.quiz-question').forEach((el) => el.classList.add('is-hidden'));
  hide(quizProgressBadge);
  show(quizResult);
};

const resetQuiz = () => {
  for (let i = 1; i <= totalQuizSteps; i++) {
    const checked = $(`input[name="q${i}"]:checked`);
    if (checked) checked.checked = false;
  }
  currentQuizStep = 1;
  hide(quizResult);
  show(quizProgressBadge);
  updateQuizUI();
};

/* -----------------------------
   Profile Logic
------------------------------ */
let currentProfileStep = 1;
const totalProfileSteps = 4;

const profileProgressBadge = $('#profileProgressBadge');
const profileResult = $('#profileResult');

const updateProfileUI = () => {
  $$('.profile-step').forEach((el) => el.classList.add('is-hidden'));
  $(`#p-step-${currentProfileStep}`)?.classList.remove('is-hidden');
  if (profileProgressBadge)
    profileProgressBadge.textContent = `Step ${currentProfileStep}/${totalProfileSteps}`;
};

const nextProfileStep = () => {
  if (currentProfileStep < totalProfileSteps) {
    currentProfileStep += 1;
    updateProfileUI();
  }
};

const prevProfileStep = () => {
  if (currentProfileStep > 1) {
    currentProfileStep -= 1;
    updateProfileUI();
  }
};

const submitProfile = () => {
  $$('.profile-step').forEach((el) => el.classList.add('is-hidden'));
  hide(profileProgressBadge);
  show(profileResult);
};

const resetProfile = () => {
  currentProfileStep = 1;
  hide(profileResult);
  show(profileProgressBadge);
  updateProfileUI();
};

/* -----------------------------
   Scheduler Logic
------------------------------ */
const holidays = [
  '2024-12-25',
  '2024-12-26',
  '2025-01-01',
  '2025-04-18',
  '2025-05-26',
  '2025-12-25',
  '2026-01-01',
  '2026-04-03',
  '2026-05-25',
  '2026-12-25',
];

// TO DO Check the display

const courseStructure = [
  {
    id: 'b1',
    name: 'Block 1 Complete',
    hours: 9,
    icon: 'fa-book',
    compressible: true,
  },
  {
    id: 'b2',
    name: 'Block 2 Complete',
    hours: 9,
    icon: 'fa-book-open',
    compressible: true,
  },
  {
    id: 'b3',
    name: 'Block 3 Complete',
    hours: 9,
    icon: 'fa-layer-group',
    compressible: true,
  },
  {
    id: 'pretest',
    name: 'Pretest',
    hours: 1,
    icon: 'fa-vial',
    compressible: false,
  },
  {
    id: 'review',
    name: 'Review Session',
    hours: 1,
    icon: 'fa-search',
    compressible: false,
  },
  {
    id: 'final',
    name: 'Final Exam',
    hours: 1,
    icon: 'fa-graduation-cap',
    compressible: false,
  },
];

const isWorkDay = (date) => {
  const d = date.getDay();
  const dateString = date.toISOString().split('T')[0];
  if (d === 0 || d === 6) return false;
  if (holidays.includes(dateString)) return false;
  return true;
};

const addBusinessDays = (startDate, daysToAdd) => {
  const currentDate = new Date(startDate);

  while (!isWorkDay(currentDate))
    currentDate.setDate(currentDate.getDate() + 1);

  let addedDays = 0;
  const daysToStep = Math.max(0, Math.ceil(daysToAdd) - 1);

  while (addedDays < daysToStep) {
    currentDate.setDate(currentDate.getDate() + 1);
    if (isWorkDay(currentDate)) addedDays += 1;
  }
  return currentDate;
};

const formatDate = (date) =>
  date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

const calculateSchedule = () => {
  const startDateInput = $('#startDate')?.value;
  const pace = Number.parseFloat($('#pace')?.value ?? '1.0');

  const resultsArea = $('#resultsArea');
  const placeholderArea = $('#schedulePlaceholder');
  const timelineList = $('#timelineList');

  if (!startDateInput) {
    alert('Please select a start date first.');
    return;
  }

  hide(placeholderArea);
  show(resultsArea);

  timelineList.innerHTML = '';

  let cumulativeEffectiveHours = 0;
  const startDate = new Date(`${startDateInput}T00:00:00`);

  courseStructure.forEach((item, index) => {
    const itemDuration = item.compressible ? item.hours * pace : item.hours;
    cumulativeEffectiveHours += itemDuration;

    const milestoneDate = addBusinessDays(startDate, cumulativeEffectiveHours);

    const div = document.createElement('div');
    div.className = 'timeline-item fade-in';
    div.style.animationDelay = `${index * 80}ms`;

    const daysText = item.compressible
      ? `~${(item.hours * pace).toFixed(1)} days (Adj.)`
      : `${item.hours} day (Fixed)`;

    div.innerHTML = `
      <div class="timeline-item__left">
        <div class="timeline-item__icon"><i class="fas ${item.icon}"></i></div>
        <div>
          <p class="timeline-item__name">${item.name}</p>
          <p class="timeline-item__meta">${daysText}</p>
        </div>
      </div>
      <div class="timeline-item__right">
        <p class="timeline-item__date">${formatDate(milestoneDate)}</p>
        <p class="timeline-item__day">Day ${Math.ceil(cumulativeEffectiveHours)}</p>
      </div>
    `;

    timelineList.appendChild(div);
  });
};

/* -----------------------------
   Reflection & Feedback
------------------------------ */
let currentRating = 0;

const setRating = (stars) => {
  currentRating = stars;
  $$('.star').forEach((btn) => {
    const n = Number(btn.dataset.star);
    btn.classList.toggle('is-on', n <= stars);
  });
};

const saveReflection = () => {
  const val = $('#reflectionText')?.value ?? '';
  if (!val.trim()) {
    alert('Please write something before saving.');
    return;
  }
  const resultDiv = $('#reflectionResult');
  show(resultDiv);
  window.setTimeout(() => hide(resultDiv), 4000);
};

const submitFeedback = () => {
  if (currentRating === 0) {
    alert('Please select a star rating first.');
    return;
  }
  const resultDiv = $('#feedbackResult');
  show(resultDiv);
  window.setTimeout(() => hide(resultDiv), 4000);
};

/* -----------------------------
   Lightbox
------------------------------ */
const mediaLightbox = $('#mediaLightbox');
const lightboxTitle = $('#lightboxTitle');
const lightboxImage = $('#lightboxImage');
const lightboxCloseBtn = $('#lightboxCloseBtn');
const lightboxDownloadBtn = $('#lightboxDownloadBtn');
const lightboxBackdrop = $('#lightboxBackdrop');

let lightboxCurrentSrc = '';

const openLightbox = (src, title = 'Media') => {
  lightboxCurrentSrc = src;
  if (lightboxTitle) lightboxTitle.textContent = title;
  if (lightboxImage) lightboxImage.src = src;
  show(mediaLightbox);
};

const closeLightbox = () => {
  hide(mediaLightbox);
  if (lightboxImage) lightboxImage.src = '';
  lightboxCurrentSrc = '';
};

const downloadLightboxImage = async () => {
  if (!lightboxCurrentSrc) return;

  // Works for same-origin or CORS-enabled images.
  // For non-CORS URLs, browser may block; in that case open in new tab.
  try {
    const res = await fetch(lightboxCurrentSrc, { mode: 'cors' });
    if (!res.ok) throw new Error('Fetch failed');
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'image';
    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(url);
  } catch {
    window.open(lightboxCurrentSrc, '_blank', 'noopener,noreferrer');
  }
};

/* -----------------------------
   Wire up events
------------------------------ */
const init = () => {
  // Hook shuffler
  prevImageBtn?.addEventListener('click', prevImage);
  nextImageBtn?.addEventListener('click', nextImage);
  if (shufflingDescription)
    shufflingDescription.textContent = shuffleData[0].desc;

  // Booking
  $$('.js-book').forEach((btn) => {
    btn.addEventListener('click', () =>
      openBookingModal(btn.dataset.instructor),
    );
  });
  bookingCloseBtn?.addEventListener('click', closeBookingModal);
  bookingModal?.addEventListener('click', (e) => {
    if (e.target === bookingModal) closeBookingModal();
  });

  // Quiz buttons (data-quiz)
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-quiz]');
    if (!el) return;
    const action = el.dataset.quiz;
    if (action === 'next') nextQuizQuestion();
    if (action === 'prev') prevQuizQuestion();
    if (action === 'submit') submitQuiz();
    if (action === 'reset') resetQuiz();
  });
  updateQuizUI();

  // Profile buttons (data-profile)
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-profile]');
    if (!el) return;
    const action = el.dataset.profile;
    if (action === 'next') nextProfileStep();
    if (action === 'prev') prevProfileStep();
    if (action === 'submit') submitProfile();
    if (action === 'reset') resetProfile();
  });
  updateProfileUI();

  // Scheduler default date + button
  const startDate = $('#startDate');
  if (startDate) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    startDate.value = `${yyyy}-${mm}-${dd}`;
  }
  $('#generateScheduleBtn')?.addEventListener('click', calculateSchedule);

  // Stars
  $$('.star').forEach((btn) => {
    btn.addEventListener('click', () => setRating(Number(btn.dataset.star)));
  });

  // Reflection & feedback
  $('#saveReflectionBtn')?.addEventListener('click', saveReflection);
  $('#submitFeedbackBtn')?.addEventListener('click', submitFeedback);

  // Lightbox open
  $$('.js-lightbox').forEach((card) => {
    card.addEventListener('click', () =>
      openLightbox(card.dataset.src, card.dataset.title),
    );
  });

  // Lightbox close + download
  lightboxCloseBtn?.addEventListener('click', closeLightbox);
  lightboxDownloadBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    downloadLightboxImage();
  });
  lightboxBackdrop?.addEventListener('click', (e) => {
    // click outside the image closes
    if (e.target === lightboxBackdrop) closeLightbox();
  });

  // Esc key closes modals/lightbox
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    closeLightbox();
    closeBookingModal();
  });
};

document.addEventListener('DOMContentLoaded', init);
