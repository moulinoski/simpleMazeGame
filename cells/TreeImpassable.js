"use strict";

class TreeImpassable extends Impassable {
  constructor() {
    super();
    this.character = "🌳";
    this.passable = false;
  }
}
