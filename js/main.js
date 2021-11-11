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

'use strict';

(function () {
  const cardList = document.querySelector('.js-card-list');
  const favoriteMessageAdded = document.querySelector('.js-favorite-message-added');
  const favoriteMessageRemoved = document.querySelector('.js-favorite-message-removed');

  if (!cardList || !favoriteMessageAdded || !favoriteMessageRemoved) {
    return false;
  }

  window.gsap.set([favoriteMessageAdded, favoriteMessageRemoved], {autoAlpha: 0});

  cardList.addEventListener('click', (evt) => {
    const button = evt.target.closest('.js-card-like-button');

    if (!button) {
      return false;
    }

    if (button.hasAttribute('data-state')) {
      button.removeAttribute('data-state');

      window.gsap.timeline()
        .to(favoriteMessageRemoved, {autoAlpha: 1, zIndex: 1})
        .to(favoriteMessageRemoved, {autoAlpha: 0, zIndex: 0, delay: 2});
    } else {
      button.setAttribute('data-state', 'true');

      window.gsap.timeline()
        .to(favoriteMessageAdded, {autoAlpha: 1, zIndex: 1})
        .to(favoriteMessageAdded, {autoAlpha: 0, zIndex: 0, delay: 2});
    }
  });
})();

'use strict';

(function () {
  let data = [];

  function onFetchSuccess(json) {
    const filterData = [];
    data = json;

    const cardTemplate = document.querySelector('#card-template').content;
    const cardList = document.querySelector('.js-card-list');

    for (let i = 0; i < 20; i++) {
      const photoUrl = `https://source.unsplash.com/random/380x264?kitten&sig=${Math.random()}`;

      const cardData = data[i];

      let isSold = false;
      if (cardData.isSold) {
        isSold = true;
      }

      let isDiscount = false;
      if (cardData.discount) {
        isDiscount = true;
      }

      const cardWrapper = cardTemplate.cloneNode(true);
      const card = cardWrapper.querySelector('.js-card');
      const cardImage = card.querySelector('.js-card-image');
      const cardLikeButton = card.querySelector('.js-card-like-button');
      const cardDiscount = card.querySelector('.js-card-discount');
      const cardTitle = card.querySelector('.js-card-title');
      const cardColor = card.querySelector('.js-card-color');
      const cardAge = card.querySelector('.js-card-age');
      const cardLegs = card.querySelector('.js-card-legs');
      const cardPrice = card.querySelector('.js-card-price');
      const cardButton = card.querySelector('.js-card-button');

      let cardButtonText = cardButton.getAttribute('data-buy-text');

      if (isSold) {
        card.classList.add('card--sold');
      }

      cardImage.src = photoUrl;

      if (isSold) {
        cardLikeButton.disabled = true;
      }

      if (!isDiscount) {
        cardDiscount.style.display = 'none';
      } else {
        cardDiscount.textContent = cardData.discount;
      }

      cardTitle.textContent = cardData.title;
      cardColor.textContent = cardData.color;
      cardAge.textContent = cardData.age;
      cardLegs.textContent = cardData.legs;
      cardPrice.textContent = cardData.price;

      if (isSold) {
        cardButtonText = cardButton.getAttribute('data-sold-text');
      }

      cardButton.textContent = cardButtonText;

      // window.window.gsap.fromTo(cardElementLi, {autoAlpha: 0, scale: 0.8}, {autoAlpha: 1, scale: 1, duration: 0.5});

      cardList.appendChild(cardWrapper);

      filterData.push({
        price: +cardData.price.match(/\d/g).join(''),
        age: +cardData.age.match(/\d/g).join(''),
        element: card.parentNode,
      });
    }

    const cardAdded = new CustomEvent('card-added', {
      detail: filterData,
    });

    cardList.dispatchEvent(cardAdded);
  }

  const cardAddButton = document.querySelector('.js-cards-add-button');

  function fetchData(onSuccess) {
    fetch(
      'data.json',
      {
        method: 'GET',
        cache: 'no-cache',
      },
    ).then((response) => {
      if (response.ok) {
        return response.json();
      }
    }).then((json) => {
      onSuccess(json);
      cardAddButton.disabled = false;
      cardAddButton.textContent = cardAddButton.getAttribute('data-default-text');
    });
  }

  cardAddButton.addEventListener('click', () => {
    cardAddButton.disabled = true;
    cardAddButton.textContent = cardAddButton.getAttribute('data-load-text');
    fetchData(onFetchSuccess);
  });
})();

