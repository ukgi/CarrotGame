'use strict';

export default class Ready {
  constructor(time) {
    this.time = time;
    this.gameSection = document.querySelector('.game-section');
  }

  readyCounter(start) {
    document.querySelector('header').style.pointerEvents = 'none';

    this.makeReadyCounterBox(this.time);

    const readyTimeoutId = setInterval(() => {
      document.querySelector('.ready-count').lastElementChild.textContent = --this.time;
      if (this.time === 0) {
        clearInterval(readyTimeoutId);
        this.gameSection.removeChild(this.gameSection.lastElementChild);
        start();
      }
    }, 1000);
  }

  makeReadyCounterBox(time) {
    const readyCountBox = document.createElement('div');
    readyCountBox.setAttribute('class', 'ready-count');
    const readyCountNumber = document.createElement('h1');
    readyCountNumber.textContent = time;
    readyCountBox.appendChild(readyCountNumber);
    this.gameSection.appendChild(readyCountBox);
  }
}
