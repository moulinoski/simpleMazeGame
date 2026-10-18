"use strict";

/**
 * Abstract cell type for floor and walls
 */
class Cell {
  constructor() {
    if (new.target === Cell) throw new Error("Cell is abstract");
    /** @type {string} */ this.character;
    /** @type {boolean} */ this.passable;
  }
}
