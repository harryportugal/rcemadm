'use client';

import React, { useState } from 'react';
import { exportToCsv } from '@/utils/exportCsv';

export default function RelatorioAnalistasPage() {
  const [period, setPeriod] = useState('Este mês');
  const [selectedAnalista, setSelectedAnalista] = useState('todos');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleExport = () => {
    const data = [
      { Analista: 'Gabriela', Cargo: 'Analista Sênior', Analises_Total: 98, Aprovacao_Taxa: '81.2%', Tempo_Medio_Min: 7.2, Status_Performance: 'Top Performance' },
      { Analista: 'Analista Teste', Cargo: 'Analista Júnior', Analises_Total: 44, Aprovacao_Taxa: '72.0%', Tempo_Medio_Min: 10.5, Status_Performance: 'Regular' },
    ];

    exportToCsv(`relatorio_analistas_${period.toLowerCase().replace(/\s+/g, '_')}`, data);
    showToast(`Relatório de analistas (${period}) exportado em CSV!`);
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
          <h1 style={{ fontSize: '22px', margin: 0, fontWeight: 600 }}>Analistas</h1>
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
           2. FILTER BAR
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
          {['Hoje', '7 dias', '30 dias', 'Esta semana', 'Este mês'].map((p) => (
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Analista:</span>
          <select
            className="vance-select"
            style={{ width: 'auto', padding: '6px 14px', fontSize: '12px' }}
            value={selectedAnalista}
            onChange={(e) => setSelectedAnalista(e.target.value)}
          >
            <option value="todos">Todos os Analistas</option>
            <option value="gabriela">Gabriela</option>
            <option value="teste">Analista Teste</option>
          </select>
        </div>
      </div>

      {/* ====================================================================
           3. METRICS KPIS
           ==================================================================== */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
        }}
      >
        <div className="vance-card vance-cascade-item delay-3">
          <span style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Solicitações Analisadas</span>
          <div className="tnum" style={{ fontSize: '22px', fontWeight: 500, color: 'var(--text-main)', marginTop: '4px' }}>
            142 propostas
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
            100% no prazo
          </div>
        </div>

        <div className="vance-card vance-cascade-item delay-4">
          <span style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Taxa de Aprovação</span>
          <div className="tnum" style={{ fontSize: '22px', fontWeight: 500, color: 'var(--accent-green)', marginTop: '4px' }}>
            78,4%
          </div>
          <div style={{ fontSize: '11px', color: 'var(--accent-green)', marginTop: '4px' }}>
            111 aprovadas
          </div>
        </div>

        <div className="vance-card vance-cascade-item delay-5">
          <span style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Tempo Médio de Análise</span>
          <div className="tnum" style={{ fontSize: '22px', fontWeight: 500, color: 'var(--text-main)', marginTop: '4px' }}>
            8,4 min
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
            SLA padrão &lt; 15 min
          </div>
        </div>

        <div className="vance-card vance-cascade-item delay-6">
          <span style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Recusas / Fraudes</span>
          <div className="tnum" style={{ fontSize: '22px', fontWeight: 500, color: 'var(--neg)', marginTop: '4px' }}>
            31 recusadas
          </div>
          <div style={{ fontSize: '11px', color: 'var(--neg)', marginTop: '4px' }}>
            Score facial ou restrição
          </div>
        </div>
      </div>

      {/* ====================================================================
           4. ANALYSTS BREAKDOWN LIST
           ==================================================================== */}
      <div
        className="vance-card vance-cascade-item delay-7"
        style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
      >
        <h2 style={{ fontSize: '16px', margin: 0 }}>Desempenho Individual por Analista</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* Analyst 1 */}
          <div
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-green-bg)',
                  color: 'var(--accent-green)',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: '13px',
                  fontWeight: 500,
                }}
              >
                GA
              </div>
              <div>
                <b style={{ fontSize: '14.5px', color: 'var(--text-main)', fontWeight: 500 }}>Gabriela</b>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Analista Sênior • 98 análises no mês
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Aprovação</div>
                <div className="tnum" style={{ fontSize: '15px', fontWeight: 500, color: 'var(--accent-green)' }}>
                  81,2%
                </div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Tempo Médio</div>
                <div className="tnum" style={{ fontSize: '15px', fontWeight: 500, color: 'var(--text-main)' }}>
                  7,2 min
                </div>
              </div>
              <span className="vance-badge green" style={{ fontSize: '10.5px' }}>
                Top Performance
              </span>
            </div>
          </div>

          {/* Analyst 2 */}
          <div
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-card)',
                  color: 'var(--text-main)',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: '13px',
                  fontWeight: 500,
                }}
              >
                AT
              </div>
              <div>
                <b style={{ fontSize: '14.5px', color: 'var(--text-main)', fontWeight: 500 }}>Analista Teste</b>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Analista Júnior • 44 análises no mês
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Aprovação</div>
                <div className="tnum" style={{ fontSize: '15px', fontWeight: 500, color: 'var(--accent-green)' }}>
                  72,0%
                </div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Tempo Médio</div>
                <div className="tnum" style={{ fontSize: '15px', fontWeight: 500, color: 'var(--text-main)' }}>
                  10,5 min
                </div>
              </div>
              <span className="vance-badge" style={{ fontSize: '10.5px' }}>
                Regular
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
