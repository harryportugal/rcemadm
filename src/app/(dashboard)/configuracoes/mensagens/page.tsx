'use client';

import React, { useState } from 'react';

interface TemplateItem {
  id: string;
  title: string;
  category: string;
  preview: string;
  tags: string[];
}

const INITIAL_TEMPLATES: TemplateItem[] = [
  { id: '1', title: 'Saudação de Boas-Vindas', category: 'Onboarding', preview: 'Olá, {CLIENTE_PRIMEIRO_NOME}! Seu cadastro na RCEM foi aprovado com sucesso.', tags: ['Ativo', 'WhatsApp'] },
  { id: '2', title: 'Lembrete de Vencimento (Hoje)', category: 'Cobrança', preview: 'Olá, {CLIENTE_PRIMEIRO_NOME}. Seu contrato vence hoje. Chave PIX: {CHAVE_PIX_EMPRESA}', tags: ['Ativo', 'WhatsApp'] },
  { id: '3', title: 'Cobrança em Atraso (3 Dias)', category: 'Inadimplência', preview: 'Identificamos que seu pagamento de R$ {VALOR_TOTAL} está pendente há 3 dias. Regularize agora para manter seu limite.', tags: ['Ativo', 'WhatsApp'] },
  { id: '4', title: 'Confirmação de Quitação', category: 'Recibo', preview: 'Pagamento confirmado com sucesso! Obrigado por manter seus pagamentos em dia.', tags: ['Ativo', 'WhatsApp'] },
];

