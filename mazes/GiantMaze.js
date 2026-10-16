"use strict";

/**
 * GiantMaze — 500 × 500 character grid.
 */
class GiantMaze extends Maze {
  constructor() {
    super();
    this.width = 500;
    this.height = 500;
    this.startPoint = { x: 0, y: 0 };
    this.goalPoint = { x: 0, y: 0 };
    this.impassable = new BasicImpassable();
    this.passable = new BasicPassable();
    this.mazeArrayRepresentation = [];
  }
}
