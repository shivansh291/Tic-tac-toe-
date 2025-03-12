let currentPlayer = 'X';
let cells = document.querySelectorAll('.cell');
let message = document.getElementById('message');
let gameOver = false;
let timeout;
let timeLeft = 11;

function makeMove(index) {
  if (!gameOver && !cells[index].textContent) {
    cells[index].textContent = currentPlayer;
    clearTimeout(timeout);
    timeLeft = 11;
    updateTimer();
    timeout = setTimeout(() => {
      disqualifyPlayer(currentPlayer);
    }, 11000); // 11 seconds timeout
    if (checkWin()) {
      showWinAnimation(currentPlayer);
      gameOver = true;
      clearTimeout(timeout);
    } else if (checkDraw()) {
      showDrawAnimation();
      gameOver = true;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      message.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent;
  });
}

function checkDraw() {
  return [...cells].every(cell => cell.textContent);
}

function resetGame() {
  cells.forEach(cell => cell.textContent = '');
  message.textContent = '';
  gameOver = false;
  currentPlayer = 'X';
  clearTimeout(timeout);
  timeLeft = 11;
  updateTimer();
}

function disqualifyPlayer(player) {
  message.textContent = `Player ${player} took too long and is disqualified!`;
  gameOver = true;
}

function updateTimer() {
  const timerDisplay = document.getElementById('timer');
  timerDisplay.textContent = `Time left: ${timeLeft} seconds`;
  timeLeft--;
  if (timeLeft >= 0 && !gameOver) {
    setTimeout(updateTimer, 1000);
  }
}

function showWinAnimation(player) {
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  overlay.style.zIndex = 9999;

  const messageBox = document.createElement('div');
  messageBox.style.position = 'absolute';
  messageBox.style.top = '50%';
  messageBox.style.left = '50%';
  messageBox.style.transform = 'translate(-50%, -50%)';
  messageBox.style.backgroundColor = '#fff';
  messageBox.style.padding = '20px';
  messageBox.style.borderRadius = '10px';
  messageBox.textContent = `Player ${player} wins!`;
  messageBox.style.fontSize = '24px';
  messageBox.style.textAlign = 'center';

  overlay.appendChild(messageBox);
  document.body.appendChild(overlay);

  setTimeout(() => {
    overlay.remove();
    resetGame();
  }, 3000); // Remove overlay and reset game after 3 seconds
}

function showDrawAnimation() {
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  overlay.style.zIndex = 9999;

  const messageBox = document.createElement('div');
  messageBox.style.position = 'absolute';
  messageBox.style.top = '50%';
  messageBox.style.left = '50%';
  messageBox.style.transform = 'translate(-50%, -50%)';
  messageBox.style.backgroundColor = '#fff';
  messageBox.style.padding = '20px';
  messageBox.style.borderRadius = '10px';
  messageBox.textContent = "It's a draw!";
  messageBox.style.fontSize = '24px';
  messageBox.style.textAlign = 'center';

  overlay.appendChild(messageBox);
  document.body.appendChild(overlay);

  setTimeout(() => {
    overlay.remove();
    resetGame();
  }, 3000); // Remove overlay and reset game after 3 seconds
}
