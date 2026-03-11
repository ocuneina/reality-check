// ── STATE ─────────────────────────────────────────────
let hookIndex = 0;
let musicPlaying = false;

// ── SELECTORS ─────────────────────────────────────────
const hookImage = document.getElementById('hookImage');
const hookCaption = document.getElementById('hookCaption');
const hookCounter = document.getElementById('hookCounter');
const hookPrev = document.getElementById('hookPrev');
const hookNext = document.getElementById('hookNext');
const hookMusicBtn = document.getElementById('hookMusicBtn');
const hookAudio = document.getElementById('hookAudio');

// ── HELPERS ───────────────────────────────────────────
//function getOrderedSlidesFromRandom() {
// const randomIndex = Math.floor(Math.random() * shuffleData.length);
// const before = shuffleData.slice(0, randomIndex);
// const from = shuffleData.slice(randomIndex);
// return [...from, ...before];
//}

// const slides = getOrderedSlidesFromRandom();

const slides = shuffleData;

// ── RENDER ────────────────────────────────────────────
function renderHookSlide(index) {
  const slide = slides[index];

  hookImage.classList.add('hook__image--fade');

  setTimeout(() => {
    hookImage.src = slide.src;
    hookImage.alt = slide.desc;
    hookCaption.textContent = slide.desc;
    hookCounter.textContent = `${index + 1} of ${slides.length}`;

    hookPrev.disabled = index === 0;
    hookNext.disabled = index === slides.length - 1;

    hookImage.classList.remove('hook__image--fade');
  }, 200);
}

// ── MUSIC ─────────────────────────────────────────────
hookAudio.volume = 0.4; // not too loud
//audio scr from data.js
hookAudio.src = hookMusic;

function toggleMusic() {
  if (musicPlaying) {
    hookAudio.pause();
    hookMusicBtn.classList.remove('hook__music-btn--on');
    hookMusicBtn.innerHTML = '<i class="fas fa-music"></i>';
  } else {
    hookAudio.play().catch(() => {
      showToast({
        title: 'Autoplay blocked',
        message: 'Click again to play music.',
        type: 'info',
      });
    });
    hookMusicBtn.classList.add('hook__music-btn--on');
    hookMusicBtn.innerHTML = '<i class="fas fa-pause"></i>';
  }
  musicPlaying = !musicPlaying;
}

// ── EVENTS ────────────────────────────────────────────
hookPrev.addEventListener('click', () => {
  if (hookIndex > 0) {
    hookIndex--;
    renderHookSlide(hookIndex);
  }
});

hookNext.addEventListener('click', () => {
  if (hookIndex < slides.length - 1) {
    hookIndex++;
    renderHookSlide(hookIndex);
  }
});

hookMusicBtn.addEventListener('click', toggleMusic);

// keyboard navigation
document.addEventListener('keydown', (e) => {
  if (document.querySelector('.modal-overlay.open')) return; // don't hijack modal
  if (e.key === 'ArrowLeft') hookPrev.click();
  if (e.key === 'ArrowRight') hookNext.click();
});

// ── INIT ──────────────────────────────────────────────
renderHookSlide(hookIndex);
