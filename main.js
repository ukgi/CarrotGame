const gameBtn = document.querySelector(".gameBtn");
const counter = document.querySelector(".counter");
const carrotCounter = document.querySelector(".carrotCounter");
const textBox = document.querySelector(".textBox");
const stopBtn = gameBtn.querySelector(".fa-stop");

let carrotNumber = 12;
let isStart = false;
let timer;

gameBtn.addEventListener("click", (e) => {
  if (e.target.className === "fas fa-play") {
    startGame();
  } else {
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

function startGame() {
  isStart = true;
  // 1. 시작 버튼의 모양을 중지 버튼으로 바꾼다
  const playIcon = gameBtn.querySelector(".fa-play");
  playIcon && playIcon.classList.replace("fa-play", "fa-stop");

  // 2. 카운트다운이 시작된다
  startCount();

  // 3. 당근의 갯수가 보인다
  carrotCounter.textContent = `${carrotNumber}`;
}

function stopGame(isGameIng) {
  // 1. 게임 중에 중단 버튼을 누르면
  if (isGameIng === true) {
    stopCount(timer);
    textBox.innerHTML = `
    <h1>다시 시작하겠습니까?</h1>
    <button class="retryBtn">
        <i class="fas fa-redo"></i>
    </button>
    `;
    textBox.style.display = "block";
  }
  // 2. 타이머가 다 되서 게임이 종료되면
  else {
    isStart = false;
    stopCount(timer);
    textBox.innerHTML = `
        <h1>실패 😖</h1>
        <button class="retryBtn">
            <i class="fas fa-redo"></i>
        </button>
        `;
    textBox.style.display = "block";
  }
}

function startCount() {
  let count = 3;
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
