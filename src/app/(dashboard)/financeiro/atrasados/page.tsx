'use client';

import { FinancialTable } from '@/components/financial/FinancialTable';
import { MOCK_TRANSACTIONS } from '@/data/mockData';

export default function AtrasadosPage() {
  return (
    <FinancialTable
      title="Atrasados"
      subtitle=""
      badgeLabel="atrasados"
      statusFilter="late"
      transactions={MOCK_TRANSACTIONS}
    />
  );
}
