import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { motion, AnimatePresence } from 'motion/react';
import { getCycleWeeks } from '../data/curriculum';

interface Feeling {
  key: string;
  label: string;
  sub: string;
  color: string;
  accent: string;
  textColor: string;
  icon: React.ReactNode;
}

interface Response {
  badge: string;
  badgeStyle: string;
  text: string;
  exercise: string;
  dest?: { label: string; route: 'pause' | 'module' };
  isCrisis?: boolean;
}

const WaveIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" width="28" height="28">
    <path d="M4 22c2-4 4-6 6-6s4 4 6 4 4-6 6-6 4 4 6 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 30c2-4 4-6 6-6s4 4 6 4 4-6 6-6 4 4 6 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
  </svg>
);

const RockIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" width="28" height="28">
    <path d="M8 28c0 0 3-12 7-14 2-1 4 0 5 2 1-3 3-6 6-6 4 0 6 4 6 8 0 6-4 10-10 10H14c-3 0-6-2-6-4z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
  </svg>
);

const MirrorIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" width="28" height="28">
    <rect x="12" y="6" width="16" height="20" rx="8" stroke="currentColor" strokeWidth="2.2"/>
    <path d="M20 26v8M16 34h8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M16 14c0 0 2 2 4 2s4-2 4-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const CloudIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" width="28" height="28">
    <path d="M10 26a6 6 0 010-12 8 8 0 0115.5-2A5 5 0 1130 26H10z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
    <path d="M15 32l-2 4M20 33v4M25 32l2 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
  </svg>
);

const CompassIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" width="28" height="28">
    <circle cx="20" cy="20" r="13" stroke="currentColor" strokeWidth="2.2"/>
    <path d="M20 10v2M20 28v2M10 20h2M28 20h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
    <path d="M24 16l-3 8-5-5 8-3z" fill="currentColor" opacity="0.8"/>
  </svg>
);

const LifelineIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" width="28" height="28">
    <circle cx="20" cy="20" r="13" stroke="currentColor" strokeWidth="2.2"/>
    <path d="M13 20h4l2-5 4 10 2-5h4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const feelings: Feeling[] = [
  {
    key: 'overwhelmed',
    label: 'Overwhelmed',
    sub: 'Too much, too fast',
    color: 'bg-blue-50',
    accent: 'border-blue-200 group-hover:border-blue-400',
    textColor: 'text-blue-700',
    icon: <WaveIcon />,
  },
  {
    key: 'stuck',
    label: 'Stuck',
    sub: 'Not making progress',
    color: 'bg-amber-50',
    accent: 'border-amber-200 group-hover:border-amber-400',
    textColor: 'text-amber-700',
    icon: <RockIcon />,
  },
  {
    key: 'failing',
    label: 'Not enough',
    sub: 'Failing my clients',
    color: 'bg-rose-50',
    accent: 'border-rose-200 group-hover:border-rose-400',
    textColor: 'text-rose-700',
    icon: <MirrorIcon />,
  },
  {
    key: 'disconnected',
    label: 'Disconnected',
    sub: 'Going through motions',
    color: 'bg-slate-50',
    accent: 'border-slate-200 group-hover:border-slate-400',
    textColor: 'text-slate-600',
    icon: <CloudIcon />,
  },
  {
    key: 'values',
    label: 'Values check',
    sub: 'Am I on track?',
    color: 'bg-emerald-50',
    accent: 'border-emerald-200 group-hover:border-emerald-400',
    textColor: 'text-emerald-700',
    icon: <CompassIcon />,
  },
  {
    key: 'crisis',
    label: 'In crisis',
    sub: 'I need real help',
    color: 'bg-red-50',
    accent: 'border-red-200 group-hover:border-red-400',
    textColor: 'text-red-700',
    icon: <LifelineIcon />,
  },
];

