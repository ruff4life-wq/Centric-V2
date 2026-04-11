import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string; // ISO string for storage
}

interface AssessmentData {
  wheelOfLife: Record<string, number>;
  proQOL: {
    compassionSatisfaction: number;
    burnout: number;
    secondaryTraumaticStress: number;
  };
  completed: boolean;
}

interface UserState {
  currentWeek: number;
  name: string;
  assessment: AssessmentData;
  completedWeeks: number[];
  journalEntries: Record<number, string>;
  chatHistory: Message[];
  cycle: number;
  weekStartedAt: string | null;   // ISO timestamp — when current week began
  lastCheckInDate: string | null; // ISO date string — last daily check-in
  checkInHistory: Record<string, string>; // date -> feeling key
}

interface UserContextType {
  state: UserState;
  updateAssessment: (data: Partial<AssessmentData>) => void;
  completeWeek: (weekId: number) => void;
  saveJournalEntry: (weekId: number, entry: string) => void;
  setName: (name: string) => void;
  addChatMessage: (message: Message) => void;
  resetProgress: () => void;
  recordCheckIn: (feeling: string) => void;
  canCompleteWeek: () => boolean;
  daysIntoWeek: () => number;
}

const defaultState: UserState = {
  currentWeek: 1,
  name: '',
  assessment: {
    wheelOfLife: {
      'Physical Health': 5,
      'Mental/Emotional': 5,
      'Relationships': 5,
      'Career/Work': 5,
      'Finances': 5,
      'Spirituality': 5,
    },
    proQOL: {
      compassionSatisfaction: 0,
      burnout: 0,
      secondaryTraumaticStress: 0,
    },
    completed: false,
  },
  completedWeeks: [],
  journalEntries: {},
  chatHistory: [],
  cycle: 1,
  weekStartedAt: null,
  lastCheckInDate: null,
  checkInHistory: {},
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<UserState>(() => {
    const saved = localStorage.getItem('centric_user_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Merge with defaultState to ensure new fields (like chatHistory, cycle) exist
        return {
          ...defaultState,
          ...parsed,
          assessment: { ...defaultState.assessment, ...(parsed.assessment || {}) },
          chatHistory: parsed.chatHistory || defaultState.chatHistory,
          cycle: parsed.cycle || defaultState.cycle,
          weekStartedAt: parsed.weekStartedAt || defaultState.weekStartedAt,
          lastCheckInDate: parsed.lastCheckInDate || defaultState.lastCheckInDate,
          checkInHistory: parsed.checkInHistory || defaultState.checkInHistory,
        };
      } catch (e) {
        console.error('Failed to parse saved state', e);
        return defaultState;
      }
    }
    return defaultState;
  });

  useEffect(() => {
    localStorage.setItem('centric_user_state', JSON.stringify(state));
  }, [state]);

  const updateAssessment = (data: Partial<AssessmentData>) => {
    setState(prev => ({
      ...prev,
      assessment: { ...prev.assessment, ...data },
      weekStartedAt: data.completed && !prev.assessment.completed
        ? new Date().toISOString()
        : prev.weekStartedAt,
    }));
  };

  const completeWeek = (weekId: number) => {
    setState(prev => {
      if (prev.completedWeeks.includes(weekId)) return prev;

      if (weekId === 6) {
        return {
          ...prev,
          completedWeeks: [],
          currentWeek: 1,
          cycle: (prev.cycle || 1) + 1,
          journalEntries: {},
          weekStartedAt: new Date().toISOString(),
        };
      }

      return {
        ...prev,
        completedWeeks: [...prev.completedWeeks, weekId],
        currentWeek: weekId + 1,
        weekStartedAt: new Date().toISOString(),
      };
    });
  };

  // Record a daily check-in feeling
  const recordCheckIn = (feeling: string) => {
    const today = new Date().toISOString().split('T')[0];
    setState(prev => ({
      ...prev,
      lastCheckInDate: today,
      checkInHistory: { ...prev.checkInHistory, [today]: feeling },
    }));
  };

  // Returns true if 4+ calendar days have passed since week started
  // Uses calendar date diff so Monday start = completable Friday+
  const canCompleteWeek = (): boolean => {
    if (!state.weekStartedAt) return true;
    const started = new Date(state.weekStartedAt);
    const now = new Date();
    // Compare calendar dates, not 24hr blocks
    const startDate = new Date(started.getFullYear(), started.getMonth(), started.getDate());
    const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const diffDays = Math.floor((nowDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays >= 4; // day 1 = 0 diff, day 5 = 4 diff
  };

  // How many days into the current week (1-7)
  const daysIntoWeek = (): number => {
    if (!state.weekStartedAt) return 7;
    const started = new Date(state.weekStartedAt);
    const now = new Date();
    const startDate = new Date(started.getFullYear(), started.getMonth(), started.getDate());
    const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const diff = Math.floor((nowDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return Math.min(diff + 1, 7);
  };

  const saveJournalEntry = (weekId: number, entry: string) => {
    setState(prev => ({
      ...prev,
      journalEntries: { ...prev.journalEntries, [weekId]: entry }
    }));
  };

  const setName = (name: string) => {
    setState(prev => ({ ...prev, name }));
  };

  const addChatMessage = (message: Message) => {
    setState(prev => ({
      ...prev,
      chatHistory: [...prev.chatHistory, message]
    }));
  };

  const resetProgress = () => {
    setState(defaultState);
  };

  return (
    <UserContext.Provider value={{ state, updateAssessment, completeWeek, saveJournalEntry, setName, addChatMessage, resetProgress, recordCheckIn, canCompleteWeek, daysIntoWeek }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
