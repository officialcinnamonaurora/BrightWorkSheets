import React from 'react';
import { WorksheetModel, WorksheetRow } from '../utils/worksheetGenerator';
import { Pencil, Star } from 'lucide-react';

interface WorksheetPageProps {
  worksheet: WorksheetModel;
  isPrintOnly?: boolean;
}

export const WorksheetPage: React.FC<WorksheetPageProps> = ({ worksheet, isPrintOnly = false }) => {
  const { metrics, rows, showGuideLines, showStartingArrows } = worksheet;

  return (
    <div
      id={isPrintOnly ? 'printable-worksheet-page' : 'preview-worksheet'}
      className={
        isPrintOnly
          ? 'w-full bg-white text-slate-900 p-8 flex flex-col justify-between'
          : 'worksheet-container relative bg-white text-slate-900 border border-slate-200 shadow-xl rounded-2xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden transition-all duration-200 mx-auto select-none'
      }
      style={
        isPrintOnly
          ? undefined
          : {
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
            }
      }
    >
      {/* Top Header Section */}
      <div className="border-b-2 border-dashed border-amber-200/80 pb-4 mb-3">
        <div className="flex items-center justify-between gap-4 text-xs sm:text-sm font-medium text-slate-600 mb-2.5">
          <div className="flex items-center gap-1.5 bg-amber-50 text-amber-900 px-3 py-1 rounded-full border border-amber-200 font-display">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span className="font-semibold">{worksheet.title}</span>
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span className="border-b border-slate-300 pb-0.5 tracking-wide">
              Name: <span className="inline-block w-28 sm:w-36 border-b border-slate-400"></span>
            </span>
            <span className="border-b border-slate-300 pb-0.5 tracking-wide hidden xs:inline-block">
              Date: <span className="inline-block w-20 sm:w-24 border-b border-slate-400"></span>
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500">
          <p className="italic text-slate-400">{worksheet.subtext}</p>
          <div className="flex items-center gap-3">
            {showStartingArrows && (
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                Start at green dot
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Handwriting Rows Area */}
      <div className="flex-1 flex flex-col justify-evenly py-1 gap-2 sm:gap-3">
        {rows.map((row) => (
          <WorksheetRowItem
            key={row.index}
            row={row}
            worksheet={worksheet}
            showGuideLines={showGuideLines}
            showStartingArrows={showStartingArrows}
          />
        ))}
      </div>

      {/* Bottom Worksheet Mandatory Branding Footer */}
      {/* Required: Must appear in live preview and printed/PDF output, small, light gray */}
      <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          <span>Practice makes progress!</span>
        </div>
        <div className="text-center font-mono font-medium tracking-wider text-slate-400">
          {worksheet.footerText}
        </div>
        <div className="text-right">
          Row 1–{worksheet.totalRows}
        </div>
      </div>
    </div>
  );
};

interface WorksheetRowItemProps {
  row: WorksheetRow;
  worksheet: WorksheetModel;
  showGuideLines: boolean;
  showStartingArrows: boolean;
}

const WorksheetRowItem: React.FC<WorksheetRowItemProps> = ({
  row,
  worksheet,
  showGuideLines,
  showStartingArrows,
}) => {
  const { metrics, fontStyle } = worksheet;
  const height = metrics.rowHeightPx;
  const viewBoxWidth = 680;
  
  // Calculate vertical positions
  const topY = (height * metrics.toplinePercent) / 100;
  const midY = (height * metrics.midlinePercent) / 100;
  const baseY = (height * metrics.baselinePercent) / 100;

  // Text start offset
  const textStartX = 56;
  const displayText = row.displayText;

  return (
    <div className="relative w-full group">
      <svg
        viewBox={`0 0 ${viewBoxWidth} ${height}`}
        className="w-full h-auto overflow-visible select-none"
        style={{ minHeight: `${Math.round(height * 0.75)}px` }}
      >
        {/* Handwriting Guidelines */}
        {showGuideLines && (
          <g className="guidelines">
            {/* Top Line (Sky Line) - solid light slate/blue */}
            <line
              x1="38"
              y1={topY}
              x2={viewBoxWidth - 20}
              y2={topY}
              stroke="#94a3b8"
              strokeWidth="1.2"
              strokeOpacity="0.7"
            />

            {/* Midline (Plane Line) - dashed slate/blue */}
            <line
              x1="38"
              y1={midY}
              x2={viewBoxWidth - 20}
              y2={midY}
              stroke="#60a5fa"
              strokeWidth="1.2"
              strokeDasharray="6,5"
              strokeOpacity="0.75"
            />

            {/* Baseline (Grass Line) - solid grounding line */}
            <line
              x1="38"
              y1={baseY}
              x2={viewBoxWidth - 20}
              y2={baseY}
              stroke="#64748b"
              strokeWidth="1.5"
              strokeOpacity="0.8"
            />
          </g>
        )}

        {/* Starting cue arrow & dot at the row margin */}
        {showStartingArrows && (row.type === 'solid-trace' || row.showArrows) && (
          <g className="start-cue">
            <circle cx="24" cy={topY + 2} r="4.5" fill="#22c55e" />
            <path
              d={`M 24 ${topY + 8} L 24 ${midY - 4}`}
              stroke="#22c55e"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d={`M 21.5 ${midY - 7} L 24 ${midY - 3} L 26.5 ${midY - 7}`}
              fill="none"
              stroke="#22c55e"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        )}

        {/* Free Writing Indicator Icon for empty lines */}
        {row.type === 'free-write' && (
          <g opacity="0.45" transform={`translate(20, ${midY - 8})`}>
            <circle cx="6" cy="8" r="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
            <path
              d="M 3 11 L 8 4 L 10 5 L 5 12 Z"
              fill="#94a3b8"
            />
          </g>
        )}

        {/* Render Text Content */}
        {displayText && (
          <>
            {/* ROW 1: Solid Light Gray for initial tracing model */}
            {row.type === 'solid-trace' && (
              <text
                x={textStartX}
                y={baseY}
                fontFamily={metrics.fontFamily}
                fontSize={metrics.fontSizePx}
                letterSpacing={metrics.letterSpacing}
                dominantBaseline="alphabetic"
                fill="#94a3b8"
                stroke="#64748b"
                strokeWidth="0.6"
                strokeLinecap="round"
                className="select-none"
              >
                {displayText}
              </text>
            )}

            {/* FOLLOWING ROWS: Dotted / Faded Tracing Text */}
            {row.type === 'dotted-trace' && (
              <>
                {fontStyle === 'dotted' ? (
                  /* Dotted Outline style with crisp dotted strokes */
                  <text
                    x={textStartX}
                    y={baseY}
                    fontFamily={metrics.fontFamily}
                    fontSize={metrics.fontSizePx}
                    letterSpacing={metrics.letterSpacing}
                    dominantBaseline="alphabetic"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="1.8"
                    strokeDasharray="3,4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="select-none"
                  >
                    {displayText}
                  </text>
                ) : fontStyle === 'cursive' ? (
                  /* Cursive Tracing with dashed pen lines */
                  <text
                    x={textStartX}
                    y={baseY}
                    fontFamily={metrics.fontFamily}
                    fontSize={metrics.fontSizePx}
                    letterSpacing={metrics.letterSpacing}
                    dominantBaseline="alphabetic"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="1.8"
                    strokeDasharray="3,3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="select-none"
                  >
                    {displayText}
                  </text>
                ) : (
                  /* Print Tracing with dotted strokes */
                  <text
                    x={textStartX}
                    y={baseY}
                    fontFamily={metrics.fontFamily}
                    fontSize={metrics.fontSizePx}
                    letterSpacing={metrics.letterSpacing}
                    dominantBaseline="alphabetic"
                    fill="#e2e8f0"
                    stroke="#94a3b8"
                    strokeWidth="1.6"
                    strokeDasharray="3,3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="select-none"
                  >
                    {displayText}
                  </text>
                )}
              </>
            )}

            {/* In-letter start dot for the first character when starting arrows enabled */}
            {showStartingArrows && (row.type === 'solid-trace' || row.showArrows) && (
              <g className="letter-start-marker">
                <circle
                  cx={textStartX + 4}
                  cy={topY + 3}
                  r="3.5"
                  fill="#22c55e"
                  stroke="#ffffff"
                  strokeWidth="1"
                />
              </g>
            )}
          </>
        )}

        {/* Free-write placeholder text hint in light font when empty */}
        {row.type === 'free-write' && (
          <text
            x={textStartX}
            y={midY + 4}
            fontFamily="'Fredoka', sans-serif"
            fontSize="12"
            fill="#cbd5e1"
            letterSpacing="0.05em"
            className="select-none print:hidden"
          >
            (Write your name here)
          </text>
        )}
      </svg>
    </div>
  );
};
