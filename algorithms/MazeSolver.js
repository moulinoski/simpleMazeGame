"use strict";

/**
 * Static solver that validates reachability from startPoint → goalPoint
 * using iterative BFS on maze.mazeArrayRepresentation.
 */
class MazeSolver {
  /**
   * @param {Maze} maze
   * @returns {boolean}  true if goal is reachable from start
   */
  static solve(maze) {
    const { width: W, height: H, startPoint: sp, goalPoint: gp,
      mazeArrayRepresentation: grid } = maze;

    if (!grid || grid.length === 0) return false;

    // Fast flat visited array
    const visited = new Uint8Array(W * H);
    const queue = new Int32Array(W * H * 2); // [x0, y0, x1, y1, …]
    let head = 0, tail = 0;

    const enq = (x, y) => { queue[tail++] = x; queue[tail++] = y; };
    const deqX = () => queue[head++];
    const deqY = () => queue[head++];

    const mark = (x, y) => { visited[y * W + x] = 1; };
    const seen = (x, y) => visited[y * W + x];

    if (!grid[sp.y]?.[sp.x]) return false; // start is a wall
    mark(sp.x, sp.y);
    enq(sp.x, sp.y);

    while (head < tail) {
      const cx = deqX();
      const cy = deqY();
      if (cx === gp.x && cy === gp.y) return true;

      // 4-directional neighbours
      const neighbours = [cx, cy - 1, cx, cy + 1, cx - 1, cy, cx + 1, cy];
      for (let i = 0; i < 8; i += 2) {
        const nx = neighbours[i], ny = neighbours[i + 1];
        if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
        if (seen(nx, ny)) continue;
        if (!grid[ny][nx]) continue;
        mark(nx, ny);
        enq(nx, ny);
      }
    }
    return false;
  }
}
