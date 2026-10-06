/**
 * Math Worksheet Generator for BrightWorkSheets (brightworksheets.com)
 * Generates custom printable math drills for Addition, Subtraction, Multiplication, Division, and Mixed operations.
 */

export type MathOperation = 'addition' | 'subtraction' | 'multiplication' | 'division' | 'mixed';
export type MathDifficultyPreset = 'grade-1' | 'grade-2' | 'grade-3' | 'grade-4' | 'custom';
export type MathLayout = 'vertical' | 'horizontal';
export type MathProblemCount = 10 | 15 | 20 | 30;

export interface MathConfig {
  operation: MathOperation;
  difficulty: MathDifficultyPreset;
  customMin: number;
  customMax: number;
  problemCount: MathProblemCount;
  layout: MathLayout;
  allowRegrouping: boolean;
  noNegativeAnswers: boolean;
  wholeNumberDivisionOnly: boolean;
  timesTableFocus: number | 'all'; // 2 to 12 or 'all'
  showAnswerKey: boolean;
  title?: string;
  siteFooterText?: string;
}

export interface MathProblem {
  id: number;
  num1: number;
  num2: number;
  operator: string;
  operation: MathOperation;
  answer: number;
  displayNum1: string;
  displayNum2: string;
}

export interface MathWorksheetModel {
  title: string;
  operationLabel: string;
  difficultyLabel: string;
  dateFieldText: string;
  nameFieldText: string;
  footerText: string;
  problems: MathProblem[];
  layout: MathLayout;
  columnsCount: number;
  showAnswerKey: boolean;
}

export function getDifficultyRange(preset: MathDifficultyPreset, customMin: number, customMax: number): { min: number; max: number } {
  switch (preset) {
    case 'grade-1':
      return { min: 1, max: 10 };
    case 'grade-2':
      return { min: 1, max: 20 };
    case 'grade-3':
      return { min: 1, max: 100 };
    case 'grade-4':
      return { min: 10, max: 1000 };
    case 'custom':
    default: {
      const min = Math.max(0, Math.min(customMin, customMax));
      const max = Math.max(1, Math.max(customMin, customMax));
      return { min, max };
    }
  }
}

/**
 * Checks whether addition has regrouping (carrying)
 */
function hasRegroupingAddition(a: number, b: number): boolean {
  let tempA = a;
  let tempB = b;
  while (tempA > 0 || tempB > 0) {
    const digitA = tempA % 10;
    const digitB = tempB % 10;
    if (digitA + digitB >= 10) return true;
    tempA = Math.floor(tempA / 10);
    tempB = Math.floor(tempB / 10);
  }
  return false;
}

/**
 * Checks whether subtraction has regrouping (borrowing)
 */
