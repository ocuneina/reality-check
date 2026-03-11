// toast.js

const toastConfig = {
  success: {
    icon: 'fa-check-circle',
    borderColor: 'var(--green-600)',
    iconColor: 'var(--green-600)',
  },
  error: {
    icon: 'fa-times-circle',
    borderColor: 'var(--red-600)',
    iconColor: 'var(--red-600)',
  },
  warning: {
    icon: 'fa-exclamation-circle',
    borderColor: 'var(--yellow-600)',
    iconColor: 'var(--yellow-600)',
  },
  info: {
    icon: 'fa-info-circle',
    borderColor: 'var(--indigo-500)',
    iconColor: 'var(--indigo-500)',
  },
};

let toastTimer = null;

function showToast({ title, message, type = 'success', duration = 4000 }) {
  const config = toastConfig[type];

  // build toast
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.style.borderLeftColor = config.borderColor;
  toast.innerHTML = `
    <i class="fas ${config.icon} toast__icon" style="color:${config.iconColor}"></i>
    <div class="toast__content">
      <p class="toast__title">${title}</p>
      ${message ? `<p class="toast__msg">${message}</p>` : ''}
    </div>
    <button class="toast__close">
      <i class="fas fa-times"></i>
    </button>
  `;

  // close button
  toast
    .querySelector('.toast__close')
    .addEventListener('click', () => dismissToast(toast));

  document.body.appendChild(toast);

  // trigger animation
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });

  // auto dismiss
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => dismissToast(toast), duration);
}

function dismissToast(toast) {
  toast.classList.remove('show');
  toast.addEventListener('transitionend', () => toast.remove(), { once: true });
}
