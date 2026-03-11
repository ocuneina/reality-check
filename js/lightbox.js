// ── STATE ─────────────────────────────────────────────
let slideshowData = [];
let slideshowIndex = 0;

// ── OPEN TYPES ────────────────────────────────────────
function openImageLightbox({ src, alt, filename, title = '' }) {
  console.log('openImageLightbox called', src);
  console.log('lightbox el:', document.getElementById('lightbox'));
  console.log('panel el:', document.querySelector('.lightbox__panel'));

  setLightboxTitle(title || alt);

  const panel = document.querySelector('.lightbox__panel');
  if (panel) panel.classList.add('lightbox__panel--image');

  document
    .querySelector('.lightbox__panel')
    .classList.add('lightbox__panel--image');

  document.getElementById('lightboxContent').innerHTML = `
    <img class="lightbox__img" src="${src}" alt="${alt}" />
  `;

  document.getElementById('lightboxFooter').innerHTML = `
    <a class="lightbox__btn lightbox__btn--primary"
       href="${src}" download="${filename}">
      <i class="fas fa-download"></i> Save as
    </a>
  `;

  openLightbox();
}

function openVideoLightbox({ url, title = '' }) {
  setLightboxTitle(title);
  document
    .querySelector('.lightbox__panel')
    .classList.remove('lightbox__panel--image');

  document.getElementById('lightboxContent').innerHTML = `
    <div class="lightbox__video-wrap">
      <iframe src="${url}" allowfullscreen allow="autoplay"></iframe>
    </div>
  `;

  document.getElementById('lightboxFooter').innerHTML = `
    <a class="lightbox__btn lightbox__btn--ghost"
       href="${url}" target="_blank" rel="noopener noreferrer">
      <i class="fas fa-external-link-alt"></i> Watch on YouTube
    </a>
  `;

  openLightbox();
}

function openSlideshowLightbox({ slides, startIndex = 0, title = '' }) {
  slideshowData = slides;
  slideshowIndex = startIndex;
  document
    .querySelector('.lightbox__panel')
    .classList.add('lightbox__panel--image');
  setLightboxTitle(title);
  renderSlide();
  openLightbox();
}

// ── SLIDESHOW ─────────────────────────────────────────
function renderSlide() {
  const slide = slideshowData[slideshowIndex];
  const total = slideshowData.length;

  document.getElementById('lightboxContent').innerHTML = `
    <img class="lightbox__img" src="${slide.src}" alt="${slide.alt || ''}" />
  `;

  document.getElementById('lightboxFooter').innerHTML = `
    <button class="lightbox__btn lightbox__btn--ghost lightbox__nav"
      onclick="prevSlide()" ${slideshowIndex === 0 ? 'disabled' : ''}>
      <i class="fas fa-arrow-left"></i>
    </button>
    <span class="lightbox__counter">${slideshowIndex + 1} / ${total}</span>
    <button class="lightbox__btn lightbox__btn--ghost lightbox__nav"
      onclick="nextSlide()" ${slideshowIndex === total - 1 ? 'disabled' : ''}>
      <i class="fas fa-arrow-right"></i>
    </button>
  `;
}

function prevSlide() {
  if (slideshowIndex > 0) {
    slideshowIndex--;
    renderSlide();
  }
}

function nextSlide() {
  if (slideshowIndex < slideshowData.length - 1) {
    slideshowIndex++;
    renderSlide();
  }
}

// ── CORE ──────────────────────────────────────────────
function setLightboxTitle(title) {
  document.getElementById('lightboxTitle').textContent = title;
}

function openLightbox() {
  document.getElementById('lightbox').classList.add('open');
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  lb.classList.remove('open');
  document
    .querySelector('.lightbox__panel')
    .classList.remove('lightbox__panel--image');

  // stop video on close
  const iframe = lb.querySelector('iframe');
  if (iframe) iframe.src = iframe.src;
}

function handleLightboxClick(e) {
  if (e.target === document.getElementById('lightbox')) closeLightbox();
}

// ── KEYBOARD ──────────────────────────────────────────
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') prevSlide();
  if (e.key === 'ArrowRight') nextSlide();
});
