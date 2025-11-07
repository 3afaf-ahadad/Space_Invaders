const grid = document.querySelector(".grid"); // here I'm creating the grid where all the squares are and where the space invaders'll be moving!
let scoreDisplay = document.querySelector(".result"); // displaying the score


 
const width = 15; // the width of the grid; a variable I'll use a lot looping, calculating ...
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

