// Shared feelings and ACT responses used in both Today and CheckIn components.
// Full emotional spectrum: negative, neutral/mixed, and positive states.

import { ReactNode } from 'react';

export interface Feeling {
  key: string;
  label: string;
  sub: string;
  color: string;
  accent: string;
  textColor: string;
  valence: 'positive' | 'neutral' | 'negative' | 'crisis';
  icon: ReactNode;
}

export interface FeelingResponse {
  badge: string;
  badgeStyle: string;
  text: string;
  exercise: string;
  dest?: { label: string; route: 'pause' | 'module' };
  isCrisis?: boolean;
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const WaveIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" width="24" height="24">
    <path d="M4 22c2-4 4-6 6-6s4 4 6 4 4-6 6-6 4 4 6 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 30c2-4 4-6 6-6s4 4 6 4 4-6 6-6 4 4 6 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
  </svg>
);

const CloudIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" width="24" height="24">
    <path d="M10 26a6 6 0 010-12 8 8 0 0115.5-2A5 5 0 1130 26H10z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
    <path d="M15 32l-2 4M20 33v4M25 32l2 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
  </svg>
);

const CompassIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" width="24" height="24">
    <circle cx="20" cy="20" r="13" stroke="currentColor" strokeWidth="2.2"/>
    <path d="M20 10v2M20 28v2M10 20h2M28 20h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
    <path d="M24 16l-3 8-5-5 8-3z" fill="currentColor" opacity="0.8"/>
  </svg>
);

const LeafIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" width="24" height="24">
    <path d="M10 30c0 0 2-14 10-18 6-3 12-2 14 4-2 8-10 14-18 14H10z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
    <path d="M10 30c4-4 8-8 10-14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.5"/>
  </svg>
);

const SunIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" width="24" height="24">
    <circle cx="20" cy="20" r="7" stroke="currentColor" strokeWidth="2.2"/>
    <path d="M20 6v4M20 30v4M6 20h4M30 20h4M10.2 10.2l2.8 2.8M27 27l2.8 2.8M10.2 29.8l2.8-2.8M27 13l2.8-2.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" width="24" height="24">
    <path d="M20 32s-13-8-13-17a8 8 0 0113-6.2A8 8 0 0133 15c0 9-13 17-13 17z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
  </svg>
);

const LifelineIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" width="24" height="24">
    <circle cx="20" cy="20" r="13" stroke="currentColor" strokeWidth="2.2"/>
    <path d="M13 20h4l2-5 4 10 2-5h4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ─── Feelings (full spectrum) ─────────────────────────────────────────────────

export const feelings: Feeling[] = [
  // Positive
  {
    key: 'grateful',
    label: 'Grateful',
    sub: 'I notice something good',
    color: 'bg-emerald-50',
    accent: 'border-emerald-200 hover:border-emerald-400',
    textColor: 'text-emerald-600',
    valence: 'positive',
    icon: <HeartIcon />,
  },
  {
    key: 'grounded',
    label: 'Grounded',
    sub: 'Present and steady',
    color: 'bg-teal-50',
    accent: 'border-teal-200 hover:border-teal-400',
    textColor: 'text-teal-600',
    valence: 'positive',
    icon: <SunIcon />,
  },
  // Neutral / Mixed
  {
    key: 'unsettled',
    label: 'Unsettled',
    sub: 'Something feels off',
    color: 'bg-amber-50',
    accent: 'border-amber-200 hover:border-amber-400',
    textColor: 'text-amber-600',
    valence: 'neutral',
    icon: <CompassIcon />,
  },
  {
    key: 'disconnected',
    label: 'Disconnected',
    sub: 'Going through motions',
    color: 'bg-slate-50',
    accent: 'border-slate-200 hover:border-slate-400',
    textColor: 'text-slate-500',
    valence: 'neutral',
    icon: <CloudIcon />,
  },
  // Negative
  {
    key: 'overwhelmed',
    label: 'Overwhelmed',
    sub: 'Too much, too fast',
    color: 'bg-blue-50',
    accent: 'border-blue-200 hover:border-blue-400',
    textColor: 'text-blue-600',
    valence: 'negative',
    icon: <WaveIcon />,
  },
  // Crisis
  {
    key: 'crisis',
    label: 'In crisis',
    sub: 'I need real help',
    color: 'bg-red-50',
    accent: 'border-red-200 hover:border-red-400',
    textColor: 'text-red-600',
    valence: 'crisis',
    icon: <LifelineIcon />,
  },
];

