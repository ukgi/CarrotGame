// 😱 전역변수를 함수 내부에서 바로 가져다 사용하게 되면 안된다
// 왜냐하면 전역변수의 값이 달라지게 되서 다시 세팅해야하기 때문이다.
// 함수의 파라미터를 이용해서 변형해야한다. (값 복사)

const gameBtn = document.querySelector(".game-btn");
const gameSection = document.querySelector(".game-section");
const carrotCounter = document.querySelector(".carrot-count");
const header = document.querySelector("header");

let timeoutId = 0;
let carrotCount = 10;
let bugCount = 10;

gameBtn.addEventListener("click", readyCounter);

function readyCounter() {
  let preparationTime = 3;
  header.style.pointerEvents = "none";

  const readyCountBox = document.createElement("div");
  readyCountBox.setAttribute("class", "ready-count");
  const readyCountNumber = document.createElement("h1");
  readyCountNumber.textContent = preparationTime;
  readyCountBox.appendChild(readyCountNumber);
  gameSection.appendChild(readyCountBox);

  const readyTimeoutId = setInterval(() => {
    readyCountNumber.textContent = --preparationTime;
    if (preparationTime === 0) {
      clearInterval(readyTimeoutId);
      gameSection.removeChild(gameSection.lastElementChild);
      startGame();
    }
  }, 1000);
}

// 초기화는 여기서
function startGame() {
  header.style.pointerEvents = "auto";

  let count = 10;
  const timer = document.querySelector(".timer");
  timer.lastElementChild.textContent = count;

  timeoutId = setInterval(() => {
    if (--count === 0) {
      failGame(timeoutId);
    }
    timer.lastElementChild.textContent = count;
  }, 1000);

  makeItem("carrot", 90, carrotCount);
  makeItem("bug", 60, bugCount);

  gameBtn.firstElementChild.classList.replace("fa-play", "fa-stop");
  gameBtn.removeEventListener("click", readyCounter);
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
  makeTextBox({
    status: "stop",
    message: "RETRY?🤔",
  });
}

function failGame() {
  header.style.pointerEvents = "none";
  clearInterval(timeoutId);
  [...gameSection.children].forEach((child) => {
    gameSection.removeChild(child);
  });
  makeTextBox({
    status: "fail",
    message: "실패😱",
  });
}

function successGame() {
  header.style.pointerEvents = "none";
  clearInterval(timeoutId);
  [...gameSection.children].forEach((child) => {
    gameSection.removeChild(child);
  });
  makeTextBox({
    status: "success",
    message: "성공!😁",
  });
}

function makeItem(type, size, count) {
  const fragment = document.createDocumentFragment();
  const itemSize = size;
  carrotCounter.lastElementChild.textContent = count;

  for (let i = count; i > 0; i--) {
    const item = document.createElement("img");
    item.setAttribute("src", `./assets/img/${type}.png`);
    item.setAttribute("alt", `${type}`);
    item.setAttribute("class", `${type}`);

    const { right, left, top, bottom } = gameSection.getBoundingClientRect();

    const itemX = getRandomNumber(left + itemSize, right - itemSize);
    const itemY = getRandomNumber(top + itemSize, bottom - itemSize);
    item.style.transform = `translate(${itemX - left}px, ${itemY - top}px)`;
    fragment.appendChild(item);
  }

  gameSection.addEventListener("click", (e) => {
    if (e.target.className === "carrot") {
      e.target.remove();
      count--;
      carrotCounter.lastElementChild.textContent = count;
      if (count === 0) {
        successGame();
      }
    } else if (e.target.className === "bug") {
      failGame();
    }
  });

  gameSection.appendChild(fragment);
}

function makeTextBox({ status, message }) {
  const box = document.createElement("div");
  box.setAttribute("class", "textBox");
  const boxTitle = document.createElement("h1");
  boxTitle.textContent = message;
  box.appendChild(boxTitle);

  if (status === "fail" || "success" || "stop") {
    const button = document.createElement("button");
    box.appendChild(button);

    const refreshBtn = document.createElement("i");
    refreshBtn.setAttribute("class", "fas fa-redo");
    button.appendChild(refreshBtn);

    button.addEventListener("click", () => {
      gameSection.removeChild(box);
      readyCounter();
    });
  }

  gameSection.appendChild(box);
}

function getRandomNumber(min, max) {
  let radomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return radomNum;
}
