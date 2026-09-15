'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { RcemWordmark, RcemMark } from '@/components/ui/RcemLogo';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({ collapsed, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [sidebarMode, setSidebarMode] = useState<'modulos' | 'status'>('modulos');
  const [search, setSearch] = useState('');

  const isActive = (path: string) => {
    if (path === '/dashboard') return pathname === '/dashboard' || pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <>
      {/* 1. LEFTMOST ICON RAIL (56px) */}
      <aside className="kb-rail" id="appRail">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, width: '100%' }}>
          {/* REAL RCEM LOGO MARK */}
          <Link href="/dashboard" className="kb-rail-logo" title="RCEM — Início">
            <RcemMark size={36} bgColor="var(--bg-surface)" color="var(--accent-green)" />
          </Link>

          {/* TOGGLE SIDEBAR BUTTON */}
          <button
            className="kb-rail-item"
            id="btnToggleSidebar"
            onClick={onToggleCollapse}
            title={collapsed ? 'Expandir Menu' : 'Recolher Menu'}
          >
            <svg className="icon-svg" viewBox="0 0 24 24">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M9 3v18" />
            </svg>
          </button>

          {/* TOP SHORTCUTS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%', alignItems: 'center', marginTop: 4 }}>
            <Link
              href="/dashboard"
              className={`kb-rail-item ${isActive('/dashboard') ? 'active' : ''}`}
              title="Dashboard"
            >
              <svg className="icon-svg" viewBox="0 0 24 24">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </Link>

            <Link
              href="/solicitacoes"
              className={`kb-rail-item ${isActive('/solicitacoes') ? 'active' : ''}`}
              title="Solicitações"
            >
              <svg className="icon-svg" viewBox="0 0 24 24">
                <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
              </svg>
            </Link>

            <Link
              href="/clientes"
              className={`kb-rail-item ${isActive('/clientes') ? 'active' : ''}`}
              title="Clientes"
            >
              <svg className="icon-svg" viewBox="0 0 24 24">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </Link>

            <Link
              href="/financeiro/recebimentos"
              className={`kb-rail-item ${isActive('/financeiro') ? 'active' : ''}`}
              title="Financeiro"
            >
              <svg className="icon-svg" viewBox="0 0 24 24">
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <line x1="2" x2="22" y1="10" y2="10" />
              </svg>
            </Link>

            <Link
              href="/relatorios/linhas"
              className={`kb-rail-item ${isActive('/relatorios') ? 'active' : ''}`}
              title="Relatórios"
            >
              <svg className="icon-svg" viewBox="0 0 24 24">
                <path d="M3 3v18h18" />
                <path d="m19 9-5 5-4-4-3 3" />
              </svg>
            </Link>

            <Link
              href="/configuracoes/ofertas"
              className={`kb-rail-item ${isActive('/configuracoes') ? 'active' : ''}`}
              title="Configurações"
            >
              <svg className="icon-svg" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </Link>
          </div>
        </div>
      </aside>

      {/* 2. SECONDARY SIDEBAR TREE VIEW (256px) */}
      <aside className={`kb-sidebar-tree ${collapsed ? 'collapsed' : ''}`} id="appSidebar">
        {/* HEADER WITH REAL RCEM LOGO */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px' }}>
          <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'var(--accent-green)' }}>
            <RcemWordmark height={26} color="var(--accent-green)" />
          </Link>
          <button
            className="vance-icon-btn"
            style={{ width: 28, height: 28 }}
            onClick={onToggleCollapse}
            title="Recolher Menu"
          >
            <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
        </div>

        {/* SEARCH INPUT */}
        <div style={{ position: 'relative' }}>
          <svg
            className="icon-svg icon-sm"
            style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)' }}
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            className="vance-input"
            placeholder="Buscar no sistema..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: 34, fontSize: 12 }}
          />
        </div>

        {/* TAB SWITCHER: MÓDULOS | STATUS */}
        <div style={{ display: 'flex', backgroundColor: 'var(--bg-active-pill)', padding: 3, borderRadius: 'var(--radius-pill)' }}>
          <button
            onClick={() => setSidebarMode('modulos')}
            style={{
              flex: 1,
              padding: '6px 10px',
              fontSize: 12,
              border: 'none',
              borderRadius: 'var(--radius-pill)',
              cursor: 'pointer',
              fontWeight: 500,
              backgroundColor: sidebarMode === 'modulos' ? 'var(--bg-surface)' : 'transparent',
              color: sidebarMode === 'modulos' ? 'var(--text-main)' : 'var(--text-muted)',
              transition: 'all 0.15s ease',
            }}
          >
            Módulos
          </button>
          <button
            onClick={() => setSidebarMode('status')}
            style={{
              flex: 1,
              padding: '6px 10px',
              fontSize: 12,
              border: 'none',
              borderRadius: 'var(--radius-pill)',
              cursor: 'pointer',
              fontWeight: 500,
              backgroundColor: sidebarMode === 'status' ? 'var(--bg-surface)' : 'transparent',
              color: sidebarMode === 'status' ? 'var(--text-main)' : 'var(--text-muted)',
              transition: 'all 0.15s ease',
            }}
          >
            Status
          </button>
        </div>

        {sidebarMode === 'modulos' ? (
          <div id="sidebarTreeContainer" style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* PRINCIPAL */}
            <div className="kb-tree-node" style={{ cursor: 'default' }}>
              <div className="kb-node-left">
                <svg className="icon-svg icon-sm" style={{ color: 'var(--text-muted)' }} viewBox="0 0 24 24">
                  <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
                </svg>
                <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Navegação Principal</span>
              </div>
            </div>

            <div className="kb-sub-tree">
              <Link
                href="/dashboard"
                className={`kb-tree-node ${isActive('/dashboard') ? 'selected' : ''}`}
              >
                <div className="kb-node-left">
                  <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  <span>Dashboard</span>
                </div>
              </Link>

              <Link
                href="/solicitacoes"
                className={`kb-tree-node ${isActive('/solicitacoes') ? 'selected' : ''}`}
              >
                <div className="kb-node-left">
                  <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
                    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                    <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
                  </svg>
                  <span>Solicitações</span>
                </div>
                <span className="kb-badge green">4</span>
              </Link>

              <Link
                href="/clientes"
                className={`kb-tree-node ${isActive('/clientes') ? 'selected' : ''}`}
              >
                <div className="kb-node-left">
                  <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                  </svg>
                  <span>Clientes</span>
                </div>
                <span className="kb-badge">44</span>
              </Link>

              <Link
                href="/lista-negra"
                className={`kb-tree-node ${isActive('/lista-negra') ? 'selected' : ''}`}
              >
                <div className="kb-node-left">
                  <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" />
                    <path d="m5.6 5.6 12.8 12.8" />
                  </svg>
                  <span>Lista Negra</span>
                </div>
              </Link>
            </div>

            {/* FINANCEIRO */}
            <div className="kb-tree-node" style={{ cursor: 'default', marginTop: 10 }}>
              <div className="kb-node-left">
                <svg className="icon-svg icon-sm" style={{ color: 'var(--text-muted)' }} viewBox="0 0 24 24">
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" x2="22" y1="10" y2="10" />
                </svg>
                <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Financeiro</span>
              </div>
            </div>

            <div className="kb-sub-tree">
              <Link
                href="/financeiro/recebimentos"
                className={`kb-tree-node ${pathname === '/financeiro/recebimentos' ? 'selected' : ''}`}
              >
                <div className="kb-node-left">
                  <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
                    <path d="M22 12h-6l-2 3h-4l-2-3H2" />
                  </svg>
                  <span>Recebimentos</span>
                </div>
              </Link>

              <Link
                href="/financeiro/no-prazo"
                className={`kb-tree-node ${pathname === '/financeiro/no-prazo' ? 'selected' : ''}`}
              >
                <div className="kb-node-left">
                  <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>No prazo</span>
                </div>
              </Link>

              <Link
                href="/financeiro/atrasados"
                className={`kb-tree-node ${pathname === '/financeiro/atrasados' ? 'selected' : ''}`}
              >
                <div className="kb-node-left">
                  <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
                    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  </svg>
                  <span>Atrasados</span>
                </div>
                <span className="kb-badge warn">22</span>
              </Link>

              <Link
                href="/financeiro/pagos"
                className={`kb-tree-node ${pathname === '/financeiro/pagos' ? 'selected' : ''}`}
              >
                <div className="kb-node-left">
                  <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
                    <circle cx="8" cy="8" r="5" />
                  </svg>
                  <span>Pagos</span>
                </div>
              </Link>

              <Link
                href="/financeiro/repasses"
                className={`kb-tree-node ${pathname === '/financeiro/repasses' ? 'selected' : ''}`}
              >
                <div className="kb-node-left">
                  <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
                    <path d="m22 2-7 20-4-9-9-4Z" />
                  </svg>
                  <span>Repasses</span>
                </div>
              </Link>
            </div>

            {/* RELATÓRIOS */}
            <div className="kb-tree-node" style={{ cursor: 'default', marginTop: 10 }}>
              <div className="kb-node-left">
                <svg className="icon-svg icon-sm" style={{ color: 'var(--text-muted)' }} viewBox="0 0 24 24">
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                </svg>
                <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Relatórios</span>
              </div>
            </div>

            <div className="kb-sub-tree">
              <Link
                href="/relatorios/linhas"
                className={`kb-tree-node ${pathname === '/relatorios/linhas' ? 'selected' : ''}`}
              >
                <div className="kb-node-left">
                  <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
                    <path d="M3 12h4l3 8 4-16 3 8h4" />
                  </svg>
                  <span>Linhas de Cobrança</span>
                </div>
              </Link>

              <Link
                href="/relatorios/analistas"
                className={`kb-tree-node ${pathname === '/relatorios/analistas' ? 'selected' : ''}`}
              >
                <div className="kb-node-left">
                  <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                  </svg>
                  <span>Analistas</span>
                </div>
              </Link>

              <Link
                href="/relatorios/cobradores"
                className={`kb-tree-node ${pathname === '/relatorios/cobradores' ? 'selected' : ''}`}
              >
                <div className="kb-node-left">
                  <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  <span>Cobradores</span>
                </div>
              </Link>
            </div>

            {/* CONFIGURAÇÕES */}
            <div className="kb-tree-node" style={{ cursor: 'default', marginTop: 10 }}>
              <div className="kb-node-left">
                <svg className="icon-svg icon-sm" style={{ color: 'var(--text-muted)' }} viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Configurações</span>
              </div>
            </div>

            <div className="kb-sub-tree">
              <Link
                href="/configuracoes/ofertas"
                className={`kb-tree-node ${pathname === '/configuracoes/ofertas' ? 'selected' : ''}`}
              >
                <div className="kb-node-left">
                  <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
                    <path d="M20.59 13.41 13.42 20.6a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                  </svg>
                  <span>Ofertas</span>
                </div>
              </Link>

              <Link
                href="/configuracoes/mensagens"
                className={`kb-tree-node ${pathname === '/configuracoes/mensagens' ? 'selected' : ''}`}
              >
                <div className="kb-node-left">
                  <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <span>Mensagens</span>
                </div>
              </Link>

              <Link
                href="/configuracoes/sms"
                className={`kb-tree-node ${pathname === '/configuracoes/sms' ? 'selected' : ''}`}
              >
                <div className="kb-node-left">
                  <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
                    <path d="M8 12h.01M12 12h.01M16 12h.01" />
                  </svg>
                  <span>SMS</span>
                </div>
              </Link>

              <Link
                href="/configuracoes/empresa"
                className={`kb-tree-node ${pathname === '/configuracoes/empresa' ? 'selected' : ''}`}
              >
                <div className="kb-node-left">
                  <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
                    <rect x="4" y="2" width="16" height="20" rx="2" />
                  </svg>
                  <span>Empresa</span>
                </div>
              </Link>

              <Link
                href="/configuracoes/linhas"
                className={`kb-tree-node ${pathname === '/configuracoes/linhas' ? 'selected' : ''}`}
              >
                <div className="kb-node-left">
                  <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
                    <path d="M3 12h4l3 8 4-16 3 8h4" />
                  </svg>
                  <span>Linhas</span>
                </div>
              </Link>

              <Link
                href="/configuracoes/equipe"
                className={`kb-tree-node ${pathname === '/configuracoes/equipe' ? 'selected' : ''}`}
              >
                <div className="kb-node-left">
                  <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  </svg>
                  <span>Equipe</span>
                </div>
              </Link>
            </div>
          </div>
        ) : (
          /* STATUS ATALHOS PANEL (ALTERNATIVE TAB AS IN REFERENCE) */
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 11, color: 'var(--text-subtle)', padding: '0 4px' }}>Resumo Operacional</div>

            <Link
              href="/dashboard"
              style={{ backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', padding: '10px 12px', textDecoration: 'none', border: '1px solid var(--border-subtle)', display: 'block' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--text-main)' }}>Saúde da Carteira</span>
                <span className="vance-badge green" style={{ fontSize: 9.5, padding: '2px 6px' }}>92.6% OK</span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>Inadimplência sob controle</div>
            </Link>

            <Link
              href="/solicitacoes"
              style={{ backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', padding: '10px 12px', textDecoration: 'none', border: '1px solid var(--border-subtle)', display: 'block' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--text-main)' }}>Fila de KYC</span>
                <span className="vance-badge green" style={{ fontSize: 9.5, padding: '2px 6px' }}>4 pendentes</span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>Tempo médio: 3,2h</div>
            </Link>

            <Link
              href="/financeiro/atrasados"
              style={{ backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', padding: '10px 12px', textDecoration: 'none', border: '1px solid var(--border-subtle)', display: 'block' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--text-main)' }}>Cobrança Ativa</span>
                <span className="vance-badge warn" style={{ fontSize: 9.5, padding: '2px 6px' }}>22 atrasos</span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>R$ 35.200 em cobrança</div>
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
