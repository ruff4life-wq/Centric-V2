import { useParams, useNavigate } from 'react-router-dom';
import { getCycleWeeks } from '../data/curriculum';
import { useUser } from '../context/UserContext';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, ArrowLeft, BookOpen, PenTool, Heart, Save, Sparkles, RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';

// Daily intentions per week — same data as Today screen
const weeklyIntentions: Record<number, string[]> = {
  1: ["Today, notice one way your body is asking for care.","Today, take one intentional breath before each new task.","Today, honor one physical boundary you've been overriding.","Today, thank your body for one thing it does without being asked.","Today, rest without justifying it.","Today, nourish yourself as carefully as you nourish others.","Today, move your body in one small, gentle way."],
  2: ["Today, name one emotion before you react to it.","Today, notice the thoughts that drain you, and don't follow them.","Today, let one feeling be present without trying to fix it.","Today, speak to yourself as kindly as you would to a client.","Today, take a 2-minute pause when overwhelm arrives.","Today, invite God into one emotion you've been carrying alone.","Today, celebrate one small inner victory."],
  3: ["Today, listen to one person without planning your response.","Today, say one true thing in a relationship that needs honesty.","Today, release one expectation of someone you love.","Today, practice one act of presence, phones down, eyes up.","Today, say no to one thing to say yes to someone that matters.","Today, forgive one small thing, even if only in your heart.","Today, let someone take care of you."],
  4: ["Today, begin your work with one minute of intention.","Today, notice when your work shifts from calling to compulsion.","Today, leave work at the time you planned.","Today, find one small thing about your work to be grateful for.","Today, delegate or decline one thing you don't need to carry.","Today, bring your full self to one task, not a fraction.","Today, ask: am I working for God or for approval?"],
  5: ["Today, make one financial decision from trust, not fear.","Today, practice gratitude for one resource you take for granted.","Today, notice where money anxiety shows up in your body.","Today, give something, however small, without expecting return.","Today, review one financial area with honesty and grace.","Today, release one money worry to God in prayer.","Today, celebrate one way you have been a faithful steward."],
  6: ["Today, begin with God before beginning anything else.","Today, notice where your life feels most aligned.","Today, ask: what is God inviting me into right now?","Today, live one of your stated values in a specific, concrete way.","Today, be still, even for two minutes.","Today, reflect on how far you have come.","Today, step forward in obedience to one thing you already know."],
};

function getDailyIntention(weekId: number): string {
  const intentions = weeklyIntentions[weekId] || weeklyIntentions[1];
  const day = new Date().getDay();
  const idx = day === 0 ? 6 : day - 1;
  return intentions[idx];
}

