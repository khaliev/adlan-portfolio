(function () {
  'use strict';

  const dialog = document.getElementById('project-lightbox');
  if (!dialog) return;

  const els = {
    image: dialog.querySelector('[data-lb-image]'),
    title: dialog.querySelector('[data-lb-title]'),
    badge: dialog.querySelector('[data-lb-badge]'),
    type: dialog.querySelector('[data-lb-type]'),
    client: dialog.querySelector('[data-lb-client]'),
    year: dialog.querySelector('[data-lb-year]'),
    stack: dialog.querySelector('[data-lb-stack]'),
    description: dialog.querySelector('[data-lb-description]'),
    live: dialog.querySelector('[data-lb-live]'),
    repo: dialog.querySelector('[data-lb-repo]')
  };

  const closeBtn = dialog.querySelector('[data-lb-close]');

  function open(p) {
    els.image.src = p.image;
    els.image.alt = p.title;
    els.title.textContent = p.title;
    els.type.textContent = p.type;
    els.client.textContent = p.client;
    els.year.textContent = String(p.year);
    els.description.textContent = p.descriptionLong;

    els.stack.innerHTML = '';
    p.stack.forEach(function (s) {
      const span = document.createElement('span');
      span.className = 'px-2.5 py-1 rounded-full border border-[var(--c-accent)] text-[var(--c-accent)] text-xs font-medium';
      span.textContent = s;
      els.stack.appendChild(span);
    });

    els.badge.classList.toggle('hidden', p.status !== 'screenshot-only');

    if (p.liveUrl) {
      els.live.href = p.liveUrl;
      els.live.classList.remove('hidden');
    } else {
      els.live.classList.add('hidden');
    }

    if (p.repoUrl) {
      els.repo.href = p.repoUrl;
      els.repo.classList.remove('hidden');
    } else {
      els.repo.classList.add('hidden');
    }

    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
  }

  function close() {
    if (typeof dialog.close === 'function') {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
    }
  }

  document.addEventListener('project:open', function (e) { open(e.detail); });
  closeBtn.addEventListener('click', close);

  dialog.addEventListener('click', function (e) {
    if (e.target === dialog) close();
  });
})();