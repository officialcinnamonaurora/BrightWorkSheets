/**
 * Word Search Puzzle Generator for BrightWorkSheets (brightworksheets.com)
 * Pure TypeScript, zero external libraries.
 */

export type WordSearchGridSize = 10 | 12 | 15;
export type WordSearchDifficulty = 'easy' | 'medium' | 'hard';

export interface WordPlacement {
  word: string;
  originalWord: string;
  startR: number;
  startC: number;
  dr: number;
  dc: number;
  directionName: string;
  coords: [number, number][];
}

export interface WordSearchConfig {
  title: string;
  wordsText: string;
  gridSize: WordSearchGridSize;
  difficulty: WordSearchDifficulty;
  uppercase: boolean;
  showWordList: boolean;
  highlightFirstLetter: boolean;
  showAnswerKey: boolean;
  siteFooterText?: string;
}

export interface WordSearchModel {
  title: string;
  gridSize: WordSearchGridSize;
  difficulty: WordSearchDifficulty;
  grid: string[][];
  placedWords: WordPlacement[];
  unplacedWords: string[];
  allWords: string[];
  firstLetterCoords: Set<string>; // "r,c"
  solutionCoords: Set<string>;   // "r,c"
  uppercase: boolean;
  showWordList: boolean;
  highlightFirstLetter: boolean;
  showAnswerKey: boolean;
  footerText: string;
}

export const READY_MADE_WORD_LISTS: Record<string, string[]> = {
  Animals: ['ELEPHANT', 'GIRAFFE', 'DOLPHIN', 'KANGAROO', 'PENGUIN', 'RABBIT', 'TURTLE', 'MONKEY', 'TIGER', 'ZEBRA', 'PANDA', 'CHEETAH'],
  Colors: ['PURPLE', 'YELLOW', 'ORANGE', 'VIOLET', 'INDIGO', 'SILVER', 'GOLDEN', 'SCARLET', 'BRONZE', 'CRIMSON', 'MAGENTA', 'AMBER'],
  Fruits: ['STRAWBERRY', 'PINEAPPLE', 'WATERMELON', 'BLUEBERRY', 'CHERRY', 'BANANA', 'ORANGE', 'MANGO', 'PEACH', 'GRAPES', 'PAPAYA', 'LEMON'],
  Spring: ['BLOSSOM', 'SUNSHINE', 'BUTTERFLY', 'RAINBOW', 'SPROUT', 'GARDEN', 'BREEZE', 'TULIP', 'DAISY', 'ROBIN', 'FLOWER', 'NATURE'],
  Summer: ['SUNSHINE', 'VACATION', 'SEASHELL', 'POPSICLE', 'CAMPFIRE', 'PICNIC', 'SWIMMING', 'SANDCASTLE', 'OCEAN', 'SAILBOAT', 'BREEZE', 'ISLAND'],
  School: ['TEACHER', 'BACKPACK', 'LIBRARY', 'RECESS', 'PENCIL', 'NOTEBOOK', 'STUDENT', 'SCIENCE', 'READING', 'WRITING', 'SCISSORS', 'CRAYON'],
  Family: ['PARENTS', 'BROTHER', 'SISTER', 'GRANDMA', 'GRANDPA', 'COUSIN', 'FAMILY', 'MOTHER', 'FATHER', 'UNCLE', 'AUNTIE', 'BABY'],
  'Sight Words': ['BECAUSE', 'BETWEEN', 'FRIEND', 'ALWAYS', 'BEFORE', 'AROUND', 'LITTLE', 'PLEASE', 'PRETTY', 'TOGETHER', 'SCHOOL', 'PEOPLE'],
};

/**
 * Parses user raw text into cleaned, validated words
 */
export function parseWordList(raw: string): {
  validWords: string[];
  invalidWords: { word: string; reason: string }[];
} {
  const tokens = raw
    .split(/[\n,;]+/)
    .map((w) => w.trim().replace(/\s+/g, ''))
    .filter((w) => w.length > 0);

  const seen = new Set<string>();
  const validWords: string[] = [];
  const invalidWords: { word: string; reason: string }[] = [];

  for (const token of tokens) {
    const upper = token.toUpperCase();
    if (seen.has(upper)) continue;
    seen.add(upper);

    if (!/^[a-zA-Z]+$/.test(token)) {
      invalidWords.push({ word: token, reason: 'Contains numbers or special symbols' });
    } else if (token.length < 3) {
      invalidWords.push({ word: token, reason: 'Too short (min 3 letters)' });
    } else if (token.length > 12) {
      invalidWords.push({ word: token, reason: 'Too long (max 12 letters)' });
    } else {
      if (validWords.length < 20) {
        validWords.push(upper);
      } else {
        invalidWords.push({ word: token, reason: 'Exceeds 20 words maximum' });
      }
    }
  }

  return { validWords, invalidWords };
}

/**
 * Returns allowed directions based on difficulty
 */
