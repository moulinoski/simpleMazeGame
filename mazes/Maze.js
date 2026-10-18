"use strict";

/**
 * Abstract Maze.  Holds the grid dimensions, cell type instances,
 * start/goal coordinates, and the generated array representation.
 */
class Maze {
  constructor() {
    if (new.target === Maze) throw new Error("Maze is abstract");
    /** @type {number}              */ this.width = 0;
    /** @type {number}              */ this.height = 0;
    /** @type {{x:number,y:number}} */ this.startPoint = { x: 0, y: 0 };
    /** @type {{x:number,y:number}} */ this.goalPoint = { x: 0, y: 0 };
    /** @type {Impassable}          */ this.impassable = null;
    /** @type {Passable}            */ this.passable = null;
    // true = passable floor, false = impassable wall
    /** @type {boolean[][]}         */ this.mazeArrayRepresentation = [];
    /** @type {string}              */ this.goalEmoji = "✨";
    /** @type {string}              */ this.backgroundColor = "#0e0e12";
    /** @type {string}              */ this.wallColor = "#1e1e2e";
    /** @type {string}              */ this.goalColor = "#fce300";
  }
}
