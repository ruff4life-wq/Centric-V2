import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { motion, AnimatePresence } from 'motion/react';
import { getCycleWeeks } from '../data/curriculum';

// ─── Daily Quotes ────────────────────────────────────────────────────────────
// Date-seeded so everyone sees the same quote on the same day.
// Dr. G can add her own quotes to this array over time.
const quotes = [
  { text: "You cannot pour from an empty vessel. Filling yourself is not selfishness — it's stewardship.", author: "AGC" },
  { text: "The most radical act a helper can commit is allowing themselves to be helped.", author: "AGC" },
  { text: "Rest is not the reward for finished work. Rest is part of the work.", author: "AGC" },
  { text: "You were called to this work. You were not called to be consumed by it.", author: "AGC" },
  { text: "Burnout is not a sign of weakness. It is a sign that you have been strong for too long without being held.", author: "AGC" },
  { text: "The compassion you give so freely — you are allowed to receive it too.", author: "AGC" },
  { text: "Healing is not linear. Neither is the journey of the one who walks beside others through it.", author: "AGC" },
  { text: "A tree does not grow by working harder. It grows by sending roots deeper.", author: "AGC" },
  { text: "You are not failing your clients when you take care of yourself. You are modeling what you teach.", author: "AGC" },
  { text: "The present moment is where God meets us. Not in the next task. Not after the next session. Now.", author: "AGC" },
  { text: "What you carry from the room after a session matters as much as what you brought into it.", author: "AGC" },
  { text: "Boundaries are not walls. They are doors — and you hold the handle.", author: "AGC" },
  { text: "You do not have to earn rest. You were made to need it.", author: "AGC" },
  { text: "The work you do in the unseen places — the reflection, the prayer, the pause — this is the real work.", author: "AGC" },
  { text: "You are not responsible for the outcomes. You are responsible for your presence.", author: "AGC" },
  { text: "Even Elijah needed to eat and sleep before God could speak to him again.", author: "Scripture · 1 Kings 19" },
  { text: "Come to me, all who are weary and burdened, and I will give you rest.", author: "Matthew 11:28" },
  { text: "Those who wait on the Lord shall renew their strength.", author: "Isaiah 40:31" },
  { text: "Be still, and know that I am God.", author: "Psalm 46:10" },
  { text: "She is clothed with strength and dignity, and she laughs without fear of the future.", author: "Proverbs 31:25" },
  { text: "Guard your heart above all else, for it determines the course of your life.", author: "Proverbs 4:23" },
  { text: "Do not be conformed to this world, but be transformed by the renewal of your mind.", author: "Romans 12:2" },
  { text: "I can do all things through Christ who strengthens me.", author: "Philippians 4:13" },
  { text: "The Lord is close to the brokenhearted and saves those who are crushed in spirit.", author: "Psalm 34:18" },
  { text: "Healing takes courage, and we all have courage, even if we have to dig a little to find it.", author: "Tori Amos" },
  { text: "Almost everything will work again if you unplug it for a few minutes — including you.", author: "Anne Lamott" },
  { text: "You don't have to be positive all the time. It's perfectly okay to feel sad, angry, annoyed, frustrated, scared, or anxious.", author: "Lori Deschene" },
  { text: "Owning our story and loving ourselves through that process is the bravest thing we'll ever do.", author: "Brené Brown" },
  { text: "Caring for myself is not self-indulgence, it is self-preservation.", author: "Audre Lorde" },
  { text: "You yourself, as much as anybody in the entire universe, deserve your love and affection.", author: "Buddha" },
  { text: "In the middle of difficulty lies opportunity — for growth, for understanding, for grace.", author: "AGC" },
  { text: "What gets watered, grows. What gets neglected, withers. Water yourself today.", author: "AGC" },
  { text: "The pause between one breath and the next — that is where restoration lives.", author: "AGC" },
  { text: "You were known before you were formed. Your calling is not what you do for God. It is who you are with God.", author: "AGC" },
  { text: "Not all progress is visible. Some of the most important growth happens underground, in the roots.", author: "AGC" },
  { text: "The goal is not to be unaffected. The goal is to be unmoved from your center.", author: "AGC" },
  { text: "Restoration is not a destination. It is a direction. Keep facing it.", author: "AGC" },
  { text: "Your story is not over. This week is not the whole chapter. Keep writing.", author: "AGC" },
  { text: "What would it mean to show up for yourself today the way you show up for everyone else?", author: "AGC" },
  { text: "God's mercies are new every morning. So is your capacity to begin again.", author: "Lamentations 3:22–23" },
];

