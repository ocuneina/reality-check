// EVENT LISTENERS — must run after DOM is ready, depend on everything above

const modal = document.querySelector('.modal-overlay');

const bookingBtns = document.querySelectorAll('.booking-btn');

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
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
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
