"use strict";

// ──────────────────────────────────────────────────────────────
//  Renderer
// ──────────────────────────────────────────────────────────────

// Pixel size of each maze cell on the canvas
const CELL_SIZE_IN_PIXELS = 50;

// Pre-built off-screen canvas for the static maze (walls + floor)
let offscreenMazeCanvas = null;

/**
 * Build (or rebuild) the static maze image onto an OffscreenCanvas / normal Canvas.
 * @param {Maze} targetMaze
 */
function buildMazeTexture(targetMaze) {
    const mazeWidth = targetMaze.width;
    const mazeHeight = targetMaze.height;
    const offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = mazeWidth * CELL_SIZE_IN_PIXELS;
    offscreenCanvas.height = mazeHeight * CELL_SIZE_IN_PIXELS;
    const offscreenRenderingContext = offscreenCanvas.getContext('2d');

    // Fill everything as floor first
    offscreenRenderingContext.fillStyle = targetMaze.backgroundColor;
    offscreenRenderingContext.fillRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);

    // Draw walls
    offscreenRenderingContext.fillStyle = targetMaze.wallColor;
    const mazeGridRepresentation = targetMaze.mazeArrayRepresentation;
    for (let cellRowY = 0; cellRowY < mazeHeight; cellRowY++) {
        for (let cellColumnX = 0; cellColumnX < mazeWidth; cellColumnX++) {
            if (!mazeGridRepresentation[cellRowY][cellColumnX]) {
                offscreenRenderingContext.fillRect(
                    cellColumnX * CELL_SIZE_IN_PIXELS,
                    cellRowY * CELL_SIZE_IN_PIXELS,
                    CELL_SIZE_IN_PIXELS,
                    CELL_SIZE_IN_PIXELS
                );
            }
        }
    }

    // Goal highlight
    const goalCoordinateX = targetMaze.goalPoint.x;
    const goalCoordinateY = targetMaze.goalPoint.y;
    offscreenRenderingContext.fillStyle = targetMaze.goalColor;
    offscreenRenderingContext.fillRect(
        goalCoordinateX * CELL_SIZE_IN_PIXELS - CELL_SIZE_IN_PIXELS,
        goalCoordinateY * CELL_SIZE_IN_PIXELS - CELL_SIZE_IN_PIXELS,
        1,
        1
    );

    offscreenMazeCanvas = offscreenCanvas;
}

/**
 * Draw the visible viewport onto the main canvas, centred on (playerGridX, playerGridY).
 * @param {CanvasRenderingContext2D} renderingContext
 * @param {number} viewportWidth  viewport width px
 * @param {number} viewportHeight viewport height px
 * @param {Maze}   activeMaze
 * @param {number} playerGridX    player position in maze grid units
 * @param {number} playerGridY
 */
function drawViewport(renderingContext, viewportWidth, viewportHeight, activeMaze, playerGridX, playerGridY) {
    const mazeWidth = activeMaze.width;
    const mazeHeight = activeMaze.height;
    const totalMazePixelWidth = mazeWidth * CELL_SIZE_IN_PIXELS;
    const totalMazePixelHeight = mazeHeight * CELL_SIZE_IN_PIXELS;

    // Clear viewport background
    renderingContext.fillStyle = activeMaze.backgroundColor;
    renderingContext.fillRect(0, 0, viewportWidth, viewportHeight);

    let cameraOffsetX = 0;
    let cameraOffsetY = 0;
    let destinationOffsetX = 0;
    let destinationOffsetY = 0;
    let sourceCropWidth = viewportWidth;
    let sourceCropHeight = viewportHeight;

    if (totalMazePixelWidth <= viewportWidth) {
        // Maze is narrower than viewport: center it horizontally
        cameraOffsetX = 0;
        destinationOffsetX = Math.floor((viewportWidth - totalMazePixelWidth) / 2);
        sourceCropWidth = totalMazePixelWidth;
    } else {
        // Maze is wider than viewport: scroll camera to track player
        cameraOffsetX = playerGridX * CELL_SIZE_IN_PIXELS + CELL_SIZE_IN_PIXELS / 2 - viewportWidth / 2;
        cameraOffsetX = Math.max(0, Math.min(totalMazePixelWidth - viewportWidth, cameraOffsetX));
        destinationOffsetX = 0;
        sourceCropWidth = viewportWidth;
    }

    if (totalMazePixelHeight <= viewportHeight) {
        // Maze is shorter than viewport: center it vertically
        cameraOffsetY = 0;
        destinationOffsetY = Math.floor((viewportHeight - totalMazePixelHeight) / 2);
        sourceCropHeight = totalMazePixelHeight;
    } else {
        // Maze is taller than viewport: scroll camera to track player
        cameraOffsetY = playerGridY * CELL_SIZE_IN_PIXELS + CELL_SIZE_IN_PIXELS / 2 - viewportHeight / 2;
        cameraOffsetY = Math.max(0, Math.min(totalMazePixelHeight - viewportHeight, cameraOffsetY));
        destinationOffsetY = 0;
        sourceCropHeight = viewportHeight;
    }

    // Blit static maze texture
    renderingContext.drawImage(
        offscreenMazeCanvas,
        cameraOffsetX, cameraOffsetY, sourceCropWidth, sourceCropHeight,
        destinationOffsetX, destinationOffsetY, sourceCropWidth, sourceCropHeight
    );

    const renderEmojiAtGridPosition = (gridCoordinateX, gridCoordinateY, emojiCharacter) => {
        const screenPositionX = gridCoordinateX * CELL_SIZE_IN_PIXELS - cameraOffsetX + destinationOffsetX + CELL_SIZE_IN_PIXELS / 2;
        const screenPositionY = gridCoordinateY * CELL_SIZE_IN_PIXELS - cameraOffsetY + destinationOffsetY + CELL_SIZE_IN_PIXELS / 2;
        renderingContext.font = `${CELL_SIZE_IN_PIXELS * 1.35}px serif`;
        renderingContext.textAlign = 'center';
        renderingContext.textBaseline = 'middle';
        renderingContext.fillText(emojiCharacter, screenPositionX, screenPositionY);
    };

    // Goal emoji
    renderEmojiAtGridPosition(activeMaze.goalPoint.x, activeMaze.goalPoint.y, activeMaze.goalEmoji);

    // Player emoji
    renderEmojiAtGridPosition(playerGridX, playerGridY, currentPlayerEmoji);
}