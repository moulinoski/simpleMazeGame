"use strict";

class VolcanoImpassable extends Impassable {
  constructor() {
    super();
    this.character = "🌋";
    this.passable = false;
  }
}
