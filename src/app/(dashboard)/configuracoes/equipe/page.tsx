'use client';

import React, { useState } from 'react';
import { getInitials } from '@/hooks/useMask';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'Administrador' | 'Analista' | 'Cobrador' | 'Financeiro';
  active: boolean;
  createdAt: string;
}

const INITIAL_TEAM: TeamMember[] = [
  { id: 'tm-1', name: 'Henrique', email: 'henrique@rcem.com.br', phone: '(11) 98888-0001', role: 'Administrador', active: true, createdAt: '01/01/2025' },
  { id: 'tm-2', name: 'Diego Guarieiro', email: 'diego.guarieiro@gmail.com', phone: '(11) 98888-0002', role: 'Administrador', active: true, createdAt: '06/06/2026' },
  { id: 'tm-3', name: 'Felipe Rosas', email: 'contato@eufelipe.com', phone: '(11) 98888-0003', role: 'Administrador', active: true, createdAt: '03/12/2025' },
  { id: 'tm-4', name: 'Gabriela', email: 'gabriela@rcem.com.br', phone: '(11) 98888-0004', role: 'Analista', active: true, createdAt: '10/03/2026' },
  { id: 'tm-5', name: 'Giovana', email: 'giovana@rcem.com.br', phone: '(11) 98888-0005', role: 'Analista', active: true, createdAt: '15/04/2026' },
  { id: 'tm-6', name: 'Gabriel', email: 'gabriel@rcem.com', phone: '(11) 98888-0006', role: 'Cobrador', active: true, createdAt: '07/03/2026' },
  { id: 'tm-7', name: 'Juninho', email: 'juninho@rcem.com', phone: '(11) 98888-0007', role: 'Cobrador', active: true, createdAt: '14/05/2026' },
];