function getAllowedDirections(difficulty: WordSearchDifficulty): { dr: number; dc: number; name: string }[] {
  switch (difficulty) {
    case 'easy':
      // Words go left-to-right and top-to-bottom only
      return [
        { dr: 0, dc: 1, name: 'Across' },
        { dr: 1, dc: 0, name: 'Down' },
      ];
    case 'medium':
      // Adds diagonals (forward diagonals & down/up diagonals)
      return [
        { dr: 0, dc: 1, name: 'Across' },
        { dr: 1, dc: 0, name: 'Down' },
        { dr: 1, dc: 1, name: 'Down-Right' },
        { dr: 1, dc: -1, name: 'Down-Left' },
        { dr: -1, dc: 1, name: 'Up-Right' },
        { dr: -1, dc: -1, name: 'Up-Left' },
      ];
    case 'hard':
    default:
      // All 8 directions including backwards
      return [
        { dr: 0, dc: 1, name: 'Across' },
        { dr: 0, dc: -1, name: 'Backwards' },
        { dr: 1, dc: 0, name: 'Down' },
        { dr: -1, dc: 0, name: 'Up' },
        { dr: 1, dc: 1, name: 'Down-Right' },
        { dr: 1, dc: -1, name: 'Down-Left' },
        { dr: -1, dc: 1, name: 'Up-Right' },
        { dr: -1, dc: -1, name: 'Up-Left' },
      ];
  }
}

/**
 * Generates the complete Word Search puzzle model
 */
export function generateWordSearchPuzzle(config: WordSearchConfig): WordSearchModel {
  const { validWords } = parseWordList(config.wordsText || READY_MADE_WORD_LISTS['Animals'].join('\n'));
  const targetWords = validWords.length > 0 ? validWords : READY_MADE_WORD_LISTS['Animals'];

  // Filter words that exceed grid size
  const placeableWords = targetWords.filter((w) => w.length <= config.gridSize);
  const tooLongWords = targetWords.filter((w) => w.length > config.gridSize);

  // Sort longest first for better packing
  const sortedWords = [...placeableWords].sort((a, b) => b.length - a.length);

  const N = config.gridSize;
  const directions = getAllowedDirections(config.difficulty);

  let bestGrid: string[][] = [];
  let bestPlaced: WordPlacement[] = [];
  let bestUnplaced: string[] = [];

  // Up to 50 randomized placement attempts to achieve 100% packing
  const maxAttempts = 50;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const grid: string[][] = Array.from({ length: N }, () => Array(N).fill(''));
    const placed: WordPlacement[] = [];
    const unplaced: string[] = [];

    for (const word of sortedWords) {
      const candidates: { r: number; c: number; dr: number; dc: number; name: string }[] = [];

      for (let r = 0; r < N; r++) {
        for (let c = 0; c < N; c++) {
          for (const dir of directions) {
            const endR = r + dir.dr * (word.length - 1);
            const endC = c + dir.dc * (word.length - 1);

            if (endR >= 0 && endR < N && endC >= 0 && endC < N) {
              // Check if word fits without conflicting letters
              let fits = true;
              for (let i = 0; i < word.length; i++) {
                const cellChar = grid[r + dir.dr * i][c + dir.dc * i];
                if (cellChar !== '' && cellChar !== word[i]) {
                  fits = false;
                  break;
                }
              }
              if (fits) {
                candidates.push({ r, c, dr: dir.dr, dc: dir.dc, name: dir.name });
              }
            }
          }
        }
      }

      if (candidates.length > 0) {
        // Pick a candidate at random
        const chosen = candidates[Math.floor(Math.random() * candidates.length)];
        const coords: [number, number][] = [];

        for (let i = 0; i < word.length; i++) {
          const currR = chosen.r + chosen.dr * i;
          const currC = chosen.c + chosen.dc * i;
          grid[currR][currC] = word[i];
          coords.push([currR, currC]);
        }

        placed.push({
          word,
          originalWord: word,
          startR: chosen.r,
          startC: chosen.c,
          dr: chosen.dr,
          dc: chosen.dc,
          directionName: chosen.name,
          coords,
        });
      } else {
        unplaced.push(word);
      }
    }

    if (unplaced.length === 0) {
      bestGrid = grid;
      bestPlaced = placed;
      bestUnplaced = [];
      break;
    } else if (bestPlaced.length === 0 || placed.length > bestPlaced.length) {
      bestGrid = grid;
      bestPlaced = placed;
      bestUnplaced = unplaced;
    }
  }

  // Combine any unplaced words
  const finalUnplaced = [...bestUnplaced, ...tooLongWords];

  // Fill remaining empty cells with random letters
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const finalGrid: string[][] = Array.from({ length: N }, (_, r) =>
    Array.from({ length: N }, (_, c) => {
      const char = bestGrid[r] && bestGrid[r][c] ? bestGrid[r][c] : alphabet[Math.floor(Math.random() * alphabet.length)];
      return config.uppercase ? char.toUpperCase() : char.toLowerCase();
    })
  );

  // Set of solution coordinates
  const solutionCoords = new Set<string>();
  const firstLetterCoords = new Set<string>();

  for (const p of bestPlaced) {
    firstLetterCoords.add(`${p.startR},${p.startC}`);
    for (const [r, c] of p.coords) {
      solutionCoords.add(`${r},${c}`);
    }
  }

  // Sort placed words alphabetically for student word list
  bestPlaced.sort((a, b) => a.word.localeCompare(b.word));

  return {
    title: config.title || 'Word Search',
    gridSize: config.gridSize,
    difficulty: config.difficulty,
    grid: finalGrid,
    placedWords: bestPlaced,
    unplacedWords: finalUnplaced,
    allWords: targetWords,
    firstLetterCoords,
    solutionCoords,
    uppercase: config.uppercase,
    showWordList: config.showWordList,
    highlightFirstLetter: config.highlightFirstLetter,
    showAnswerKey: config.showAnswerKey,
    footerText: config.siteFooterText || 'brightworksheets.com',
  };
}
