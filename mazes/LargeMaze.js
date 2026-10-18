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
    this.impassable = new StoneImpassable();
    this.passable = new BasicPassable();
    this.mazeArrayRepresentation = [];
    this.goalEmoji = "💎";
    this.backgroundColor = "#3b3657ff";
  }
}
