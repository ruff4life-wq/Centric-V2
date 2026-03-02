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
  journalEntries: Record<number, string>; // weekId -> JSON string of answers
  chatHistory: Message[];
  cycle: number;
}

interface UserContextType {
  state: UserState;
  updateAssessment: (data: Partial<AssessmentData>) => void;
  completeWeek: (weekId: number) => void;
  saveJournalEntry: (weekId: number, entry: string) => void;
  setName: (name: string) => void;
  addChatMessage: (message: Message) => void;
  resetProgress: () => void;
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
          // Ensure nested objects are also merged if necessary, though top-level merge covers new top-level fields
          assessment: { ...defaultState.assessment, ...(parsed.assessment || {}) },
          chatHistory: parsed.chatHistory || defaultState.chatHistory,
          cycle: parsed.cycle || defaultState.cycle
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
      assessment: { ...prev.assessment, ...data }
    }));
  };

  const completeWeek = (weekId: number) => {
    setState(prev => {
      // If already completed this week in this cycle, do nothing
      if (prev.completedWeeks.includes(weekId)) return prev;

      // If completing week 6, reset for next cycle
      if (weekId === 6) {
        return {
          ...prev,
          completedWeeks: [],
          currentWeek: 1,
          cycle: (prev.cycle || 1) + 1,
          journalEntries: {}, // Clear journal for fresh start
          // Keep assessment and chat history
        };
      }

      // Normal progression
      return {
        ...prev,
        completedWeeks: [...prev.completedWeeks, weekId],
        currentWeek: weekId + 1
      };
    });
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
    <UserContext.Provider value={{ state, updateAssessment, completeWeek, saveJournalEntry, setName, addChatMessage, resetProgress }}>
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
