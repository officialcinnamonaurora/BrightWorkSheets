import React from 'react';
import {
  MathConfig,
  MathOperation,
  MathDifficultyPreset,
  MathLayout,
  MathProblemCount,
} from '../utils/mathGenerator';
import {
  Printer,
  Sparkles,
  Sliders,
  RotateCcw,
  RefreshCw,
  Check,
  Eye,
  KeyRound,
  Divide,
  Plus,
  Minus,
  X,
  Layers,
} from 'lucide-react';

interface MathControlsProps {
  config: MathConfig;
  onChange: (updated: Partial<MathConfig>) => void;
  onGenerateNew: () => void;
  onReset: () => void;
  onPrint: () => void;
}

export const MathControls: React.FC<MathControlsProps> = ({
  config,
  onChange,
  onGenerateNew,
  onReset,
  onPrint,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-amber-200/80 p-5 sm:p-7 shadow-lg shadow-amber-900/5 space-y-6">
      {/* Primary Action Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-amber-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-100/70 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-1">
            <Sliders className="w-3.5 h-3.5 text-amber-600" />
            Math Generator Controls
          </div>
          <h2 className="text-xl font-bold font-display text-slate-800">
            Customize Math Drills
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onGenerateNew}
            type="button"
            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-sm shadow-2xs transition-all cursor-pointer"
            title="Generate fresh non-duplicate math problems"
          >
            <RefreshCw className="w-4 h-4 text-amber-700" />
            <span>New Problems</span>
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

      {/* Option 1: Operation Selection */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
          Math Operation
        </label>
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
          {[
            { id: 'addition', label: 'Addition', icon: '+' },
            { id: 'subtraction', label: 'Subtract', icon: '−' },
            { id: 'multiplication', label: 'Multiply', icon: '×' },
            { id: 'division', label: 'Division', icon: '÷' },
            { id: 'mixed', label: 'Mixed', icon: '+/−' },
          ].map((op) => (
            <button
              key={op.id}
              type="button"
              onClick={() => {
                onChange({ operation: op.id as MathOperation });
                setTimeout(onGenerateNew, 10);
              }}
              className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all cursor-pointer ${
                config.operation === op.id
                  ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-sm font-semibold'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-amber-200 hover:bg-slate-50/50'
              }`}
            >
              <span className="text-base font-bold font-mono">{op.icon}</span>
              <span className="text-[11px] text-slate-500 mt-0.5 truncate w-full">
                {op.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Option 2: Difficulty Presets */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
          Difficulty Level
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {[
            { id: 'grade-1', label: 'Grade 1', sub: 'To 10' },
            { id: 'grade-2', label: 'Grade 2', sub: 'To 20' },
            { id: 'grade-3', label: 'Grade 3', sub: 'To 100' },
            { id: 'grade-4', label: 'Grade 4', sub: 'To 1,000' },
            { id: 'custom', label: 'Custom', sub: 'Range' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onChange({ difficulty: item.id as MathDifficultyPreset });
                setTimeout(onGenerateNew, 10);
              }}
              className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all cursor-pointer ${
                config.difficulty === item.id
                  ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-sm font-semibold'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-amber-200 hover:bg-slate-50/50'
              }`}
            >
              <span className="text-xs font-bold">{item.label}</span>
              <span className="text-[10px] text-slate-400">{item.sub}</span>
            </button>
          ))}
        </div>

        {/* Custom Min / Max inputs if Custom selected */}
        {config.difficulty === 'custom' && (
          <div className="grid grid-cols-2 gap-3 bg-amber-50/40 p-3 rounded-2xl border border-amber-200/70 mt-2">
            <div>
              <span className="text-xs font-semibold text-slate-600 block mb-1">
                Minimum Number:
              </span>
              <input
                type="number"
                min={0}
                max={999}
                value={config.customMin}
                onChange={(e) =>
                  onChange({
                    customMin: Math.max(0, parseInt(e.target.value, 10) || 0),
                  })
                }
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:border-amber-500 outline-none"
              />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-600 block mb-1">
                Maximum Number:
              </span>
              <input
                type="number"
                min={1}
                max={1000}
                value={config.customMax}
                onChange={(e) =>
                  onChange({
                    customMax: Math.max(1, parseInt(e.target.value, 10) || 10),
                  })
                }
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:border-amber-500 outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* Multiplication Focus: Times table of selector (2-12 or All) */}
      {(config.operation === 'multiplication' || config.operation === 'mixed') && (
        <div className="bg-amber-50/50 p-3.5 rounded-2xl border border-amber-200/80 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
              Times Table Focus
            </span>
            <span className="text-[11px] text-amber-700 font-medium">
              {config.timesTableFocus === 'all'
                ? 'All multiplication tables'
                : `Focusing on ${config.timesTableFocus}× table`}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <button
              type="button"
              onClick={() => {
                onChange({ timesTableFocus: 'all' });
                setTimeout(onGenerateNew, 10);
              }}
              className={`text-xs px-2.5 py-1 rounded-lg border font-bold cursor-pointer transition-all ${
                config.timesTableFocus === 'all'
                  ? 'bg-amber-500 text-white border-amber-500 shadow-2xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-amber-50'
              }`}
            >
              All Tables
            </button>

            {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
              <button
                key={`tt-${num}`}
                type="button"
                onClick={() => {
                  onChange({ timesTableFocus: num });
                  setTimeout(onGenerateNew, 10);
                }}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs font-bold border cursor-pointer transition-all flex items-center justify-center ${
                  config.timesTableFocus === num
                    ? 'bg-amber-500 text-white border-amber-500 shadow-2xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-amber-50'
                }`}
              >
                {num}×
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Grid of Problem Count & Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Number of Problems: 10, 15, 20, 30 */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Number of Problems
          </label>
          <div className="grid grid-cols-4 gap-1.5">
            {[10, 15, 20, 30].map((count) => (
              <button
                key={`count-${count}`}
                type="button"
                onClick={() => {
                  onChange({ problemCount: count as MathProblemCount });
                  setTimeout(onGenerateNew, 10);
                }}
                className={`py-2 rounded-xl border text-center transition-all cursor-pointer font-bold text-xs ${
                  config.problemCount === count
                    ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-sm'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {count}
              </button>
            ))}
          </div>
        </div>

        {/* Layout: Vertical (stacked) or Horizontal (inline) */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Layout Style
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'vertical', label: 'Vertical (Stacked)' },
              { id: 'horizontal', label: 'Horizontal (Inline)' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onChange({ layout: item.id as MathLayout })}
                className={`py-2 px-2 rounded-xl border text-center transition-all cursor-pointer font-bold text-xs ${
                  config.layout === item.id
                    ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-sm'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Arithmetic Rules Toggles */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
          Math Rules & Settings
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Allow Regrouping / Borrowing */}
          <label
            className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer select-none transition-all ${
              config.allowRegrouping
                ? 'bg-amber-50/70 border-amber-300 text-amber-900'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                  config.allowRegrouping
                    ? 'bg-amber-500 border-amber-500 text-white'
                    : 'bg-white border-slate-300 text-transparent'
                }`}
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <div>
                <span className="text-sm font-bold block">Allow Regrouping</span>
                <span className="text-[11px] text-slate-500">Carrying & borrowing</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={config.allowRegrouping}
              onChange={(e) => {
                onChange({ allowRegrouping: e.target.checked });
                setTimeout(onGenerateNew, 10);
              }}
              className="sr-only"
            />
          </label>

          {/* Show Answer Key Page */}
          <label
            className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer select-none transition-all ${
              config.showAnswerKey
                ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                  config.showAnswerKey
                    ? 'bg-emerald-500 border-emerald-500 text-white'
                    : 'bg-white border-slate-300 text-transparent'
                }`}
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <div>
                <span className="text-sm font-bold block">Include Answer Key</span>
                <span className="text-[11px] text-slate-500">Separate solutions page</span>
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

        {/* Division & Subtraction constraints info pill */}
        <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-500">
          <span className="inline-flex items-center gap-1">
            <Check className="w-3 h-3 text-emerald-500" /> No negative answers on subtraction
          </span>
          <span className="inline-flex items-center gap-1">
            <Check className="w-3 h-3 text-emerald-500" /> Whole-number division only
          </span>
        </div>
      </div>

      {/* Footer Info & Reset */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          Standard 8.5" x 11" Letter & A4 compatible
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
