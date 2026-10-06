import React, { useState } from 'react';
import { ChevronDown, HelpCircle, BookOpen, Lightbulb, CheckCircle2 } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "What age is name tracing best suited for?",
    answer:
      "Name tracing practice is developmentally optimal for children between ages 3 and 6 (preschool, Pre-K, and kindergarten). At this stage, young learners are developing bilateral coordination, hand strength, and visual-motor integration needed to form legible letters.",
  },
  {
    question: "How do I save the worksheet as a PDF file?",
    answer:
      "Click the bright 'Print / Save as PDF' button at the top of the generator. In your browser's print preview window, change the 'Destination' or 'Printer' dropdown option to 'Save as PDF'. Make sure the paper layout is set to Portrait and margins to Default or Minimum for best results.",
  },
  {
    question: "Why does Row 1 have solid letters while following rows are dotted?",
    answer:
      "This follows the evidence-based 'Gradual Release of Responsibility' educational model. Row 1 acts as a concrete visual exemplar (modeling). Middle rows provide dotted scaffolding where the child reinforces muscle memory. The final rows remove all tracing supports so children build confidence writing independently.",
  },
  {
    question: "Can teachers and homeschoolers print these in bulk?",
    answer:
      "Yes, absolutely! BrightWorkSheets is 100% free and open for teachers, homeschool co-ops, daycare providers, and occupational therapists. You are free to generate worksheets for every student in your classroom without limits, accounts, or subscriptions.",
  },
  {
    question: "What do the starting arrows and guide lines do?",
    answer:
      "Starting arrows train young writers to follow correct directional flow (top-to-bottom, left-to-right), preventing bad habits like writing letters from the bottom up. The three-tiered guidelines (top sky line, dashed midline, and baseline) teach proper spatial proportions between tall letters, short letters, and descending tails.",
  },
];

export const EducationalGuideAndFaq: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="no-print space-y-12 max-w-4xl mx-auto my-12">
      {/* Educational Guide: Over 200 words for parents and teachers */}
      <article className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-200/80 shadow-md">
        <div className="flex items-center gap-2.5 text-amber-700 font-bold text-xs uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4 text-amber-500" />
          <span>Parent & Teacher Educational Guide</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 mb-6">
          Teaching a Child to Write Their Name: A Gentle, Step-by-Step Approach
        </h2>

        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4 text-sm sm:text-base">
          <p>
            Learning to write their own name is one of the most exciting developmental milestones in an early learner’s life. It builds personal identity, pride, and foundational literacy skills needed for kindergarten and beyond. However, handwriting is a sophisticated cognitive and motor task that requires finger strength, hand-eye coordination, and spatial awareness.
          </p>

          <p>
            Before handing a child a pencil, begin with multisensory pre-writing activities. Encourage finger tracing in sand trays, shaping letters with playdough, or writing large names on whiteboards. These playful exercises establish mental letter pathways before asking their small hand muscles to control a fine pencil on paper.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
              <h3 className="font-bold text-amber-950 text-sm flex items-center gap-2 mb-1.5 font-display">
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
                1. Tripod Pencil Grip & Posture
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Encourage the dynamic tripod grasp (holding the pencil with the thumb and index finger while resting on the middle finger). Short golf pencils or triangular crayons prevent fist clenching and fatigue.
              </p>
            </div>

            <div className="bg-sky-50/70 p-4 rounded-2xl border border-sky-200">
              <h3 className="font-bold text-sky-950 text-sm flex items-center gap-2 mb-1.5 font-display">
                <CheckCircle2 className="w-4 h-4 text-sky-600" />
                2. Top-to-Bottom Stroke Direction
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Children naturally gravitate toward pushing pencils from the bottom up. Teach the song <em>"Where do you start your letters? At the top!"</em> and use our starting arrows to reinforce correct stroke flow.
              </p>
            </div>

            <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200">
              <h3 className="font-bold text-emerald-950 text-sm flex items-center gap-2 mb-1.5 font-display">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                3. First Letter Capital, Rest Lowercase
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                While toddlers often begin with ALL CAPS because straight lines are easier, transitioning to Title Case early (e.g. <em>Emma</em> instead of <em>EMMA</em>) prevents the difficult habit of unlearning all-capital habits in elementary school.
              </p>
            </div>

            <div className="bg-purple-50/70 p-4 rounded-2xl border border-purple-200">
              <h3 className="font-bold text-purple-950 text-sm flex items-center gap-2 mb-1.5 font-display">
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                4. Scaffolding with Gradual Release
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Start by tracing solid letterforms on Row 1, practice dotted lines in middle rows, and finish with free writing on the blank guidelines. Celebrate effort over perfection to build lasting handwriting joy!
              </p>
            </div>
          </div>

          <p>
            Keep daily sessions short, positive, and engaging—5 to 10 minutes of focused tracing once a day yields far better motor memory than lengthy, frustrating drills. Laminate the printed sheet or slide it into a reusable dry-erase pocket for endless eco-friendly name tracing practice!
          </p>
        </div>
      </article>

      {/* Frequently Asked Questions (FAQ) Section */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-200/80 shadow-md">
        <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider mb-2">
          <HelpCircle className="w-4 h-4 text-amber-500" />
          <span>Got Questions?</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 mb-6">
          Frequently Asked Questions
        </h2>

        <div className="divide-y divide-slate-100">
          {FAQS.map((faq, index) => {
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
