'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize);
  if (totalPages <= 1) return null;

  const from = (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[var(--line)] mt-4">
      <div className="text-xs text-[var(--muted)]">
        Mostrando de <b className="text-[var(--text)]">{from}</b> até{' '}
        <b className="text-[var(--text)]">{to}</b> de{' '}
        <b className="text-[var(--text)]">{totalItems}</b> resultados
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Página anterior"
          className="w-8 h-8 rounded-lg border border-[var(--line)] bg-[var(--surface)] flex items-center justify-center text-[var(--text-2)] hover:border-[var(--teal-deep)] disabled:opacity-40 disabled:pointer-events-none transition-colors"
        >
          <ChevronLeft size={16} />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
              currentPage === page
                ? 'bg-[var(--teal-deep)] text-white'
                : 'border border-[var(--line)] bg-[var(--surface)] text-[var(--text-2)] hover:border-[var(--teal-deep)]'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Próxima página"
          className="w-8 h-8 rounded-lg border border-[var(--line)] bg-[var(--surface)] flex items-center justify-center text-[var(--text-2)] hover:border-[var(--teal-deep)] disabled:opacity-40 disabled:pointer-events-none transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
