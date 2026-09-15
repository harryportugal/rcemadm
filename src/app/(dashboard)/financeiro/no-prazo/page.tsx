'use client';

import { FinancialTable } from '@/components/financial/FinancialTable';
import { MOCK_TRANSACTIONS } from '@/data/mockData';

export default function NoPrazoPage() {
  return (
    <FinancialTable
      title="No Prazo"
      subtitle=""
      badgeLabel="em dia"
      statusFilter="on_time"
      transactions={MOCK_TRANSACTIONS}
    />
  );
}
