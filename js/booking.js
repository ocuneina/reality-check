// ── 1. CREATE MODAL HTML ──────────────────────────────
function createModal() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-container">
      <button class="close-btn">
        <i class="fas fa-times"></i>
      </button>
      <div class="modal-header">
        <div class="modal-title">Book 1:1 Session</div>
        <p id="modalInstructorName"></p>
      </div>
      <div id="slotsContainer"></div>
      <button id="confirmBtn" disabled>Confirm Booking</button>
    </div>
  `;
  document.body.appendChild(modal);
}
createModal();

const closeBtn = document.querySelector('.close-btn');
const confirmBtn = document.getElementById('confirmBtn');
const modalOverlay = document.querySelector('.modal-overlay');
const bookingBtns = document.querySelectorAll('.booking-btn');

// 2. HELPERS — pure functions, depend only on data
function getDateLabels() {
  if (typeof getWorkingDaysFrom === 'undefined') {
    console.error(
      'getWorkingDaysFrom not found — check workingDays.js is loaded before booking.js',
    );
    return ['Date 1', 'Date 2']; // fallback so modal still opens
  }

  const today = new Date();
  // get next 2 working days (skip weekends + holidays)
  const [d1, d2] = getWorkingDaysFrom(today, 2);
  const fmt = (d) =>
    d.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });
  return [fmt(d1), fmt(d2)];
}

function getInstructorData(name) {
  return instructorSlots[name] ?? null;
}

// 3. RENDER — depends on helpers + data
function renderInstructorSlots(name) {
  const data = getInstructorData(name);

  if (!data) return;

  const [date1Label, date2Label] = getDateLabels();

  document.getElementById('modalInstructorName').textContent = `with ${name}`;

  document.getElementById('slotsContainer').innerHTML = `
    <div class="date-group">
      <div class="date-label">
        <i class="fas fa-calendar-alt"></i> ${date1Label}
      </div>
      <div class="slots-grid">
        ${data.date1
          .map(
            (time) => `
          <button class="slot-btn" data-time="${time}" data-date="${date1Label}">
            ${time}
          </button>
        `,
          )
          .join('')}
      </div>
    </div>

    <div class="date-group">
      <div class="date-label">
        <i class="fas fa-calendar-alt"></i> ${date2Label}
      </div>
      <div class="slots-grid">
        ${data.date2
          .map(
            (time) => `
          <button class="slot-btn" data-time="${time}" data-date="${date2Label}">
            ${time}
          </button>
        `,
          )
          .join('')}
      </div>
    </div>
  `;

  const slotBtns = document.querySelectorAll('.slot-btn');

  slotBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      slotBtns.forEach((b) => b.classList.remove('selected'));
      btn.classList.add('selected');
      confirmBtn.disabled = false;
    });
  });
}

function openModal(name) {
  renderInstructorSlots(name);

  confirmBtn.disabled = true;
  modalOverlay.classList.add('open');
}

function closeModal() {
  modalOverlay.classList.remove('open');
}

// EVENT LISTENERS — must run after DOM is ready, depend on everything above

// Open modal
bookingBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const name = btn
      .closest('.person')
      .querySelector('.person__name').textContent;
    openModal(name);
  });
});

// Close on X button
closeBtn.addEventListener('click', closeModal);

// Close on overlay click
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

// Confirm booking

confirmBtn.addEventListener('click', () => {
  const selected = document.querySelector('.slot-btn.selected');
  if (!selected) return;

  const { time, date } = selected.dataset;
  const name = document
    .getElementById('modalInstructorName')
    .textContent.replace('with ', '');

  closeModal();
  showToast({
    title: 'Booking Confirmed!',
    message: `${name} — ${date} at ${time}`,
    type: 'success',
  });
});
