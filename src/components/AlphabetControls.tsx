import React, { useState } from 'react';
import {
  AlphabetConfig,
  AlphabetLetterCase,
  AlphabetFontStyle,
  LetterSize,
} from '../utils/worksheetGenerator';
import {
  Printer,
  Sparkles,
  Sliders,
  RotateCcw,
  Check,
  BookOpen,
  Filter,
  FileCheck,
} from 'lucide-react';

const ALPHABET_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

interface AlphabetControlsProps {
  config: AlphabetConfig;
  onChange: (updated: Partial<AlphabetConfig>) => void;
  onReset: () => void;
  onPrint: () => void;
  onPrintFullSet: () => void;
  onSelectSingleLetter: (letter: string) => void;
  totalPages: number;
}

export const AlphabetControls: React.FC<AlphabetControlsProps> = ({
  config,
  onChange,
  onReset,
  onPrint,
  onPrintFullSet,
  onSelectSingleLetter,
  totalPages,
}) => {
  const [showSingleLetterPicker, setShowSingleLetterPicker] = useState(false);

  const handlePickSingle = (letter: string) => {
    onSelectSingleLetter(letter);
    setShowSingleLetterPicker(false);
  };

  return (
    <div className="bg-white rounded-3xl border border-amber-200/80 p-5 sm:p-7 shadow-lg shadow-amber-900/5 space-y-6">
      {/* Primary Action Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-amber-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-100/70 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-1">
            <Sliders className="w-3.5 h-3.5 text-amber-600" />
            Alphabet Worksheet Options
          </div>
          <h2 className="text-xl font-bold font-display text-slate-800">
            Customize A–Z Worksheet
          </h2>
        </div>

        <button
          onClick={onPrint}
          type="button"
          className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-base shadow-md hover:shadow-lg transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        >
          <Printer className="w-5 h-5" />
          <span>Print / Save as PDF</span>
        </button>
      </div>

      {/* Quick Action Buttons: "Print full A-Z set", "Print one letter only" */}
      <div className="bg-amber-50/70 p-3.5 rounded-2xl border border-amber-200/70 space-y-2.5">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          Quick Actions
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={onPrintFullSet}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white border border-amber-300 text-amber-900 font-bold text-xs hover:bg-amber-100/80 shadow-2xs transition-all cursor-pointer"
          >
            <FileCheck className="w-4 h-4 text-amber-600" />
            <span>Print full A–Z set ({totalPages} {totalPages === 1 ? 'page' : 'pages'})</span>
          </button>

          <button
            type="button"
            onClick={() => setShowSingleLetterPicker(!showSingleLetterPicker)}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white border border-amber-300 text-amber-900 font-bold text-xs hover:bg-amber-100/80 shadow-2xs transition-all cursor-pointer"
          >
            <Filter className="w-4 h-4 text-amber-600" />
            <span>Print one letter only...</span>
          </button>
        </div>

        {/* Single letter picker popdown */}
        {showSingleLetterPicker && (
          <div className="pt-2 border-t border-amber-200">
            <span className="text-[11px] font-semibold text-slate-600 block mb-2">
              Select which letter to isolate and print:
            </span>
            <div className="grid grid-cols-7 sm:grid-cols-9 gap-1.5 max-h-36 overflow-y-auto p-1 bg-white rounded-xl border border-slate-200">
              {ALPHABET_LETTERS.map((char) => (
                <button
                  key={char}
                  type="button"
                  onClick={() => handlePickSingle(char)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                    config.startLetter === char && config.endLetter === char
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-slate-50 hover:bg-amber-100 text-slate-700'
                  }`}
                >
                  {char}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Option 1: Letters (Uppercase / Lowercase / Both) */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
          Letter Case
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'uppercase', label: 'Uppercase', glyph: 'A B C' },
            { id: 'lowercase', label: 'Lowercase', glyph: 'a b c' },
            { id: 'both', label: 'Both', glyph: 'Aa Bb' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange({ letterCase: item.id as AlphabetLetterCase })}
              className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                config.letterCase === item.id
                  ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-sm font-semibold'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-amber-200 hover:bg-slate-50/50'
              }`}
            >
              <span className="text-sm font-bold">{item.glyph}</span>
              <span className="text-[11px] text-slate-500 mt-0.5">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Option 2: Range (A-Z or choose start and end letter) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Letter Range
          </label>
          <span className="text-xs text-amber-700 font-semibold bg-amber-100/60 px-2 py-0.5 rounded-md">
            Range: {config.startLetter} to {config.endLetter}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 bg-amber-50/40 p-3 rounded-2xl border border-amber-200/70">
          <div>
            <span className="text-xs font-semibold text-slate-600 block mb-1">Start Letter:</span>
            <select
              value={config.startLetter}
              onChange={(e) => onChange({ startLetter: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:border-amber-500 outline-none cursor-pointer"
            >
              {ALPHABET_LETTERS.map((letter) => (
                <option key={`start-${letter}`} value={letter}>
                  {letter}
                </option>
              ))}
            </select>
          </div>

          <div>
            <span className="text-xs font-semibold text-slate-600 block mb-1">End Letter:</span>
            <select
              value={config.endLetter}
              onChange={(e) => onChange({ endLetter: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:border-amber-500 outline-none cursor-pointer"
            >
              {ALPHABET_LETTERS.map((letter) => (
                <option key={`end-${letter}`} value={letter}>
                  {letter}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Range Presets */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs text-slate-400 font-medium mr-1">Presets:</span>
          {[
            { label: 'Full A–Z', start: 'A', end: 'Z' },
            { label: 'A–G (Page 1)', start: 'A', end: 'G' },
            { label: 'H–N (Page 2)', start: 'H', end: 'N' },
            { label: 'O–U (Page 3)', start: 'O', end: 'U' },
            { label: 'V–Z (Page 4)', start: 'V', end: 'Z' },
          ].map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => onChange({ startLetter: preset.start, endLetter: preset.end })}
              className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                config.startLetter === preset.start && config.endLetter === preset.end
                  ? 'bg-amber-500 text-white border-amber-500 font-medium'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-amber-300 hover:bg-amber-50/60'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Font Style & Letter Size */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Option 3: Font Style (Print / Dotted outline) */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Font Style
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'print', label: 'Print', styleClass: 'font-school-print' },
              { id: 'dotted', label: 'Dotted Outline', styleClass: 'font-school-print border-dashed' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onChange({ fontStyle: item.id as AlphabetFontStyle })}
                className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all cursor-pointer ${
                  config.fontStyle === item.id
                    ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-sm font-semibold'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-amber-200 hover:bg-slate-50/50'
                }`}
              >
                <span className={`text-base font-bold ${item.styleClass}`}>
                  {item.id === 'dotted' ? '◌ Abc' : 'Abc'}
                </span>
                <span className="text-[11px] text-slate-500 mt-0.5">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Option 4: Letter Size (Small / Medium / Large) */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Letter Size
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'small', label: 'Small', sub: '8/pg' },
              { id: 'medium', label: 'Medium', sub: '7/pg' },
              { id: 'large', label: 'Large', sub: '6/pg' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onChange({ letterSize: item.id as LetterSize })}
                className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all cursor-pointer ${
                  config.letterSize === item.id
                    ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-sm font-semibold'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-amber-200 hover:bg-slate-50/50'
                }`}
              >
                <span className="text-xs font-bold">{item.label}</span>
                <span className="text-[10px] text-slate-400">{item.sub}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Option 5 & 6: Show Guide Lines & Show Starting Arrows */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
        <label
          className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer select-none transition-all ${
            config.showGuideLines
              ? 'bg-sky-50/60 border-sky-300 text-sky-900'
              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                config.showGuideLines
                  ? 'bg-sky-500 border-sky-500 text-white'
                  : 'bg-white border-slate-300 text-transparent'
              }`}
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <div>
              <span className="text-sm font-bold block">Show Guide Lines</span>
              <span className="text-[11px] text-slate-500">3-line handwriting ruling</span>
            </div>
          </div>
          <input
            type="checkbox"
            checked={config.showGuideLines}
            onChange={(e) => onChange({ showGuideLines: e.target.checked })}
            className="sr-only"
          />
        </label>

        <label
          className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer select-none transition-all ${
            config.showStartingArrows
              ? 'bg-emerald-50/60 border-emerald-300 text-emerald-900'
              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                config.showStartingArrows
                  ? 'bg-emerald-500 border-emerald-500 text-white'
                  : 'bg-white border-slate-300 text-transparent'
              }`}
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <div>
              <span className="text-sm font-bold block">Starting Arrows & Dots</span>
              <span className="text-[11px] text-slate-500">Pencil stroke guidance</span>
            </div>
          </div>
          <input
            type="checkbox"
            checked={config.showStartingArrows}
            onChange={(e) => onChange({ showStartingArrows: e.target.checked })}
            className="sr-only"
          />
        </label>
      </div>

      {/* Footer Info & Reset */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          Auto-splits into {totalPages} {totalPages === 1 ? 'page' : 'pages'} (Letter & A4 ready)
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
