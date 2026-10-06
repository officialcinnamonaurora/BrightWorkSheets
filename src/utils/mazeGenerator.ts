/**
 * Recursive Backtracker Maze Generator for BrightWorkSheets (brightworksheets.com)
 * Generates perfect mazes with exactly one unique solution.
 */

export type MazeDifficulty = 'easy' | 'medium' | 'hard' | 'expert' | 'custom';
export type MazeShape = 'square' | 'circle';
export type MazeTheme = 'star-heart' | 'mouse-cheese' | 'rocket-planet';
export type MazePathWidth = 'thin' | 'medium' | 'wide';
export type MazeBatchCount = 1 | 2 | 4;

export interface MazeConfig {
  difficulty: MazeDifficulty;
  customSize: number; // 5 to 30
  shape: MazeShape;
  theme: MazeTheme;
  pathWidth: MazePathWidth;
  seed: number;
  title: string;
  showSolution: boolean;
  batchCount: MazeBatchCount;
  siteFooterText?: string;
}

export interface MazeCell {
  r: number;
  c: number;
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
  isValid: boolean;
}

export interface SingleMazeData {
  id: number;
  gridSize: number;
  cells: MazeCell[][];
  startCell: [number, number];
  finishCell: [number, number];
  solutionPath: [number, number][]; // [r, c][]
  shape: MazeShape;
  theme: MazeTheme;
  pathWidth: MazePathWidth;
  seed: number;
}

export interface MazeWorksheetModel {
  title: string;
  difficultyLabel: string;
  theme: MazeTheme;
  shape: MazeShape;
  pathWidth: MazePathWidth;
  batchCount: MazeBatchCount;
  showSolution: boolean;
  mazes: SingleMazeData[];
  footerText: string;
}

/**
 * Seeded PRNG using Mulberry32
 */
function createPrng(seed: number) {
  let a = seed >>> 0;
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function getGridSizeFromDifficulty(difficulty: MazeDifficulty, customSize: number): number {
  switch (difficulty) {
    case 'easy':
      return 8;
    case 'medium':
      return 12;
    case 'hard':
      return 18;
    case 'expert':
      return 25;
    case 'custom':
    default:
      return Math.min(30, Math.max(5, customSize || 12));
  }
}

/**
 * Generates a single maze using the Recursive Backtracker algorithm.
 * Guarantees a perfect maze (tree structure) with exactly one solution.
 */
export function generateSingleMaze(
  size: number,
  shape: MazeShape,
  theme: MazeTheme,
  pathWidth: MazePathWidth,
  seed: number,
  mazeId: number = 1
): SingleMazeData {
  const prng = createPrng(seed);
  const N = size;
  const center = (N - 1) / 2;
  const radius = N / 2 - 0.2;

  // Initialize cells
  const cells: MazeCell[][] = [];
  for (let r = 0; r < N; r++) {
    const row: MazeCell[] = [];
    for (let c = 0; c < N; c++) {
      let isValid = true;
      if (shape === 'circle') {
        const dist = Math.hypot(r - center, c - center);
        isValid = dist <= radius;
      }
      row.push({
        r,
        c,
        top: true,
        right: true,
        bottom: true,
        left: true,
        isValid,
      });
    }
    cells.push(row);
  }

  // Find start and finish cells
  let startCell: [number, number] = [0, 0];
  let finishCell: [number, number] = [N - 1, N - 1];

  if (shape === 'circle') {
    // Top-most valid cell for start, bottom-most for finish
    const validCells: [number, number][] = [];
    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        if (cells[r][c].isValid) {
          validCells.push([r, c]);
        }
      }
    }
    if (validCells.length > 0) {
      startCell = validCells[0];
      finishCell = validCells[validCells.length - 1];
    }
  } else {
    startCell = [0, 0];
    finishCell = [N - 1, N - 1];
  }

  // Recursive Backtracker algorithm
  const visited: boolean[][] = Array.from({ length: N }, () => Array(N).fill(false));
  const stack: [number, number][] = [];

  const [startR, startC] = startCell;
  visited[startR][startC] = true;
  stack.push([startR, startC]);

  const DIRS = [
    { dr: -1, dc: 0, wall: 'top', oppWall: 'bottom' },
    { dr: 0, dc: 1, wall: 'right', oppWall: 'left' },
    { dr: 1, dc: 0, wall: 'bottom', oppWall: 'top' },
    { dr: 0, dc: -1, wall: 'left', oppWall: 'right' },
  ] as const;

  while (stack.length > 0) {
    const [cr, cc] = stack[stack.length - 1];
    const neighbors: { nr: number; nc: number; wall: 'top' | 'right' | 'bottom' | 'left'; oppWall: 'top' | 'right' | 'bottom' | 'left' }[] = [];

    for (const d of DIRS) {
      const nr = cr + d.dr;
      const nc = cc + d.dc;

      if (nr >= 0 && nr < N && nc >= 0 && nc < N) {
        if (cells[nr][nc].isValid && !visited[nr][nc]) {
          neighbors.push({ nr, nc, wall: d.wall, oppWall: d.oppWall });
        }
      }
    }

    if (neighbors.length > 0) {
      // Pick random neighbor using seeded PRNG
      const chosen = neighbors[Math.floor(prng() * neighbors.length)];
      // Knock down wall between current and chosen
      const currCell = cells[cr][cc];
      const nextCell = cells[chosen.nr][chosen.nc];

      currCell[chosen.wall] = false;
      nextCell[chosen.oppWall] = false;

      visited[chosen.nr][chosen.nc] = true;
      stack.push([chosen.nr, chosen.nc]);
    } else {
      stack.pop();
    }
  }

  // Knock down outer opening for start and finish
  if (shape === 'square') {
    cells[startCell[0]][startCell[1]].left = false;
    cells[finishCell[0]][finishCell[1]].right = false;
  }

  // Find the exact single unique solution path using BFS/DFS
  const solutionPath = solveMaze(cells, startCell, finishCell, N);

  return {
    id: mazeId,
    gridSize: N,
    cells,
    startCell,
    finishCell,
    solutionPath,
    shape,
    theme,
    pathWidth,
    seed,
  };
}

