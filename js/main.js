(function () {
  'use strict';

  const slidesEl = document.getElementById('slides');
  if (!slidesEl) return;

  const slideEls = Array.prototype.slice.call(slidesEl.querySelectorAll('.slide'));
  const navLinks = Array.prototype.slice.call(document.querySelectorAll('a[data-slide]'));
  const menuBtn = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');
  let current = 0;

  function goTo(index) {
    current = Math.max(0, Math.min(index, slideEls.length - 1));
    slidesEl.style.transform = 'translateX(-' + (current * window.innerWidth) + 'px)';

    navLinks.forEach(function (link) {
      const id = link.getAttribute('href').slice(1);
      const i = slideEls.findIndex(function (s) { return s.id === id; });
      link.classList.toggle('active', i === current);
    });

    if (nav) nav.classList.remove('open');
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const id = link.getAttribute('href').slice(1);
      const index = slideEls.findIndex(function (s) { return s.id === id; });
      if (index !== -1) goTo(index);
    });
  });

  window.addEventListener('resize', function () {
    slidesEl.style.transform = 'translateX(-' + (current * window.innerWidth) + 'px)';
  });

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }

  // Navigation au clavier
  window.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') goTo(current + 1);
    if (e.key === 'ArrowLeft') goTo(current - 1);
  });

  // Balayage tactile
  let startX = 0;
  let startY = 0;

  window.addEventListener('touchstart', function (e) {
    startX = e.changedTouches[0].clientX;
    startY = e.changedTouches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchend', function (e) {
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) goTo(current + 1);
      else goTo(current - 1);
    }
  }, { passive: true });

  // État initial
  navLinks.forEach(function (link, i) {
    if (i === 0) link.classList.add('active');
  });
})();