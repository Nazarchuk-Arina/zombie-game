const items = document.querySelectorAll(".item");
const zombieImg = document.createElement("img");
zombieImg.src = "./images/zombie.png";
const soundBtn = document.querySelector("#sound-btn");
const startBtn = document.querySelector("#start-btn");
const bu = document.getElementById("sound-bu");
const shot = document.getElementById("sound-shot");
const hitImg = document.createElement("img");
hitImg.src = "./images/blood.png";
const hitCounter = document.getElementById("hit-counter");
const missCounter = document.getElementById("miss-counter");

let randomIndex;
let hit = true;
let isStarted = false;
let interval;

startBtn.onclick = function () {
  if (!isStarted) {
    isStarted = true;
    playGame();
    startBtn.innerText = "STOP";
  } else {
    isStarted = false;
    clearInterval(interval);
    startBtn.innerText = "START";
    hitCounter.innerText = 0;
    missCounter.innerText = 0;
    zombieImg.remove();
    hitImg.remove();
  }
};

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function playGame() {
  randomIndex = getRandomIndex(items);
  items[randomIndex].append(zombieImg);

  interval = setInterval(function () {
    if (hit === true) {
      hit = false;
    } else {
      missCounter.innerText++;
    }

    randomIndex = getRandomIndex(items);
    items[randomIndex].append(zombieImg);
  }, 2000);
}

soundBtn.addEventListener("click", function () {
  if (bu.currentTime) {
    bu.pause();
    bu.currentTime = 0;
    soundBtn.innerHTML = "SOUND ON";
  } else {
    bu.play();
    soundBtn.innerHTML = "SOUND OFF";
  }
});

zombieImg.onclick = function () {
  hit = true;
  shot.currentTime = 0;
  shot.play();

  zombieImg.remove();
  items[randomIndex].append(hitImg);

  hitCounter.innerText++;
};