// Daily intentions per week — 7 per week, tied to the pillar
const weeklyIntentions: Record<number, string[]> = {
  1: [
    "Today, notice one way your body is asking for care.",
    "Today, take one intentional breath before each new task.",
    "Today, honor one physical boundary you've been overriding.",
    "Today, thank your body for one thing it does without being asked.",
    "Today, rest without justifying it.",
    "Today, nourish yourself as carefully as you nourish others.",
    "Today, move your body in one small, gentle way.",
  ],
  2: [
    "Today, name one emotion before you react to it.",
    "Today, notice the thoughts that drain you — and don't follow them.",
    "Today, let one feeling be present without trying to fix it.",
    "Today, speak to yourself as kindly as you would to a client.",
    "Today, take a 2-minute pause when overwhelm arrives.",
    "Today, invite God into one emotion you've been carrying alone.",
    "Today, celebrate one small inner victory.",
  ],
  3: [
    "Today, listen to one person without planning your response.",
    "Today, say one true thing in a relationship that needs honesty.",
    "Today, release one expectation of someone you love.",
    "Today, practice one act of presence — phones down, eyes up.",
    "Today, say no to one thing to say yes to someone that matters.",
    "Today, forgive one small thing — even if only in your heart.",
    "Today, let someone take care of you.",
  ],
  4: [
    "Today, begin your work with one minute of intention.",
    "Today, notice when your work shifts from calling to compulsion.",
    "Today, leave work at the time you planned.",
    "Today, find one small thing about your work to be grateful for.",
    "Today, delegate or decline one thing you don't need to carry.",
    "Today, bring your full self to one task — not a fraction.",
    "Today, ask: am I working for God or for approval?",
  ],
  5: [
    "Today, make one financial decision from trust, not fear.",
    "Today, practice gratitude for one resource you take for granted.",
    "Today, notice where money anxiety shows up in your body.",
    "Today, give something — however small — without expecting return.",
    "Today, review one financial area with honesty and grace.",
    "Today, release one money worry to God in prayer.",
    "Today, celebrate one way you have been a faithful steward.",
  ],
  6: [
    "Today, begin with God before beginning anything else.",
    "Today, notice where your life feels most aligned.",
    "Today, ask: what is God inviting me into right now?",
    "Today, live one of your stated values in a specific, concrete way.",
    "Today, be still — even for two minutes.",
    "Today, reflect on how far you have come.",
    "Today, step forward in obedience to one thing you already know.",
  ],
};

