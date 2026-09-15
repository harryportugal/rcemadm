'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { formatCPF, formatPhone, formatCEP, formatDate } from '@/hooks/useMask';

export default function NovoClientePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    nascimento: '',
    telefone: '',
    email: '',
    ref1Nome: '',
    ref1Fone: '',
    ref1Parentesco: '',
    ref2Nome: '',
    ref2Fone: '',
    ref2Parentesco: '',
    cep: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: 'SP',
    senha: '',
    pixType: 'cpf' as 'cpf' | 'email' | 'phone',
    pixKey: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleCepChange = (val: string) => {
    const masked = formatCEP(val);
    setForm((prev) => ({ ...prev, cep: masked }));
    const raw = val.replace(/\D/g, '');
    if (raw.length === 8) {
      setForm((prev) => ({
        ...prev,
        rua: 'Rua Alberto Marceli',
        bairro: 'Jardim Promeca',
        cidade: 'Várzea Paulista',
        uf: 'SP',
      }));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      router.push('/clientes');
    }, 1200);
  };

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
              href="/clientes"
              className="vance-btn sm"
              style={{ padding: '4px 10px', fontSize: '11px', gap: '4px' }}
            >
              <svg className="icon-svg icon-xs" viewBox="0 0 24 24">
                <path d="m15 18-6-6 6-6" />
              </svg>
              <span>Voltar</span>
            </Link>
          </div>
          <h1 style={{ fontSize: '22px', margin: 0, fontWeight: 600 }}>Novo Cliente</h1>
        </div>

        {saved && (
          <span className="vance-badge green" style={{ padding: '8px 16px', fontSize: '12px' }}>
            Cliente cadastrado com sucesso!
          </span>
        )}
      </div>

      {/* ====================================================================
           2. REGISTRATION FORM
           ==================================================================== */}
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Section 1: Dados Pessoais */}
        <div
          className="vance-card vance-cascade-item delay-2"
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4" />
              <path d="M5 21a7 7 0 0 1 14 0" />
            </svg>
            <h2 style={{ fontSize: '16px', margin: 0 }}>1. Dados Pessoais</h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '14px',
            }}
          >
            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                Nome Completo
              </label>
              <input
                type="text"
                required
                className="vance-input"
                placeholder="Ex: João da Silva"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                CPF
              </label>
              <input
                type="text"
                required
                inputMode="numeric"
                maxLength={14}
                className="vance-input"
                placeholder="000.000.000-00"
                value={form.cpf}
                onChange={(e) => setForm({ ...form, cpf: formatCPF(e.target.value) })}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                Data de Nascimento
              </label>
              <input
                type="text"
                required
                inputMode="numeric"
                maxLength={10}
                className="vance-input"
                placeholder="DD/MM/AAAA"
                value={form.nascimento}
                onChange={(e) => setForm({ ...form, nascimento: formatDate(e.target.value) })}
              />
            </div>
          </div>
        </div>

        {/* Section 2: Contato & Acesso */}
        <div
          className="vance-card vance-cascade-item delay-3"
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <h2 style={{ fontSize: '16px', margin: 0 }}>2. Informações de Contato & Chave PIX</h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '14px',
            }}
          >
            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                Telefone / WhatsApp
              </label>
              <input
                type="text"
                required
                className="vance-input"
                placeholder="(00) 00000-0000"
                value={form.telefone}
                onChange={(e) => setForm({ ...form, telefone: formatPhone(e.target.value) })}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                E-mail
              </label>
              <input
                type="email"
                required
                className="vance-input"
                placeholder="cliente@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                Tipo de Chave PIX
              </label>
              <select
                className="vance-select"
                value={form.pixType}
                onChange={(e) => setForm({ ...form, pixType: e.target.value as any })}
              >
                <option value="cpf">CPF</option>
                <option value="phone">Telefone</option>
                <option value="email">E-mail</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                Chave PIX
              </label>
              <input
                type="text"
                required
                className="vance-input"
                placeholder="Informe a chave PIX"
                value={form.pixKey}
                onChange={(e) => setForm({ ...form, pixKey: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Section 3: Endereço */}
        <div
          className="vance-card vance-cascade-item delay-4"
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <h2 style={{ fontSize: '16px', margin: 0 }}>3. Endereço Residencial</h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '14px',
            }}
          >
            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                CEP (Autocompleta)
              </label>
              <input
                type="text"
                required
                maxLength={9}
                className="vance-input"
                placeholder="00000-000"
                value={form.cep}
                onChange={(e) => handleCepChange(e.target.value)}
              />
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                Logradouro / Rua
              </label>
              <input
                type="text"
                required
                className="vance-input"
                placeholder="Nome da rua ou avenida"
                value={form.rua}
                onChange={(e) => setForm({ ...form, rua: e.target.value })}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                Número
              </label>
              <input
                type="text"
                required
                className="vance-input"
                placeholder="123"
                value={form.numero}
                onChange={(e) => setForm({ ...form, numero: e.target.value })}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                Bairro
              </label>
              <input
                type="text"
                required
                className="vance-input"
                placeholder="Bairro"
                value={form.bairro}
                onChange={(e) => setForm({ ...form, bairro: e.target.value })}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                Cidade
              </label>
              <input
                type="text"
                required
                className="vance-input"
                placeholder="Cidade"
                value={form.cidade}
                onChange={(e) => setForm({ ...form, cidade: e.target.value })}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                UF
              </label>
              <select
                className="vance-select"
                value={form.uf}
                onChange={(e) => setForm({ ...form, uf: e.target.value })}
              >
                <option value="SP">SP</option>
                <option value="RJ">RJ</option>
                <option value="MG">MG</option>
                <option value="PR">PR</option>
                <option value="RS">RS</option>
                <option value="SC">SC</option>
                <option value="BA">BA</option>
                <option value="GO">GO</option>
                <option value="DF">DF</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 4: Contatos de Referência */}
        <div
          className="vance-card vance-cascade-item delay-5"
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <h2 style={{ fontSize: '16px', margin: 0 }}>4. Contatos de Referência (Obrigatório)</h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '16px',
            }}
          >
            {/* Ref 1 */}
            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-md)',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-main)' }}>
                Referência 1
              </div>
              <input
                type="text"
                required
                className="vance-input"
                placeholder="Nome do contato"
                value={form.ref1Nome}
                onChange={(e) => setForm({ ...form, ref1Nome: e.target.value })}
              />
              <input
                type="text"
                required
                className="vance-input"
                placeholder="Telefone (00) 00000-0000"
                value={form.ref1Fone}
                onChange={(e) => setForm({ ...form, ref1Fone: formatPhone(e.target.value) })}
              />
              <input
                type="text"
                required
                className="vance-input"
                placeholder="Grau de parentesco (Ex: Mãe, Amigo)"
                value={form.ref1Parentesco}
                onChange={(e) => setForm({ ...form, ref1Parentesco: e.target.value })}
              />
            </div>

            {/* Ref 2 */}
            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-md)',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-main)' }}>
                Referência 2
              </div>
              <input
                type="text"
                required
                className="vance-input"
                placeholder="Nome do contato"
                value={form.ref2Nome}
                onChange={(e) => setForm({ ...form, ref2Nome: e.target.value })}
              />
              <input
                type="text"
                required
                className="vance-input"
                placeholder="Telefone (00) 00000-0000"
                value={form.ref2Fone}
                onChange={(e) => setForm({ ...form, ref2Fone: formatPhone(e.target.value) })}
              />
              <input
                type="text"
                required
                className="vance-input"
                placeholder="Grau de parentesco (Ex: Irmão, Colega)"
                value={form.ref2Parentesco}
                onChange={(e) => setForm({ ...form, ref2Parentesco: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div
          className="vance-card vance-cascade-item delay-6"
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px',
            alignItems: 'center',
          }}
        >
          <Link href="/clientes" className="vance-btn">
            Cancelar
          </Link>
          <button type="submit" className="vance-getstarted-btn primary">
            <span className="vance-getstarted-text">Salvar e Cadastrar Cliente</span>
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
