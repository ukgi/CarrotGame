'use strict';

import Popup from './popup.js';
import Field from './field.js';
import Ready from './ready.js';

const gameBtn = document.querySelector('.game-btn');
const gameSection = document.querySelector('.game-section');
const carrotCounter = document.querySelector('.carrot-count');
const header = document.querySelector('header');

let timeoutId = 0;

const readyCounter = () => {
  const ready = new Ready(3);
  ready.readyCounter(startGame);
};

const handleItemClick = (type) => {
  if (type === 'carrot') {
    carrotCounter.lastElementChild.textContent = field.count;
    if (field.count === 0) {
      successGame();
    }
  } else if (type === 'bug') {
    field.decreaseHeart();
    if (field.heart === 0) failGame();
  }
};

gameBtn.addEventListener('click', readyCounter);
const field = new Field();

function startGame() {
  header.style.pointerEvents = 'auto';
  let carrotCount = 10;
  let heartCount = 3;
  carrotCounter.lastElementChild.textContent = carrotCount;

  field.init(carrotCount, heartCount);
  field.makeItem();
  field.setItemClick(handleItemClick);

  let count = 10;
  const timer = document.querySelector('.timer');
  timer.lastElementChild.textContent = count;

  timeoutId = setInterval(() => {
    if (--count === 0) {
      failGame(timeoutId);
    }
    timer.lastElementChild.textContent = count;
  }, 1000);

  gameBtn.firstElementChild.classList.replace('fa-play', 'fa-stop');
  gameBtn.removeEventListener('click', readyCounter);
  gameBtn.addEventListener('click', () => {
    stopGame(timeoutId);
  });
}

function stopGame(timeoutId) {
  header.style.pointerEvents = 'none';
  [...gameSection.children].forEach((child) => {
    gameSection.removeChild(child);
  });
  clearInterval(timeoutId);
  const popupBanner = new Popup('stop', '다시?🤔');
  popupBanner.setClickListener(readyCounter);
  popupBanner.makePopup();
}

function failGame() {
  header.style.pointerEvents = 'none';
  clearInterval(timeoutId);
  [...gameSection.children].forEach((child) => {
    gameSection.removeChild(child);
  });
  const popupBanner = new Popup('fail', '실패😢');
  popupBanner.setClickListener(readyCounter);
  popupBanner.makePopup();
}

function successGame() {
  header.style.pointerEvents = 'none';
  clearInterval(timeoutId);
  [...gameSection.children].forEach((child) => {
    gameSection.removeChild(child);
  });
  const popupBanner = new Popup('success', '성공😊');
  popupBanner.setClickListener(readyCounter);
  popupBanner.makePopup();
}
