import React, { useState } from 'react';
import { SITE_CONFIG } from '../data/siteConfig';
import {
  Mail,
  Copy,
  Check,
  MessageSquare,
  Clock,
  Sparkles,
  HelpCircle,
  Bug,
  Lightbulb,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(SITE_CONFIG.contactEmail);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = SITE_CONFIG.contactEmail;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="no-print max-w-4xl mx-auto py-6 sm:py-10 px-4 sm:px-6">
      {/* Category Tag */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-4">
        <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
        <span>Get in Touch</span>
      </div>

      {/* Main H1 */}
      <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-slate-900 leading-tight mb-4">
        Contact <span className="text-amber-500">Us</span>
      </h1>

      {/* Short Intro */}
      <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl mb-8">
        We love hearing from teachers, parents, and homeschoolers! Whether you have a question about how our
        generators work, feedback on a printable layout, a bug to report, or an idea for a brand new worksheet tool,
        your message is warmly welcomed.
      </p>

      {/* Primary Contact Card (No Form) */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-200/80 shadow-md mb-10 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Direct Email Address
          </span>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 bg-amber-50/60 border border-amber-200 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-white shrink-0 shadow-xs">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <a
                  href={`mailto:${SITE_CONFIG.contactEmail}`}
                  className="text-base sm:text-lg font-bold text-slate-900 hover:text-amber-600 font-mono transition-colors break-all"
                  title="Send email via your default email client"
                >
                  {SITE_CONFIG.contactEmail}
                </a>
                <p className="text-xs text-slate-500">Click to open your email client</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopyEmail}
              className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer shadow-xs ${
                copied
                  ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500" />
                  <span>Copy email</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Expected response time line */}
        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
          <Clock className="w-4 h-4 text-amber-600 shrink-0" />
          <span>We usually reply within {SITE_CONFIG.responseTurnaround}.</span>
        </div>
      </div>

      {/* Helpful Reasons to Write In */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold font-display text-slate-900">
          What Can We Help You With?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center text-sky-700">
              <Lightbulb className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Worksheet Requests</h3>
            <p className="text-xs text-slate-600 leading-normal">
              Need a specific phonics template, grid size, or tracing font style? Tell us what your learners need!
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center text-rose-700">
              <Bug className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Bug Reports</h3>
            <p className="text-xs text-slate-600 leading-normal">
              Noticed an issue printing on your specific browser or printer? Let us know your device and browser version.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700">
              <HelpCircle className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">General Questions</h3>
            <p className="text-xs text-slate-600 leading-normal">
              Questions regarding classroom licensing, PDF scaling, or handwriting guidelines.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