function hasBorrowingSubtraction(a: number, b: number): boolean {
  let tempA = a;
  let tempB = b;
  while (tempA > 0 || tempB > 0) {
    const digitA = tempA % 10;
    const digitB = tempB % 10;
    if (digitA < digitB) return true;
    tempA = Math.floor(tempA / 10);
    tempB = Math.floor(tempB / 10);
  }
  return false;
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates an individual valid problem respecting options
 */
function generateSingleProblem(config: MathConfig, id: number): MathProblem {
  const { min, max } = getDifficultyRange(config.difficulty, config.customMin, config.customMax);

  // Pick operation if mixed
  let op = config.operation;
  if (op === 'mixed') {
    const choices: MathOperation[] = ['addition', 'subtraction', 'multiplication', 'division'];
    op = choices[Math.floor(Math.random() * choices.length)];
  }

  let num1 = 1;
  let num2 = 1;
  let operator = '+';
  let answer = 2;

  let attempts = 0;
  while (attempts < 100) {
    attempts++;

    if (op === 'addition') {
      operator = '+';
      num1 = getRandomInt(min, max);
      num2 = getRandomInt(min, max);

      if (!config.allowRegrouping && hasRegroupingAddition(num1, num2)) {
        continue;
      }
      answer = num1 + num2;
      break;
    } else if (op === 'subtraction') {
      operator = '−';
      num1 = getRandomInt(min, max);
      num2 = getRandomInt(min, max);

      if (config.noNegativeAnswers && num1 < num2) {
        // Swap so top is greater
        const temp = num1;
        num1 = num2;
        num2 = temp;
      }

      if (!config.allowRegrouping && hasBorrowingSubtraction(num1, num2)) {
        continue;
      }
      answer = num1 - num2;
      break;
    } else if (op === 'multiplication') {
      operator = '×';
      if (config.timesTableFocus !== 'all' && typeof config.timesTableFocus === 'number') {
        const fixed = config.timesTableFocus;
        const other = getRandomInt(1, 12);
        // Randomly place fixed on top or bottom
        if (Math.random() > 0.5) {
          num1 = fixed;
          num2 = other;
        } else {
          num1 = other;
          num2 = fixed;
        }
      } else {
        // Scale factors reasonably according to difficulty
        const factorMax = config.difficulty === 'grade-1' ? 5 : config.difficulty === 'grade-2' ? 10 : 12;
        num1 = getRandomInt(min > 12 ? 2 : Math.max(1, min), factorMax);
        num2 = getRandomInt(1, factorMax);
      }
      answer = num1 * num2;
      break;
    } else if (op === 'division') {
      operator = '÷';
      if (config.wholeNumberDivisionOnly) {
        // Generate divisor and answer first so dividend = divisor * answer
        const divisorMax = config.difficulty === 'grade-1' ? 5 : config.difficulty === 'grade-2' ? 10 : 12;
        const divisor = getRandomInt(1, divisorMax);
        const quotient = getRandomInt(1, divisorMax);
        num1 = divisor * quotient;
        num2 = divisor;
        answer = quotient;
      } else {
        num1 = getRandomInt(min, max);
        num2 = getRandomInt(1, 10);
        answer = Math.floor(num1 / num2);
      }
      break;
    }
  }

  return {
    id,
    num1,
    num2,
    operator,
    operation: op,
    answer,
    displayNum1: num1.toString(),
    displayNum2: num2.toString(),
  };
}

/**
 * Core function to generate fresh, non-duplicate math problems
 */
export function generateMathWorksheet(config: MathConfig): MathWorksheetModel {
  const problems: MathProblem[] = [];
  const seenSignatures = new Set<string>();

  const targetCount = config.problemCount || 20;

  for (let i = 1; i <= targetCount; i++) {
    let problem: MathProblem | null = null;
    let attempts = 0;

    while (attempts < 60) {
      attempts++;
      const candidate = generateSingleProblem(config, i);
      const signature = `${candidate.operator}:${candidate.num1}:${candidate.num2}`;

      if (!seenSignatures.has(signature)) {
        seenSignatures.add(signature);
        problem = candidate;
        break;
      }
    }

    // Fallback if duplicate avoidance exhausted
    if (!problem) {
      problem = generateSingleProblem(config, i);
    }

    problems.push(problem);
  }

  // Determine grid columns based on count and layout
  let columnsCount = 4;
  if (config.layout === 'vertical') {
    if (targetCount === 10) columnsCount = 2; // 2x5
    else if (targetCount === 15) columnsCount = 3; // 3x5
    else if (targetCount === 20) columnsCount = 4; // 4x5
    else columnsCount = 5; // 30 problems -> 5x6
  } else {
    // Horizontal layout
    if (targetCount === 10) columnsCount = 2;
    else if (targetCount === 15) columnsCount = 3;
    else if (targetCount === 20) columnsCount = 2;
    else columnsCount = 3;
  }

  const opLabels: Record<MathOperation, string> = {
    addition: 'Addition Practice',
    subtraction: 'Subtraction Practice',
    multiplication: 'Multiplication Practice',
    division: 'Division Practice',
    mixed: 'Mixed Operations Practice',
  };

  const diffLabels: Record<MathDifficultyPreset, string> = {
    'grade-1': 'Grade 1 (To 10)',
    'grade-2': 'Grade 2 (To 20)',
    'grade-3': 'Grade 3 (To 100)',
    'grade-4': 'Grade 4 (To 1,000)',
    'custom': `Custom (${config.customMin}–${config.customMax})`,
  };

  return {
    title: config.title || opLabels[config.operation],
    operationLabel: opLabels[config.operation],
    difficultyLabel: diffLabels[config.difficulty],
    dateFieldText: 'Date: ________________',
    nameFieldText: 'Name: ________________',
    footerText: config.siteFooterText || 'brightworksheets.com',
    problems,
    layout: config.layout,
    columnsCount,
    showAnswerKey: config.showAnswerKey,
  };
}
