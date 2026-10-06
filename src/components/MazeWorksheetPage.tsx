import React from 'react';
import {
  MazeWorksheetModel,
  SingleMazeData,
  MazeTheme,
} from '../utils/mazeGenerator';
import { Compass, CheckCircle } from 'lucide-react';

interface MazeWorksheetPageProps {
  worksheet: MazeWorksheetModel;
  isSolution?: boolean;
  isPrintOnly?: boolean;
}

export const MazeWorksheetPage: React.FC<MazeWorksheetPageProps> = ({
  worksheet,
  isSolution = false,
  isPrintOnly = false,
}) => {
  const { title, difficultyLabel, mazes, batchCount, footerText } = worksheet;

  // Grid layout for 1, 2, or 4 mazes
  const getBatchLayoutClass = () => {
    if (batchCount === 1) return 'grid-cols-1 max-w-lg mx-auto w-full';
    if (batchCount === 2) return 'grid-cols-1 sm:grid-cols-2 gap-6 w-full';
    return 'grid-cols-2 gap-4 w-full'; // 4 mazes: 2x2
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
      <div className="border-b-2 border-dashed border-amber-200/80 pb-3 mb-3">
        <div className="flex items-center justify-between gap-4 text-xs sm:text-sm font-medium text-slate-600 mb-2">
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full border font-display ${
              isSolution
                ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                : 'bg-amber-50 text-amber-900 border-amber-200'
            }`}
          >
            {isSolution ? (
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Compass className="w-3.5 h-3.5 text-amber-600" />
            )}
            <span className="font-bold">
              {isSolution ? `Solution Key: ${title}` : title}
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            {isSolution ? (
              <span className="font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-md text-xs">
                Official Maze Solution
              </span>
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
            {isSolution
              ? 'Complete path solution connecting start marker to finish marker.'
              : 'Help the character find their way through the maze from start to finish!'}
          </p>
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-md text-[11px]">
              {difficultyLabel}
            </span>
            {batchCount > 1 && (
              <span className="text-slate-400 text-[11px] font-mono">
                {batchCount} Mazes
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Mazes Render Grid */}
      <div className={`flex-1 grid ${getBatchLayoutClass()} items-center justify-center my-auto py-2`}>
        {mazes.map((maze) => (
          <div key={`maze-${maze.id}`} className="flex flex-col items-center">
            {batchCount > 1 && (
              <div className="text-xs font-bold text-slate-500 mb-1 font-mono">
                Maze #{maze.id}
              </div>
            )}
            <SingleMazeSvg
              maze={maze}
              isSolution={isSolution}
              batchCount={batchCount}
            />
          </div>
        ))}
      </div>

      {/* Mandatory Footer on Every Worksheet Page and Solution Page */}
      {/* Must appear in live preview and in printed/PDF output, small, light-gray centered */}
      <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 select-none">
        <div className="flex items-center gap-1.5">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isSolution ? 'bg-emerald-500' : 'bg-amber-400'
            }`}
          ></span>
          <span>{isSolution ? 'Official Maze Solution' : 'Focus, Planning & Pencil Control'}</span>
        </div>
        <div className="text-center font-mono font-medium tracking-wider text-slate-400">
          {footerText}
        </div>
        <div className="text-right font-mono">
          {isSolution ? 'Page 2 (Solution)' : 'Page 1 (Maze)'}
        </div>
      </div>
    </div>
  );
};

interface SingleMazeSvgProps {
  maze: SingleMazeData;
  isSolution: boolean;
  batchCount: 1 | 2 | 4;
}

