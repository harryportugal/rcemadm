'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Transaction } from '@/types';
import { formatBRL, getInitials } from '@/hooks/useMask';

interface FinancialTableProps {
  title: string;
  subtitle: string;
  badgeLabel: string;
  transactions: Transaction[];
  statusFilter?: Transaction['status'];
  showDateNav?: boolean;
}

export default function FinancialTable({
  title,
  subtitle,
  transactions: initialTransactions,
  statusFilter,
  showDateNav = false,
}: FinancialTableProps) {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [search, setSearch] = useState('');
  const [date, setDate] = useState('2026-06-30');
  const [isSettleModalOpen, setIsSettleModalOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [settleMethod, setSettleMethod] = useState('PIX — Conta Basspago');
  const [settleNotes, setSettleNotes] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenSettleModal = (tx: Transaction) => {
    setSelectedTx(tx);
    setSettleMethod('PIX — Conta Basspago');
    setSettleNotes('');
    setIsSettleModalOpen(true);
  };

  const handleConfirmSettlement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTx) return;

    setTransactions((prev) =>
      prev.map((t) =>
        t.id === selectedTx.id
          ? {
              ...t,
              status: 'paid',
              paidDate: new Date().toLocaleDateString('pt-BR'),
            }
          : t
      )
    );

    showToast(`Baixa de pagamento de ${formatBRL(selectedTx.totalAmount)} confirmada para ${selectedTx.clientName}!`);
    setIsSettleModalOpen(false);
    setSelectedTx(null);
  };

  const filtered = transactions.filter((tx) => {
    if (statusFilter && tx.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        tx.clientName.toLowerCase().includes(q) ||
        tx.line.toLowerCase().includes(q) ||
        tx.collectorName?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalAmount = filtered.reduce((acc, curr) => acc + curr.totalAmount, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* ====================================================================
           1. TOP HEADER & SUMMARY
           ==================================================================== */}
      <div
        className="vance-card vance-cascade-item delay-1"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <h1 style={{ fontSize: '22px', margin: 0, fontWeight: 600 }}>{title}</h1>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          {toastMessage && (
            <span className="vance-badge green" style={{ padding: '6px 14px', fontSize: '12px' }}>
              {toastMessage}
            </span>
          )}

          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              padding: '10px 16px',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}
          >
            <span style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Volume Total</span>
            <span className="tnum" style={{ fontSize: '17px', fontWeight: 600, color: 'var(--text-main)' }}>
              {formatBRL(totalAmount)}
            </span>
          </div>
        </div>
      </div>

      {/* ====================================================================
           2. TOOLBAR: SEARCH & DATE PICKER
           ==================================================================== */}
      <div
        className="vance-card vance-cascade-item delay-2"
        style={{
          padding: '14px 18px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '14px',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ position: 'relative', flex: '1', minWidth: '260px' }}>
          <svg
            className="icon-svg icon-sm"
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-subtle)',
            }}
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            className="vance-input"
            placeholder="Buscar por cliente, linha ou cobrador..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '36px' }}
          />
        </div>

        {showDateNav && (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input
              type="date"
              className="vance-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ width: 'auto', padding: '6px 14px' }}
            />
          </div>
        )}
      </div>

      {/* ====================================================================
           3. TRANSACTIONS GRID
           ==================================================================== */}
      {filtered.length === 0 ? (
        <div
          className="vance-card vance-cascade-item delay-3"
          style={{
            padding: '48px 24px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-surface)',
              display: 'grid',
              placeItems: 'center',
              color: 'var(--text-muted)',
            }}
          >
            <svg className="icon-svg" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" />
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <h3 style={{ fontSize: '16px', margin: 0 }}>Nenhum registro encontrado</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
            Não há recebimentos ou cobranças correspondentes ao filtro ativo.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '18px',
          }}
        >
          {filtered.map((tx, idx) => (
            <div
              key={tx.id}
              className={`vance-card vance-cascade-item delay-${(idx % 6) + 3}`}
              style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
            >
              {/* Top Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      backgroundColor:
                        tx.status === 'late'
                          ? 'var(--neg-bg)'
                          : tx.status === 'paid'
                          ? 'var(--accent-green-bg)'
                          : 'var(--bg-surface)',
                      color:
                        tx.status === 'late'
                          ? 'var(--neg)'
                          : tx.status === 'paid'
                          ? 'var(--accent-green)'
                          : 'var(--text-main)',
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: '12.5px',
                      fontWeight: 500,
                    }}
                  >
                    {getInitials(tx.clientName)}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '14.5px', margin: 0, color: 'var(--text-main)' }}>
                      {tx.clientName}
                    </h3>
                    <div style={{ fontSize: '11px', color: 'var(--text-subtle)', marginTop: '1px' }}>
                      {tx.line} • {tx.collectorName || 'Cobrador Padrão'}
                    </div>
                  </div>
                </div>

                {tx.status === 'late' ? (
                  <span className="vance-badge neg" style={{ fontSize: '10.5px' }}>
                    Atrasado · {tx.daysLate || 1}d
                  </span>
                ) : tx.status === 'paid' ? (
                  <span className="vance-badge green" style={{ fontSize: '10.5px' }}>
                    Liquidado
                  </span>
                ) : (
                  <span className="vance-badge" style={{ fontSize: '10.5px' }}>
                    No Prazo
                  </span>
                )}
              </div>

              {/* Financial Breakdown Micro-Box */}
              <div
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  fontSize: '12px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-subtle)' }}>Vencimento</span>
                  <span className="tnum" style={{ color: 'var(--text-main)', fontWeight: 500 }}>
                    {tx.dueDate}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-subtle)' }}>Principal</span>
                  <span className="tnum" style={{ color: 'var(--text-main)' }}>
                    {formatBRL(tx.principal)}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-subtle)' }}>Taxa / Juros (60%)</span>
                  <span className="tnum" style={{ color: 'var(--text-main)' }}>
                    {formatBRL(tx.interest)}
                  </span>
                </div>
                {tx.penaltyFee ? (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--neg)' }}>
                    <span>Multa por atraso</span>
                    <span className="tnum">+{formatBRL(tx.penaltyFee)}</span>
                  </div>
                ) : null}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: '6px',
                    borderTop: '1px solid rgba(0,0,0,0.04)',
                    fontSize: '13px',
                  }}
                >
                  <span style={{ fontWeight: 500, color: 'var(--text-main)' }}>Total a Receber</span>
                  <span className="tnum" style={{ fontWeight: 500, color: tx.status === 'paid' ? 'var(--accent-green)' : 'var(--text-main)' }}>
                    {formatBRL(tx.totalAmount)}
                  </span>
                </div>
              </div>

              {/* Bottom Actions */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 'auto',
                  paddingTop: '2px',
                }}
              >
                <Link href="/detalhes-financeiros" className="vance-btn sm">
                  <svg className="icon-svg icon-xs" viewBox="0 0 24 24">
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <span>Detalhes</span>
                </Link>

                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <a
                    href={`https://wa.me/5511999999999?text=${encodeURIComponent(
                      `Olá ${tx.clientName}, identificamos sua cobrança RCEM no valor de ${formatBRL(
                        tx.totalAmount
                      )} com vencimento em ${tx.dueDate}. Chave PIX: pagamentos@rcempix.com`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="vance-icon-btn"
                    title="Cobrar via WhatsApp"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.403 5.586A9.78 9.78 0 0 0 11.47 2.7c-5.412 0-9.814 4.402-9.817 9.816a9.78 9.78 0 0 0 1.312 4.908L1.7 22.3l5.048-1.324a9.79 9.79 0 0 0 4.72 1.218h.004c5.411 0 9.814-4.402 9.817-9.816.001-2.623-1.02-5.088-2.886-6.952zm-6.933 15.027h-.003a8.16 8.16 0 0 1-4.16-1.135l-.298-.177-3.09.81.824-3.013-.195-.31a8.16 8.16 0 0 1-1.25-4.398c.003-4.507 3.67-8.174 8.18-8.174 2.183 0 4.236.85 5.778 2.393a8.12 8.12 0 0 1 2.39 5.78c-.003 4.508-3.67 8.175-8.176 8.175zm4.484-6.13c-.246-.123-1.457-.719-1.683-.801-.226-.082-.391-.123-.555.123-.165.247-.638.801-.782.966-.144.165-.288.185-.534.062-.246-.123-1.04-.383-1.982-1.223-.733-.654-1.228-1.463-1.372-1.71-.144-.247-.015-.38.109-.503.111-.11.246-.288.37-.432.123-.144.164-.247.246-.412.082-.165.041-.309-.02-.432-.062-.124-.556-1.337-.762-1.831-.2-.482-.403-.417-.555-.425l-.473-.008c-.164 0-.432.062-.658.309s-.864.844-.864 2.06 0 2.39 1.07 3.83c1.07 1.44 2.508 2.2 3.6 2.668.784.336 1.498.288 2.062.204.629-.094 1.933-.79 2.201-1.551.267-.76.267-1.41.185-1.551-.082-.141-.246-.223-.492-.346z"/>
                    </svg>
                  </a>

                  {tx.status !== 'paid' ? (
                    <button
                      className="vance-btn primary sm"
                      onClick={() => handleOpenSettleModal(tx)}
                    >
                      <svg className="icon-svg icon-xs" viewBox="0 0 24 24">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>Baixar</span>
                    </button>
                  ) : (
                    <span className="vance-badge green" style={{ fontSize: '10.5px' }}>
                      Quitado
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ====================================================================
           4. MODAL: DAR BAIXA MANUAL DE PAGAMENTO
           ==================================================================== */}
      {isSettleModalOpen && selectedTx && (
        <div className="vance-modal-backdrop open" onClick={() => setIsSettleModalOpen(false)}>
          <div
            className="vance-modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '18px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-green-bg)',
                    color: 'var(--accent-green)',
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', margin: 0 }}>Dar Baixa no Pagamento</h3>
                  <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>
                    Confirmar recebimento manual e liquidar contrato
                  </div>
                </div>
              </div>
              <button
                className="vance-icon-btn"
                style={{ width: '28px', height: '28px' }}
                onClick={() => setIsSettleModalOpen(false)}
              >
                <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Summary Box */}
            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-md)',
                padding: '14px',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontSize: '12.5px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-subtle)' }}>Tomador</span>
                <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>{selectedTx.clientName}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-subtle)' }}>Linha</span>
                <span style={{ color: 'var(--text-main)' }}>{selectedTx.line}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '4px', borderTop: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-subtle)' }}>Valor Liquidado</span>
                <span className="tnum" style={{ color: 'var(--accent-green)', fontWeight: 500, fontSize: '15px' }}>
                  {formatBRL(selectedTx.totalAmount)}
                </span>
              </div>
            </div>

            <form onSubmit={handleConfirmSettlement} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Forma de Recebimento
                </label>
                <select
                  className="vance-select"
                  value={settleMethod}
                  onChange={(e) => setSettleMethod(e.target.value)}
                >
                  <option value="PIX — Conta Basspago">PIX — Conta Basspago</option>
                  <option value="Dinheiro em mãos — Cobrador de Linha">Dinheiro em mãos — Cobrador de Linha</option>
                  <option value="Transferência Bancária / TED">Transferência Bancária / TED</option>
                  <option value="Outro canal autorizado">Outro canal autorizado</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Observações / Código do Comprovante (Opcional)
                </label>
                <input
                  type="text"
                  className="vance-input"
                  placeholder="Ex: Autenticação bancária #993218"
                  value={settleNotes}
                  onChange={(e) => setSettleNotes(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '6px' }}>
                <button
                  type="button"
                  className="vance-btn"
                  onClick={() => setIsSettleModalOpen(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="vance-btn primary"
                >
                  Confirmar Baixa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
export { FinancialTable };
