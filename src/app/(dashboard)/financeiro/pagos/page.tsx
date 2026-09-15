'use client';

import { FinancialTable } from '@/components/financial/FinancialTable';
import { MOCK_TRANSACTIONS } from '@/data/mockData';

export default function PagosPage() {
  return (
    <FinancialTable
      title="Quitados"
      subtitle=""
      badgeLabel="quitados"
      statusFilter="paid"
      transactions={MOCK_TRANSACTIONS}
    />
  );
}
