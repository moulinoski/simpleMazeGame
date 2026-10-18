"use strict";

/**
 * MediumMaze — 50 × 50 character grid.
 */
class MediumMaze extends Maze {
  constructor() {
    super();
    this.width = 50;
    this.height = 50;
    this.startPoint = { x: 0, y: 0 };
    this.goalPoint = { x: 0, y: 0 };
    this.impassable = new TreeImpassable();
    this.passable = new BasicPassable();
    this.mazeArrayRepresentation = [];
    this.goalEmoji = "🏡";
    this.backgroundColor = "#074405ff";
  }
}
