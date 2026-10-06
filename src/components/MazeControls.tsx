import React from 'react';
import {
  MazeConfig,
  MazeDifficulty,
  MazeShape,
  MazeTheme,
  MazePathWidth,
  MazeBatchCount,
} from '../utils/mazeGenerator';
import {
  Printer,
  Sparkles,
  Sliders,
  RotateCcw,
  RefreshCw,
  Check,
  Compass,
  Square,
  Circle,
  Hash,
  Heart,
  Star,
} from 'lucide-react';

interface MazeControlsProps {
  config: MazeConfig;
  onChange: (updated: Partial<MazeConfig>) => void;
  onGenerateNew: () => void;
  onReset: () => void;
  onPrint: () => void;
}

export const MazeControls: React.FC<MazeControlsProps> = ({
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
            Maze Generator Options
          </div>
          <h2 className="text-xl font-bold font-display text-slate-800">
            Customize Printable Maze
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onGenerateNew}
            type="button"
            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-sm shadow-2xs transition-all cursor-pointer"
            title="Create a new randomized maze puzzle"
          >
            <RefreshCw className="w-4 h-4 text-amber-700" />
            <span>New Maze</span>
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

      {/* Title Field */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
          Worksheet Title
        </label>
        <input
          type="text"
          maxLength={35}
          value={config.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="Find the Way"
          className="w-full px-3.5 py-2.5 bg-amber-50/40 border border-amber-200 rounded-xl text-sm font-semibold text-slate-800 focus:border-amber-500 outline-none"
        />
      </div>

      {/* Option 1: Difficulty Presets (8x8, 12x12, 18x18, 25x25, Custom) */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
          Difficulty & Grid Size
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {[
            { id: 'easy', label: 'Easy', sub: '8×8 (Preschool)' },
            { id: 'medium', label: 'Medium', sub: '12×12 (K–1st)' },
            { id: 'hard', label: 'Hard', sub: '18×18 (2nd–3rd)' },
            { id: 'expert', label: 'Expert', sub: '25×25 (4th+)' },
            { id: 'custom', label: 'Custom', sub: 'Size 5–30' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onChange({ difficulty: item.id as MazeDifficulty });
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

        {/* Custom Size Slider & Input */}
        {config.difficulty === 'custom' && (
          <div className="bg-amber-50/40 p-3 rounded-2xl border border-amber-200/70 mt-2 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>Grid Dimension: {config.customSize}×{config.customSize}</span>
              <span className="text-[11px] text-slate-400">(Min 5, Max 30)</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={5}
                max={30}
                value={config.customSize}
                onChange={(e) => {
                  onChange({ customSize: parseInt(e.target.value, 10) });
                  setTimeout(onGenerateNew, 20);
                }}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <span className="w-8 text-center font-mono font-bold text-sm text-slate-800">
                {config.customSize}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Grid of Maze Shape & Markers Theme */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Maze Shape: Square or Circle */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Maze Shape
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'square', label: 'Square', icon: Square },
              { id: 'circle', label: 'Circle', icon: Circle },
            ].map((shape) => {
              const Icon = shape.icon;
              return (
                <button
                  key={shape.id}
                  type="button"
                  onClick={() => {
                    onChange({ shape: shape.id as MazeShape });
                    setTimeout(onGenerateNew, 10);
                  }}
                  className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    config.shape === shape.id
                      ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-sm font-semibold'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-amber-200 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-bold">{shape.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Start / Finish Theme Markers */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Theme Markers
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'star-heart', label: 'Star → Heart' },
              { id: 'mouse-cheese', label: 'Mouse → Cheese' },
              { id: 'rocket-planet', label: 'Rocket → Planet' },
            ].map((th) => (
              <button
                key={th.id}
                type="button"
                onClick={() => onChange({ theme: th.id as MazeTheme })}
                className={`py-2 px-1 rounded-xl border text-center transition-all cursor-pointer font-bold text-xs truncate ${
                  config.theme === th.id
                    ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-sm'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-amber-200 hover:bg-slate-50'
                }`}
              >
                {th.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Path Width & Batch Count */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Path Width: Thin / Medium / Wide */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Path Width
            </label>
            <span className="text-[11px] text-amber-700 font-medium">Wide for young kids</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'thin', label: 'Thin' },
              { id: 'medium', label: 'Medium' },
              { id: 'wide', label: 'Wide' },
            ].map((pw) => (
              <button
                key={pw.id}
                type="button"
                onClick={() => onChange({ pathWidth: pw.id as MazePathWidth })}
                className={`py-2 rounded-xl border text-center transition-all cursor-pointer font-bold text-xs ${
                  config.pathWidth === pw.id
                    ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-sm'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-amber-200 hover:bg-slate-50'
                }`}
              >
                {pw.label}
              </button>
            ))}
          </div>
        </div>

        {/* Batch Option: 1, 2, or 4 mazes per page */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Mazes Per Page
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { count: 1, label: '1 Maze', sub: 'Centerpiece' },
              { count: 2, label: '2 Mazes', sub: 'Double' },
              { count: 4, label: '4 Mazes', sub: 'Mini Set' },
            ].map((b) => (
              <button
                key={`batch-${b.count}`}
                type="button"
                onClick={() => onChange({ batchCount: b.count as MazeBatchCount })}
                className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all cursor-pointer ${
                  config.batchCount === b.count
                    ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-sm font-semibold'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-amber-200 hover:bg-slate-50'
                }`}
              >
                <span className="text-xs font-bold">{b.label}</span>
                <span className="text-[10px] text-slate-400">{b.sub}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Seed Recreation & Show Solution Toggle */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Seed Input for Recreation */}
          <div className="bg-slate-50/70 p-3 rounded-2xl border border-slate-200 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <Hash className="w-3.5 h-3.5 text-amber-600" />
                Seed Number
              </span>
              <button
                type="button"
                onClick={onGenerateNew}
                className="text-[11px] text-amber-700 hover:text-amber-800 font-bold cursor-pointer"
              >
                Randomize
              </button>
            </div>
            <input
              type="number"
              value={config.seed}
              onChange={(e) => {
                const s = parseInt(e.target.value, 10) || 1;
                onChange({ seed: s });
              }}
              className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-800 focus:border-amber-500 outline-none"
            />
          </div>

          {/* Show Solution Toggle */}
          <label
            className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer select-none transition-all ${
              config.showSolution
                ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                  config.showSolution
                    ? 'bg-emerald-500 border-emerald-500 text-white'
                    : 'bg-white border-slate-300 text-transparent'
                }`}
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <div>
                <span className="text-sm font-bold block">Include Solution</span>
                <span className="text-[11px] text-slate-500">Color path solution page</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={config.showSolution}
              onChange={(e) => onChange({ showSolution: e.target.checked })}
              className="sr-only"
            />
          </label>
        </div>
      </div>

      {/* Footer Info & Reset */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          Recursive backtracker • Always exactly 1 solution
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
