(function () {
  'use strict';

  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  function loadProjects() {
    var inline = document.getElementById('projects-data');
    if (inline && inline.textContent) {
      try {
        return Promise.resolve(JSON.parse(inline.textContent));
      } catch (e) { /* JSON invalide -> fallback fetch */ }
    }
    return fetch('data/projects.json')
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      });
  }

  loadProjects()
    .then(function (projects) {
      projects.sort(function (a, b) {
        return (b.featured === true) - (a.featured === true);
      });
      grid.innerHTML = '';
      projects.forEach(function (p) {
        grid.appendChild(createCard(p));
      });
      window.__projects = projects;
    })
    .catch(function (err) {
      grid.innerHTML = '<p class="col-span-full text-[var(--c-muted)]">Impossible de charger les projets.</p>';
      console.error(err);
    });

  function createCard(p) {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', 'Voir le projet ' + p.title);
    card.dataset.id = p.id;

    const img = document.createElement('img');
    img.src = p.image;
    img.alt = p.title;
    img.loading = 'lazy';

    const overlay = document.createElement('div');
    overlay.className = 'hover-effect';

    const inner = document.createElement('div');
    inner.className = 'text-center px-6 py-4';

    const h3 = document.createElement('h3');
    h3.className = 'text-lg font-bold uppercase tracking-wide border-b border-white/60 inline-block pb-2 mb-3';
    h3.textContent = p.title;

    const stack = document.createElement('p');
    stack.className = 'text-xs uppercase tracking-wider text-white/80 mb-2';
    stack.textContent = p.stack.join(' · ');

    const desc = document.createElement('p');
    desc.className = 'text-sm leading-relaxed';
    desc.textContent = p.description;

    inner.appendChild(h3);
    inner.appendChild(stack);
    inner.appendChild(desc);
    overlay.appendChild(inner);
    card.appendChild(img);
    card.appendChild(overlay);

    card.addEventListener('click', function () { openProject(p); });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openProject(p);
      }
    });

    return card;
  }

  function openProject(p) {
    document.dispatchEvent(new CustomEvent('project:open', { detail: p }));
  }
})();