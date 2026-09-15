'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useFilters } from '@/context/FilterContext';
import { PixTransferCard } from '@/components/dashboard/PixTransferCard';

interface OverdueClient {
  id: string;
  name: string;
  initials: string;
  daysLate: number;
  dueDate: string;
  amount: number;
  contract: string;
  collector: string;
  phone: string;
}

interface KycApplicant {
  id: string;
  name: string;
  initials: string;
  time: string;
  amount: number;
  score: number;
  status: 'pending' | 'in_review' | 'approved';
}

const OVERDUE_DATA: OverdueClient[] = [
  {
    id: 'ov-1',
    name: 'Vanderlei Souza',
    initials: 'VS',
    daysLate: 4,
    dueDate: '12/07/2026',
    amount: 200.0,
    contract: '#084',
    collector: 'Gabriel (GA)',
    phone: '11987654321',
  },
  {
    id: 'ov-2',
    name: 'Patrícia Gomes Lima',
    initials: 'PG',
    daysLate: 3,
    dueDate: '13/07/2026',
    amount: 200.0,
    contract: '#062',
    collector: 'Juliano (JU)',
    phone: '11976543210',
  },
  {
    id: 'ov-3',
    name: 'Rodrigo Santos',
    initials: 'RS',
    daysLate: 2,
    dueDate: '14/07/2026',
    amount: 200.0,
    contract: '#077',
    collector: 'Gabriel (GA)',
    phone: '11965432109',
  },
];

const KYC_DATA: KycApplicant[] = [
  {
    id: 'kyc-1',
    name: 'Henrique Souza',
    initials: 'HS',
    time: 'Hoje às 14:22',
    amount: 200.0,
    score: 94,
    status: 'pending',
  },
  {
    id: 'kyc-2',
    name: 'Bianca Gomes',
    initials: 'BG',
    time: 'Hoje às 13:05',
    amount: 250.0,
    score: 91,
    status: 'in_review',
  },
  {
    id: 'kyc-3',
    name: 'Ana Costa',
    initials: 'AC',
    time: 'Ontem às 18:40',
    amount: 350.0,
    score: 96,
    status: 'approved',
  },
  {
    id: 'kyc-4',
    name: 'Carlos Barbosa',
    initials: 'CB',
    time: 'Ontem às 16:15',
    amount: 200.0,
    score: 88,
    status: 'pending',
  },
];

