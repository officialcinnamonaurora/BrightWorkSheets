import React, { useMemo } from 'react';
import {
  WordSearchConfig,
  WordSearchGridSize,
  WordSearchDifficulty,
  READY_MADE_WORD_LISTS,
  parseWordList,
} from '../utils/wordSearchGenerator';
import {
  Printer,
  Sparkles,
  Sliders,
  RotateCcw,
  RefreshCw,
  Check,
  Search,
  AlertTriangle,
  BookOpen,
} from 'lucide-react';

interface WordSearchControlsProps {
  config: WordSearchConfig;
  onChange: (updated: Partial<WordSearchConfig>) => void;
  onGenerateNew: () => void;
  onReset: () => void;
  onPrint: () => void;
}

export const WordSearchControls: React.FC<WordSearchControlsProps> = ({
  config,
  onChange,
  onGenerateNew,
  onReset,
  onPrint,
}) => {
  // Live validation of user words
  const { validWords, invalidWords } = useMemo(() => {
    return parseWordList(config.wordsText);
  }, [config.wordsText]);

  const handleLoadList = (theme: string) => {
    const list = READY_MADE_WORD_LISTS[theme];
    if (list) {
      onChange({
        wordsText: list.join('\n'),
        title: `${theme} Word Search`,
      });
      setTimeout(onGenerateNew, 10);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-amber-200/80 p-5 sm:p-7 shadow-lg shadow-amber-900/5 space-y-6">
      {/* Primary Action Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-amber-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-100/70 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-1">
            <Sliders className="w-3.5 h-3.5 text-amber-600" />
            Word Search Puzzle Maker
          </div>
          <h2 className="text-xl font-bold font-display text-slate-800">
            Customize Word Search
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onGenerateNew}
            type="button"
            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-sm shadow-2xs transition-all cursor-pointer"
            title="Reshuffle word placements in grid"
          >
            <RefreshCw className="w-4 h-4 text-amber-700" />
            <span>Reshuffle</span>
          </button>

          <button
            onClick={onPrint}
            type="button"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Ready-Made Kid-Friendly Word Lists */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Quick Ready-Made Word Themes
          </label>
          <span className="text-[11px] text-amber-700 font-medium">1-Click load</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {Object.keys(READY_MADE_WORD_LISTS).map((theme) => (
            <button
              key={theme}
              type="button"
              onClick={() => handleLoadList(theme)}
              className="text-xs px-2.5 py-1.5 rounded-xl border border-amber-200 bg-amber-50/70 hover:bg-amber-100 text-amber-900 font-medium transition-all cursor-pointer hover:scale-102"
            >
              {theme}
            </button>
          ))}
        </div>
      </div>

      {/* Title & Word Input Area */}
      <div className="space-y-4">
        {/* Puzzle Title Field */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            Puzzle Title
          </label>
          <input
            type="text"
            maxLength={35}
            value={config.title}
            onChange={(e) => onChange({ title: e.target.value })}
            placeholder="Word Search"
            className="w-full px-3.5 py-2.5 bg-amber-50/40 border border-amber-200 rounded-xl text-sm font-semibold text-slate-800 focus:border-amber-500 outline-none"
          />
        </div>

        {/* Text Area for Words */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Your Words (One per line or comma-separated)
            </label>
            <span
              className={`text-xs font-mono font-bold ${
                validWords.length > 20 ? 'text-rose-600' : 'text-slate-500'
              }`}
            >
              {validWords.length}/20 words
            </span>
          </div>

          <textarea
            rows={4}
            value={config.wordsText}
            onChange={(e) => onChange({ wordsText: e.target.value })}
            placeholder="ELEPHANT&#10;GIRAFFE&#10;DOLPHIN&#10;KANGAROO"
            className="w-full p-3 font-mono text-sm bg-amber-50/40 border border-amber-200 rounded-2xl text-slate-800 focus:border-amber-500 outline-none resize-none leading-relaxed"
          ></textarea>

          {/* Validation Warnings */}
          {invalidWords.length > 0 && (
            <div className="mt-2 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Notice: Some entries need adjustments:</span>
              </div>
              <ul className="list-disc list-inside space-y-0.5 pl-1 text-[11px]">
                {invalidWords.slice(0, 3).map((item, i) => (
                  <li key={i}>
                    <strong>"{item.word}"</strong>: {item.reason}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Grid Size & Difficulty */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Grid Size */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Grid Size
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { size: 10, label: '10×10', sub: 'Easy' },
              { size: 12, label: '12×12', sub: 'Medium' },
              { size: 15, label: '15×15', sub: 'Hard' },
            ].map((item) => (
              <button
                key={`grid-${item.size}`}
                type="button"
                onClick={() => {
                  onChange({ gridSize: item.size as WordSearchGridSize });
                  setTimeout(onGenerateNew, 10);
                }}
                className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all cursor-pointer ${
                  config.gridSize === item.size
                    ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-sm font-semibold'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-amber-200 hover:bg-slate-50'
                }`}
              >
                <span className="text-xs font-bold font-mono">{item.label}</span>
                <span className="text-[10px] text-slate-400">{item.sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Word Directions
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'easy', label: 'Easy', sub: '➔ & ⬇ only' },
              { id: 'medium', label: 'Medium', sub: '+ Diagonals' },
              { id: 'hard', label: 'Hard', sub: 'All 8 (Backwards)' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onChange({ difficulty: item.id as WordSearchDifficulty });
                  setTimeout(onGenerateNew, 10);
                }}
                className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all cursor-pointer ${
                  config.difficulty === item.id
                    ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-sm font-semibold'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-amber-200 hover:bg-slate-50'
                }`}
              >
                <span className="text-xs font-bold">{item.label}</span>
                <span className="text-[10px] text-slate-400 truncate w-full">{item.sub}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Options Toggles */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
          Display & Styling Options
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Show Word List */}
          <label
            className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer select-none transition-all ${
              config.showWordList
                ? 'bg-amber-50/70 border-amber-300 text-amber-900'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                  config.showWordList
                    ? 'bg-amber-500 border-amber-500 text-white'
                    : 'bg-white border-slate-300 text-transparent'
                }`}
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <div>
                <span className="text-sm font-bold block">Word Bank</span>
                <span className="text-[11px] text-slate-500">Display words below puzzle</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={config.showWordList}
              onChange={(e) => onChange({ showWordList: e.target.checked })}
              className="sr-only"
            />
          </label>

          {/* Highlight First Letter */}
          <label
            className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer select-none transition-all ${
              config.highlightFirstLetter
                ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                  config.highlightFirstLetter
                    ? 'bg-emerald-500 border-emerald-500 text-white'
                    : 'bg-white border-slate-300 text-transparent'
                }`}
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <div>
                <span className="text-sm font-bold block">Hint First Letters</span>
                <span className="text-[11px] text-slate-500">Highlights word start points</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={config.highlightFirstLetter}
              onChange={(e) => onChange({ highlightFirstLetter: e.target.checked })}
              className="sr-only"
            />
          </label>

          {/* Uppercase Letters */}
          <label
            className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer select-none transition-all ${
              config.uppercase
                ? 'bg-sky-50/70 border-sky-300 text-sky-900'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                  config.uppercase
                    ? 'bg-sky-500 border-sky-500 text-white'
                    : 'bg-white border-slate-300 text-transparent'
                }`}
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <div>
                <span className="text-sm font-bold block">Uppercase Grid</span>
                <span className="text-[11px] text-slate-500">ALL CAPS (easier to read)</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={config.uppercase}
              onChange={(e) => onChange({ uppercase: e.target.checked })}
              className="sr-only"
            />
          </label>

          {/* Show Answer Key */}
          <label
            className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer select-none transition-all ${
              config.showAnswerKey
                ? 'bg-purple-50/70 border-purple-300 text-purple-900'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                  config.showAnswerKey
                    ? 'bg-purple-500 border-purple-500 text-white'
                    : 'bg-white border-slate-300 text-transparent'
                }`}
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <div>
                <span className="text-sm font-bold block">Include Answer Key</span>
                <span className="text-[11px] text-slate-500">Highlighted solution page</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={config.showAnswerKey}
              onChange={(e) => onChange({ showAnswerKey: e.target.checked })}
              className="sr-only"
            />
          </label>
        </div>
      </div>

      {/* Footer Info & Reset */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          Kid-friendly thick borders & high print clarity
        </span>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1 text-slate-500 hover:text-amber-600 transition-colors cursor-pointer py-1 px-2 rounded-lg hover:bg-amber-50"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>
    </div>
  );
};
