'use client';

import { FinancialTable } from '@/components/financial/FinancialTable';
import { MOCK_TRANSACTIONS } from '@/data/mockData';

export default function RecebimentosPage() {
  return (
    <FinancialTable
      title="Recebimentos"
      subtitle=""
      badgeLabel="cobranças"
      transactions={MOCK_TRANSACTIONS}
    />
  );
}
