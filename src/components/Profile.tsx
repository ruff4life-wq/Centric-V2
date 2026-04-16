import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { LogOut, MessageSquarePlus } from 'lucide-react';
import FeedbackModal, { canSubmitFeedback } from './FeedbackModal';
import { useUpdateBadge } from './UpdateBanner';

export default function Profile() {
  const { state, resetProgress } = useUser();
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const hasUpdate = useUpdateBadge();
  const feedbackAvailable = canSubmitFeedback();

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-serif text-sage-900">Your Profile</h1>
        {hasUpdate && (
          <span className="text-[10px] font-bold tracking-widest text-[#c0736a] uppercase bg-[#faf4f0] border border-[#ead5c8] px-3 py-1.5 rounded-full">
            Update available
          </span>
        )}
      </div>

      <div className="bg-white p-6 rounded-2xl border border-sage-100 shadow-sm flex items-center gap-6">
        <div className="w-20 h-20 bg-[#faf4f0] border border-[#ead5c8] rounded-full flex items-center justify-center text-[#c0736a] text-2xl font-serif">
          {state.name.charAt(0) || '?'}
        </div>
        <div>
          <h2 className="text-xl font-medium text-sage-900">{state.name}</h2>
          <p className="text-sage-500 text-sm">
            Cycle {state.cycle || 1} &middot; Week {state.currentWeek}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-serif text-sage-800">Wheel of Life</h3>
        <div className="bg-white p-6 rounded-2xl border border-sage-100 shadow-sm">
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(state.assessment.wheelOfLife).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center p-3 bg-[#faf4f0] rounded-xl">
                <span className="text-sm text-sage-700">{key}</span>
                <span className="font-bold text-sage-900 text-sm">{value}/10</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-serif text-sage-800">Feedback</h3>
        <div className="bg-white rounded-2xl border border-sage-100 shadow-sm p-6">
          <p className="text-sm text-sage-600 leading-relaxed mb-4">
            Your experience matters. Let us know what is working and what could be better, so Centric keeps growing with you.
          </p>
          <button
            onClick={() => setFeedbackOpen(true)}
            disabled={!feedbackAvailable}
            className="flex items-center gap-2.5 bg-[#4a2e24] text-white px-5 py-3 rounded-xl font-serif text-sm hover:bg-[#3a2018] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <MessageSquarePlus size={17} />
            {feedbackAvailable ? 'Share Feedback' : 'Feedback submitted today'}
          </button>
          {!feedbackAvailable && (
            <p className="text-xs text-sage-400 mt-2 italic">
              You can submit feedback again tomorrow.
            </p>
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-sage-200">
        <button
          onClick={() => {
            if (confirm('Are you sure you want to reset your progress? This cannot be undone.')) {
              resetProgress();
              window.location.href = '/';
            }
          }}
          className="flex items-center gap-2 text-red-500 hover:text-red-700 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors text-sm"
        >
          <LogOut size={17} /> Reset Progress
        </button>
      </div>

      <FeedbackModal open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </div>
  );
}
