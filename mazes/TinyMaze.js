"use strict";

/**
 * TinyMaze — 15 × 15 character grid.
 */
class TinyMaze extends Maze {
  constructor() {
    super();
    this.width = 15;
    this.height = 15;
    this.startPoint = { x: 0, y: 0 };
    this.goalPoint = { x: 0, y: 0 };
    this.impassable = new BasicImpassable();
    this.passable = new BasicPassable();
    this.mazeArrayRepresentation = [];
  }
}
