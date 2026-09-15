'use client';

import React from 'react';
import { RcemSymbol } from '@/components/ui/RcemLogo';

interface PixTransferCardProps {
  title?: string;
  amount?: string;
  cents?: string;
  time?: string;
  senderName?: string;
  receiverName?: string;
  receiverBadge?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function PixTransferCard({
  title = 'Transferência Pix Concluída',
  amount = 'R$ 1.850',
  cents = ',00',
  time = 'Hoje, 16:42',
  senderName = 'RCEM B2B',
  receiverName = 'Parceiro SP-01',
  receiverBadge = 'P',
  className = '',
  style = {},
}: PixTransferCardProps) {
  return (
    <div
      className={`vance-pix-card ${className}`}
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg-surface)',
        borderRadius: '16px',
        padding: '14px 16px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-green)',
              color: '#FFFFFF',
              display: 'grid',
              placeItems: 'center',
              flexShrink: 0,
            }}
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <span style={{ fontSize: '12.5px', fontWeight: 500, color: 'var(--text-main)' }}>
            {title}
          </span>
        </div>
        <span style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>{time}</span>
      </div>

      {/* Amount Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div className="tnum" style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-main)' }}>
          {amount}
          <span style={{ fontSize: '13px', fontWeight: 400, color: 'var(--text-subtle)' }}>{cents}</span>
        </div>
        <span className="vance-badge green" style={{ fontSize: '10px', padding: '2px 8px' }}>
          Instantâneo
        </span>
      </div>

      {/* Transfer Beam Bar */}
      <div
        className="pix-beam-bar"
        style={{
          position: 'relative',
          backgroundColor: 'var(--bg-card)',
          borderRadius: '12px',
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          overflow: 'hidden',
        }}
      >
        {/* Animated Green Light Beam */}
        <div className="pix-beam" />

        {/* Sender (RCEM) */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '6px',
              backgroundColor: '#FFFFFF',
              display: 'grid',
              placeItems: 'center',
              padding: '3px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              flexShrink: 0,
            }}
          >
            <RcemSymbol size="100%" color="var(--accent-green)" />
          </div>
          <span style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--text-main)' }}>
            {senderName}
          </span>
        </div>

        {/* Arrow Action */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            width: '22px',
            height: '22px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-surface)',
            color: 'var(--accent-green)',
            border: '1px solid rgba(21, 154, 106, 0.25)',
            display: 'grid',
            placeItems: 'center',
            flexShrink: 0,
          }}
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </div>

        {/* Receiver */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '6px',
              backgroundColor: 'var(--accent-green)',
              color: '#FFFFFF',
              display: 'grid',
              placeItems: 'center',
              fontSize: '9.5px',
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {receiverBadge}
          </div>
          <span style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--text-main)' }}>
            {receiverName}
          </span>
        </div>
      </div>
    </div>
  );
}