export default function ConfiguracaoMensagensPage() {
  const [templates, setTemplates] = useState<TemplateItem[]>(INITIAL_TEMPLATES);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<TemplateItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form fields
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('Cobrança');
  const [formContent, setFormContent] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenCreate = () => {
    setEditingTemplate(null);
    setFormTitle('');
    setFormCategory('Cobrança');
    setFormContent('Olá, {CLIENTE_PRIMEIRO_NOME}! Seu pagamento de R$ {VALOR_TOTAL} vence em breve. Chave PIX: {CHAVE_PIX_EMPRESA}');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (t: TemplateItem) => {
    setEditingTemplate(t);
    setFormTitle(t.title);
    setFormCategory(t.category);
    setFormContent(t.preview);
    setIsModalOpen(true);
  };

  const handleDuplicate = (t: TemplateItem) => {
    const clone: TemplateItem = {
      id: `tpl-${Date.now()}`,
      title: `${t.title} (Cópia)`,
      category: t.category,
      preview: t.preview,
      tags: [...t.tags],
    };
    setTemplates((prev) => [clone, ...prev]);
    showToast(`Template "${t.title}" duplicado com sucesso!`);
  };

  const handleInsertVariable = (v: string) => {
    setFormContent((prev) => `${prev} ${v} `);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTemplate) {
      setTemplates((prev) =>
        prev.map((t) =>
          t.id === editingTemplate.id
            ? { ...t, title: formTitle, category: formCategory, preview: formContent }
            : t
        )
      );
      showToast(`Template "${formTitle}" atualizado com sucesso!`);
    } else {
      const newTpl: TemplateItem = {
        id: `tpl-${Date.now()}`,
        title: formTitle,
        category: formCategory,
        preview: formContent,
        tags: ['Ativo', 'WhatsApp'],
      };
      setTemplates((prev) => [newTpl, ...prev]);
      showToast(`Novo template "${formTitle}" criado com sucesso!`);
    }
    setIsModalOpen(false);
  };

  const filtered = templates.filter((t) => {
    if (search) {
      const q = search.toLowerCase();
      return t.title.toLowerCase().includes(q) || t.category.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* ====================================================================
           1. TOP HEADER & NEW TEMPLATE
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
          <h1 style={{ fontSize: '22px', margin: 0, fontWeight: 600 }}>Templates de Mensagem</h1>
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
            <span className="vance-getstarted-text">Novo Template</span>
            <span className="vance-getstarted-badge">
              <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* ====================================================================
           2. SEARCH TOOLBAR
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
            placeholder="Buscar por nome ou categoria..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '36px' }}
          />
        </div>

        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          Variáveis disponíveis: <code style={{ backgroundColor: 'var(--bg-surface)', padding: '2px 6px', borderRadius: '4px', fontSize: '11px' }}>{'{CLIENTE_PRIMEIRO_NOME}'}</code>, <code style={{ backgroundColor: 'var(--bg-surface)', padding: '2px 6px', borderRadius: '4px', fontSize: '11px' }}>{'{VALOR_TOTAL}'}</code>, <code style={{ backgroundColor: 'var(--bg-surface)', padding: '2px 6px', borderRadius: '4px', fontSize: '11px' }}>{'{CHAVE_PIX_EMPRESA}'}</code>
        </div>
      </div>

      {/* ====================================================================
           3. TEMPLATES GRID
           ==================================================================== */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '18px',
        }}
      >
        {filtered.map((tpl, idx) => (
          <div
            key={tpl.id}
            className={`vance-card vance-cascade-item delay-${(idx % 6) + 3}`}
            style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '15px', margin: 0, color: 'var(--text-main)', fontWeight: 500 }}>{tpl.title}</h3>
                <span style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>{tpl.category}</span>
              </div>
              <span className="vance-badge green" style={{ fontSize: '10.5px' }}>
                Ativo
              </span>
            </div>

            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-md)',
                padding: '14px',
                border: '1px solid var(--border-subtle)',
                fontSize: '12.5px',
                color: 'var(--text-muted)',
                lineHeight: 1.5,
                minHeight: '80px',
              }}
            >
              {tpl.preview}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: 'auto' }}>
              <button
                type="button"
                className="vance-btn sm"
                onClick={() => handleDuplicate(tpl)}
              >
                Duplicar
              </button>
              <button
                type="button"
                className="vance-btn primary sm"
                onClick={() => handleOpenEdit(tpl)}
              >
                Editar Template
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ====================================================================
           4. MODAL: NOVO / EDITAR TEMPLATE
           ==================================================================== */}
      {isModalOpen && (
        <div className="vance-modal-backdrop open" onClick={() => setIsModalOpen(false)}>
          <div
            className="vance-modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '540px', display: 'flex', flexDirection: 'column', gap: '18px' }}
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
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', margin: 0 }}>
                    {editingTemplate ? 'Editar Template de Mensagem' : 'Criar Novo Template'}
                  </h3>
                  <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>
                    Personalize o texto e use tags dinâmicas de preenchimento
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
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                    Título do Template
                  </label>
                  <input
                    type="text"
                    required
                    className="vance-input"
                    placeholder="Ex: Cobrança Amigável D-1"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                    Categoria
                  </label>
                  <select
                    className="vance-select"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                  >
                    <option value="Cobrança">Cobrança</option>
                    <option value="Onboarding">Onboarding</option>
                    <option value="Inadimplência">Inadimplência</option>
                    <option value="Recibo">Recibo</option>
                    <option value="Aviso">Aviso Geral</option>
                  </select>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    Mensagem do Template
                  </label>
                  <span style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>
                    Clique para inserir tag:
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '6px', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="vance-badge active"
                    style={{ cursor: 'pointer', border: 'none', fontSize: '10.5px' }}
                    onClick={() => handleInsertVariable('{CLIENTE_PRIMEIRO_NOME}')}
                  >
                    + {`{CLIENTE_PRIMEIRO_NOME}`}
                  </button>
                  <button
                    type="button"
                    className="vance-badge active"
                    style={{ cursor: 'pointer', border: 'none', fontSize: '10.5px' }}
                    onClick={() => handleInsertVariable('{VALOR_TOTAL}')}
                  >
                    + {`{VALOR_TOTAL}`}
                  </button>
                  <button
                    type="button"
                    className="vance-badge active"
                    style={{ cursor: 'pointer', border: 'none', fontSize: '10.5px' }}
                    onClick={() => handleInsertVariable('{CHAVE_PIX_EMPRESA}')}
                  >
                    + {`{CHAVE_PIX_EMPRESA}`}
                  </button>
                </div>

                <textarea
                  required
                  rows={4}
                  className="vance-input"
                  style={{ width: '100%', height: '110px', resize: 'vertical' }}
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                />
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
                  {editingTemplate ? 'Salvar Alterações' : 'Criar Template'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
