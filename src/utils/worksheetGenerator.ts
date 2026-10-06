/**
 * Reusable Worksheet Generator for BrightWorkSheets (brightworksheets.com)
 * Can be reused and cloned for Name Tracing, Alphabet Tracing, and Number Tracing.
 */

export type LetterCase = 'uppercase' | 'lowercase' | 'as-typed';
export type FontStyle = 'print' | 'cursive' | 'dotted';
export type LetterSize = 'small' | 'medium' | 'large';

export interface WorksheetConfig {
  /** The text to trace (e.g. child's name, alphabet "Aa Bb", or numbers "1 2 3") */
  text: string;
  letterCase: LetterCase;
  fontStyle: FontStyle;
  letterSize: LetterSize;
  repeatCount: number; // 3 to 10 rows
  showGuideLines: boolean;
  showStartingArrows: boolean;
  title?: string;
  subtext?: string;
  siteFooterText?: string;
}

export interface WorksheetRow {
  index: number;
  displayText: string;
  type: 'solid-trace' | 'dotted-trace' | 'free-write';
  label?: string;
  showArrows: boolean;
}

export interface WorksheetModel {
  title: string;
  subtext: string;
  dateFieldText: string;
  nameFieldText: string;
  footerText: string;
  formattedText: string;
  fontStyle: FontStyle;
  letterSize: LetterSize;
  showGuideLines: boolean;
  showStartingArrows: boolean;
  rows: WorksheetRow[];
  totalRows: number;
  metrics: {
    rowHeightPx: number;
    fontSizePx: number;
    baselinePercent: number;
    midlinePercent: number;
    toplinePercent: number;
    fontFamily: string;
    letterSpacing: string;
  };
}

/**
 * Transforms input string according to chosen letter case
 */
export function formatLetterCase(input: string, letterCase: LetterCase): string {
  if (!input) return '';
  switch (letterCase) {
    case 'uppercase':
      return input.toUpperCase();
    case 'lowercase':
      return input.toLowerCase();
    case 'as-typed':
    default:
      return input;
  }
}

/**
 * Calculates typography and guideline metrics based on letter size and total rows
 */
export function getWorksheetMetrics(size: LetterSize, totalRows: number, fontStyle: FontStyle) {
  // Base sizing according to letter size option
  let baseRowHeight = 90;
  let baseFontSize = 52;
  let letterSpacing = '0.08em';

  switch (size) {
    case 'small':
      baseRowHeight = 72;
      baseFontSize = 40;
      letterSpacing = '0.06em';
      break;
    case 'medium':
      baseRowHeight = 92;
      baseFontSize = 52;
      letterSpacing = '0.09em';
      break;
    case 'large':
      baseRowHeight = 114;
      baseFontSize = 64;
      letterSpacing = '0.12em';
      break;
  }

  // Auto-tune slightly if many rows are requested so it always fits perfectly on 1 standard page
  if (totalRows >= 8) {
    baseRowHeight = Math.min(baseRowHeight, 74);
    baseFontSize = Math.min(baseFontSize, 42);
  } else if (totalRows >= 6) {
    baseRowHeight = Math.min(baseRowHeight, 88);
    baseFontSize = Math.min(baseFontSize, 50);
  }

  let fontFamily = "'Playpen Sans', 'Comic Neue', sans-serif";
  if (fontStyle === 'cursive') {
    fontFamily = "'Cedarville Cursive', 'Caveat', cursive";
    letterSpacing = '0.02em'; // cursive joins naturally
    baseFontSize = Math.round(baseFontSize * 1.08); // cursive scripts often render slightly smaller
  } else if (fontStyle === 'dotted') {
    fontFamily = "'Playpen Sans', 'Comic Neue', sans-serif";
    letterSpacing = '0.12em'; // wider spacing is easier for beginner tracing
  }

  return {
    rowHeightPx: baseRowHeight,
    fontSizePx: baseFontSize,
    // Relative positioning within the row's height
    toplinePercent: 22,    // Sky line
    midlinePercent: 54,    // Plane line (dashed)
    baselinePercent: 84,   // Grass line
    descenderPercent: 96,  // Worm line
    fontFamily,
    letterSpacing,
  };
}

/**
 * Core reusable function to generate the worksheet data structure.
 * Designed to be easily cloned or adapted for Alphabet and Number worksheets.
 */
