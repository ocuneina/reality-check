// ── WORKING DAY HELPERS ───────────────────────────────

function isHoliday(date) {
  const str = date.toISOString().split('T')[0];
  return holidays.includes(str);
}

function isWeekend(date) {
  const day = date.getDay();
  return day === 0 || day === 6;
}

function isWorkingDay(date) {
  return !isWeekend(date) && !isHoliday(date);
}

function nextWorkingDay(date) {
  const d = new Date(date);
  while (!isWorkingDay(d)) {
    d.setDate(d.getDate() + 1);
  }
  return d;
}

function addWorkingDays(startDate, days) {
  const date = new Date(startDate);
  let counted = 0;
  while (counted < days) {
    date.setDate(date.getDate() + 1);
    if (isWorkingDay(date)) counted++;
  }
  return date;
}

function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

// count working days between two dates (inclusive)
function countWorkingDays(startDate, endDate) {
  let count = 0;
  const d = new Date(startDate);
  while (d <= endDate) {
    if (isWorkingDay(d)) count++;
    d.setDate(d.getDate() + 1);
  }
  return count;
}

// get next N working days from a date as array
function getWorkingDaysFrom(startDate, count) {
  const days = [];
  const d = nextWorkingDay(new Date(startDate));
  while (days.length < count) {
    if (isWorkingDay(d)) days.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return days;
}
