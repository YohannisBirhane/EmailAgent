import React, { useState } from 'react';
import { Sparkles, CheckCircle, ShieldCheck, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import { EmailThread } from '../../types';

interface SummaryCardProps {
  thread: EmailThread;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ thread }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <div className="glass-panel" style={{
      padding: '20px',
      background: 'rgba(15, 23, 42, 0.75)',
      border: '1px solid rgba(99, 102, 241, 0.3)',
      boxShadow: 'var(--shadow-glow)',
      display: 'flex',
      flexDirection: 'column',
      gap: '14px'
    }}>
      {/* Summary Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, var(--accent-primary), #4f46e5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Sparkles size={18} color="#ffffff" />
          </div>
          <div>
            <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
              Grounded AI Thread Summary
            </h3>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
              Derived from {thread.messages.length} email message{thread.messages.length > 1 ? 's' : ''}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            padding: '4px 10px',
            borderRadius: '999px',
            background: 'rgba(16, 185, 129, 0.15)',
            color: 'var(--accent-emerald)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <ShieldCheck size={12} /> 98% Grounded
          </span>

          <button
            onClick={handleRefresh}
            className="btn-secondary"
            style={{ padding: '4px 10px', fontSize: '0.75rem' }}
            disabled={isRefreshing}
          >
            <RefreshCw size={12} style={{ animation: isRefreshing ? 'spin 1s linear infinite' : 'none' }} />
            {isRefreshing ? 'Re-summarizing...' : 'Refresh'}
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
          >
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '4px' }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-main)', lineHeight: 1.55, margin: 0 }}>
            {thread.summary}
          </p>

          {/* Key Asks & Action Items */}
          <div style={{
            padding: '12px 14px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(31, 41, 61, 0.5)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Key Asks & Open Questions:
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                <CheckCircle size={14} color="var(--accent-emerald)" />
                Review updated enterprise SLA contract proposal terms before Friday.
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                <CheckCircle size={14} color="var(--accent-emerald)" />
                Confirm 99.99% uptime guarantee commitment capability.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
