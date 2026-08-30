import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { TriageInbox } from './components/triage/TriageInbox';
import { ThreadDetail } from './components/thread/ThreadDetail';
import { TaskBoard } from './components/tasks/TaskBoard';

const MainContent: React.FC = () => {
  const { activeView, selectedThreadId } = useApp();

  // If a thread is selected, show ThreadDetail view
  if (selectedThreadId) {
    return (
      <main style={{ flex: 1, overflowY: 'auto', background: 'var(--bg-primary)' }}>
        <ThreadDetail />
      </main>
    );
  }

  return (
    <main style={{ flex: 1, overflowY: 'auto', background: 'var(--bg-primary)' }}>
      {activeView === 'triage' && <TriageInbox />}
      {activeView === 'shared' && (
        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
          <h2>Shared Team Queue View</h2>
          <p>Multi-user ticket assignment & presence indicators (Phase 3)</p>
        </div>
      )}
      {activeView === 'tasks' && <TaskBoard />}
      {activeView === 'analytics' && (
        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
          <h2>Analytics & Response Metrics</h2>
          <p>Backlog size, response time tracking, and team workload balance (Phase 4)</p>
        </div>
      )}
      {activeView === 'admin' && (
        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
          <h2>Admin & AI Console</h2>
          <p>OAuth mailbox connections, Gemini primary & failover model setup, PII redaction (Phase 4)</p>
        </div>
      )}
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
        <Header />
        <div style={{ display: 'flex', flex: 1, height: 'calc(100vh - 64px)' }}>
          <Sidebar />
          <MainContent />
        </div>
      </div>
    </AppProvider>
  );
}