/**
 * Solves the perfect maze using BFS. Because it's a spanning tree, exactly one path exists.
 */
function solveMaze(
  cells: MazeCell[][],
  start: [number, number],
  finish: [number, number],
  N: number
): [number, number][] {
  const queue: [number, number][] = [start];
  const parent = new Map<string, [number, number] | null>();
  parent.set(`${start[0]},${start[1]}`, null);

  const key = (r: number, c: number) => `${r},${c}`;

  while (queue.length > 0) {
    const [cr, cc] = queue.shift()!;
    if (cr === finish[0] && cc === finish[1]) break;

    const cell = cells[cr][cc];

    // Check 4 directions if wall is open
    const moves = [
      { dr: -1, dc: 0, open: !cell.top },
      { dr: 0, dc: 1, open: !cell.right },
      { dr: 1, dc: 0, open: !cell.bottom },
      { dr: 0, dc: -1, open: !cell.left },
    ];

    for (const m of moves) {
      if (m.open) {
        const nr = cr + m.dr;
        const nc = cc + m.dc;
        if (nr >= 0 && nr < N && nc >= 0 && nc < N && cells[nr][nc].isValid) {
          const nKey = key(nr, nc);
          if (!parent.has(nKey)) {
            parent.set(nKey, [cr, cc]);
            queue.push([nr, nc]);
          }
        }
      }
    }
  }

  // Reconstruct path
  const path: [number, number][] = [];
  let curr: [number, number] | null = finish;

  while (curr !== null) {
    path.push(curr);
    curr = parent.get(key(curr[0], curr[1])) || null;
  }

  return path.reverse();
}

/**
 * Generates the complete worksheet model supporting batches (1, 2, or 4 mazes)
 */
export function generateMazeWorksheet(config: MazeConfig): MazeWorksheetModel {
  const size = getGridSizeFromDifficulty(config.difficulty, config.customSize);
  const baseSeed = config.seed || Math.floor(Math.random() * 999999) + 1;
  const count = config.batchCount || 1;

  const mazes: SingleMazeData[] = [];
  for (let i = 0; i < count; i++) {
    mazes.push(
      generateSingleMaze(
        size,
        config.shape,
        config.theme,
        config.pathWidth,
        baseSeed + i * 1337,
        i + 1
      )
    );
  }

  const difficultyNames = {
    easy: 'Easy (8×8)',
    medium: 'Medium (12×12)',
    hard: 'Hard (18×18)',
    expert: 'Expert (25×25)',
    custom: `Custom (${size}×${size})`,
  };

  return {
    title: config.title || 'Find the Way',
    difficultyLabel: difficultyNames[config.difficulty],
    theme: config.theme,
    shape: config.shape,
    pathWidth: config.pathWidth,
    batchCount: config.batchCount,
    showSolution: config.showSolution,
    mazes,
    footerText: config.siteFooterText || 'brightworksheets.com',
  };
}
