"use strict";

class BasicImpassable extends Impassable {
  constructor() {
    super();
    this.character = "⬛";
    this.passable = false;
  }
}
