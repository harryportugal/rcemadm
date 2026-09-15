'use client';

import React from 'react';

export function DonutChart() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-40 h-40">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          {/* Segment 1: Pagos no prazo (75%) */}
          <circle
            cx="50"
            cy="50"
            r="38"
            fill="none"
            stroke="#159A6A"
            strokeWidth="11"
            strokeDasharray="179 238"
            className="transition-all duration-700"
          />
          {/* Segment 2: Em atraso (18%) */}
          <circle
            cx="50"
            cy="50"
            r="38"
            fill="none"
            stroke="#1D1D1F"
            strokeWidth="11"
            strokeDasharray="43 238"
            strokeDashoffset="-179"
            className="transition-all duration-700"
          />
          {/* Segment 3: Renegociados (7%) */}
          <circle
            cx="50"
            cy="50"
            r="38"
            fill="none"
            stroke="#8E8E93"
            strokeWidth="11"
            strokeDasharray="16 238"
            strokeDashoffset="-222"
            className="transition-all duration-700"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-[10.5px] uppercase font-medium text-[var(--muted)] tracking-wider">
            Total
          </span>
          <span className="text-xl font-medium text-[var(--text)] tracking-tight">
            184
          </span>
          <span className="text-[10px] text-[var(--muted)]">Contratos</span>
        </div>
      </div>

      <div className="w-full space-y-2 text-xs">
        <div className="flex items-center justify-between text-[var(--text-2)]">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#159A6A]" /> No prazo (75%)
          </span>
          <span className="font-medium text-[var(--text)]">138</span>
        </div>
        <div className="flex items-center justify-between text-[var(--text-2)]">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#1D1D1F]" /> Atrasados (18%)
          </span>
          <span className="font-medium text-[var(--text)]">33</span>
        </div>
        <div className="flex items-center justify-between text-[var(--text-2)]">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#8E8E93]" /> Renegociados (7%)
          </span>
          <span className="font-medium text-[var(--text)]">13</span>
        </div>
      </div>
    </div>
  );
}
