const gameBtn = document.querySelector(".game-btn");
const gameSection = document.querySelector(".game-section");
const carrotCounter = document.querySelector(".carrot-count");
const header = document.querySelector("header");

let timeoutId = 0;
let carrotCount = 10;
let bugCount = 10;
let heart;

gameBtn.addEventListener("click", readyCounter);

// readyCounter
// 카운터할 변수를 전달하면 카운터를 진행한 후 게임을 실행시켜주는 기능
function readyCounter() {
  let preparationTime = 3;
  header.style.pointerEvents = "none";

  makeReadyCounterBox(preparationTime);

  const readyTimeoutId = setInterval(() => {
    document.querySelector(".ready-count").lastElementChild.textContent =
      --preparationTime;
    if (preparationTime === 0) {
      clearInterval(readyTimeoutId);
      gameSection.removeChild(gameSection.lastElementChild);
      startGame();
    }
  }, 1000);
}

// makeReadyCounterBox
// 카운터박스(카운터를 보여주는 박스)를 만들어주는 기능
function makeReadyCounterBox(time) {
  const readyCountBox = document.createElement("div");
  readyCountBox.setAttribute("class", "ready-count");
  const readyCountNumber = document.createElement("h1");
  readyCountNumber.textContent = time;
  readyCountBox.appendChild(readyCountNumber);
  gameSection.appendChild(readyCountBox);
}

// startGame
// 게임을 실행하는 기능
// 타이머가 실행, 벌레와 당근 생성
// 타이머가 종료되면 게임 종료
function startGame() {
  header.style.pointerEvents = "auto";

  heart = new HeartMaker();
  console.log(heart.heart);

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

  gameSection.addEventListener("click", handleItemClick);
}

function handleItemClick(e) {
  if (e.target.className === "carrot") {
    e.target.remove();
    count--;
    carrotCounter.lastElementChild.textContent = count;
    if (count === 0) {
      successGame();
    }
  } else if (e.target.className === "bug") {
    heart.decreaseHeart();
  }
}

// 게임을 중지시켜주는 기능
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

// 게임에 실패했다는 것을 알려주는 기능
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

// 게임에 성공했다는 기능
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

// 당근과 벌레를 만들어주는 기능
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
  gameSection.appendChild(fragment);
}

// 텍스트 박스를 만들어주는 기능
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

// 두 수 사이의 랜덤값을 만들어주는 기능
function getRandomNumber(min, max) {
  let radomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return radomNum;
}

class HeartMaker {
  constructor() {
    this.heart = 3;

    const heartList = document.createElement("ul");
    heartList.setAttribute("class", "heart-list");
    for (let i = 0; i < this.heart; i++) {
      const li = document.createElement("li");
      const heartIcon = document.createElement("i");
      heartIcon.setAttribute("class", "fas fa-heart");
      li.appendChild(heartIcon);
      heartList.appendChild(li);
    }
    header.appendChild(heartList);
  }

  decreaseHeart() {
    this.heart--;
    document.querySelector(".heart-list").firstElementChild.remove();
    if (this.heart === 0) {
      document.querySelector(".heart-list").remove();
      failGame();
    }
  }
}
