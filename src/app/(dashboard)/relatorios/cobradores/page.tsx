'use client';

import React, { useState } from 'react';
import { formatBRL } from '@/hooks/useMask';
import { exportToCsv } from '@/utils/exportCsv';

const COLLECTORS = [
  { name: 'Gabriel', initials: 'GA', contracts: 10, received: 420, late: 200, target: 480, rate: '87.5%', rank: 'Top performance' },
  { name: 'Juninho', initials: 'JU', contracts: 0, received: 0, late: 0, target: 0, rate: '0%', rank: 'Sem movimento' },
];

export default function RelatorioCobradoresPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleExport = () => {
    const data = COLLECTORS.map((c) => ({
      Nome: c.name,
      Contratos_Ativos: c.contracts,
      Taxa_Eficiencia: c.rate,
      Recebido_RS: c.received,
      Atrasado_RS: c.late,
      Meta_RS: c.target,
      Classificacao: c.rank,
    }));

    exportToCsv('relatorio_cobradores_rcem', data);
    showToast('Relatório de cobradores exportado em CSV com sucesso!');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* ====================================================================
           1. TOP HEADER
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
          <h1 style={{ fontSize: '22px', margin: 0, fontWeight: 600 }}>Cobradores</h1>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          {toastMessage && (
            <span className="vance-badge green" style={{ padding: '6px 14px', fontSize: '12px' }}>
              {toastMessage}
            </span>
          )}

          <button
            type="button"
            className="vance-btn primary sm"
            onClick={handleExport}
          >
            <svg className="icon-svg icon-xs" viewBox="0 0 24 24">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
            <span>Exportar Relatório</span>
          </button>
        </div>
      </div>

      {/* ====================================================================
           2. COLLECTORS PERFORMANCE GRID
           ==================================================================== */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '20px',
        }}
      >
        {COLLECTORS.map((c, idx) => (
          <div
            key={c.name}
            className={`vance-card vance-cascade-item delay-${idx + 2}`}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: c.contracts > 0 ? 'var(--accent-green-bg)' : 'var(--bg-surface)',
                    color: c.contracts > 0 ? 'var(--accent-green)' : 'var(--text-muted)',
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: '13px',
                    fontWeight: 500,
                  }}
                >
                  {c.initials}
                </div>
                <div>
                  <h3 style={{ fontSize: '15px', margin: 0, color: 'var(--text-main)' }}>{c.name}</h3>
                  <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Cobrador de Linha</div>
                </div>
              </div>

              <span
                className={`vance-badge ${c.contracts > 0 ? 'green' : ''}`}
                style={{ fontSize: '10.5px' }}
              >
                {c.rank}
              </span>
            </div>

            {/* Metrics micro-tiles */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '10px',
              }}
            >
              <div className="vance-tile">
                <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Contratos Ativos</div>
                <div className="tnum" style={{ fontSize: '16px', fontWeight: 500, color: 'var(--text-main)', marginTop: '2px' }}>
                  {c.contracts}
                </div>
              </div>

              <div className="vance-tile">
                <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Taxa de Eficiência</div>
                <div className="tnum" style={{ fontSize: '16px', fontWeight: 500, color: 'var(--accent-green)', marginTop: '2px' }}>
                  {c.rate}
                </div>
              </div>

              <div className="vance-tile">
                <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Recebido no Mês</div>
                <div className="tnum" style={{ fontSize: '15px', fontWeight: 500, color: 'var(--text-main)', marginTop: '2px' }}>
                  {formatBRL(c.received)}
                </div>
              </div>

              <div className="vance-tile">
                <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Total em Atraso</div>
                <div className="tnum" style={{ fontSize: '15px', fontWeight: 500, color: c.late > 0 ? 'var(--neg)' : 'var(--text-subtle)', marginTop: '2px' }}>
                  {formatBRL(c.late)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
