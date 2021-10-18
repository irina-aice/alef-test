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
