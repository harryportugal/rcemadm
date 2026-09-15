'use client';

import { FinancialTable } from '@/components/financial/FinancialTable';
import { MOCK_TRANSACTIONS } from '@/data/mockData';

export default function RepassesPage() {
  return (
    <FinancialTable
      title="Repasses PIX"
      subtitle=""
      badgeLabel="repasses"
      statusFilter="pending_disbursement"
      transactions={MOCK_TRANSACTIONS}
    />
  );
}
