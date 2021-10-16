'use strict';

(function () {
  let data = [];

  function onFetchSuccess(json) {
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
      if(cardData.discount) {
        isDiscount = true;
      }

      const cardWrapper = cardTemplate.cloneNode(true);
      // const cardElementLi = card.querySelector('.card');
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

      // window.gsap.fromTo(cardElementLi, {autoAlpha: 0, scale: 0.8}, {autoAlpha: 1, scale: 1, duration: 0.5});

      cardList.appendChild(cardWrapper);
    }
  }

  function fetchData(onSuccess) {
    fetch(
      '../data.json',
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
    });
  }

  const cardAddButton = document.querySelector('.js-cards-add-button');
  cardAddButton.addEventListener('click', () => {
    fetchData(onFetchSuccess);
  });
})();
