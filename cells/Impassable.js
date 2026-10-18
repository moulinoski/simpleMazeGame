"use strict";

/**
 * Abstract cell type for impassable (wall) tiles.
 */
class Impassable extends Cell {
  constructor() {
    if (new.target === Impassable) throw new Error("Impassable is abstract");
    super();
    /** @type {false} */ this.passable = false;
  }
}
