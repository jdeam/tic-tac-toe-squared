let gameBoard = (function() {
  let result = [];
  for (i=0; i<9; i++) {
    result.push((function() {
      let result = [];
      for (j=0; j<9; j++) {
        result.push('');
      }
      return result;
    })());
  }
  return result;
})();

let largeCells = document.querySelectorAll('.large-cell');
largeCells.forEach(function(cell, i) {
  cell.largeIndex = i;
});

let smallCells = document.querySelectorAll('.small-cell');
smallCells.forEach(function(cell, i) {
  cell.smallIndex = i%9;
  cell.classList.add('active');
});

let turnCount = 0;
function whoseTurn(turnCount) {return turnCount%2?'O':'X' }

function printBoard(board, i) {
  let winner = checkForWin(board);
  if (winner) {
    gameBoard[i] = winner;
  }
  if (!Array.isArray(gameBoard[i])) {
    while (largeCells[i].firstChild) {
      largeCells[i].removeChild(largeCells[i].firstChild);
    }
    largeCells[i].innerText = gameBoard[i];
  } else {
    board.forEach(function(cell, j) {
      largeCells[i].querySelectorAll('.small-cell')[j].innerText = board[j];
    });
  }
}

function activateCells(i) {
  smallCells.forEach(cell => cell.classList.remove('active'));
  if (!Array.isArray(gameBoard[i])) {
    smallCells.forEach(cell => cell.classList.add('active'));
  }
  largeCells[i].querySelectorAll('.small-cell').forEach(cell => cell.classList.add('active'));
}

function takeTurn(event) {
  let tar = event.target;
  if (tar.classList.contains('gameboard')) { return; }
  if (tar.classList.contains('large-cell')) { return; }
  if (tar.classList.contains('small-gameboard')) { return; }
  if (!tar.classList.contains('active')) { return; }

  let largeIndex = tar.parentNode.parentNode.largeIndex;
  let smallIndex = tar.smallIndex;

  if (!gameBoard[largeIndex][smallIndex]) {
    gameBoard[largeIndex][smallIndex] = whoseTurn(turnCount);
    printBoard(gameBoard[largeIndex], largeIndex);
    let winner = checkForWin(gameBoard);
    if (winner) {
      document.querySelector('#winner').innerText = `winner = ${winner}`;
      smallCells.forEach(cell => cell.classList.remove('active'));
      return;
    }
    activateCells(smallIndex);
    turnCount++;
  }
}

function addShadow(event) {
  let tar = event.target;
  let largeIndex = tar.parentNode.parentNode.largeIndex;
  let smallIndex = tar.smallIndex;

  if (tar.classList.contains('gameboard')) { return; }
  if (tar.classList.contains('large-cell')) { return; }
  if (tar.classList.contains('small-gameboard')) { return; }
  if (gameBoard[largeIndex][smallIndex]) { return; }

  if (tar.classList.contains('active')) {
    event.target.innerText = whoseTurn(turnCount);
  }
}

function removeShadow(event) {
  let tar = event.target;
  let largeIndex = tar.parentNode.parentNode.largeIndex;
  let smallIndex = tar.smallIndex;

  if (tar.classList.contains('gameboard')) { return; }
  if (tar.classList.contains('large-cell')) { return; }
  if (tar.classList.contains('small-gameboard')) { return; }
  if (gameBoard[largeIndex][smallIndex]) { return; }

  event.target.innerText = '';
}

function checkForWin(gb) {
  if (gb[0]===gb[1]&&gb[1]===gb[2]&&gb[1]) { return gb[1]; }
  if (gb[3]===gb[4]&&gb[4]===gb[5]&&gb[4]) { return gb[4]; }
  if (gb[6]===gb[7]&&gb[7]===gb[8]&&gb[7]) { return gb[7]; }
  if (gb[0]===gb[3]&&gb[3]===gb[6]&&gb[3]) { return gb[3]; }
  if (gb[1]===gb[4]&&gb[4]===gb[7]&&gb[4]) { return gb[4]; }
  if (gb[2]===gb[5]&&gb[5]===gb[8]&&gb[5]) { return gb[5]; }
  if (gb[0]===gb[4]&&gb[4]===gb[8]&&gb[4]) { return gb[4]; }
  if (gb[2]===gb[4]&&gb[4]===gb[6]&&gb[4]) { return gb[4]; }
  return false;
}

document.addEventListener('DOMContentLoaded', function() {
  let gameArea = document.querySelector('.gameboard');
  gameArea.addEventListener('click', takeTurn);
  gameArea.addEventListener('mouseenter', addShadow, true);
  gameArea.addEventListener('mouseleave', removeShadow, true);
});
