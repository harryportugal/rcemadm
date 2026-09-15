'use client';

import React, { useState } from 'react';
import { RcemWordmark, RcemMark } from '@/components/ui/RcemLogo';

export default function ConfiguracaoEmpresaPage() {
  const [empresaNome, setEmpresaNome] = useState('RCEM SOLUCOES FINANCEIRAS LTDA');
  const [telefone, setTelefone] = useState('(11) 42447724');
  const [email, setEmail] = useState('contato@rcem.com.br');
  const [pixChave, setPixChave] = useState('pagamentos@rcempix.com');
  const [pixNome, setPixNome] = useState('RCEM SOLUCOES FINANCEIRAS LTDA');
  const [pixBanco, setPixBanco] = useState('BASSPAGO');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
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
          <h1 style={{ fontSize: '22px', margin: 0, fontWeight: 600 }}>Empresa</h1>
        </div>

        {saved && (
          <span className="vance-badge green" style={{ padding: '8px 16px', fontSize: '12px' }}>
            Alterações salvas com sucesso!
          </span>
        )}
      </div>

      {/* Brand Asset Preview Card */}
      <div
        className="vance-card vance-cascade-item delay-2"
        style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
      >
        <h2 style={{ fontSize: '16px', margin: 0 }}>Logomarca Oficial RCEM</h2>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ backgroundColor: 'var(--bg-surface)', padding: '16px 24px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <RcemWordmark height={32} color="var(--accent-green)" />
          </div>
          <div style={{ backgroundColor: 'var(--bg-surface)', padding: '16px 24px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <RcemWordmark height={32} color="var(--text-main)" />
          </div>
          <div style={{ backgroundColor: 'var(--bg-surface)', padding: '12px', borderRadius: '16px' }}>
            <RcemMark size={40} bgColor="var(--bg-card)" color="var(--accent-green)" />
          </div>
        </div>
      </div>

      {/* ====================================================================
           2. FORM
           ==================================================================== */}
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Section 1: Dados Cadastrais */}
        <div
          className="vance-card vance-cascade-item delay-2"
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <h2 style={{ fontSize: '16px', margin: 0 }}>Dados Cadastrais da Empresa</h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '14px',
            }}
          >
            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                Razão Social / Nome Fantasia
              </label>
              <input
                type="text"
                required
                className="vance-input"
                value={empresaNome}
                onChange={(e) => setEmpresaNome(e.target.value)}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                Telefone Oficial de Atendimento
              </label>
              <input
                type="text"
                required
                className="vance-input"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                E-mail de Contato
              </label>
              <input
                type="email"
                required
                className="vance-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Section 2: Dados PIX */}
        <div
          className="vance-card vance-cascade-item delay-3"
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <h2 style={{ fontSize: '16px', margin: 0 }}>Conta Receptora PIX (Cobrança)</h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '14px',
            }}
          >
            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                Chave PIX Oficial
              </label>
              <input
                type="text"
                required
                className="vance-input"
                value={pixChave}
                onChange={(e) => setPixChave(e.target.value)}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                Nome do Titular da Conta
              </label>
              <input
                type="text"
                required
                className="vance-input"
                value={pixNome}
                onChange={(e) => setPixNome(e.target.value)}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                Instituição Bancária
              </label>
              <input
                type="text"
                required
                className="vance-input"
                value={pixBanco}
                onChange={(e) => setPixBanco(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div
          className="vance-card vance-cascade-item delay-4"
          style={{ display: 'flex', justifyContent: 'flex-end' }}
        >
          <button type="submit" className="vance-getstarted-btn primary">
            <span className="vance-getstarted-text">Salvar Alterações</span>
            <span className="vance-getstarted-badge">
              <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
            </span>
          </button>
        </div>

      </form>

    </div>
  );
}
