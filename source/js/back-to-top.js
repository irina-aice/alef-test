'use strict';

(function () {
  const button = document.querySelector('.js-back-to-top-button');

  if (!button) {
    return false;
  }

  window.gsap.registerPlugin(window.ScrollToPlugin, window.ScrollTrigger);

  window.gsap.set(button, {autoAlpha: 0, scale: 0.5});

  button.addEventListener('click', () => {
    window.gsap.to(window, {scrollTo: {y: 0}});
  });

  window.gsap.to(button, {
    scrollTrigger: {
      trigger: document.body,
      start: 50,
      toggleActions: 'play none none reverse',
    },
    autoAlpha: 1, scale: 1,
  });
})();