// ─── SVG Icons (same as CheckIn) ─────────────────────────────────────────────
const WaveIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" width="24" height="24">
    <path d="M4 22c2-4 4-6 6-6s4 4 6 4 4-6 6-6 4 4 6 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 30c2-4 4-6 6-6s4 4 6 4 4-6 6-6 4 4 6 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
  </svg>
);
const RockIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" width="24" height="24">
    <path d="M8 28c0 0 3-12 7-14 2-1 4 0 5 2 1-3 3-6 6-6 4 0 6 4 6 8 0 6-4 10-10 10H14c-3 0-6-2-6-4z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
  </svg>
);
const MirrorIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" width="24" height="24">
    <rect x="12" y="6" width="16" height="20" rx="8" stroke="currentColor" strokeWidth="2.2"/>
    <path d="M20 26v8M16 34h8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
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
    <path d="M24 16l-3 8-5-5 8-3z" fill="currentColor" opacity="0.8"/>
  </svg>
);
const LifelineIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" width="24" height="24">
    <circle cx="20" cy="20" r="13" stroke="currentColor" strokeWidth="2.2"/>
    <path d="M13 20h4l2-5 4 10 2-5h4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const feelings = [
  { key: 'overwhelmed', label: 'Overwhelmed', sub: 'Too much, too fast', color: 'bg-blue-50', accent: 'border-blue-200 hover:border-blue-400', textColor: 'text-blue-700', icon: <WaveIcon /> },
  { key: 'stuck', label: 'Stuck', sub: 'Not making progress', color: 'bg-amber-50', accent: 'border-amber-200 hover:border-amber-400', textColor: 'text-amber-700', icon: <RockIcon /> },
  { key: 'failing', label: 'Not enough', sub: 'Failing my clients', color: 'bg-rose-50', accent: 'border-rose-200 hover:border-rose-400', textColor: 'text-rose-700', icon: <MirrorIcon /> },
  { key: 'disconnected', label: 'Disconnected', sub: 'Going through motions', color: 'bg-slate-50', accent: 'border-slate-200 hover:border-slate-400', textColor: 'text-slate-600', icon: <CloudIcon /> },
  { key: 'values', label: 'Values check', sub: 'Am I on track?', color: 'bg-emerald-50', accent: 'border-emerald-200 hover:border-emerald-400', textColor: 'text-emerald-700', icon: <CompassIcon /> },
  { key: 'crisis', label: 'In crisis', sub: 'I need real help', color: 'bg-red-50', accent: 'border-red-200 hover:border-red-400', textColor: 'text-red-700', icon: <LifelineIcon /> },
];

const responses: Record<string, { badge: string; badgeStyle: string; text: string; exercise: string; dest?: { label: string; route: 'pause' | 'module' }; isCrisis?: boolean }> = {
  overwhelmed: { badge: 'ACT · Acceptance', badgeStyle: 'bg-blue-50 text-blue-700 border border-blue-100', text: 'Overwhelm often signals that you are caring deeply — and that your nervous system is doing its job. You don\'t have to fix the feeling. You just have to make room for it.', exercise: 'Place one hand on your chest. Breathe in for 4 counts, out for 6. As you exhale, silently say: "I can hold this." Repeat three times.', dest: { label: 'Take me to the Daily Pause', route: 'pause' } },
  stuck: { badge: 'ACT · Committed Action', badgeStyle: 'bg-amber-50 text-amber-700 border border-amber-100', text: 'Feeling stuck isn\'t failure — it\'s information. There\'s a value underneath that matters to you, and something blocking the path toward it.', exercise: 'Ask yourself: "What would I be doing right now if I weren\'t stuck?" Write one word. That word points toward a value. Take one tiny step in that direction today.', dest: { label: 'Continue this week\'s module', route: 'module' } },
  failing: { badge: 'ACT · Defusion', badgeStyle: 'bg-rose-50 text-rose-700 border border-rose-100', text: 'Your mind is telling you a story about not being enough. That story feels very real — but notice it is a thought, not a fact.', exercise: 'Say the thought out loud. Now say it again with "I\'m having the thought that..." in front of it. Notice the small distance that creates.', dest: { label: 'Continue this week\'s module', route: 'module' } },
  disconnected: { badge: 'ACT · Present Moment', badgeStyle: 'bg-slate-50 text-slate-600 border border-slate-100', text: 'Disconnection is often the mind\'s way of protecting you from feeling too much. It\'s not a flaw — it\'s a signal to come back to your body.', exercise: 'Name 5 things you can see. 4 you can touch. 3 you can hear. 2 you can smell. 1 thing you are grateful for. Welcome back.', dest: { label: 'Take me to the Daily Pause', route: 'pause' } },
  values: { badge: 'ACT · Values', badgeStyle: 'bg-emerald-50 text-emerald-700 border border-emerald-100', text: 'Checking in with your values is one of the most courageous things a helping professional can do. It takes honesty to ask — "am I living what I believe?"', exercise: 'Ask: "In the last 7 days, did my actions reflect what I say matters most?" Not to judge — just to see. What one small thing could bring more alignment this week?', dest: { label: 'Continue this week\'s module', route: 'module' } },
  crisis: { badge: 'Please read', badgeStyle: 'bg-red-50 text-red-700 border border-red-100', text: 'It takes real courage to name that you\'re in crisis. Please reach out to a real person right now — your supervisor, a trusted colleague, or one of the crisis lines below.', exercise: 'Call or text 988 (Suicide & Crisis Lifeline). Text HOME to 741741 (Crisis Text Line). This app cannot provide the level of care you deserve right now.', isCrisis: true },
};

