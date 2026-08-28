(function () {
  'use strict';

  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  const iconSun = btn.querySelector('.icon-sun');
  const iconMoon = btn.querySelector('.icon-moon');

  function applyIcon() {
    const isDark = document.documentElement.classList.contains('dark');
    if (iconSun) iconSun.classList.toggle('hidden', !isDark);
    if (iconMoon) iconMoon.classList.toggle('hidden', isDark);
    btn.setAttribute('aria-label', isDark ? 'Passer au mode clair' : 'Passer au mode sombre');
  }

  btn.addEventListener('click', function () {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');

    html.classList.add('theme-transition');
    html.classList.toggle('dark', !isDark);
    html.classList.toggle('light', isDark);
    try {
      localStorage.setItem('color-scheme', isDark ? 'light' : 'dark');
    } catch (e) { /* stockage indisponible */ }
    applyIcon();

    window.setTimeout(function () {
      html.classList.remove('theme-transition');
    }, 600);
  });

  applyIcon();
})();