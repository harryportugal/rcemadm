'use client';

import React from 'react';

interface GaugeChartProps {
  score?: number;
  label?: string;
  sublabel?: string;
}

export function GaugeChart({
  score = 92.6,
  label = 'Excelente',
  sublabel = 'Inadimplência sob controle (7,4%)',
}: GaugeChartProps) {
  // Semi-circle perimeter for radius 70 is approx 220
  const circumference = 220;
  const strokeDashoffset = circumference - (circumference * (score / 100));

  return (
    <div className="flex flex-col items-center justify-center p-2">
      <div className="relative w-44 h-24 flex items-end justify-center overflow-hidden">
        <svg className="w-44 h-44 absolute -top-1" viewBox="0 0 160 160">
          {/* Background track */}
          <path
            d="M 20 100 A 60 60 0 0 1 140 100"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.08"
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* Active progress */}
          <path
            d="M 20 100 A 60 60 0 0 1 140 100"
            fill="none"
            stroke="#159A6A"
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        <div className="text-center z-10 -mb-1">
          <div className="text-2xl font-medium tracking-tight text-[var(--text)]">
            {score}%
          </div>
        </div>
      </div>

      <div className="mt-2 text-center">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--pos-bg)] text-[var(--pos)]">
          ● {label}
        </span>
        <p className="text-[11.5px] text-[var(--muted)] mt-1">{sublabel}</p>
      </div>
    </div>
  );
}
