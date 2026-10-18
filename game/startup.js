"use strict";

// ──────────────────────────────────────────────────────────────
//  Startup
// ──────────────────────────────────────────────────────────────

function startGame(initializedMaze) {
  currentMazeInstance = initializedMaze;
  playerGridCoordinateX = initializedMaze.startPoint.x;
  playerGridCoordinateY = initializedMaze.startPoint.y;
  currentPlayerEmoji = EMOJI_IDLE_STANDING;
  isPlayerMoving = false;
  lastMoveTimestamp = 0;
  lastInputTimestamp = performance.now();

  // Size the canvas to fit the maze while staying within viewport bounds
  updateCanvasSize();

  // Pre-render static maze texture
  buildMazeTexture(initializedMaze);

  // Show game UI
  loadingScreenElement.classList.add('hidden');
  setTimeout(() => { loadingScreenElement.style.display = 'none'; }, 450);
  canvasWrapperElement.style.display = 'block';

  // Input listeners
  window.addEventListener('keydown', (keyboardEvent) => {
    if (isGameWon) {
      if (keyboardEvent.key === 'Enter') location.reload();
      return;
    }
    if (KEY_TO_MOVEMENT_DELTA[keyboardEvent.key]) {
      keyboardEvent.preventDefault();
      currentlyHeldKeys.add(keyboardEvent.key);
      lastInputTimestamp = performance.now();

      // Before moving, the character changes to 🚶‍➡️ for right/down, or 🚶 for left/up
      const [deltaX, deltaY] = KEY_TO_MOVEMENT_DELTA[keyboardEvent.key];
      if (deltaX > 0 || deltaY > 0) {
        currentPlayerEmoji = EMOJI_WALKING_RIGHT;
      } else if (deltaX < 0 || deltaY < 0) {
        currentPlayerEmoji = EMOJI_WALKING_LEFT;
      }
    }
  });
  window.addEventListener('keyup', (keyboardEvent) => currentlyHeldKeys.delete(keyboardEvent.key));

  // Play Again
  playAgainButtonElement.addEventListener('click', () => location.reload());

  // Start render loop
  animationFrameRequestId = requestAnimationFrame(gameLoop);
}
