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

const MATH_FAQS: FaqItem[] = [
  {
    question: "Why is daily math fact practice critical for elementary students?",
    answer:
      "Cognitive research shows that automatic recall of basic arithmetic facts (addition, subtraction, multiplication, and division) frees working memory. When students don't need to count on their fingers for 7 + 8 or 6 × 7, their brains can focus on higher-order multi-step word problems, algebraic thinking, and conceptual geometry.",
  },
  {
    question: "What is the difference between regrouping and no regrouping?",
    answer:
      "Regrouping (also known as carrying in addition and borrowing in subtraction) occurs when place-value columns exceed 9 or need to trade values. For beginners (Grade 1), practicing without regrouping builds confidence with pure column alignment. As students advance (Grade 2–3), enabling regrouping teaches place-value flexibility.",
  },
  {
    question: "How does the 'Times Table Focus' tool help with multiplication?",
    answer:
      "Instead of mixing all numbers at once, learning multiplication table by table (e.g. mastering 3s, then 4s, then 6s) allows children to identify skip-counting patterns. Our focus selector fixes one factor to your chosen table (from 2 to 12) while generating fresh randomized multipliers.",
  },
  {
    question: "How do I print the student worksheet along with the Answer Key?",
    answer:
      "Simply leave the 'Include Answer Key' toggle checked. When you click 'Print / Save as PDF', the generator outputs Page 1 as the student drill sheet and Page 2 as the official Answer Key, each perfectly sized for individual Letter or A4 pages.",
  },
  {
    question: "Should early learners use vertical stacked or horizontal math layouts?",
    answer:
      "Both formats serve essential purposes. Vertical stacked layouts mirror standard column arithmetic and prepare students for multi-digit addition and long division. Horizontal layouts reinforce algebraic equality (the meaning of the '=' sign) and mental math decomposition.",
  },
];

interface MathEducationalGuideAndFaqProps {
  onNavigateToNameTracing: () => void;
  onNavigateToAlphabetTracing: () => void;
  onNavigateToNumberTracing: () => void;
}

export const MathEducationalGuideAndFaq: React.FC<MathEducationalGuideAndFaqProps> = ({
  onNavigateToNameTracing,
  onNavigateToAlphabetTracing,
  onNavigateToNumberTracing,
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
            Create handwriting practice, letter tracing, and number worksheets in seconds.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <a
            href="/name-tracing/"
            onClick={(e) => {
              if (onNavigateToNameTracing) {
                e.preventDefault();
                onNavigateToNameTracing();
              }
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-amber-300 text-amber-900 font-bold text-xs hover:bg-amber-50 shadow-2xs transition-all cursor-pointer"
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
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-amber-300 text-amber-900 font-bold text-xs hover:bg-amber-50 shadow-2xs transition-all cursor-pointer"
          >
            <span>Alphabet (A–Z)</span>
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
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-amber-300 text-amber-900 font-bold text-xs hover:bg-amber-50 shadow-2xs transition-all cursor-pointer"
          >
            <span>Number Tracing</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Educational Guide: Over 200 words on daily math practice and building fluency */}
      <article className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-200/80 shadow-md">
        <div className="flex items-center gap-2.5 text-amber-700 font-bold text-xs uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4 text-amber-500" />
          <span>Parent & Teacher Educational Guide</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 mb-6">
          Building Math Fluency Through Daily Practice: Why Consistency Trumps Cramming
        </h2>

        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4 text-sm sm:text-base">
          <p>
            Math fluency is the ability to recall arithmetic facts accurately, quickly, and effortlessly. Just like learning to play the piano or ride a bicycle, mathematical mastery cannot be achieved through passive observation or sporadic marathon cramming. Rather, it develops through consistent, low-stakes daily practice that gradually converts calculation effort into automatic memory retrieval.
          </p>

          <p>
            When children spend 5 to 10 minutes each morning solving 15 to 20 targeted math problems, their brains form enduring neural pathways. This fact retrieval speed is not about high-pressure speed drills; it is about eliminating cognitive friction. A fourth grader tackling fractions or multi-step word problems will struggle immensely if they must pause to calculate 8 × 7 or 15 − 9. Fast arithmetic retrieval allows young minds to focus their mental stamina on reasoning, problem-solving, and analytical strategy.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
              <h3 className="font-bold text-amber-950 text-sm flex items-center gap-2 mb-1.5 font-display">
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
                1. Incremental Difficulty Scaffolding
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Begin with single-digit addition without regrouping to solidify confidence. Gradually introduce missing addends, subtraction, and multi-digit operations as conceptual understanding matures.
              </p>
            </div>

            <div className="bg-sky-50/70 p-4 rounded-2xl border border-sky-200">
              <h3 className="font-bold text-sky-950 text-sm flex items-center gap-2 mb-1.5 font-display">
                <CheckCircle2 className="w-4 h-4 text-sky-600" />
                2. Immediate Feedback with Answer Keys
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Immediate error correction prevents misconceptions from solidifying. Use our generated Answer Key to let children check their own work, fostering self-regulation and healthy growth mindsets.
              </p>
            </div>

            <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200">
              <h3 className="font-bold text-emerald-950 text-sm flex items-center gap-2 mb-1.5 font-display">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                3. Alternating Vertical & Horizontal Layouts
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Children must recognize that 4 + 7 = 11 is mathematically identical to vertical columnar math. Alternating layouts prevents rigid thinking and prepares students for diverse standardized tests.
              </p>
            </div>

            <div className="bg-purple-50/70 p-4 rounded-2xl border border-purple-200">
              <h3 className="font-bold text-purple-950 text-sm flex items-center gap-2 mb-1.5 font-display">
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                4. Celebrating Growth & Persistence
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Praise precision and process over sheer speed. A child who thoughtfully works through a borrowing problem demonstrates resilience that will serve them in advanced STEM courses for years to come.
              </p>
            </div>
          </div>

          <p>
            Print a fresh set of problems each day or slide a worksheet into a clear dry-erase sleeve for eco-friendly warmups. Daily math momentum creates confident, joyful young mathematicians!
          </p>
        </div>
      </article>

      {/* Frequently Asked Questions Section */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-200/80 shadow-md">
        <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider mb-2">
          <HelpCircle className="w-4 h-4 text-amber-500" />
          <span>Math Worksheets FAQ</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 mb-6">
          Frequently Asked Questions About Math Worksheets
        </h2>

        <div className="divide-y divide-slate-100">
          {MATH_FAQS.map((faq, index) => {
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
