"use strict";

// ──────────────────────────────────────────────────────────────
//  Game state
// ──────────────────────────────────────────────────────────────

let currentMazeInstance = null;
let playerGridCoordinateX = 0, playerGridCoordinateY = 0;
let currentPlayerEmoji = EMOJI_IDLE_STANDING;
let isPlayerMoving = false;
let isGameWon = false;
let currentlyHeldKeys = new Set();
let lastMoveTimestamp = 0;
let lastInputTimestamp = 0;
let animationFrameRequestId = null;
