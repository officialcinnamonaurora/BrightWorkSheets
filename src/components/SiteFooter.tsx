import React from 'react';
import { Pencil, Heart } from 'lucide-react';

interface SiteFooterProps {
  onSelectTab?: (tab: string) => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ onSelectTab }) => {
  const handleLinkClick = (tabName: string, href: string, e: React.MouseEvent) => {
    if (onSelectTab) {
      e.preventDefault();
      onSelectTab(tabName);
      window.history.pushState({}, '', href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="no-print site-footer bg-white border-t border-amber-200 mt-16 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <a
            href="/"
            onClick={(e) => handleLinkClick('Home', '/', e)}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-500 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
              <Pencil className="w-4 h-4 -rotate-45" />
            </div>
            <div>
              <span className="font-display font-black text-lg text-slate-900 group-hover:text-amber-600 transition-colors">
                Bright<span className="text-amber-500">WorkSheets</span>
              </span>
              <p className="text-xs text-slate-500">
                Free printable early education handwriting & math tools
              </p>
            </div>
          </a>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-600 font-medium">
            <a
              href="/name-tracing/"
              onClick={(e) => handleLinkClick('Name Tracing', '/name-tracing/', e)}
              className="hover:text-amber-600 transition-colors"
            >
              Name Tracing
            </a>
            <a
              href="/alphabet-tracing/"
              onClick={(e) => handleLinkClick('Alphabet Tracing', '/alphabet-tracing/', e)}
              className="hover:text-amber-600 transition-colors"
            >
              Alphabet Tracing
            </a>
            <a
              href="/number-tracing/"
              onClick={(e) => handleLinkClick('Number Tracing', '/number-tracing/', e)}
              className="hover:text-amber-600 transition-colors"
            >
              Number Tracing
            </a>
            <a
              href="/math-worksheets/"
              onClick={(e) => handleLinkClick('Math Worksheets', '/math-worksheets/', e)}
              className="hover:text-amber-600 transition-colors"
            >
              Math Drills
            </a>
            <a
              href="/word-search/"
              onClick={(e) => handleLinkClick('Word Search', '/word-search/', e)}
              className="hover:text-amber-600 transition-colors"
            >
              Word Search
            </a>
            <a
              href="/mazes/"
              onClick={(e) => handleLinkClick('Mazes', '/mazes/', e)}
              className="hover:text-amber-600 transition-colors"
            >
              Mazes
            </a>
          </div>

          <div className="text-xs text-slate-400 text-center md:text-right flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for little learners everywhere</span>
          </div>
        </div>

        {/* Legal & Static Page Links Next to Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>© BrightWorkSheets. All rights reserved.</span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <a
              href="/about/"
              onClick={(e) => handleLinkClick('About', '/about/', e)}
              className="hover:text-amber-700 hover:underline transition-colors"
            >
              About
            </a>
            <span className="text-slate-300">•</span>
            <a
              href="/privacy/"
              onClick={(e) => handleLinkClick('Privacy Policy', '/privacy/', e)}
              className="hover:text-amber-700 hover:underline transition-colors"
            >
              Privacy Policy
            </a>
            <span className="text-slate-300">•</span>
            <a
              href="/contact/"
              onClick={(e) => handleLinkClick('Contact', '/contact/', e)}
              className="hover:text-amber-700 hover:underline transition-colors"
            >
              Contact
            </a>
            <span className="text-slate-300">•</span>
            <a
              href="/terms/"
              onClick={(e) => handleLinkClick('Terms of Use', '/terms/', e)}
              className="hover:text-amber-700 hover:underline transition-colors"
            >
              Terms of Use
            </a>
          </div>

          <p className="text-slate-400 text-[11px]">
            brightworksheets.com — Clean, safe, ad-light educational printables
          </p>
        </div>
      </div>
    </footer>
  );
};

