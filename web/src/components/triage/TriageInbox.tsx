import React from 'react';
import { Sparkles, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ThreadCard } from './ThreadCard';
import type { CategoryType, PriorityTier, EmailThread } from '../../types';

// Initial Demo Dataset matching Phase 1 Specs
const initialThreads: EmailThread[] = [
  {
    id: 'thread-1',
    subject: 'URGENT: Enterprise SLA Contract Revision & Q4 Deliverables',
    category: 'Client',
    priority: 'Urgent',
    summary: 'Client requests urgent review of updated SLA contract terms and Q4 delivery schedule by Friday.',
    isRead: false,
    status: 'Unassigned',
    messages: [
      {
        id: 'msg-1',
        sender: { name: 'Alexander Wright', email: 'alexander@acme-corp.com' },
        recipients: ['team@mailpilot.ai'],
        subject: 'URGENT: Enterprise SLA Contract Revision & Q4 Deliverables',
        body: 'Hi Team,\n\nWe need to revise Section 4.2 of the enterprise SLA agreement before our board meeting on Friday. Please confirm if the updated uptime guarantee (99.99%) can be committed.\n\nBest,\nAlexander Wright',
        timestamp: '10 mins ago'
      }
    ]
  },
  {
    id: 'thread-2',
    subject: 'Pending Invoice Approval: AWS Infrastructure Q3 #INV-9402',
    category: 'Finance',
    priority: 'High',
    summary: 'Monthly cloud infrastructure billing invoice #INV-9402 requires manager sign-off.',
    isRead: false,
    status: 'In Progress',
    messages: [
      {
        id: 'msg-2',
        sender: { name: 'Billing Department', email: 'billing@cloudservices.io' },
        recipients: ['finance@mailpilot.ai'],
        subject: 'Pending Invoice Approval: AWS Infrastructure Q3 #INV-9402',
        body: 'Hello Finance Team,\n\nYour monthly statement for Q3 Cloud Services (#INV-9402) in the amount of $4,250.00 is ready for review and payment approval.',
        timestamp: '2 hours ago'
      }
    ]
  },
  {
    id: 'thread-3',
    subject: 'Support Ticket #8491: OAuth Re-authentication Issue on Microsoft 365',
    category: 'Support',
    priority: 'High',
    summary: 'User reported token expiration notice when connecting Microsoft 365 shared inbox.',
    isRead: true,
    status: 'Unassigned',
    messages: [
      {
        id: 'msg-3',
        sender: { name: 'Elena Rostova', email: 'elena@techlabs.org' },
        recipients: ['support@mailpilot.ai'],
        subject: 'Support Ticket #8491: OAuth Re-authentication Issue on Microsoft 365',
        body: 'Hi Support,\n\nWe encountered an OAuth token refresh prompt on our shared Outlook mailbox this morning. Could you assist with verifying our integration scopes?',
        timestamp: '4 hours ago'
      }
    ]
  },
  {
    id: 'thread-4',
    subject: 'Weekly Architecture Sync: Redis Cache & Go Concurrency Tuning',
    category: 'Internal',
    priority: 'Normal',
    summary: 'Engineering team sync on Redis caching policy and GORM database connection pool optimization.',
    isRead: true,
    status: 'Done',
    messages: [
      {
        id: 'msg-4',
        sender: { name: 'David Chen', email: 'david.chen@mailpilot.ai' },
        recipients: ['eng@mailpilot.ai'],
        subject: 'Weekly Architecture Sync: Redis Cache & Go Concurrency Tuning',
        body: 'Hey team,\n\nI have opened PR #42 to optimize database connection pooling in Go. Please take a look when you have a moment.',
        timestamp: 'Yesterday'
      }
    ]
  }
];

export const TriageInbox: React.FC = () => {
  const {
    categoryFilter, setCategoryFilter,
    priorityFilter, setPriorityFilter,
    searchQuery,
    selectedThreadId, setSelectedThreadId
  } = useApp();

  const categories: (CategoryType | 'All')[] = ['All', 'Client', 'Support', 'Finance', 'Internal', 'Newsletter'];
  const priorities: (PriorityTier | 'All')[] = ['All', 'Urgent', 'High', 'Normal', 'Low'];

  // Filter threads based on active category, priority, and search text
  const filteredThreads = initialThreads.filter((t) => {
    const matchesCategory = categoryFilter === 'All' || t.category === categoryFilter;
    const matchesPriority = priorityFilter === 'All' || t.priority === priorityFilter;
    const matchesSearch = searchQuery === '' || 
      t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.summary.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesPriority && matchesSearch;
  });

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Category Tabs Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {categories.map((cat) => {
            const isActive = categoryFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-md)',
                  background: isActive ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                  border: isActive ? 'none' : '1px solid var(--border-color)',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Priority Filter & Sorting */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
            <SlidersHorizontal size={14} /> Priority:
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as PriorityTier | 'All')}
              style={{
                background: 'var(--bg-tertiary)',
                color: 'var(--text-main)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: '4px 8px',
                fontSize: '0.825rem',
                outline: 'none'
              }}
            >
              {priorities.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
            <ArrowUpDown size={14} /> Sort by Priority Score
          </button>
        </div>
      </div>

      {/* Inbox Thread List Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            Showing {filteredThreads.length} conversation{filteredThreads.length !== 1 ? 's' : ''}
          </span>
          <span style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Sparkles size={12} /> Gemini Auto-Categorized
          </span>
        </div>

        {filteredThreads.length === 0 ? (
          <div className="glass-panel" style={{ padding: '48px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '1rem', fontWeight: 500 }}>No conversations match your active filters.</p>
            <button
              className="btn-secondary"
              onClick={() => { setCategoryFilter('All'); setPriorityFilter('All'); }}
              style={{ marginTop: '12px' }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredThreads.map((thread) => (
            <ThreadCard
              key={thread.id}
              thread={thread}
              isSelected={selectedThreadId === thread.id}
              onSelect={() => setSelectedThreadId(thread.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};
