'use client';

import React, { useState } from 'react';

interface TierConfig {
  name: string;
  badge: string;
  badgeType?: 'green' | 'muted' | 'active';
  subtitle: string;
  principal: number;
  interestAmount: number;
  interestPercent: number;
  totalDue: number;
  termDays: number;
  cyclesReq: string;
}

interface Offer {
  id: string;
  name: string;
  createdAt: string;
  active: boolean;
  tiers: TierConfig[];
}

const INITIAL_OFFERS: Offer[] = [
  {
    id: 'off-1',
    name: 'Oferta Padrão (Entrada & Progressão)',
    createdAt: '01/01/2026',
    active: true,
    tiers: [
      {
        name: 'Tier 1 (Base)',
        badge: 'Tier 1',
        badgeType: 'muted',
        subtitle: 'Novos Tomadores',
        principal: 200,
        interestAmount: 120,
        interestPercent: 60,
        totalDue: 320,
        termDays: 30,
        cyclesReq: '0 ciclos (Novo cliente)',
      },
      {
        name: 'Tier 2 (Recorrente)',
        badge: 'Tier 2',
        badgeType: 'green',
        subtitle: 'Após 3 Ciclos OK',
        principal: 350,
        interestAmount: 175,
        interestPercent: 50,
        totalDue: 525,
        termDays: 30,
        cyclesReq: '3 ciclos em dia',
      },
      {
        name: 'Tier 3 (VIP Fidelidade)',
        badge: 'Tier 3 (VIP)',
        badgeType: 'active',
        subtitle: 'Após 6 Ciclos OK',
        principal: 500,
        interestAmount: 225,
        interestPercent: 45,
        totalDue: 725,
        termDays: 30,
        cyclesReq: '6 ciclos em dia',
      },
    ],
  },
  {
    id: 'off-2',
    name: 'Oferta Especial Comerciante Local',
    createdAt: '15/05/2026',
    active: true,
    tiers: [
      {
        name: 'Tier 1 (Comércio)',
        badge: 'Comércio 1',
        badgeType: 'muted',
        subtitle: 'Novos Estabelecimentos',
        principal: 500,
        interestAmount: 250,
        interestPercent: 50,
        totalDue: 750,
        termDays: 30,
        cyclesReq: 'Ponto comercial validado',
      },
      {
        name: 'Tier 2 (Comércio VIP)',
        badge: 'Comércio 2',
        badgeType: 'green',
        subtitle: 'Giro Rápido',
        principal: 1000,
        interestAmount: 400,
        interestPercent: 40,
        totalDue: 1400,
        termDays: 30,
        cyclesReq: '4 ciclos em dia',
      },
    ],
  },
];

