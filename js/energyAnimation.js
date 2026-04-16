(function () {
  'use strict';

  function init() {
    const container = document.querySelector('.wind-turbine-container');
    const blades    = document.querySelector('.turbine-blades');
    if (!container || !blades) return;

    // Speed up on hover, slow down on leave
    container.addEventListener('mouseenter', () => {
      blades.style.animationDuration = '1.1s';
    });
    container.addEventListener('mouseleave', () => {
      blades.style.animationDuration = '5s';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
