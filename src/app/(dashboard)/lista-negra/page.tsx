'use client';

import React, { useState } from 'react';
import { MOCK_CLIENTS } from '@/data/mockData';

interface BlacklistClient {
  id: string;
  name: string;
  cpf: string;
  phone: string;
  blacklistReason?: string;
  blacklistDate?: string;
  status: 'blacklisted' | 'active';
}

export default function ListaNegraPage() {
  const [tab, setTab] = useState<'ativos' | 'desbloqueados'>('ativos');
  const [search, setSearch] = useState('');
  const [clients, setClients] = useState<BlacklistClient[]>(
    MOCK_CLIENTS.map((c) => ({
      id: c.id,
      name: c.name,
      cpf: c.cpf,
      phone: c.phone,
      blacklistReason: c.blacklistReason || (c.status === 'blacklisted' ? 'Inadimplência recorrente' : undefined),
      blacklistDate: c.blacklistDate || '14/06/2026',
      status: c.status === 'blacklisted' ? 'blacklisted' : 'active',
    }))
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form fields
  const [formName, setFormName] = useState('');
  const [formCpf, setFormCpf] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formReason, setFormReason] = useState('Inadimplência recorrente (> 30 dias)');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleUnblock = (id: string, name: string) => {
    setClients((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'active' } : c))
    );
    showToast(`Tomador "${name}" desbloqueado com sucesso!`);
  };

  const handleReblock = (id: string, name: string) => {
    setClients((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'blacklisted' } : c))
    );
    showToast(`Restrição restabelecida para "${name}".`);
  };

  const handleAddRestriction = (e: React.FormEvent) => {
    e.preventDefault();
    const newBlocked: BlacklistClient = {
      id: `bl-${Date.now()}`,
      name: formName,
      cpf: formCpf,
      phone: formPhone || '(11) 98000-0000',
      blacklistReason: formReason,
      blacklistDate: new Date().toLocaleDateString('pt-BR'),
      status: 'blacklisted',
    };

    setClients((prev) => [newBlocked, ...prev]);
    showToast(`Tomador "${formName}" bloqueado na Lista Negra!`);
    setIsModalOpen(false);
    setFormName('');
    setFormCpf('');
    setFormPhone('');
    setTab('ativos');
  };

  const blacklisted = clients.filter((c) => c.status === 'blacklisted');
  const unblocked = clients.filter((c) => c.status === 'active' && c.blacklistReason);

  const activeList = tab === 'ativos' ? blacklisted : unblocked;

  const filtered = activeList.filter((c) => {
    if (search) {
      const q = search.toLowerCase();
      return c.name.toLowerCase().includes(q) || c.cpf.includes(q) || c.phone.includes(q);
    }
    return true;
  });

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
          <h1 style={{ fontSize: '22px', margin: 0, fontWeight: 600 }}>Lista Negra</h1>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          {toastMessage && (
            <span className="vance-badge green" style={{ padding: '6px 14px', fontSize: '12px' }}>
              {toastMessage}
            </span>
          )}

          <button
            type="button"
            className="vance-getstarted-btn primary"
            onClick={() => setIsModalOpen(true)}
          >
            <span className="vance-getstarted-text">Nova Restrição</span>
            <span className="vance-getstarted-badge">
              <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* ====================================================================
           2. TOOLBAR: SEARCH & TABS
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
            placeholder="Buscar por nome, CPF ou telefone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '36px' }}
          />
        </div>

        {/* Tab switch */}
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
            type="button"
            onClick={() => setTab('ativos')}
            style={{
              padding: '6px 14px',
              fontSize: '12px',
              border: 'none',
              borderRadius: 'var(--radius-pill)',
              cursor: 'pointer',
              fontWeight: 500,
              backgroundColor: tab === 'ativos' ? 'var(--text-main)' : 'transparent',
              color: tab === 'ativos' ? 'var(--text-inv)' : 'var(--text-muted)',
              transition: 'all 0.15s ease',
            }}
          >
            Bloqueados ({blacklisted.length})
          </button>
          <button
            type="button"
            onClick={() => setTab('desbloqueados')}
            style={{
              padding: '6px 14px',
              fontSize: '12px',
              border: 'none',
              borderRadius: 'var(--radius-pill)',
              cursor: 'pointer',
              fontWeight: 500,
              backgroundColor: tab === 'desbloqueados' ? 'var(--text-main)' : 'transparent',
              color: tab === 'desbloqueados' ? 'var(--text-inv)' : 'var(--text-muted)',
              transition: 'all 0.15s ease',
            }}
          >
            Desbloqueados ({unblocked.length})
          </button>
        </div>
      </div>

      {/* ====================================================================
           3. TABLE / EMPTY STATE
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
          <h3 style={{ fontSize: '16px', margin: 0 }}>Nenhum registro encontrado</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', maxWidth: '400px', margin: 0 }}>
            Nenhum tomador com este filtro de busca.
          </p>
        </div>
      ) : (
        <div className="vance-table-wrap vance-cascade-item delay-3">
          <table className="vance-table">
            <thead>
              <tr>
                <th>Nome do Tomador</th>
                <th>CPF</th>
                <th>Telefone</th>
                <th>Motivo do Bloqueio</th>
                <th>Data de Bloqueio</th>
                <th style={{ textAlign: 'right' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((cli) => (
                <tr key={cli.id}>
                  <td>
                    <div style={{ fontWeight: 500, color: 'var(--text-main)' }}>{cli.name}</div>
                  </td>
                  <td className="tnum" style={{ color: 'var(--text-muted)' }}>
                    {cli.cpf}
                  </td>
                  <td className="tnum" style={{ color: 'var(--text-muted)' }}>
                    {cli.phone}
                  </td>
                  <td>
                    <span
                      className={`vance-badge ${cli.status === 'blacklisted' ? 'neg' : 'green'}`}
                      style={{ fontSize: '11px' }}
                    >
                      {cli.blacklistReason || 'Inadimplência recorrente'}
                    </span>
                  </td>
                  <td className="tnum" style={{ color: 'var(--text-subtle)', fontSize: '12px' }}>
                    {cli.blacklistDate || '14/06/2026'}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {cli.status === 'blacklisted' ? (
                      <button
                        onClick={() => handleUnblock(cli.id, cli.name)}
                        className="vance-btn sm"
                        style={{ fontSize: '11px', padding: '4px 12px' }}
                      >
                        <svg className="icon-svg icon-xs" viewBox="0 0 24 24">
                          <path d="m16 11 2 2 4-4" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        </svg>
                        <span>Desbloquear</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleReblock(cli.id, cli.name)}
                        className="vance-btn primary sm"
                        style={{ fontSize: '11px', padding: '4px 12px' }}
                      >
                        <span>Bloquear</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ====================================================================
           4. MODAL: ADICIONAR RESTRIÇÃO / BLOQUEAR TOMADOR
           ==================================================================== */}
      {isModalOpen && (
        <div className="vance-modal-backdrop open" onClick={() => setIsModalOpen(false)}>
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
                    backgroundColor: 'var(--neg-bg)',
                    color: 'var(--neg)',
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', margin: 0 }}>Adicionar à Lista Negra</h3>
                  <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>
                    Bloquear tomador de novos empréstimos e esteira KYC
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

            <form onSubmit={handleAddRestriction} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Nome do Tomador
                </label>
                <input
                  type="text"
                  required
                  className="vance-input"
                  placeholder="Ex: Carlos Eduardo Silveira"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
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
                    value={formCpf}
                    onChange={(e) => setFormCpf(e.target.value)}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                    Telefone
                  </label>
                  <input
                    type="text"
                    className="vance-input"
                    placeholder="(11) 99999-9999"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Motivo da Restrição
                </label>
                <select
                  className="vance-select"
                  value={formReason}
                  onChange={(e) => setFormReason(e.target.value)}
                >
                  <option value="Inadimplência recorrente (> 30 dias)">Inadimplência recorrente (&gt; 30 dias)</option>
                  <option value="Fraude documental / Documento falso">Fraude documental / Documento falso</option>
                  <option value="Incompatibilidade facial / Golpe KYC">Incompatibilidade facial / Golpe KYC</option>
                  <option value="Contatos de referência falsos ou inacessíveis">Contatos de referência falsos ou inacessíveis</option>
                  <option value="Decisão administrativa da diretoria">Decisão administrativa da diretoria</option>
                </select>
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
                  style={{ backgroundColor: 'var(--neg)', borderColor: 'var(--neg)', color: '#FFFFFF' }}
                >
                  Confirmar Bloqueio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
