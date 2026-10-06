import React from 'react';
import { SITE_CONFIG } from '../data/siteConfig';
import {
  Sparkles,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Zap,
  Printer,
  Heart,
} from 'lucide-react';

interface AboutPageProps {
  onNavigateToTool: (toolId: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateToTool }) => {
  return (
    <div className="no-print max-w-4xl mx-auto py-6 sm:py-10 px-4 sm:px-6">
      {/* Breadcrumb / Category Tag */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-4">
        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
        <span>Our Story & Mission</span>
      </div>

      {/* Main H1 */}
      <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-slate-900 leading-tight mb-6">
        About <span className="text-amber-500">BrightWorkSheets</span>
      </h1>

      {/* 150-200 words introduction */}
      <article className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-base sm:text-lg mb-10 space-y-4">
        <p>
          Welcome to <strong>BrightWorkSheets</strong> ({SITE_CONFIG.domain})! We build free, high-quality
          printable learning tools and worksheets designed specifically for parents, preschool teachers,
          kindergarten educators, and homeschooling families. We believe early childhood learning should be
          joyful, accessible, and completely hassle-free.
        </p>
        <p>
          Unlike traditional printable websites that bury activities behind paywalls, subscription forms, or
          cluttered downloads, every single worksheet on BrightWorkSheets is generated instantly right in your
          web browser. There are no accounts to create, no passwords to remember, and absolutely no software
          or plug-ins to install. You simply customize the options you want, preview the activity in real time,
          and print or save crisp, standard Letter and A4 PDFs with a single click.
        </p>
        <p className="p-4 bg-amber-50/80 border-l-4 border-amber-500 rounded-r-2xl font-medium text-amber-950 text-base">
          <strong>Our Mission:</strong> To provide simple, clean, ad-light learning printables that empower educators
          and caregivers to support every child's handwriting, literacy, math, and problem-solving journey.
        </p>
      </article>

      {/* Core Principles */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <div className="bg-white p-5 rounded-2xl border border-amber-200/80 shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
            <Zap className="w-5 h-5" />
          </div>
          <h2 className="font-bold text-slate-900 text-base">Client-Side Generation</h2>
          <p className="text-xs text-slate-600 leading-normal">
            Everything compiles in your browser. Names, words, and customized settings are never uploaded to servers.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-amber-200/80 shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="font-bold text-slate-900 text-base">100% Free & No Sign-Up</h2>
          <p className="text-xs text-slate-600 leading-normal">
            Immediate access for busy classrooms and homes. No credit cards, no login gates, and no hidden fees.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-amber-200/80 shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-sky-100 flex items-center justify-center text-sky-700">
            <Printer className="w-5 h-5" />
          </div>
          <h2 className="font-bold text-slate-900 text-base">Printer-Perfect PDFs</h2>
          <p className="text-xs text-slate-600 leading-normal">
            Clean A4 and US Letter page proportions with automatic print styles that remove ads and navigation.
          </p>
        </div>
      </section>

      {/* Short List of Tools with Links */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-sm mb-12">
        <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-amber-800">
          <BookOpen className="w-4 h-4 text-amber-600" />
          <span>Explore Our Free Generators</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 mb-6">
          Interactive Worksheet Tools Available Today
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SITE_CONFIG.tools.map((tool) => (
            <button
              key={tool.id}
              type="button"
              onClick={() => onNavigateToTool(tool.id)}
              className="group text-left p-4 rounded-2xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                    {tool.title}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all shrink-0" />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {tool.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Bottom Callout */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-200 text-center space-y-2">
        <p className="text-sm font-semibold text-slate-800 flex items-center justify-center gap-1.5">
          <span>Created with</span>
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500 inline" />
          <span>for curious little learners, caring parents, and dedicated teachers.</span>
        </p>
        <p className="text-xs text-slate-500">
          Have an idea for a new printable activity? Visit our{' '}
          <a href="/contact/" className="text-amber-700 font-bold hover:underline">
            Contact page
          </a>{' '}
          or email us directly at{' '}
          <a
            href={`mailto:${SITE_CONFIG.contactEmail}`}
            className="text-amber-700 font-bold hover:underline font-mono"
          >
            {SITE_CONFIG.contactEmail}
          </a>
          .
        </p>
      </div>
    </div>
  );
};