const SingleMazeSvg: React.FC<SingleMazeSvgProps> = ({
  maze,
  isSolution,
  batchCount,
}) => {
  const { gridSize, cells, startCell, finishCell, solutionPath, shape, theme, pathWidth } = maze;

  const N = gridSize;
  const viewBoxSize = 400;
  const margin = 30;
  const cellSize = (viewBoxSize - margin * 2) / N;

  // Wall stroke width based on pathWidth
  let wallStroke = 3;
  let solutionStroke = 4;
  if (pathWidth === 'thin') {
    wallStroke = 2;
    solutionStroke = 3;
  } else if (pathWidth === 'wide') {
    wallStroke = 4.5;
    solutionStroke = 6;
  }

  // Generate SVG lines for walls
  const wallElements: React.ReactNode[] = [];

  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const cell = cells[r][c];
      if (!cell.isValid) continue;

      const x = margin + c * cellSize;
      const y = margin + r * cellSize;

      if (cell.top) {
        wallElements.push(
          <line
            key={`w-t-${r}-${c}`}
            x1={x}
            y1={y}
            x2={x + cellSize}
            y2={y}
            stroke="#000000"
            strokeWidth={wallStroke}
            strokeLinecap="round"
          />
        );
      }
      if (cell.right) {
        wallElements.push(
          <line
            key={`w-r-${r}-${c}`}
            x1={x + cellSize}
            y1={y}
            x2={x + cellSize}
            y2={y + cellSize}
            stroke="#000000"
            strokeWidth={wallStroke}
            strokeLinecap="round"
          />
        );
      }
      if (cell.bottom) {
        wallElements.push(
          <line
            key={`w-b-${r}-${c}`}
            x1={x}
            y1={y + cellSize}
            x2={x + cellSize}
            y2={y + cellSize}
            stroke="#000000"
            strokeWidth={wallStroke}
            strokeLinecap="round"
          />
        );
      }
      if (cell.left) {
        wallElements.push(
          <line
            key={`w-l-${r}-${c}`}
            x1={x}
            y1={y}
            x2={x}
            y2={y + cellSize}
            stroke="#000000"
            strokeWidth={wallStroke}
            strokeLinecap="round"
          />
        );
      }
    }
  }

  // Solution Polyline
  const solutionPoints = solutionPath
    .map(([r, c]) => {
      const cx = margin + c * cellSize + cellSize / 2;
      const cy = margin + r * cellSize + cellSize / 2;
      return `${cx.toFixed(1)},${cy.toFixed(1)}`;
    })
    .join(' ');

  // Center coordinates of start and finish cells
  const startX = margin + startCell[1] * cellSize + cellSize / 2;
  const startY = margin + startCell[0] * cellSize + cellSize / 2;
  const finishX = margin + finishCell[1] * cellSize + cellSize / 2;
  const finishY = margin + finishCell[0] * cellSize + cellSize / 2;

  const iconRadius = Math.min(18, Math.max(9, cellSize * 0.45));

  // Outer border for circle shape
  const centerCoord = viewBoxSize / 2;
  const circleRadius = (viewBoxSize - margin * 2) / 2 + 1;

  // Responsive max width depending on batching
  const maxWidthStyle =
    batchCount === 1 ? 'max-w-[420px]' : batchCount === 2 ? 'max-w-[280px]' : 'max-w-[220px]';

  return (
    <div className={`w-full ${maxWidthStyle} bg-white rounded-2xl shadow-xs border border-slate-200/80 p-1 select-none`}>
      <svg
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        className="w-full h-auto overflow-visible select-none"
      >
        {/* Background */}
        <rect x="0" y="0" width={viewBoxSize} height={viewBoxSize} fill="#ffffff" />

        {/* Circular Outer Ring if circle shape */}
        {shape === 'circle' && (
          <circle
            cx={centerCoord}
            cy={centerCoord}
            r={circleRadius}
            fill="none"
            stroke="#000000"
            strokeWidth={wallStroke + 1}
          />
        )}

        {/* Maze Walls */}
        <g className="maze-walls">{wallElements}</g>

        {/* Solution Path if toggled */}
        {isSolution && solutionPoints && (
          <polyline
            points={solutionPoints}
            fill="none"
            stroke="#10b981"
            strokeWidth={solutionStroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />
        )}

        {/* Start Marker SVG */}
        <g transform={`translate(${startX}, ${startY})`}>
          {renderStartMarker(theme, iconRadius)}
        </g>

        {/* Finish Marker SVG */}
        <g transform={`translate(${finishX}, ${finishY})`}>
          {renderFinishMarker(theme, iconRadius)}
        </g>
      </svg>
    </div>
  );
};

/**
 * Draws the start marker icon based on theme
 */
