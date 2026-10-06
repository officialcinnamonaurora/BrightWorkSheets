import React, { useState, useMemo, useEffect } from 'react';
import {
  MazeConfig,
  generateMazeWorksheet,
  MazeWorksheetModel,
} from '../utils/mazeGenerator';
import { MazeControls } from './MazeControls';
import { MazeWorksheetPage } from './MazeWorksheetPage';
import { AdPlaceholder } from './AdPlaceholder';
import { MazeEducationalGuideAndFaq } from './MazeEducationalGuideAndFaq';
import {
  Printer,
  Sparkles,
  RefreshCw,
  Eye,
  CheckCircle,
  Info,
} from 'lucide-react';

const DEFAULT_MAZE_CONFIG: MazeConfig = {
  difficulty: 'easy',
  customSize: 8,
  shape: 'square',
  theme: 'star-heart',
  pathWidth: 'wide',
  seed: 424242,
  title: 'Find the Way',
  showSolution: true,
  batchCount: 1,
  siteFooterText: 'brightworksheets.com',
};

interface MazeViewProps {
  onNavigateToNameTracing: () => void;
  onNavigateToAlphabetTracing: () => void;
  onNavigateToNumberTracing: () => void;
  onNavigateToMathWorksheets: () => void;
  onNavigateToWordSearch: () => void;
}

