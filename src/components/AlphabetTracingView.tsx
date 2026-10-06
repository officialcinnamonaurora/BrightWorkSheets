import React, { useState, useMemo, useEffect } from 'react';
import {
  AlphabetConfig,
  generateAlphabetWorksheetPages,
} from '../utils/worksheetGenerator';
import { AlphabetControls } from './AlphabetControls';
import { AlphabetWorksheetPage } from './AlphabetWorksheetPage';
import { AdPlaceholder } from './AdPlaceholder';
import { AlphabetEducationalGuideAndFaq } from './AlphabetEducationalGuideAndFaq';
import {
  Printer,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Eye,
  Layers,
  FileCheck,
  CheckCircle,
  Info,
} from 'lucide-react';

const DEFAULT_ALPHABET_CONFIG: AlphabetConfig = {
  letterCase: 'both',
  startLetter: 'A',
  endLetter: 'Z',
  fontStyle: 'print',
  letterSize: 'medium',
  showGuideLines: true,
  showStartingArrows: true,
  siteFooterText: 'brightworksheets.com',
};

interface AlphabetTracingViewProps {
  onNavigateToNameTracing: () => void;
  onNavigateToNumberTracing: () => void;
}

export const AlphabetTracingView: React.FC<AlphabetTracingViewProps> = ({
  onNavigateToNameTracing,
  onNavigateToNumberTracing,
}) => {
  const [config, setConfig] = useState<AlphabetConfig>(DEFAULT_ALPHABET_CONFIG);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [previewMode, setPreviewMode] = useState<'single' | 'stacked'>('single');
  const [showPrintHint, setShowPrintHint] = useState<boolean>(true);

  // Generate alphabet worksheet pages using the reusable generator
  const alphabetPages = useMemo(() => {
    return generateAlphabetWorksheetPages(config);
  }, [config]);

  // Keep currentPageIndex in valid range if config changes total pages
  useEffect(() => {
    if (currentPageIndex >= alphabetPages.length) {
      setCurrentPageIndex(Math.max(0, alphabetPages.length - 1));
    }
  }, [alphabetPages.length, currentPageIndex]);

  // Dynamic SEO metadata updates for this page
  useEffect(() => {
    document.title =
      'Free Alphabet Tracing Worksheets (A-Z) – Printable Handwriting Practice | BrightWorkSheets';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Free printable alphabet tracing worksheets for preschool and kindergarten. Practice uppercase, lowercase, and both with guidelines, starting arrows, and free writing boxes. Save as PDF.'
      );
    }
  }, []);

  const handleConfigChange = (updated: Partial<AlphabetConfig>) => {
    setConfig((prev) => ({ ...prev, ...updated }));
  };

  const handleReset = () => {
    setConfig(DEFAULT_ALPHABET_CONFIG);
    setCurrentPageIndex(0);
  };

  const handlePrint = () => {
    window.print();
  };

  const handlePrintFullSet = () => {
    setConfig((prev) => ({
      ...prev,
      startLetter: 'A',
      endLetter: 'Z',
    }));
    setTimeout(() => {
      window.print();
    }, 150);
  };

  const handleSelectSingleLetter = (letter: string) => {
    setConfig((prev) => ({
      ...prev,
      startLetter: letter,
      endLetter: letter,
    }));
    setCurrentPageIndex(0);
  };

  const currentPage = alphabetPages[currentPageIndex] || alphabetPages[0];

  return (
    <div className="w-full">
      {/* Hero & Semantic H1 Header */}
      <section className="no-print text-center max-w-3xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>A–Z Handwriting & Penmanship Printables</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-slate-900 leading-tight mb-3">
          Alphabet Tracing <span className="text-amber-500">Worksheets</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
          Free printable alphabet tracing sheets for preschool, pre-k, and kindergarten.
          Customize uppercase, lowercase, or paired letters with solid models, dotted tracing,
          and dedicated free-writing boxes!
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs font-medium text-slate-600">
          <span className="bg-white px-3 py-1.5 rounded-full border border-amber-200 shadow-2xs flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Uppercase, Lowercase & Both (Aa)
          </span>
          <span className="bg-white px-3 py-1.5 rounded-full border border-amber-200 shadow-2xs flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> 2 Empty Free-Writing Boxes/Row
          </span>
          <span className="bg-white px-3 py-1.5 rounded-full border border-amber-200 shadow-2xs flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Auto-Split Into 6–8 Letters/Page
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
          <AlphabetControls
            config={config}
            onChange={handleConfigChange}
            onReset={handleReset}
            onPrint={handlePrint}
            onPrintFullSet={handlePrintFullSet}
            onSelectSingleLetter={handleSelectSingleLetter}
            totalPages={alphabetPages.length}
          />

          {/* Quick PDF Print Hint */}
          {showPrintHint && (
            <div className="bg-amber-100/50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Printing multiple pages:</span>
                  <p className="text-amber-800/90 mt-0.5">
                    Clicking <strong>"Print / Save as PDF"</strong> will output all {alphabetPages.length}{' '}
                    pages cleanly formatted for individual Letter or A4 sheets.
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

              {/* View mode toggle */}
              <div className="flex items-center bg-slate-200/80 p-0.5 rounded-xl border border-slate-300/80 text-xs">
                <button
                  type="button"
                  onClick={() => setPreviewMode('single')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    previewMode === 'single'
                      ? 'bg-white text-slate-800 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Single Page
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewMode('stacked')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    previewMode === 'stacked'
                      ? 'bg-white text-slate-800 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  All {alphabetPages.length} Pages
                </button>
              </div>
            </div>

            {/* Quick Print Button */}
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs cursor-pointer transition-all hover:scale-102"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print {alphabetPages.length > 1 ? `All ${alphabetPages.length} Pages` : 'Page'}</span>
            </button>
          </div>

          {/* Page Selector Strip when in 'single' preview mode */}
          {previewMode === 'single' && alphabetPages.length > 1 && (
            <div className="w-full flex items-center justify-between gap-2 mb-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-2xs text-xs">
              <button
                type="button"
                disabled={currentPageIndex <= 0}
                onClick={() => setCurrentPageIndex((prev) => Math.max(0, prev - 1))}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-amber-100 text-slate-700 disabled:opacity-30 disabled:hover:bg-slate-100 font-bold transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev Page</span>
              </button>

              <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                {alphabetPages.map((page, idx) => (
                  <button
                    key={`page-btn-${idx}`}
                    type="button"
                    onClick={() => setCurrentPageIndex(idx)}
                    className={`px-2.5 py-1 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                      currentPageIndex === idx
                        ? 'bg-amber-500 text-white shadow-2xs'
                        : 'bg-slate-50 text-slate-600 hover:bg-amber-50'
                    }`}
                  >
                    Pg {idx + 1} ({page.rangeLabel.replace('Letters ', '').replace('Letter ', '')})
                  </button>
                ))}
              </div>

              <button
                type="button"
                disabled={currentPageIndex >= alphabetPages.length - 1}
                onClick={() =>
                  setCurrentPageIndex((prev) => Math.min(alphabetPages.length - 1, prev + 1))
                }
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-amber-100 text-slate-700 disabled:opacity-30 disabled:hover:bg-slate-100 font-bold transition-colors cursor-pointer"
              >
                <span>Next Page</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Worksheet Pages Preview Frame */}
          <div className="w-full bg-slate-200/50 p-3 sm:p-5 rounded-3xl border border-slate-200 shadow-inner overflow-x-auto space-y-6">
            {previewMode === 'single' ? (
              <div>
                <AlphabetWorksheetPage
                  page={currentPage}
                  fontStyle={config.fontStyle}
                  showGuideLines={config.showGuideLines}
                  showStartingArrows={config.showStartingArrows}
                  isPrintOnly={false}
                />
              </div>
            ) : (
              <div className="space-y-8">
                {alphabetPages.map((page, idx) => (
                  <div key={`preview-stacked-${idx}`} className="space-y-2">
                    <div className="text-xs font-bold text-slate-500 text-center">
                      — Page {idx + 1} of {alphabetPages.length} ({page.rangeLabel}) —
                    </div>
                    <AlphabetWorksheetPage
                      page={page}
                      fontStyle={config.fontStyle}
                      showGuideLines={config.showGuideLines}
                      showStartingArrows={config.showStartingArrows}
                      isPrintOnly={false}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <p className="text-[11px] text-slate-400 mt-2 text-center">
            {previewMode === 'single'
              ? `Currently viewing page ${currentPageIndex + 1} of ${alphabetPages.length}. Use "Print / Save as PDF" to export all pages.`
              : `Showing all ${alphabetPages.length} pages in stacked view.`}
          </p>
        </div>
      </div>

      {/* Printable Output Container (@media print) */}
      {/* Contains EVERY single page with mandatory footer line and page break */}
      <div className="print-only">
        {alphabetPages.map((page) => (
          <AlphabetWorksheetPage
            key={`print-page-${page.pageIndex}`}
            page={page}
            fontStyle={config.fontStyle}
            showGuideLines={config.showGuideLines}
            showStartingArrows={config.showStartingArrows}
            isPrintOnly={true}
          />
        ))}
      </div>

      {/* Ad Placeholder Box (Below the tool, hidden during printing) */}
      <AdPlaceholder />

      {/* 200+ Words Educational Guide & 5-Question FAQ with Nav Links */}
      <AlphabetEducationalGuideAndFaq
        onNavigateToNameTracing={onNavigateToNameTracing}
        onNavigateToNumberTracing={onNavigateToNumberTracing}
      />
    </div>
  );
};
