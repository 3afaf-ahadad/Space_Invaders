const grid = document.querySelector(".grid"); // here I'm creating the grid where all the squares are and where the space invaders'll be moving!
let scoreDisplay = document.querySelector(".result"); // displaying the score

const width = 15; // the width of the grid; a variable I'll use a lot looping, calculating ...

let shooterIndex = 202;

let isGoingRight = true;
let direction = 1;
let invadersId;

// the indexes of the killed space invaders
const killedInvaders = [];
let score = 0;

// *******************The Box/Grid******************************
for (let i = 0; i < width * width; i++) {
  const square = document.createElement("div");
  grid.appendChild(square);
} // created squares in the grid 15 x 15 ==> 225 squares by total

// **********************"Space Invaders👾"***************************

const squares = Array.from(document.querySelectorAll(".grid div")); // turning the 'squares' node list to an array

const spaceInvaders = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31,
  32, 33, 34, 35, 36, 37, 38, 39,
]; // this is the list of the space invaders indexes/places when starting the game

// *********************👾"Space Invaders" Movements****************************

function drawInvaders() {
  // giving a class 'invader' to every square that has a 'spaceInvader' index
  //

  for (let i = 0; i < spaceInvaders.length; i++) {
    // checking the killed invaders to not draw them again when moving
    if (!killedInvaders.includes(i)) {
      squares[spaceInvaders[i]].classList.add("invader");
    }
  }
}
drawInvaders();

function removeInvaders() {
  for (let i = 0; i < spaceInvaders.length; i++) {
    squares[spaceInvaders[i]].classList.remove("invader");
  }
}

function moveInvaders() {
  //remove the class 'invader' from each div in the 'spaceInvaders' array --> move all indexes by 1 --> return the class 'invader'
  const leftEdge = spaceInvaders[0] % width === 0;
  const rightEdge =
    spaceInvaders[spaceInvaders.length - 1] % width === width - 1;
  removeInvaders();
  //    I check wether "spaceInvaders" are on the right/left edge
  // Using the 2 variables of "right/leftEdge" and "isGoingRight"
  if (rightEdge && isGoingRight) {
    for (let i = 0; i < spaceInvaders.length; i++) {
      spaceInvaders[i] += width + 1;
      direction = -1;
      isGoingRight = false;
    }
  }
  // If the "spaceInvaders" hit the right/left edge they go downward and
  //    turn the direction and keep moving the other way to make their known "zigzag" movements in the original game
  if (leftEdge && !isGoingRight) {
    for (let i = 0; i < spaceInvaders.length; i++) {
      spaceInvaders[i] += width - 1;
      direction = 1;
      isGoingRight = true;
    }
  }
  for (let i = 0; i < spaceInvaders.length; i++) {
    spaceInvaders[i] += direction;
  }
  drawInvaders();

  // modifying in the score display when the game ends
  // whether it's a win or a game over
  if (squares[shooterIndex].classList.contains("invader")) {
    scoreDisplay.innerHTML = "GAME OVER";
    removeEvents();
    clearInterval(invadersId);
    flashGameOver();
  }
  if (killedInvaders.length === spaceInvaders.length) {
    scoreDisplay.innerHTML = "!YOU WIN!";
    clearInterval(invadersId);
    flashWin();
  }
}

invadersId = setInterval(moveInvaders, 600);
// **********************The shooter***************************
squares[shooterIndex].classList.add("shoot");
function moveShooter(e) {
  squares[shooterIndex].classList.remove("shoot"); // remove the class --> moving the index first --> giving the class again
  switch (e.key) {
    case "ArrowLeft":
      // checking first, if the shooter is at the left edge
      // every index at the left edge is divided by 15
      if (shooterIndex % width !== 0) shooterIndex -= 1;
      break;
    case "ArrowRight":
      // checking if the shooter is at the right edge
      // all the indexes in the right edge % are < then 14 (except the last row)
      if (shooterIndex % width < width - 1) shooterIndex += 1;
      break;
  }
  squares[shooterIndex].classList.add("shoot");
}

// **********************The shooter***************************
squares[shooterIndex].classList.add("shoot");
function moveShooter(e) {
  squares[shooterIndex].classList.remove("shoot"); // remove the class --> moving the index first --> giving the class again
  switch (e.key) {
    case "ArrowLeft":
      // checking first, if the shooter is at the left edge
      // every index at the left edge is divided by 15
      if (shooterIndex % width !== 0) shooterIndex -= 1;
      break;
    case "ArrowRight":
      // checking if the shooter is at the right edge
      // all the indexes in the right edge % are < then 14 (except the last row)
      if (shooterIndex % width < width - 1) shooterIndex += 1;
      break;
  }
  squares[shooterIndex].classList.add("shoot");
}

// *******************Laser shooting💥🔫********************************
function shootLaser(e) {
  let laserIndex = shooterIndex; // the laser comes from the div with the shooter index
  let laserId;
  function moveLaser() {
    squares[laserIndex].classList.remove("laser");
    laserIndex -= width; // -width so the laser goes up
    if (laserIndex < 0) {
      // stopping the laser from going off top edge of the grid
      clearInterval(laserId);
      return;
    }
    squares[laserIndex].classList.add("laser");
    // when the laser hits invaders
    if (squares[laserIndex].classList.contains("invader")) {
      squares[laserIndex].classList.remove("laser");
      squares[laserIndex].classList.remove("invader");
      squares[laserIndex].classList.add("explode");
      setTimeout(() => squares[laserIndex].classList.remove("explode"), 300);
      clearInterval(laserId);
      score++;
      scoreDisplay.innerHTML = score;
      // removing the shotten invaders
      const invaderKilled = spaceInvaders.indexOf(laserIndex);
      killedInvaders.push(invaderKilled);
    }
  }
  if (e.key === "ArrowUp") {
    laserId = setInterval(moveLaser, 100);
  }
}



document.addEventListener("keydown", shootLaser);
document.addEventListener("keydown", moveShooter);



// a simple effect when game's over
function flashGameOver() {
  let isNotRed = false;
  setInterval(() => {
    scoreDisplay.style.color = isNotRed ? "red" : "#333";
    isNotRed = !isNotRed;
  }, 300);
}
function flashWin() {
  let notYellow = false;
  setInterval(() => {
    scoreDisplay.style.color = notYellow ? "yellow" : "white";
    notYellow = !notYellow;
  }, 300);
}
function removeEvents() {
  document.removeEventListener("keydown", shootLaser);
  document.removeEventListener("keydown", moveShooter);
}
