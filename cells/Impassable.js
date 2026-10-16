"use strict";

/**
 * Abstract cell type for impassable (wall) tiles.
 */
class Impassable {
  constructor() {
    if (new.target === Impassable) throw new Error("Impassable is abstract");
    /** @type {string} */ this.character = "⬛";
    /** @type {false}  */ this.passable = false;
  }
}
