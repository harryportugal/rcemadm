'use client';

import React, { useState } from 'react';

export default function ConfiguracaoSMSPage() {
  const [enabled, setEnabled] = useState(true);

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
          <h1 style={{ fontSize: '22px', margin: 0, fontWeight: 600 }}>SMS Gateway</h1>
        </div>

        <span className={`vance-badge ${enabled ? 'green' : 'neg'}`} style={{ fontSize: '11px', padding: '6px 14px' }}>
          {enabled ? 'Gateway Ativo' : 'Gateway Inativo'}
        </span>
      </div>

      {/* ====================================================================
           2. MAIN CONTROLS (DUAL GRID)
           ==================================================================== */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '20px',
        }}
      >
        {/* Toggle Card */}
        <div
          className="vance-card vance-cascade-item delay-2"
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '16px', margin: 0 }}>Controle Geral de Disparos</h2>
            <button
              onClick={() => setEnabled(!enabled)}
              className={`vance-btn sm ${enabled ? 'primary' : ''}`}
            >
              {enabled ? 'Desativar SMS' : 'Ativar SMS'}
            </button>
          </div>

          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-lg)',
              padding: '16px 20px',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <b style={{ fontSize: '13.5px', color: 'var(--text-main)' }}>
              Habilitar envio de SMS transacional
            </b>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
              Quando habilitado, o sistema envia automaticamente SMS com links PIX nos dias D-1, D0 e D+3 para clientes.
            </p>
            <div style={{ fontSize: '11px', color: 'var(--text-subtle)', marginTop: '6px' }}>
              Última atualização: 04/02/2026 às 19:24
            </div>
          </div>
        </div>

        {/* SMS Types Card */}
        <div
          className="vance-card vance-cascade-item delay-3"
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <h2 style={{ fontSize: '16px', margin: 0 }}>Gatilhos de Envio Automático</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 14px',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <b style={{ fontSize: '13px', color: 'var(--text-main)' }}>Lembrete de Vencimento (D-1)</b>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Enviado às 09:00 na véspera</div>
              </div>
              <span className="vance-badge green" style={{ fontSize: '10px' }}>Ativo</span>
            </div>

            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 14px',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <b style={{ fontSize: '13px', color: 'var(--text-main)' }}>Cobrança no Dia do Vencimento (D0)</b>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Enviado às 08:30</div>
              </div>
              <span className="vance-badge green" style={{ fontSize: '10px' }}>Ativo</span>
            </div>

            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 14px',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <b style={{ fontSize: '13px', color: 'var(--text-main)' }}>Aviso de Inadimplência (D+3)</b>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Enviado às 14:00</div>
              </div>
              <span className="vance-badge green" style={{ fontSize: '10px' }}>Ativo</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
