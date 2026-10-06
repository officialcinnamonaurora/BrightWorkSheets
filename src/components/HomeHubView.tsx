import React from 'react';
import {
  Pencil,
  BookOpen,
  Hash,
  Calculator,
  Search,
  Compass,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Printer,
  FileCheck,
  Star,
} from 'lucide-react';

interface HomeHubViewProps {
  onSelectTool: (tab: string) => void;
}

export const HomeHubView: React.FC<HomeHubViewProps> = ({ onSelectTool }) => {
  const tools = [
    {
      id: 'Name Tracing',
      url: '/name-tracing/',
      title: 'Name Tracing Generator',
      tag: 'Handwriting Practice',
      badge: 'Popular',
      badgeColor: 'bg-amber-500 text-white',
      icon: Pencil,
      iconBg: 'from-amber-400 to-orange-500',
      description:
        'Create customized name tracing worksheets for preschool, Pre-K, and kindergarten. Features solid models, dotted tracing, and empty guideline rows.',
      highlights: ['Custom Child Name', '3-Line Penmanship Ruling', 'Print & Cursive Fonts'],
    },
    {
      id: 'Alphabet Tracing',
      url: '/alphabet-tracing/',
      title: 'Alphabet Tracing Worksheets',
      tag: 'Early Literacy',
      badge: null,
      badgeColor: '',
      icon: BookOpen,
      iconBg: 'from-sky-400 to-blue-500',
      description:
        'Printable letter tracing practice from A to Z. Supports uppercase, lowercase, and paired letters with directional arrows and two free-writing boxes per row.',
      highlights: ['Full A–Z or Custom Ranges', '2 Free-Writing Boxes', 'Auto-Split Multi-Page'],
    },
    {
      id: 'Number Tracing',
      url: '/number-tracing/',
      title: 'Number Tracing Worksheets',
      tag: 'Math & Penmanship',
      badge: null,
      badgeColor: '',
      icon: Hash,
      iconBg: 'from-emerald-400 to-teal-500',
      description:
        'Master numbers 0–10, 0–20, and 1–100 with starting dots, directional guidelines, and visual counting objects (stars or circles) beside each numeral.',
      highlights: ['0–10, 0–20 & 1–100 Presets', 'Count the Objects Feature', 'Number Reversal Prevention'],
    },
    {
      id: 'Math Worksheets',
      url: '/math-worksheets/',
      title: 'Math Worksheet Generator',
      tag: 'Arithmetic & Fluency',
      badge: null,
      badgeColor: '',
      icon: Calculator,
      iconBg: 'from-indigo-400 to-purple-500',
      description:
        'Generate custom math drills for Addition, Subtraction, Multiplication, and Division. Set grade levels 1–4, vertical or horizontal layouts, and matching answer keys.',
      highlights: ['+ − × ÷ Mixed Drills', 'Vertical & Horizontal Layouts', 'Includes Answer Key'],
    },
    {
      id: 'Word Search',
      url: '/word-search/',
      title: 'Word Search Generator',
      tag: 'Spelling & Vocabulary',
      badge: null,
      badgeColor: '',
      icon: Search,
      iconBg: 'from-rose-400 to-pink-500',
      description:
        'Create custom printable word search puzzles with your own spelling words or 8 ready themes. Adjustable 10×10, 12×12, 15×15 grids with full answer keys.',
      highlights: ['Custom Words or 8 Themes', '10×10, 12×12 & 15×15 Grids', 'Highlighted Answer Key'],
    },
    {
      id: 'Mazes',
      url: '/mazes/',
      title: 'Printable Maze Generator',
      tag: 'Fine Motor & Logic',
      badge: null,
      badgeColor: '',
      icon: Compass,
      iconBg: 'from-teal-400 to-emerald-600',
      description:
        'Generate solvable single-solution mazes with square or circular shapes, custom theme markers, and batch printing (1, 2, or 4 per page) with solution keys.',
      highlights: ['Always 1 Unique Solution', 'Square & Circle Shapes', 'Batch 1, 2, or 4 Per Page'],
    },
  ];

  return (
    <div className="w-full space-y-12">
      {/* Hero Welcome Banner */}
      <section className="no-print text-center max-w-3xl mx-auto pt-4 sm:pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>100% Free Printable Early Learning Tools</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-slate-900 leading-tight mb-4">
          Free Learning & Activity <span className="text-amber-500">Worksheets</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
          BrightWorkSheets helps parents, preschool teachers, and homeschoolers generate custom,
          print-ready handwriting, math, word search, and maze activity sheets in seconds. No login, no subscriptions, pure practice!
        </p>

        {/* Global Features Banner */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6 text-xs font-medium text-slate-600">
          <span className="bg-white px-3.5 py-1.5 rounded-full border border-amber-200 shadow-2xs flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Instant PDF Download
          </span>
          <span className="bg-white px-3.5 py-1.5 rounded-full border border-amber-200 shadow-2xs flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Standard Letter & A4 Proportions
          </span>
          <span className="bg-white px-3.5 py-1.5 rounded-full border border-amber-200 shadow-2xs flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Free for Classroom & Home Use
          </span>
        </div>
      </section>

      {/* Grid of the 6 Main Tools */}
      <section className="no-print max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold font-display text-slate-900">
            Choose a Generator Tool
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Click on any worksheet maker below to customize and print instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <a
                key={tool.id}
                href={tool.url}
                onClick={(e) => {
                  if (onSelectTool) {
                    e.preventDefault();
                    onSelectTool(tool.id);
                    window.history.pushState({}, '', tool.url);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="group bg-white rounded-3xl p-6 sm:p-7 border border-amber-200/80 shadow-md hover:shadow-xl transition-all duration-200 flex flex-col justify-between cursor-pointer border-t-4 hover:-translate-y-1 block"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${tool.iconBg} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-md">
                        {tool.tag}
                      </span>
                      {tool.badge && (
                        <span
                          className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${tool.badgeColor}`}
                        >
                          {tool.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold font-display text-slate-900 group-hover:text-amber-600 transition-colors mb-2">
                    {tool.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {tool.description}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100 mb-6">
                    {tool.highlights.map((item, idx) => (
                      <div
                        key={idx}
                        className="text-xs text-slate-500 flex items-center gap-2"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-amber-50 group-hover:bg-amber-500 text-amber-900 group-hover:text-white font-bold text-sm transition-all shadow-2xs">
                  <span>Open {tool.title}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* Why BrightWorkSheets Overview */}
      <section className="no-print bg-white rounded-3xl p-6 sm:p-10 border border-amber-200/80 shadow-md max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto md:mx-0">
              <Printer className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 font-display">Print-Optimized Quality</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every worksheet uses vector guidelines and high-resolution Google Fonts designed to print cleanly on Letter or A4 paper with zero distortion.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mx-auto md:mx-0">
              <FileCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 font-display">Child-Safe & Evidence-Based</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Designed according to occupational therapy standards: top-to-bottom starting arrows, gradual release scaffolding, and free-writing checkpoints.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto md:mx-0">
              <Star className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 font-display">100% Free Forever</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Unlimited generation and printing for teachers, daycare educators, homeschool parents, and tutors with no account setup or paywalls.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
