'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useFilters } from '@/context/FilterContext';

interface TopbarProps {
  onToggleSidebar?: () => void;
}

const ROUTE_NAMES: { [key: string]: { section: string; title: string } } = {
  '/dashboard': { section: 'Principal', title: 'Dashboard Geral' },
  '/solicitacoes': { section: 'Principal', title: 'Fila de Solicitações' },
  '/solicitacao-detalhe': { section: 'Solicitações', title: 'Detalhe da Proposta' },
  '/clientes': { section: 'Principal', title: 'Base de Clientes' },
  '/clientes/novo': { section: 'Clientes', title: 'Novo Cadastro' },
  '/lista-negra': { section: 'Principal', title: 'Lista Negra' },
  '/financeiro/recebimentos': { section: 'Financeiro', title: 'Recebimentos do Mês' },
  '/financeiro/no-prazo': { section: 'Financeiro', title: 'Recebimentos no Prazo' },
  '/financeiro/atrasados': { section: 'Financeiro', title: 'Recebimentos em Atraso' },
  '/financeiro/pagos': { section: 'Financeiro', title: 'Empréstimos Quitados' },
  '/financeiro/repasses': { section: 'Financeiro', title: 'Repasses PIX' },
  '/detalhes-financeiros': { section: 'Financeiro', title: 'Extrato do Cliente' },
  '/relatorios/linhas': { section: 'Relatórios', title: 'Desempenho por Linha' },
  '/relatorios/analistas': { section: 'Relatórios', title: 'Desempenho de Analistas' },
  '/relatorios/cobradores': { section: 'Relatórios', title: 'Ranking de Cobradores' },
  '/configuracoes/ofertas': { section: 'Configurações', title: 'Ofertas & Tiers' },
  '/configuracoes/mensagens': { section: 'Configurações', title: 'Templates de Mensagem' },
  '/configuracoes/sms': { section: 'Configurações', title: 'Configurações de SMS' },
  '/configuracoes/empresa': { section: 'Configurações', title: 'Dados da Empresa' },
  '/configuracoes/linhas': { section: 'Configurações', title: 'Linhas de Cobrança' },
  '/configuracoes/equipe': { section: 'Configurações', title: 'Gestão de Equipe' },
};

export function Topbar({ onToggleSidebar }: TopbarProps) {
  const pathname = usePathname();
  const { selectedMonth, setSelectedMonth } = useFilters();
  const [notifOpen, setNotifOpen] = useState(false);

  const routeInfo = ROUTE_NAMES[pathname] || { section: 'RCEM', title: 'Painel Administrativo' };

  return (
    <header
      className="animate-fade-in kb-topbar-header"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 16,
        marginBottom: 20,
        gap: 16,
        flexWrap: 'wrap',
        position: 'relative',
        zIndex: 100,
      }}
    >
      {/* Left: Breadcrumbs & Toggle */}
      <div className="kb-topbar-left" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button
          className="vance-icon-btn"
          style={{ width: 36, height: 36 }}
          onClick={onToggleSidebar}
          title="Menu de navegação"
        >
          <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-muted)' }}>
            {routeInfo.section}
          </span>
          <span style={{ fontSize: 12, color: 'var(--text-subtle)' }}>/</span>
          <span className="kb-badge" style={{ fontSize: 12, maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {routeInfo.title}
          </span>
        </div>
      </div>

      {/* Right: Actions, Notifications & User Profile */}
      <div className="kb-topbar-right" style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        {/* Month Filter Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, backgroundColor: 'var(--bg-card)', padding: '4px 12px', borderRadius: 'var(--radius-pill)' }}>
          <svg className="icon-svg icon-xs" style={{ color: 'var(--text-muted)' }} viewBox="0 0 24 24">
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
          </svg>
          <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-main)' }}>{selectedMonth}</span>
        </div>

        {/* Quick Action Button */}
        <Link href="/clientes/novo" className="vance-btn primary sm" style={{ padding: '6px 14px' }}>
          <svg className="icon-svg icon-xs" viewBox="0 0 24 24">
            <line x1="12" x2="12" y1="5" y2="19" />
            <line x1="5" x2="19" y1="12" y2="12" />
          </svg>
          <span>Novo Cliente</span>
        </Link>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="vance-icon-btn"
            style={{ width: 34, height: 34, position: 'relative' }}
            title="Notificações"
          >
            <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
            <span
              style={{
                position: 'absolute',
                top: 6,
                right: 6,
                width: 7,
                height: 7,
                backgroundColor: 'var(--accent-green)',
                borderRadius: '50%',
              }}
            ></span>
          </button>

          {notifOpen && (
            <>
              {/* Invisible Click-Outside Backdrop */}
              <div
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 998,
                }}
                onClick={() => setNotifOpen(false)}
              />

              {/* Notification Popover */}
              <div
                className="vance-popover"
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 44,
                  width: 320,
                  padding: 16,
                  zIndex: 999,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>Notificações</span>
                    <span className="vance-badge green" style={{ fontSize: '10px', padding: '1px 6px' }}>2 novas</span>
                  </div>
                  <button
                    style={{ fontSize: 11, color: 'var(--text-subtle)', background: 'none', border: 'none', cursor: 'pointer' }}
                    onClick={() => setNotifOpen(false)}
                  >
                    Fechar
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <Link
                    href="/solicitacoes"
                    onClick={() => setNotifOpen(false)}
                    style={{
                      padding: 10,
                      borderRadius: '12px',
                      backgroundColor: 'var(--bg-card)',
                      borderLeft: '3px solid var(--accent-green)',
                      textDecoration: 'none',
                      display: 'block',
                    }}
                  >
                    <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-main)' }}>4 Novas Solicitações KYC</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', margin: '2px 0' }}>Cadastros aguardando validação na esteira.</div>
                    <div style={{ fontSize: 10, color: 'var(--text-subtle)' }}>10 min atrás</div>
                  </Link>

                  <Link
                    href="/financeiro/recebimentos"
                    onClick={() => setNotifOpen(false)}
                    style={{
                      padding: 10,
                      borderRadius: '12px',
                      backgroundColor: 'var(--bg-card)',
                      textDecoration: 'none',
                      display: 'block',
                    }}
                  >
                    <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-main)' }}>Entradas de hoje</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', margin: '2px 0' }}>R$ 1.850,00 liquidados via PIX automático.</div>
                    <div style={{ fontSize: 10, color: 'var(--text-subtle)' }}>1 hora atrás</div>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Profile Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: 'var(--accent-green-bg)',
              color: 'var(--accent-green)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: 500,
              border: 'none',
            }}
          >
            H
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 12, color: 'var(--text-main)', fontWeight: 500 }}>Henrique</span>
            <span style={{ fontSize: 10, color: 'var(--text-subtle)' }}>Administrador</span>
          </div>
        </div>
      </div>
    </header>
  );
}
