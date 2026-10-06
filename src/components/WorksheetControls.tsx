import React from 'react';
import {
  WorksheetConfig,
  LetterCase,
  FontStyle,
  LetterSize,
} from '../utils/worksheetGenerator';
import {
  Printer,
  Sparkles,
  Type,
  RotateCcw,
  Sliders,
  Check,
  Compass,
  AlignLeft,
} from 'lucide-react';

interface WorksheetControlsProps {
  config: WorksheetConfig;
  onChange: (updated: Partial<WorksheetConfig>) => void;
  onReset: () => void;
  onPrint: () => void;
}

const PRESET_NAMES = ['Emma', 'Liam', 'Sophia', 'Noah', 'Oliver', 'Mia', 'Lucas'];

export const WorksheetControls: React.FC<WorksheetControlsProps> = ({
  config,
  onChange,
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
            Customization Panel
          </div>
          <h2 className="text-xl font-bold font-display text-slate-800">
            Customize Child's Worksheet
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

      {/* Child Name Input with Character Limit & Presets */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label htmlFor="child-name-input" className="block text-sm font-bold text-slate-700">
            Child's Name <span className="text-amber-500">*</span>
          </label>
          <span className="text-xs text-slate-400 font-mono">
            {config.text.length}/15 characters
          </span>
        </div>

        <div className="relative">
          <input
            id="child-name-input"
            type="text"
            maxLength={15}
            value={config.text}
            onChange={(e) => onChange({ text: e.target.value })}
            placeholder="e.g. Emma"
            className="w-full px-4 py-3 text-lg font-medium text-slate-800 bg-amber-50/50 border-2 border-amber-200 focus:border-amber-500 focus:bg-white rounded-2xl outline-none transition-all placeholder:text-slate-400"
          />
          {config.text.length > 0 && (
            <button
              onClick={() => onChange({ text: '' })}
              type="button"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs bg-slate-200 hover:bg-slate-300 text-slate-600 px-2 py-1 rounded-full cursor-pointer transition-colors"
            >
              Clear
            </button>
          )}
        </div>

        {/* Quick Sample Names */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs text-slate-500 flex items-center gap-1 font-medium mr-1">
            <Sparkles className="w-3 h-3 text-amber-500" /> Try a sample:
          </span>
          {PRESET_NAMES.map((sample) => (
            <button
              key={sample}
              type="button"
              onClick={() => onChange({ text: sample })}
              className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                config.text.toLowerCase() === sample.toLowerCase()
                  ? 'bg-amber-500 text-white border-amber-500 font-medium'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-amber-300 hover:bg-amber-50/60'
              }`}
            >
              {sample}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Customization Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
        {/* Letter Case Option */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Letter Case
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'as-typed', label: 'As Typed', desc: 'Aa' },
              { id: 'uppercase', label: 'Uppercase', desc: 'AA' },
              { id: 'lowercase', label: 'Lowercase', desc: 'aa' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onChange({ letterCase: item.id as LetterCase })}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  config.letterCase === item.id
                    ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-sm font-semibold'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-amber-200 hover:bg-slate-50/50'
                }`}
              >
                <span className="text-sm font-bold">{item.desc}</span>
                <span className="text-[11px] text-slate-500 mt-0.5">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Font Style Option (Print, Cursive, Dotted outline) */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Font Style
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'print', label: 'Print', fontClass: 'font-school-print' },
              { id: 'cursive', label: 'Cursive', fontClass: 'font-school-cursive' },
              { id: 'dotted', label: 'Dotted Outline', fontClass: 'font-school-print border-dashed' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onChange({ fontStyle: item.id as FontStyle })}
                className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all cursor-pointer ${
                  config.fontStyle === item.id
                    ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-sm font-semibold'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-amber-200 hover:bg-slate-50/50'
                }`}
              >
                <span className={`text-base font-bold ${item.fontClass}`}>
                  {item.id === 'dotted' ? '◌ Abc' : 'Abc'}
                </span>
                <span className="text-[11px] text-slate-500 mt-0.5">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Letter Size Option */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Letter Size
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'small', label: 'Small', sub: '1st Grade' },
              { id: 'medium', label: 'Medium', sub: 'Kindergarten' },
              { id: 'large', label: 'Large', sub: 'Preschool' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onChange({ letterSize: item.id as LetterSize })}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  config.letterSize === item.id
                    ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-sm font-semibold'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-amber-200 hover:bg-slate-50/50'
                }`}
              >
                <span className="text-sm font-bold">{item.label}</span>
                <span className="text-[10px] text-slate-400">{item.sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Repeat Count (3 to 10 rows) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Repeat Count ({config.repeatCount} Rows)
            </label>
            <span className="text-xs text-amber-700 font-semibold bg-amber-100/60 px-2 py-0.5 rounded-md">
              {config.repeatCount} practice rows
            </span>
          </div>
          <div className="flex items-center gap-3 bg-amber-50/50 p-2.5 rounded-xl border border-amber-200/70">
            <input
              type="range"
              min={3}
              max={10}
              step={1}
              value={config.repeatCount}
              onChange={(e) => onChange({ repeatCount: parseInt(e.target.value, 10) })}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={config.repeatCount <= 3}
                onClick={() => onChange({ repeatCount: Math.max(3, config.repeatCount - 1) })}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600 font-bold hover:bg-amber-50 disabled:opacity-40 cursor-pointer"
              >
                -
              </button>
              <span className="w-5 text-center text-sm font-bold text-slate-700">
                {config.repeatCount}
              </span>
              <button
                type="button"
                disabled={config.repeatCount >= 10}
                onClick={() => onChange({ repeatCount: Math.min(10, config.repeatCount + 1) })}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600 font-bold hover:bg-amber-50 disabled:opacity-40 cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Guide Lines & Starting Arrows Toggles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
        {/* Show Guide Lines */}
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

        {/* Show Starting Arrows */}
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
              <span className="text-[11px] text-slate-500">Directional pencil cues</span>
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
          Page format: Standard 8.5" x 11" Letter & A4 compatible
        </span>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1 text-slate-500 hover:text-amber-600 transition-colors cursor-pointer py-1 px-2 rounded-lg hover:bg-amber-50"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Settings</span>
        </button>
      </div>
    </div>
  );
};
