import React from 'react';

export const AdPlaceholder: React.FC = () => {
  return (
    <div className="no-print w-full my-8 max-w-4xl mx-auto">
      <div className="bg-amber-50/60 border border-dashed border-amber-300/80 rounded-2xl p-4 text-center">
        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-2">
          Advertisement
        </span>
        <div className="w-full min-h-[90px] max-h-[120px] bg-white rounded-xl border border-slate-200/80 flex flex-col items-center justify-center p-4 shadow-2xs">
          <p className="text-xs sm:text-sm font-medium text-slate-400">
            Support free learning tools for teachers & parents
          </p>
          <p className="text-[11px] text-slate-300 mt-1">
            Responsive Ad Space (728x90 Leaderboard / 300x250 Banner)
          </p>
        </div>
      </div>
    </div>
  );
};
