"use strict";

/**
 * SmallMaze — 25 × 25 character grid.
 */
class SmallMaze extends Maze {
  constructor() {
    super();
    this.width = 25;
    this.height = 25;
    this.startPoint = { x: 0, y: 0 };
    this.goalPoint = { x: 0, y: 0 };
    this.impassable = new BasicImpassable();
    this.passable = new BasicPassable();
    this.mazeArrayRepresentation = [];
  }
}
