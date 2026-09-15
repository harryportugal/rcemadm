'use client';

import React from 'react';

const DAYS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const HOURS = ['08h', '11h', '14h', '17h'];

// Heatmap intensity values 0 to 4
const MATRIX = [
  [1, 3, 4, 2],
  [2, 4, 3, 1],
  [4, 4, 2, 3],
  [3, 2, 4, 4],
  [4, 3, 3, 2],
  [1, 2, 1, 0],
];

const COLORS = [
  'bg-[var(--line)]',
  'bg-[#159A6A]/20',
  'bg-[#159A6A]/45',
  'bg-[#159A6A]/75',
  'bg-[#159A6A]',
];

export function HeatmapChart() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-[11px] text-[var(--muted)] mb-2 font-medium">
        <span>Horários de maior pagamento</span>
        <div className="flex items-center gap-1.5">
          <span>Menos</span>
          <span className="w-2.5 h-2.5 rounded-xs bg-[var(--line)]" />
          <span className="w-2.5 h-2.5 rounded-xs bg-[#159A6A]/45" />
          <span className="w-2.5 h-2.5 rounded-xs bg-[#159A6A]" />
          <span>Mais</span>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-2">
        {DAYS.map((day, dIdx) => (
          <div key={day} className="flex flex-col items-center gap-1.5">
            <span className="text-[11px] font-medium text-[var(--muted)]">{day}</span>
            <div className="flex flex-col gap-1.5 w-full">
              {HOURS.map((hour, hIdx) => {
                const val = MATRIX[dIdx][hIdx];
                return (
                  <div
                    key={hour}
                    title={`${day} às ${hour}: Nível de atividade ${val}/4`}
                    className={`h-6 rounded-md ${COLORS[val]} transition-transform hover:scale-105 cursor-pointer`}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
