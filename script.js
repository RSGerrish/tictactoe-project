const btnClear = document.querySelector('#btn-clear');
const gameGrid = document.querySelector(".gameboard")
let pieces = ["x", "o", "", "x", "", "o", "o", "", "x"];

var gameBoard = (function() {

  function drawBoard() {
    gameGrid.innerHTML = "";

    for (i = 0; i < 9; i++) {
      gameGrid.innerHTML += `<div class="game-piece" data-index="${i}">${pieces[i]}</div>`;
    }
  };

  function clearBoard() {
    for (i = 0; i < 9; i++) {
      pieces[i] = "";
    }

    gameGrid.innerHTML = "";
  };

  return {
    drawBoard, clearBoard
  };
})();

var displayController = (function() {
  let playerTurn = true;

  function _computerPlay() {
    let emptySpots = [];

    for (i = 0; i < 9; i++) {
      if(gameBoard.pieces[i] === "") {emptySpots.push(i);}
    }
    
    randomChoice = Math.floor(Math.random() * emptySpots.length);
    randomIndex = emptySpots[randomChoice];

    console.log(randomIndex);
    pieces[randomIndex] = "o";
    playerTurn = true;
    gameBoard.drawBoard();
  };

  gameGrid.addEventListener("click", function(event) {
    let targetID = event.target.dataset.index;
    let targetContent = event.target.innerText;

    console.log(targetContent);

    if (!targetContent && playerTurn) {
      pieces[targetID] = "x";
      
      playerTurn = false;
      gameBoard.drawBoard();
      _computerPlay();
    }
  });
})();

const Player = () => {

};

btnClear.addEventListener("click", function() {
  gameBoard.clearBoard();
  gameBoard.drawBoard();
});

gameBoard.drawBoard();