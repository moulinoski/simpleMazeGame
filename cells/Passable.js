"use strict";

/**
 * Abstract cell type for passable (floor) tiles.
 */
class Passable extends Cell {
  constructor() {
    if (new.target === Passable) throw new Error("Passable is abstract");
    super();
    /** @type {true} */ this.passable = true;
  }
}
