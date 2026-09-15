'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_CLIENTS } from '@/data/mockData';
import { getInitials } from '@/hooks/useMask';

export default function ClientesPage() {
  const [search, setSearch] = useState('');
  const [filterTab, setFilterTab] = useState<'all' | 'unblocked' | 'blacklisted'>('all');
  const [hasActiveLoan, setHasActiveLoan] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 9;

  const filteredClients = MOCK_CLIENTS.filter((cli) => {
    if (filterTab === 'unblocked' && cli.status === 'blacklisted') return false;
    if (filterTab === 'blacklisted' && cli.status !== 'blacklisted') return false;
    if (hasActiveLoan && (!cli.activeLoanAmount || cli.activeLoanAmount <= 0)) return false;

    if (search) {
      const q = search.toLowerCase();
      return (
        cli.name.toLowerCase().includes(q) ||
        cli.cpf.includes(q) ||
        cli.phone.includes(q) ||
        cli.email.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filteredClients.length / pageSize));
  const paginatedClients = filteredClients.slice((page - 1) * pageSize, page * pageSize);

  const totalAll = MOCK_CLIENTS.length;
  const totalUnblocked = MOCK_CLIENTS.filter((c) => c.status !== 'blacklisted').length;
  const totalBlacklisted = MOCK_CLIENTS.filter((c) => c.status === 'blacklisted').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* ====================================================================
           1. TOP HEADER & NEW CLIENT ACTION
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
          <h1 style={{ fontSize: '22px', margin: 0, fontWeight: 600 }}>Clientes</h1>
        </div>

        <Link href="/clientes/novo" className="vance-getstarted-btn primary">
          <span className="vance-getstarted-text">Novo Cliente</span>
          <span className="vance-getstarted-badge">
            <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
        </Link>
      </div>

      {/* ====================================================================
           2. TOOLBAR: SEARCH & SEGMENTED FILTER PILLS
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
        {/* Search */}
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
            placeholder="Buscar por nome, CPF, email ou telefone..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            style={{ paddingLeft: '36px' }}
          />
        </div>

        {/* Filter Tab Switcher */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div
            style={{
              display: 'flex',
              backgroundColor: 'var(--bg-surface)',
              padding: '3px',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <button
              onClick={() => {
                setFilterTab('all');
                setPage(1);
              }}
              style={{
                padding: '6px 12px',
                fontSize: '12px',
                border: 'none',
                borderRadius: 'var(--radius-pill)',
                cursor: 'pointer',
                fontWeight: 500,
                backgroundColor: filterTab === 'all' ? 'var(--text-main)' : 'transparent',
                color: filterTab === 'all' ? 'var(--text-inv)' : 'var(--text-muted)',
                transition: 'all 0.15s ease',
              }}
            >
              Todos ({totalAll})
            </button>

            <button
              onClick={() => {
                setFilterTab('unblocked');
                setPage(1);
              }}
              style={{
                padding: '6px 12px',
                fontSize: '12px',
                border: 'none',
                borderRadius: 'var(--radius-pill)',
                cursor: 'pointer',
                fontWeight: 500,
                backgroundColor: filterTab === 'unblocked' ? 'var(--text-main)' : 'transparent',
                color: filterTab === 'unblocked' ? 'var(--text-inv)' : 'var(--text-muted)',
                transition: 'all 0.15s ease',
              }}
            >
              Ativos ({totalUnblocked})
            </button>

            <button
              onClick={() => {
                setFilterTab('blacklisted');
                setPage(1);
              }}
              style={{
                padding: '6px 12px',
                fontSize: '12px',
                border: 'none',
                borderRadius: 'var(--radius-pill)',
                cursor: 'pointer',
                fontWeight: 500,
                backgroundColor: filterTab === 'blacklisted' ? 'var(--text-main)' : 'transparent',
                color: filterTab === 'blacklisted' ? 'var(--text-inv)' : 'var(--text-muted)',
                transition: 'all 0.15s ease',
              }}
            >
              Lista Negra ({totalBlacklisted})
            </button>
          </div>

          {/* Active Loan Filter Toggle */}
          <button
            onClick={() => {
              setHasActiveLoan(!hasActiveLoan);
              setPage(1);
            }}
            className={`vance-btn sm ${hasActiveLoan ? 'primary' : ''}`}
            style={{
              backgroundColor: hasActiveLoan ? 'var(--accent-green)' : 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <svg className="icon-svg icon-xs" viewBox="0 0 24 24">
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
            <span>Com empréstimo ativo</span>
          </button>
        </div>
      </div>

      {/* ====================================================================
           3. CLIENTS GRID
           ==================================================================== */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '18px',
        }}
      >
        {paginatedClients.map((client, idx) => (
          <div
            key={client.id}
            className={`vance-card vance-cascade-item delay-${(idx % 6) + 3}`}
            style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
          >
            {/* Header: Avatar + Name + Status */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor:
                      client.status === 'blacklisted'
                        ? 'var(--neg-bg)'
                        : 'var(--accent-green-bg)',
                    color:
                      client.status === 'blacklisted'
                        ? 'var(--neg)'
                        : 'var(--accent-green)',
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: '12.5px',
                    fontWeight: 500,
                  }}
                >
                  {getInitials(client.name)}
                </div>
                <div>
                  <h3 style={{ fontSize: '14.5px', margin: 0, color: 'var(--text-main)' }}>
                    {client.name}
                  </h3>
                  <div style={{ fontSize: '11px', color: 'var(--text-subtle)', marginTop: '1px' }}>
                    {client.status === 'blacklisted' ? 'Bloqueado na Lista Negra' : 'Cliente Ativo'}
                  </div>
                </div>
              </div>

              {client.status === 'blacklisted' ? (
                <span className="vance-badge neg" style={{ fontSize: '10.5px' }}>
                  Bloqueado
                </span>
              ) : (
                <span className="vance-badge green" style={{ fontSize: '10.5px' }}>
                  Regular
                </span>
              )}
            </div>

            {/* Tags Strip */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <span className="vance-badge" style={{ fontSize: '10.5px', backgroundColor: 'var(--bg-surface)' }}>
                {client.totalLoans || 1} solicitação
              </span>
              {client.activeLoanAmount && client.activeLoanAmount > 0 ? (
                <span className="vance-badge green" style={{ fontSize: '10.5px' }}>
                  1 Empréstimo ativo
                </span>
              ) : null}
            </div>

            {/* Info Micro-Box */}
            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 14px',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontSize: '12px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-subtle)' }}>CPF</span>
                <span className="tnum" style={{ color: 'var(--text-main)', fontWeight: 500 }}>
                  {client.cpf}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-subtle)' }}>Telefone</span>
                <span className="tnum" style={{ color: 'var(--text-main)' }}>
                  {client.phone}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-subtle)' }}>E-mail</span>
                <span style={{ color: 'var(--text-main)', maxWidth: '170px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {client.email}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '4px', borderTop: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-subtle)' }}>Responsável</span>
                <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>
                  {client.collectorName || 'Sem responsável'}
                </span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                justifyContent: 'flex-end',
                marginTop: 'auto',
                paddingTop: '4px',
              }}
            >
              <a
                href={`https://wa.me/55${client.phone.replace(/\D/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="vance-icon-btn"
                title="WhatsApp"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.403 5.586A9.78 9.78 0 0 0 11.47 2.7c-5.412 0-9.814 4.402-9.817 9.816a9.78 9.78 0 0 0 1.312 4.908L1.7 22.3l5.048-1.324a9.79 9.79 0 0 0 4.72 1.218h.004c5.411 0 9.814-4.402 9.817-9.816.001-2.623-1.02-5.088-2.886-6.952zm-6.933 15.027h-.003a8.16 8.16 0 0 1-4.16-1.135l-.298-.177-3.09.81.824-3.013-.195-.31a8.16 8.16 0 0 1-1.25-4.398c.003-4.507 3.67-8.174 8.18-8.174 2.183 0 4.236.85 5.778 2.393a8.12 8.12 0 0 1 2.39 5.78c-.003 4.508-3.67 8.175-8.176 8.175zm4.484-6.13c-.246-.123-1.457-.719-1.683-.801-.226-.082-.391-.123-.555.123-.165.247-.638.801-.782.966-.144.165-.288.185-.534.062-.246-.123-1.04-.383-1.982-1.223-.733-.654-1.228-1.463-1.372-1.71-.144-.247-.015-.38.109-.503.111-.11.246-.288.37-.432.123-.144.164-.247.246-.412.082-.165.041-.309-.02-.432-.062-.124-.556-1.337-.762-1.831-.2-.482-.403-.417-.555-.425l-.473-.008c-.164 0-.432.062-.658.309s-.864.844-.864 2.06 0 2.39 1.07 3.83c1.07 1.44 2.508 2.2 3.6 2.668.784.336 1.498.288 2.062.204.629-.094 1.933-.79 2.201-1.551.267-.76.267-1.41.185-1.551-.082-.141-.246-.223-.492-.346z"/>
                </svg>
              </a>

              <Link href="/solicitacao-detalhe" className="vance-btn sm">
                <span>Ver Detalhes</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
            marginTop: '8px',
          }}
        >
          <button
            className="vance-btn sm"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            style={{ opacity: page === 1 ? 0.5 : 1 }}
          >
            Anterior
          </button>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Página {page} de {totalPages}
          </span>
          <button
            className="vance-btn sm"
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            style={{ opacity: page === totalPages ? 0.5 : 1 }}
          >
            Próxima
          </button>
        </div>
      )}

    </div>
  );
}
