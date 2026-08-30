import React from 'react';
import { Inbox, Users, CheckSquare, BarChart3, Settings, ShieldCheck, Mail } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ActiveView } from '../../types';

export const Sidebar: React.FC = () => {
  const { activeView, setActiveView } = useApp();

  const navItems: { id: ActiveView; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'triage', label: 'Triage Inbox', icon: <Inbox size={18} />, badge: '4' },
    { id: 'shared', label: 'Shared Team Queue', icon: <Users size={18} />, badge: '2' },
    { id: 'tasks', label: 'Extracted Tasks', icon: <CheckSquare size={18} /> },
    { id: 'analytics', label: 'Analytics & Response', icon: <BarChart3 size={18} /> },
    { id: 'admin', label: 'Admin & AI Config', icon: <Settings size={18} /> },
  ];

  return (
    <aside style={{
      width: '240px',
      borderRight: '1px solid var(--border-color)',
      background: 'var(--bg-secondary)',
      display: 'flex',
      flexDirection: 'column',
      justify: 'space-between',
      padding: '20px 12px',
      height: 'calc(100vh - 64px)'
    }}>
      {/* Navigation Links */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ padding: '0 12px 10px 12px', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Navigation
        </div>
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                background: isActive ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                color: isActive ? '#ffffff' : 'var(--text-muted)',
                border: isActive ? '1px solid var(--border-highlight)' : '1px solid transparent',
                cursor: 'pointer',
                fontWeight: isActive ? 600 : 500,
                fontSize: '0.875rem',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)' }}>
                  {item.icon}
                </span>
                {item.label}
              </div>
              {item.badge && (
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '2px 7px',
                  borderRadius: '999px',
                  background: isActive ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                  color: '#ffffff'
                }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Connection & System Status Footer */}
      <div className="glass-card" style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent-emerald)' }} />
            Gmail Connected
          </div>
          <ShieldCheck size={14} color="var(--accent-emerald)" />
        </div>
        <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)', margin: 0 }}>
          Gemini 1.5 Flash Reasoning Active
        </p>
      </div>
    </aside>
  );
};
