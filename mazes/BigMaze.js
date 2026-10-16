"use strict";

/**
 * BigMaze — 100 × 100 character grid.
 */
class BigMaze extends Maze {
  constructor() {
    super();
    this.width = 100;
    this.height = 100;
    this.startPoint = { x: 0, y: 0 };
    this.goalPoint = { x: 0, y: 0 };
    this.impassable = new BasicImpassable();
    this.passable = new BasicPassable();
    this.mazeArrayRepresentation = [];
  }
}
