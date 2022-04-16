const gameGrid = document.querySelector(".gameboard");
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

    console.log(pieces);
  };

  return {
    drawBoard, clearBoard
  };
})();

const Player = () => {
  let playerTurn = true;

  function _computerPlay() {
    let emptySpots = [];

    for (i = 0; i < 9; i++) {
      if(pieces[i] === "") {emptySpots.push(i);}
    }
    
    randomChoice = Math.floor(Math.random() * emptySpots.length);
    randomIndex = emptySpots[randomChoice];

    pieces[randomIndex] = "o";
    playerTurn = true;
    gameBoard.drawBoard();
    displayController.checkWinCondition();
  };

  gameGrid.addEventListener("click", function(event) {
    let targetID = event.target.dataset.index;
    let targetContent = event.target.innerText;

    console.log(targetContent);

    if (!targetContent && playerTurn) {
      pieces[targetID] = "x";
      
      playerTurn = false;
      gameBoard.drawBoard();
      displayController.checkWinCondition();
      _computerPlay();
    }
  });
};

var displayController = (function() {
  const btnClear = document.querySelector('#btn-clear');
  const btnPlayAgain = document.querySelector('#btn-play-again');
  const playerOne = Player();

  gameBoard.drawBoard();

  function _whoWon() {
    let playerName = document.querySelector('#player-name').value;
    const winMsg = document.querySelector('.winner-h2');

    if(pieces[0] === "x") {
      if(playerName === "") {playerName = "You";}

      winMsg.innerText = `${playerName} Wins!`
    } else {
      winMsg.innerText = `You Lost to the STUPID AI! LUL`
    }
  }

  function checkWinCondition() {
    const winWindow = document.querySelector(".winner-window");

    if(pieces[0] === pieces[1] && pieces[0] === pieces[2] && pieces[0]) {
      _whoWon();
      winWindow.style.visibility = "visible";
    } else if(pieces[3] === pieces[4] && pieces[3] === pieces[5] && pieces[3]) {
      _whoWon();
      winWindow.style.visibility = "visible";
    } else if(pieces[6] === pieces[7] && pieces[6] === pieces[8] && pieces[6]) {
      _whoWon();
      winWindow.style.visibility = "visible";
    } else if(pieces[0] === pieces[3] && pieces[0] === pieces[6] && pieces[0]) {
      _whoWon();
      winWindow.style.visibility = "visible";
    } else if(pieces[1] === pieces[4] && pieces[1] === pieces[7] && pieces[1]) {
      _whoWon();
      winWindow.style.visibility = "visible";
    } else if(pieces[2] === pieces[5] && pieces[2] === pieces[8] && pieces[2]) {
      _whoWon();
      winWindow.style.visibility = "visible";
    } else if(pieces[0] === pieces[4] && pieces[0] === pieces[8] && pieces[0]) {
      _whoWon();
      winWindow.style.visibility = "visible";
    } else if(pieces[2] === pieces[4] && pieces[2] === pieces[6] && pieces[2]) {
      _whoWon();
      winWindow.style.visibility = "visible";
    }
  };

  btnClear.addEventListener("click", function() {
    gameBoard.clearBoard();
    gameBoard.drawBoard();
  });

  btnPlayAgain.addEventListener("click", function() {
    const winWindow = document.querySelector(".winner-window")

    gameBoard.clearBoard();
    gameBoard.drawBoard();
    winWindow.style.visibility = "hidden";
  });

  return {
    checkWinCondition
  };
})();