// Date-seeded quote selector
function getDailyQuote() {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  return quotes[seed % quotes.length];
}

// Day-of-week intention selector (0=Mon, 6=Sun)
function getDailyIntention(weekId: number): string {
  const intentions = weeklyIntentions[weekId] || weeklyIntentions[1];
  const day = new Date().getDay(); // 0=Sun, 6=Sat
  const idx = day === 0 ? 6 : day - 1;
  return intentions[idx];
}

export default function Today() {
  const { state, recordCheckIn, daysIntoWeek } = useUser();
  const navigate = useNavigate();
  const [checkInDone, setCheckInDone] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResponse, setShowResponse] = useState(false);

  const cycleWeeks = getCycleWeeks(state.cycle || 1);
  const currentWeekContent = cycleWeeks.find(c => c.id === state.currentWeek);
  const quote = getDailyQuote();
  const intention = getDailyIntention(state.currentWeek);
  const day = daysIntoWeek();
  const today = new Date().toISOString().split('T')[0];
  const alreadyCheckedIn = state.lastCheckInDate === today;
  const response = selected ? responses[selected] : null;

  const handleSelectFeeling = (key: string) => {
    setSelected(key);
    recordCheckIn(key);
    setShowResponse(true);
  };

  const handleContinue = () => {
    if (!response?.dest) return;
    if (response.dest.route === 'pause') {
      navigate('/dashboard?pause=true');
    } else {
      navigate(`/modules/${state.currentWeek}`);
    }
  };

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="max-w-lg mx-auto pb-24 space-y-6">

      {/* ── Greeting ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <p className="text-xs font-semibold tracking-[0.2em] text-[#c0736a] uppercase mb-1">
          Cycle {state.cycle || 1} · Week {state.currentWeek} · Day {day} of 7
        </p>
        <h1 className="text-3xl font-serif text-sage-900">
          {greeting()}, {state.name || 'friend'}.
        </h1>
      </motion.div>

      {/* ── Daily Quote ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08 }}
        className="bg-[#4a2e24] rounded-2xl p-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white opacity-5 -mr-8 -mt-8" />
        <p className="text-xs font-bold tracking-widest text-[#c0736a] uppercase mb-3">Today's Word</p>
        <p className="font-serif text-white text-lg leading-relaxed mb-3 relative z-10">
          "{quote.text}"
        </p>
        <p className="text-sm text-[#c0a090] font-serif italic">— {quote.author}</p>
      </motion.div>

      {/* ── Daily Intention ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.14 }}
        className="bg-white rounded-2xl border border-sage-100 p-5 flex gap-4 items-start"
      >
        <div className="w-1 self-stretch bg-[#c0736a] rounded-full opacity-60 flex-shrink-0" />
        <div>
          <p className="text-[10px] font-bold tracking-widest text-sage-400 uppercase mb-1.5">
            Today's Intention
          </p>
          <p className="font-serif text-sage-800 text-base leading-relaxed">
            {intention}
          </p>
          {currentWeekContent && (
            <p className="text-xs text-sage-400 mt-2">
              Week {state.currentWeek} · {currentWeekContent.title}
            </p>
          )}
        </div>
      </motion.div>

      {/* ── Daily Check In ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <AnimatePresence mode="wait">

          {/* Already checked in today */}
          {alreadyCheckedIn && !showResponse && (
            <motion.div
              key="done"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
                  <path d="M5 13l4 4L19 7" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="font-serif text-emerald-800 text-sm">You've already checked in today.</p>
                <button
                  onClick={() => { setCheckInDone(false); }}
                  className="text-xs text-emerald-600 underline mt-0.5 hover:text-emerald-800"
                >
                  Check in again
                </button>
              </div>
            </motion.div>
          )}

          {/* Feeling selector */}
          {(!alreadyCheckedIn || checkInDone === false && !showResponse) && !alreadyCheckedIn && (
            <motion.div key="checkin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="mb-4">
                <p className="text-xs font-bold tracking-[0.2em] text-sage-400 uppercase mb-1">Daily Check In</p>
                <p className="font-serif text-sage-700 text-lg">How are you carrying yourself?</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {feelings.map((f, i) => (
                  <motion.button
                    key={f.key}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => handleSelectFeeling(f.key)}
                    className={`group ${f.color} border ${f.accent} rounded-xl p-3 text-left transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5`}
                  >
                    <div className={`${f.textColor} mb-2`}>{f.icon}</div>
                    <p className="font-serif text-sage-900 text-xs leading-snug">{f.label}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Response */}
          {showResponse && response && (
            <motion.div
              key="response"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold tracking-wider px-3 py-1.5 rounded-full ${response.badgeStyle}`}>
                  {response.badge}
                </span>
                <button onClick={() => setShowResponse(false)} className="text-xs text-sage-400 hover:text-sage-600">
                  ← different feeling
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-sage-100 p-5">
                <p className="font-serif text-sage-800 text-sm leading-relaxed mb-4">{response.text}</p>
                <div className="pl-4 border-l-2 border-[#c0736a]">
                  <p className="text-[10px] font-bold tracking-widest text-[#c0736a] uppercase mb-1">Try this</p>
                  <p className="text-xs text-sage-700 italic leading-relaxed">{response.exercise}</p>
                </div>
              </div>

              {response.isCrisis && (
                <div className="bg-red-50 border border-red-100 rounded-xl p-4 space-y-1.5">
                  {[{ num: '988', desc: 'Suicide & Crisis Lifeline' }, { num: '741741', desc: 'Text HOME — Crisis Text Line' }, { num: '911', desc: 'Immediate danger' }].map(r => (
                    <div key={r.num} className="flex gap-3 items-baseline">
                      <span className="font-serif font-semibold text-red-700 w-14 flex-shrink-0">{r.num}</span>
                      <span className="text-xs text-red-600">{r.desc}</span>
                    </div>
                  ))}
                </div>
              )}

              {response.dest && (
                <button
                  onClick={handleContinue}
                  className="w-full bg-[#4a2e24] text-white py-3.5 rounded-xl font-serif text-sm hover:bg-[#3a2018] transition-colors flex items-center justify-center gap-2"
                >
                  {response.dest.label}
                  <svg viewBox="0 0 20 20" fill="none" width="14" height="14">
                    <path d="M4 10h12M11 5l5 5-5 5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </motion.div>

      {/* ── Week anchor ── */}
      {currentWeekContent && (
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.28 }}
          onClick={() => navigate(`/modules/${state.currentWeek}`)}
          className="w-full bg-white border border-sage-100 rounded-2xl p-5 text-left hover:border-[#c0736a] hover:shadow-sm transition-all group"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold tracking-widest text-sage-400 uppercase mb-1">This Week's Anchor</p>
              <p className="font-serif text-sage-900 text-base">Week {state.currentWeek} — {currentWeekContent.title}</p>
              <p className="text-xs text-sage-400 mt-0.5 italic">{currentWeekContent.pillar}</p>
            </div>
            <svg viewBox="0 0 20 20" fill="none" width="18" height="18" className="text-sage-300 group-hover:text-[#c0736a] transition-colors flex-shrink-0">
              <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </motion.button>
      )}

    </div>
  );
}
