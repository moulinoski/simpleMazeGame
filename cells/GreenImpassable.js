"use strict";

class GreenImpassable extends Impassable {
  constructor() {
    super();
    this.character = "🟩";
    this.passable = false;
  }
}
