import React from 'react';
import {
  NumberPageModel,
  NumberRowModel,
  NumberFontStyle,
} from '../utils/worksheetGenerator';
import { Star } from 'lucide-react';

interface NumberWorksheetPageProps {
  page: NumberPageModel;
  fontStyle: NumberFontStyle;
  showGuideLines: boolean;
  showStartingArrows: boolean;
  isPrintOnly?: boolean;
}

export const NumberWorksheetPage: React.FC<NumberWorksheetPageProps> = ({
  page,
  fontStyle,
  showGuideLines,
  showStartingArrows,
  isPrintOnly = false,
}) => {
  const { rows, metrics, totalPages, pageIndex, rangeLabel } = page;

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
      <div className="border-b-2 border-dashed border-amber-200/80 pb-4 mb-2">
        <div className="flex items-center justify-between gap-4 text-xs sm:text-sm font-medium text-slate-600 mb-2">
          <div className="flex items-center gap-1.5 bg-amber-50 text-amber-900 px-3 py-1 rounded-full border border-amber-200 font-display">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span className="font-semibold">{page.title}</span>
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
          <p className="italic text-slate-400">{page.subtext}</p>
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-md text-[11px]">
              {rangeLabel}
            </span>
            {totalPages > 1 && (
              <span className="text-slate-400 text-[11px] font-mono">
                {pageIndex} / {totalPages}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Number Handwriting Rows Area */}
      <div className="flex-1 flex flex-col justify-evenly py-1 gap-2">
        {rows.map((row) => (
          <NumberRowItem
            key={row.rowIndex + '-' + row.numberValue}
            row={row}
            page={page}
            fontStyle={fontStyle}
            showGuideLines={showGuideLines}
            showStartingArrows={showStartingArrows}
          />
        ))}
      </div>

      {/* Mandatory Footer on Every Worksheet Page */}
      {/* Must appear in live preview and in printed/PDF output, small, light-gray centered */}
      <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          <span>Number Tracing • Math & Penmanship</span>
        </div>
        <div className="text-center font-mono font-medium tracking-wider text-slate-400">
          {page.footerText}
        </div>
        <div className="text-right font-mono">
          Page {pageIndex} of {totalPages}
        </div>
      </div>
    </div>
  );
};

interface NumberRowItemProps {
  row: NumberRowModel;
  page: NumberPageModel;
  fontStyle: NumberFontStyle;
  showGuideLines: boolean;
  showStartingArrows: boolean;
}

