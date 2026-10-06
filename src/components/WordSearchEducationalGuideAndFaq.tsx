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

const WORDSEARCH_FAQS: FaqItem[] = [
  {
    question: "How do word searches improve children's spelling and vocabulary?",
    answer:
      "Word searches require active orthographic processing. Instead of passively looking at a word, children must hold the letter sequence in their working memory (e.g., D-O-L-P-H-I-N) while scanning the grid for initial letters and subsequent consonant clusters. This strengthens letter-pattern recognition, reinforces phonetic spelling rules, and expands word recognition speed.",
  },
  {
    question: "What grid size and difficulty should I choose for each grade level?",
    answer:
      "For Kindergarten and Grade 1, select a 10×10 grid on Easy difficulty (horizontal and vertical only, with starting letter hints). For Grades 2 and 3, a 12×12 grid on Medium difficulty introduces forward diagonals. For Grade 4 and above, a 15×15 grid on Hard difficulty challenges spatial reasoning with backwards and reverse-diagonal words.",
  },
  {
    question: "What does the 'Hint First Letters' option do?",
    answer:
      "For beginner readers or children with visual-spatial processing challenges, searching a sea of random letters can feel overwhelming. Enabling 'Hint First Letters' gently shades the initiation letter of each target word in green. This provides a scaffolded starting point so children practice decoding the rest of the word without frustration.",
  },
  {
    question: "Can I enter my child's weekly spelling or vocabulary words?",
    answer:
      "Yes! Simply type or paste your child's weekly school spelling list into the custom text box (up to 20 words, 3 to 12 letters each). Click 'Reshuffle' to generate a bespoke homework practice puzzle in seconds.",
  },
  {
    question: "How do I print the puzzle and the Answer Key together?",
    answer:
      "Keep 'Include Answer Key' checked, then click 'Print / Save as PDF'. The generator will output Page 1 as the clean student puzzle and Page 2 as the complete solution key with all placed words highlighted, formatted for standard Letter or A4 printing.",
  },
];

interface WordSearchEducationalGuideAndFaqProps {
  onNavigateToNameTracing: () => void;
  onNavigateToAlphabetTracing: () => void;
  onNavigateToNumberTracing: () => void;
  onNavigateToMathWorksheets: () => void;
}

export const WordSearchEducationalGuideAndFaq: React.FC<WordSearchEducationalGuideAndFaqProps> = ({
  onNavigateToNameTracing,
  onNavigateToAlphabetTracing,
  onNavigateToNumberTracing,
  onNavigateToMathWorksheets,
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
            Create handwriting sheets, alphabet tracing, number drills, and math worksheets.
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
            href="/mazes/"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-amber-300 text-amber-900 font-bold text-xs hover:bg-amber-50 shadow-2xs transition-all cursor-pointer"
          >
            <span>Mazes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Educational Guide: Over 200 words on word searches for spelling & vocabulary */}
      <article className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-200/80 shadow-md">
        <div className="flex items-center gap-2.5 text-amber-700 font-bold text-xs uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4 text-amber-500" />
          <span>Parent & Teacher Educational Guide</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 mb-6">
          Using Word Searches to Build Spelling, Vocabulary, and Visual Scanning
        </h2>

        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4 text-sm sm:text-base">
          <p>
            Word searches are often viewed as simple recreational pastimes, yet cognitive scientists and literacy educators recognize them as powerful visual-motor and orthographic learning exercises. For developing readers, recognizing words in print is not merely a rote memory task; it requires rapid visual discrimination, directional scanning (left-to-right and top-to-bottom), and active phonetic decoding.
          </p>

          <p>
            When a child searches for a vocabulary term like <em>B-L-O-S-S-O-M</em> within an array of letters, their brain performs multiple cognitive operations simultaneously. First, they scan for the initial grapheme 'B'. Once located, they evaluate surrounding neighbor cells in multiple directions to see if 'L' follows. This deliberate micro-analysis cements letter order into long-term orthographic memory, directly combating phonetic spelling missteps and transposed letters.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
              <h3 className="font-bold text-amber-950 text-sm flex items-center gap-2 mb-1.5 font-display">
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
                1. Contextual Thematic Vocabulary
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Grouping words by coherent themes (such as seasons, science terms, or animal habitats) fosters semantic webs in memory. Children don't just find random letters; they learn the interconnected meaning of the words.
              </p>
            </div>

            <div className="bg-sky-50/70 p-4 rounded-2xl border border-sky-200">
              <h3 className="font-bold text-sky-950 text-sm flex items-center gap-2 mb-1.5 font-display">
                <CheckCircle2 className="w-4 h-4 text-sky-600" />
                2. Visual Saccades & Tracking
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Scanning a grid trains eye muscles in saccadic movements—the exact rapid eye jumps required when reading across lines of text in a book. This strengthens reading stamina and prevents line-skipping.
              </p>
            </div>

            <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200">
              <h3 className="font-bold text-emerald-950 text-sm flex items-center gap-2 mb-1.5 font-display">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                3. Low-Stress Spelling Mastery
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Children who feel anxious about formal spelling tests frequently thrive with word searches. The gamified puzzle format encourages persistent effort and builds positive associations with challenging vocabulary words.
              </p>
            </div>

            <div className="bg-purple-50/70 p-4 rounded-2xl border border-purple-200">
              <h3 className="font-bold text-purple-950 text-sm flex items-center gap-2 mb-1.5 font-display">
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                4. Scaffolding for Diverse Learners
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Use our 'Hint First Letters' toggle for younger readers or English Language Learners to avoid visual fatigue, then transition to harder grids as their word recognition confidence grows.
              </p>
            </div>
          </div>

          <p>
            Encourage children to cross off words in the word bank as they circle them in the grid. Slip puzzles into reusable dry-erase pockets for engaging morning warm-ups or quiet literacy center rotations!
          </p>
        </div>
      </article>

      {/* Frequently Asked Questions Section */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-200/80 shadow-md">
        <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider mb-2">
          <HelpCircle className="w-4 h-4 text-amber-500" />
          <span>Word Search FAQ</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 mb-6">
          Frequently Asked Questions About Word Searches
        </h2>

        <div className="divide-y divide-slate-100">
          {WORDSEARCH_FAQS.map((faq, index) => {
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
