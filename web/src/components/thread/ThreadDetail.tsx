import React from 'react';
import { ArrowLeft, Send, Clock, CornerUpLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SummaryCard } from './SummaryCard';
import { TaskExtractor } from './TaskExtractor';

export const ThreadDetail: React.FC = () => {
  const { setSelectedThreadId } = useApp();

  const mockThread = {
    id: 'thread-1',
    subject: 'URGENT: Enterprise SLA Contract Revision & Q4 Deliverables',
    category: 'Client' as const,
    priority: 'Urgent' as const,
    summary: 'Client requests urgent review of updated SLA contract terms and Q4 delivery schedule by Friday.',
    isRead: true,
    status: 'Unassigned' as const,
    messages: [
      {
        id: 'msg-1',
        sender: { name: 'Alexander Wright', email: 'alexander@acme-corp.com' },
        recipients: ['team@mailpilot.ai'],
        subject: 'URGENT: Enterprise SLA Contract Revision & Q4 Deliverables',
        body: 'Hi Team,\n\nWe need to revise Section 4.2 of the enterprise SLA agreement before our board meeting on Friday. Please confirm if the updated uptime guarantee (99.99%) can be committed.\n\nAlso, we would like to schedule a quick 15-minute sync with your engineering leads to clarify bandwidth expectations for Q4.\n\nBest regards,\nAlexander Wright\nVP of Operations, Acme Corp',
        timestamp: '10 mins ago'
      }
    ]
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Back Button & Thread Title Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={() => setSelectedThreadId(null)}
          className="btn-secondary"
          style={{ padding: '8px 12px', fontSize: '0.85rem' }}
        >
          <ArrowLeft size={16} /> Back to Inbox
        </button>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
            {mockThread.subject}
          </h2>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
            Category: <strong style={{ color: 'var(--accent-primary)' }}>{mockThread.category}</strong> • Priority: <strong style={{ color: 'var(--accent-rose)' }}>{mockThread.priority}</strong>
          </span>
        </div>
      </div>

      {/* AI Grounded Summary Banner */}
      <SummaryCard thread={mockThread} />

      {/* Main Content Split: Messages Timeline (Left) & AI Task Extractor (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '20px' }}>
        
        {/* Messages List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {mockThread.messages.map((msg) => (
            <div key={msg.id} className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'var(--bg-tertiary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.9rem'
                  }}>
                    {msg.sender.name.charAt(0)}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)', margin: 0 }}>
                      {msg.sender.name}
                    </h4>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                      &lt;{msg.sender.email}&gt; to {msg.recipients.join(', ')}
                    </span>
                  </div>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={12} /> {msg.timestamp}
                </span>
              </div>

              <div style={{
                fontSize: '0.9rem',
                color: 'var(--text-main)',
                lineHeight: 1.6,
                whiteSpace: 'pre-line',
                paddingTop: '8px',
                borderTop: '1px solid var(--border-color)'
              }}>
                {msg.body}
              </div>

              <div style={{ display: 'flex', gap: '10px', paddingTop: '8px' }}>
                <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                  <CornerUpLeft size={14} /> Reply
                </button>
                <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                  <Send size={14} /> AI Smart Draft
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Task Extractor Side Panel */}
        <div>
          <TaskExtractor thread={mockThread} />
        </div>
      </div>
    </div>
  );
};
