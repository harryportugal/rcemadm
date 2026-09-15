'use client';

import React, { useState } from 'react';
import { exportToCsv } from '@/utils/exportCsv';

export default function RelatorioMensagensPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleExport = () => {
    const data = [
      { Tipo_Notificacao: 'Lembrete D-1 (Véspera)', Canal: 'WhatsApp', Total_Envios: 520, Entregues: 518, Lidos: 498, Taxa_Conversao_PIX: '71.2%' },
      { Tipo_Notificacao: 'Cobrança D0 (Vencimento)', Canal: 'WhatsApp', Total_Envios: 490, Entregues: 486, Lidos: 462, Taxa_Conversao_PIX: '82.4%' },
      { Tipo_Notificacao: 'Aviso D+3 (Inadimplência)', Canal: 'WhatsApp', Total_Envios: 210, Entregues: 207, Lidos: 191, Taxa_Conversao_PIX: '48.6%' },
      { Tipo_Notificacao: 'Confirmação de Quitação', Canal: 'WhatsApp', Total_Envios: 262, Entregues: 262, Lidos: 254, Taxa_Conversao_PIX: '100%' },
    ];

    exportToCsv('relatorio_mensagens_rcem', data);
    showToast('Relatório de métricas de mensagens exportado em CSV!');
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
          <h1 style={{ fontSize: '22px', margin: 0, fontWeight: 600 }}>Mensagens</h1>
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
           2. 3-COLUMN METRICS GRID
           ==================================================================== */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
        }}
      >
        <div className="vance-card vance-cascade-item delay-2">
          <span style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Disparos Realizados</span>
          <div className="tnum" style={{ fontSize: '24px', fontWeight: 500, color: 'var(--text-main)', marginTop: '4px' }}>
            1.482 envios
          </div>
          <div style={{ fontSize: '11px', color: 'var(--accent-green)', marginTop: '4px' }}>
            99,1% entregues com sucesso
          </div>
        </div>

        <div className="vance-card vance-cascade-item delay-3">
          <span style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Taxa de Visualização</span>
          <div className="tnum" style={{ fontSize: '24px', fontWeight: 500, color: 'var(--accent-green)', marginTop: '4px' }}>
            94,6%
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Leitura em menos de 10 min
          </div>
        </div>

        <div className="vance-card vance-cascade-item delay-4">
          <span style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Conversão Direta por Link PIX</span>
          <div className="tnum" style={{ fontSize: '24px', fontWeight: 500, color: 'var(--text-main)', marginTop: '4px' }}>
            68,4%
          </div>
          <div style={{ fontSize: '11px', color: 'var(--accent-green)', marginTop: '4px' }}>
            Liquidação instantânea gerada
          </div>
        </div>
      </div>

    </div>
  );
}
