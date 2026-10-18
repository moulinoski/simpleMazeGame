"use strict";

// ──────────────────────────────────────────────────────────────
//  Start Screen & Menu Handling
// ──────────────────────────────────────────────────────────────

const startScreenElement = document.getElementById('start-screen');
const titleCardElement = document.getElementById('title-card');
const startMenuElement = document.getElementById('start-menu');
const menuOptionButtons = Array.from(document.querySelectorAll('.menu-btn'));

const MENU_DIFFICULTY_OPTIONS = [
  { label: 'Tiny', mazeClass: TinyMaze },
  { label: 'Small', mazeClass: SmallMaze },
  { label: 'Medium', mazeClass: MediumMaze },
  { label: 'Large', mazeClass: LargeMaze },
  { label: 'Giant', mazeClass: GiantMaze },
];

let selectedMenuOptionIndex = 0;
let isMenuSelectionConfirmed = false;

function updateMenuHighlight() {
  menuOptionButtons.forEach((menuButton, optionIndex) => {
    if (optionIndex === selectedMenuOptionIndex) {
      menuButton.classList.add('highlighted');
      menuButton.setAttribute('aria-selected', 'true');
    } else {
      menuButton.classList.remove('highlighted');
      menuButton.setAttribute('aria-selected', 'false');
    }
  });
}

function onMenuKeyDown(keyboardEvent) {
  if (isMenuSelectionConfirmed) return;

  const pressedKey = keyboardEvent.key;

  if (pressedKey === 'ArrowDown' || pressedKey === 's' || pressedKey === 'S') {
    keyboardEvent.preventDefault();
    selectedMenuOptionIndex = (selectedMenuOptionIndex + 1) % MENU_DIFFICULTY_OPTIONS.length;
    updateMenuHighlight();
  } else if (pressedKey === 'ArrowUp' || pressedKey === 'w' || pressedKey === 'W') {
    keyboardEvent.preventDefault();
    selectedMenuOptionIndex = (selectedMenuOptionIndex - 1 + MENU_DIFFICULTY_OPTIONS.length) % MENU_DIFFICULTY_OPTIONS.length;
    updateMenuHighlight();
  } else if (pressedKey === 'Enter') {
    keyboardEvent.preventDefault();
    selectDifficultyOption(selectedMenuOptionIndex);
  }
}

menuOptionButtons.forEach((menuButton, optionIndex) => {
  menuButton.addEventListener('mouseenter', () => {
    if (isMenuSelectionConfirmed) return;
    selectedMenuOptionIndex = optionIndex;
    updateMenuHighlight();
  });

  menuButton.addEventListener('focus', () => {
    if (isMenuSelectionConfirmed) return;
    selectedMenuOptionIndex = optionIndex;
    updateMenuHighlight();
  });

  menuButton.addEventListener('click', (mouseEvent) => {
    if (isMenuSelectionConfirmed) return;
    if (mouseEvent.button === 0) {
      selectedMenuOptionIndex = optionIndex;
      selectDifficultyOption(optionIndex);
    }
  });
});

window.addEventListener('keydown', onMenuKeyDown);

function selectDifficultyOption(selectedDifficultyIndex) {
  if (isMenuSelectionConfirmed) return;
  isMenuSelectionConfirmed = true;

  // Unbind inputs from the menu
  window.removeEventListener('keydown', onMenuKeyDown);

  const chosenDifficultyOption = MENU_DIFFICULTY_OPTIONS[selectedDifficultyIndex];

  // Remove the title card and the menu
  if (titleCardElement) titleCardElement.remove();
  if (startMenuElement) startMenuElement.remove();
  if (startScreenElement) startScreenElement.remove();

  // Show app title for gameplay
  const appTitleElement = document.getElementById('app-title');
  if (appTitleElement) appTitleElement.style.display = 'block';

  // Show loading screen and generate selected maze
  loadingScreenElement.style.display = 'flex';
  loadingScreenElement.classList.remove('hidden');
  loadingBarFillElement.style.width = '0%';

  (async () => {
    const generatedMaze = await generateMazeAsync(chosenDifficultyOption.mazeClass);
    startGame(generatedMaze);
  })();
}
