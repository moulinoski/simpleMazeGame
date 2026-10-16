"use strict";

/**
 * Static generator.  Uses iterative randomised DFS (recursive backtracker)
 * to carve a perfect maze on the cell grid, then opens one edge cell as the
 * goal.  startPoint is a random interior cell centre.
 *
 * Generates repeatedly (using MazeSolver) until a solvable maze is found.
 *
 * @param {Maze} maze             – maze object (mutated in place)
 * @param {(p:number)=>void} [progressCb]
 * @returns {Maze}
 */
class MazeGenerator {
  static generate(maze, progressCb) {
    const { width: W, height: H } = maze;

    // Perfect-maze DFS works on a "cell" grid of size cW × cH
    // where each cell maps to pixel (cx*2+1, cy*2+1),
    // walls are the even-indexed rows/cols.
    const cW = Math.floor((W - 1) / 2);
    const cH = Math.floor((H - 1) / 2);

    // Flat Uint8Array: 1 = passable, 0 = wall
    const flat = new Uint8Array(W * H); // all walls initially

    const set = (px, py) => { flat[py * W + px] = 1; };

    const cellPX = (cx) => cx * 2 + 1;
    const cellPY = (cy) => cy * 2 + 1;

    // Open a cell centre and the wall between two adjacent cells
    const openCell = (cx, cy) => set(cellPX(cx), cellPY(cy));
    const openWall = (cx1, cy1, cx2, cy2) => {
      // Wall pixel sits exactly between the two cell pixels
      set(cellPX(cx1) + (cx2 - cx1), cellPY(cy1) + (cy2 - cy1));
    };

    // DFS stack — use a typed array for speed
    const stack = new Int32Array(cW * cH * 2);
    let stackTop = 0;
    const push = (cx, cy) => { stack[stackTop++] = cx; stack[stackTop++] = cy; };
    const popY = () => stack[--stackTop];
    const popX = () => stack[--stackTop];
    const topY = () => stack[stackTop - 1];
    const topX = () => stack[stackTop - 2];

    const visited = new Uint8Array(cW * cH);
    const vIdx = (cx, cy) => cy * cW + cx;

    // Random starting cell
    const initCX = (Math.random() * cW) | 0;
    const initCY = (Math.random() * cH) | 0;
    visited[vIdx(initCX, initCY)] = 1;
    openCell(initCX, initCY);
    push(initCX, initCY);

    const DIRS = [[0, -1], [0, 1], [-1, 0], [1, 0]];
    const totalCells = cW * cH;
    let carved = 1;

    // Direction shuffle (Fisher-Yates on a length-4 array)
    const dirOrder = [0, 1, 2, 3];
    const shuffle4 = () => {
      for (let i = 3; i > 0; i--) {
        const j = (Math.random() * (i + 1)) | 0;
        const t = dirOrder[i]; dirOrder[i] = dirOrder[j]; dirOrder[j] = t;
      }
    };

    while (stackTop > 0) {
      const cx = topX(), cy = topY();
      shuffle4();
      let moved = false;
      for (let i = 0; i < 4; i++) {
        const [dx, dy] = DIRS[dirOrder[i]];
        const nx = cx + dx, ny = cy + dy;
        if (nx < 0 || ny < 0 || nx >= cW || ny >= cH) continue;
        if (visited[vIdx(nx, ny)]) continue;
        visited[vIdx(nx, ny)] = 1;
        openCell(nx, ny);
        openWall(cx, cy, nx, ny);
        push(nx, ny);
        carved++;
        moved = true;
        break;
      }
      if (!moved) { popY(); popX(); }

      if (progressCb && (carved & 0x1ff) === 0) {
        progressCb(Math.min(0.88, carved / totalCells));
      }
    }

    // ── Place startPoint: random interior cell centre ──────────
    const sCX = (Math.random() * cW) | 0;
    const sCY = (Math.random() * cH) | 0;
    maze.startPoint = { x: cellPX(sCX), y: cellPY(sCY) };

    // ── Place goalPoint on a random edge ──────────────────────
    // Choose edge; open the outermost border pixel adjacent to a cell.
    const edgeChoice = (Math.random() * 4) | 0;
    let gPX, gPY;

    if (edgeChoice === 0) {          // top edge
      const gcx = (Math.random() * cW) | 0;
      gPX = cellPX(gcx); gPY = 0;
      flat[0 * W + gPX] = 1;
      // ensure the cell just below is also open (it should be, but be safe)
      flat[1 * W + gPX] = 1;
    } else if (edgeChoice === 1) {   // bottom edge
      const gcx = (Math.random() * cW) | 0;
      gPX = cellPX(gcx); gPY = H - 1;
      flat[(H - 1) * W + gPX] = 1;
      flat[(H - 2) * W + gPX] = 1;
    } else if (edgeChoice === 2) {   // left edge
      const gcy = (Math.random() * cH) | 0;
      gPX = 0; gPY = cellPY(gcy);
      flat[gPY * W + 0] = 1;
      flat[gPY * W + 1] = 1;
    } else {                          // right edge
      const gcy = (Math.random() * cH) | 0;
      gPX = W - 1; gPY = cellPY(gcy);
      flat[gPY * W + (W - 1)] = 1;
      flat[gPY * W + (W - 2)] = 1;
    }

    maze.goalPoint = { x: gPX, y: gPY };

    // Convert flat array to boolean[][] for mazeArrayRepresentation
    const grid = [];
    for (let y = 0; y < H; y++) {
      const row = [];
      for (let x = 0; x < W; x++) {
        row.push(flat[y * W + x] === 1);
      }
      grid.push(row);
    }
    maze.mazeArrayRepresentation = grid;

    if (progressCb) progressCb(1.0);
    return maze;
  }
}
