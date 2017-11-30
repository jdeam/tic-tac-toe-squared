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
});

let turnCount = 0;

function whoseTurn(turnCount) {
  if (turnCount%2) {
    return 'O';
  }
  return 'X';
}

function printBoard(board, i) {
  let winner = checkForWin(board);
  if (winner) {
    board = winner;
  }
  if (!Array.isArray(board)) {
    largeCells[i].innerText = board;
  }
  board.forEach(function(cell, j) {
    largeCells[i].querySelectorAll('.small-cell')[j].innerText = board[j];
    largeCells[i].querySelectorAll('.small-cell')[j].style.color = 'black';
  });
}

function takeTurn(event) {
  let tar = event.target;
  if (tar.classList.contains('gameboard')) { return };
  if (tar.classList.contains('large-cell')) { return };
  if (tar.classList.contains('small-gameboard')) { return };

  let largeIndex = tar.parentNode.parentNode.largeIndex;
  let smallIndex = tar.smallIndex;

  if (!gameBoard[largeIndex][smallIndex]) {
    gameBoard[largeIndex][smallIndex] = whoseTurn(turnCount);
    printBoard(gameBoard[largeIndex], largeIndex);
    turnCount++;
  }
}

function addShadow(event) {
  let tar = event.target;
  if (tar.classList.contains('gameboard')) { return };
  if (tar.classList.contains('large-cell')) { return };
  if (tar.classList.contains('small-gameboard')) { return };

  let largeIndex = tar.parentNode.parentNode.largeIndex;
  let smallIndex = tar.smallIndex;

  if (gameBoard[largeIndex][smallIndex]) {
    return;
  }
  event.target.style.color = 'lightgray';
  event.target.innerText = whoseTurn(turnCount);
}

function removeShadow(event) {
  let tar = event.target;
  if (tar.classList.contains('gameboard')) { return };
  if (tar.classList.contains('large-cell')) { return };
  if (tar.classList.contains('small-gameboard')) { return };

  let largeIndex = tar.parentNode.parentNode.largeIndex;
  let smallIndex = tar.smallIndex;

  if (gameBoard[largeIndex][smallIndex]) {
    return;
  }
  event.target.style.color = 'black';
  event.target.innerText = '';
}

function checkForWin(gb) {
  if (gb[0]===gb[1]&&gb[1]===gb[2]&&gb[1]!=='') {
    return gb[1];
  }
  if (gb[3]===gb[4]&&gb[4]===gb[5]&&gb[4]!=='') {
    return gb[4];
  }
  if (gb[6]===gb[7]&&gb[7]===gb[8]&&gb[7]!=='') {
    return gb[7];
  }
  if (gb[0]===gb[3]&&gb[3]===gb[6]&&gb[3]!=='') {
    return gb[3];
  }
  if (gb[1]===gb[4]&&gb[4]===gb[7]&&gb[4]!=='') {
    return gb[4];
  }
  if (gb[2]===gb[5]&&gb[5]===gb[8]&&gb[5]!=='') {
    return gb[5];
  }
  if (gb[0]===gb[4]&&gb[4]===gb[8]&&gb[4]!=='') {
    return gb[4];
  }
  if (gb[2]===gb[4]&&gb[4]===gb[6]&&gb[4]!=='') {
    return gb[4];
  }
  return false;
}

document.addEventListener('DOMContentLoaded', function() {
  let playArea = document.querySelector('.gameboard');
  playArea.addEventListener('click', takeTurn);
  playArea.addEventListener('mouseenter', addShadow, true);
  playArea.addEventListener('mouseleave', removeShadow, true);
});
