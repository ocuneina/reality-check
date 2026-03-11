function renderLevelCards() {
  const grid = document.querySelector('.levels-grid');
  if (!grid) return;

  grid.innerHTML = levelCards
    .map(
      (card) => `
    <div class="level-card level-card--${card.level}">

      <div class="level-card__header">
        <span class="level-card__num">${card.num}</span>
        <span class="level-card__title">${card.title.toUpperCase()}</span>
      </div>

      <div class="level-card__body">

        <div class="level-card__video-wrap"
          onclick="openVideoLightbox({ url: 'https://www.youtube.com/embed/${card.videoId}', title: '${card.title}' })">
          <img class="level-card__thumb"
            src="https://img.youtube.com/vi/${card.videoId}/hqdefault.jpg"
            alt="${card.title}" />
          <div class="level-card__play"><i class="fab fa-youtube"></i></div>
        </div>

        <a class="level-card__yt-btn"
          href="${card.videoUrl}"
          target="_blank"
          rel="noopener noreferrer">
          <i class="fab fa-youtube"></i>
          Watch on YouTube
        </a>

        <div class="level-card__checklist-label">
          <i class="fas fa-list-check"></i> ${card.checklist}
        </div>

        <div class="level-card__image-wrap"
          onclick="openImageLightbox({ src: '${card.image}', alt: '${card.checklist}', filename: '${card.checklist.toLowerCase().replace(/ /g, '-')}.jpg', title: '${card.checklist}' })">
          <img class="level-card__image" src="${card.image}" alt="${card.checklist}" />
          <div class="level-card__image-overlay"><i class="fas fa-search-plus"></i></div>
        </div>

      </div>
    </div>
  `,
    )
    .join('');
}

renderLevelCards();

function zoomImage(btn) {
  const wrap = btn.closest('.level-card__image-wrap');
  const img = wrap.querySelector('.level-card__image');
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  const lbDl = document.getElementById('lightboxDownload');

  lbImg.src = img.dataset.src;
  lbImg.alt = img.alt;
  lbDl.href = img.dataset.src;
  lbDl.download = img.dataset.name;
  lightbox.classList.add('open');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}

// close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});
