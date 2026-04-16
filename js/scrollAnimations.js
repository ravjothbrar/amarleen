(function () {
  'use strict';

  function init() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 620,
        once: true,
        offset: 70,
        easing: 'ease-out-cubic',
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
