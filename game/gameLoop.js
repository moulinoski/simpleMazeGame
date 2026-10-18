"use strict";

// ──────────────────────────────────────────────────────────────
//  Game loop
// ──────────────────────────────────────────────────────────────

function gameLoop(currentFrameTimestamp) {
  if (!lastInputTimestamp) {
    lastInputTimestamp = currentFrameTimestamp;
  }

  if (!isGameWon) {
    // Priority order for simultaneous keys
    const keyPriorityOrder = [
      'ArrowUp', 'w', 'W',
      'ArrowDown', 's', 'S',
      'ArrowLeft', 'a', 'A',
      'ArrowRight', 'd', 'D',
    ];

    let activeInputKey = null;
    for (const candidateKey of keyPriorityOrder) {
      if (currentlyHeldKeys.has(candidateKey)) {
        activeInputKey = candidateKey;
        break;
      }
    }

    if (activeInputKey) {
      lastInputTimestamp = currentFrameTimestamp;

      if (currentFrameTimestamp - lastMoveTimestamp >= MOVE_INTERVAL_MILLISECONDS) {
        const [deltaX, deltaY] = KEY_TO_MOVEMENT_DELTA[activeInputKey];

        // Change character before moving: 🚶‍➡️ for right/down, 🚶 for left/up
        if (deltaX > 0 || deltaY > 0) {
          currentPlayerEmoji = EMOJI_WALKING_RIGHT;
        } else if (deltaX < 0 || deltaY < 0) {
          currentPlayerEmoji = EMOJI_WALKING_LEFT;
        }

        const nextPlayerPositionX = playerGridCoordinateX + deltaX;
        const nextPlayerPositionY = playerGridCoordinateY + deltaY;
        const mazeGridRepresentation = currentMazeInstance.mazeArrayRepresentation;
        if (
          nextPlayerPositionX >= 0 &&
          nextPlayerPositionY >= 0 &&
          nextPlayerPositionX < currentMazeInstance.width &&
          nextPlayerPositionY < currentMazeInstance.height &&
          mazeGridRepresentation[nextPlayerPositionY][nextPlayerPositionX]
        ) {
          playerGridCoordinateX = nextPlayerPositionX;
          playerGridCoordinateY = nextPlayerPositionY;
        }

        lastMoveTimestamp = currentFrameTimestamp;
        isPlayerMoving = true;
      }
    } else {
      // No input registered currently
      if (isPlayerMoving && currentFrameTimestamp - lastMoveTimestamp >= MOVE_INTERVAL_MILLISECONDS) {
        // When no input is registered during the next cycle, change to 🧍
        currentPlayerEmoji = EMOJI_IDLE_STANDING;
        isPlayerMoving = false;
      } else if (!isPlayerMoving && currentFrameTimestamp - lastInputTimestamp >= 2000) {
        // If no input is registered after 2 seconds, change to 🛌 until the user makes a move
        currentPlayerEmoji = EMOJI_IDLE_SLEEPING;
      }
    }
  }

  drawViewport(
    mainCanvasContext,
    mazeCanvasElement.width,
    mazeCanvasElement.height,
    currentMazeInstance,
    playerGridCoordinateX,
    playerGridCoordinateY
  );

  if (
    !isGameWon &&
    playerGridCoordinateX === currentMazeInstance.goalPoint.x &&
    playerGridCoordinateY === currentMazeInstance.goalPoint.y
  ) {
    isGameWon = true;
    currentlyHeldKeys.clear();
    winOverlayElement.classList.add('visible');
  }

  animationFrameRequestId = requestAnimationFrame(gameLoop);
}

/**
 * Dynamically update canvas dimensions to fit the maze while keeping it within screen bounds.
 */
function updateCanvasSize() {
  if (!currentMazeInstance) return;
  const titleBarHeightAllowance = 50;
  const hintBarHeightAllowance = 35;
  const windowPaddingMargin = 20;
  const maxAvailableWidth = Math.max(60, window.innerWidth - windowPaddingMargin * 2);
  const maxAvailableHeight = Math.max(60, window.innerHeight - (titleBarHeightAllowance + hintBarHeightAllowance) * 2);

  const totalMazePixelWidth = currentMazeInstance.width * CELL_SIZE_IN_PIXELS;
  const totalMazePixelHeight = currentMazeInstance.height * CELL_SIZE_IN_PIXELS;

  if (currentMazeInstance.width === currentMazeInstance.height) {
    const maxSquareDimension = Math.min(maxAvailableWidth, maxAvailableHeight);
    mazeCanvasElement.width = Math.min(totalMazePixelWidth, maxSquareDimension);
    mazeCanvasElement.height = Math.min(totalMazePixelHeight, maxSquareDimension);
  } else {
    mazeCanvasElement.width = Math.min(totalMazePixelWidth, maxAvailableWidth);
    mazeCanvasElement.height = Math.min(totalMazePixelHeight, maxAvailableHeight);
  }
}

window.addEventListener('resize', () => {
  updateCanvasSize();
  if (currentMazeInstance && !isGameWon) {
    drawViewport(
      mainCanvasContext,
      mazeCanvasElement.width,
      mazeCanvasElement.height,
      currentMazeInstance,
      playerGridCoordinateX,
      playerGridCoordinateY
    );
  }
});
