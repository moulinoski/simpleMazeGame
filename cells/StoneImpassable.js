"use strict";

class StoneImpassable extends Impassable {
  constructor() {
    super();
    this.character = "🪨";
    this.passable = false;
  }
}
