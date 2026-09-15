'use client';

import React from 'react';
import Link from 'next/link';

export default function DetalhesFinanceirosPage() {
  const loanHistory = [
    { id: 7, current: true, status: 'late', statusText: 'Pago · 4 dias de atraso', amount: 'R$ 320,00', took: '09/06/2026', due: '10/06/2026', paid: '14/06/2026', breakdown: 'R$ 200 + R$ 120' },
    { id: 6, current: false, status: 'paid', statusText: 'Pago no prazo', amount: 'R$ 320,00', took: '20/04/2026', due: '20/05/2026', paid: '19/05/2026', breakdown: 'R$ 200 + R$ 120' },
    { id: 5, current: false, status: 'paid', statusText: 'Pago no prazo', amount: 'R$ 320,00', took: '12/03/2026', due: '11/04/2026', paid: '10/04/2026', breakdown: 'R$ 200 + R$ 120' },
    { id: 4, current: false, status: 'late', statusText: 'Pago · 4 dias de atraso', amount: 'R$ 320,00', took: '10/01/2026', due: '09/02/2026', paid: '13/02/2026', breakdown: 'R$ 200 + R$ 120' },
    { id: 3, current: false, status: 'paid', statusText: 'Pago no prazo', amount: 'R$ 320,00', took: '02/12/2025', due: '01/01/2026', paid: '30/12/2025', breakdown: 'R$ 200 + R$ 120' },
    { id: 2, current: false, status: 'paid', statusText: 'Pago no prazo', amount: 'R$ 320,00', took: '20/10/2025', due: '19/11/2025', paid: '19/11/2025', breakdown: 'R$ 200 + R$ 120' },
    { id: 1, current: false, status: 'paid', statusText: 'Pago no prazo', amount: 'R$ 320,00', took: '15/09/2025', due: '15/10/2025', paid: '14/10/2025', breakdown: 'R$ 200 + R$ 120' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* ====================================================================
           1. TOP HEADER & BREADCRUMB
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Link
              href="/solicitacao-detalhe"
              className="vance-btn sm"
              style={{ padding: '4px 10px', fontSize: '11px', gap: '4px' }}
            >
              <svg className="icon-svg icon-xs" viewBox="0 0 24 24">
                <path d="m15 18-6-6 6-6" />
              </svg>
              <span>Voltar</span>
            </Link>
            <span className="vance-badge green" style={{ fontSize: '11px' }}>
              Em dia
            </span>
          </div>
          <h1 style={{ fontSize: '24px', margin: 0, fontWeight: 600 }}>Henrique Junio Bastos Santos</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px', margin: 0 }}>
            Tier 2 Recorrente • 7 ciclos
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noreferrer"
            className="vance-btn sm"
            style={{ backgroundColor: 'var(--bg-surface)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.403 5.586A9.78 9.78 0 0 0 11.47 2.7c-5.412 0-9.814 4.402-9.817 9.816a9.78 9.78 0 0 0 1.312 4.908L1.7 22.3l5.048-1.324a9.79 9.79 0 0 0 4.72 1.218h.004c5.411 0 9.814-4.402 9.817-9.816.001-2.623-1.02-5.088-2.886-6.952zm-6.933 15.027h-.003a8.16 8.16 0 0 1-4.16-1.135l-.298-.177-3.09.81.824-3.013-.195-.31a8.16 8.16 0 0 1-1.25-4.398c.003-4.507 3.67-8.174 8.18-8.174 2.183 0 4.236.85 5.778 2.393a8.12 8.12 0 0 1 2.39 5.78c-.003 4.508-3.67 8.175-8.176 8.175zm4.484-6.13c-.246-.123-1.457-.719-1.683-.801-.226-.082-.391-.123-.555.123-.165.247-.638.801-.782.966-.144.165-.288.185-.534.062-.246-.123-1.04-.383-1.982-1.223-.733-.654-1.228-1.463-1.372-1.71-.144-.247-.015-.38.109-.503.111-.11.246-.288.37-.432.123-.144.164-.247.246-.412.082-.165.041-.309-.02-.432-.062-.124-.556-1.337-.762-1.831-.2-.482-.403-.417-.555-.425l-.473-.008c-.164 0-.432.062-.658.309s-.864.844-.864 2.06 0 2.39 1.07 3.83c1.07 1.44 2.508 2.2 3.6 2.668.784.336 1.498.288 2.062.204.629-.094 1.933-.79 2.201-1.551.267-.76.267-1.41.185-1.551-.082-.141-.246-.223-.492-.346z"/>
            </svg>
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      {/* ====================================================================
           2. 4-METRIC KPIS OVERVIEW
           ==================================================================== */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
        }}
      >
        <div className="vance-card vance-cascade-item delay-2">
          <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Total Emprestado</div>
          <div className="tnum" style={{ fontSize: '20px', fontWeight: 500, color: 'var(--text-main)', marginTop: '4px' }}>
            R$ 1.400,00
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Acumulado em 7 ciclos
          </div>
        </div>

        <div className="vance-card vance-cascade-item delay-3">
          <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Total Pago</div>
          <div className="tnum" style={{ fontSize: '20px', fontWeight: 500, color: 'var(--text-main)', marginTop: '4px' }}>
            R$ 2.240,00
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Principal + taxas
          </div>
        </div>

        <div className="vance-card vance-cascade-item delay-4">
          <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Lucro Líquido Gerado</div>
          <div className="tnum" style={{ fontSize: '20px', fontWeight: 500, color: 'var(--accent-green)', marginTop: '4px' }}>
            R$ 840,00
          </div>
          <div style={{ fontSize: '11px', color: 'var(--accent-green)', marginTop: '4px' }}>
            +60% de retorno por ciclo
          </div>
        </div>

        <div className="vance-card vance-cascade-item delay-5">
          <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Histórico de Atrasos</div>
          <div className="tnum" style={{ fontSize: '20px', fontWeight: 500, color: 'var(--text-main)', marginTop: '4px' }}>
            2 de 7 ciclos
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-subtle)', marginTop: '4px' }}>
            Taxa de adimplência 71,4%
          </div>
        </div>
      </div>

      {/* ====================================================================
           3. LOAN HISTORY LIST
           ==================================================================== */}
      <div
        className="vance-card vance-cascade-item delay-6"
        style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
            <h2 style={{ fontSize: '16px', margin: 0 }}>Histórico de Empréstimos (7)</h2>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {loanHistory.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-lg)',
                padding: '16px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '14px',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <b style={{ fontSize: '14px', color: 'var(--text-main)', fontWeight: 500 }}>
                    Empréstimo #{item.id} {item.current && '· Atual'}
                  </b>
                  <span
                    className={`vance-badge ${item.status === 'late' ? 'warn' : 'green'}`}
                    style={{ fontSize: '10.5px' }}
                  >
                    {item.statusText}
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    gap: '16px',
                    fontSize: '11.5px',
                    color: 'var(--text-subtle)',
                    marginTop: '6px',
                    flexWrap: 'wrap',
                  }}
                >
                  <span>Pegou em: <b style={{ color: 'var(--text-main)', fontWeight: 500 }}>{item.took}</b></span>
                  <span>Venceu em: <b style={{ color: 'var(--text-main)', fontWeight: 500 }}>{item.due}</b></span>
                  <span>Pagou em: <b style={{ color: 'var(--text-main)', fontWeight: 500 }}>{item.paid}</b></span>
                  <span>Composição: <b style={{ color: 'var(--text-main)', fontWeight: 500 }}>{item.breakdown}</b></span>
                </div>
              </div>

              <div className="tnum" style={{ fontSize: '17px', fontWeight: 500, color: 'var(--text-main)' }}>
                {item.amount}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
