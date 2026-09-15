# Redesign do Front-End RCEM — Vance Studio Design System

## 1. Visão Geral da Transformação
O front-end do painel da empresa foi completamente redesenhado utilizando a linguagem visual e o design system do **`system.html` (Vance Studio / Apple-grade Minimalist)** como referência de autoridade estética.

Todas as informações de negócio, métricas, cálculos, rotas, filtros e funcionalidades existentes foram **100% preservadas**, sem adição ou remoção indevida de dados. A cor de destaque verde oficial da empresa (`#159A6A` / `--accent-green`) foi mantida como accent color principal em botões primários, badges de destaque, indicadores de regularidade e estados ativos.

---

## 2. Elementos do Design System Implementados

- **Paleta de Cores Apple-Grade:**
  - Superfícies e Cards: `--bg-surface: #FFFFFF`, `--bg-card: #F5F5F7`, `--bg-active-pill: #E8E8ED`.
  - Bordas e Separadores: `--border-subtle: rgba(0, 0, 0, 0.06)`.
  - Tipografia: `--text-main: #1D1D1F`, `--text-muted: #6E6E73`, `--text-subtle: #86868B`.
  - Accent Color da Marca: `--accent-green: #159A6A`, `--accent-green-bg: rgba(21, 154, 106, 0.10)`.
- **Tipografia:** Google Font `Inter` (`['400', '500', '600', '700']`) com suporte a numerais tabulares alinhados (`.tnum`).
- **Arquitetura de Shell:**
  - **Icon Rail de 56px (`.kb-rail`):** Ícone vetorial da marca, atalhos rápidos com estados ativos e alternador de tema claro/escuro.
  - **Sidebar de Navegação em Árvore de 256px (`.kb-sidebar-tree`):** Recolhível, com barra de busca interna, seletor "Módulos / Status" e árvore completa de rotas da empresa.
  - **Topbar Minimalista:** Breadcrumb, seletor de mês em pill, notificações e perfil do usuário.
- **Componentes do Sistema:**
  - Botões expansíveis de alta fidelidade: `.vance-getstarted-btn` e `.vance-getstarted-btn.primary`.
  - Botões circulares com micro-interação: `.vance-icon-btn`.
  - Badges e Pills: `.vance-badge`, `.vance-badge.green`, `.vance-badge.warn`, `.vance-badge.neg`.
  - Micro-tiles brancos internos: `.vance-tile`.
  - Inputs e Selects em pill: `.vance-input`, `.vance-select`.
  - Tabelas limpas: `.vance-table-wrap`, `.vance-table`.
  - Animações em cascata: `vanceCascadeUp` com delays escalonados (`.delay-1` a `.delay-10`).
  - Supressão nativa de scrollbars.

---

## 3. Páginas Redesenhadas

| Página / Módulo | Caminho | Principais Recursos Redenhados |
| :--- | :--- | :--- |
| **Dashboard Principal** | `/dashboard` | Hero Card de operação com barra de saúde da carteira (96,6% em dia), botões de ação rápida (`.vance-getstarted-btn`), grid de 4 KPIs financeiros com tendências, faixa de micro-KPIs, gráfico vetorial de fluxo de caixa diário, indicador de eficiência de linhas, fila de inadimplência e fila de análise KYC. |
| **Solicitações KYC** | `/solicitacoes` | Cards de tomador com foto/iniciais, barra de score facial biométrico, dados cadastrais em micro-tiles, badge de status (Pendente / Aprovada) e botões de ação rápida (WhatsApp / Avaliar KYC). |
| **Detalhe da Solicitação** | `/solicitacao-detalhe` e `/solicitacoes/[id]` | Visão de crédito associado, cálculo de rentabilidade e lucro acumulado, dados pessoais, biometria facial validada, endereço com mapa/geolocalização, contatos de referência e visualizador de documentos anexados (PDF / Holerite). |
| **Base de Clientes** | `/clientes` | Grid de cards com status de regularidade/bloqueio, quantidade de solicitações e empréstimos ativos, dados de contato, cobrador responsável e paginação. |
| **Novo Cliente** | `/clientes/novo` | Formulário segmentado em 4 etapas (Dados Pessoais, Contato & Chave PIX, Endereço com busca automática de CEP e 2 Contatos de Referência obrigatórios). |
| **Lista Negra** | `/lista-negra` | Tabela com motivo de bloqueio, data da restrição, badge de risco e botão de desbloqueio rápido. |
| **Módulo Financeiro** | `/financeiro/*` e `/detalhes-financeiros` | Tabela financeira unificada (`FinancialTable.tsx`) para recebimentos, atrasados, repasses e pagos, além de extrato detalhado do tomador com histórico completo de 7 ciclos de empréstimo. |
| **Relatórios de Gestão** | `/relatorios/*` | Linhas de cobrança com seletor de período, curva acumulada de recebimento vs meta, relatório de analistas com tempo médio de resposta e taxa de aprovação, ranking de cobradores e métricas de entregabilidade de mensagens via WhatsApp/SMS. |
| **Configurações** | `/configuracoes/*` | Configuração de ofertas em 3 Tiers, templates de mensagem WhatsApp com variáveis dinâmicas, controle do gateway de SMS, dados da empresa & conta receptora PIX, gestão de linhas e tabela RBAC de equipe e permissões. |

---

## 4. Resumo das Modificações Recentes

### Ajuste no Rodapé do Card de Fluxo de Caixa (`/dashboard`)
- **Problema:** O botão anterior era desproporcionalmente grande e a ação "Recebimentos" estava repetitiva em relação a outros pontos do painel.
- **Solução Implementada:** Substituição por 2 botões compactos (`.vance-btn sm`), com ícones direcionais sutis e ações reais de fluxo de caixa:
  1. **Entradas** (Acento verde $\rightarrow$ direciona para `/financeiro/recebimentos`).
  2. **Saídas** (Neutro refinado $\rightarrow$ direciona para `/financeiro/repasses`).
- **Resultado:** Proporção perfeita com o restante do card, sem repetição de termos e com navegação lógica para entradas e saídas de capital.

---

## 5. Validação & Build
O projeto foi testado e compilado com sucesso utilizando o comando `npm run build`:
- **Next.js 16.3.5 (Turbopack, TypeScript)**
- **26 rotas estáticas e dinâmicas geradas sem nenhum erro de tipagem ou compilação.**
- **Dev server ativo em `http://localhost:3000`.**