// ─── ACT Responses ────────────────────────────────────────────────────────────

export const responses: Record<string, FeelingResponse> = {

  // Positive states — affirm, deepen, extend
  grateful: {
    badge: 'ACT, Values',
    badgeStyle: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
    text: 'Gratitude is not a small thing. For a helping professional, noticing what is good is an act of resistance against the weight of what is hard. Stay here for a moment. Let this be real.',
    exercise: 'Name three things you are grateful for right now. Say them out loud if you can. Then ask yourself: what value does each one point to? Let that value guide how you show up today.',
    dest: { label: 'Continue this week\'s module', route: 'module' },
  },

  grounded: {
    badge: 'ACT, Present Moment',
    badgeStyle: 'bg-teal-50 text-teal-700 border border-teal-100',
    text: 'Being present is one of the rarest gifts in this work. When you feel grounded, you have something real to give from. This is what restoration looks like. Do not rush past it.',
    exercise: 'Notice one thing your body feels right now that is comfortable or settled. Let that be enough for this moment. Breathe into it. You do not have to earn this feeling.',
    dest: { label: 'Take me to the Daily Pause', route: 'pause' },
  },

  // Neutral states — gentle curiosity, not alarm
  unsettled: {
    badge: 'ACT, Acceptance',
    badgeStyle: 'bg-amber-50 text-amber-700 border border-amber-100',
    text: 'Something feeling off is worth paying attention to, not pushing through. Unsettledness is often the first honest signal before we can name what is really happening. You do not have to fix it right now.',
    exercise: 'Sit with the feeling for 60 seconds without trying to solve it. Ask gently: "What is this trying to tell me?" You do not need an answer today. Just the willingness to listen.',
    dest: { label: 'Continue this week\'s module', route: 'module' },
  },

  disconnected: {
    badge: 'ACT, Present Moment',
    badgeStyle: 'bg-slate-50 text-slate-600 border border-slate-100',
    text: 'Disconnection is often the mind\'s way of protecting you from feeling too much. It is not a flaw. It is a signal to come back to your body, gently and without judgment.',
    exercise: 'Name 5 things you can see right now. 4 you can touch. 3 you can hear. 2 you can smell. 1 thing you are grateful for in this moment. Welcome back.',
    dest: { label: 'Take me to the Daily Pause', route: 'pause' },
  },

  // Negative states — hold with care, not alarm
  overwhelmed: {
    badge: 'ACT, Acceptance',
    badgeStyle: 'bg-blue-50 text-blue-700 border border-blue-100',
    text: 'Overwhelm often signals that you are caring deeply, and that your nervous system is doing its job. You do not have to fix the feeling. You just have to make room for it.',
    exercise: 'Place one hand on your chest. Breathe in for 4 counts, out for 6. As you exhale, silently say: "I can hold this." Repeat three times. You do not have to carry it perfectly. Just carry it.',
    dest: { label: 'Take me to the Daily Pause', route: 'pause' },
  },

  // Crisis — direct, no destination button
  crisis: {
    badge: 'Please read',
    badgeStyle: 'bg-red-50 text-red-700 border border-red-100',
    text: 'It takes real courage to name that you are in crisis. Please reach out to a real person right now, your supervisor, a trusted colleague, or one of the crisis lines below.',
    exercise: 'Call or text 988 (Suicide and Crisis Lifeline). Text HOME to 741741 (Crisis Text Line). This app is a wellness companion. It cannot provide the level of care you deserve right now. Please do not navigate this alone.',
    isCrisis: true,
  },
};
