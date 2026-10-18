"use strict";

// ──────────────────────────────────────────────────────────────
//  Input handling
// ──────────────────────────────────────────────────────────────

const KEY_TO_MOVEMENT_DELTA = {
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
  w: [0, -1], W: [0, -1],
  s: [0, 1], S: [0, 1],
  a: [-1, 0], A: [-1, 0],
  d: [1, 0], D: [1, 0],
};

// Movement rate: 1 move per 1/6 second = ~167 ms
const MOVE_INTERVAL_MILLISECONDS = Math.round(1000 / 6);

// Player character sprites
// No. 418 on unicode.org: [U+1F6B6 U+200D U+27A1 U+FE0F] "person walking: facing right"
const EMOJI_WALKING_RIGHT = '\u{1F6B6}\u{200D}\u{27A1}\u{FE0F}';
const EMOJI_WALKING_LEFT = '🚶';
const EMOJI_IDLE_STANDING = '🧍';
const EMOJI_IDLE_SLEEPING = '🛌';
