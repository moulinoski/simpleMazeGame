"use strict";

// ──────────────────────────────────────────────────────────────
//  DOM refs
// ──────────────────────────────────────────────────────────────

const loadingScreenElement = document.getElementById('loading-screen');
const loadingBarFillElement = document.getElementById('loading-bar-fill');
const canvasWrapperElement = document.getElementById('canvas-wrapper');
const mazeCanvasElement = document.getElementById('maze-canvas');
const mainCanvasContext = mazeCanvasElement.getContext('2d');
const winOverlayElement = document.getElementById('win-overlay');
const playAgainButtonElement = document.getElementById('play-again-btn');
