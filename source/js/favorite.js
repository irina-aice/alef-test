'use strict';

(function () {
  const cardList = document.querySelector('.js-card-list');
  const favoriteMessageAdded = document.querySelector('.js-favorite-message-added');
  const favoriteMessageRemoved = document.querySelector('.js-favorite-message-removed');

  if (!cardList || !favoriteMessageAdded || !favoriteMessageRemoved) {
    return false;
  }

  gsap.set([favoriteMessageAdded, favoriteMessageRemoved], {autoAlpha: 0});

  cardList.addEventListener('click', (evt) => {
    const button = evt.target.closest('.js-card-like-button');

    if (!button) {
      return false;
    }

    if (button.hasAttribute('data-state')) {
      button.removeAttribute('data-state');

      gsap.timeline()
        .to(favoriteMessageRemoved, {autoAlpha: 1, zIndex: 1})
        .to(favoriteMessageRemoved, {autoAlpha: 0, zIndex: 0, delay: 2});
    } else {
      button.setAttribute('data-state', 'true');

      gsap.timeline()
        .to(favoriteMessageAdded, {autoAlpha: 1, zIndex: 1})
        .to(favoriteMessageAdded, {autoAlpha: 0, zIndex: 0, delay: 2});
    }
  });
})();
