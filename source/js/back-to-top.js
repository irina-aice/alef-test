'use strict';

(function () {
  const button = document.querySelector('.js-back-to-top-button');

  if (!button) {
    return false;
  }

  gsap.registerPlugin(ScrollToPlugin);

  button.addEventListener('click', () => {
    gsap.to(window, {scrollTo: {y: 0}});
  });
})();