export function generateWorksheetData(config: WorksheetConfig): WorksheetModel {
  const cleanInput = (config.text || '').trim().slice(0, 15);
  const formattedText = formatLetterCase(cleanInput, config.letterCase);
  const clampedRows = Math.min(10, Math.max(3, config.repeatCount || 5));

  // Determine empty rows for free writing:
  // For 3-4 rows: 1 free writing row
  // For 5-10 rows: 2 free writing rows
  const emptyRowCount = clampedRows >= 5 ? 2 : 1;
  const traceRowCount = clampedRows - emptyRowCount;

  const rows: WorksheetRow[] = [];

  for (let i = 0; i < clampedRows; i++) {
    if (i === 0) {
      // Row 1: solid light gray for tracing
      rows.push({
        index: i,
        displayText: formattedText,
        type: 'solid-trace',
        label: 'Trace Model',
        showArrows: config.showStartingArrows,
      });
    } else if (i < traceRowCount) {
      // Following rows: dotted/faded name
      rows.push({
        index: i,
        displayText: formattedText,
        type: 'dotted-trace',
        label: 'Practice Tracing',
        showArrows: config.showStartingArrows && i === 1, // subtle arrow cues on early rows
      });
    } else {
      // Last 1-2 rows: empty guide lines for free writing
      rows.push({
        index: i,
        displayText: '',
        type: 'free-write',
        label: i === traceRowCount ? 'Write on your own' : 'Independent Writing',
        showArrows: false,
      });
    }
  }

  const metrics = getWorksheetMetrics(config.letterSize, clampedRows, config.fontStyle);

  return {
    title: config.title || 'Name Tracing Practice',
    subtext: config.subtext || 'Trace the letters, then practice writing your name on your own!',
    dateFieldText: 'Date: ________________',
    nameFieldText: 'Name: ________________',
    footerText: config.siteFooterText || 'brightworksheets.com',
    formattedText,
    fontStyle: config.fontStyle,
    letterSize: config.letterSize,
    showGuideLines: config.showGuideLines,
    showStartingArrows: config.showStartingArrows,
    rows,
    totalRows: clampedRows,
    metrics,
  };
}

/* ==========================================================================
   ALPHABET TRACING WORKSHEET GENERATOR
   ========================================================================== */

export type AlphabetLetterCase = 'uppercase' | 'lowercase' | 'both';
export type AlphabetFontStyle = 'print' | 'dotted';

export interface AlphabetConfig {
  letterCase: AlphabetLetterCase;
  startLetter: string; // 'A' to 'Z'
  endLetter: string;   // 'A' to 'Z'
  fontStyle: AlphabetFontStyle;
  letterSize: LetterSize;
  showGuideLines: boolean;
  showStartingArrows: boolean;
  siteFooterText?: string;
}

export interface AlphabetRowModel {
  rowIndex: number;
  letterChar: string; // Base letter e.g. 'A'
  displayLetter: string; // Formatted e.g. 'A', 'a', or 'Aa'
  modelLetter: string; // Solid light gray first item
  traceCopies: string[]; // Dotted copies to trace (2 to 3 copies)
  emptyBoxCount: number; // Exactly 2 empty boxes for free writing
  showArrows: boolean;
}

