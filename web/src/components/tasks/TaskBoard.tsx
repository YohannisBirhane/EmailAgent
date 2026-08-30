import React from 'react';
import { CheckSquare, Calendar, User, ExternalLink, Sparkles, Plus } from 'lucide-react';
import { TaskItem } from '../../types';

export const TaskBoard: React.FC = () => {
  const sampleTasks: TaskItem[] = [
    {
      id: 'task-1',
      threadId: 'thread-1',
      title: 'Review Section 4.2 of Enterprise SLA agreement',
      suggestedOwner: 'Sarah Jenkins',
      dueDate: '2026-09-02',
      status: 'To Do',
      externalToolSync: 'Asana',
      sourceEmailSnippet: 'We need to revise Section 4.2 of the enterprise SLA agreement before our board meeting on Friday.'
    },
    {
      id: 'task-2',
      threadId: 'thread-1',
      title: 'Confirm 99.99% uptime guarantee feasibility with Eng',
      suggestedOwner: 'David Chen',
      dueDate: '2026-09-01',
      status: 'In Progress',
      externalToolSync: 'Jira',
      sourceEmailSnippet: 'Please confirm if the updated uptime guarantee (99.99%) can be committed.'
    },
    {
      id: 'task-3',
      threadId: 'thread-2',
      title: 'Sign off Q3 AWS Cloud Services invoice #INV-9402',
      suggestedOwner: 'Elena Rostova',
      dueDate: '2026-08-31',
      status: 'Completed',
      externalToolSync: 'Google Tasks',
      sourceEmailSnippet: 'Your monthly statement for Q3 Cloud Services (#INV-9402) in the amount of $4,250.00 is ready for review.'
    }
  ];

  const columns: ('To Do' | 'In Progress' | 'Completed')[] = ['To Do', 'In Progress', 'Completed'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'To Do': return 'var(--accent-amber)';
      case 'In Progress': return 'var(--accent-primary)';
      case 'Completed': return 'var(--accent-emerald)';
      default: return 'var(--text-muted)';
    }
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Board Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckSquare size={22} color="var(--accent-emerald)" /> Extracted Tasks Kanban Board (FR-05)
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
            Action items detected by Gemini AI from email threads, synced with external tools.
          </p>
        </div>

        <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
          <Plus size={16} /> Add Task Manually
        </button>
      </div>

      {/* Kanban Columns Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {columns.map((col) => {
          const colTasks = sampleTasks.filter((t) => t.status === col);
          return (
            <div
              key={col}
              className="glass-panel"
              style={{
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                minHeight: '480px',
                background: 'rgba(17, 24, 39, 0.6)'
              }}
            >
              {/* Column Title Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: getStatusColor(col) }} />
                  {col}
                </span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '2px 8px', borderRadius: '999px', background: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}>
                  {colTasks.length}
                </span>
              </div>

              {/* Task Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {colTasks.map((task) => (
                  <div
                    key={task.id}
                    className="glass-card"
                    style={{
                      padding: '14px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      borderLeft: `3px solid ${getStatusColor(task.status)}`
                    }}
                  >
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)', margin: 0, lineHeight: 1.35 }}>
                      {task.title}
                    </h4>

                    <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)', margin: 0, fontStyle: 'italic' }}>
                      "{task.sourceEmailSnippet}"
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', paddingTop: '4px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <User size={12} /> {task.suggestedOwner}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={12} /> {task.dueDate}
                      </span>
                    </div>

                    {task.externalToolSync && (
                      <div style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <ExternalLink size={10} /> Synced to {task.externalToolSync}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
