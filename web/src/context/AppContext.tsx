import React, { createContext, useContext, useState } from 'react';
import type { ActiveView, CategoryType, PriorityTier } from '../types';

interface AppContextType {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  selectedThreadId: string | null;
  setSelectedThreadId: (id: string | null) => void;
  categoryFilter: CategoryType | 'All';
  setCategoryFilter: (category: CategoryType | 'All') => void;
  priorityFilter: PriorityTier | 'All';
  setPriorityFilter: (priority: PriorityTier | 'All') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<ActiveView>('triage');
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<CategoryType | 'All'>('All');
  const [priorityFilter, setPriorityFilter] = useState<PriorityTier | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        selectedThreadId,
        setSelectedThreadId,
        categoryFilter,
        setCategoryFilter,
        priorityFilter,
        setPriorityFilter,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
