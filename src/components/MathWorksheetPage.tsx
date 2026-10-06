import React from 'react';
import { MathWorksheetModel } from '../utils/mathGenerator';
import { Star, CheckCircle, Calculator } from 'lucide-react';

interface MathWorksheetPageProps {
  worksheet: MathWorksheetModel;
  isAnswerKey?: boolean;
  isPrintOnly?: boolean;
}

export const MathWorksheetPage: React.FC<MathWorksheetPageProps> = ({
  worksheet,
  isAnswerKey = false,
  isPrintOnly = false,
}) => {
  const { problems, layout, columnsCount, title, difficultyLabel } = worksheet;

  // Compute CSS grid column classes based on layout and count
  const getGridColsClass = () => {
    if (layout === 'vertical') {
      if (columnsCount === 2) return 'grid-cols-2 gap-x-12 gap-y-8';
      if (columnsCount === 3) return 'grid-cols-3 gap-x-8 gap-y-7';
      if (columnsCount === 4) return 'grid-cols-4 gap-x-6 gap-y-6';
      return 'grid-cols-5 gap-x-4 gap-y-5'; // 30 problems
    } else {
      if (columnsCount === 2) return 'grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5';
      return 'grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4';
    }
  };

  return (
    <div
      className={
        isPrintOnly
          ? 'print-worksheet-page w-full bg-white text-slate-900 p-8 flex flex-col justify-between'
          : 'worksheet-container relative bg-white text-slate-900 border border-slate-200 shadow-xl rounded-2xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden transition-all duration-200 mx-auto select-none'
      }
      style={
        isPrintOnly
          ? { minHeight: '98vh' }
          : {
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
            }
      }
    >
      {/* Top Header Section */}
      <div className="border-b-2 border-dashed border-amber-200/80 pb-4 mb-3">
        <div className="flex items-center justify-between gap-4 text-xs sm:text-sm font-medium text-slate-600 mb-2">
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full border font-display ${
              isAnswerKey
                ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                : 'bg-amber-50 text-amber-900 border-amber-200'
            }`}
          >
            {isAnswerKey ? (
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Calculator className="w-3.5 h-3.5 text-amber-600" />
            )}
            <span className="font-bold">
              {isAnswerKey ? `Answer Key: ${title}` : title}
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            {isAnswerKey ? (
              <div className="flex items-center gap-3 text-xs font-bold text-emerald-800">
                <span className="bg-emerald-100/70 px-2.5 py-1 rounded-md">
                  Total Problems: {problems.length}
                </span>
                <span className="border-b border-slate-300 pb-0.5">
                  Score: ______ / {problems.length}
                </span>
              </div>
            ) : (
              <>
                <span className="border-b border-slate-300 pb-0.5 tracking-wide">
                  Name: <span className="inline-block w-28 sm:w-36 border-b border-slate-400"></span>
                </span>
                <span className="border-b border-slate-300 pb-0.5 tracking-wide hidden xs:inline-block">
                  Date: <span className="inline-block w-20 sm:w-24 border-b border-slate-400"></span>
                </span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500">
          <p className="italic text-slate-400">
            {isAnswerKey
              ? 'Complete solution key for teacher and self-checking.'
              : 'Solve each math problem below. Write your answers neatly.'}
          </p>
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-md text-[11px]">
              {difficultyLabel}
            </span>
            <span className="text-slate-400 text-[11px] font-mono">
              {problems.length} Problems
            </span>
          </div>
        </div>
      </div>

      {/* Main Problems Grid Area */}
      <div className={`flex-1 grid ${getGridColsClass()} items-center content-around py-2 sm:py-4`}>
        {problems.map((problem) => (
          <div key={`p-${problem.id}`} className="relative group">
            {layout === 'vertical' ? (
              /* Vertical Stacked Arithmetic Format */
              <div className="flex items-start justify-center">
                {/* Problem Index Number */}
                <span className="text-[11px] text-slate-400 font-mono font-medium mr-2 mt-0.5 select-none">
                  {problem.id})
                </span>

                {/* Stacked Numbers Block */}
                <div className="w-20 sm:w-24 flex flex-col font-mono text-base sm:text-lg">
                  {/* Top Operand */}
                  <div className="text-right pr-2 text-slate-800 font-semibold tracking-wider">
                    {problem.displayNum1}
                  </div>

                  {/* Operator & Bottom Operand */}
                  <div className="flex items-center justify-between pr-2 text-slate-800 font-semibold tracking-wider">
                    <span className="text-sm font-bold text-amber-600 pl-1">
                      {problem.operator}
                    </span>
                    <span>{problem.displayNum2}</span>
                  </div>

                  {/* Horizontal Equation Bar */}
                  <div className="w-full border-b-2 border-slate-700 my-0.5"></div>

                  {/* Answer Zone */}
                  <div className="h-7 sm:h-8 flex items-center justify-end pr-2">
                    {isAnswerKey ? (
                      <span className="font-bold text-emerald-700 text-base sm:text-lg animate-fadeIn">
                        {problem.answer}
                      </span>
                    ) : (
                      <span className="inline-block w-full h-full border border-dashed border-slate-300 rounded-md bg-slate-50/50 print:bg-transparent"></span>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* Horizontal Inline Arithmetic Format */
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50/70 border border-slate-200/80 font-mono text-sm sm:text-base print:bg-transparent print:border-slate-300">
                <span className="text-[11px] text-slate-400 font-sans font-medium mr-1 select-none">
                  {problem.id}.
                </span>
                <span className="font-semibold text-slate-800 tracking-wide">
                  {problem.displayNum1} {problem.operator} {problem.displayNum2} =
                </span>
                <div className="w-16 h-7 flex items-center justify-center border-b-2 border-slate-500 ml-2">
                  {isAnswerKey ? (
                    <span className="font-bold text-emerald-700 text-sm sm:text-base">
                      {problem.answer}
                    </span>
                  ) : (
                    <span className="w-full h-full"></span>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mandatory Footer on Every Worksheet Page and Answer Key Page */}
      {/* Must appear in live preview and in printed/PDF output, small, light-gray centered */}
      <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 select-none">
        <div className="flex items-center gap-1.5">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isAnswerKey ? 'bg-emerald-500' : 'bg-amber-400'
            }`}
          ></span>
          <span>{isAnswerKey ? 'Official Answer Key' : 'Daily Math Practice & Fluency'}</span>
        </div>
        <div className="text-center font-mono font-medium tracking-wider text-slate-400">
          {worksheet.footerText}
        </div>
        <div className="text-right font-mono">
          {isAnswerKey ? 'Page 2 (Key)' : 'Page 1 (Sheet)'}
        </div>
      </div>
    </div>
  );
};
