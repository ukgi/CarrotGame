const gameBtn = document.querySelector(".game-btn");
const gameSection = document.querySelector(".game-section");
const carroutCounter = document.querySelector(".carrot-count");
const header = document.querySelector("header");
let timeoutId = 0;
let carrotCount = 10;
let bugCount = 10;

gameBtn.addEventListener("click", readyCount);

function readyCount() {
  header.style.pointerEvents = "none";

  let readyCount = 3;

  const readyCountBox = document.createElement("div");
  readyCountBox.setAttribute("class", "ready-count");
  const readyCountNumber = document.createElement("h1");
  readyCountNumber.textContent = readyCount;
  readyCountBox.appendChild(readyCountNumber);
  gameSection.appendChild(readyCountBox);

  const timeoutId = setInterval(() => {
    readyCountNumber.textContent = --readyCount;
    if (readyCount === 0) {
      clearInterval(timeoutId);
      gameSection.removeChild(gameSection.lastElementChild);
      startGame();
    }
  }, 1000);
}

function startGame() {
  header.style.pointerEvents = "auto";

  let count = 20;
  const timer = document.querySelector(".timer");
  timer.lastElementChild.textContent = count;

  timeoutId = setInterval(() => {
    if (--count === 0) {
      failGame(timeoutId);
    }
    timer.lastElementChild.textContent = count;
  }, 1000);

  makeCarrot(carrotCount);
  makeBug(bugCount);

  gameBtn.firstElementChild.classList.replace("fa-play", "fa-stop");
  gameBtn.removeEventListener("click", readyCount);
  gameBtn.addEventListener("click", () => {
    stopGame(timeoutId);
  });
}

function stopGame(timeoutId) {
  header.style.pointerEvents = "none";
  [...gameSection.children].forEach((child) => {
    gameSection.removeChild(child);
  });
  clearInterval(timeoutId);
  makeTextBox("RETRY?🤔");
}

function failGame(timeoutId) {
  header.style.pointerEvents = "none";
  clearInterval(timeoutId);
  [...gameSection.children].forEach((child) => {
    gameSection.removeChild(child);
  });
  makeTextBox("실패😱");
}

function successGame() {
  header.style.pointerEvents = "none";
  clearInterval(timeoutId);
  [...gameSection.children].forEach((child) => {
    gameSection.removeChild(child);
  });
  makeTextBox("성공!😁");
}

function makeCarrot(carrotCount) {
  carroutCounter.firstElementChild.textContent = carrotCount;
  const fragment = document.createDocumentFragment();
  const carrotSize = 90;
  for (let i = carrotCount; i > 0; i--) {
    const carrot = document.createElement("img");
    carrot.setAttribute("src", "./assets/img/carrot.png");
    carrot.setAttribute("alt", "carrot");
    carrot.setAttribute("class", "carrot");

    const { right, left, top, bottom } = gameSection.getBoundingClientRect();

    const carrotX = getRandomNumber(left + carrotSize, right - carrotSize);
    const carrotY = getRandomNumber(top + carrotSize, bottom - carrotSize);
    carrot.style.transform = `translate(${carrotX - left}px, ${
      carrotY - top
    }px)`;
    fragment.appendChild(carrot);
  }

  [...fragment.children].forEach((carrot) => {
    carrot.addEventListener("click", () => {
      carrotCount--;
      console.log(carrotCount);
      carrot.remove();
      carroutCounter.firstElementChild.textContent = carrotCount;

      if (carrotCount === 0) {
        successGame();
      }
    });
  });
  gameSection.appendChild(fragment);
}

function makeBug(bugCount) {
  const fragment = document.createDocumentFragment();
  const bugSize = 60;
  for (let i = bugCount; i > 0; i--) {
    const bug = document.createElement("img");
    bug.setAttribute("src", "./assets/img/bug.png");
    bug.setAttribute("alt", "bug");
    bug.setAttribute("class", "bug");

    const { right, left, top, bottom } = gameSection.getBoundingClientRect();

    const bugX = getRandomNumber(left + bugSize, right - bugSize);
    const bugY = getRandomNumber(top + bugSize, bottom - bugSize);
    bug.style.transform = `translate(${bugX - left}px, ${bugY - top}px)`;
    fragment.appendChild(bug);
  }

  [...fragment.children].forEach((bug) => {
    bug.addEventListener("click", () => {
      failGame(timeoutId);
    });
  });
  gameSection.appendChild(fragment);
}

function makeTextBox(status) {
  const box = document.createElement("div");
  box.setAttribute("class", "textBox");
  const boxTitle = document.createElement("h1");
  boxTitle.textContent = status;
  box.appendChild(boxTitle);

  const button = document.createElement("button");
  box.appendChild(button);

  const refreshBtn = document.createElement("i");
  refreshBtn.setAttribute("class", "fas fa-redo");
  button.appendChild(refreshBtn);

  button.addEventListener("click", () => {
    gameSection.removeChild(box);
    readyCount();
  });

  gameSection.appendChild(box);
}

function getRandomNumber(min, max) {
  let radomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return radomNum;
}
