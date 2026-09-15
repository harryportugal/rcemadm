'use client';

import React from 'react';
import Link from 'next/link';

export default function SolicitacaoDetalhePage() {
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
              href="/solicitacoes"
              className="vance-btn sm"
              style={{ padding: '4px 10px', fontSize: '11px', gap: '4px' }}
            >
              <svg className="icon-svg icon-xs" viewBox="0 0 24 24">
                <path d="m15 18-6-6 6-6" />
              </svg>
              <span>Voltar</span>
            </Link>
            <span className="vance-badge green" style={{ fontSize: '11px' }}>
              Aprovado
            </span>
          </div>
          <h1 style={{ fontSize: '24px', margin: 0, fontWeight: 600 }}>Gabriel Cacique da Silva</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px', margin: 0 }}>
            Solicitação de 11/06/2026 • R$ 200,00
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <a
            href="https://wa.me/5511993704997"
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
          <Link href="/detalhes-financeiros" className="vance-btn primary sm">
            <span>Detalhes Financeiros</span>
          </Link>
        </div>
      </div>

      {/* ====================================================================
           2. LOAN ASSOCIATED & PROFIT OVERVIEW (DUAL GRID)
           ==================================================================== */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '20px',
        }}
      >
        {/* Empréstimo Associado */}
        <div
          className="vance-card vance-cascade-item delay-2"
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <path d="M2 10h20" />
              </svg>
              <h2 style={{ fontSize: '16px', margin: 0 }}>Empréstimo Associado</h2>
            </div>
            <span className="vance-badge green" style={{ fontSize: '10.5px' }}>
              Repasse Concluído
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
            }}
          >
            <div className="vance-tile">
              <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Linha de Cobrança</div>
              <div style={{ fontSize: '13.5px', fontWeight: 500, color: 'var(--text-main)', marginTop: '2px' }}>
                São Paulo 001
              </div>
            </div>

            <div className="vance-tile">
              <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Vencimento</div>
              <div className="tnum" style={{ fontSize: '13.5px', fontWeight: 500, color: 'var(--text-main)', marginTop: '2px' }}>
                30/06/2026
              </div>
            </div>

            <div className="vance-tile">
              <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Valor Principal</div>
              <div className="tnum" style={{ fontSize: '15px', fontWeight: 500, color: 'var(--text-main)', marginTop: '2px' }}>
                R$ 200,00
              </div>
            </div>

            <div className="vance-tile">
              <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Valor Total Devido</div>
              <div className="tnum" style={{ fontSize: '15px', fontWeight: 500, color: 'var(--accent-green)', marginTop: '2px' }}>
                R$ 320,00
              </div>
            </div>
          </div>
        </div>

        {/* Rentabilidade do Cliente */}
        <div
          className="vance-card vance-cascade-item delay-3"
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
                <path d="m22 7-8.5 8.5-5-5L2 17" />
                <path d="M16 7h6v6" />
              </svg>
              <h2 style={{ fontSize: '16px', margin: 0 }}>Rentabilidade do Cliente</h2>
            </div>
            <span className="vance-badge active" style={{ fontSize: '10.5px' }}>
              Recorrente
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '10px',
            }}
          >
            <div className="vance-tile">
              <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Lucro Já Gerado</div>
              <div className="tnum" style={{ fontSize: '16px', fontWeight: 500, color: 'var(--accent-green)', marginTop: '2px' }}>
                R$ 120,00
              </div>
            </div>

            <div className="vance-tile">
              <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Lucro Potencial</div>
              <div className="tnum" style={{ fontSize: '16px', fontWeight: 500, color: 'var(--text-main)', marginTop: '2px' }}>
                R$ 240,00
              </div>
            </div>

            <div className="vance-tile">
              <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Histórico Contratos</div>
              <div className="tnum" style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-main)', marginTop: '2px' }}>
                2 (1 quitado)
              </div>
            </div>

            <div className="vance-tile">
              <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Atrasos Registrados</div>
              <div className="tnum" style={{ fontSize: '14px', fontWeight: 500, color: 'var(--accent-green)', marginTop: '2px' }}>
                0 atrasos
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
           3. CLIENT DETAILS, KYC VERIFICATION & ADDRESS (3-COL GRID)
           ==================================================================== */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
        }}
      >
        {/* Dados do Cliente */}
        <div
          className="vance-card vance-cascade-item delay-4"
          style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
              <circle cx="9" cy="8" r="4" />
              <path d="M3 21a6 6 0 0 1 12 0" />
            </svg>
            <h2 style={{ fontSize: '16px', margin: 0 }}>Dados do Cliente</h2>
          </div>

          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-md)',
              padding: '14px',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              fontSize: '12.5px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-subtle)' }}>CPF</span>
              <span className="tnum" style={{ color: 'var(--text-main)', fontWeight: 500 }}>
                491.959.248-50
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-subtle)' }}>Nascimento</span>
              <span className="tnum" style={{ color: 'var(--text-main)' }}>
                03/01/2000
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-subtle)' }}>Telefone</span>
              <span className="tnum" style={{ color: 'var(--text-main)' }}>
                (11) 99370-4997
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-subtle)' }}>E-mail</span>
              <span style={{ color: 'var(--text-main)' }}>
                salabatais@gmail.com
              </span>
            </div>
          </div>
        </div>

        {/* Verificação Facial KYC */}
        <div
          className="vance-card vance-cascade-item delay-5"
          style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
              <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <h2 style={{ fontSize: '16px', margin: 0 }}>Verificação Facial (KYC)</h2>
          </div>

          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-green-bg)',
                  color: 'var(--accent-green)',
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <svg className="icon-svg" viewBox="0 0 24 24">
                  <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-main)' }}>
                  Biometria Aprovada
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Similaridade: <b>81% de correspondência</b>
                </div>
              </div>
            </div>

            <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>
              Verificado e homologado em 11/06/2026, 16:28
            </div>
          </div>
        </div>

        {/* Endereço & Referências */}
        <div
          className="vance-card vance-cascade-item delay-6"
          style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <h2 style={{ fontSize: '16px', margin: 0 }}>Endereço & Localização</h2>
          </div>

          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-md)',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              fontSize: '12px',
            }}
          >
            <div style={{ fontWeight: 500, color: 'var(--text-main)' }}>
              Rua Patrocínio Augusto Severino, 128
            </div>
            <div style={{ color: 'var(--text-muted)' }}>
              Casa • Jardim Rossin • Campinas/SP
            </div>
            <div style={{ color: 'var(--text-subtle)', fontSize: '11px' }}>
              CEP: 13059-242 • Geolocalização capturada
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
           4. DOCUMENTS OF THIS REQUEST
           ==================================================================== */}
      <div
        className="vance-card vance-cascade-item delay-7"
        style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          <h2 style={{ fontSize: '16px', margin: 0 }}>Documentos Anexados (2)</h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '14px',
          }}
        >
          {/* Doc 1 */}
          <div
            className="vance-tile"
            style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-card)',
                display: 'grid',
                placeItems: 'center',
                color: 'var(--accent-green)',
                fontWeight: 500,
                fontSize: '11px',
              }}
            >
              PDF
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-main)' }}>
                Carteira de Trabalho
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>
                11/06/2026, 16:28
              </div>
            </div>
            <span className="vance-badge sm">Abrir</span>
          </div>

          {/* Doc 2 */}
          <div
            className="vance-tile"
            style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-card)',
                display: 'grid',
                placeItems: 'center',
                color: 'var(--info)',
                fontWeight: 500,
                fontSize: '11px',
              }}
            >
              IMG
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-main)' }}>
                Holerite / Comprovante
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>
                11/06/2026, 16:28
              </div>
            </div>
            <span className="vance-badge sm">Abrir</span>
          </div>
        </div>
      </div>

    </div>
  );
}
