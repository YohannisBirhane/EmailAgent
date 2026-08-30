// --- Category & Priority Types ---
export type CategoryType = 'Client' | 'Internal' | 'Finance' | 'Support' | 'Newsletter' | 'Low-Value';
export type PriorityTier = 'Urgent' | 'High' | 'Normal' | 'Low';
export type ActiveView = 'triage' | 'shared' | 'tasks' | 'analytics' | 'admin';

// --- Email & Thread Models ---
export interface EmailMessage {
  id: string;
  sender: { name: string; email: string; avatar?: string };
  recipients: string[];
  subject: string;
  body: string;
  timestamp: string;
}

export interface EmailThread {
  id: string;
  subject: string;
  messages: EmailMessage[];
  category: CategoryType;
  priority: PriorityTier;
  summary: string;
  isRead: boolean;
  assignedTo?: { id: string; name: string; avatar?: string };
  status: 'Unassigned' | 'In Progress' | 'Done';
  currentlyViewingBy?: string[]; // Real-time presence indicator
  hasDraft?: boolean;
  suggestedDrafts?: string[];
}

// --- Task Model (FR-05) ---
export interface TaskItem {
  id: string;
  threadId: string;
  title: string;
  suggestedOwner: string;
  dueDate: string;
  status: 'To Do' | 'In Progress' | 'Completed';
  externalToolSync?: 'Asana' | 'Jira' | 'Trello' | 'Google Tasks';
  sourceEmailSnippet: string;
}

// --- Collaboration Notes (FR-06) ---
export interface InternalNote {
  id: string;
  threadId: string;
  author: string;
  content: string;
  timestamp: string;
  mentions?: string[];
}

export interface HandoffRecord {
  id: string;
  threadId: string;
  fromUser: string;
  toUser: string;
  contextNote: string;
  timestamp: string;
}

// --- Multi-LLM & Admin Settings (FR-07) ---
export interface LLMConfig {
  primaryProvider: 'Gemini 1.5 Pro' | 'Gemini 1.5 Flash';
  alternateProvider: 'Alternate Hosted LLM' | 'Local Llama 3';
  autoFailover: boolean;
  piiRedactionEnabled: boolean;
  maskedCategories: string[];
}
