'use client';

import React, { useState } from 'react';
import { exportToCsv } from '@/utils/exportCsv';

export default function RelatorioLinhasPage() {
  const [period, setPeriod] = useState('Este mês');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleExport = () => {
    const data = [
      { Linha: 'São Paulo 001', Cobrador: 'Gabriel', Contratos_Ativos: 45, Adimplencia: '97%', Volume_Investido_RS: 1000, Total_Retornado_RS: 230, Atraso_RS: 100 },
      { Linha: 'São Paulo 002', Cobrador: 'Juninho', Contratos_Ativos: 43, Adimplencia: '96%', Volume_Investido_RS: 1000, Total_Retornado_RS: 220, Atraso_RS: 100 },
    ];

    exportToCsv(`relatorio_linhas_${period.toLowerCase().replace(/\s+/g, '_')}`, data);
    showToast(`Relatório de linhas (${period}) exportado em CSV!`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* ====================================================================
           1. TOP HEADER & EXPORT
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
          <h1 style={{ fontSize: '22px', margin: 0, fontWeight: 600 }}>Linhas</h1>
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
           2. PERIOD FILTER BAR
           ==================================================================== */}
      <div
        className="vance-card vance-cascade-item delay-2"
        style={{
          padding: '12px 18px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            display: 'flex',
            backgroundColor: 'var(--bg-surface)',
            padding: '3px',
            borderRadius: 'var(--radius-pill)',
            border: '1px solid var(--border-subtle)',
            flexWrap: 'wrap',
            gap: '2px',
          }}
        >
          {['Hoje', '7 dias', '30 dias', 'Esta semana', 'Este mês', 'Personalizado'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              style={{
                padding: '6px 12px',
                fontSize: '12px',
                border: 'none',
                borderRadius: 'var(--radius-pill)',
                cursor: 'pointer',
                fontWeight: 500,
                backgroundColor: period === p ? 'var(--text-main)' : 'transparent',
                color: period === p ? 'var(--text-inv)' : 'var(--text-muted)',
                transition: 'all 0.15s ease',
              }}
            >
              {p}
            </button>
          ))}
        </div>

        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          Filtro: <b style={{ color: 'var(--text-main)' }}>Todas as Linhas (São Paulo 001 & 002)</b>
        </div>
      </div>

      {/* ====================================================================
           3. MAIN 4-METRIC KPIS
           ==================================================================== */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
        }}
      >
        <div className="vance-card vance-cascade-item delay-3">
          <span style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Total Investido</span>
          <div className="tnum" style={{ fontSize: '22px', fontWeight: 500, color: 'var(--text-main)', marginTop: '4px' }}>
            R$ 2.000,00
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Volume alocado no ciclo
          </div>
        </div>

        <div className="vance-card vance-cascade-item delay-4">
          <span style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Faturamento Líquido</span>
          <div className="tnum" style={{ fontSize: '22px', fontWeight: 500, color: 'var(--accent-green)', marginTop: '4px' }}>
            R$ 420,00
          </div>
          <div style={{ fontSize: '11px', color: 'var(--accent-green)', marginTop: '4px' }}>
            ↑ 12% vs. mês anterior
          </div>
        </div>

        <div className="vance-card vance-cascade-item delay-5">
          <span style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Total Retornado</span>
          <div className="tnum" style={{ fontSize: '22px', fontWeight: 500, color: 'var(--text-main)', marginTop: '4px' }}>
            R$ 450,00
          </div>
          <div style={{ fontSize: '11px', color: 'var(--accent-green)', marginTop: '4px' }}>
            ↑ 8% vs. meta
          </div>
        </div>

        <div className="vance-card vance-cascade-item delay-6">
          <span style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Total em Atraso</span>
          <div className="tnum" style={{ fontSize: '22px', fontWeight: 500, color: 'var(--neg)', marginTop: '4px' }}>
            R$ 200,00
          </div>
          <div style={{ fontSize: '11px', color: 'var(--neg)', marginTop: '4px' }}>
            1 contrato em atraso
          </div>
        </div>
      </div>

      {/* ====================================================================
           4. CHARTS: EVOLUÇÃO & SAÚDE DA CARTEIRA
           ==================================================================== */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '20px',
        }}
      >
        {/* Evolution Chart */}
        <div
          className="vance-card vance-cascade-item delay-7"
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '16px', margin: 0 }}>Evolução do Recebimento</h2>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                Acumulado de taxas recebidas vs. meta do período
              </p>
            </div>
            <span className="vance-badge green" style={{ fontSize: '11px' }}>
              +8% vs. meta
            </span>
          </div>

          <div
            style={{
              height: '180px',
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-lg)',
              padding: '12px 16px',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <svg viewBox="0 0 740 160" preserveAspectRatio="none" style={{ width: '100%', height: '140px' }}>
              <defs>
                <linearGradient id="relAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent-green)" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="var(--accent-green)" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <line x1="0" y1="40" x2="740" y2="40" stroke="var(--border-subtle)" strokeDasharray="3 3" />
              <line x1="0" y1="80" x2="740" y2="80" stroke="var(--border-subtle)" strokeDasharray="3 3" />
              <line x1="0" y1="120" x2="740" y2="120" stroke="var(--border-subtle)" strokeDasharray="3 3" />
              <path
                d="M0,140 L74,130 L148,118 L222,105 L296,92 L370,78 L444,65 L518,52 L592,40 L666,28 L740,16 L740,160 L0,160 Z"
                fill="url(#relAreaGrad)"
              />
              <path
                d="M0,140 L74,130 L148,118 L222,105 L296,92 L370,78 L444,65 L518,52 L592,40 L666,28 L740,16"
                fill="none"
                stroke="var(--accent-green)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="740" cy="16" r="4" fill="var(--accent-green)" />
            </svg>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '10.5px',
                color: 'var(--text-subtle)',
              }}
            >
              <span>01</span>
              <span>06</span>
              <span>12</span>
              <span>18</span>
              <span>24</span>
              <span>30</span>
            </div>
          </div>
        </div>

        {/* Health Gauge & Linhas Status */}
        <div
          className="vance-card vance-cascade-item delay-8"
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '16px', margin: 0 }}>Índice de Eficiência</h2>
            <span className="vance-badge green" style={{ fontSize: '11px' }}>
              82 de 100 • Saudável
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px',
            }}
          >
            <div className="vance-tile">
              <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Linha São Paulo 001</div>
              <div className="tnum" style={{ fontSize: '16px', fontWeight: 500, color: 'var(--accent-green)', marginTop: '2px' }}>
                97% em dia
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                45 contratos ativos
              </div>
            </div>

            <div className="vance-tile">
              <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Linha São Paulo 002</div>
              <div className="tnum" style={{ fontSize: '16px', fontWeight: 500, color: 'var(--accent-green)', marginTop: '2px' }}>
                96% em dia
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                43 contratos ativos
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