'use strict';

(function () {
  const data = [];
  const buttonList = document.querySelectorAll('.js-filter-button');
  const cardList = document.querySelector('.js-card-list');
  let propertyName = 'price';

  const BUTTON_ASC_CLASS = 'filter__button--asc';
  const BUTTON_DESC_CLASS = 'filter__button--desc';

  if (!buttonList.length || !cardList) {
    return false;
  }

  const cards = cardList.querySelectorAll('.js-card');

  for (let i = 0; i < cards.length; i++) {
    const cardElement = cards[i];
    const cardObject = {};

    const priceElement = cardElement.querySelector('.js-card-price');
    const ageElement = cardElement.querySelector('.js-card-age');
    const price = +priceElement.textContent.match(/\d/g).join('');
    const age = +ageElement.textContent.match(/\d/g).join('');

    cardObject.price = price;
    cardObject.age = age;
    cardObject.element = cardElement.parentNode;

    data.push(cardObject);
  }

  function compareAsc(a, b) {
    if (a[propertyName] > b[propertyName]) {
      return 1;
    }

    if (a[propertyName] === b[propertyName]) {
      return 0;
    }

    if (a[propertyName] < b[propertyName]) {
      return -1;
    }
  }

  function compareDesc(a, b) {
    if (a[propertyName] < b[propertyName]) {
      return 1;
    }

    if (a[propertyName] === b[propertyName]) {
      return 0;
    }

    if (a[propertyName] > b[propertyName]) {
      return -1;
    }
  }

  function sortByProperty(property, sortType) {
    propertyName = property;
    const dataCopy = data.slice();

    if (sortType === 'asc') {
      dataCopy.sort(compareAsc);
    }

    if (sortType === 'desc') {
      dataCopy.sort(compareDesc);
    }

    return dataCopy;
  }

  function renderData(dataForRender) {
    cardList.innerHTML = '';

    for (let i = 0; i < dataForRender.length; i++) {
      const dataCard = dataForRender[i];

      cardList.appendChild(dataCard.element);
    }
  }

  for (let i = 0; i < buttonList.length; i++) {
    const button = buttonList[i];

    button.addEventListener('click', () => {
      //reset other buttons
      for (let k = 0; k < buttonList.length; k++) {
        const otherButton = buttonList[k];

        if (!otherButton.isEqualNode(button)) {
          otherButton.classList.remove(BUTTON_ASC_CLASS);
          otherButton.classList.remove(BUTTON_DESC_CLASS);
        }
      }

      if (!button.classList.contains(BUTTON_ASC_CLASS)
        && !button.classList.contains(BUTTON_DESC_CLASS)
      ) {
        button.classList.add(BUTTON_ASC_CLASS);

        const sortResult = sortByProperty(button.getAttribute('data-type'), 'asc');
        renderData(sortResult);

        return true;
      }

      if (button.classList.contains(BUTTON_ASC_CLASS)) {
        button.classList.remove(BUTTON_ASC_CLASS);
        button.classList.add(BUTTON_DESC_CLASS);

        const sortResult = sortByProperty(button.getAttribute('data-type'), 'desc');
        renderData(sortResult);

        return true;
      }

      if (button.classList.contains(BUTTON_DESC_CLASS)) {
        button.classList.remove(BUTTON_DESC_CLASS);
        button.classList.add(BUTTON_ASC_CLASS);

        const sortResult = sortByProperty(button.getAttribute('data-type'), 'asc');
        renderData(sortResult);

        return true;
      }
    });
  }

  cardList.addEventListener('card-added', (evt) => {
    const newData = evt.detail;

    for (let i = 0; i < newData.length; i++) {
      data.push(newData[i]);
    }
  });
})();

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
