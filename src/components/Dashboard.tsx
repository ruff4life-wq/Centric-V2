import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { getCycleWeeks, cycles } from '../data/curriculum';
import { motion } from 'motion/react';
import { CheckCircle, Lock, PauseCircle, RotateCcw } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import DailyPause from './DailyPause';
import { cn } from '../lib/utils';

const pillarColors: Record<string, string> = {
  'Physical Health': '#c0736a',
  'Mental/Emotional': '#7b9ea8',
  'Relationships': '#9a7db8',
  'Career/Work': '#c4a55a',
  'Finances': '#6aab8a',
  'Spirituality': '#d4856a',
};

function getRange(score: number): { label: string; color: string } {
  if (score <= 3) return { label: 'Needs Care', color: '#ef4444' };
  if (score <= 6) return { label: 'Growing', color: '#f59e0b' };
  return { label: 'Thriving', color: '#10b981' };
}

function WheelChart({ wheel }: { wheel: Record<string, number> }) {
  const entries = Object.entries(wheel);
  const cx = 130, cy = 130, maxR = 100;

  const points = entries.map((_, i) => {
    const angle = (i / entries.length) * 2 * Math.PI - Math.PI / 2;
    return { angle };
  });

  const spokePoints = points.map(({ angle }, i) => {
    const value = entries[i][1] as number;
    const r = (value / 10) * maxR;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  });

  const outerPoints = points.map(({ angle }) => ({
    x: cx + maxR * Math.cos(angle),
    y: cy + maxR * Math.sin(angle),
  }));

  const polygonPath = spokePoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + ' Z';
  const outerPath = outerPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + ' Z';

  return (
    <svg viewBox="0 0 260 260" className="w-full max-w-[220px] mx-auto">
      {[2, 4, 6, 8, 10].map(ring => (
        <polygon
          key={ring}
          points={points.map(({ angle }) => {
            const r = (ring / 10) * maxR;
            return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
          }).join(' ')}
          fill="none" stroke="#e8e0d8" strokeWidth="0.8"
        />
      ))}
      {outerPoints.map((p, i) => (
        <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#e8e0d8" strokeWidth="0.8" />
      ))}
      <path d={outerPath} fill="none" stroke="#d0c8be" strokeWidth="1" />
      <path d={polygonPath} fill="#c0736a" fillOpacity="0.2" stroke="#c0736a" strokeWidth="2" strokeLinejoin="round" />
      {spokePoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="#c0736a" />
      ))}
      {outerPoints.map((p, i) => {
        const [key] = entries[i];
        const angle = points[i].angle;
        const labelR = maxR + 20;
        const lx = cx + labelR * Math.cos(angle);
        const ly = cy + labelR * Math.sin(angle);
        const anchor = Math.cos(angle) > 0.15 ? 'start' : Math.cos(angle) < -0.15 ? 'end' : 'middle';
        const short = key.split('/')[0].replace(' Health', '');
        return (
          <text key={i} x={lx} y={ly + 4} textAnchor={anchor} fontSize="8.5" fill="#6b5a4e" fontFamily="Georgia, serif">
            {short}
          </text>
        );
      })}
    </svg>
  );
}