export default function DashboardPage() {
  const { selectedMonth } = useFilters();
  const [timeframe, setTimeframe] = useState<'7d' | '14d' | '30d'>('30d');
  const [kycTab, setKycTab] = useState<'all' | 'pending' | 'approved'>('all');
  const [chargeModalClient, setChargeModalClient] = useState<OverdueClient | null>(null);
  const [copiedMessage, setCopiedMessage] = useState(false);

  // Filter KYC items
  const filteredKyc = KYC_DATA.filter((item) => {
    if (kycTab === 'pending') return item.status === 'pending' || item.status === 'in_review';
    if (kycTab === 'approved') return item.status === 'approved';
    return true;
  });

  const handleCopyMessage = (client: OverdueClient) => {
    const text = `Olá ${client.name}, tudo bem? Aqui é da equipe financeira RCEM. Constatamos que a parcela no valor de R$ ${client.amount.toFixed(2).replace('.', ',')} com vencimento em ${client.dueDate} (Contrato ${client.contract}) está pendente de confirmação. Segue chave PIX para regularização: financeiro@rcem.com.br. Qualquer dúvida estamos à disposição!`;
    navigator.clipboard?.writeText(text);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* ====================================================================
           1. HERO OVERVIEW CARD (APPLE MINIMALIST DESIGN - MONOCHROMATIC + GREEN)
           ==================================================================== */}
      <div
        className="vance-card vance-hero-card vance-cascade-item delay-1"
        style={{
          padding: '24px 28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <h1 style={{ fontSize: '24px', margin: 0, fontWeight: 600 }}>
              Olá, Henrique
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px', margin: 0 }}>
              88 Contratos Ativos • {selectedMonth}
            </p>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/financeiro/recebimentos" className="vance-getstarted-btn">
              <span className="vance-getstarted-text">Recebimento</span>
              <span className="vance-getstarted-badge">
                <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
                  <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1 2-1V2l-2 1-2-1-2 1-2-1-2 1-2-1z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </span>
            </Link>

            <Link href="/solicitacoes" className="vance-getstarted-btn primary">
              <span className="vance-getstarted-text">Nova Proposta</span>
              <span className="vance-getstarted-badge">
                <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </Link>
          </div>
        </div>

        {/* Global Regularity Indicator */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Regularidade da Carteira</span>
            <span className="tnum" style={{ color: 'var(--accent-green)', fontWeight: 500 }}>
              96,6% em dia
            </span>
          </div>
          <div
            style={{
              height: '6px',
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-pill)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: '96.6%',
                backgroundColor: 'var(--accent-green)',
                borderRadius: 'var(--radius-pill)',
                transition: 'width 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
              }}
            />
          </div>
        </div>

        {/* 4 Micro-Tiles Grid (Pure White, Borderless, No-Wrap Layout) */}
        <div
          className="vance-hero-tiles"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px',
            paddingTop: '16px',
            borderTop: '1px solid rgba(0,0,0,0.04)',
            width: '100%',
          }}
        >
          {/* Tile 1: Próximo Vencimento */}
          <div
            className="vance-cascade-item delay-2"
            style={{
              backgroundColor: 'var(--bg-surface)',
              padding: '12px 14px',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              minWidth: 0,
            }}
          >
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-card)',
                display: 'grid',
                placeItems: 'center',
                color: 'var(--text-main)',
                flexShrink: 0,
              }}
            >
              <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-subtle)', whiteSpace: 'nowrap' }}>
                  Próximo Vencimento
                </span>
                <span className="vance-badge muted" style={{ fontSize: '9.5px', padding: '2px 7px', lineHeight: 1.2 }}>
                  6 contratos
                </span>
              </div>
              <div className="tnum" style={{ fontSize: '13px', color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                18/07/2026 · R$ 1.200,00
              </div>
            </div>
          </div>

          {/* Tile 2: Linhas de Cobrança */}
          <div
            className="vance-cascade-item delay-3"
            style={{
              backgroundColor: 'var(--bg-surface)',
              padding: '12px 14px',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              minWidth: 0,
            }}
          >
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-card)',
                display: 'grid',
                placeItems: 'center',
                color: 'var(--text-main)',
                flexShrink: 0,
              }}
            >
              <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>
                Linhas Operacionais
              </div>
              <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-main)', whiteSpace: 'nowrap' }}>
                SP 001 & 002 (GA • JU)
              </div>
            </div>
          </div>

          {/* Tile 3: Pendências KYC */}
          <Link
            href="/solicitacoes"
            className="vance-cascade-item delay-4"
            style={{
              backgroundColor: 'var(--bg-surface)',
              padding: '12px 14px',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              textDecoration: 'none',
              minWidth: 0,
            }}
          >
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-card)',
                display: 'grid',
                placeItems: 'center',
                color: 'var(--text-main)',
                flexShrink: 0,
              }}
            >
              <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>
                Fila KYC
              </div>
              <div className="tnum" style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-main)', whiteSpace: 'nowrap' }}>
                3 pendentes
              </div>
            </div>
          </Link>

          {/* Tile 4: Volume Liquidado Hoje */}
          <div
            className="vance-cascade-item delay-5"
            style={{
              backgroundColor: 'var(--bg-surface)',
              padding: '12px 14px',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              minWidth: 0,
            }}
          >
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-green-bg)',
                display: 'grid',
                placeItems: 'center',
                color: 'var(--accent-green)',
                flexShrink: 0,
              }}
            >
              <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>
                Liquidado Hoje
              </div>
              <div className="tnum" style={{ fontSize: '13px', fontWeight: 500, color: 'var(--accent-green)', whiteSpace: 'nowrap' }}>
                R$ 1.850,00
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
           2. DUAL GRID 1: FILA KYC & SOLICITAÇÕES + FLUXO DE CAIXA DIÁRIO
           ==================================================================== */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        
        {/* CHECKLIST / KYC CARD */}
        <div className="vance-card vance-cascade-item delay-6" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <h2 style={{ fontSize: '16px', margin: 0, fontWeight: 600 }}>Fila KYC</h2>
            </div>
            
            {/* Filter Tabs */}
            <div style={{ display: 'flex', backgroundColor: 'var(--bg-surface)', padding: '2px', borderRadius: 'var(--radius-pill)', gap: '2px' }}>
              <button
                onClick={() => setKycTab('all')}
                style={{
                  padding: '3px 9px',
                  borderRadius: 'var(--radius-pill)',
                  border: 'none',
                  fontSize: '11px',
                  cursor: 'pointer',
                  backgroundColor: kycTab === 'all' ? 'var(--text-main)' : 'transparent',
                  color: kycTab === 'all' ? 'var(--text-inv)' : 'var(--text-muted)',
                }}
              >
                Todas (4)
              </button>
              <button
                onClick={() => setKycTab('pending')}
                style={{
                  padding: '3px 9px',
                  borderRadius: 'var(--radius-pill)',
                  border: 'none',
                  fontSize: '11px',
                  cursor: 'pointer',
                  backgroundColor: kycTab === 'pending' ? 'var(--text-main)' : 'transparent',
                  color: kycTab === 'pending' ? 'var(--text-inv)' : 'var(--text-muted)',
                }}
              >
                Pendentes (3)
              </button>
              <button
                onClick={() => setKycTab('approved')}
                style={{
                  padding: '3px 9px',
                  borderRadius: 'var(--radius-pill)',
                  border: 'none',
                  fontSize: '11px',
                  cursor: 'pointer',
                  backgroundColor: kycTab === 'approved' ? 'var(--text-main)' : 'transparent',
                  color: kycTab === 'approved' ? 'var(--text-inv)' : 'var(--text-muted)',
                }}
              >
                Aprovadas (1)
              </button>
            </div>
          </div>

          {/* Compact Item List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {filteredKyc.map((item) => (
              <Link
                key={item.id}
                href="/solicitacao-detalhe"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderRadius: '14px',
                  padding: '11px 14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  textDecoration: 'none',
                  transition: 'transform var(--transition-fast)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: item.status === 'approved' ? 'var(--accent-green-bg)' : 'var(--bg-card)',
                      color: item.status === 'approved' ? 'var(--accent-green)' : 'var(--text-main)',
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: '11px',
                      fontWeight: 500,
                      flexShrink: 0,
                    }}
                  >
                    {item.initials}
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-main)' }}>{item.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>
                      Score {item.score}% • {item.time}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="tnum" style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-main)' }}>
                    R$ {item.amount.toFixed(2).replace('.', ',')}
                  </span>
                  {item.status === 'approved' ? (
                    <span className="vance-badge green" style={{ fontSize: '10px' }}>Aprovado</span>
                  ) : item.status === 'in_review' ? (
                    <span className="vance-badge" style={{ fontSize: '10px' }}>Em análise</span>
                  ) : (
                    <span className="vance-badge" style={{ fontSize: '10px' }}>Pendente</span>
                  )}
                  <svg className="icon-svg icon-xs" style={{ color: 'var(--text-subtle)' }} viewBox="0 0 24 24">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '4px' }}>
            <Link
              href="/solicitacoes"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                fontSize: '12px',
                color: 'var(--text-muted)',
                textDecoration: 'none',
                padding: '6px',
              }}
            >
              <span>Ver todas as solicitações</span>
              <svg className="icon-svg icon-xs" viewBox="0 0 24 24">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Link>
          </div>
        </div>

        {/* FLUXO DE CAIXA DIÁRIO COM CURVA VERDE */}
        <div className="vance-card vance-cascade-item delay-7" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
              <h2 style={{ fontSize: '16px', margin: 0, fontWeight: 600 }}>Fluxo de Caixa</h2>
            </div>
            <div
              style={{
                display: 'flex',
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-pill)',
                padding: '2px',
              }}
            >
              <button
                onClick={() => setTimeframe('7d')}
                style={{
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-pill)',
                  border: 'none',
                  fontSize: '11px',
                  cursor: 'pointer',
                  backgroundColor: timeframe === '7d' ? 'var(--text-main)' : 'transparent',
                  color: timeframe === '7d' ? 'var(--text-inv)' : 'var(--text-muted)',
                }}
              >
                7d
              </button>
              <button
                onClick={() => setTimeframe('14d')}
                style={{
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-pill)',
                  border: 'none',
                  fontSize: '11px',
                  cursor: 'pointer',
                  backgroundColor: timeframe === '14d' ? 'var(--text-main)' : 'transparent',
                  color: timeframe === '14d' ? 'var(--text-inv)' : 'var(--text-muted)',
                }}
              >
                14d
              </button>
              <button
                onClick={() => setTimeframe('30d')}
                style={{
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-pill)',
                  border: 'none',
                  fontSize: '11px',
                  cursor: 'pointer',
                  backgroundColor: timeframe === '30d' ? 'var(--text-main)' : 'transparent',
                  color: timeframe === '30d' ? 'var(--text-inv)' : 'var(--text-muted)',
                }}
              >
                30d
              </button>
            </div>
          </div>

          {/* Card de Liquidação Pix Animado com Feixe de Luz Verde */}
          <PixTransferCard
            title="Última Liquidação Pix"
            amount="R$ 4.250"
            cents=",00"
            time="Hoje, 16:42"
            senderName="RCEM B2B"
            receiverName="Parceiro SP-01"
            receiverBadge="P"
          />

          {/* SVG Area Chart com Curva Verde Suave */}
          <div style={{ height: '94px', width: '100%', position: 'relative' }}>
            <svg viewBox="0 0 720 120" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
              <defs>
                <linearGradient id="vanceCashGradGreen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent-green)" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="var(--accent-green)" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M0,70 L24.8,55 L49.7,75 L74.5,90 L99.3,65 L124.1,38 L149,50 L173.8,60 L198.6,45 L223.4,70 L248.3,85 L273.1,48 L297.9,28 L322.8,42 L347.6,55 L372.4,38 L397.2,65 L422.1,80 L446.9,40 L471.7,18 L496.6,34 L521.4,45 L546.2,26 L571,58 L595.9,75 L620.7,42 L645.5,12 L670.3,26 L695.2,38 L720,18 L720,120 L0,120 Z"
                fill="url(#vanceCashGradGreen)"
              />
              <path
                d="M0,70 L24.8,55 L49.7,75 L74.5,90 L99.3,65 L124.1,38 L149,50 L173.8,60 L198.6,45 L223.4,70 L248.3,85 L273.1,48 L297.9,28 L322.8,42 L347.6,55 L372.4,38 L397.2,65 L422.1,80 L446.9,40 L471.7,18 L496.6,34 L521.4,45 L546.2,26 L571,58 L595.9,75 L620.7,42 L645.5,12 L670.3,26 L695.2,38 L720,18"
                fill="none"
                stroke="var(--accent-green)"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="720" cy="18" r="3.5" fill="var(--accent-green)" />
            </svg>
          </div>

          {/* Daily metrics split */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
            <div style={{ backgroundColor: 'var(--bg-surface)', padding: '8px 10px', borderRadius: '12px' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-subtle)' }}>Hoje</div>
              <div className="tnum" style={{ fontSize: '12.5px', fontWeight: 500, color: 'var(--text-main)', marginTop: '2px' }}>R$ 850</div>
            </div>
            <div style={{ backgroundColor: 'var(--bg-surface)', padding: '8px 10px', borderRadius: '12px' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-subtle)' }}>Amanhã</div>
              <div className="tnum" style={{ fontSize: '12.5px', fontWeight: 500, color: 'var(--text-main)', marginTop: '2px' }}>R$ 1.100</div>
            </div>
            <div style={{ backgroundColor: 'var(--bg-surface)', padding: '8px 10px', borderRadius: '12px' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-subtle)' }}>Média</div>
              <div className="tnum" style={{ fontSize: '12.5px', fontWeight: 500, color: 'var(--text-main)', marginTop: '2px' }}>R$ 607</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: 'auto' }}>
            <Link
              href="/financeiro/recebimentos"
              className="vance-btn primary sm"
              style={{ textAlign: 'center', justifyContent: 'center', gap: '6px' }}
            >
              <svg className="icon-svg icon-xs" viewBox="0 0 24 24">
                <path d="M12 19V5" />
                <path d="m5 12 7-7 7 7" />
              </svg>
              <span>Entradas</span>
            </Link>

            <Link
              href="/financeiro/repasses"
              className="vance-btn sm"
              style={{ textAlign: 'center', justifyContent: 'center', gap: '6px' }}
            >
              <svg className="icon-svg icon-xs" viewBox="0 0 24 24">
                <path d="M12 5v14" />
                <path d="m19 12-7 7-7-7" />
              </svg>
              <span>Saídas</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ====================================================================
           3. DUAL GRID 2: RESUMO FINANCEIRO DA CARTEIRA + GESTÃO DE ATRASADOS
           ==================================================================== */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        
        {/* RESUMO FINANCEIRO DA CARTEIRA */}
        <div className="vance-card vance-cascade-item delay-8" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <line x1="2" x2="22" y1="10" y2="10" />
              </svg>
              <h2 style={{ fontSize: '16px', margin: 0, fontWeight: 600 }}>Resumo da Carteira</h2>
            </div>
            <Link href="/financeiro/recebimentos" style={{ color: 'var(--text-muted)', fontSize: '12px', textDecoration: 'none' }}>
              Extrato →
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div style={{ backgroundColor: 'var(--bg-surface)', padding: '12px 14px', borderRadius: '14px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Investido</div>
              <div className="tnum" style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-main)', marginTop: '2px' }}>
                R$ 17.450,00
              </div>
            </div>
            <div style={{ backgroundColor: 'var(--bg-surface)', padding: '12px 14px', borderRadius: '14px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Em Aberto</div>
              <div className="tnum" style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-main)', marginTop: '2px' }}>
                R$ 12.850,00
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div style={{ backgroundColor: 'var(--bg-surface)', padding: '12px 14px', borderRadius: '14px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Retorno Projetado</div>
              <div className="tnum" style={{ fontSize: '16px', fontWeight: 600, color: 'var(--accent-green)', marginTop: '2px' }}>
                R$ 3.800,00
              </div>
            </div>
            <div style={{ backgroundColor: 'var(--bg-surface)', padding: '12px 14px', borderRadius: '14px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Em Atraso</div>
              <div className="tnum" style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-main)', marginTop: '2px' }}>
                R$ 600,00
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--bg-surface)', padding: '10px 14px', borderRadius: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
              <span style={{ color: 'var(--text-subtle)' }}>Composição</span>
              <span className="tnum" style={{ color: 'var(--text-main)' }}>96,6% Regular • 3,4% Atraso</span>
            </div>
            <div style={{ height: '5px', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-pill)', overflow: 'hidden', display: 'flex' }}>
              <div style={{ height: '100%', width: '96.6%', backgroundColor: 'var(--accent-green)' }} />
              <div style={{ height: '100%', width: '3.4%', backgroundColor: 'var(--text-main)' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginTop: 'auto' }}>
            <Link href="/financeiro/recebimentos" className="vance-btn primary sm" style={{ textAlign: 'center', justifyContent: 'center' }}>
              Recebimentos
            </Link>
            <Link href="/financeiro/atrasados" className="vance-btn sm" style={{ textAlign: 'center', justifyContent: 'center' }}>
              Atrasados
            </Link>
            <Link href="/relatorios/linhas" className="vance-btn sm" style={{ textAlign: 'center', justifyContent: 'center' }}>
              Relatórios
            </Link>
          </div>
        </div>

        {/* EMPRÉSTIMOS EM ATRASO (MONOCROMÁTICO COM ACENTO VERDE) */}
        <div className="vance-card vance-cascade-item delay-9" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <h2 style={{ fontSize: '16px', margin: 0, fontWeight: 600 }}>Empréstimos em Atraso (3)</h2>
            </div>
            <Link href="/financeiro/atrasados" style={{ color: 'var(--text-muted)', fontSize: '12px', textDecoration: 'none' }}>
              Ver todos →
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {OVERDUE_DATA.map((client) => (
              <div
                key={client.id}
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderRadius: '14px',
                  padding: '10px 14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--bg-card)',
                      color: 'var(--text-main)',
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: '11px',
                      fontWeight: 500,
                      flexShrink: 0,
                    }}
                  >
                    {client.initials}
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-main)' }}>{client.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      {client.daysLate}d atraso • Venc. {client.dueDate}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className="tnum" style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-main)' }}>
                    R$ {client.amount.toFixed(2).replace('.', ',')}
                  </span>
                  <button
                    className="vance-btn sm"
                    style={{ padding: '4px 10px', fontSize: '11px' }}
                    onClick={() => setChargeModalClient(client)}
                  >
                    Cobrar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ====================================================================
           4. OPERATIONAL HIGHLIGHTS / LINHAS DE COBRANÇA EM TEMPO REAL
           ==================================================================== */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        
        {/* Linha SP 001 */}
        <div className="vance-card vance-cascade-item delay-10" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-surface)',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: '11px',
                  color: 'var(--text-main)',
                }}
              >
                GA
              </div>
              <h3 style={{ fontSize: '14px', margin: 0, fontWeight: 600 }}>SP 001 — Gabriel</h3>
            </div>
            <span className="vance-badge green" style={{ fontSize: '10px' }}>97,7% em dia</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)' }}>
            <span>44 contratos</span>
            <span className="tnum" style={{ color: 'var(--text-main)', fontWeight: 500 }}>R$ 8.900,00</span>
          </div>

          <div style={{ height: '4px', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-pill)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '97.7%', backgroundColor: 'var(--accent-green)', borderRadius: 'var(--radius-pill)' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-subtle)' }}>
            <span>1 em atraso</span>
            <Link href="/relatorios/linhas" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Detalhes →</Link>
          </div>
        </div>

        {/* Linha SP 002 */}
        <div className="vance-card vance-cascade-item delay-10" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-surface)',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: '11px',
                  color: 'var(--text-main)',
                }}
              >
                JU
              </div>
              <h3 style={{ fontSize: '14px', margin: 0, fontWeight: 600 }}>SP 002 — Juliano</h3>
            </div>
            <span className="vance-badge green" style={{ fontSize: '10px' }}>95,5% em dia</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)' }}>
            <span>44 contratos</span>
            <span className="tnum" style={{ color: 'var(--text-main)', fontWeight: 500 }}>R$ 8.550,00</span>
          </div>

          <div style={{ height: '4px', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-pill)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '95.5%', backgroundColor: 'var(--accent-green)', borderRadius: 'var(--radius-pill)' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-subtle)' }}>
            <span>2 em atraso</span>
            <Link href="/relatorios/linhas" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Detalhes →</Link>
          </div>
        </div>

        {/* Retenção & Reempréstimos */}
        <div className="vance-card vance-cascade-item delay-10" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
              <h3 style={{ fontSize: '14px', margin: 0, fontWeight: 600 }}>Renovações</h3>
            </div>
            <span className="vance-badge green" style={{ fontSize: '10px' }}>82%</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)' }}>
            <span>Clientes reincidentes</span>
            <span className="tnum" style={{ color: 'var(--text-main)', fontWeight: 500 }}>36 de 44</span>
          </div>

          <div style={{ height: '4px', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-pill)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '82%', backgroundColor: 'var(--accent-green)', borderRadius: 'var(--radius-pill)' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-subtle)' }}>
            <span>Alta fidelidade</span>
            <Link href="/clientes" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Clientes →</Link>
          </div>
        </div>
      </div>

      {/* ====================================================================
           5. INTERACTIVE WHATSAPP COBRANÇA MODAL (APPLE MINIMALIST)
           ==================================================================== */}
      {chargeModalClient && (
        <div
          className="vance-modal-backdrop open"
          onClick={() => setChargeModalClient(null)}
        >
          <div
            className="vance-modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
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
                    fontSize: '12px',
                  }}
                >
                  {chargeModalClient.initials}
                </div>
                <div>
                  <h3 style={{ fontSize: '15px', margin: 0 }}>Disparo de Cobrança</h3>
                  <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>
                    {chargeModalClient.name} • {chargeModalClient.contract}
                  </div>
                </div>
              </div>
              <button
                className="vance-icon-btn"
                style={{ width: '28px', height: '28px' }}
                onClick={() => setChargeModalClient(null)}
              >
                <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div style={{ backgroundColor: 'var(--bg-card)', padding: '12px 16px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Valor em Atraso:</span>
                <span className="tnum" style={{ color: 'var(--text-main)' }}>
                  R$ {chargeModalClient.amount.toFixed(2).replace('.', ',')}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Vencimento Original:</span>
                <span style={{ color: 'var(--text-main)' }}>{chargeModalClient.dueDate} ({chargeModalClient.daysLate} dias)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Linha / Cobrador:</span>
                <span style={{ color: 'var(--text-main)' }}>{chargeModalClient.collector}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Mensagem WhatsApp Gerada:</label>
              <textarea
                readOnly
                className="vance-textarea"
                style={{
                  fontSize: '12px',
                  minHeight: '110px',
                  backgroundColor: 'var(--bg-card)',
                  lineHeight: 1.45,
                }}
                value={`Olá ${chargeModalClient.name}, tudo bem? Aqui é da equipe financeira RCEM. Constatamos que a parcela no valor de R$ ${chargeModalClient.amount.toFixed(2).replace('.', ',')} com vencimento em ${chargeModalClient.dueDate} (Contrato ${chargeModalClient.contract}) está pendente de confirmação. Segue chave PIX para regularização: financeiro@rcem.com.br. Qualquer dúvida estamos à disposição!`}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <button
                className="vance-btn"
                style={{ flex: 1 }}
                onClick={() => handleCopyMessage(chargeModalClient)}
              >
                {copiedMessage ? 'Copiado!' : 'Copiar Texto'}
              </button>
              <button
                className="vance-btn primary"
                style={{ flex: 1.2 }}
                onClick={() => {
                  const text = encodeURIComponent(
                    `Olá ${chargeModalClient.name}, tudo bem? Aqui é da equipe financeira RCEM. Constatamos que a parcela no valor de R$ ${chargeModalClient.amount.toFixed(2).replace('.', ',')} com vencimento em ${chargeModalClient.dueDate} (Contrato ${chargeModalClient.contract}) está pendente de confirmação. Segue chave PIX para regularização: financeiro@rcem.com.br.`
                  );
                  window.open(`https://wa.me/55${chargeModalClient.phone}?text=${text}`, '_blank');
                  setChargeModalClient(null);
                }}
              >
                Abrir WhatsApp Web
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
