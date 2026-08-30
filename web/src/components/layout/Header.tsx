import React from 'react';
import { Search, Bell, Sparkles, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const { searchQuery, setSearchQuery } = useApp();

  return (
    <header style={{
      height: '64px',
      borderBottom: '1px solid var(--border-color)',
      background: 'var(--bg-glass)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      position: 'sticky',
      top: 0,
      zIndex: 40
    }}>
      {/* Brand & AI Indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-glow)'
        }}>
          <Sparkles size={20} color="#ffffff" />
        </div>
        <div>
          <h1 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', margin: 0, lineHeight: 1.2 }}>
            MailPilot <span style={{ color: 'var(--accent-primary)', fontSize: '0.85em' }}>AI</span>
          </h1>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
            Enterprise Email Triage & Intelligence
          </p>
        </div>
      </div>

      {/* Search Input Bar */}
      <div style={{
        flex: 1,
        maxWidth: '480px',
        margin: '0 32px',
        position: 'relative'
      }}>
        <Search size={18} style={{
          position: 'absolute',
          left: '14px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--text-muted)'
        }} />
        <input
          type="text"
          placeholder="Search emails, AI summaries, senders, or tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '9px 16px 9px 42px',
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-main)',
            fontSize: '0.875rem',
            outline: 'none',
            transition: 'all 0.2s ease'
          }}
        />
      </div>

      {/* User Controls & Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
          <Filter size={14} /> Filter Rules
        </button>

        <div style={{
          position: 'relative',
          cursor: 'pointer',
          padding: '8px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)'
        }}>
          <Bell size={18} color="var(--text-muted)" />
          <span style={{
            position: 'absolute',
            top: '4px',
            right: '4px',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'var(--accent-rose)'
          }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingLeft: '8px', borderLeft: '1px solid var(--border-color)' }}>
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 600,
            fontSize: '0.875rem'
          }}>
            SJ
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>Sarah Jenkins</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Workspace Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};