export default function ConfiguracaoEquipePage() {
  const [teamList, setTeamList] = useState<TeamMember[]>(INITIAL_TEAM);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('Todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form fields
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formRole, setFormRole] = useState<'Administrador' | 'Analista' | 'Cobrador' | 'Financeiro'>('Analista');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenCreateModal = () => {
    setEditingMember(null);
    setFormName('');
    setFormEmail('');
    setFormPhone('');
    setFormRole('Analista');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (member: TeamMember) => {
    setEditingMember(member);
    setFormName(member.name);
    setFormEmail(member.email);
    setFormPhone(member.phone || '');
    setFormRole(member.role);
    setIsModalOpen(true);
  };

  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMember) {
      setTeamList((prev) =>
        prev.map((m) =>
          m.id === editingMember.id
            ? { ...m, name: formName, email: formEmail, phone: formPhone, role: formRole }
            : m
        )
      );
      showToast(`Colaborador "${formName}" atualizado com sucesso!`);
    } else {
      const newMember: TeamMember = {
        id: `tm-${Date.now()}`,
        name: formName,
        email: formEmail,
        phone: formPhone || '(11) 98000-0000',
        role: formRole,
        active: true,
        createdAt: new Date().toLocaleDateString('pt-BR'),
      };
      setTeamList((prev) => [newMember, ...prev]);
      showToast(`Novo membro "${formName}" adicionado à equipe!`);
    }
    setIsModalOpen(false);
  };

  const handleToggleActive = (memberId: string) => {
    setTeamList((prev) =>
      prev.map((m) => {
        if (m.id === memberId) {
          const nextState = !m.active;
          showToast(`Acesso de "${m.name}" ${nextState ? 'ativado' : 'desativado'}.`);
          return { ...m, active: nextState };
        }
        return m;
      })
    );
  };

  const filtered = teamList.filter((member) => {
    if (roleFilter !== 'Todos' && member.role !== roleFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        member.name.toLowerCase().includes(q) ||
        member.email.toLowerCase().includes(q) ||
        (member.phone && member.phone.includes(q))
      );
    }
    return true;
  });

  const activeCount = teamList.filter((m) => m.active).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* ====================================================================
           1. TOP HEADER & NEW MEMBER BUTTON
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
          <h1 style={{ fontSize: '22px', margin: 0, fontWeight: 600 }}>Equipe</h1>
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
            onClick={handleOpenCreateModal}
          >
            <span className="vance-getstarted-text">Novo Membro</span>
            <span className="vance-getstarted-badge">
              <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* ====================================================================
           2. SEARCH & ROLE FILTER BAR
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
            placeholder="Buscar por nome, email ou telefone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '36px' }}
          />
        </div>

        {/* Role Tabs */}
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
          {['Todos', 'Administrador', 'Analista', 'Cobrador', 'Financeiro'].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              style={{
                padding: '6px 14px',
                fontSize: '12px',
                border: 'none',
                borderRadius: 'var(--radius-pill)',
                cursor: 'pointer',
                fontWeight: 500,
                backgroundColor: roleFilter === r ? 'var(--text-main)' : 'transparent',
                color: roleFilter === r ? 'var(--text-inv)' : 'var(--text-muted)',
                transition: 'all 0.15s ease',
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* ====================================================================
           3. TEAM TABLE
           ==================================================================== */}
      <div className="vance-table-wrap vance-cascade-item delay-3">
        <table className="vance-table">
          <thead>
            <tr>
              <th>Colaborador</th>
              <th>E-mail & Contato</th>
              <th>Função / Cargo</th>
              <th>Status</th>
              <th>Cadastrado em</th>
              <th style={{ textAlign: 'right' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((m) => (
              <tr key={m.id} style={{ opacity: m.active ? 1 : 0.65 }}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor:
                          m.role === 'Administrador'
                            ? 'var(--accent-green-bg)'
                            : m.active
                            ? 'var(--bg-card)'
                            : 'var(--bg-card)',
                        color:
                          m.role === 'Administrador'
                            ? 'var(--accent-green)'
                            : 'var(--text-main)',
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: '11px',
                        fontWeight: 500,
                      }}
                    >
                      {getInitials(m.name)}
                    </div>
                    <div>
                      <b style={{ color: 'var(--text-main)', fontWeight: 500, display: 'block' }}>{m.name}</b>
                      {m.phone && <span style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>{m.phone}</span>}
                    </div>
                  </div>
                </td>
                <td style={{ color: 'var(--text-muted)' }}>{m.email}</td>
                <td>
                  <span
                    className={`vance-badge ${
                      m.role === 'Administrador' ? 'green' : ''
                    }`}
                    style={{ fontSize: '10.5px' }}
                  >
                    {m.role}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleToggleActive(m.id)}
                    className={`vance-badge ${m.active ? 'green' : 'muted'}`}
                    style={{ fontSize: '10px', cursor: 'pointer', border: 'none' }}
                    title="Clique para alternar status"
                  >
                    {m.active ? 'Ativo' : 'Inativo'}
                  </button>
                </td>
                <td className="tnum" style={{ color: 'var(--text-subtle)', fontSize: '12px' }}>
                  {m.createdAt}
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '6px' }}>
                    <button
                      className="vance-btn sm"
                      onClick={() => handleToggleActive(m.id)}
                    >
                      {m.active ? 'Suspender' : 'Reativar'}
                    </button>
                    <button
                      className="vance-btn primary sm"
                      onClick={() => handleOpenEditModal(m)}
                    >
                      Editar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ====================================================================
           4. MODAL: NOVO / EDITAR MEMBRO DA EQUIPE
           ==================================================================== */}
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
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M19 8v6M22 11h-6" />
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', margin: 0 }}>
                    {editingMember ? 'Editar Colaborador' : 'Adicionar Novo Membro'}
                  </h3>
                  <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>
                    Defina o cargo, permissões de acesso e dados de contato
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

            <form onSubmit={handleSaveMember} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Nome Completo
                </label>
                <input
                  type="text"
                  required
                  className="vance-input"
                  placeholder="Ex: Rafael Carvalho Silva"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                    E-mail Corporativo
                  </label>
                  <input
                    type="email"
                    required
                    className="vance-input"
                    placeholder="nome@rcem.com.br"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                    Telefone / WhatsApp
                  </label>
                  <input
                    type="text"
                    required
                    className="vance-input"
                    placeholder="(11) 98888-7777"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Função / Cargo no Sistema
                </label>
                <select
                  className="vance-select"
                  value={formRole}
                  onChange={(e) => setFormRole(e.target.value as any)}
                >
                  <option value="Administrador">Administrador (Acesso total)</option>
                  <option value="Analista">Analista KYC (Esteira de crédito e aprovações)</option>
                  <option value="Cobrador">Cobrador de Linha (Rotas, clientes e recebimentos)</option>
                  <option value="Financeiro">Financeiro (Repasses e conciliação)</option>
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
                >
                  {editingMember ? 'Salvar Alterações' : 'Adicionar Membro'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
