import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { motion, AnimatePresence } from 'motion/react';
import { curriculum } from '../data/curriculum';

interface Feeling {
  key: string;
  icon: string;
  label: string;
  sub: string;
}

interface Response {
  badge: string;
  badgeColor: string;
  text: string;
  exercise: string;
  dest?: {
    icon: string;
    label: string;
    route: 'pause' | 'module';
  };
  isCrisis?: boolean;
}

const feelings: Feeling[] = [
  { key: 'overwhelmed', icon: '🌊', label: 'Overwhelmed', sub: 'Too much, too fast' },
  { key: 'stuck',       icon: '🪨', label: 'Stuck',       sub: 'Not making progress' },
  { key: 'failing',     icon: '🪞', label: 'Not enough',  sub: 'Failing my clients' },
  { key: 'disconnected',icon: '🌫', label: 'Disconnected',sub: 'Going through motions' },
  { key: 'values',      icon: '🧭', label: 'Values check',sub: 'Am I on track?' },
  { key: 'crisis',      icon: '🆘', label: 'In crisis',   sub: 'I need real help' },
];

const responses: Record<string, Response> = {
  overwhelmed: {
    badge: 'ACT · Acceptance',
    badgeColor: 'bg-orange-50 text-orange-800',
    text: 'Overwhelm often signals that you are caring deeply — and that your nervous system is doing its job. You don\'t have to fix the feeling. You just have to make room for it.',
    exercise: 'Place one hand on your chest. Breathe in for 4 counts, out for 6. As you exhale, silently say: "I can hold this." Repeat three times. You don\'t have to carry it perfectly — just carry it.',
    dest: { icon: '🫁', label: 'Take me to the Daily Pause', route: 'pause' },
  },
  stuck: {
    badge: 'ACT · Committed Action',
    badgeColor: 'bg-amber-50 text-amber-800',
    text: 'Feeling stuck isn\'t failure — it\'s information. It usually means there\'s a value underneath that matters to you, and something is blocking the path toward it.',
    exercise: 'Ask yourself: "What would I be doing right now if I weren\'t stuck?" Write one word. That word points toward a value. What is one tiny step — even five minutes — I could take in that direction today?',
    dest: { icon: '📖', label: 'Continue this week\'s module', route: 'module' },
  },
  failing: {
    badge: 'ACT · Defusion',
    badgeColor: 'bg-rose-50 text-rose-800',
    text: 'Your mind is telling you a story about not being enough. That story feels very real — but notice it is a thought, not a fact.',
    exercise: 'Say the thought out loud. Now say it again with this in front of it: "I\'m having the thought that..." Notice the small distance that creates. You are not the thought. You are the one who can observe it.',
    dest: { icon: '📖', label: 'Continue this week\'s module', route: 'module' },
  },
  disconnected: {
    badge: 'ACT · Present Moment',
    badgeColor: 'bg-sky-50 text-sky-800',
    text: 'Disconnection is often the mind\'s way of protecting you from feeling too much. It\'s not a flaw — it\'s a signal to come back to your body.',
    exercise: 'Name 5 things you can see right now. 4 you can touch. 3 you can hear. 2 you can smell. 1 thing you are grateful for in this moment. Welcome back.',
    dest: { icon: '🫁', label: 'Take me to the Daily Pause', route: 'pause' },
  },
  values: {
    badge: 'ACT · Values',
    badgeColor: 'bg-sage-50 text-sage-800',
    text: 'Checking in with your values is one of the most courageous things a helping professional can do. It takes honesty to ask — "am I living what I believe?"',
    exercise: 'Think of the pillar you\'re currently working on. Ask: "In the last 7 days, did my actions reflect what I say matters most?" Not to judge — just to see. What one small thing could bring more alignment this week?',
    dest: { icon: '📖', label: 'Continue this week\'s module', route: 'module' },
  },
  crisis: {
    badge: 'Please read',
    badgeColor: 'bg-red-50 text-red-800',
    text: 'It takes real courage to name that you\'re in crisis. Please reach out to a real person right now — your supervisor, a trusted colleague, or one of the crisis lines below.',
    exercise: 'Call or text 988 (Suicide & Crisis Lifeline). You can also text HOME to 741741 (Crisis Text Line). This app is a wellness companion — it cannot provide the level of care you deserve right now. Please don\'t navigate this alone.',
    isCrisis: true,
  },
};

