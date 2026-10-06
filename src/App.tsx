/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { WorksheetControls } from './components/WorksheetControls';
import { WorksheetPage } from './components/WorksheetPage';
import { AlphabetTracingView } from './components/AlphabetTracingView';
import { NumberTracingView } from './components/NumberTracingView';
import { MathWorksheetView } from './components/MathWorksheetView';
import { WordSearchView } from './components/WordSearchView';
import { MazeView } from './components/MazeView';
import { HomeHubView } from './components/HomeHubView';
import { AboutPage } from './components/AboutPage';
import { PrivacyPage } from './components/PrivacyPage';
import { ContactPage } from './components/ContactPage';
import { TermsPage } from './components/TermsPage';
import { AdPlaceholder } from './components/AdPlaceholder';
import { EducationalGuideAndFaq } from './components/EducationalGuideAndFaq';
import { SiteFooter } from './components/SiteFooter';
import {
  WorksheetConfig,
  generateWorksheetData,
} from './utils/worksheetGenerator';
import {
  Printer,
  Sparkles,
  Info,
  CheckCircle,
  Eye,
  ArrowRight,
} from 'lucide-react';

const DEFAULT_NAME_CONFIG: WorksheetConfig = {
  text: 'Emma',
  letterCase: 'as-typed',
  fontStyle: 'print',
  letterSize: 'medium',
  repeatCount: 6,
  showGuideLines: true,
  showStartingArrows: true,
  title: 'Name Tracing Practice',
  subtext: 'Trace the letters, then practice writing your name on your own!',
  siteFooterText: 'brightworksheets.com',
};

const TAB_URLS: Record<string, string> = {
  'Home': '/',
  'Name Tracing': '/name-tracing/',
  'Alphabet Tracing': '/alphabet-tracing/',
  'Number Tracing': '/number-tracing/',
  'Math Worksheets': '/math-worksheets/',
  'Word Search': '/word-search/',
  'Mazes': '/mazes/',
  'About': '/about/',
  'Privacy Policy': '/privacy/',
  'Contact': '/contact/',
  'Terms of Use': '/terms/',
};

function getTabFromUrl(): string {
  const path = window.location.pathname.toLowerCase().replace(/\/$/, '');
  const hash = window.location.hash.toLowerCase();

  if (path === '/name-tracing' || hash === '#name') return 'Name Tracing';
  if (path === '/alphabet-tracing' || hash === '#alphabet') return 'Alphabet Tracing';
  if (path === '/number-tracing' || hash === '#number') return 'Number Tracing';
  if (path === '/math-worksheets' || hash === '#math') return 'Math Worksheets';
  if (path === '/word-search' || hash === '#wordsearch') return 'Word Search';
  if (path === '/mazes' || hash === '#maze' || hash === '#mazes') return 'Mazes';
  if (path === '/about' || hash === '#about') return 'About';
  if (path === '/privacy' || hash === '#privacy') return 'Privacy Policy';
  if (path === '/contact' || hash === '#contact') return 'Contact';
  if (path === '/terms' || hash === '#terms') return 'Terms of Use';
  return 'Home';
}

