const squaresDivs = document.querySelectorAll(".square");
// console.log(squaresDivs)
const startBtn = document.querySelector(".start");
const level = document.querySelector(".difficulty");
const decreasingTime = document.querySelector(".decreasTime");
const score = document.querySelector(".score");
const over = document.querySelector(".over");
const reset = document.querySelector(".reset");

let gameScore = 0;
let gameTime = 10;
let selectRondonSquareTimer;
let decreaseTimeTimer;

squaresDivs.forEach((squareDiv) => {
  squareDiv.onclick = () => {
    // console.log("sq div id is",squareDiv.id)
    // console.log("sq div id is",squareDiv)  // for check mole is available or not
    // console.log("sq div id is",squareDiv.classList.contains("mole-image")) // it gives true false
    if (squareDiv.classList.contains("mole-image")) {
      gameScore++;
      score.innerText = gameScore;
    }
  };
});

const selectRondonSquare = () => {
  squaresDivs.forEach((squareDiv) => {
    squareDiv.classList.remove("mole-image");
  });
  const rondomSelectedDiv = squaresDivs[Math.floor(Math.random() * 9)];
  //  console.log(squaresDivs[Math.floor(Math.random()*9)])
  rondomSelectedDiv.classList.add("mole-image");
};

const decreaseTime = () => {
  gameTime = gameTime - 1;
  decreasingTime.innerText = gameTime;
  if (gameTime == 0) {
    clearInterval(selectRondonSquareTimer);
    clearInterval(decreaseTimeTimer);
    over.innerText = "Game Over";
    startBtn.disabled = false;
    gameTime = 11;

    squaresDivs.forEach((squareDiv) => {
      squareDiv.classList.remove("mole-image");
    });
  }
};

reset.onclick = () => {
  decreasingTime.innerHTML = "10";
  score.innerHTML = "0";
  clearInterval(selectRondonSquareTimer);
  clearInterval(decreaseTimeTimer);
  startBtn.disabled = false;
  over.innerText = "";
  squaresDivs.forEach((squareDiv) => {
    squareDiv.classList.remove("mole-image");
  });
};

startBtn.onclick = () => {
  // console.log(level.value)
  let IntervalTime;
  if (level.value == "easy") {
    IntervalTime = 800;
  } else if (level.value == "medium") {
    IntervalTime = 600;
  } else if (level.value == "hard") {
    IntervalTime = 400;
  }
  selectRondonSquareTimer = setInterval(selectRondonSquare, IntervalTime);
  decreaseTimeTimer = setInterval(decreaseTime, 1000);
  gameTime = 11;
  gameScore = 0;
  score.innerText = "0";
  startBtn.disabled = true; //prevent double click on start button
  over.innerText = "";
};