export default function CheckIn() {
  const { state } = useUser();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);

  const currentWeekContent = curriculum.find(c => c.id === state.currentWeek);
  const response = selected ? responses[selected] : null;

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
        {!selected ? (
          <motion.div
            key="select"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
          >
            <header className="mb-8">
              <h1 className="text-3xl font-serif text-sage-900 mb-1">Check In</h1>
              <p className="text-sage-500 italic">How are you carrying yourself today?</p>
            </header>

            <p className="text-xs font-bold tracking-widest text-sage-400 uppercase mb-4">
              I am feeling...
            </p>

            <div className="grid grid-cols-2 gap-3">
              {feelings.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setSelected(f.key)}
                  className="bg-white border border-sage-100 rounded-2xl p-4 text-left hover:border-[#c0736a] hover:bg-[#fdf0ec] transition-all shadow-sm"
                >
                  <span className="text-2xl block mb-2">{f.icon}</span>
                  <span className="font-serif text-sage-900 block text-sm">{f.label}</span>
                  <span className="text-xs text-sage-400 block mt-0.5">{f.sub}</span>
                </button>
              ))}
            </div>
          </motion.div>

        ) : (
          <motion.div
            key="response"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
          >
            {/* ACT Badge */}
            <span className={`inline-block text-xs font-bold tracking-wider px-3 py-1.5 rounded-full mb-5 ${response!.badgeColor}`}>
              {response!.badge}
            </span>

            {/* Response card */}
            <div className="bg-white rounded-2xl border border-sage-100 p-6 shadow-sm mb-4">
              <p className="font-serif text-sage-800 leading-relaxed text-base mb-5">
                {response!.text}
              </p>

              {/* Exercise */}
              <div className="border-l-4 border-[#c0736a] bg-[#fdf6f2] rounded-r-xl px-4 py-4">
                <p className="text-xs font-bold tracking-widest text-[#c0736a] uppercase mb-2">
                  Try this
                </p>
                <p className="text-sm text-[#6a3828] leading-relaxed italic">
                  {response!.exercise}
                </p>
              </div>
            </div>

            {/* Crisis banner */}
            {response!.isCrisis && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4 text-sm text-red-800 leading-relaxed">
                <strong>988</strong> — Suicide & Crisis Lifeline (call or text)<br />
                <strong>741741</strong> — Crisis Text Line (text HOME)<br />
                <strong>911</strong> — If you are in immediate danger
              </div>
            )}

            {/* Destination card + continue button */}
            {response!.dest && (
              <div className="mb-3">
                <div className="bg-[#f5ede8] rounded-xl p-4 flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#c0736a] flex items-center justify-center text-lg flex-shrink-0">
                    {response!.dest.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-widest text-[#a0685a] uppercase mb-0.5">
                      Where you're headed
                    </p>
                    <p className="font-serif text-[#4a2e24] text-sm">
                      {response!.dest.route === 'module'
                        ? `Week ${state.currentWeek} — ${currentWeekContent?.title}`
                        : 'Daily Pause'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleContinue}
                  className="w-full bg-[#c0736a] text-white py-4 rounded-xl font-serif text-base hover:bg-[#a05a52] transition-colors"
                >
                  {response!.dest.label} →
                </button>
              </div>
            )}

            {/* Back */}
            <button
              onClick={() => setSelected(null)}
              className="w-full py-3 border border-sage-200 rounded-xl text-sage-500 text-sm hover:bg-sage-50 hover:border-sage-300 transition-colors"
            >
              ← Choose a different feeling
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