export default function App() {
  const [activeTab, setActiveTab] = useState<string>(getTabFromUrl);
  const [nameConfig, setNameConfig] = useState<WorksheetConfig>(DEFAULT_NAME_CONFIG);
  const [showPrintHint, setShowPrintHint] = useState<boolean>(true);

  // Initialize and sync active tab from URL path or hash
  useEffect(() => {
    setActiveTab(getTabFromUrl());

    const handleLocationChange = () => {
      setActiveTab(getTabFromUrl());
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Sync document title and meta description when tab changes
  useEffect(() => {
    const metaDesc = document.querySelector('meta[name="description"]');

    if (activeTab === 'Home') {
      document.title =
        'BrightWorkSheets – Free Printable Handwriting, Tracing & Math Worksheets';
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          'Free printable worksheet generators for kids: Name Tracing, Alphabet Tracing, Number Tracing, Math Drills, and Word Search Puzzles. Instant PDF downloads.'
        );
      }
    } else if (activeTab === 'Name Tracing') {
      document.title =
        'Free Name Tracing Generator – Custom Printable Handwriting Worksheets | BrightWorkSheets';
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          'Create customized, printable name tracing worksheets for preschool and kindergarten. Free handwriting practice with print, cursive, and dotted fonts. Save as PDF instantly.'
        );
      }
    } else if (activeTab === 'Alphabet Tracing') {
      document.title =
        'Free Alphabet Tracing Worksheets (A-Z) – Printable Handwriting Practice | BrightWorkSheets';
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          'Free printable alphabet tracing worksheets for preschool and kindergarten. Practice uppercase, lowercase, and both with guidelines, starting arrows, and free writing boxes. Save as PDF.'
        );
      }
    } else if (activeTab === 'Number Tracing') {
      document.title =
        'Free Number Tracing Worksheets (0-20, 1-100) – Printable Math Handwriting | BrightWorkSheets';
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          'Free printable number tracing worksheets for preschool and kindergarten. Practice 0-10, 0-20, 1-100 with counting objects, guidelines, starting arrows, and free writing boxes. Save as PDF.'
        );
      }
    } else if (activeTab === 'Math Worksheets') {
      document.title =
        'Free Math Worksheet Generator – Custom Printable Arithmetic Practice | BrightWorkSheets';
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          'Create customized printable math worksheets for Addition, Subtraction, Multiplication, and Division. Set grades 1-4, vertical or horizontal layouts, and print with answer keys.'
        );
      }
    } else if (activeTab === 'Word Search') {
      document.title =
        'Free Word Search Generator – Custom Printable Word Searches for Kids | BrightWorkSheets';
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          'Create customized printable word search puzzles for kids. Use ready-made themes or enter your own custom vocabulary words with adjustable grid sizes and matching answer keys.'
        );
      }
    } else if (activeTab === 'Mazes') {
      document.title =
        'Free Maze Generator – Custom Printable Mazes for Kids | BrightWorkSheets';
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          'Create customized printable maze worksheets for preschool, kindergarten, and elementary kids. Choose square or circular mazes, difficulty presets, theme markers, and print with solutions.'
        );
      }
    } else if (activeTab === 'About') {
      document.title =
        'About BrightWorkSheets – Free Printable Early Learning & Handwriting Worksheets';
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          'Learn about BrightWorkSheets: our mission to provide simple, clean, ad-light learning printables for parents, teachers, and homeschoolers with browser-based instant PDF generation.'
        );
      }
    } else if (activeTab === 'Privacy Policy') {
      document.title = 'Privacy Policy – BrightWorkSheets';
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          'BrightWorkSheets privacy policy: We respect your privacy. All worksheet inputs are processed client-side in your browser and never stored on our servers.'
        );
      }
    } else if (activeTab === 'Contact') {
      document.title = 'Contact Us – BrightWorkSheets';
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          'Contact the BrightWorkSheets team. Send us your questions, feedback, worksheet requests, or bug reports.'
        );
      }
    } else if (activeTab === 'Terms of Use') {
      document.title = 'Terms of Use – BrightWorkSheets';
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          'BrightWorkSheets terms of use: Guidelines for free personal and classroom use of our printable worksheets, licensing, and limitations.'
        );
      }
    }
  }, [activeTab]);

  const handleTabSelect = (tab: string) => {
    setActiveTab(tab);
    const targetUrl = TAB_URLS[tab] || '/';
    window.history.pushState({}, '', targetUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate the name worksheet model using reusable generator
  const nameWorksheetData = useMemo(() => {
    const effectiveConfig = {
      ...nameConfig,
      text: nameConfig.text.trim() === '' ? 'Emma' : nameConfig.text,
      title: 'Name Tracing Practice',
    };
    return generateWorksheetData(effectiveConfig);
  }, [nameConfig]);

  const handleNameConfigChange = (updated: Partial<WorksheetConfig>) => {
    setNameConfig((prev) => ({ ...prev, ...updated }));
  };

  const handleNameReset = () => {
    setNameConfig(DEFAULT_NAME_CONFIG);
  };

  const handleNamePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/30 selection:bg-amber-200">
      {/* Site Header with Navigation */}
      <Header activeTab={activeTab} onSelectTab={handleTabSelect} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {activeTab === 'Home' ? (
          /* ================= HOMEPAGE HUB (LINKS TO ALL 6 TOOLS) ================= */
          <HomeHubView onSelectTool={handleTabSelect} />
        ) : activeTab === 'About' ? (
          /* ================= ABOUT PAGE ================= */
          <AboutPage onNavigateToTool={handleTabSelect} />
        ) : activeTab === 'Privacy Policy' ? (
          /* ================= PRIVACY POLICY PAGE ================= */
          <PrivacyPage />
        ) : activeTab === 'Contact' ? (
          /* ================= CONTACT PAGE ================= */
          <ContactPage />
        ) : activeTab === 'Terms of Use' ? (
          /* ================= TERMS OF USE PAGE ================= */
          <TermsPage />
        ) : activeTab === 'Mazes' ? (
          /* ================= MAZES PAGE ================= */
          <MazeView
            onNavigateToNameTracing={() => handleTabSelect('Name Tracing')}
            onNavigateToAlphabetTracing={() => handleTabSelect('Alphabet Tracing')}
            onNavigateToNumberTracing={() => handleTabSelect('Number Tracing')}
            onNavigateToMathWorksheets={() => handleTabSelect('Math Worksheets')}
            onNavigateToWordSearch={() => handleTabSelect('Word Search')}
          />
        ) : activeTab === 'Word Search' ? (
          /* ================= WORD SEARCH PAGE ================= */
          <WordSearchView
            onNavigateToNameTracing={() => handleTabSelect('Name Tracing')}
            onNavigateToAlphabetTracing={() => handleTabSelect('Alphabet Tracing')}
            onNavigateToNumberTracing={() => handleTabSelect('Number Tracing')}
            onNavigateToMathWorksheets={() => handleTabSelect('Math Worksheets')}
          />
        ) : activeTab === 'Math Worksheets' ? (
          /* ================= MATH WORKSHEETS PAGE ================= */
          <MathWorksheetView
            onNavigateToNameTracing={() => handleTabSelect('Name Tracing')}
            onNavigateToAlphabetTracing={() => handleTabSelect('Alphabet Tracing')}
            onNavigateToNumberTracing={() => handleTabSelect('Number Tracing')}
          />
        ) : activeTab === 'Number Tracing' ? (
          /* ================= NUMBER TRACING PAGE ================= */
          <NumberTracingView
            onNavigateToNameTracing={() => handleTabSelect('Name Tracing')}
            onNavigateToAlphabetTracing={() => handleTabSelect('Alphabet Tracing')}
          />
        ) : activeTab === 'Alphabet Tracing' ? (
          /* ================= ALPHABET TRACING PAGE ================= */
          <AlphabetTracingView
            onNavigateToNameTracing={() => handleTabSelect('Name Tracing')}
            onNavigateToNumberTracing={() => handleTabSelect('Number Tracing')}
          />
        ) : (
          /* ================= NAME TRACING PAGE ================= */
          <div className="w-full">
            {/* Quick banner linking to Alphabet, Number, Math & Word Search */}
            <div className="no-print mb-6 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-200/80 rounded-2xl px-4 py-3 flex flex-col lg:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-amber-900 font-medium text-center lg:text-left">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  Explore all tools: <strong>Alphabet</strong>, <strong>Numbers</strong>,{' '}
                  <strong>Math Drills</strong>, <strong>Word Search</strong>, and <strong>Mazes</strong>!
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 shrink-0">
                <a
                  href="/alphabet-tracing/"
                  onClick={(e) => {
                    e.preventDefault();
                    handleTabSelect('Alphabet Tracing');
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-bold text-xs shadow-2xs transition-all cursor-pointer"
                >
                  <span>Alphabet</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
                <a
                  href="/number-tracing/"
                  onClick={(e) => {
                    e.preventDefault();
                    handleTabSelect('Number Tracing');
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-2xs transition-all cursor-pointer"
                >
                  <span>Numbers</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
                <a
                  href="/math-worksheets/"
                  onClick={(e) => {
                    e.preventDefault();
                    handleTabSelect('Math Worksheets');
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs shadow-2xs transition-all cursor-pointer"
                >
                  <span>Math</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
                <a
                  href="/word-search/"
                  onClick={(e) => {
                    e.preventDefault();
                    handleTabSelect('Word Search');
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs shadow-2xs transition-all cursor-pointer"
                >
                  <span>Word Search</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
                <a
                  href="/mazes/"
                  onClick={(e) => {
                    e.preventDefault();
                    handleTabSelect('Mazes');
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-xs shadow-2xs transition-all cursor-pointer"
                >
                  <span>Mazes</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Hero & Title Section */}
            <section className="no-print text-center max-w-3xl mx-auto mb-8 sm:mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Free Printable Handwriting Worksheet Maker</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-slate-900 leading-tight mb-3">
                Name Tracing <span className="text-amber-500">Generator</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                Create customized, printable name tracing practice sheets in seconds for preschool,
                pre-k, and kindergarten. Adjust fonts, guide lines, and letter sizes, then print or save as a free PDF!
              </p>

              {/* Quick Feature Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs font-medium text-slate-600">
                <span className="bg-white px-3 py-1.5 rounded-full border border-amber-200 shadow-2xs flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Print & Cursive Fonts
                </span>
                <span className="bg-white px-3 py-1.5 rounded-full border border-amber-200 shadow-2xs flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> 3-Line Handwriting Rulings
                </span>
                <span className="bg-white px-3 py-1.5 rounded-full border border-amber-200 shadow-2xs flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> A4 & Letter Proportion
                </span>
                <span className="bg-white px-3 py-1.5 rounded-full border border-amber-200 shadow-2xs flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> No Account Needed
                </span>
              </div>
            </section>

            {/* Generator Main Tool Workspace */}
            <div className="no-print grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Interactive Controls */}
              <div className="lg:col-span-5 space-y-6">
                <WorksheetControls
                  config={nameConfig}
                  onChange={handleNameConfigChange}
                  onReset={handleNameReset}
                  onPrint={handleNamePrint}
                />

                {/* Print Help Tip Box */}
                {showPrintHint && (
                  <div className="bg-amber-100/50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block">How to download as PDF:</span>
                        <p className="text-amber-800/90 mt-0.5">
                          Click <strong>"Print / Save as PDF"</strong>, then in your browser's print dialog,
                          choose <em>"Save as PDF"</em> as your printer destination.
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
                <div className="w-full flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
                      <Eye className="w-3.5 h-3.5 text-amber-500" />
                      Live Preview (A4 / US Letter)
                    </span>
                    <span className="text-xs text-slate-400 hidden sm:inline">
                      {nameConfig.repeatCount} rows • {nameConfig.fontStyle}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleNamePrint}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs cursor-pointer transition-all hover:scale-102"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Worksheet</span>
                  </button>
                </div>

                {/* The Live Worksheet Page */}
                <div className="w-full bg-slate-200/50 p-3 sm:p-5 rounded-3xl border border-slate-200 shadow-inner overflow-x-auto">
                  <WorksheetPage worksheet={nameWorksheetData} />
                </div>

                <p className="text-[11px] text-slate-400 mt-2 text-center">
                  The worksheet preview automatically scales to match standard physical paper proportions.
                </p>
              </div>
            </div>

            {/* Separate Printable Worksheet Container for Browser Print Output */}
            <div className="print-only">
              <WorksheetPage worksheet={nameWorksheetData} isPrintOnly={true} />
            </div>

            {/* One Ad Placeholder Box (Below the Tool, hidden during printing) */}
            <AdPlaceholder />

            {/* Helpful Educational Guide (200+ words) & 5-question FAQ */}
            <EducationalGuideAndFaq />
          </div>
        )}
      </main>

      {/* Site Footer (Hidden during printing) */}
      <SiteFooter onSelectTab={handleTabSelect} />
    </div>
  );
}