export default function Dashboard() {
  const { state } = useUser();
  const cycleWeeks = getCycleWeeks(state.cycle || 1);
  const currentCycle = cycles.find(c => c.cycle === (state.cycle || 1));
  const [searchParams] = useSearchParams();
  const [showPause, setShowPause] = useState(() => searchParams.get('pause') === 'true');
  const [showReassess, setShowReassess] = useState(false);

  const wheel = state.assessment.wheelOfLife;
  const entries = Object.entries(wheel);
  const avg = Math.round(entries.reduce((s, [, v]) => s + (v as number), 0) / entries.length);
  const avgRange = getRange(avg);
  const history = state.assessmentHistory || [];

  return (
    <div className="space-y-8 pb-20 max-w-2xl mx-auto">
      <DailyPause isOpen={showPause} onClose={() => setShowPause(false)} />

      {/* Header */}
      <header>
        <p className="text-xs font-bold tracking-widest text-[#c0736a] uppercase mb-1">
          Progress
        </p>
        <h1 className="text-3xl font-serif text-sage-900">
          Your Journey, {state.name}.
        </h1>
        <p className="text-sage-500 text-sm mt-1">
          Cycle {state.cycle || 1}, {currentCycle?.theme}
        </p>
      </header>

      {/* Daily Pause */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="bg-[#4a2e24] rounded-2xl p-5 text-white cursor-pointer relative overflow-hidden"
        onClick={() => setShowPause(true)}
      >
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white opacity-5 -mr-10 -mt-10" />
        <div className="flex items-center gap-3 relative z-10">
          <PauseCircle className="text-[#c0a090]" size={20} />
          <div className="flex-1">
            <p className="font-serif text-base">Daily Pause</p>
            <p className="text-xs text-[#c0a090] mt-0.5">
              2 minutes. Breathe. Name your emotion. Invite God in.
            </p>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); setShowPause(true); }}
            className="bg-white text-[#4a2e24] px-4 py-1.5 rounded-full text-xs font-medium hover:bg-[#f0e8e0] transition-colors flex-shrink-0"
          >
            Begin
          </button>
        </div>
      </motion.div>

      {/* Wheel of Life Current */}
      <section className="bg-white rounded-2xl border border-sage-100 p-6 shadow-sm">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs font-bold tracking-widest text-sage-400 uppercase mb-1">
              Wheel of Life
            </p>
            <h2 className="text-xl font-serif text-sage-900">Current Scores</h2>
          </div>
          <div className="text-right">
            <p className="text-2xl font-serif font-bold" style={{ color: avgRange.color }}>
              {avg}/10
            </p>
            <p className="text-xs font-bold" style={{ color: avgRange.color }}>
              {avgRange.label}
            </p>
          </div>
        </div>

        <WheelChart wheel={wheel} />

        {/* Bar breakdown */}
        <div className="space-y-2.5 mt-4">
          {entries.map(([key, value]) => {
            const range = getRange(value as number);
            const color = pillarColors[key] || '#c0736a';
            const pct = ((value as number) / 10) * 100;
            return (
              <div key={key}>
                <div className="flex justify-between items-center mb-0.5">
                  <span className="text-xs font-serif text-sage-700">{key}</span>
                  <span className="text-xs font-bold" style={{ color: range.color }}>
                    {value}/10, {range.label}
                  </span>
                </div>
                <div className="h-1.5 bg-sage-50 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full rounded-full"
                    style={{ background: color }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Re-assessment link */}
        <button
          onClick={() => setShowReassess(true)}
          className="mt-5 w-full flex items-center justify-center gap-2 py-2.5 border border-sage-200 rounded-xl text-sage-500 text-sm hover:bg-sage-50 hover:border-sage-300 transition-colors font-serif"
        >
          <RotateCcw size={14} />
          Take the assessment again
        </button>

        {showReassess && (
          <div className="mt-3 bg-sand-50 border border-sand-100 rounded-xl p-4 text-sm font-serif text-sand-800 leading-relaxed">
            To retake the assessment, go to <strong>Profile</strong> and tap <strong>Reset Progress</strong>, or ask your supervisor about the weekly check-in feature coming soon.
            <button onClick={() => setShowReassess(false)} className="block mt-2 text-xs text-sage-400 underline">
              Close
            </button>
          </div>
        )}
      </section>

      {/* Assessment History */}
      {history.length > 1 && (
        <section className="bg-white rounded-2xl border border-sage-100 p-6 shadow-sm">
          <p className="text-xs font-bold tracking-widest text-sage-400 uppercase mb-1">
            Progression
          </p>
          <h2 className="text-xl font-serif text-sage-900 mb-4">How You Have Grown</h2>

          <div className="space-y-4">
            {history.map((snap, idx) => {
              const snapAvg = Math.round(
                Object.values(snap.wheelOfLife).reduce((s, v) => s + v, 0) /
                Object.values(snap.wheelOfLife).length
              );
              const snapRange = getRange(snapAvg);
              const date = new Date(snap.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              return (
                <div key={idx} className="flex items-center gap-4">
                  <div className="text-xs text-sage-400 w-16 flex-shrink-0 font-serif">{date}</div>
                  <div className="flex-1 h-2 bg-sage-50 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(snapAvg / 10) * 100}%` }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="h-full rounded-full"
                      style={{ background: snapRange.color }}
                    />
                  </div>
                  <div className="text-xs font-bold w-20 text-right flex-shrink-0" style={{ color: snapRange.color }}>
                    {snapAvg}/10, {snapRange.label}
                  </div>
                </div>
              );
            })}
          </div>

          {history.length >= 2 && (() => {
            const first = Math.round(Object.values(history[0].wheelOfLife).reduce((s, v) => s + v, 0) / Object.values(history[0].wheelOfLife).length);
            const last = Math.round(Object.values(history[history.length - 1].wheelOfLife).reduce((s, v) => s + v, 0) / Object.values(history[history.length - 1].wheelOfLife).length);
            const diff = last - first;
            if (diff === 0) return null;
            return (
              <p className={`text-xs font-serif italic mt-3 ${diff > 0 ? 'text-emerald-600' : 'text-amber-500'}`}>
                {diff > 0
                  ? `Your overall score has improved by ${diff} point${diff !== 1 ? 's' : ''} since you began. Keep going.`
                  : `Your score has shifted by ${Math.abs(diff)} point${Math.abs(diff) !== 1 ? 's' : ''}. Honest awareness is the first step.`}
              </p>
            );
          })()}
        </section>
      )}

      {/* Journey Map */}
      <section>
        <p className="text-xs font-bold tracking-widest text-sage-400 uppercase mb-1">
          Six Week Journey
        </p>
        <h2 className="text-xl font-serif text-sage-800 mb-4">Cycle {state.cycle || 1}, {currentCycle?.theme}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {cycleWeeks.map((week) => {
            const isCompleted = state.completedWeeks.includes(week.id);
            const isCurrent = state.currentWeek === week.id;
            const isLocked = !isCompleted && !isCurrent;

            return (
              <Link
                key={week.id}
                to={isLocked ? '#' : `/modules/${week.id}`}
                className={cn(
                  'p-5 rounded-xl border transition-all block',
                  isCurrent ? 'bg-white border-[#c0736a] shadow-md ring-1 ring-[#c0736a] ring-opacity-30' :
                  isCompleted ? 'bg-sage-50 border-sage-200 hover:border-sage-300' :
                  'bg-sand-50 border-sand-200 opacity-60 cursor-not-allowed'
                )}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={cn(
                    'text-xs font-bold px-2 py-1 rounded-md',
                    isCurrent ? 'bg-[#fdf0ec] text-[#c0736a]' : 'bg-black/5 text-gray-500'
                  )}>
                    Week {week.id}
                  </span>
                  {isCompleted && <CheckCircle className="text-emerald-500" size={16} />}
                  {isLocked && <Lock className="text-gray-300" size={16} />}
                  {isCurrent && (
                    <span className="text-[10px] font-bold text-[#c0736a] uppercase tracking-wider">Current</span>
                  )}
                </div>
                <h4 className="font-serif font-medium text-gray-900 text-sm mb-0.5">{week.title}</h4>
                <p className="text-xs text-gray-400 line-clamp-1">{week.pillar}</p>
              </Link>
            );
          })}
        </div>
      </section>

    </div>
  );
}
