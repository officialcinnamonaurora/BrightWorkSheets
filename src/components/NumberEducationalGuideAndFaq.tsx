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

const NUMBER_FAQS: FaqItem[] = [
  {
    question: "Why do young children frequently reverse numbers like 2, 3, 5, and 7?",
    answer:
      "Number reversal is completely normal up to age 7 or 8. In everyday object recognition, a cup is still a cup whether the handle faces left or right. In handwriting, however, orientation fundamentally defines the symbol. Our starting arrows, green start dots, and 3-line penmanship rulings provide immediate visual boundaries that correct reversals naturally.",
  },
  {
    question: "How does the 'Count the Objects' feature support math readiness?",
    answer:
      "Young minds require a concrete bridge between quantities and numerals (called one-to-one correspondence). When children count the stars or circles before tracing the digit '4', they internalize that the symbol '4' represents a tangible set of items, reinforcing early cardinality and counting fluency alongside motor mechanics.",
  },
  {
    question: "What number range should I start with for preschool vs kindergarten?",
    answer:
      "Preschoolers (ages 3–4) should focus exclusively on numbers 0 through 10 with counting shapes. Kindergarteners (ages 5–6) can transition to numbers 0 through 20 to master teen numbers (which often confuse children because of the '1' in the tens place). First and second graders can practice skip-counting and ranges up to 50 or 100.",
  },
  {
    question: "Why are there two empty boxes after the dotted numbers?",
    answer:
      "The empty boxes provide independent practice under the proven educational principle of progressive release. The solid model demonstrates ideal letter proportions, the dotted copies develop fine motor control, and the final empty boxes require the child to write from cognitive memory without visual crutches.",
  },
  {
    question: "How do I print specific number sets or single numbers?",
    answer:
      "Click the 'Number Range' buttons to select standard sets like '0 to 10' or '0 to 20'. If your child is struggling with a single number (like numeral '8' or '5'), click 'Print one number only...', pick that number, and print an isolated practice sheet immediately.",
  },
];

interface NumberEducationalGuideAndFaqProps {
  onNavigateToNameTracing: () => void;
  onNavigateToAlphabetTracing: () => void;
}

export const NumberEducationalGuideAndFaq: React.FC<NumberEducationalGuideAndFaqProps> = ({
  onNavigateToNameTracing,
  onNavigateToAlphabetTracing,
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
            BrightWorkSheets provides 100% free printable practice for names, letters, and numbers.
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
            href="/alphabet-tracing/"
            onClick={(e) => {
              if (onNavigateToAlphabetTracing) {
                e.preventDefault();
                onNavigateToAlphabetTracing();
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-amber-300 text-amber-900 font-bold text-xs hover:bg-amber-50 shadow-2xs transition-all cursor-pointer"
          >
            <span>Alphabet Tracing (A–Z)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Educational Guide: Over 200 words on teaching number writing */}
      <article className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-200/80 shadow-md">
        <div className="flex items-center gap-2.5 text-amber-700 font-bold text-xs uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4 text-amber-500" />
          <span>Parent & Teacher Educational Guide</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 mb-6">
          Teaching Number Writing to Young Children: Connecting Quantity to Form
        </h2>

        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4 text-sm sm:text-base">
          <p>
            Writing numbers is a dual developmental challenge for preschoolers and kindergarteners. Unlike letters, which are primarily linguistic and phonetic symbols, numbers are mathematical abstractions that simultaneously represent discrete quantities, sequence positions, and physical motor strokes. Teaching children to write numerals requires uniting fine motor practice with tactile number sense.
          </p>

          <p>
            Early numeracy instruction begins with counting tangible objects before picking up a pencil. Children should touch blocks, count their fingers, and observe how quantities grow. When moving onto paper, our worksheets link visual counting cues directly alongside the tracing line. Seeing four stars beside the numeral 4 grounds the child's understanding that handwriting is a meaningful communication tool, not just arbitrary marks on a page.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
              <h3 className="font-bold text-amber-950 text-sm flex items-center gap-2 mb-1.5 font-display">
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
                1. Top-to-Bottom Number Rhymes
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                All numbers start at the top! Use fun verbal rhymes such as <em>"Straight line down, and then we're done, that's the way to make a one"</em> or <em>"Around and back on the railroad track, two, two, two!"</em> to anchor the stroke sequence.
              </p>
            </div>

            <div className="bg-sky-50/70 p-4 rounded-2xl border border-sky-200">
              <h3 className="font-bold text-sky-950 text-sm flex items-center gap-2 mb-1.5 font-display">
                <CheckCircle2 className="w-4 h-4 text-sky-600" />
                2. Overcoming Number Reversals
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Numbers like 2, 3, 5, 7, and 9 are notorious for being drawn backwards. Our starting arrows and green initiation dots prevent reversals by training the pencil to begin on the correct side of the midline.
              </p>
            </div>

            <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200">
              <h3 className="font-bold text-emerald-950 text-sm flex items-center gap-2 mb-1.5 font-display">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                3. The Concept of Zero
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Always include zero in early counting practice. Practicing numeral 0 with an empty counting frame teaches children that zero is an essential number representing the absence of objects, preparing them for place-value understanding.
              </p>
            </div>

            <div className="bg-purple-50/70 p-4 rounded-2xl border border-purple-200">
              <h3 className="font-bold text-purple-950 text-sm flex items-center gap-2 mb-1.5 font-display">
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                4. Gradual Release into Free Writing
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Children first trace the solid gray model to feel the curves, trace the dotted versions to solidify muscle memory, and then independently produce the number in the two blank guideline boxes.
              </p>
            </div>
          </div>

          <p>
            Keep daily handwriting sessions brief and rewarding—5 to 10 minutes is ideal for young attention spans. Laminate sheets or slip them into dry-erase pockets to enable cheerful daily math practice without wasting paper!
          </p>
        </div>
      </article>

      {/* Frequently Asked Questions Section */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-200/80 shadow-md">
        <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider mb-2">
          <HelpCircle className="w-4 h-4 text-amber-500" />
          <span>Number Tracing FAQ</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 mb-6">
          Frequently Asked Questions About Number Tracing
        </h2>

        <div className="divide-y divide-slate-100">
          {NUMBER_FAQS.map((faq, index) => {
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
