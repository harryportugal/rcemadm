'use client';

import React from 'react';

export function AreaChart() {
  return (
    <div className="w-full h-48 relative flex items-end">
      <svg
        className="w-full h-full overflow-visible"
        viewBox="0 0 600 160"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C8F86E" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#C8F86E" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Grid horizontal lines */}
        <line x1="0" y1="30" x2="600" y2="30" stroke="currentColor" strokeOpacity="0.06" />
        <line x1="0" y1="80" x2="600" y2="80" stroke="currentColor" strokeOpacity="0.06" />
        <line x1="0" y1="130" x2="600" y2="130" stroke="currentColor" strokeOpacity="0.06" />

        {/* Area fill */}
        <path
          d="M 0 140 Q 80 110, 150 90 T 300 65 T 450 40 T 600 20 L 600 160 L 0 160 Z"
          fill="url(#areaGrad)"
        />

        {/* Top stroke line */}
        <path
          d="M 0 140 Q 80 110, 150 90 T 300 65 T 450 40 T 600 20"
          fill="none"
          stroke="#159A6A"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* End glowing dot */}
        <circle cx="600" cy="20" r="5.5" fill="#C8F86E" stroke="#003C3C" strokeWidth="2.5" />
      </svg>
    </div>
  );
}