const responses: Record<string, Response> = {
  overwhelmed: {
    badge: 'ACT · Acceptance',
    badgeStyle: 'bg-blue-50 text-blue-700 border border-blue-100',
    text: 'Overwhelm often signals that you are caring deeply — and that your nervous system is doing its job. You don\'t have to fix the feeling. You just have to make room for it.',
    exercise: 'Place one hand on your chest. Breathe in for 4 counts, out for 6. As you exhale, silently say: "I can hold this." Repeat three times. You don\'t have to carry it perfectly — just carry it.',
    dest: { label: 'Take me to the Daily Pause', route: 'pause' },
  },
  stuck: {
    badge: 'ACT · Committed Action',
    badgeStyle: 'bg-amber-50 text-amber-700 border border-amber-100',
    text: 'Feeling stuck isn\'t failure — it\'s information. It usually means there\'s a value underneath that matters to you, and something is blocking the path toward it.',
    exercise: 'Ask yourself: "What would I be doing right now if I weren\'t stuck?" Write one word. That word points toward a value. What is one tiny step — even five minutes — I could take in that direction today?',
    dest: { label: 'Continue this week\'s module', route: 'module' },
  },
  failing: {
    badge: 'ACT · Defusion',
    badgeStyle: 'bg-rose-50 text-rose-700 border border-rose-100',
    text: 'Your mind is telling you a story about not being enough. That story feels very real — but notice it is a thought, not a fact.',
    exercise: 'Say the thought out loud. Now say it again with this in front of it: "I\'m having the thought that..." Notice the small distance that creates. You are not the thought. You are the one who can observe it.',
    dest: { label: 'Continue this week\'s module', route: 'module' },
  },
  disconnected: {
    badge: 'ACT · Present Moment',
    badgeStyle: 'bg-slate-50 text-slate-600 border border-slate-100',
    text: 'Disconnection is often the mind\'s way of protecting you from feeling too much. It\'s not a flaw — it\'s a signal to come back to your body.',
    exercise: 'Name 5 things you can see right now. 4 you can touch. 3 you can hear. 2 you can smell. 1 thing you are grateful for in this moment. Welcome back.',
    dest: { label: 'Take me to the Daily Pause', route: 'pause' },
  },
  values: {
    badge: 'ACT · Values',
    badgeStyle: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
    text: 'Checking in with your values is one of the most courageous things a helping professional can do. It takes honesty to ask — "am I living what I believe?"',
    exercise: 'Think of the pillar you\'re currently working on. Ask: "In the last 7 days, did my actions reflect what I say matters most?" Not to judge — just to see. What one small thing could bring more alignment this week?',
    dest: { label: 'Continue this week\'s module', route: 'module' },
  },
  crisis: {
    badge: 'Please read',
    badgeStyle: 'bg-red-50 text-red-700 border border-red-100',
    text: 'It takes real courage to name that you\'re in crisis. Please reach out to a real person right now — your supervisor, a trusted colleague, or one of the crisis lines below.',
    exercise: 'Call or text 988 (Suicide & Crisis Lifeline). You can also text HOME to 741741 (Crisis Text Line). This app is a wellness companion — it cannot provide the level of care you deserve right now. Please don\'t navigate this alone.',
    isCrisis: true,
  },
};

