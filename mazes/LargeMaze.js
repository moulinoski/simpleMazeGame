"use strict";

/**
 * LargeMaze — 200 × 200 character grid.
 */
class LargeMaze extends Maze {
  constructor() {
    super();
    this.width = 200;
    this.height = 200;
    this.startPoint = { x: 0, y: 0 };
    this.goalPoint = { x: 0, y: 0 };
    this.impassable = new BasicImpassable();
    this.passable = new BasicPassable();
    this.mazeArrayRepresentation = [];
  }
}
