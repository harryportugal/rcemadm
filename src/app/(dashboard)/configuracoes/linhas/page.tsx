'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface LineData {
  id: string;
  name: string;
  desc: string;
  collector: string;
  status: 'active' | 'inactive';
  contracts: number;
}

const INITIAL_LINES: LineData[] = [
  { id: 'l-1', name: 'São Paulo 001', desc: 'Região Central e Zona Sul', collector: 'Gabriel', status: 'active', contracts: 45 },
  { id: 'l-2', name: 'São Paulo 002', desc: 'Zona Leste e Grande ABC', collector: 'Juninho', status: 'active', contracts: 43 },
  { id: 'l-3', name: 'Campinas 001', desc: 'Região Metropolitana de Campinas', collector: '—', status: 'inactive', contracts: 0 },
  { id: 'l-4', name: 'Santos 001', desc: 'Baixada Santista', collector: '—', status: 'inactive', contracts: 0 },
];

export default function ConfiguracaoLinhasPage() {
  const [lines, setLines] = useState<LineData[]>(INITIAL_LINES);
  const [showInactive, setShowInactive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLine, setEditingLine] = useState<LineData | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form fields
  const [formName, setFormName] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formCollector, setFormCollector] = useState('Gabriel');
  const [formStatus, setFormStatus] = useState<'active' | 'inactive'>('active');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenCreate = () => {
    setEditingLine(null);
    setFormName('');
    setFormDesc('');
    setFormCollector('Gabriel');
    setFormStatus('active');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (line: LineData) => {
    setEditingLine(line);
    setFormName(line.name);
    setFormDesc(line.desc);
    setFormCollector(line.collector === '—' ? 'Gabriel' : line.collector);
    setFormStatus(line.status);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingLine) {
      setLines((prev) =>
        prev.map((l) =>
          l.id === editingLine.id
            ? {
                ...l,
                name: formName,
                desc: formDesc,
                collector: formCollector,
                status: formStatus,
              }
            : l
        )
      );
      showToast(`Linha "${formName}" atualizada com sucesso!`);
    } else {
      const newLine: LineData = {
        id: `l-${Date.now()}`,
        name: formName,
        desc: formDesc,
        collector: formCollector,
        status: formStatus,
        contracts: 0,
      };
      setLines((prev) => [newLine, ...prev]);
      showToast(`Nova linha de cobrança "${formName}" cadastrada!`);
    }
    setIsModalOpen(false);
  };

  const handleToggleStatus = (id: string) => {
    setLines((prev) =>
      prev.map((l) => {
        if (l.id === id) {
          const nextStatus = l.status === 'active' ? 'inactive' : 'active';
          showToast(`Linha "${l.name}" ${nextStatus === 'active' ? 'ativada' : 'desativada'}.`);
          return { ...l, status: nextStatus };
        }
        return l;
      })
    );
  };

  const displayedLines = lines.filter((l) => (showInactive ? true : l.status === 'active'));
  const activeCount = lines.filter((l) => l.status === 'active').length;
  const inactiveCount = lines.filter((l) => l.status === 'inactive').length;

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
          <h1 style={{ fontSize: '22px', margin: 0, fontWeight: 600 }}>Linhas de Cobrança</h1>
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
            onClick={handleOpenCreate}
          >
            <span className="vance-getstarted-text">Nova Linha</span>
            <span className="vance-getstarted-badge">
              <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* ====================================================================
           2. TOOLBAR
           ==================================================================== */}
      <div
        className="vance-card vance-cascade-item delay-2"
        style={{
          padding: '12px 18px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <button
          onClick={() => setShowInactive(!showInactive)}
          className={`vance-btn sm ${showInactive ? 'primary' : ''}`}
        >
          <span>{showInactive ? 'Ocultar desativadas' : `Mostrar desativadas (${inactiveCount})`}</span>
        </button>

        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          Exibindo {displayedLines.length} de {lines.length} linhas
        </span>
      </div>

      {/* ====================================================================
           3. LINES TABLE
           ==================================================================== */}
      <div className="vance-table-wrap vance-cascade-item delay-3">
        <table className="vance-table">
          <thead>
            <tr>
              <th>Nome da Linha</th>
              <th>Descrição / Região</th>
              <th>Cobrador Responsável</th>
              <th>Contratos</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {displayedLines.map((l) => (
              <tr key={l.id} style={{ opacity: l.status === 'active' ? 1 : 0.65 }}>
                <td>
                  <b style={{ color: 'var(--text-main)', fontWeight: 500 }}>{l.name}</b>
                </td>
                <td style={{ color: 'var(--text-muted)' }}>{l.desc}</td>
                <td style={{ color: 'var(--text-main)', fontWeight: 500 }}>{l.collector}</td>
                <td className="tnum" style={{ color: 'var(--text-muted)' }}>
                  {l.contracts} contratos
                </td>
                <td>
                  <button
                    onClick={() => handleToggleStatus(l.id)}
                    className={`vance-badge ${l.status === 'active' ? 'green' : 'muted'}`}
                    style={{ fontSize: '10.5px', cursor: 'pointer', border: 'none' }}
                    title="Clique para alternar status"
                  >
                    {l.status === 'active' ? 'Ativa' : 'Inativa'}
                  </button>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '6px' }}>
                    <Link href="/relatorios/linhas" className="vance-btn sm">
                      Relatório
                    </Link>
                    <button
                      className="vance-btn primary sm"
                      onClick={() => handleOpenEdit(l)}
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
           4. MODAL: NOVA / EDITAR LINHA
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
                  <h3 style={{ fontSize: '16px', margin: 0 }}>
                    {editingLine ? 'Editar Linha de Cobrança' : 'Cadastrar Nova Linha'}
                  </h3>
                  <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>
                    Defina a rota regional e o operador responsável
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

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Nome da Linha
                </label>
                <input
                  type="text"
                  required
                  className="vance-input"
                  placeholder="Ex: São Paulo 003"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Descrição / Território de Cobertura
                </label>
                <input
                  type="text"
                  required
                  className="vance-input"
                  placeholder="Ex: Zona Norte e Guarulhos"
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                    Cobrador Responsável
                  </label>
                  <select
                    className="vance-select"
                    value={formCollector}
                    onChange={(e) => setFormCollector(e.target.value)}
                  >
                    <option value="Gabriel">Gabriel (GA)</option>
                    <option value="Juninho">Juninho (JU)</option>
                    <option value="Henrique">Henrique</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                    Status Operacional
                  </label>
                  <select
                    className="vance-select"
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                  >
                    <option value="active">Ativa</option>
                    <option value="inactive">Inativa</option>
                  </select>
                </div>
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
                  {editingLine ? 'Salvar Alterações' : 'Cadastrar Linha'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