function renderStartMarker(theme: MazeTheme, r: number) {
  if (theme === 'mouse-cheese') {
    // Cute Mouse face
    return (
      <g transform={`scale(${r / 12})`}>
        {/* Ears */}
        <circle cx="-6" cy="-6" r="5" fill="#f472b6" stroke="#db2777" strokeWidth="1" />
        <circle cx="6" cy="-6" r="5" fill="#f472b6" stroke="#db2777" strokeWidth="1" />
        {/* Head */}
        <circle cx="0" cy="0" r="8" fill="#cbd5e1" stroke="#475569" strokeWidth="1.2" />
        {/* Eyes */}
        <circle cx="-3" cy="-1" r="1.2" fill="#0f172a" />
        <circle cx="3" cy="-1" r="1.2" fill="#0f172a" />
        {/* Nose */}
        <circle cx="0" cy="3" r="1.5" fill="#f43f5e" />
      </g>
    );
  } else if (theme === 'rocket-planet') {
    // Sleek Rocket
    return (
      <g transform={`scale(${r / 12})`}>
        {/* Rocket Body */}
        <path
          d="M 0 -9 C 4 -5 5 2 4 8 L -4 8 C -5 2 -4 -5 0 -9 Z"
          fill="#ef4444"
          stroke="#991b1b"
          strokeWidth="1"
        />
        {/* Fins */}
        <path d="M -4 4 L -8 9 L -4 8 Z" fill="#3b82f6" />
        <path d="M 4 4 L 8 9 L 4 8 Z" fill="#3b82f6" />
        {/* Window */}
        <circle cx="0" cy="-1" r="2.2" fill="#e0f2fe" stroke="#0284c7" strokeWidth="0.8" />
        {/* Flame */}
        <path d="M -2 8 L 0 12 L 2 8 Z" fill="#f59e0b" />
      </g>
    );
  } else {
    // Star to Heart: Golden Star
    return (
      <g transform={`scale(${r / 12})`}>
        <path
          d="M 0 -9 L 2.6 -3.2 L 9 -2.5 L 4.2 1.8 L 5.5 8 L 0 4.8 L -5.5 8 L -4.2 1.8 L -9 -2.5 L -2.6 -3.2 Z"
          fill="#f59e0b"
          stroke="#b45309"
          strokeWidth="1"
        />
      </g>
    );
  }
}

/**
 * Draws the finish marker icon based on theme
 */
function renderFinishMarker(theme: MazeTheme, r: number) {
  if (theme === 'mouse-cheese') {
    // Swiss Cheese wedge
    return (
      <g transform={`scale(${r / 12})`}>
        <path
          d="M -8 6 L 8 6 L 5 -7 L -8 6 Z"
          fill="#fbbf24"
          stroke="#d97706"
          strokeWidth="1.2"
        />
        {/* Cheese holes */}
        <circle cx="-1" cy="2" r="1.8" fill="#f59e0b" />
        <circle cx="3" cy="1" r="1.2" fill="#f59e0b" />
        <circle cx="0" cy="-3" r="1.5" fill="#f59e0b" />
      </g>
    );
  } else if (theme === 'rocket-planet') {
    // Ringed Planet
    return (
      <g transform={`scale(${r / 12})`}>
        {/* Planet sphere */}
        <circle cx="0" cy="0" r="6" fill="#8b5cf6" stroke="#6d28d9" strokeWidth="1" />
        {/* Ring */}
        <ellipse
          cx="0"
          cy="0"
          rx="10"
          ry="3"
          fill="none"
          stroke="#fbbf24"
          strokeWidth="1.5"
          transform="rotate(-20)"
        />
      </g>
    );
  } else {
    // Star to Heart: Ruby Heart
    return (
      <g transform={`scale(${r / 12})`}>
        <path
          d="M 0 3 C -4 -2 -8 -2 -8 -5 C -8 -8 -4 -8 0 -4 C 4 -8 8 -8 8 -5 C 8 -2 4 -2 0 3 Z"
          fill="#ef4444"
          stroke="#b91c1c"
          strokeWidth="1"
          transform="scale(1.2) translate(0, -1)"
        />
      </g>
    );
  }
}
