let singleGameBoard = ['', '', '', '', '', '', '', '', ''];
let gameBoard = (function() {
  let result = [];
  for (i=0; i<9; i++) {
    result.push(singleGameBoard);
  }
  return result;
})();

let gameCells = document.querySelectorAll('.large-cell');
gameCells.forEach(function(cell, i) {
  cell.gameIndex = i;
});
let turnCount = 0;

function whoseTurn(turnCount) {
  if (turnCount%2) {
    return 'O';
  }
  return 'X';
}

function printBoard(gameBoard) {
  gameBoard.forEach(function(cell, i) {
    if (gameCells[i].textContent) {
      gameCells[i].style.color = 'black';
      gameCells[i].textContent = cell;
    }
  });
}

function selectCell(event) {
  if (event.target.classList.contains('gameboard')) {
    return;
  }
  if (!gameBoard[event.target.gameIndex]) {
    gameBoard[event.target.gameIndex] = whoseTurn(turnCount);
    printBoard(gameBoard);
    if (checkForWin(gameBoard)) {
      document.querySelector('.gameboard').innerText = whoseTurn(turnCount);
    }
    turnCount++;
  }
}

function addShadow(event) {
  if (event.target === this) {
    return;
  }
  if (gameBoard[event.target.gameIndex]) {
    return;
  }
  event.target.style.color = 'whitesmoke';
  event.target.innerText = whoseTurn(turnCount);
}

function removeShadow(event) {
  if (event.target === this) {
    return;
  }
  if (gameBoard[event.target.gameIndex]) {
    return;
  }
  event.target.style.color = 'black';
  event.target.innerText = '';
}

function checkForWin(gb) {
  if (gb[0]===gb[1]&&gb[1]===gb[2]&&gb[1]!=='') {
    return true;
  }
  if (gb[3]===gb[4]&&gb[4]===gb[5]&&gb[4]!=='') {
    return true;
  }
  if (gb[6]===gb[7]&&gb[7]===gb[8]&&gb[7]!=='') {
    return true;
  }
  if (gb[0]===gb[3]&&gb[3]===gb[6]&&gb[3]!=='') {
    return true;
  }
  if (gb[1]===gb[4]&&gb[4]===gb[7]&&gb[4]!=='') {
    return true;
  }
  if (gb[2]===gb[5]&&gb[5]===gb[8]&&gb[5]!=='') {
    return true;
  }
  if (gb[0]===gb[4]&&gb[4]===gb[8]&&gb[4]!=='') {
    return true;
  }
  if (gb[2]===gb[4]&&gb[4]===gb[6]&&gb[4]!=='') {
    return true;
  }
  return false;
}

document.addEventListener('DOMContentLoaded', function() {
  let playArea = document.querySelector('.gameboard');
  playArea.addEventListener('click', selectCell);
  playArea.addEventListener('mouseenter', addShadow, true);
  playArea.addEventListener('mouseleave', removeShadow, true);
});
