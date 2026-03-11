// ── DERIVED VALUES ────────────────────────────────────
const totalUnits = courseUnits.length;
const firstUnit = courseUnits.at(0);
const lastUnit = courseUnits.at(-1);
const lockedUnits = courseUnits.filter((u) => u.locked);
const openUnits = courseUnits.filter((u) => !u.locked);

const totalHours = courseUnits.reduce((sum, u) => {
  const n = parseFloat(u.duration);
  return sum + (isNaN(n) ? 0 : n);
}, 0);

// ── RENDER ────────────────────────────────────────────
function renderCourseOutline() {
  const grid = document.querySelector('.units-grid');
  if (!grid) return;

  grid.innerHTML = courseUnits
    .map(
      (unit) => `
    <div class="unit ${unit.locked ? 'unit--active' : ''}">
      <div class="unit__badge">
        <span class="unit__label">${unit.label}</span>
        <span class="unit__duration">${unit.duration}</span>
      </div>
      <div class="unit__info">
        <p class="unit__name">${unit.name}</p>
        <p class="unit__desc">${unit.desc}</p>
      </div>
    </div>
  `,
    )
    .join('');
}

// ── INIT ──────────────────────────────────────────────
renderCourseOutline();

console.table({
  totalUnits,
  totalHours: `${totalHours} hrs`,
  lockedUnits: lockedUnits.map((u) => u.label).join(', '),
  openUnits: openUnits.length,
  firstUnit: `${firstUnit.label} — ${firstUnit.name} (${firstUnit.duration})`,
  lastUnit: `${lastUnit.label} — ${lastUnit.name} (${lastUnit.duration})`,
});
