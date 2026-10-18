"use strict";

/**
 * Static solver that validates reachability from startPoint → goalPoint
 * using iterative BFS on maze.mazeArrayRepresentation.
 */
class MazeSolver {
  /**
   * @param {Maze} mazeToSolve
   * @returns {boolean}  true if goal is reachable from start
   */
  static solve(mazeToSolve) {
    const {
      width: mazeWidth,
      height: mazeHeight,
      startPoint: startingPoint,
      goalPoint: targetGoalPoint,
      mazeArrayRepresentation: gridRepresentation,
    } = mazeToSolve;

    if (!gridRepresentation || gridRepresentation.length === 0) return false;

    // Fast flat visited array
    const visitedCoordinatesGrid = new Uint8Array(mazeWidth * mazeHeight);
    const bfsCoordinateQueue = new Int32Array(mazeWidth * mazeHeight * 2); // [x0, y0, x1, y1, …]
    let queueHeadIndex = 0, queueTailIndex = 0;

    const enqueueCoordinate = (coordinateX, coordinateY) => {
      bfsCoordinateQueue[queueTailIndex++] = coordinateX;
      bfsCoordinateQueue[queueTailIndex++] = coordinateY;
    };
    const dequeueCoordinateX = () => bfsCoordinateQueue[queueHeadIndex++];
    const dequeueCoordinateY = () => bfsCoordinateQueue[queueHeadIndex++];

    const markCoordinateVisited = (coordinateX, coordinateY) => {
      visitedCoordinatesGrid[coordinateY * mazeWidth + coordinateX] = 1;
    };
    const isCoordinateVisited = (coordinateX, coordinateY) => {
      return visitedCoordinatesGrid[coordinateY * mazeWidth + coordinateX];
    };

    if (!gridRepresentation[startingPoint.y]?.[startingPoint.x]) return false; // start is a wall
    markCoordinateVisited(startingPoint.x, startingPoint.y);
    enqueueCoordinate(startingPoint.x, startingPoint.y);

    while (queueHeadIndex < queueTailIndex) {
      const currentCoordinateX = dequeueCoordinateX();
      const currentCoordinateY = dequeueCoordinateY();
      if (currentCoordinateX === targetGoalPoint.x && currentCoordinateY === targetGoalPoint.y) {
        return true;
      }

      // 4-directional neighbours
      const neighborCoordinates = [
        currentCoordinateX, currentCoordinateY - 1,
        currentCoordinateX, currentCoordinateY + 1,
        currentCoordinateX - 1, currentCoordinateY,
        currentCoordinateX + 1, currentCoordinateY,
      ];
      for (let neighborIndex = 0; neighborIndex < 8; neighborIndex += 2) {
        const neighborX = neighborCoordinates[neighborIndex];
        const neighborY = neighborCoordinates[neighborIndex + 1];
        if (neighborX < 0 || neighborY < 0 || neighborX >= mazeWidth || neighborY >= mazeHeight) {
          continue;
        }
        if (isCoordinateVisited(neighborX, neighborY)) continue;
        if (!gridRepresentation[neighborY][neighborX]) continue;
        markCoordinateVisited(neighborX, neighborY);
        enqueueCoordinate(neighborX, neighborY);
      }
    }
    return false;
  }
}
