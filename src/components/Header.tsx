import React, { useState } from 'react';
import { Pencil, Sparkles, BookOpen, Hash, Menu, X } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onSelectTab?: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onSelectTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const navLinks = [
    { id: 'Home', label: 'Home', href: '/' },
    { id: 'Name Tracing', label: 'Name Tracing', href: '/name-tracing/', badge: 'Popular' },
    { id: 'Alphabet Tracing', label: 'Alphabet Tracing', href: '/alphabet-tracing/' },
    { id: 'Number Tracing', label: 'Number Tracing', href: '/number-tracing/' },
    { id: 'Math Worksheets', label: 'Math Worksheets', href: '/math-worksheets/' },
    { id: 'Word Search', label: 'Word Search', href: '/word-search/' },
    { id: 'Mazes', label: 'Mazes', href: '/mazes/' },
  ];

  const handleNavClick = (tabId: string, href: string, e: React.MouseEvent) => {
    if (onSelectTab) {
      e.preventDefault();
      onSelectTab(tabId);
      window.history.pushState({}, '', href);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <a
            href="/"
            onClick={(e) => handleNavClick('Home', '/', e)}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Pencil className="w-5 h-5 -rotate-45" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black font-display tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors">
                  Bright<span className="text-amber-500">WorkSheets</span>
                </span>
                <span className="inline-block w-2 h-2 rounded-full bg-amber-400"></span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 -mt-1 hidden sm:block">
                Free Early Learning & Handwriting Printables
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navLinks.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(item.id, item.href, e)}
                className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === item.id
                    ? 'bg-amber-100/80 text-amber-900 shadow-xs'
                    : 'text-slate-600 hover:text-amber-700 hover:bg-amber-50/60'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                      item.badge === 'Popular'
                        ? 'bg-amber-500 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>

          {/* Right Action Tag */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              100% Free • No Sign-Up
            </span>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-amber-100/60 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-amber-200 bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg">
          {navLinks.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => handleNavClick(item.id, item.href, e)}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-left text-sm font-semibold cursor-pointer ${
                activeTab === item.id
                  ? 'bg-amber-100 text-amber-900'
                  : 'text-slate-700 hover:bg-amber-50'
              }`}
            >
              <span>{item.label}</span>
              {item.badge && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                    item.badge === 'Popular'
                      ? 'bg-amber-500 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </a>
          ))}
          <div className="pt-2">
            <span className="block text-center text-xs text-emerald-700 bg-emerald-50 py-2 rounded-xl border border-emerald-200 font-semibold">
              Free Printable PDF Generator
            </span>
          </div>
        </div>
      )}

      {/* Toast notification for placeholder links */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-xl text-sm flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </header>
  );
};
