"use strict";

/**
 * Static generator.  Uses iterative randomised DFS (recursive backtracker)
 * to carve a perfect maze on the cell grid, then opens one edge cell as the
 * goal.  startPoint is a random interior cell centre.
 *
 * Generates repeatedly (using MazeSolver) until a solvable maze is found.
 *
 * @param {Maze} maze             – maze object (mutated in place)
 * @param {(progressRatio:number)=>void} [progressCallback]
 * @returns {Maze}
 */
class MazeGenerator {
  static generate(maze, progressCallback) {
    const { width: mazeWidth, height: mazeHeight } = maze;

    // Perfect-maze DFS works on a "cell" grid of size cellGridWidth × cellGridHeight
    // where each cell maps to pixel (cellCoordinateX*2+1, cellCoordinateY*2+1),
    // walls are the even-indexed rows/cols.
    const cellGridWidth = Math.floor((mazeWidth - 1) / 2);
    const cellGridHeight = Math.floor((mazeHeight - 1) / 2);

    // Flat Uint8Array: 1 = passable, 0 = wall
    const flatPassableGrid = new Uint8Array(mazeWidth * mazeHeight); // all walls initially

    const setPassableCell = (pixelCoordinateX, pixelCoordinateY) => {
      flatPassableGrid[pixelCoordinateY * mazeWidth + pixelCoordinateX] = 1;
    };

    const getCellPixelX = (cellCoordinateX) => cellCoordinateX * 2 + 1;
    const getCellPixelY = (cellCoordinateY) => cellCoordinateY * 2 + 1;

    // Open a cell centre and the wall between two adjacent cells
    const openCellCenter = (cellCoordinateX, cellCoordinateY) => {
      setPassableCell(getCellPixelX(cellCoordinateX), getCellPixelY(cellCoordinateY));
    };
    const openConnectingWall = (firstCellX, firstCellY, secondCellX, secondCellY) => {
      // Wall pixel sits exactly between the two cell pixels
      setPassableCell(
        getCellPixelX(firstCellX) + (secondCellX - firstCellX),
        getCellPixelY(firstCellY) + (secondCellY - firstCellY)
      );
    };

    // DFS stack — use a typed array for speed
    const coordinateStack = new Int32Array(cellGridWidth * cellGridHeight * 2);
    let stackTopPointer = 0;
    const pushCellCoordinates = (cellCoordinateX, cellCoordinateY) => {
      coordinateStack[stackTopPointer++] = cellCoordinateX;
      coordinateStack[stackTopPointer++] = cellCoordinateY;
    };
    const popCellY = () => coordinateStack[--stackTopPointer];
    const popCellX = () => coordinateStack[--stackTopPointer];
    const peekCellY = () => coordinateStack[stackTopPointer - 1];
    const peekCellX = () => coordinateStack[stackTopPointer - 2];

    const visitedCellGrid = new Uint8Array(cellGridWidth * cellGridHeight);
    const getVisitedCellIndex = (cellCoordinateX, cellCoordinateY) => {
      return cellCoordinateY * cellGridWidth + cellCoordinateX;
    };

    // Random starting cell
    const initialCellX = (Math.random() * cellGridWidth) | 0;
    const initialCellY = (Math.random() * cellGridHeight) | 0;
    visitedCellGrid[getVisitedCellIndex(initialCellX, initialCellY)] = 1;
    openCellCenter(initialCellX, initialCellY);
    pushCellCoordinates(initialCellX, initialCellY);

    const CARDINAL_DIRECTIONS = [[0, -1], [0, 1], [-1, 0], [1, 0]];
    const totalCellCount = cellGridWidth * cellGridHeight;
    let carvedCellCount = 1;

    // Direction shuffle (Fisher-Yates on a length-4 array)
    const directionIndices = [0, 1, 2, 3];
    const shuffleDirectionIndices = () => {
      for (let currentIndex = 3; currentIndex > 0; currentIndex--) {
        const randomIndex = (Math.random() * (currentIndex + 1)) | 0;
        const temporaryDirection = directionIndices[currentIndex];
        directionIndices[currentIndex] = directionIndices[randomIndex];
        directionIndices[randomIndex] = temporaryDirection;
      }
    };

    while (stackTopPointer > 0) {
      const currentCellX = peekCellX();
      const currentCellY = peekCellY();
      shuffleDirectionIndices();
      let hasMovedToUnvisitedNeighbor = false;
      for (let directionIndex = 0; directionIndex < 4; directionIndex++) {
        const [deltaX, deltaY] = CARDINAL_DIRECTIONS[directionIndices[directionIndex]];
        const neighborCellX = currentCellX + deltaX;
        const neighborCellY = currentCellY + deltaY;
        if (
          neighborCellX < 0 ||
          neighborCellY < 0 ||
          neighborCellX >= cellGridWidth ||
          neighborCellY >= cellGridHeight
        ) {
          continue;
        }
        if (visitedCellGrid[getVisitedCellIndex(neighborCellX, neighborCellY)]) {
          continue;
        }
        visitedCellGrid[getVisitedCellIndex(neighborCellX, neighborCellY)] = 1;
        openCellCenter(neighborCellX, neighborCellY);
        openConnectingWall(currentCellX, currentCellY, neighborCellX, neighborCellY);
        pushCellCoordinates(neighborCellX, neighborCellY);
        carvedCellCount++;
        hasMovedToUnvisitedNeighbor = true;
        break;
      }
      if (!hasMovedToUnvisitedNeighbor) {
        popCellY();
        popCellX();
      }

      if (progressCallback && (carvedCellCount & 0x1ff) === 0) {
        progressCallback(Math.min(0.88, carvedCellCount / totalCellCount));
      }
    }

    // ── Place startPoint: random interior cell centre ──────────
    const startCellX = (Math.random() * cellGridWidth) | 0;
    const startCellY = (Math.random() * cellGridHeight) | 0;
    maze.startPoint = { x: getCellPixelX(startCellX), y: getCellPixelY(startCellY) };

    // ── Place goalPoint on a random edge ──────────────────────
    // Choose edge; open the outermost border pixel adjacent to a cell.
    const selectedEdgeIndex = (Math.random() * 4) | 0;
    let goalPixelCoordinateX, goalPixelCoordinateY;

    if (selectedEdgeIndex === 0) {          // top edge
      const goalCellX = (Math.random() * cellGridWidth) | 0;
      goalPixelCoordinateX = getCellPixelX(goalCellX);
      goalPixelCoordinateY = 0;
      flatPassableGrid[0 * mazeWidth + goalPixelCoordinateX] = 1;
      // ensure the cell just below is also open (it should be, but be safe)
      flatPassableGrid[1 * mazeWidth + goalPixelCoordinateX] = 1;
    } else if (selectedEdgeIndex === 1) {   // bottom edge
      const goalCellX = (Math.random() * cellGridWidth) | 0;
      goalPixelCoordinateX = getCellPixelX(goalCellX);
      goalPixelCoordinateY = mazeHeight - 1;
      flatPassableGrid[(mazeHeight - 1) * mazeWidth + goalPixelCoordinateX] = 1;
      flatPassableGrid[(mazeHeight - 2) * mazeWidth + goalPixelCoordinateX] = 1;
    } else if (selectedEdgeIndex === 2) {   // left edge
      const goalCellY = (Math.random() * cellGridHeight) | 0;
      goalPixelCoordinateX = 0;
      goalPixelCoordinateY = getCellPixelY(goalCellY);
      flatPassableGrid[goalPixelCoordinateY * mazeWidth + 0] = 1;
      flatPassableGrid[goalPixelCoordinateY * mazeWidth + 1] = 1;
    } else {                                // right edge
      const goalCellY = (Math.random() * cellGridHeight) | 0;
      goalPixelCoordinateX = mazeWidth - 1;
      goalPixelCoordinateY = getCellPixelY(goalCellY);
      flatPassableGrid[goalPixelCoordinateY * mazeWidth + (mazeWidth - 1)] = 1;
      flatPassableGrid[goalPixelCoordinateY * mazeWidth + (mazeWidth - 2)] = 1;
    }

    maze.goalPoint = { x: goalPixelCoordinateX, y: goalPixelCoordinateY };

    // Convert flat array to boolean[][] for mazeArrayRepresentation
    const gridRepresentation = [];
    for (let rowIndexY = 0; rowIndexY < mazeHeight; rowIndexY++) {
      const rowPassableValues = [];
      for (let columnIndexX = 0; columnIndexX < mazeWidth; columnIndexX++) {
        rowPassableValues.push(flatPassableGrid[rowIndexY * mazeWidth + columnIndexX] === 1);
      }
      gridRepresentation.push(rowPassableValues);
    }
    maze.mazeArrayRepresentation = gridRepresentation;

    if (progressCallback) progressCallback(1.0);
    return maze;
  }
}