const NumberRowItem: React.FC<NumberRowItemProps> = ({
  row,
  page,
  fontStyle,
  showGuideLines,
  showStartingArrows,
}) => {
  const { metrics } = page;
  const height = metrics.rowHeightPx;
  const viewBoxWidth = 690;

  // Guidelines positions
  const topY = (height * metrics.toplinePercent) / 100;
  const midY = (height * metrics.midlinePercent) / 100;
  const baseY = (height * metrics.baselinePercent) / 100;

  const leftMargin = 38;
  const countingPanelWidth = row.showCountObjects ? 130 : 0;
  const usableWritingWidth = viewBoxWidth - leftMargin - countingPanelWidth - 15;

  // Columns for writing: 1 model + N trace + 2 free writing boxes
  const totalWritingCols = 1 + row.traceCopies.length + row.emptyBoxCount;
  const colWidth = usableWritingWidth / totalWritingCols;

  return (
    <div className="relative w-full group">
      <svg
        viewBox={`0 0 ${viewBoxWidth} ${height}`}
        className="w-full h-auto overflow-visible select-none"
        style={{ minHeight: `${Math.round(height * 0.72)}px` }}
      >
        {/* Handwriting Guidelines across the writing zone */}
        {showGuideLines && (
          <g className="guidelines">
            {/* Top Line (Sky line) */}
            <line
              x1={leftMargin}
              y1={topY}
              x2={viewBoxWidth - 15}
              y2={topY}
              stroke="#94a3b8"
              strokeWidth="1.2"
              strokeOpacity="0.75"
            />

            {/* Midline (Plane line dashed) */}
            <line
              x1={leftMargin}
              y1={midY}
              x2={viewBoxWidth - 15}
              y2={midY}
              stroke="#60a5fa"
              strokeWidth="1.2"
              strokeDasharray="6,5"
              strokeOpacity="0.8"
            />

            {/* Baseline (Grass line) */}
            <line
              x1={leftMargin}
              y1={baseY}
              x2={viewBoxWidth - 15}
              y2={baseY}
              stroke="#64748b"
              strokeWidth="1.5"
              strokeOpacity="0.85"
            />
          </g>
        )}

        {/* Starting cue marker on left margin */}
        {showStartingArrows && (
          <g className="start-cue">
            <circle cx="20" cy={topY + 2} r="4" fill="#22c55e" />
            <path
              d={`M 20 ${topY + 6} L 20 ${midY - 4}`}
              stroke="#22c55e"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path
              d={`M 18 ${midY - 7} L 20 ${midY - 3} L 22 ${midY - 7}`}
              fill="none"
              stroke="#22c55e"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        )}

        {/* 1. SOLID LIGHT GRAY MODEL NUMBER */}
        <g className="model-cell">
          <rect
            x={leftMargin}
            y={topY - 4}
            width={colWidth - 6}
            height={baseY - topY + 8}
            fill="#f8fafc"
            stroke="#cbd5e1"
            strokeWidth="0.8"
            rx="4"
            opacity="0.8"
          />

          <text
            x={leftMargin + colWidth / 2 - 3}
            y={baseY}
            fontFamily={metrics.fontFamily}
            fontSize={metrics.fontSizePx}
            letterSpacing={metrics.letterSpacing}
            dominantBaseline="alphabetic"
            textAnchor="middle"
            fill="#94a3b8"
            stroke="#64748b"
            strokeWidth="0.7"
            strokeLinecap="round"
          >
            {row.modelNumber}
          </text>

          <text
            x={leftMargin + colWidth / 2 - 3}
            y={topY - 6}
            fontFamily="'Fredoka', sans-serif"
            fontSize="8.5"
            fill="#94a3b8"
            textAnchor="middle"
            fontWeight="bold"
          >
            MODEL
          </text>

          {showStartingArrows && (
            <circle
              cx={leftMargin + colWidth / 2 - (row.displayNumber.length > 1 ? 14 : 7)}
              cy={topY + 2}
              r="3.2"
              fill="#22c55e"
              stroke="#ffffff"
              strokeWidth="1"
            />
          )}
        </g>

        {/* OPTIONAL: COUNT THE OBJECTS PANEL (NEXT TO MODEL NUMBER) */}
        {row.showCountObjects && (
          <g
            className="count-objects-panel"
            transform={`translate(${leftMargin + colWidth}, ${topY - 4})`}
          >
            <rect
              x="2"
              y="0"
              width={countingPanelWidth - 6}
              height={baseY - topY + 8}
              fill="#fffbeb"
              stroke="#fcd34d"
              strokeWidth="1"
              strokeDasharray="3,3"
              rx="6"
            />

            <text
              x={(countingPanelWidth - 6) / 2}
              y="-2"
              fontFamily="'Fredoka', sans-serif"
              fontSize="8"
              fill="#d97706"
              textAnchor="middle"
              fontWeight="bold"
            >
              COUNT: {row.objectCount}
            </text>

            {/* Draw counted objects (stars or circles) */}
            {renderCountObjects(row.objectCount, countingPanelWidth - 10, baseY - topY + 8, row.objectShape)}
          </g>
        )}

        {/* 2. DOTTED / FADED COPIES TO TRACE */}
        {row.traceCopies.map((copy, idx) => {
          const colX = leftMargin + colWidth + countingPanelWidth + idx * colWidth;
          const centerX = colX + colWidth / 2;

          return (
            <g key={`trace-${idx}`} className="trace-cell">
              <line
                x1={colX}
                y1={topY}
                x2={colX}
                y2={baseY}
                stroke="#e2e8f0"
                strokeWidth="1"
                strokeDasharray="2,3"
              />

              {fontStyle === 'dotted' ? (
                /* Crisp Dotted Outline */
                <text
                  x={centerX}
                  y={baseY}
                  fontFamily={metrics.fontFamily}
                  fontSize={metrics.fontSizePx}
                  letterSpacing={metrics.letterSpacing}
                  dominantBaseline="alphabetic"
                  textAnchor="middle"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="1.8"
                  strokeDasharray="3,4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {copy}
                </text>
              ) : (
                /* Print style with dashed stroke */
                <text
                  x={centerX}
                  y={baseY}
                  fontFamily={metrics.fontFamily}
                  fontSize={metrics.fontSizePx}
                  letterSpacing={metrics.letterSpacing}
                  dominantBaseline="alphabetic"
                  textAnchor="middle"
                  fill="#e2e8f0"
                  stroke="#94a3b8"
                  strokeWidth="1.6"
                  strokeDasharray="3,3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {copy}
                </text>
              )}

              {showStartingArrows && idx === 0 && (
                <circle
                  cx={centerX - (copy.length > 1 ? 14 : 7)}
                  cy={topY + 2}
                  r="3.2"
                  fill="#22c55e"
                  stroke="#ffffff"
                  strokeWidth="0.8"
                />
              )}
            </g>
          );
        })}

        {/* 3. TWO EMPTY BOXES FOR FREE WRITING */}
        {Array.from({ length: row.emptyBoxCount }).map((_, boxIdx) => {
          const colX =
            leftMargin +
            colWidth +
            countingPanelWidth +
            row.traceCopies.length * colWidth +
            boxIdx * colWidth;
          const boxWidth = colWidth - 4;
          const centerX = colX + boxWidth / 2;

          return (
            <g key={`free-box-${boxIdx}`} className="free-write-box">
              <rect
                x={colX + 2}
                y={topY - 4}
                width={boxWidth}
                height={baseY - topY + 8}
                fill="#fbfcfe"
                stroke="#94a3b8"
                strokeWidth="1.2"
                strokeDasharray="4,4"
                rx="5"
                opacity="0.9"
              />

              <text
                x={centerX}
                y={topY - 6}
                fontFamily="'Fredoka', sans-serif"
                fontSize="8.5"
                fill="#94a3b8"
                textAnchor="middle"
                fontWeight="bold"
              >
                YOUR TURN
              </text>

              <g
                opacity="0.35"
                transform={`translate(${centerX - 6}, ${midY - 6})`}
              >
                <path
                  d="M 2 10 L 8 2 L 11 4 L 4 12 Z"
                  fill="#94a3b8"
                />
                <circle cx="2" cy="11" r="1.5" fill="#64748b" />
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/**
 * Draws that many simple shapes (stars or circles) using SVG code
 */
function renderCountObjects(
  count: number,
  panelWidth: number,
  panelHeight: number,
  shape: 'star' | 'circle' = 'star'
) {
  if (count === 0) {
    return (
      <text
        x={panelWidth / 2}
        y={panelHeight / 2 + 4}
        fontFamily="'Fredoka', sans-serif"
        fontSize="11"
        fill="#94a3b8"
        textAnchor="middle"
        fontStyle="italic"
      >
        (Zero / Empty)
      </text>
    );
  }

  // Draw up to 20 shapes neatly arranged in 1 or 2 rows
  const maxShapesToDraw = Math.min(count, 20);
  const cols = Math.min(10, Math.ceil(maxShapesToDraw / (maxShapesToDraw > 10 ? 2 : 1)));
  const rows = maxShapesToDraw > 10 ? 2 : 1;

  const shapeSize = maxShapesToDraw > 10 ? 5.5 : 7.5;
  const paddingX = 10;
  const availableW = panelWidth - paddingX * 2;
  const spacingX = cols > 1 ? availableW / (cols - 1) : 0;
  const centerY = panelHeight / 2;
  const spacingY = 16;

  const elements: React.ReactNode[] = [];

  for (let i = 0; i < maxShapesToDraw; i++) {
    const row = Math.floor(i / cols);
    const col = i % cols;
    const x = cols === 1 ? panelWidth / 2 : paddingX + col * spacingX;
    const y = rows === 1 ? centerY : centerY - spacingY / 2 + row * spacingY;

    if (shape === 'circle') {
      elements.push(
        <circle
          key={`shape-${i}`}
          cx={x}
          cy={y}
          r={shapeSize}
          fill="#f59e0b"
          stroke="#d97706"
          strokeWidth="1"
        />
      );
    } else {
      // 5-point Star SVG path
      elements.push(
        <path
          key={`shape-${i}`}
          d={getStarPath(x, y, shapeSize, shapeSize * 0.45)}
          fill="#f59e0b"
          stroke="#d97706"
          strokeWidth="0.8"
        />
      );
    }
  }

  // If count is > 20, show a small label (+N more)
  if (count > 20) {
    elements.push(
      <text
        key="overflow-count"
        x={panelWidth - 6}
        y={panelHeight - 4}
        fontFamily="'Fredoka', sans-serif"
        fontSize="9"
        fill="#b45309"
        textAnchor="end"
        fontWeight="bold"
      >
        +{count - 20} more
      </text>
    );
  }

  return <g>{elements}</g>;
}

/**
 * Creates SVG path for a 5-point star
 */
function getStarPath(cx: number, cy: number, outerR: number, innerR: number): string {
  let path = '';
  const points = 5;
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = (i * Math.PI) / points - Math.PI / 2;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    if (i === 0) {
      path += `M ${x.toFixed(1)} ${y.toFixed(1)}`;
    } else {
      path += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
    }
  }
  return path + ' Z';
}
