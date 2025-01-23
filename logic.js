let gameSeq = [];
let userSeq = [];

let highestScore = localStorage.getItem('highestScore') || 0; // Retrieve the highest score from localStorage or set it to 0 if it doesn't exist
let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");
let h4 = document.querySelector("h4");
let btns = ["red", "yellow", "green", "purple"]; //colors of the buttons

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("game started.");
    started = true;
    levelUp();
  }
});


//flashGame() and flashUser() functions are used to flash the color of the button when it is clicked by user or when it is generated by the game.
function flashGame(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}
function flashUser(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}


//levelUp function is called when user enters the correct sequence of colors. It increases the level by 1 and flashes a new color. 
function levelUp() {
  userSeq = []; //user has to enter all the colors in sequenece from the begining....
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);

  gameSeq.push(randColor);
  console.log(gameSeq);
  flashGame(randBtn);
}

//checkSeq function is called when user enters a color. It checks if the color entered by user is correct or not. 
function checkSeq(idx) {
  if (gameSeq[idx] === userSeq[idx]) {
    if (gameSeq.length == userSeq.length) {
      setTimeout(levelUp, 700); // wait for 700ms before moving to next level; levelUp() will be called after 700ms
    }
  } else {
    h2.innerHTML = `Game over!!! You pressed wrong box!! <br>Press any key to start the game.`;
    document.querySelector("body").style.background = "red";
    
    // Check and update the highest score
    if (level > highestScore) {
        highestScore = level;
        // Optionally, store the highest score in localStorage
        localStorage.setItem('highestScore', highestScore);
      }
      h3.innerHTML = `Your score: <b>${level}</b>` ; // Display the score of the current player
      // Initialize the highest score display
      h4.innerHTML = `Highest Score by a previous player: ${highestScore}`;
    setTimeout(() => {
      document.querySelector("body").style.background =
        "linear-gradient(0.25turn, #3f87a6, #ebf8e1, #ffbd76)";
    }, 500);
    reset();
  }
}

//This btnPress function is called when a button is clicked.
function btnPress() {
  let btn = this;
  flashUser(btn);

  userSeq.push(btn.getAttribute("id"));
  checkSeq(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  level = 0;
  gameSeq = [];
  userSeq = [];
  updateHighestScore();
}
