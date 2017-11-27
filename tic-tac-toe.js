function ticTacToe() {
  let gameBoard = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
  let turnCount = 0;
  let winner = false;

  function printBoard() {
    console.log(`${gameBoard[0]}|${gameBoard[1]}|${gameBoard[2]}`);
    console.log('-----');
    console.log(`${gameBoard[3]}|${gameBoard[4]}|${gameBoard[5]}`);
    console.log('-----');
    console.log(`${gameBoard[6]}|${gameBoard[7]}|${gameBoard[8]}`);
  }

  function checkForWin() {
    if (gameBoard[0]===gameBoard[1]&&gameBoard[1]===gameBoard[2]) {
      return gameBoard[0];
    }
    if (gameBoard[3]===gameBoard[4]&&gameBoard[4]===gameBoard[5]) {
      return gameBoard[3];
    }
    if (gameBoard[6]===gameBoard[7]&&gameBoard[7]===gameBoard[8]) {
      return gameBoard[6];
    }
    if (gameBoard[0]===gameBoard[3]&&gameBoard[3]===gameBoard[6]) {
      return gameBoard[0];
    }
    if (gameBoard[1]===gameBoard[4]&&gameBoard[4]===gameBoard[7]) {
      return gameBoard[1];
    }
    if (gameBoard[2]===gameBoard[5]&&gameBoard[5]===gameBoard[8]) {
      return gameBoard[2];
    }
    if (gameBoard[0]===gameBoard[4]&&gameBoard[4]===gameBoard[8]) {
      return gameBoard[0];
    }
    if (gameBoard[2]===gameBoard[4]&&gameBoard[4]===gameBoard[6]) {
      return gameBoard[2];
    }
    return false;
  }

  function getPlayerInput(player) {
    let input;
    let inputNotReceived = true;
    while (inputNotReceived) {
      input = prompt(`${player}'s turn - which tile?`);
      if (gameBoard.includes(input)&&input!=='X'&&input!=='O') {
        inputNotReceived = false;
      } else {
        alert('Not a valid input.')
      }
    }
    gameBoard[input] = player;
  }

  function pickPlayer() {
    if (turnCount%2) {
      return 'O';
    } else {
      return 'X';
    }
  }

  while (winner==false&&turnCount<9) {
    printBoard();
    getPlayerInput(pickPlayer());
    winner = checkForWin();
    turnCount++;
  }

  printBoard();

  if (winner) {
    console.log(`${winner} wins!`);
  } else {
    console.log('Draw!');
  }
}
