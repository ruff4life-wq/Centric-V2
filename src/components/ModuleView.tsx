import { useParams, useNavigate } from 'react-router-dom';
import { curriculum } from '../data/curriculum';
import { useUser } from '../context/UserContext';
import { motion } from 'motion/react';
import { CheckCircle, ArrowLeft, BookOpen, PenTool, Heart, Save } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ModuleView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { completeWeek, saveJournalEntry, state } = useUser();
  
  const weekId = parseInt(id || '1');
  const content = curriculum.find(c => c.id === weekId);
  
  // Local state for journal answers
  const [answers, setAnswers] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

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
    handleSave();
    completeWeek(weekId);
    navigate('/dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto pb-20 space-y-8">
      <button 
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-2 text-sage-600 hover:text-sage-800 transition-colors mb-4"
      >
        <ArrowLeft size={18} /> Back to Dashboard
      </button>

      <header className="space-y-4">
        <div className="inline-block px-3 py-1 bg-sage-100 text-sage-700 rounded-full text-xs font-bold tracking-wide uppercase">
          Week {content.id} • {content.pillar}
        </div>
        <h1 className="text-4xl font-serif text-sage-900 leading-tight">
          {content.title}
        </h1>
        <p className="text-lg text-sage-600 leading-relaxed">
          {content.overview}
        </p>
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
      <div className="flex justify-center pt-8">
        <button
          onClick={handleComplete}
          className="bg-sage-900 text-white px-8 py-4 rounded-full font-medium hover:bg-black transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2"
        >
          Complete Week {content.id} <CheckCircle size={20} />
        </button>
      </div>
    </div>
  );
}