export default function ConfiguracaoOfertasPage() {
  const [offers, setOffers] = useState<Offer[]>(INITIAL_OFFERS);
  const [filterTab, setFilterTab] = useState<'todas' | 'ativas' | 'inativas'>('todas');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states for new offer modal
  const [offerName, setOfferName] = useState('');
  const [t1Principal, setT1Principal] = useState(200);
  const [t1InterestPercent, setT1InterestPercent] = useState(60);
  const [t1TermDays, setT1TermDays] = useState(30);

  const [t2Principal, setT2Principal] = useState(350);
  const [t2InterestPercent, setT2InterestPercent] = useState(50);
  const [t2TermDays, setT2TermDays] = useState(30);

  const [t3Principal, setT3Principal] = useState(500);
  const [t3InterestPercent, setT3InterestPercent] = useState(45);
  const [t3TermDays, setT3TermDays] = useState(30);

  const activeOffersCount = offers.filter((o) => o.active).length;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenCreateModal = () => {
    setEditingOffer(null);
    setOfferName('Nova Oferta de Crédito');
    setT1Principal(200);
    setT1InterestPercent(60);
    setT1TermDays(30);
    setT2Principal(350);
    setT2InterestPercent(50);
    setT2TermDays(30);
    setT3Principal(500);
    setT3InterestPercent(45);
    setT3TermDays(30);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (offer: Offer) => {
    setEditingOffer(offer);
    setOfferName(offer.name);
    if (offer.tiers[0]) {
      setT1Principal(offer.tiers[0].principal);
      setT1InterestPercent(offer.tiers[0].interestPercent);
      setT1TermDays(offer.tiers[0].termDays);
    }
    if (offer.tiers[1]) {
      setT2Principal(offer.tiers[1].principal);
      setT2InterestPercent(offer.tiers[1].interestPercent);
      setT2TermDays(offer.tiers[1].termDays);
    }
    if (offer.tiers[2]) {
      setT3Principal(offer.tiers[2].principal);
      setT3InterestPercent(offer.tiers[2].interestPercent);
      setT3TermDays(offer.tiers[2].termDays);
    }
    setIsModalOpen(true);
  };

  const handleSaveOffer = (e: React.FormEvent) => {
    e.preventDefault();

    const t1Interest = (t1Principal * t1InterestPercent) / 100;
    const t2Interest = (t2Principal * t2InterestPercent) / 100;
    const t3Interest = (t3Principal * t3InterestPercent) / 100;

    const newTiers: TierConfig[] = [
      {
        name: 'Tier 1 (Base)',
        badge: 'Tier 1',
        badgeType: 'muted',
        subtitle: 'Novos Tomadores',
        principal: Number(t1Principal),
        interestAmount: Number(t1Interest),
        interestPercent: Number(t1InterestPercent),
        totalDue: Number(t1Principal) + Number(t1Interest),
        termDays: Number(t1TermDays),
        cyclesReq: '0 ciclos (Novo cliente)',
      },
      {
        name: 'Tier 2 (Recorrente)',
        badge: 'Tier 2',
        badgeType: 'green',
        subtitle: 'Após 3 Ciclos OK',
        principal: Number(t2Principal),
        interestAmount: Number(t2Interest),
        interestPercent: Number(t2InterestPercent),
        totalDue: Number(t2Principal) + Number(t2Interest),
        termDays: Number(t2TermDays),
        cyclesReq: '3 ciclos em dia',
      },
      {
        name: 'Tier 3 (VIP)',
        badge: 'Tier 3 (VIP)',
        badgeType: 'active',
        subtitle: 'Após 6 Ciclos OK',
        principal: Number(t3Principal),
        interestAmount: Number(t3Interest),
        interestPercent: Number(t3InterestPercent),
        totalDue: Number(t3Principal) + Number(t3Interest),
        termDays: Number(t3TermDays),
        cyclesReq: '6 ciclos em dia',
      },
    ];

    if (editingOffer) {
      setOffers((prev) =>
        prev.map((o) =>
          o.id === editingOffer.id
            ? { ...o, name: offerName, tiers: newTiers }
            : o
        )
      );
      showToast(`Oferta "${offerName}" atualizada com sucesso!`);
    } else {
      const newOffer: Offer = {
        id: `off-${Date.now()}`,
        name: offerName || 'Nova Oferta de Crédito',
        createdAt: new Date().toLocaleDateString('pt-BR'),
        active: true,
        tiers: newTiers,
      };
      setOffers((prev) => [newOffer, ...prev]);
      showToast(`Oferta "${newOffer.name}" criada com sucesso!`);
    }

    setIsModalOpen(false);
  };

  const handleToggleOfferStatus = (offerId: string) => {
    setOffers((prev) =>
      prev.map((o) => {
        if (o.id === offerId) {
          const nextState = !o.active;
          showToast(`Oferta "${o.name}" ${nextState ? 'ativada' : 'pausada'} com sucesso.`);
          return { ...o, active: nextState };
        }
        return o;
      })
    );
  };

  const filteredOffers = offers.filter((o) => {
    if (filterTab === 'ativas') return o.active;
    if (filterTab === 'inativas') return !o.active;
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* ====================================================================
           1. TOP HEADER & NEW OFFER BUTTON
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
          <h1 style={{ fontSize: '22px', margin: 0, fontWeight: 600 }}>Ofertas</h1>
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
            <span className="vance-getstarted-text">Nova Oferta</span>
            <span className="vance-getstarted-badge">
              <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* ====================================================================
           2. FILTER TABS
           ==================================================================== */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', backgroundColor: 'var(--bg-card)', padding: '3px', borderRadius: 'var(--radius-pill)', gap: '4px' }}>
          <button
            onClick={() => setFilterTab('todas')}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-pill)',
              border: 'none',
              fontSize: '12px',
              cursor: 'pointer',
              fontWeight: 500,
              backgroundColor: filterTab === 'todas' ? 'var(--bg-surface)' : 'transparent',
              color: filterTab === 'todas' ? 'var(--text-main)' : 'var(--text-muted)',
            }}
          >
            Todas ({offers.length})
          </button>
          <button
            onClick={() => setFilterTab('ativas')}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-pill)',
              border: 'none',
              fontSize: '12px',
              cursor: 'pointer',
              fontWeight: 500,
              backgroundColor: filterTab === 'ativas' ? 'var(--bg-surface)' : 'transparent',
              color: filterTab === 'ativas' ? 'var(--text-main)' : 'var(--text-muted)',
            }}
          >
            Ativas ({activeOffersCount})
          </button>
          <button
            onClick={() => setFilterTab('inativas')}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-pill)',
              border: 'none',
              fontSize: '12px',
              cursor: 'pointer',
              fontWeight: 500,
              backgroundColor: filterTab === 'inativas' ? 'var(--bg-surface)' : 'transparent',
              color: filterTab === 'inativas' ? 'var(--text-main)' : 'var(--text-muted)',
            }}
          >
            Inativas ({offers.length - activeOffersCount})
          </button>
        </div>
      </div>

      {/* ====================================================================
           3. OFFERS LIST
           ==================================================================== */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {filteredOffers.map((offer, idx) => (
          <div
            key={offer.id}
            className={`vance-card vance-cascade-item delay-${Math.min(idx + 3, 9)}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
              opacity: offer.active ? 1 : 0.75,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-surface)',
                    display: 'grid',
                    placeItems: 'center',
                    color: offer.active ? 'var(--accent-green)' : 'var(--text-muted)',
                  }}
                >
                  <svg className="icon-svg icon-sm" viewBox="0 0 24 24">
                    <path d="M20.59 13.41 13.42 20.6a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                    <circle cx="7" cy="7" r="1.5" />
                  </svg>
                </span>
                <div>
                  <h2 style={{ fontSize: '16px', margin: 0, fontWeight: 600, color: 'var(--text-main)' }}>{offer.name}</h2>
                  <div style={{ fontSize: '11px', color: 'var(--text-subtle)', marginTop: '2px' }}>
                    {offer.tiers.length} Tiers configurados
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {offer.active ? (
                  <span className="vance-badge green" style={{ fontSize: '11px' }}>
                    Oferta Ativa
                  </span>
                ) : (
                  <span className="vance-badge muted" style={{ fontSize: '11px' }}>
                    Pausada
                  </span>
                )}

                <button
                  type="button"
                  className="vance-btn sm"
                  onClick={() => handleToggleOfferStatus(offer.id)}
                >
                  {offer.active ? 'Pausar' : 'Ativar'}
                </button>

                <button
                  type="button"
                  className="vance-btn sm primary"
                  onClick={() => handleOpenEditModal(offer)}
                >
                  Editar Parâmetros
                </button>
              </div>
            </div>

            {/* Tiers Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '14px',
              }}
            >
              {offer.tiers.map((tier, tIdx) => (
                <div
                  key={tIdx}
                  className="vance-tile"
                  style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span
                      className={`vance-badge ${tier.badgeType === 'green' ? 'green' : tier.badgeType === 'active' ? 'active' : ''}`}
                      style={{ fontSize: '11px', fontWeight: 500 }}
                    >
                      {tier.badge}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>{tier.subtitle}</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12.5px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-subtle)' }}>Valor Principal:</span>
                      <b className="tnum" style={{ color: 'var(--text-main)', fontWeight: 500 }}>
                        R$ {tier.principal.toFixed(2).replace('.', ',')}
                      </b>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-subtle)' }}>Taxa / Juros:</span>
                      <b className="tnum" style={{ color: 'var(--accent-green)', fontWeight: 500 }}>
                        R$ {tier.interestAmount.toFixed(2).replace('.', ',')} ({tier.interestPercent}%)
                      </b>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-subtle)' }}>Total Devido:</span>
                      <b className="tnum" style={{ color: 'var(--text-main)', fontWeight: 500 }}>
                        R$ {tier.totalDue.toFixed(2).replace('.', ',')}
                      </b>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-subtle)' }}>Prazo Padrão:</span>
                      <span className="tnum" style={{ color: 'var(--text-main)' }}>{tier.termDays} dias</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '4px', borderTop: '1px solid rgba(0,0,0,0.04)' }}>
                      <span style={{ color: 'var(--text-subtle)', fontSize: '11px' }}>Requisito:</span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>{tier.cyclesReq}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ====================================================================
           4. MODAL: CRIAR / EDITAR OFERTA DE EMPRÉSTIMO
           ==================================================================== */}
      {isModalOpen && (
        <div
          className="vance-modal-backdrop open"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="vance-modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '640px', display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            {/* Modal Header */}
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
                    <path d="M20.59 13.41 13.42 20.6a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                    <circle cx="7" cy="7" r="1.5" />
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', margin: 0 }}>
                    {editingOffer ? 'Editar Oferta de Empréstimo' : 'Criar Nova Oferta de Empréstimo'}
                  </h3>
                  <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>
                    Configure os parâmetros operacionais e valores liberados por tier
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

            {/* Form */}
            <form onSubmit={handleSaveOffer} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                  Nome da Oferta
                </label>
                <input
                  type="text"
                  required
                  className="vance-input"
                  placeholder="Ex: Oferta Padrão 30 Dias"
                  value={offerName}
                  onChange={(e) => setOfferName(e.target.value)}
                />
              </div>

              {/* Tier 1 Config */}
              <div style={{ backgroundColor: 'var(--bg-card)', padding: '14px 16px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-main)' }}>Tier 1 (Novos Clientes)</span>
                  <span className="vance-badge muted" style={{ fontSize: '10px' }}>Entrada</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ fontSize: '11px', color: 'var(--text-subtle)', display: 'block', marginBottom: '4px' }}>Principal (R$)</label>
                    <input
                      type="number"
                      required
                      min={50}
                      step={50}
                      className="vance-input"
                      value={t1Principal}
                      onChange={(e) => setT1Principal(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', color: 'var(--text-subtle)', display: 'block', marginBottom: '4px' }}>Juros (%)</label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={100}
                      className="vance-input"
                      value={t1InterestPercent}
                      onChange={(e) => setT1InterestPercent(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', color: 'var(--text-subtle)', display: 'block', marginBottom: '4px' }}>Prazo (dias)</label>
                    <input
                      type="number"
                      required
                      min={7}
                      max={90}
                      className="vance-input"
                      value={t1TermDays}
                      onChange={(e) => setT1TermDays(Number(e.target.value))}
                    />
                  </div>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  Total a pagar: <b className="tnum" style={{ color: 'var(--accent-green)' }}>R$ {(t1Principal * (1 + t1InterestPercent / 100)).toFixed(2).replace('.', ',')}</b>
                </div>
              </div>

              {/* Tier 2 Config */}
              <div style={{ backgroundColor: 'var(--bg-card)', padding: '14px 16px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-main)' }}>Tier 2 (Recorrente)</span>
                  <span className="vance-badge green" style={{ fontSize: '10px' }}>3 Ciclos OK</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ fontSize: '11px', color: 'var(--text-subtle)', display: 'block', marginBottom: '4px' }}>Principal (R$)</label>
                    <input
                      type="number"
                      required
                      min={50}
                      step={50}
                      className="vance-input"
                      value={t2Principal}
                      onChange={(e) => setT2Principal(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', color: 'var(--text-subtle)', display: 'block', marginBottom: '4px' }}>Juros (%)</label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={100}
                      className="vance-input"
                      value={t2InterestPercent}
                      onChange={(e) => setT2InterestPercent(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', color: 'var(--text-subtle)', display: 'block', marginBottom: '4px' }}>Prazo (dias)</label>
                    <input
                      type="number"
                      required
                      min={7}
                      max={90}
                      className="vance-input"
                      value={t2TermDays}
                      onChange={(e) => setT2TermDays(Number(e.target.value))}
                    />
                  </div>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  Total a pagar: <b className="tnum" style={{ color: 'var(--accent-green)' }}>R$ {(t2Principal * (1 + t2InterestPercent / 100)).toFixed(2).replace('.', ',')}</b>
                </div>
              </div>

              {/* Tier 3 Config */}
              <div style={{ backgroundColor: 'var(--bg-card)', padding: '14px 16px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-main)' }}>Tier 3 (VIP Fidelidade)</span>
                  <span className="vance-badge active" style={{ fontSize: '10px' }}>6 Ciclos OK</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ fontSize: '11px', color: 'var(--text-subtle)', display: 'block', marginBottom: '4px' }}>Principal (R$)</label>
                    <input
                      type="number"
                      required
                      min={50}
                      step={50}
                      className="vance-input"
                      value={t3Principal}
                      onChange={(e) => setT3Principal(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', color: 'var(--text-subtle)', display: 'block', marginBottom: '4px' }}>Juros (%)</label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={100}
                      className="vance-input"
                      value={t3InterestPercent}
                      onChange={(e) => setT3InterestPercent(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', color: 'var(--text-subtle)', display: 'block', marginBottom: '4px' }}>Prazo (dias)</label>
                    <input
                      type="number"
                      required
                      min={7}
                      max={90}
                      className="vance-input"
                      value={t3TermDays}
                      onChange={(e) => setT3TermDays(Number(e.target.value))}
                    />
                  </div>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  Total a pagar: <b className="tnum" style={{ color: 'var(--accent-green)' }}>R$ {(t3Principal * (1 + t3InterestPercent / 100)).toFixed(2).replace('.', ',')}</b>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'flex-end', marginTop: '10px' }}>
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
                  {editingOffer ? 'Salvar Alterações' : 'Salvar e Ativar Oferta'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
