(function () {
  'use strict';

  /* ── Scroll progress bar ── */
  function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    const update = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = total > 0 ? (scrolled / total * 100) + '%' : '0%';
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ── Mobile hamburger menu ── */
  function initMobileMenu() {
    const btn  = document.getElementById('hamburger');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
      const open = btn.classList.toggle('open');
      menu.classList.toggle('open', open);
    });

    menu.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        btn.classList.remove('open');
        menu.classList.remove('open');
      });
    });
  }

  /* ── Active nav link + section dot indicators ── */
  function initSectionTracking() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const dots     = document.querySelectorAll('.dot');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach(l =>
          l.classList.toggle('active', l.getAttribute('href') === '#' + id)
        );
        dots.forEach(d =>
          d.classList.toggle('active', d.dataset.section === id)
        );
      });
    }, { threshold: 0.3, rootMargin: '-10% 0px -10% 0px' });

    sections.forEach(s => observer.observe(s));
  }

  /* ── Timeline category filter ── */
  function initTimelineFilter() {
    const buttons = document.querySelectorAll('.filter-btn');
    const items   = document.querySelectorAll('.timeline-item');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        items.forEach(item => {
          const cats = (item.dataset.category || '').split(' ');
          const match = filter === 'all' || cats.includes(filter);
          item.classList.toggle('hidden', !match);
        });

        // Refresh AOS after filter change so newly shown items animate
        if (typeof AOS !== 'undefined') {
          setTimeout(() => AOS.refresh(), 50);
        }
      });
    });
  }

  /* ── Init ── */
  function init() {
    initScrollProgress();
    initMobileMenu();
    initSectionTracking();
    initTimelineFilter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
