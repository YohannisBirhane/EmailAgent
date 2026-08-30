import React from 'react';
import { Sparkles, Clock, AlertCircle, CheckCircle2, User, FileText } from 'lucide-react';
import { EmailThread } from '../../types';

interface ThreadCardProps {
  thread: EmailThread;
  isSelected: boolean;
  onSelect: () => void;
}

export const ThreadCard: React.FC<ThreadCardProps> = ({ thread, isSelected, onSelect }) => {
  const latestMessage = thread.messages[thread.messages.length - 1] || {
    sender: { name: 'Unknown Sender', email: 'unknown@domain.com' },
    timestamp: 'Just now'
  };

  const getPriorityBadge = (tier: string) => {
    switch (tier) {
      case 'Urgent': return <span className="badge badge-urgent"><AlertCircle size={10} /> Urgent</span>;
      case 'High': return <span className="badge badge-high">High</span>;
      case 'Normal': return <span className="badge badge-normal">Normal</span>;
      case 'Low': return <span className="badge badge-low">Low</span>;
      default: return <span className="badge badge-normal">{tier}</span>;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Client': return '#818cf8';
      case 'Support': return '#38bdf8';
      case 'Finance': return '#34d399';
      case 'Internal': return '#c084fc';
      case 'Newsletter': return '#9ca3af';
      default: return '#9ca3af';
    }
  };

  return (
    <div
      onClick={onSelect}
      className="glass-card"
      style={{
        padding: '16px 20px',
        cursor: 'pointer',
        borderLeft: isSelected ? '4px solid var(--accent-primary)' : '1px solid var(--border-color)',
        background: isSelected ? 'rgba(99, 102, 241, 0.12)' : 'rgba(31, 41, 61, 0.35)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        position: 'relative'
      }}
    >
      {/* Top Header: Sender, Category, Priority, Timestamp */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: 'var(--text-main)'
          }}>
            {latestMessage.sender.name.charAt(0)}
          </div>
          <div>
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>
              {latestMessage.sender.name}
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginLeft: '6px' }}>
              &lt;{latestMessage.sender.email}&gt;
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="category-pill" style={{ borderColor: getCategoryColor(thread.category), color: getCategoryColor(thread.category) }}>
            {thread.category}
          </span>
          {getPriorityBadge(thread.priority)}
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginLeft: '6px' }}>
            <Clock size={12} /> {latestMessage.timestamp}
          </span>
        </div>
      </div>

      {/* Subject Title */}
      <h3 style={{ fontSize: '0.98rem', fontWeight: 600, color: 'var(--text-main)', margin: 0, lineHeight: 1.3 }}>
        {thread.subject}
      </h3>

      {/* AI Grounded Summary Preview Box */}
      <div style={{
        padding: '10px 12px',
        borderRadius: 'var(--radius-sm)',
        background: 'rgba(15, 23, 42, 0.6)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '8px'
      }}>
        <Sparkles size={14} color="var(--accent-primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
        <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.45 }}>
          {thread.summary}
        </p>
      </div>

      {/* Bottom Metadata: Message count & task extracted indicator */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-dim)', paddingTop: '4px' }}>
        <span>{thread.messages.length} message{thread.messages.length > 1 ? 's' : ''} in thread</span>
        {thread.status && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)' }}>
            Status: <strong style={{ color: 'var(--text-main)' }}>{thread.status}</strong>
          </span>
        )}
      </div>
    </div>
  );
};
