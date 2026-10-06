import React from 'react';
import { WordSearchModel } from '../utils/wordSearchGenerator';
import { Search, CheckCircle, Star } from 'lucide-react';

interface WordSearchPageProps {
  worksheet: WordSearchModel;
  isAnswerKey?: boolean;
  isPrintOnly?: boolean;
}

export const WordSearchPage: React.FC<WordSearchPageProps> = ({
  worksheet,
  isAnswerKey = false,
  isPrintOnly = false,
}) => {
  const {
    title,
    grid,
    gridSize,
    difficulty,
    placedWords,
    unplacedWords,
    solutionCoords,
    firstLetterCoords,
    showWordList,
    highlightFirstLetter,
    footerText,
  } = worksheet;

  const difficultyLabels = {
    easy: 'Easy (Across & Down)',
    medium: 'Medium (+ Diagonals)',
    hard: 'Hard (All 8 Directions)',
  };

  // Cell sizing according to grid size
  const cellSizeClass =
    gridSize === 10
      ? 'w-8 h-8 sm:w-10 sm:h-10 text-base sm:text-lg font-bold'
      : gridSize === 12
      ? 'w-7 h-7 sm:w-8.5 sm:h-8.5 text-sm sm:text-base font-bold'
      : 'w-6 h-6 sm:w-7.5 sm:h-7.5 text-xs sm:text-sm font-bold';

  return (
    <div
      className={
        isPrintOnly
          ? 'print-worksheet-page w-full bg-white text-slate-900 p-8 flex flex-col justify-between'
          : 'worksheet-container relative bg-white text-slate-900 border border-slate-200 shadow-xl rounded-2xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden transition-all duration-200 mx-auto select-none'
      }
      style={
        isPrintOnly
          ? { minHeight: '98vh' }
          : {
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
            }
      }
    >
      {/* Top Header Section */}
      <div className="border-b-2 border-dashed border-amber-200/80 pb-3 mb-3">
        <div className="flex items-center justify-between gap-4 text-xs sm:text-sm font-medium text-slate-600 mb-2">
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full border font-display ${
              isAnswerKey
                ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                : 'bg-amber-50 text-amber-900 border-amber-200'
            }`}
          >
            {isAnswerKey ? (
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Search className="w-3.5 h-3.5 text-amber-600" />
            )}
            <span className="font-bold">
              {isAnswerKey ? `Answer Key: ${title}` : title}
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            {isAnswerKey ? (
              <div className="flex items-center gap-3 text-xs font-bold text-emerald-800">
                <span className="bg-emerald-100/70 px-2.5 py-1 rounded-md">
                  {placedWords.length} Words Placed
                </span>
                <span className="border-b border-slate-300 pb-0.5">
                  Score: ______ / {placedWords.length}
                </span>
              </div>
            ) : (
              <>
                <span className="border-b border-slate-300 pb-0.5 tracking-wide">
                  Name: <span className="inline-block w-28 sm:w-36 border-b border-slate-400"></span>
                </span>
                <span className="border-b border-slate-300 pb-0.5 tracking-wide hidden xs:inline-block">
                  Date: <span className="inline-block w-20 sm:w-24 border-b border-slate-400"></span>
                </span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500">
          <p className="italic text-slate-400">
            {isAnswerKey
              ? 'Highlighted letter cells indicate word positions and paths.'
              : 'Find and circle all of the hidden words in the puzzle grid!'}
          </p>
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-md text-[11px]">
              {gridSize}×{gridSize} • {difficultyLabels[difficulty]}
            </span>
          </div>
        </div>
      </div>

      {/* Main Puzzle Grid */}
      <div className="flex-1 flex flex-col items-center justify-center my-2">
        <div className="inline-block border-2 sm:border-3 border-slate-800 rounded-xl overflow-hidden shadow-sm bg-white p-1 sm:p-1.5">
          <div
            className="grid gap-1 sm:gap-1.5"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
            }}
          >
            {grid.map((row, r) =>
              row.map((char, c) => {
                const key = `${r},${c}`;
                const isSolution = isAnswerKey && solutionCoords.has(key);
                const isFirstLetter = !isAnswerKey && highlightFirstLetter && firstLetterCoords.has(key);

                return (
                  <div
                    key={`cell-${r}-${c}`}
                    className={`flex items-center justify-center font-mono select-none rounded-md transition-colors ${cellSizeClass} ${
                      isSolution
                        ? 'bg-amber-300 font-black text-slate-950 border border-amber-500 shadow-2xs print:bg-slate-200'
                        : isFirstLetter
                        ? 'bg-emerald-100 font-black text-emerald-950 border border-emerald-400'
                        : 'bg-slate-50/50 text-slate-800 border border-slate-200/80 hover:bg-amber-50/40 print:bg-white print:border-slate-300'
                    }`}
                  >
                    <span>{char}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Word List / Word Bank Section */}
      {showWordList && (
        <div className="mt-3 pt-3 border-t-2 border-dashed border-amber-200/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 font-display">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              Word Bank ({placedWords.length} Words to Find)
            </span>
            {highlightFirstLetter && !isAnswerKey && (
              <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Green cells = word start letters
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-1.5 text-xs sm:text-sm font-mono">
            {placedWords.map((p, idx) => (
              <div
                key={`word-${idx}`}
                className="flex items-center gap-2 p-1 rounded-md text-slate-700 font-medium"
              >
                <span className="w-3.5 h-3.5 border-2 border-slate-400 rounded-sm shrink-0 inline-block print:border-slate-500"></span>
                <span className="tracking-wider font-semibold">
                  {worksheet.uppercase ? p.word.toUpperCase() : p.word.toLowerCase()}
                </span>
                {isAnswerKey && (
                  <span className="text-[10px] text-slate-400 font-sans ml-auto italic">
                    {p.directionName}
                  </span>
                )}
              </div>
            ))}
          </div>

          {unplacedWords.length > 0 && (
            <div className="mt-2 text-[11px] text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-200">
              Note: The following words were too long for this grid size: {unplacedWords.join(', ')}
            </div>
          )}
        </div>
      )}

      {/* Mandatory Footer on Every Worksheet Page and Answer Key Page */}
      {/* Must appear in live preview and in printed/PDF output, small, light-gray centered */}
      <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 select-none">
        <div className="flex items-center gap-1.5">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isAnswerKey ? 'bg-emerald-500' : 'bg-amber-400'
            }`}
          ></span>
          <span>{isAnswerKey ? 'Official Answer Key' : 'Spelling & Vocabulary Search'}</span>
        </div>
        <div className="text-center font-mono font-medium tracking-wider text-slate-400">
          {footerText}
        </div>
        <div className="text-right font-mono">
          {isAnswerKey ? 'Page 2 (Key)' : 'Page 1 (Puzzle)'}
        </div>
      </div>
    </div>
  );
};
