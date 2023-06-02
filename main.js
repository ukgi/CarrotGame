const gameBtn = document.querySelector(".gameBtn");
const header = document.querySelector("header");
const gameSection = document.querySelector(".gameSection");
const counter = document.querySelector(".counter");
const carrotCounter = document.querySelector(".carrotCounter");
const textBox = document.querySelector(".textBox");
const stopBtn = gameBtn.querySelector(".fa-stop");

let carrotNumber = 12;
let bugNumber = 12;
let isStart = false;
let timer;
const catchCarrot = [];

gameBtn.addEventListener("click", (e) => {
  if (e.target.className === "fas fa-play") {
    startGame();
  } else if (e.target.className === "fas fa-stop") {
    const gameIng = isStart;
    stopGame(gameIng);
  }
});

textBox.addEventListener("click", (e) => {
  if (
    e.target.className === "retryBtn" ||
    e.target.className === "fas fa-redo"
  ) {
    textBox.style.display = "none";
    startGame();
  }
});

gameSection.addEventListener("click", (e) => {
  const id = e.target.dataset.id;
  const name = e.target.dataset.name;

  if (id) {
    if (name === "bug") {
      stopGame(false);
    } else {
      gameSection.removeChild(e.target);
      catchCarrot.push(id);
      carrotCounter.textContent = `${carrotNumber - catchCarrot.length}`;

      if (catchCarrot.length === carrotNumber) {
        winGame();
      }
    }
  }
});

function startGame() {
  resetGame();
  isStart = true;
  header.style.pointerEvents = "auto";
  gameSection.style.pointerEvents = "auto";
  // 1. 시작 버튼의 모양을 중지 버튼으로 바꾼다
  const playIcon = gameBtn.querySelector(".fa-play");
  playIcon && playIcon.classList.replace("fa-play", "fa-stop");

  // 2. 카운트다운이 시작된다
  startCount();

  // 3. 당근의 갯수가 보인다
  carrotCounter.textContent = `${carrotNumber}`;

  // 4. 당근이랑 벌레를 만든다
  makeCarrots();
  makeBugs();
}

function stopGame(isGameIng) {
  // 1. 게임 중에 중단 버튼을 누르면
  isStart = false;
  stopCount(timer);
  textBox.style.display = "block";

  header.style.pointerEvents = "none";
  gameSection.style.pointerEvents = "none";

  if (isGameIng === true) {
    textBox.innerHTML = `
    <h1>다시 시작하겠습니까?</h1>
    <button class="retryBtn">
        <i class="fas fa-redo"></i>
    </button>
    `;
  }
  // 2. 타이머가 다 되서 게임이 종료되면
  else {
    textBox.innerHTML = `
        <h1>실패 😖</h1>
        <button class="retryBtn">
            <i class="fas fa-redo"></i>
        </button>
        `;
  }
}

function winGame() {
  isStart = false;
  stopCount(timer);
  textBox.style.display = "block";

  header.style.pointerEvents = "none";
  gameSection.style.pointerEvents = "none";

  textBox.innerHTML = `
    <h1>성공 😃</h1>
      <button class="retryBtn">
        <i class="fas fa-redo"></i>
      </button>
  `;
}

function startCount() {
  let count = 9;
  counter.textContent = `${count + 1}`;
  timer = setInterval(() => {
    if (count === 0) {
      isStart = false;
      stopGame(false);
    }
    counter.textContent = `${count}`;
    count--;
  }, 1000);
}

function stopCount(timer) {
  clearInterval(timer);
}

function makeCarrots() {
  const carrotSize = 80;
  const gameSectionX = gameSection.getBoundingClientRect().x;
  const gameSectionRight =
    gameSection.getBoundingClientRect().right - carrotSize;

  const gameSectionY = gameSection.getBoundingClientRect().y;
  const gameSectionBottom =
    gameSection.getBoundingClientRect().bottom - carrotSize;

  for (let i = 0; i < carrotNumber; i++) {
    const carrotX = random(gameSectionX, gameSectionRight);
    const carrotY = random(gameSectionY, gameSectionBottom);

    const carrot = document.createElement("img");
    carrot.setAttribute("src", "./assets/img/carrot.png");
    carrot.setAttribute("data-name", "carrot");
    carrot.setAttribute("data-id", `${i}`);
    carrot.style.position = "absolute";

    const carrotTop = carrotY - gameSectionY;
    const carrotLeft = carrotX - gameSectionX;
    carrot.style.top = `${carrotTop}px`;
    carrot.style.left = `${carrotLeft}px`;

    gameSection.appendChild(carrot);
  }
}

function makeBugs() {
  const bugSize = 50;
  const gameSectionX = gameSection.getBoundingClientRect().x;
  const gameSectionRight = gameSection.getBoundingClientRect().right - bugSize;

  const gameSectionY = gameSection.getBoundingClientRect().y;
  const gameSectionBottom =
    gameSection.getBoundingClientRect().bottom - bugSize;

  for (let i = 0; i < bugNumber; i++) {
    const bugX = random(gameSectionX, gameSectionRight);
    const bugY = random(gameSectionY, gameSectionBottom);

    const bug = document.createElement("img");
    bug.setAttribute("src", "./assets/img/bug.png");
    bug.setAttribute("data-name", "bug");
    bug.setAttribute("data-id", `${i}`);
    bug.style.position = "absolute";

    const bugTop = bugY - gameSectionY;
    const bugLeft = bugX - gameSectionX;
    bug.style.top = `${bugTop}px`;
    bug.style.left = `${bugLeft}px`;

    gameSection.appendChild(bug);
  }
}

function resetGame() {
  catchCarrot.splice(0);
  gameSection.replaceChildren();
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
