"use strict";

/**
 * GiantMaze — 300 × 300 character grid.
 */
class GiantMaze extends Maze {
  constructor() {
    super();
    this.width = 300;
    this.height = 300;
    this.startPoint = { x: 0, y: 0 };
    this.goalPoint = { x: 0, y: 0 };
    this.impassable = new VolcanoImpassable();
    this.passable = new BasicPassable();
    this.mazeArrayRepresentation = [];
    this.goalEmoji = "🚀";
    this.backgroundColor = "#a81515ff";
    this.wallColor = "#3c3737ff";
  }
}
