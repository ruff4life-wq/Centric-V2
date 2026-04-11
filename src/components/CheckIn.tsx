import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { motion, AnimatePresence } from 'motion/react';
import { getCycleWeeks } from '../data/curriculum';
import { feelings, responses } from '../data/feelingsData';


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
                    Week {state.currentWeek}, {currentWeekContent.title}
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
                  { num: '988', desc: 'Suicide & Crisis Lifeline, call or text' },
                  { num: '741741', desc: 'Crisis Text Line, text HOME' },
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
                        ? `Week ${state.currentWeek}, ${currentWeekContent?.title}`
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
