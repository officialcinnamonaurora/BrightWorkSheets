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

const ALPHABET_FAQS: FaqItem[] = [
  {
    question: "Should my child learn uppercase or lowercase letters first?",
    answer:
      "Most occupational therapists and early educators recommend introducing uppercase letters first because capital letters consist primarily of simple straight lines, diagonal slashes, and consistent top-to-baseline heights (like L, T, H, F, E). Once fine motor strength develops, introduce lowercase letters and the 'Both' option (Aa, Bb) so children recognize how uppercase and lowercase pairs correspond in reading.",
  },
  {
    question: "How many letters should a preschooler or kindergartener practice per session?",
    answer:
      "For children ages 3 to 5, practicing 3 to 7 letters (approximately one page) per session is ideal. Short, enjoyable 5-to-10 minute sessions prevent hand fatigue and frustration. You can easily select specific letter ranges like 'A to G' or 'H to N' using our range selector before printing.",
  },
  {
    question: "What are the two empty boxes at the end of each row for?",
    answer:
      "The two empty boxes at the end of every row provide independent free-writing practice. After observing the solid model letter and tracing the dotted scaffolded copies, the child tests their memory and fine motor recall by writing the letter completely on their own inside the guidelines.",
  },
  {
    question: "How do I print the entire A to Z set or just a single letter?",
    answer:
      "Use our Quick Action buttons! Clicking 'Print full A–Z set' automatically configures the full alphabet across 4 to 5 pages. If your child is struggling with a specific letter (such as 'B' or 'S'), click 'Print one letter only...', pick the target letter, and print a focused practice sheet instantly.",
  },
  {
    question: "Why are starting arrows and dots helpful for letter tracing?",
    answer:
      "Children naturally tend to start letters from the bottom or write backwards. Starting arrows provide immediate visual feedback showing the child where to place their pencil tip (the green dot) and the direction to draw the first stroke, building muscle memory for clean, fluid handwriting.",
  },
];

interface AlphabetEducationalGuideAndFaqProps {
  onNavigateToNameTracing: () => void;
  onNavigateToNumberTracing: () => void;
}

export const AlphabetEducationalGuideAndFaq: React.FC<AlphabetEducationalGuideAndFaqProps> = ({
  onNavigateToNameTracing,
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
            More Handwriting & Tracing Tools
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            BrightWorkSheets offers free printable practice for names, letters, and numbers.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="/name-tracing/"
            onClick={(e) => {
              if (onNavigateToNameTracing) {
                e.preventDefault();
                onNavigateToNameTracing();
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-amber-300 text-amber-900 font-bold text-xs hover:bg-amber-50 shadow-2xs transition-all cursor-pointer"
          >
            <span>Custom Name Tracing</span>
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
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-amber-300 text-amber-900 font-bold text-xs hover:bg-amber-50 shadow-2xs transition-all cursor-pointer"
          >
            <span>Number Tracing (1–20)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Educational Guide: Over 200 words on teaching alphabet through tracing */}
      <article className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-200/80 shadow-md">
        <div className="flex items-center gap-2.5 text-amber-700 font-bold text-xs uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4 text-amber-500" />
          <span>Parent & Teacher Educational Guide</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 mb-6">
          Teaching the Alphabet Through Tracing: A Research-Backed Guide
        </h2>

        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4 text-sm sm:text-base">
          <p>
            Alphabet tracing is far more than copying shapes on a page; it is the cornerstone of early literacy, phonemic awareness, and fine motor dexterity. When young children trace letterforms with a guided model, their brains build neural connections linking the visual shape of the letter, the physical motor pathway required to form it, and the phonetic sound it produces.
          </p>

          <p>
            Effective alphabet instruction follows a scaffolded trajectory. Begin with letter recognition through song and multisensory touch, then move into structured handwriting sheets. Our worksheets use a progressive three-step model across each row: first, a solid light gray model letter to demonstrate accurate proportions; second, dotted letter copies for muscle memory reinforcement; and finally, two empty guideline boxes where the child practices independent writing without tracing supports.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
              <h3 className="font-bold text-amber-950 text-sm flex items-center gap-2 mb-1.5 font-display">
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
                1. Grouping by Stroke Families
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Rather than always going in strict A-to-Z order, consider grouping letters by physical stroke families: straight-line letters (L, T, I, H, E, F), curved letters (C, O, S, G), and diagonal letters (V, W, X, Y, Z). This reduces cognitive load for early writers.
              </p>
            </div>

            <div className="bg-sky-50/70 p-4 rounded-2xl border border-sky-200">
              <h3 className="font-bold text-sky-950 text-sm flex items-center gap-2 mb-1.5 font-display">
                <CheckCircle2 className="w-4 h-4 text-sky-600" />
                2. Phonics & Vocal Association
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Encourage children to vocalize the letter sound while their pencil moves across the page (for example: "Down, across, /b/ says buh"). Multi-sensory vocalization anchors orthographic memory far more quickly than silent tracing.
              </p>
            </div>

            <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200">
              <h3 className="font-bold text-emerald-950 text-sm flex items-center gap-2 mb-1.5 font-display">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                3. The Power of Starting Cues
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Writing letters from the bottom up is one of the most common early childhood writing habits, causing awkward pen grips and slower writing speed later. Starting arrows and green dots establish habitual top-to-bottom and left-to-right flow.
              </p>
            </div>

            <div className="bg-purple-50/70 p-4 rounded-2xl border border-purple-200">
              <h3 className="font-bold text-purple-950 text-sm flex items-center gap-2 mb-1.5 font-display">
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                4. Celebrating Free-Writing Boxes
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                The two empty boxes at the end of each line are the ultimate confidence builder. Even if the child's freehand letter is wobbly or imperfect, praise their effort and focus on progress rather than millimeter perfection.
              </p>
            </div>
          </div>

          <p>
            For best results, print multiple sheets or insert them into transparent wipe-clean pocket sleeves with dry-erase markers. Children can repeat their favorite letters daily, building confidence and penmanship fluency step by step.
          </p>
        </div>
      </article>

      {/* Frequently Asked Questions Section */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-200/80 shadow-md">
        <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider mb-2">
          <HelpCircle className="w-4 h-4 text-amber-500" />
          <span>Alphabet Tracing FAQ</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 mb-6">
          Frequently Asked Questions About Alphabet Tracing
        </h2>

        <div className="divide-y divide-slate-100">
          {ALPHABET_FAQS.map((faq, index) => {
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