export default function CheckIn() {
  const { state } = useUser();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);

  const cycleWeeks = getCycleWeeks(state.cycle || 1);
  const currentWeekContent = cycleWeeks.find(c => c.id === state.currentWeek);
  const response = selected ? responses[selected] : null;
  const selectedFeeling = selected ? feelings.find(f => f.key === selected) : null;

  const handleContinue = () => {
    if (!response?.dest) return;
    if (response.dest.route === 'pause') {
      navigate('/dashboard?pause=true');
    } else {
      navigate(`/modules/${state.currentWeek}`);
    }
  };

  return (
    <div className="max-w-lg mx-auto pb-20">
      <AnimatePresence mode="wait">

        {/* ── Feeling Selector ── */}
        {!selected && (
          <motion.div
            key="select"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {/* Header */}
            <div className="mb-10">
              <p className="text-xs font-semibold tracking-[0.2em] text-[#c0736a] uppercase mb-2">
                Daily Compass
              </p>
              <h1 className="text-4xl font-serif text-sage-900 leading-tight mb-2">
                How are you<br />carrying yourself?
              </h1>
              <div className="w-12 h-0.5 bg-[#c0736a] opacity-40 mt-4" />
            </div>

            {/* Feeling grid */}
            <div className="grid grid-cols-2 gap-3">
              {feelings.map((f, i) => (
                <motion.button
                  key={f.key}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  onClick={() => setSelected(f.key)}
                  className={`group relative ${f.color} border ${f.accent} rounded-2xl p-5 text-left transition-all duration-200 hover:shadow-md hover:-translate-y-0.5`}
                >
                  {/* Icon */}
                  <div className={`${f.textColor} mb-3`}>
                    {f.icon}
                  </div>
                  {/* Label */}
                  <p className="font-serif text-sage-900 text-[15px] leading-snug mb-0.5">
                    {f.label}
                  </p>
                  <p className="text-xs text-sage-400 leading-snug">
                    {f.sub}
                  </p>
                  {/* Hover arrow */}
                  <span className={`absolute top-4 right-4 ${f.textColor} opacity-0 group-hover:opacity-60 transition-opacity text-lg`}>
                    →
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Current week context */}
            {currentWeekContent && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-6 flex items-center gap-3 bg-white rounded-xl border border-sage-100 px-4 py-3"
              >
                <div className="w-1.5 h-8 bg-[#c0736a] rounded-full opacity-60" />
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-sage-400 uppercase">
                    This week's anchor
                  </p>
                  <p className="text-sm font-serif text-sage-700">
                    Week {state.currentWeek} — {currentWeekContent.title}
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* ── Response View ── */}
        {selected && response && (
          <motion.div
            key="response"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="space-y-4"
          >
            {/* Back + badge row */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setSelected(null)}
                className="flex items-center gap-1.5 text-sage-400 hover:text-sage-600 transition-colors text-sm"
              >
                <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
                  <path d="M12 4L6 10l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Back
              </button>
              <span className={`text-xs font-bold tracking-wider px-3 py-1.5 rounded-full ${response.badgeStyle}`}>
                {response.badge}
              </span>
            </div>

            {/* Feeling indicator */}
            {selectedFeeling && (
              <div className={`${selectedFeeling.color} border ${selectedFeeling.accent} rounded-2xl px-5 py-4 flex items-center gap-4`}>
                <div className={selectedFeeling.textColor}>
                  {selectedFeeling.icon}
                </div>
                <div>
                  <p className="font-serif text-sage-900 text-base">{selectedFeeling.label}</p>
                  <p className="text-xs text-sage-400">{selectedFeeling.sub}</p>
                </div>
              </div>
            )}

            {/* Response card */}
            <div className="bg-white rounded-2xl border border-sage-100 p-6 shadow-sm">
              <p className="font-serif text-sage-800 leading-relaxed text-[15px] mb-5">
                {response.text}
              </p>

              {/* Exercise */}
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#c0736a] rounded-full" />
                <div className="pl-5">
                  <p className="text-[10px] font-bold tracking-[0.15em] text-[#c0736a] uppercase mb-2">
                    Try this
                  </p>
                  <p className="text-sm text-sage-700 leading-relaxed italic">
                    {response.exercise}
                  </p>
                </div>
              </div>
            </div>

            {/* Crisis resources */}
            {response.isCrisis && (
              <div className="bg-red-50 border border-red-100 rounded-2xl p-5 space-y-2">
                <p className="text-xs font-bold tracking-widest text-red-600 uppercase mb-3">
                  Reach out now
                </p>
                {[
                  { num: '988', desc: 'Suicide & Crisis Lifeline — call or text' },
                  { num: '741741', desc: 'Crisis Text Line — text HOME' },
                  { num: '911', desc: 'If you are in immediate danger' },
                ].map(r => (
                  <div key={r.num} className="flex items-baseline gap-3">
                    <span className="font-serif text-red-700 font-semibold text-base w-16 flex-shrink-0">{r.num}</span>
                    <span className="text-sm text-red-600">{r.desc}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Destination + continue */}
            {response.dest && (
              <div className="space-y-3">
                <div className="bg-[#faf4f0] rounded-xl border border-[#ead5c8] px-5 py-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#c0736a] bg-opacity-10 border border-[#c0736a] border-opacity-20 flex items-center justify-center flex-shrink-0">
                    {response.dest.route === 'pause' ? (
                      <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="#c0736a" opacity="0.7"/>
                        <circle cx="12" cy="12" r="2" fill="#c0736a"/>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
                        <path d="M4 6h16M4 10h16M4 14h10M4 18h7" stroke="#c0736a" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest text-[#a0685a] uppercase">
                      Where you're headed
                    </p>
                    <p className="font-serif text-[#4a2e24] text-sm mt-0.5">
                      {response.dest.route === 'module'
                        ? `Week ${state.currentWeek} — ${currentWeekContent?.title}`
                        : 'Daily Pause'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleContinue}
                  className="w-full bg-[#4a2e24] text-white py-4 rounded-xl font-serif text-base hover:bg-[#3a2018] transition-all hover:shadow-lg flex items-center justify-center gap-2"
                >
                  {response.dest.label}
                  <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
                    <path d="M4 10h12M11 5l5 5-5 5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            )}
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
