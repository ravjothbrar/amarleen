(function () {
  'use strict';

  function splitHeroName() {
    const lines = document.querySelectorAll('#hero-name .name-line');
    lines.forEach(line => {
      const text = line.textContent.trim();
      line.textContent = '';
      [...text].forEach(ch => {
        const sp = document.createElement('span');
        sp.className = 'char';
        sp.textContent = ch;
        line.appendChild(sp);
      });
    });
  }

  function initTyped() {
    const el = document.getElementById('typed-text');
    if (!el || typeof Typed === 'undefined') return;
    new Typed('#typed-text', {
      strings: [
        'Mechanical Engineer',
        'Deloitte Spring Intern',
        'Battery Systems Researcher',
        'IET Future Talent 2024',
        'Women in Engineering Scholar',
      ],
      typeSpeed: 48,
      backSpeed: 28,
      backDelay: 1900,
      loop: true,
      showCursor: true,
    });
  }

  function animateHero() {
    splitHeroName();

    const chars             = document.querySelectorAll('#hero-name .char');
    const tag               = document.querySelector('.hero-tag');
    const typedWrapper      = document.querySelector('.hero-typed');
    const sub               = document.querySelector('.hero-sub');
    const ctas              = document.querySelector('.hero-ctas');
    const underlineContainer = document.querySelector('.hero-underline-container');
    const underlinePath     = document.getElementById('hero-underline-path');

    if (!window.gsap) return;

    const tl = gsap.timeline();

    // Hero tag slides up
    tl.fromTo(tag,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
      0.25
    );

    // Characters stagger drop-in
    tl.fromTo(chars,
      { opacity: 0, y: 55 },
      {
        opacity: 1,
        y: 0,
        duration: 0.52,
        stagger: 0.038,
        ease: 'back.out(2.2)',
        onComplete() {
          // Per-char green glow flash, staggered
          chars.forEach((c, i) => {
            setTimeout(() => {
              c.classList.add('char-glow');
              setTimeout(() => c.classList.remove('char-glow'), 700);
            }, i * 22);
          });

          // Whole-name green colour pulse after glow sequence
          const glowSequenceDuration = chars.length * 22 + 120;
          setTimeout(() => {
            gsap.fromTo(
              '#hero-name',
              { color: '#f0fdf4' },
              {
                color: '#86efac',
                duration: 0.32,
                ease: 'power2.in',
                yoyo: true,
                repeat: 1,
                onComplete() {
                  gsap.set('#hero-name', { color: '#f0fdf4' });
                },
              }
            );
          }, glowSequenceDuration);
        },
      },
      0.55
    );

    // Draw SVG underline
    tl.fromTo(underlineContainer,
      { opacity: 0 },
      { opacity: 1, duration: 0.3 },
      1.75
    );
    tl.call(() => {
      if (underlinePath) underlinePath.classList.add('drawn');
    }, null, 1.75);

    // Typed subtitle
    tl.fromTo(typedWrapper,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
      2.1
    );
    tl.call(initTyped, null, 2.2);

    // Sub-paragraph
    tl.fromTo(sub,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
      2.4
    );

    // CTAs
    tl.fromTo(ctas,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
      2.65
    );
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateHero);
  } else {
    animateHero();
  }
})();
