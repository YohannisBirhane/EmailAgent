import React, { useState } from 'react';
import { CheckSquare, Calendar, User, ExternalLink, Plus, Check } from 'lucide-react';
import { EmailThread, TaskItem } from '../../types';

interface TaskExtractorProps {
  thread: EmailThread;
  onAddTask?: (task: Partial<TaskItem>) => void;
}

export const TaskExtractor: React.FC<TaskExtractorProps> = ({ thread }) => {
  const [createdTasks, setCreatedTasks] = useState<string[]>([]);

  const sampleExtractedTasks = [
    {
      id: 'ext-1',
      title: 'Review Section 4.2 of Enterprise SLA agreement',
      owner: 'Sarah Jenkins',
      dueDate: '2026-09-02',
      tool: 'Asana',
      snippet: 'We need to revise Section 4.2 of the enterprise SLA agreement before our board meeting on Friday.'
    },
    {
      id: 'ext-2',
      title: 'Confirm 99.99% uptime guarantee feasibility with Eng',
      owner: 'David Chen',
      dueDate: '2026-09-01',
      tool: 'Jira',
      snippet: 'Please confirm if the updated uptime guarantee (99.99%) can be committed.'
    }
  ];

  const handleConfirmTask = (taskId: string) => {
    if (!createdTasks.includes(taskId)) {
      setCreatedTasks([...createdTasks, taskId]);
    }
  };

  return (
    <div className="glass-panel" style={{
      padding: '20px',
      background: 'var(--bg-secondary)',
      display: 'flex',
      flexDirection: 'column',
      gap: '14px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckSquare size={18} color="var(--accent-emerald)" />
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
            AI Extracted Tasks (FR-05)
          </h3>
        </div>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
          {sampleExtractedTasks.length} Action Items Detected
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {sampleExtractedTasks.map((task) => {
          const isAdded = createdTasks.includes(task.id);
          return (
            <div
              key={task.id}
              style={{
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(31, 41, 61, 0.4)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)', lineHeight: 1.3 }}>
                  {task.title}
                </span>
                <button
                  onClick={() => handleConfirmTask(task.id)}
                  className={isAdded ? 'btn-secondary' : 'btn-primary'}
                  style={{ padding: '4px 10px', fontSize: '0.75rem', flexShrink: 0 }}
                >
                  {isAdded ? (
                    <>
                      <Check size={12} color="var(--accent-emerald)" /> Confirmed
                    </>
                  ) : (
                    <>
                      <Plus size={12} /> Confirm Task
                    </>
                  )}
                </button>
              </div>

              <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontStyle: 'italic', margin: 0 }}>
                "{task.snippet}"
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.75rem', color: 'var(--text-muted)', paddingTop: '4px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <User size={12} /> {task.owner}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={12} /> Due {task.dueDate}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-cyan)' }}>
                  <ExternalLink size={12} /> Syncs to {task.tool}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
