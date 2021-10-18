'use strict';

(function () {
  const header = document.querySelector('.js-header');
  const headerButton = document.querySelector('.js-header-menu-button');
  const page = document.querySelector('.js-page');
  const navWrapper = document.querySelector('.js-nav-wrapper');

  const headerOpenedClass = 'header--opened';
  const headerClosedClass = 'header--closed';
  const pageNavOpenedClass = 'page--nav-opened';

  if (!page || !header || !headerButton) {
    return false;
  }

  header.classList.add(headerClosedClass);

  const open = function () {
    header.classList.remove(headerClosedClass);
    header.classList.add(headerOpenedClass);
    page.classList.add(pageNavOpenedClass);

    window.gsap.set(navWrapper, {height: 'auto'});
    window.gsap.from(navWrapper, {height: 0});
  };

  const close = function () {
    header.classList.remove(headerOpenedClass);
    header.classList.add(headerClosedClass);
    page.classList.remove(pageNavOpenedClass);

    window.gsap.to(navWrapper, {height: 0});
  };

  headerButton.addEventListener('click', () => {
    if (header.classList.contains(headerClosedClass)) {
      open();
    } else {
      close();
    }
  });
})();
