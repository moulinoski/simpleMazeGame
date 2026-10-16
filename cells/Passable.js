"use strict";

/**
 * Abstract cell type for passable (floor) tiles.
 */
class Passable {
  constructor() {
    if (new.target === Passable) throw new Error("Passable is abstract");
    /** @type {string} */ this.character = " ";
    /** @type {true}   */ this.passable = true;
  }
}
