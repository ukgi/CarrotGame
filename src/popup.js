'use strict';

export default class Popup {
  constructor(status, message) {
    this.gameSection = document.querySelector('.game-section');
    this.status = status;
    this.message = message;
    this.box = document.createElement('div');
    this.boxTitle = document.createElement('h1');
    this.button = document.createElement('button');
    this.button.addEventListener('click', () => {
      this.onClick && this.onClick();
      this.hide();
    });
    this.refreshIcon = document.createElement('i');
  }

  makePopup() {
    this.box.setAttribute('class', 'textBox');
    this.boxTitle.textContent = this.message;
    this.box.appendChild(this.boxTitle);

    if (this.status === 'fail' || 'success' || 'stop') {
      this.refreshIcon.setAttribute('class', 'fas fa-redo');
      this.button.appendChild(this.refreshIcon);
      this.box.appendChild(this.button);
    }
    this.gameSection.appendChild(this.box);
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  hide() {
    this.gameSection.removeChild(this.box);
  }
}
