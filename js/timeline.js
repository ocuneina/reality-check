// ── HELPERS ───────────────────────────────────────────
function parseHours(duration) {
  return parseFloat(duration) || 0;
}

function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function calcUnitDays(unit, pace) {
  const hours = parseHours(unit.duration);

  // unit7: always exactly 1 day (3hr session = single day block)
  if (unit.id === 'unit7') return 1;

  // unit0: locked, never pace-adjusted
  if (unit.locked) return Math.ceil(hours / HOURS_PER_DAY);

  // open units: pace reduces hours
  const adjustedHours = hours * pace;
  return Math.ceil(adjustedHours / HOURS_PER_DAY);
}

function generateSchedule(startDate, pace) {
  let current = nextWorkingDay(new Date(startDate));

  return courseUnits.map((unit) => {
    const days = calcUnitDays(unit, pace);
    const start = new Date(current);
    const end = days === 1 ? new Date(start) : addWorkingDays(start, days - 1);

    current = nextWorkingDay(addDays(end, 1));

    return { ...unit, days, start, end };
  });
}

// ── RENDER SCHEDULE ───────────────────────────────────
function renderSchedule(schedule) {
  const output = document.getElementById('scheduleOutput');
  const totalDays = countWorkingDays(schedule.at(0).start, schedule.at(-1).end);

  output.innerHTML = `
    <div class="schedule">
      <div class="schedule__summary">
        <div class="schedule__stat">
          <span class="schedule__stat-num">${totalDays}</span>
          <span class="schedule__stat-label">Total Days</span>
        </div>
        <div class="schedule__stat">
          <span class="schedule__stat-num">${totalHours}</span>
          <span class="schedule__stat-label">Total Hours</span>
        </div>
        <div class="schedule__stat">
          <span class="schedule__stat-num">${totalUnits}</span>
          <span class="schedule__stat-label">Units</span>
        </div>
      </div>

      <div class="schedule__list">
        ${schedule
          .map(
            (unit) => `
          <div class="schedule__row ${unit.locked ? 'schedule__row--locked' : ''}">
            <div class="schedule__badge">
              <span class="schedule__unit-label">${unit.label}</span>
              <span class="schedule__unit-hours">${unit.duration}</span>
            </div>
            <div class="schedule__info">
              <div class="schedule__unit-name">
                ${unit.name}
                ${unit.locked ? '<span class="schedule__lock"><i class="fas fa-lock"></i></span>' : ''}
              </div>
              <div class="schedule__dates">
                ${formatDate(unit.start)} → ${formatDate(unit.end)}
              </div>
            </div>
            <div class="schedule__days">${unit.days}</div>
          </div>
        `,
          )
          .join('')}
      </div>
    </div>
  `;
}

// ── RENDER PLACEHOLDER ────────────────────────────────
function renderPlaceholder() {
  document.getElementById('scheduleOutput').innerHTML = `
    <div class="schedule__placeholder">
      <div class="schedule__placeholder-icon">
        <i class="fas fa-calendar-check"></i>
      </div>
      <h3>Ready to plan your course?</h3>
      <p>Select your start date and target pace on the left,<br/>then click Generate to build your customized timeline.</p>
    </div>
  `;
}

// ── INIT UI ───────────────────────────────────────────
function initTimeline() {
  const dateInput = document.getElementById('startDate');
  const paceSelect = document.getElementById('paceSelect');
  const generateBtn = document.getElementById('generateBtn');

  // set today as default date
  const today = new Date();
  dateInput.value = today.toISOString().split('T')[0];
  dateInput.min = today.toISOString().split('T')[0];

  // populate pace dropdown
  paceSelect.innerHTML = paceOptions
    .map(
      (p, i) => `
    <option value="${p.value}" ${i === 0 ? 'selected' : ''}>${p.label}</option>
  `,
    )
    .join('');

  // generate on click
  generateBtn.addEventListener('click', () => {
    const date = new Date(dateInput.value + 'T00:00:00');
    const pace = parseFloat(paceSelect.value);

    if (!dateInput.value) {
      showToast({
        title: 'Select a date',
        message: 'Please pick a start date.',
        type: 'warning',
      });
      return;
    }

    const schedule = generateSchedule(date, pace);
    renderSchedule(schedule);
    showToast({
      title: 'Schedule Generated!',
      message: `Your course ends on ${formatDate(schedule.at(-1).end)}`,
      type: 'success',
    });
  });

  renderPlaceholder();
}

initTimeline();
