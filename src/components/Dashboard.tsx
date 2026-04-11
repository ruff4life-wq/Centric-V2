import { useUser } from '../context/UserContext';
import { getCycleWeeks, cycles } from '../data/curriculum';
import { motion } from 'motion/react';
import { Play, CheckCircle, Lock, PauseCircle } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import DailyPause from './DailyPause';
import { cn } from '../lib/utils';

export default function Dashboard() {
  const { state } = useUser();
  const cycleWeeks = getCycleWeeks(state.cycle || 1);
  const currentWeekContent = cycleWeeks.find(c => c.id === state.currentWeek);
  const currentCycle = cycles.find(c => c.cycle === (state.cycle || 1));
  const [searchParams] = useSearchParams();
  const [showPause, setShowPause] = useState(() => searchParams.get('pause') === 'true');

  return (
    <div className="space-y-8 pb-20">
      <DailyPause isOpen={showPause} onClose={() => setShowPause(false)} />
      
      <header>
        <h1 className="text-3xl font-serif text-sage-900 mb-2">
          Welcome back, {state.name}.
        </h1>
        <p className="text-sage-600">
          Cycle {state.cycle || 1}: {currentCycle?.theme} • Week {state.currentWeek} of 6 • {currentWeekContent?.pillar}
        </p>
      </header>

      {/* Daily Pause Card */}
      <motion.div 
        whileHover={{ scale: 1.01 }}
        className="bg-sage-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden cursor-pointer"
        onClick={() => setShowPause(true)}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <PauseCircle className="text-sage-200" />
            <h2 className="font-serif text-xl">Daily Pause</h2>
          </div>
          <p className="mb-6 text-sage-100 max-w-lg">
            "Breathe. Name your emotion. Invite God in." Take 2 minutes to center yourself before continuing your day.
          </p>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowPause(true);
            }}
            className="bg-white text-sage-700 px-6 py-2 rounded-full font-medium text-sm hover:bg-sage-50 transition-colors"
          >
            Start 2-Minute Pause
          </button>
        </div>
      </motion.div>

      {/* Current Module */}
      <section>
        <h2 className="text-xl font-serif text-sage-800 mb-4">Current Focus</h2>
        <div className="bg-white rounded-2xl border border-sage-200 p-6 shadow-sm">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div>
              <span className="text-xs font-bold tracking-wider text-sage-500 uppercase">Week {state.currentWeek}</span>
              <h3 className="text-2xl font-serif text-sage-900 mt-1 mb-2">{currentWeekContent?.title}</h3>
              <p className="text-sage-600 max-w-xl line-clamp-2">
                {currentWeekContent?.overview}
              </p>
            </div>
            <Link 
              to={`/modules/${state.currentWeek}`}
              className="bg-sage-100 text-sage-700 px-6 py-3 rounded-xl font-medium hover:bg-sage-200 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <Play size={18} /> Continue Session
            </Link>
          </div>
        </div>
      </section>

      {/* Journey Map */}
      <section>
        <h2 className="text-xl font-serif text-sage-800 mb-4">Your Journey</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {curriculum.map((week) => {
            const isCompleted = state.completedWeeks.includes(week.id);
            const isCurrent = state.currentWeek === week.id;
            const isLocked = !isCompleted && !isCurrent;

            return (
              <div 
                key={week.id}
                className={cn(
                  "p-5 rounded-xl border transition-all",
                  isCurrent ? "bg-white border-sage-300 shadow-md ring-1 ring-sage-200" : 
                  isCompleted ? "bg-sage-50 border-sage-200" :
                  "bg-sand-50 border-sand-200 opacity-70"
                )}
              >
                <div className="flex justify-between items-start mb-3">
                  <span className={cn(
                    "text-xs font-bold px-2 py-1 rounded-md",
                    isCurrent ? "bg-sage-100 text-sage-700" : "bg-black/5 text-gray-500"
                  )}>
                    WEEK {week.id}
                  </span>
                  {isCompleted && <CheckCircle className="text-sage-500" size={18} />}
                  {isLocked && <Lock className="text-gray-300" size={18} />}
                </div>
                <h4 className="font-serif font-medium text-gray-900 mb-1">{week.title}</h4>
                <p className="text-xs text-gray-500 line-clamp-2">{week.pillar}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
