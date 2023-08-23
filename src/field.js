'use strict';

const ITEM_SIZE = 90;
const HEART_COUNTS = 3;

export default class Field {
  constructor(count) {
    this.size = ITEM_SIZE;
    this.heart = HEART_COUNTS;
    this.count = count;
    this.gameSection = document.querySelector('.game-section');
    this.gameSection.addEventListener('click', this.onClick);
  }

  init(itemCount, heartCount) {
    this.count = itemCount;
    this.heart = heartCount;
  }

  makeItem() {
    const fragment = document.createDocumentFragment();
    const gameSection = document.querySelector('.game-section');

    for (let i = this.count; i > 0; i--) {
      const carrot = document.createElement('img');
      carrot.setAttribute('src', `./assets/img/carrot.png`);
      carrot.setAttribute('alt', `carrot`);
      carrot.setAttribute('class', `carrot`);

      const { right, left, top, bottom } = this.gameSection.getBoundingClientRect();
      const carrotX = getRandomNumber(left + this.size, right - this.size);
      const carrotY = getRandomNumber(top + this.size, bottom - this.size);
      carrot.style.transform = `translate(${carrotX - left}px, ${carrotY - top}px)`;

      const bug = document.createElement('img');
      bug.setAttribute('src', `./assets/img/bug.png`);
      bug.setAttribute('alt', `bug`);
      bug.setAttribute('class', `bug`);

      const bugX = getRandomNumber(left + this.size, right - this.size);
      const bugY = getRandomNumber(top + this.size, bottom - this.size);
      bug.style.transform = `translate(${bugX - left}px, ${bugY - top}px)`;

      fragment.appendChild(carrot);
      fragment.appendChild(bug);
    }
    gameSection.appendChild(fragment);

    // make Heart
    const heartList = document.createElement('ul');
    heartList.setAttribute('class', 'heart-list');
    for (let i = 0; i < this.heart; i++) {
      const li = document.createElement('li');
      const heartIcon = document.createElement('i');
      heartIcon.setAttribute('class', 'fas fa-heart');
      li.appendChild(heartIcon);
      heartList.appendChild(li);
    }
    document.querySelector('header').appendChild(heartList);
  }

  // ✨외부함수를 콜백함수로 받아서 클래스 내부 멤버함수로 사용할수있다.
  setItemClick(onItemClick) {
    this.onItemClick = onItemClick;
  }

  onClick = (e) => {
    if (e.target.className === 'carrot') {
      e.target.remove();
      this.count--;
      this.onItemClick && this.onItemClick('carrot');
    } else if (e.target.className === 'bug') {
      this.onItemClick && this.onItemClick('bug');
    }
  };

  decreaseHeart() {
    this.heart--;
    document.querySelector('.heart-list').firstElementChild.remove();
    if (this.heart === 0) document.querySelector('.heart-list').remove();
  }
}

function getRandomNumber(min, max) {
  let radomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return radomNum;
}
