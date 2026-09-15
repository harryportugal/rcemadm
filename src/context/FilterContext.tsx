'use client';

import React, { createContext, useContext, useState } from 'react';

interface FilterContextType {
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [selectedMonth, setSelectedMonth] = useState('Julho 2026');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <FilterContext.Provider
      value={{
        selectedMonth,
        setSelectedMonth,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
}
