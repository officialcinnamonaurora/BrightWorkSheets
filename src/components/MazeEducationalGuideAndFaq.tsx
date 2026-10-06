import React, { useState } from 'react';
import {
  HelpCircle,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const MAZE_FAQS: FaqItem[] = [
  {
    question: "How do mazes develop fine motor pencil control and handwriting skills?",
    answer:
      "Navigating through maze corridors requires sustained pencil pressure, fine motor grip adjustments, and sudden changes in direction (stopping, pivoting, turning). These continuous micro-adjustments develop the exact intrinsic hand muscles and finger dexterity children need to control pencil strokes when forming letters and numbers.",
  },
  {
    question: "Why is visual planning and forward-scanning important in early childhood?",
    answer:
      "Before a child draws a pencil line into an alley, their eyes must scan ahead to verify whether the corridor continues or leads into a dead end. This cognitive skill—known as executive planning and visual foresight—translates directly to reading comprehension, mathematical sequencing, and problem-solving.",
  },
  {
    question: "What is a 'perfect maze' and why does it have only one solution?",
    answer:
      "In mathematics and computer science, a 'perfect maze' is structured as a spanning tree without any loops or closed circuits. Because our generator uses the recursive backtracker algorithm, every point in the maze is reachable, and there is mathematically only one unique, non-repeating path between the start and finish markers.",
  },
  {
    question: "Which difficulty and path width should I choose for my child's age?",
    answer:
      "For toddlers and preschoolers (ages 3–4), select the 'Easy' preset (8×8) with a 'Wide' path width so little hands with chunky crayons have ample corridor clearance. For kindergarteners, 'Medium' (12×12) is ideal. For elementary grades (2nd and up), 'Hard' (18×18) or 'Expert' (25×25) with a 'Thin' path presents an engaging challenge.",
  },
  {
    question: "How does the 'Batch' option work for multiple mazes on one page?",
    answer:
      "The batch selector lets you print 1 large centerpiece maze, 2 side-by-side mazes, or 4 mini mazes per Letter or A4 sheet. Each maze in the batch is generated with a unique seed so children can enjoy a variety of distinct puzzle challenges on a single printed page.",
  },
];

interface MazeEducationalGuideAndFaqProps {
  onNavigateToNameTracing: () => void;
  onNavigateToAlphabetTracing: () => void;
  onNavigateToNumberTracing: () => void;
  onNavigateToMathWorksheets: () => void;
  onNavigateToWordSearch: () => void;
}

export const MazeEducationalGuideAndFaq: React.FC<MazeEducationalGuideAndFaqProps> = ({
  onNavigateToNameTracing,
  onNavigateToAlphabetTracing,
  onNavigateToNumberTracing,
  onNavigateToMathWorksheets,
  onNavigateToWordSearch,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="no-print space-y-12 max-w-4xl mx-auto my-12">
      {/* Internal Navigation Links Card */}
      <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-200/80 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Explore More Printable Tools
          </div>
          <h3 className="text-lg sm:text-xl font-black font-display text-slate-900">
            More Free Worksheets on BrightWorkSheets
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Create handwriting sheets, math drills, word searches, and mazes in seconds.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <a
            href="/name-tracing/"
            onClick={(e) => {
              if (onNavigateToNameTracing) {
                e.preventDefault();
                onNavigateToNameTracing();
              }
            }}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-amber-300 text-amber-900 font-bold text-xs hover:bg-amber-50 shadow-2xs transition-all cursor-pointer"
          >
            <span>Name Tracing</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          <a
            href="/alphabet-tracing/"
            onClick={(e) => {
              if (onNavigateToAlphabetTracing) {
                e.preventDefault();
                onNavigateToAlphabetTracing();
              }
            }}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-amber-300 text-amber-900 font-bold text-xs hover:bg-amber-50 shadow-2xs transition-all cursor-pointer"
          >
            <span>Alphabet</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          <a
            href="/number-tracing/"
            onClick={(e) => {
              if (onNavigateToNumberTracing) {
                e.preventDefault();
                onNavigateToNumberTracing();
              }
            }}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-amber-300 text-amber-900 font-bold text-xs hover:bg-amber-50 shadow-2xs transition-all cursor-pointer"
          >
            <span>Numbers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          <a
            href="/math-worksheets/"
            onClick={(e) => {
              if (onNavigateToMathWorksheets) {
                e.preventDefault();
                onNavigateToMathWorksheets();
              }
            }}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-amber-300 text-amber-900 font-bold text-xs hover:bg-amber-50 shadow-2xs transition-all cursor-pointer"
          >
            <span>Math</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          <a
            href="/word-search/"
            onClick={(e) => {
              if (onNavigateToWordSearch) {
                e.preventDefault();
                onNavigateToWordSearch();
              }
            }}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-amber-300 text-amber-900 font-bold text-xs hover:bg-amber-50 shadow-2xs transition-all cursor-pointer"
          >
            <span>Word Search</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Educational Guide: Over 200 words on how mazes build focus, planning & pencil control */}
      <article className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-200/80 shadow-md">
        <div className="flex items-center gap-2.5 text-amber-700 font-bold text-xs uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4 text-amber-500" />
          <span>Parent & Teacher Educational Guide</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 mb-6">
          Building Focus, Spatial Planning, and Fine Motor Pencil Control Through Mazes
        </h2>

        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4 text-sm sm:text-base">
          <p>
            Mazes are frequently celebrated as engaging childhood puzzles, yet pediatric occupational therapists and neurodevelopmental specialists view them as one of the single most comprehensive pre-writing and visual-motor tools available. While children see a playful challenge—guiding a mouse to cheese or a rocket to a planet—their developing brains are executing complex sensorimotor integration, visual planning, and sustained attentional focus.
          </p>

          <p>
            Writing legible letters requires delicate motor modulation: stopping at a baseline, rounding a curve without overshooting, and maintaining steady grip pressure. Mazes provide direct physical boundaries that train these exact motor instincts. When a child draws a pencil line between two black walls without touching the boundaries, their brain continuously calculates trajectory, modulates finger pressure, and strengthens the dynamic tripod grasp.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
              <h3 className="font-bold text-amber-950 text-sm flex items-center gap-2 mb-1.5 font-display">
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
                1. Executive Function & Forward Planning
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Children naturally tend to plunge forward impulsively. Mazes teach impulse control and visual foresight; a child quickly learns to stop their pencil and scan ahead with their eyes before choosing a pathway.
              </p>
            </div>

            <div className="bg-sky-50/70 p-4 rounded-2xl border border-sky-200">
              <h3 className="font-bold text-sky-950 text-sm flex items-center gap-2 mb-1.5 font-display">
                <CheckCircle2 className="w-4 h-4 text-sky-600" />
                2. Spatial Reasoning & Mental Mapping
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Navigating branching paths nurtures cognitive mental mapping. Recognizing dead ends and backtracking without frustration builds persistence, emotional regulation, and spatial problem-solving resilience.
              </p>
            </div>

            <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200">
              <h3 className="font-bold text-emerald-950 text-sm flex items-center gap-2 mb-1.5 font-display">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                3. Scaffolded Path Widths for Every Stage
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Beginners using chunky crayons or markers benefit immensely from our 'Wide' corridor setting. As motor precision sharpens, transition to 'Medium' and 'Thin' paths with standard pencils.
              </p>
            </div>

            <div className="bg-purple-50/70 p-4 rounded-2xl border border-purple-200">
              <h3 className="font-bold text-purple-950 text-sm flex items-center gap-2 mb-1.5 font-display">
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                4. Finger Tracing Before Pencil Drawing
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                For younger children or students struggling with anxiety, encourage finger tracing first. Exploring the pathway with their index finger establishes spatial confidence before committing pencil to paper.
              </p>
            </div>
          </div>

          <p>
            Slip printed mazes into wipe-clean dry-erase sleeves for classroom centers or rainy-day learning stations. Daily maze navigation creates calm, focused, and motor-confident young learners!
          </p>
        </div>
      </article>

      {/* Frequently Asked Questions Section */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-200/80 shadow-md">
        <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider mb-2">
          <HelpCircle className="w-4 h-4 text-amber-500" />
          <span>Maze Generator FAQ</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 mb-6">
          Frequently Asked Questions About Printable Mazes
        </h2>

        <div className="divide-y divide-slate-100">
          {MAZE_FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} className="py-4">
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between text-left gap-4 font-bold text-slate-800 hover:text-amber-600 transition-colors cursor-pointer group"
                >
                  <span className="text-base sm:text-lg">{faq.question}</span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform shrink-0 ${
                      isOpen
                        ? 'bg-amber-500 text-white rotate-180'
                        : 'bg-amber-100/70 text-amber-800 group-hover:bg-amber-200'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed pl-1 pr-4 animate-fadeIn">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
