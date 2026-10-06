import React, { useState } from 'react';
import {
  NumberConfig,
  NumberRangePreset,
  NumberFontStyle,
  CountObjectShape,
  LetterSize,
} from '../utils/worksheetGenerator';
import {
  Printer,
  Sparkles,
  Sliders,
  RotateCcw,
  Check,
  Hash,
  Star,
  Circle,
  FileCheck,
  Filter,
} from 'lucide-react';

interface NumberControlsProps {
  config: NumberConfig;
  onChange: (updated: Partial<NumberConfig>) => void;
  onReset: () => void;
  onPrint: () => void;
  totalPages: number;
}

export const NumberControls: React.FC<NumberControlsProps> = ({
  config,
  onChange,
  onReset,
  onPrint,
  totalPages,
}) => {
  const [showSingleNumberPicker, setShowSingleNumberPicker] = useState(false);

  const handlePickSingle = (num: number) => {
    onChange({
      rangePreset: 'custom',
      startNumber: num,
      endNumber: num,
    });
    setShowSingleNumberPicker(false);
  };

  return (
    <div className="bg-white rounded-3xl border border-amber-200/80 p-5 sm:p-7 shadow-lg shadow-amber-900/5 space-y-6">
      {/* Primary Action Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-amber-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-100/70 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-1">
            <Sliders className="w-3.5 h-3.5 text-amber-600" />
            Number Worksheet Options
          </div>
          <h2 className="text-xl font-bold font-display text-slate-800">
            Customize Number Worksheet
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

      {/* Quick Action Buttons */}
      <div className="bg-amber-50/70 p-3.5 rounded-2xl border border-amber-200/70 space-y-2.5">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          Quick Actions
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => {
              onChange({ rangePreset: '0-10' });
              setTimeout(() => onPrint(), 100);
            }}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white border border-amber-300 text-amber-900 font-bold text-xs hover:bg-amber-100/80 shadow-2xs transition-all cursor-pointer"
          >
            <FileCheck className="w-4 h-4 text-amber-600" />
            <span>Print 0–10 Practice Set</span>
          </button>

          <button
            type="button"
            onClick={() => setShowSingleNumberPicker(!showSingleNumberPicker)}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white border border-amber-300 text-amber-900 font-bold text-xs hover:bg-amber-100/80 shadow-2xs transition-all cursor-pointer"
          >
            <Filter className="w-4 h-4 text-amber-600" />
            <span>Print one number only...</span>
          </button>
        </div>

        {/* Single Number Picker Dropdown Grid */}
        {showSingleNumberPicker && (
          <div className="pt-2 border-t border-amber-200">
            <span className="text-[11px] font-semibold text-slate-600 block mb-2">
              Select which number to isolate and print:
            </span>
            <div className="grid grid-cols-7 sm:grid-cols-11 gap-1.5 max-h-36 overflow-y-auto p-1 bg-white rounded-xl border border-slate-200">
              {Array.from({ length: 21 }).map((_, i) => (
                <button
                  key={`pick-single-${i}`}
                  type="button"
                  onClick={() => handlePickSingle(i)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                    config.rangePreset === 'custom' &&
                    config.startNumber === i &&
                    config.endNumber === i
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-slate-50 hover:bg-amber-100 text-slate-700'
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Option 1: Number Range (0-10, 0-20, 1-50, 1-100, or Custom) */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
          Number Range
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {[
            { id: '0-10', label: '0 to 10', sub: 'Preschool' },
            { id: '0-20', label: '0 to 20', sub: 'Kindergarten' },
            { id: '1-50', label: '1 to 50', sub: '1st Grade' },
            { id: '1-100', label: '1 to 100', sub: 'Mastery' },
            { id: 'custom', label: 'Custom', sub: 'Your choice' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange({ rangePreset: item.id as NumberRangePreset })}
              className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all cursor-pointer ${
                config.rangePreset === item.id
                  ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-sm font-semibold'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-amber-200 hover:bg-slate-50/50'
              }`}
            >
              <span className="text-xs font-bold">{item.label}</span>
              <span className="text-[10px] text-slate-400">{item.sub}</span>
            </button>
          ))}
        </div>

        {/* Custom Start & End Inputs if Custom selected */}
        {config.rangePreset === 'custom' && (
          <div className="grid grid-cols-2 gap-3 bg-amber-50/40 p-3 rounded-2xl border border-amber-200/70 mt-2">
            <div>
              <span className="text-xs font-semibold text-slate-600 block mb-1">
                Start Number (0–100):
              </span>
              <input
                type="number"
                min={0}
                max={100}
                value={config.startNumber}
                onChange={(e) =>
                  onChange({
                    startNumber: Math.max(0, Math.min(100, parseInt(e.target.value, 10) || 0)),
                  })
                }
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:border-amber-500 outline-none"
              />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-600 block mb-1">
                End Number (0–100):
              </span>
              <input
                type="number"
                min={0}
                max={100}
                value={config.endNumber}
                onChange={(e) =>
                  onChange({
                    endNumber: Math.max(0, Math.min(100, parseInt(e.target.value, 10) || 0)),
                  })
                }
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:border-amber-500 outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* Grid of Font Style & Number Size */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Option 2: Font Style (Print / Dotted outline) */}
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
                onClick={() => onChange({ fontStyle: item.id as NumberFontStyle })}
                className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all cursor-pointer ${
                  config.fontStyle === item.id
                    ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-sm font-semibold'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-amber-200 hover:bg-slate-50/50'
                }`}
              >
                <span className={`text-base font-bold ${item.styleClass}`}>
                  {item.id === 'dotted' ? '◌ 123' : '123'}
                </span>
                <span className="text-[11px] text-slate-500 mt-0.5">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Option 3: Number Size (Small / Medium / Large) */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Number Size
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'small', label: 'Small', sub: '7-8/pg' },
              { id: 'medium', label: 'Medium', sub: '6-7/pg' },
              { id: 'large', label: 'Large', sub: '5-6/pg' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onChange({ numberSize: item.id as LetterSize })}
                className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all cursor-pointer ${
                  config.numberSize === item.id
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

      {/* Option 4: Count the Objects Toggle & Shape Choice */}
      <div className="bg-amber-50/50 p-3.5 rounded-2xl border border-amber-200/80 space-y-3">
        <label className="flex items-center justify-between cursor-pointer select-none">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                config.countObjects
                  ? 'bg-amber-500 border-amber-500 text-white'
                  : 'bg-white border-slate-300 text-transparent'
              }`}
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <div>
              <span className="text-sm font-bold block text-slate-800">
                Count the Objects Row
              </span>
              <span className="text-[11px] text-slate-500">
                Draws counted stars/circles matching the number value
              </span>
            </div>
          </div>
          <input
            type="checkbox"
            checked={config.countObjects}
            onChange={(e) => onChange({ countObjects: e.target.checked })}
            className="sr-only"
          />
        </label>

        {config.countObjects && (
          <div className="flex items-center justify-between pt-2 border-t border-amber-200 text-xs">
            <span className="font-semibold text-slate-600">Counting Shape:</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onChange({ objectShape: 'star' })}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg border font-bold cursor-pointer transition-all ${
                  (config.objectShape || 'star') === 'star'
                    ? 'bg-amber-500 text-white border-amber-500'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-amber-50'
                }`}
              >
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>Stars</span>
              </button>
              <button
                type="button"
                onClick={() => onChange({ objectShape: 'circle' })}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg border font-bold cursor-pointer transition-all ${
                  config.objectShape === 'circle'
                    ? 'bg-amber-500 text-white border-amber-500'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-amber-50'
                }`}
              >
                <Circle className="w-3.5 h-3.5 fill-current" />
                <span>Circles</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Option 5 & 6: Guidelines & Starting Arrows */}
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
              <span className="text-[11px] text-slate-500">Top-to-bottom stroke cues</span>
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