export default function ModuleView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { completeWeek, saveJournalEntry, state, canCompleteWeek, daysIntoWeek } = useUser();
  
  const weekId = parseInt(id || '1');
  const cycleWeeks = getCycleWeeks(state.cycle || 1);
  const content = cycleWeeks.find(c => c.id === weekId);
  
  // Local state for journal answers
  const [answers, setAnswers] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [cycleComplete, setCycleComplete] = useState(false);
  const [showReflectionGate, setShowReflectionGate] = useState(false);

  const hasAnyReflection = answers.some(a => a.trim().length > 0);

  // Load existing answers
  useEffect(() => {
    if (content) {
      const savedEntry = state.journalEntries[weekId];
      if (savedEntry) {
        try {
          setAnswers(JSON.parse(savedEntry));
        } catch (e) {
          // Fallback for legacy or plain text
          setAnswers([savedEntry]);
        }
      } else {
        setAnswers(new Array(content.reflectionQuestions.length).fill(''));
      }
    }
  }, [weekId, content, state.journalEntries]);

  if (!content) return <div>Module not found</div>;

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSave = () => {
    setIsSaving(true);
    saveJournalEntry(weekId, JSON.stringify(answers));
    setTimeout(() => {
      setIsSaving(false);
      setLastSaved(new Date());
    }, 500);
  };

  const handleComplete = () => {
    if (!hasAnyReflection) {
      setShowReflectionGate(true);
      return;
    }
    handleSave();
    if (weekId === 6) {
      setCycleComplete(true);
    } else {
      completeWeek(weekId);
      navigate('/today');
    }
  };

  const handleCompleteAnyway = () => {
    setShowReflectionGate(false);
    handleSave();
    if (weekId === 6) {
      setCycleComplete(true);
    } else {
      completeWeek(weekId);
      navigate('/today');
    }
  };

  const handleStartNextCycle = () => {
    completeWeek(weekId); // triggers cycle increment in context
    navigate('/today');
  };

  // Cycle Complete Screen — shown after completing Week 6
  if (cycleComplete) {
    const completedCycle = state.cycle || 1;
    const nextCycle = completedCycle + 1;
    return (
      <div className="min-h-screen bg-sage-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-10 border border-sage-100 text-center space-y-8"
        >
          {/* Icon burst */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 bg-sage-600 rounded-full flex items-center justify-center mx-auto shadow-lg"
          >
            <Sparkles className="text-white" size={44} />
          </motion.div>

          {/* Headline */}
          <div className="space-y-2">
            <p className="text-xs font-bold tracking-widest text-sage-500 uppercase">
              Cycle {completedCycle} Complete
            </p>
            <h1 className="text-3xl font-serif text-sage-900 leading-tight">
              You did the work.
            </h1>
            <p className="text-sage-600 leading-relaxed">
              Six weeks. Six pillars. One intentional step at a time. This is what restoration looks like — and you showed up for it.
            </p>
          </div>

          {/* Divider */}
          <hr className="border-sage-100" />

          {/* Reflection prompt */}
          <div className="bg-sand-50 rounded-2xl p-6 border border-sand-100 text-left space-y-3">
            <p className="text-sm font-semibold text-sand-800 flex items-center gap-2">
              <PenTool size={15} className="text-sand-500" />
              Before you begin Cycle {nextCycle}, take a moment:
            </p>
            <p className="text-sm text-sand-700 italic leading-relaxed">
              "What has shifted in me over these six weeks? Where do I feel most renewed — and where do I still want to grow?"
            </p>
          </div>

          {/* What's next note */}
          <div className="flex items-start gap-3 text-left bg-sage-50 rounded-xl p-4 border border-sage-100">
            <RefreshCw size={18} className="text-sage-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-sage-700">
              <strong>Cycle {nextCycle}</strong> begins at Physical Health — but you're not starting over. You're going deeper. Each cycle is a chance to see the same pillars through new eyes.
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={handleStartNextCycle}
            className="w-full bg-sage-700 text-white py-4 rounded-2xl font-semibold text-base hover:bg-sage-800 transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            Begin Cycle {nextCycle} <RefreshCw size={18} />
          </button>

          <p className="text-xs text-sage-400">
            Your journal and progress history are always accessible in your Profile.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto pb-20 space-y-8">

      {/* Reflection Gate Modal */}
      {showReflectionGate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{background: 'rgba(74,46,36,0.45)'}}>
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center space-y-4">
              <div className="w-14 h-14 bg-sand-100 rounded-full flex items-center justify-center mx-auto">
                <PenTool className="text-sand-600" size={24} />
              </div>
              <h3 className="text-xl font-serif text-sage-900">One small invitation</h3>
              <p className="text-sage-600 text-sm leading-relaxed">
                Your reflection questions are still blank — and that's completely okay. But even one sentence, written honestly, has a way of making the week stick.
              </p>
              <p className="text-sage-500 text-xs italic font-serif">
                "You don't have to write much. You just have to write true."
              </p>
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => setShowReflectionGate(false)}
                  className="w-full bg-sage-700 text-white py-3 rounded-xl font-serif hover:bg-sage-800 transition-colors"
                >
                  Let me write something
                </button>
                <button
                  onClick={handleCompleteAnyway}
                  className="w-full py-3 rounded-xl border border-sage-200 text-sage-400 text-sm hover:bg-sage-50 transition-colors"
                >
                  Continue as is
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <button 
        onClick={() => navigate('/today')}
        className="flex items-center gap-2 text-sage-600 hover:text-sage-800 transition-colors mb-4"
      >
        <ArrowLeft size={18} /> Back to Today
      </button>

      <header className="space-y-4">
        <div className="inline-block px-3 py-1 bg-sage-100 text-sage-700 rounded-full text-xs font-bold tracking-wide uppercase">
          Week {content.id}, {content.pillar}
        </div>
        <h1 className="text-4xl font-serif text-sage-900 leading-tight">
          {content.title}
        </h1>
        <p className="text-lg text-sage-600 leading-relaxed">
          {content.overview}
        </p>

        {/* Daily intention — contextual reinforcement */}
        <div className="bg-[#faf4f0] border border-[#ead5c8] rounded-2xl p-5 flex gap-4 items-start mt-2">
          <div className="w-1 self-stretch bg-[#c0736a] rounded-full opacity-60 flex-shrink-0" />
          <div>
            <p className="text-xs font-bold tracking-widest text-[#c0736a] uppercase mb-1.5">
              Today's Intention
            </p>
            <p className="font-serif text-[#4a2e24] text-sm leading-relaxed">
              {getDailyIntention(content.id)}
            </p>
          </div>
        </div>
      </header>

      <hr className="border-sage-200" />

      {/* Scripture Section */}
      <section className="bg-white rounded-2xl p-8 shadow-sm border border-sage-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 text-sage-50 opacity-50 transform translate-x-1/4 -translate-y-1/4">
          <BookOpen size={200} />
        </div>
        <h2 className="text-xl font-serif text-sage-800 mb-4 relative z-10 flex items-center gap-2">
          <BookOpen className="text-sage-500" size={20} /> Scripture Focus
        </h2>
        <ul className="space-y-3 relative z-10">
          {content.scriptures.map((scripture, idx) => (
            <li key={idx} className="flex items-center gap-3 text-sage-700 font-medium">
              <span className="w-1.5 h-1.5 bg-sage-400 rounded-full" />
              {scripture}
            </li>
          ))}
        </ul>
      </section>

      {/* Learning Outcomes */}
      <section>
        <h2 className="text-xl font-serif text-sage-800 mb-4">Learning Outcomes</h2>
        <div className="grid gap-4">
          {content.learningOutcomes.map((outcome, idx) => (
            <div key={idx} className="bg-sage-50 p-4 rounded-xl border border-sage-100 flex gap-3">
              <div className="mt-1 text-sage-500">
                <CheckCircle size={18} />
              </div>
              <p className="text-sage-700">{outcome}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reflection */}
      <section className="bg-sand-100 rounded-2xl p-8 border border-sand-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-serif text-sand-900 flex items-center gap-2">
            <PenTool className="text-sand-600" size={20} /> Reflection
          </h2>
          <div className="flex items-center gap-2">
            {lastSaved && (
              <span className="text-xs text-sand-500">
                Saved {lastSaved.toLocaleTimeString()}
              </span>
            )}
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-white text-sand-800 rounded-lg text-sm font-medium hover:bg-sand-50 transition-colors border border-sand-200"
            >
              {isSaving ? <span className="animate-pulse">Saving...</span> : <><Save size={16} /> Save</>}
            </button>
          </div>
        </div>
        <div className="space-y-6">
          {content.reflectionQuestions.map((q, idx) => (
            <div key={idx} className="space-y-2">
              <p className="font-medium text-sand-800">{q}</p>
              <textarea 
                className="w-full bg-white rounded-xl border border-sand-200 p-3 text-sm focus:ring-2 focus:ring-sand-400 focus:outline-none transition-shadow"
                rows={3}
                placeholder="Journal your thoughts here..."
                value={answers[idx] || ''}
                onChange={(e) => handleAnswerChange(idx, e.target.value)}
                onBlur={handleSave} // Auto-save on blur
              />
            </div>
          ))}
        </div>
      </section>

      {/* Prayer Focus */}
      <section className="bg-sage-700 text-white p-8 rounded-2xl text-center space-y-4">
        <Heart className="mx-auto text-sage-300" size={32} />
        <h3 className="font-serif text-xl">Prayer Focus</h3>
        <p className="text-lg font-serif italic opacity-90">
          "{content.prayerFocus}"
        </p>
      </section>

      {/* Completion Action */}
      <div className="flex flex-col items-center pt-8 gap-3">
        {canCompleteWeek() ? (
          <button
            onClick={handleComplete}
            className="bg-sage-900 text-white px-8 py-4 rounded-full font-medium hover:bg-black transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2"
          >
            Complete Week {content.id} <CheckCircle size={20} />
          </button>
        ) : (
          <div className="text-center space-y-2">
            <div className="bg-sage-50 border border-sage-200 rounded-2xl px-8 py-4 inline-flex items-center gap-3">
              <CheckCircle className="text-sage-300" size={20} />
              <span className="text-sage-500 font-serif">Complete Week {content.id}</span>
            </div>
            <p className="text-xs text-sage-400 italic">
              Unlocks on day 5 — keep showing up. Day {daysIntoWeek()} of 7.
            </p>
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <p className="text-center text-xs text-sage-300 pb-4 leading-relaxed">
        Centric supports your wellness practice. For clinical concerns, please contact a licensed professional.
      </p>
    </div>
  );
}