export interface AlphabetPageModel {
  pageIndex: number;
  totalPages: number;
  title: string;
  subtext: string;
  rangeLabel: string;
  rows: AlphabetRowModel[];
  footerText: string;
  metrics: {
    rowHeightPx: number;
    fontSizePx: number;
    baselinePercent: number;
    midlinePercent: number;
    toplinePercent: number;
    fontFamily: string;
    letterSpacing: string;
    colWidth: number;
    totalCols: number;
  };
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

/**
 * Generates formatted letters list between startLetter and endLetter
 */
export function getAlphabetRange(start: string, end: string): string[] {
  const startUpper = (start || 'A').toUpperCase();
  const endUpper = (end || 'Z').toUpperCase();
  const startIndex = Math.max(0, ALPHABET.indexOf(startUpper));
  const endIndex = Math.max(0, ALPHABET.indexOf(endUpper));

  if (startIndex === -1 || endIndex === -1) {
    return [...ALPHABET];
  }

  if (startIndex <= endIndex) {
    return ALPHABET.slice(startIndex, endIndex + 1);
  } else {
    return ALPHABET.slice(endIndex, startIndex + 1);
  }
}

/**
 * Formats a single letter according to letterCase
 */
export function formatAlphabetLetter(char: string, letterCase: AlphabetLetterCase): string {
  const upper = char.toUpperCase();
  const lower = char.toLowerCase();
  switch (letterCase) {
    case 'uppercase':
      return upper;
    case 'lowercase':
      return lower;
    case 'both':
      return `${upper}${lower}`;
    default:
      return upper;
  }
}

/**
 * Determines letters per page according to chosen letter size
 */
export function getLettersPerPage(size: LetterSize): number {
  switch (size) {
    case 'large':
      return 6; // 6 letters per page (5 pages for A-Z)
    case 'medium':
      return 7; // 7 letters per page (4 pages for A-Z)
    case 'small':
      return 8; // 8 letters per page (4 pages for A-Z)
    default:
      return 7;
  }
}

/**
 * Core reusable function for Alphabet Tracing generator.
 * Auto-splits into multiple pages (about 6-8 letters per page).
 * In each row: 1 solid light gray letter, dotted/faded copies to trace, then 2 empty boxes for free writing.
 */
export function generateAlphabetWorksheetPages(config: AlphabetConfig): AlphabetPageModel[] {
  const letters = getAlphabetRange(config.startLetter, config.endLetter);
  const lettersPerPage = getLettersPerPage(config.letterSize);
  const footerText = config.siteFooterText || 'brightworksheets.com';

  const totalPages = Math.max(1, Math.ceil(letters.length / lettersPerPage));
  const pages: AlphabetPageModel[] = [];

  // Determine row metrics based on letter size & case
  let rowHeight = 90;
  let fontSize = 52;
  let letterSpacing = '0.05em';
  const isBoth = config.letterCase === 'both';

  switch (config.letterSize) {
    case 'small':
      rowHeight = 74;
      fontSize = isBoth ? 38 : 44;
      break;
    case 'medium':
      rowHeight = 90;
      fontSize = isBoth ? 46 : 52;
      break;
    case 'large':
      rowHeight = 110;
      fontSize = isBoth ? 56 : 64;
      break;
  }

  const fontFamily = "'Playpen Sans', 'Comic Neue', sans-serif";
  const metrics = {
    rowHeightPx: rowHeight,
    fontSizePx: fontSize,
    toplinePercent: 22,
    midlinePercent: 54,
    baselinePercent: 84,
    fontFamily,
    letterSpacing,
    // Columns: 1 solid model + N dotted trace copies + 2 empty boxes
    colWidth: isBoth ? 120 : 100,
    totalCols: isBoth ? 5 : 6, // for single char: 1 model + 3 trace + 2 free = 6 cols; for 'Both': 1 model + 2 trace + 2 free = 5 cols
  };

  for (let p = 0; p < totalPages; p++) {
    const pageLetters = letters.slice(p * lettersPerPage, (p + 1) * lettersPerPage);
    const firstLetter = pageLetters[0] || 'A';
    const lastLetter = pageLetters[pageLetters.length - 1] || 'Z';
    const rangeLabel = pageLetters.length === 1 ? `Letter ${firstLetter}` : `Letters ${firstLetter} – ${lastLetter}`;

    const rows: AlphabetRowModel[] = pageLetters.map((char, index) => {
      const displayLetter = formatAlphabetLetter(char, config.letterCase);
      // For single letter: 3 trace copies; For 'Both' (Aa): 2 trace copies so it fits cleanly
      const traceCopiesCount = isBoth ? 2 : 3;
      const traceCopies = Array(traceCopiesCount).fill(displayLetter);

      return {
        rowIndex: index,
        letterChar: char,
        displayLetter,
        modelLetter: displayLetter,
        traceCopies,
        emptyBoxCount: 2, // Exactly 2 empty boxes for free writing as required
        showArrows: config.showStartingArrows,
      };
    });

    pages.push({
      pageIndex: p + 1,
      totalPages,
      title: totalPages === 1 ? 'Alphabet Tracing Practice' : `Alphabet Tracing Practice (Page ${p + 1} of ${totalPages})`,
      subtext: 'Trace the model letter and dotted letters, then write your own in the empty boxes!',
      rangeLabel,
      rows,
      footerText,
      metrics,
    });
  }

  return pages;
}

/* ==========================================================================
   NUMBER TRACING WORKSHEET GENERATOR
   ========================================================================== */

export type NumberRangePreset = '0-10' | '0-20' | '1-50' | '1-100' | 'custom';
export type NumberFontStyle = 'print' | 'dotted';
export type CountObjectShape = 'star' | 'circle';

export interface NumberConfig {
  rangePreset: NumberRangePreset;
  startNumber: number; // 0 to 100
  endNumber: number;   // 0 to 100
  fontStyle: NumberFontStyle;
  numberSize: LetterSize;
  showGuideLines: boolean;
  showStartingArrows: boolean;
  countObjects: boolean;
  objectShape?: CountObjectShape;
  siteFooterText?: string;
}

export interface NumberRowModel {
  rowIndex: number;
  numberValue: number;
  displayNumber: string;
  modelNumber: string;
  traceCopies: string[];
  emptyBoxCount: number;
  showArrows: boolean;
  showCountObjects: boolean;
  objectCount: number;
  objectShape: CountObjectShape;
}

export interface NumberPageModel {
  pageIndex: number;
  totalPages: number;
  title: string;
  subtext: string;
  rangeLabel: string;
  rows: NumberRowModel[];
  footerText: string;
  countObjects: boolean;
  metrics: {
    rowHeightPx: number;
    fontSizePx: number;
    baselinePercent: number;
    midlinePercent: number;
    toplinePercent: number;
    fontFamily: string;
    letterSpacing: string;
    hasCounting: boolean;
  };
}

/**
 * Resolves start and end numbers based on preset or custom range
 */
export function resolveNumberRange(config: NumberConfig): { start: number; end: number } {
  switch (config.rangePreset) {
    case '0-10':
      return { start: 0, end: 10 };
    case '0-20':
      return { start: 0, end: 20 };
    case '1-50':
      return { start: 1, end: 50 };
    case '1-100':
      return { start: 1, end: 100 };
    case 'custom':
    default: {
      const s = Math.min(100, Math.max(0, config.startNumber ?? 0));
      const e = Math.min(100, Math.max(0, config.endNumber ?? 10));
      return {
        start: Math.min(s, e),
        end: Math.max(s, e),
      };
    }
  }
}

/**
 * Calculates number items per page
 */
export function getNumbersPerPage(size: LetterSize, countObjects: boolean): number {
  if (countObjects) {
    switch (size) {
      case 'large':
        return 5;
      case 'medium':
        return 6;
      case 'small':
        return 7;
      default:
        return 6;
    }
  } else {
    switch (size) {
      case 'large':
        return 6;
      case 'medium':
        return 7;
      case 'small':
        return 8;
      default:
        return 7;
    }
  }
}

/**
 * Core reusable function for Number Tracing generator.
 * Auto-splits into multiple pages when needed.
 * Each row: number in solid light gray, dotted/faded copies to trace, then empty boxes for free writing.
 * If count the objects is on, draws that many simple shapes next to the number.
 */
export function generateNumberWorksheetPages(config: NumberConfig): NumberPageModel[] {
  const { start, end } = resolveNumberRange(config);
  const footerText = config.siteFooterText || 'brightworksheets.com';
  const objectShape = config.objectShape || 'star';

  // Build list of numbers
  const numberList: number[] = [];
  for (let n = start; n <= end; n++) {
    numberList.push(n);
  }

  const itemsPerPage = getNumbersPerPage(config.numberSize, config.countObjects);
  const totalPages = Math.max(1, Math.ceil(numberList.length / itemsPerPage));
  const pages: NumberPageModel[] = [];

  // Determine row metrics
  let rowHeight = 92;
  let fontSize = 52;
  const isMultiDigit = end >= 10;

  switch (config.numberSize) {
    case 'small':
      rowHeight = config.countObjects ? 80 : 74;
      fontSize = isMultiDigit ? 38 : 44;
      break;
    case 'medium':
      rowHeight = config.countObjects ? 94 : 88;
      fontSize = isMultiDigit ? 46 : 52;
      break;
    case 'large':
      rowHeight = config.countObjects ? 112 : 108;
      fontSize = isMultiDigit ? 56 : 64;
      break;
  }

  const fontFamily = "'Playpen Sans', 'Comic Neue', sans-serif";
  const metrics = {
    rowHeightPx: rowHeight,
    fontSizePx: fontSize,
    toplinePercent: 22,
    midlinePercent: 54,
    baselinePercent: 84,
    fontFamily,
    letterSpacing: '0.04em',
    hasCounting: config.countObjects,
  };

  for (let p = 0; p < totalPages; p++) {
    const pageNumbers = numberList.slice(p * itemsPerPage, (p + 1) * itemsPerPage);
    const firstNum = pageNumbers[0] ?? start;
    const lastNum = pageNumbers[pageNumbers.length - 1] ?? end;
    const rangeLabel = pageNumbers.length === 1 ? `Number ${firstNum}` : `Numbers ${firstNum} – ${lastNum}`;

    const rows: NumberRowModel[] = pageNumbers.map((num, idx) => {
      const displayStr = num.toString();
      // Number of trace copies: 2 or 3 copies
      const traceCopiesCount = config.countObjects ? 2 : (end >= 20 ? 2 : 3);
      const traceCopies = Array(traceCopiesCount).fill(displayStr);

      return {
        rowIndex: idx,
        numberValue: num,
        displayNumber: displayStr,
        modelNumber: displayStr,
        traceCopies,
        emptyBoxCount: 2, // 2 empty boxes for free writing
        showArrows: config.showStartingArrows,
        showCountObjects: config.countObjects,
        objectCount: num,
        objectShape,
      };
    });

    pages.push({
      pageIndex: p + 1,
      totalPages,
      title: totalPages === 1 ? 'Number Tracing Practice' : `Number Tracing Practice (Page ${p + 1} of ${totalPages})`,
      subtext: config.countObjects
        ? 'Count the objects, trace the number, and write your own in the empty boxes!'
        : 'Trace the model number and dotted copies, then practice writing on your own!',
      rangeLabel,
      rows,
      footerText,
      countObjects: config.countObjects,
      metrics,
    });
  }

  return pages;
}

