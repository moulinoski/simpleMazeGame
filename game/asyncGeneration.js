"use strict";

// ──────────────────────────────────────────────────────────────
//  Async generation (chunked to keep UI alive)
// ──────────────────────────────────────────────────────────────

function generateMazeAsync(MazeClassConstructor = LargeMaze) {
  return new Promise((resolveGeneratedMaze) => {
    let generationAttemptCount = 0;

    function executeGenerationAttempt() {
      generationAttemptCount++;
      const newlyInstantiatedMaze = new MazeClassConstructor();

      MazeGenerator.generate(newlyInstantiatedMaze, (progressRatio) => {
        loadingBarFillElement.style.width = `${Math.round(progressRatio * 100)}%`;
      });

      // Validate with MazeSolver
      const isSolvable = MazeSolver.solve(newlyInstantiatedMaze);
      if (isSolvable) {
        resolveGeneratedMaze(newlyInstantiatedMaze);
      } else {
        console.warn(`Maze attempt ${generationAttemptCount} not solvable — retrying…`);
        loadingBarFillElement.style.width = '0%';
        // Yield to browser between attempts
        setTimeout(executeGenerationAttempt, 16);
      }
    }

    // Small delay so the loading UI renders first
    setTimeout(executeGenerationAttempt, 60);
  });
}