export const MazeView: React.FC<MazeViewProps> = ({
  onNavigateToNameTracing,
  onNavigateToAlphabetTracing,
  onNavigateToNumberTracing,
  onNavigateToMathWorksheets,
  onNavigateToWordSearch,
}) => {
  const [config, setConfig] = useState<MazeConfig>(DEFAULT_MAZE_CONFIG);
  const [activePreviewTab, setActivePreviewTab] = useState<'maze' | 'solution' | 'both'>('maze');
  const [showPrintHint, setShowPrintHint] = useState<boolean>(true);

  // Generate maze worksheet based on config
  const mazeWorksheet = useMemo(() => {
    return generateMazeWorksheet(config);
  }, [config]);

  // Dynamic SEO metadata updates for this page
  useEffect(() => {
    document.title =
      'Free Maze Generator – Custom Printable Mazes for Kids | BrightWorkSheets';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Create customized printable mazes for preschool, kindergarten, and elementary kids. Choose square or circular mazes, difficulty presets, theme markers, and print with solutions.'
      );
    }
  }, []);

  const handleConfigChange = (updated: Partial<MazeConfig>) => {
    setConfig((prev) => ({ ...prev, ...updated }));
  };

  const handleGenerateNew = () => {
    setConfig((prev) => ({
      ...prev,
      seed: Math.floor(Math.random() * 999999) + 1,
    }));
  };

  const handleReset = () => {
    setConfig({
      ...DEFAULT_MAZE_CONFIG,
      seed: Math.floor(Math.random() * 999999) + 1,
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full">
      {/* Hero & Semantic H1 Header */}
      <section className="no-print text-center max-w-3xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Spatial Planning & Fine Motor Maze Generator</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-slate-900 leading-tight mb-3">
          Printable Maze <span className="text-amber-500">Generator</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
          Create customized, printable maze worksheets for early learners and elementary students.
          Features recursive backtracker algorithms (always exactly one unique solution), square or circle shapes,
          custom themes, and matching solution keys!
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs font-medium text-slate-600">
          <span className="bg-white px-3 py-1.5 rounded-full border border-amber-200 shadow-2xs flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Always 1 Unique Solution
          </span>
          <span className="bg-white px-3 py-1.5 rounded-full border border-amber-200 shadow-2xs flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Square & Circular Shapes
          </span>
          <span className="bg-white px-3 py-1.5 rounded-full border border-amber-200 shadow-2xs flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Batch 1, 2, or 4 Mazes
          </span>
          <span className="bg-white px-3 py-1.5 rounded-full border border-amber-200 shadow-2xs flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> 100% Free • No Sign-Up
          </span>
        </div>
      </section>

      {/* Main Interactive Tool Grid */}
      <div className="no-print grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Controls */}
        <div className="lg:col-span-5 space-y-6">
          <MazeControls
            config={config}
            onChange={handleConfigChange}
            onGenerateNew={handleGenerateNew}
            onReset={handleReset}
            onPrint={handlePrint}
          />

          {/* Quick PDF Print Hint */}
          {showPrintHint && (
            <div className="bg-amber-100/50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Printing with Solution Page:</span>
                  <p className="text-amber-800/90 mt-0.5">
                    When <strong>"Include Solution"</strong> is active, printing will produce{' '}
                    <strong>Page 1</strong> as the student maze worksheet and <strong>Page 2</strong> with the full colored path solution.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowPrintHint(false)}
                className="text-amber-700/60 hover:text-amber-900 font-bold text-sm cursor-pointer"
                aria-label="Dismiss tip"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Live Worksheet Preview */}
        <div className="lg:col-span-7 flex flex-col items-center">
          {/* Preview Toolbar */}
          <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-3 px-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
                <Eye className="w-3.5 h-3.5 text-amber-500" />
                Live Preview
              </span>

              {/* View mode toggle: Maze / Solution / Both */}
              {config.showSolution && (
                <div className="flex items-center bg-slate-200/80 p-0.5 rounded-xl border border-slate-300/80 text-xs">
                  <button
                    type="button"
                    onClick={() => setActivePreviewTab('maze')}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                      activePreviewTab === 'maze'
                        ? 'bg-white text-slate-800 shadow-2xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Maze Sheet
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePreviewTab('solution')}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                      activePreviewTab === 'solution'
                        ? 'bg-white text-emerald-800 shadow-2xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Solution Key
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePreviewTab('both')}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                      activePreviewTab === 'both'
                        ? 'bg-white text-slate-800 shadow-2xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Both Pages
                  </button>
                </div>
              )}
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleGenerateNew}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold shadow-2xs cursor-pointer transition-all"
                title="Generate fresh randomized maze"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>New Maze</span>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs cursor-pointer transition-all hover:scale-102"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print {config.showSolution ? 'Maze + Key' : 'Maze'}</span>
              </button>
            </div>
          </div>

          {/* Worksheet Pages Preview Frame */}
          <div className="w-full bg-slate-200/50 p-3 sm:p-5 rounded-3xl border border-slate-200 shadow-inner overflow-x-auto space-y-6">
            {activePreviewTab === 'maze' || !config.showSolution ? (
              <div>
                <MazeWorksheetPage
                  worksheet={mazeWorksheet}
                  isSolution={false}
                  isPrintOnly={false}
                />
              </div>
            ) : activePreviewTab === 'solution' ? (
              <div>
                <MazeWorksheetPage
                  worksheet={mazeWorksheet}
                  isSolution={true}
                  isPrintOnly={false}
                />
              </div>
            ) : (
              /* Both Pages Stacked View */
              <div className="space-y-8">
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-500 text-center">
                    — Page 1: Student Maze Worksheet —
                  </div>
                  <MazeWorksheetPage
                    worksheet={mazeWorksheet}
                    isSolution={false}
                    isPrintOnly={false}
                  />
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-bold text-emerald-700 text-center">
                    — Page 2: Official Solution Key —
                  </div>
                  <MazeWorksheetPage
                    worksheet={mazeWorksheet}
                    isSolution={true}
                    isPrintOnly={false}
                  />
                </div>
              </div>
            )}
          </div>

          <p className="text-[11px] text-slate-400 mt-2 text-center">
            {config.showSolution
              ? 'Previewing formatted Letter/A4 mazes. Both student maze and solution key print together.'
              : 'Previewing student maze. Check "Include Solution" to generate a colored solution page.'}
          </p>
        </div>
      </div>

      {/* Printable Output Container (@media print) */}
      <div className="print-only">
        {/* Page 1: Student Maze Sheet */}
        <MazeWorksheetPage
          worksheet={mazeWorksheet}
          isSolution={false}
          isPrintOnly={true}
        />

        {/* Page 2: Official Solution Key (if enabled) */}
        {config.showSolution && (
          <MazeWorksheetPage
            worksheet={mazeWorksheet}
            isSolution={true}
            isPrintOnly={true}
          />
        )}
      </div>

      {/* Ad Placeholder Box (Below the tool, hidden during printing) */}
      <AdPlaceholder />

      {/* 200+ Words Educational Guide & 5-Question FAQ with Nav Links */}
      <MazeEducationalGuideAndFaq
        onNavigateToNameTracing={onNavigateToNameTracing}
        onNavigateToAlphabetTracing={onNavigateToAlphabetTracing}
        onNavigateToNumberTracing={onNavigateToNumberTracing}
        onNavigateToMathWorksheets={onNavigateToMathWorksheets}
        onNavigateToWordSearch={onNavigateToWordSearch}
      />
    </div>
  );
};
