import React, { useState, useMemo, useEffect } from 'react';
import {
  MathConfig,
  generateMathWorksheet,
  MathWorksheetModel,
} from '../utils/mathGenerator';
import { MathControls } from './MathControls';
import { MathWorksheetPage } from './MathWorksheetPage';
import { AdPlaceholder } from './AdPlaceholder';
import { MathEducationalGuideAndFaq } from './MathEducationalGuideAndFaq';
import {
  Printer,
  Sparkles,
  RefreshCw,
  Eye,
  CheckCircle,
  FileCheck,
  Info,
} from 'lucide-react';

const DEFAULT_MATH_CONFIG: MathConfig = {
  operation: 'addition',
  difficulty: 'grade-1',
  customMin: 1,
  customMax: 10,
  problemCount: 20,
  layout: 'vertical',
  allowRegrouping: true,
  noNegativeAnswers: true,
  wholeNumberDivisionOnly: true,
  timesTableFocus: 'all',
  showAnswerKey: true,
  title: 'Addition Practice',
  siteFooterText: 'brightworksheets.com',
};

interface MathWorksheetViewProps {
  onNavigateToNameTracing: () => void;
  onNavigateToAlphabetTracing: () => void;
  onNavigateToNumberTracing: () => void;
}

export const MathWorksheetView: React.FC<MathWorksheetViewProps> = ({
  onNavigateToNameTracing,
  onNavigateToAlphabetTracing,
  onNavigateToNumberTracing,
}) => {
  const [config, setConfig] = useState<MathConfig>(DEFAULT_MATH_CONFIG);
  const [seed, setSeed] = useState<number>(1);
  const [activePreviewTab, setActivePreviewTab] = useState<'worksheet' | 'answer-key' | 'both'>('worksheet');
  const [showPrintHint, setShowPrintHint] = useState<boolean>(true);

  // Generate math worksheet based on configuration and current random seed
  const mathWorksheet = useMemo(() => {
    // seed triggers fresh problem generation
    void seed;
    return generateMathWorksheet(config);
  }, [config, seed]);

  // Dynamic SEO metadata updates for this page
  useEffect(() => {
    document.title =
      'Free Math Worksheet Generator – Custom Printable Arithmetic Practice | BrightWorkSheets';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Create customized printable math worksheets for Addition, Subtraction, Multiplication, and Division. Set grades 1-4, vertical or horizontal layouts, and print with answer keys.'
      );
    }
  }, []);

  const handleConfigChange = (updated: Partial<MathConfig>) => {
    setConfig((prev) => ({ ...prev, ...updated }));
  };

  const handleGenerateNew = () => {
    setSeed((prev) => prev + 1);
  };

  const handleReset = () => {
    setConfig(DEFAULT_MATH_CONFIG);
    setSeed((prev) => prev + 1);
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
          <span>Elementary Math & Fact Fluency Drills</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-slate-900 leading-tight mb-3">
          Math Worksheet <span className="text-amber-500">Generator</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
          Generate custom, printable arithmetic practice sheets in seconds for Grades 1–4.
          Choose addition, subtraction, multiplication, or division with vertical column or horizontal equations,
          custom difficulty, and matching answer keys!
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs font-medium text-slate-600">
          <span className="bg-white px-3 py-1.5 rounded-full border border-amber-200 shadow-2xs flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> + − × ÷ Mixed Operations
          </span>
          <span className="bg-white px-3 py-1.5 rounded-full border border-amber-200 shadow-2xs flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Vertical & Horizontal Formats
          </span>
          <span className="bg-white px-3 py-1.5 rounded-full border border-amber-200 shadow-2xs flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Matching Answer Key Included
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
          <MathControls
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
                  <span className="font-bold block">Printing with Answer Key:</span>
                  <p className="text-amber-800/90 mt-0.5">
                    When <strong>"Include Answer Key"</strong> is active, printing will produce{' '}
                    <strong>Page 1</strong> as the student drill sheet and <strong>Page 2</strong> as the solution key.
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

              {/* View mode toggle: Worksheet / Answer Key / Both */}
              {config.showAnswerKey && (
                <div className="flex items-center bg-slate-200/80 p-0.5 rounded-xl border border-slate-300/80 text-xs">
                  <button
                    type="button"
                    onClick={() => setActivePreviewTab('worksheet')}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                      activePreviewTab === 'worksheet'
                        ? 'bg-white text-slate-800 shadow-2xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Student Sheet
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePreviewTab('answer-key')}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                      activePreviewTab === 'answer-key'
                        ? 'bg-white text-emerald-800 shadow-2xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Answer Key
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
                title="Create fresh set of problems"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>New Set</span>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs cursor-pointer transition-all hover:scale-102"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print {config.showAnswerKey ? 'Sheet + Key' : 'Sheet'}</span>
              </button>
            </div>
          </div>

          {/* Worksheet Pages Preview Frame */}
          <div className="w-full bg-slate-200/50 p-3 sm:p-5 rounded-3xl border border-slate-200 shadow-inner overflow-x-auto space-y-6">
            {activePreviewTab === 'worksheet' || !config.showAnswerKey ? (
              <div>
                <MathWorksheetPage
                  worksheet={mathWorksheet}
                  isAnswerKey={false}
                  isPrintOnly={false}
                />
              </div>
            ) : activePreviewTab === 'answer-key' ? (
              <div>
                <MathWorksheetPage
                  worksheet={mathWorksheet}
                  isAnswerKey={true}
                  isPrintOnly={false}
                />
              </div>
            ) : (
              /* Both Pages Stacked View */
              <div className="space-y-8">
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-500 text-center">
                    — Page 1: Student Worksheet —
                  </div>
                  <MathWorksheetPage
                    worksheet={mathWorksheet}
                    isAnswerKey={false}
                    isPrintOnly={false}
                  />
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-bold text-emerald-700 text-center">
                    — Page 2: Official Answer Key —
                  </div>
                  <MathWorksheetPage
                    worksheet={mathWorksheet}
                    isAnswerKey={true}
                    isPrintOnly={false}
                  />
                </div>
              </div>
            )}
          </div>

          <p className="text-[11px] text-slate-400 mt-2 text-center">
            {config.showAnswerKey
              ? 'Previewing formatted Letter/A4 worksheets. Both student sheet and answer key print together.'
              : 'Previewing student worksheet. Check "Include Answer Key" to generate a solution page.'}
          </p>
        </div>
      </div>

      {/* Printable Output Container (@media print) */}
      {/* Contains student sheet, and answer key page if enabled, both with mandatory footer line */}
      <div className="print-only">
        {/* Page 1: Student Drill Sheet */}
        <MathWorksheetPage
          worksheet={mathWorksheet}
          isAnswerKey={false}
          isPrintOnly={true}
        />

        {/* Page 2: Official Answer Key (if enabled) */}
        {config.showAnswerKey && (
          <MathWorksheetPage
            worksheet={mathWorksheet}
            isAnswerKey={true}
            isPrintOnly={true}
          />
        )}
      </div>

      {/* Ad Placeholder Box (Below the tool, hidden during printing) */}
      <AdPlaceholder />

      {/* 200+ Words Educational Guide & 5-Question FAQ with Nav Links */}
      <MathEducationalGuideAndFaq
        onNavigateToNameTracing={onNavigateToNameTracing}
        onNavigateToAlphabetTracing={onNavigateToAlphabetTracing}
        onNavigateToNumberTracing={onNavigateToNumberTracing}
      />
    </div>
  );
};
