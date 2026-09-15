'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_REQUESTS } from '@/data/mockData';
import { formatBRL, getInitials } from '@/hooks/useMask';

export default function SolicitacoesPage() {
  const [requestsList, setRequestsList] = useState(MOCK_REQUESTS);
  const [activeTab, setActiveTab] = useState<'pending' | 'all'>('pending');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New proposal form
  const [clientName, setClientName] = useState('');
  const [clientCpf, setClientCpf] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [amount, setAmount] = useState(200);
  const [interestPercent, setInterestPercent] = useState(60);
  const [selectedLine, setSelectedLine] = useState('São Paulo 001');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateProposal = (e: React.FormEvent) => {
    e.preventDefault();
    const total = amount * (1 + interestPercent / 100);
    const newReq: any = {
      id: `req-${Date.now()}`,
      clientName: clientName || 'Novo Cliente',
      cpf: clientCpf || '***.000.000-**',
      phone: clientPhone || '(11) 99999-9999',
      email: `${clientName.toLowerCase().replace(/\s+/g, '.')}@email.com`,
      address: 'Rua das Flores, 100 - São Paulo, SP',
      amount: Number(amount),
      totalWithInterest: total,
      date: new Date().toLocaleDateString('pt-BR'),
      faceMatchScore: 94,
      status: 'pending',
      line: selectedLine,
    };

    setRequestsList([newReq, ...requestsList]);
    setIsModalOpen(false);
    showToast(`Proposta de R$ ${amount} criada com sucesso para ${clientName}!`);
    setClientName('');
    setClientCpf('');
    setClientPhone('');
  };

  const filtered = requestsList.filter((req) => {
    if (activeTab === 'pending' && req.status !== 'pending') return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        req.clientName.toLowerCase().includes(q) ||
        req.cpf.includes(q) ||
        req.phone.includes(q)
      );
    }
    return true;
  });

  const pageSize = 6;
  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const pendingCount = requestsList.filter((r) => r.status === 'pending').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* ====================================================================
           1. TOP HEADER & FILTER BAR
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
          <h1 style={{ fontSize: '22px', margin: 0, fontWeight: 600 }}>Solicitações</h1>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          {toastMessage && (
            <span className="vance-badge green" style={{ padding: '6px 14px', fontSize: '12px' }}>
              {toastMessage}
            </span>
          )}

          {/* Tab switcher: Pendentes | Todas */}
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
                setActiveTab('pending');
                setCurrentPage(1);
              }}
              style={{
                padding: '6px 14px',
                fontSize: '12px',
                border: 'none',
                borderRadius: 'var(--radius-pill)',
                cursor: 'pointer',
                fontWeight: 500,
                backgroundColor: activeTab === 'pending' ? 'var(--text-main)' : 'transparent',
                color: activeTab === 'pending' ? 'var(--text-inv)' : 'var(--text-muted)',
                transition: 'all 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>Pendentes</span>
              <span
                style={{
                  backgroundColor: activeTab === 'pending' ? 'rgba(255,255,255,0.2)' : 'var(--warn-bg)',
                  color: activeTab === 'pending' ? '#FFFFFF' : 'var(--warn)',
                  fontSize: '10.5px',
                  padding: '2px 6px',
                  borderRadius: 'var(--radius-pill)',
                }}
              >
                {pendingCount}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('all');
                setCurrentPage(1);
              }}
              style={{
                padding: '6px 14px',
                fontSize: '12px',
                border: 'none',
                borderRadius: 'var(--radius-pill)',
                cursor: 'pointer',
                fontWeight: 500,
                backgroundColor: activeTab === 'all' ? 'var(--text-main)' : 'transparent',
                color: activeTab === 'all' ? 'var(--text-inv)' : 'var(--text-muted)',
                transition: 'all 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>Todas</span>
              <span
                style={{
                  backgroundColor: activeTab === 'all' ? 'rgba(255,255,255,0.2)' : 'var(--bg-badge)',
                  color: activeTab === 'all' ? '#FFFFFF' : 'var(--text-muted)',
                  fontSize: '10.5px',
                  padding: '2px 6px',
                  borderRadius: 'var(--radius-pill)',
                }}
              >
                {requestsList.length}
              </span>
            </button>
          </div>

          {/* Nova Proposta Button */}
          <button
            type="button"
            className="vance-getstarted-btn primary"
            onClick={() => setIsModalOpen(true)}
          >
            <span className="vance-getstarted-text">Nova Proposta</span>
            <span className="vance-getstarted-badge">
              <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* Search Input Toolbar */}
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
        <div style={{ position: 'relative', flex: '1', minWidth: '260px' }}>
          <svg
            className="icon-svg icon-sm"
            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)' }}
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            className="vance-input"
            placeholder="Buscar por nome, CPF ou telefone..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            style={{ paddingLeft: '36px' }}
          />
        </div>
      </div>

      {/* ====================================================================
           2. REQUESTS CARD GRID
           ==================================================================== */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '18px',
        }}
      >
        {paginated.map((req, idx) => (
          <div
            key={req.id}
            className={`vance-card vance-cascade-item delay-${(idx % 6) + 3}`}
            style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
          >
            {/* Top User Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--bg-surface)',
                    color: 'var(--accent-green)',
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: '13px',
                    fontWeight: 500,
                  }}
                >
                  {getInitials(req.clientName)}
                </div>
                <div>
                  <h3 style={{ fontSize: '14.5px', margin: 0, fontWeight: 600, color: 'var(--text-main)' }}>
                    {req.clientName}
                  </h3>
                  <div style={{ fontSize: '11px', color: 'var(--text-subtle)', marginTop: '2px' }}>
                    {req.date} • Score {req.faceMatchScore}%
                  </div>
                </div>
              </div>

              <span
                className={`vance-badge ${req.status === 'pending' ? 'warn' : 'green'}`}
                style={{ fontSize: '10.5px' }}
              >
                {req.status === 'pending' ? 'Pendente' : 'Aprovada'}
              </span>
            </div>

            {/* Customer Details Micro-Tiles */}
            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-md)',
                padding: '10px 14px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '12px',
              }}
            >
              <span className="tnum" style={{ color: 'var(--text-main)', fontWeight: 500 }}>
                {req.cpf}
              </span>
              <span className="tnum" style={{ color: 'var(--text-muted)' }}>
                {req.phone}
              </span>
            </div>

            {/* Bottom Actions & Price */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '4px',
                marginTop: 'auto',
              }}
            >
              <div>
                <span style={{ fontSize: '10.5px', color: 'var(--text-subtle)' }}>Total</span>
                <div className="tnum" style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-main)' }}>
                  {formatBRL(req.totalWithInterest)}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <a
                  href={`https://wa.me/55${req.phone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="vance-icon-btn"
                  title="Conversar via WhatsApp"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.403 5.586A9.78 9.78 0 0 0 11.47 2.7c-5.412 0-9.814 4.402-9.817 9.816a9.78 9.78 0 0 0 1.312 4.908L1.7 22.3l5.048-1.324a9.79 9.79 0 0 0 4.72 1.218h.004c5.411 0 9.814-4.402 9.817-9.816.001-2.623-1.02-5.088-2.886-6.952zm-6.933 15.027h-.003a8.16 8.16 0 0 1-4.16-1.135l-.298-.177-3.09.81.824-3.013-.195-.31a8.16 8.16 0 0 1-1.25-4.398c.003-4.507 3.67-8.174 8.18-8.174 2.183 0 4.236.85 5.778 2.393a8.12 8.12 0 0 1 2.39 5.78c-.003 4.508-3.67 8.175-8.176 8.175zm4.484-6.13c-.246-.123-1.457-.719-1.683-.801-.226-.082-.391-.123-.555.123-.165.247-.638.801-.782.966-.144.165-.288.185-.534.062-.246-.123-1.04-.383-1.982-1.223-.733-.654-1.228-1.463-1.372-1.71-.144-.247-.015-.38.109-.503.111-.11.246-.288.37-.432.123-.144.164-.247.246-.412.082-.165.041-.309-.02-.432-.062-.124-.556-1.337-.762-1.831-.2-.482-.403-.417-.555-.425l-.473-.008c-.164 0-.432.062-.658.309s-.864.844-.864 2.06 0 2.39 1.07 3.83c1.07 1.44 2.508 2.2 3.6 2.668.784.336 1.498.288 2.062.204.629-.094 1.933-.79 2.201-1.551.267-.76.267-1.41.185-1.551-.082-.141-.246-.223-.492-.346z"/>
                  </svg>
                </a>

                <Link href={`/solicitacoes/${req.id}`} className="vance-btn primary sm">
                  <span>Avaliar KYC</span>
                  <svg className="icon-svg icon-xs" viewBox="0 0 24 24">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Link>
              </div>
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
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
          >
            Anterior
          </button>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Página {currentPage} de {totalPages}
          </span>
          <button
            className="vance-btn sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}
          >
            Próxima
          </button>
        </div>
      )}

      {/* Modal: Nova Proposta de Empréstimo */}
      {isModalOpen && (
        <div
          className="vance-modal-backdrop open"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="vance-modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '520px', display: 'flex', flexDirection: 'column', gap: '18px' }}
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
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', margin: 0 }}>Nova Proposta de Empréstimo</h3>
                  <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>
                    Insira os dados do tomador para submeter à esteira KYC
                  </div>
                </div>
              </div>
              <button
                className="vance-icon-btn"
                style={{ width: '28px', height: '28px' }}
                onClick={() => setIsModalOpen(false)}
              >
                <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleCreateProposal} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Nome Completo do Cliente
                </label>
                <input
                  type="text"
                  required
                  className="vance-input"
                  placeholder="Ex: Amanda Lima Santos"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                    CPF
                  </label>
                  <input
                    type="text"
                    required
                    className="vance-input"
                    placeholder="000.000.000-00"
                    value={clientCpf}
                    onChange={(e) => setClientCpf(e.target.value)}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                    Telefone WhatsApp
                  </label>
                  <input
                    type="text"
                    required
                    className="vance-input"
                    placeholder="(11) 98765-4321"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                    Valor Solicitado (R$)
                  </label>
                  <input
                    type="number"
                    required
                    min={50}
                    step={50}
                    className="vance-input"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                    Taxa de Juros (%)
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={100}
                    className="vance-input"
                    value={interestPercent}
                    onChange={(e) => setInterestPercent(Number(e.target.value))}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Linha de Cobrança / Rota
                </label>
                <select
                  className="vance-select"
                  value={selectedLine}
                  onChange={(e) => setSelectedLine(e.target.value)}
                >
                  <option value="São Paulo 001">São Paulo 001 — Gabriel (GA)</option>
                  <option value="São Paulo 002">São Paulo 002 — Juliano (JU)</option>
                </select>
              </div>

              <div style={{ backgroundColor: 'var(--bg-card)', padding: '12px 14px', borderRadius: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Total a Quitar no Vencimento:</span>
                <span className="tnum" style={{ fontSize: '15px', fontWeight: 500, color: 'var(--accent-green)' }}>
                  R$ {(amount * (1 + interestPercent / 100)).toFixed(2).replace('.', ',')}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '6px' }}>
                <button
                  type="button"
                  className="vance-btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="vance-btn primary"
                >
                  Submeter Proposta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
