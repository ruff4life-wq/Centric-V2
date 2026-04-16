import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star } from 'lucide-react';
import { submitFeedback } from '../services/feedback';
import { useUser } from '../context/UserContext';

interface FeedbackModalProps {
  open: boolean;
  onClose: () => void;
}

const FEEDBACK_COOLDOWN_KEY = 'centric_feedback_last';
const COOLDOWN_HOURS = 24;

export function canSubmitFeedback(): boolean {
  const last = localStorage.getItem(FEEDBACK_COOLDOWN_KEY);
  if (!last) return true;
  const diff = Date.now() - parseInt(last, 10);
  return diff > COOLDOWN_HOURS * 60 * 60 * 1000;
}

export default function FeedbackModal({ open, onClose }: FeedbackModalProps) {
  const { state } = useUser();
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async () => {
    if (!rating) return;
    setStatus('sending');

    const result = await submitFeedback({
      rating,
      comment: comment.trim(),
      userName: state.name,
      currentWeek: state.currentWeek,
      cycle: state.cycle || 1,
    });

    if (result.ok) {
      localStorage.setItem(FEEDBACK_COOLDOWN_KEY, Date.now().toString());
      setStatus('done');
    } else {
      setErrorMsg(result.error || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  const handleClose = () => {
    // Reset for next open
    if (status === 'done') {
      setRating(0);
      setComment('');
      setStatus('idle');
    }
    onClose();
  };

  const displayRating = hovered || rating;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
          style={{ background: 'rgba(58,32,24,0.45)' }}
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#4a2e24] px-6 py-5 flex items-center justify-between">
              <div>
                <p className="text-[#c4a078] text-[10px] font-bold tracking-widest uppercase">Share your experience</p>
                <h3 className="text-white font-serif text-lg mt-0.5">How is Centric working for you?</h3>
              </div>
              <button
                onClick={handleClose}
                className="text-[#c4a078] hover:text-white transition-colors ml-4 flex-shrink-0"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <AnimatePresence mode="wait">

                {/* Success state */}
                {status === 'done' && (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-4">
                      <svg viewBox="0 0 24 24" fill="none" width="26" height="26">
                        <path d="M5 13l4 4L19 7" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h4 className="font-serif text-sage-900 text-lg mb-1">Thank you</h4>
                    <p className="text-sm text-sage-500 leading-relaxed">
                      Your feedback helps make Centric better for everyone on this journey.
                    </p>
                    <button
                      onClick={handleClose}
                      className="mt-6 w-full bg-[#4a2e24] text-white py-3 rounded-xl font-serif hover:bg-[#3a2018] transition-colors"
                    >
                      Close
                    </button>
                  </motion.div>
                )}

                {/* Form state */}
                {status !== 'done' && (
                  <motion.div key="form" className="space-y-5">

                    {/* Star rating */}
                    <div>
                      <p className="text-xs font-bold tracking-widest text-sage-400 uppercase mb-3">Your rating</p>
                      <div className="flex gap-2 justify-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onMouseEnter={() => setHovered(star)}
                            onMouseLeave={() => setHovered(0)}
                            onClick={() => setRating(star)}
                            className="transition-transform hover:scale-110 active:scale-95"
                          >
                            <Star
                              size={32}
                              className="transition-colors"
                              fill={star <= displayRating ? '#c0736a' : 'none'}
                              stroke={star <= displayRating ? '#c0736a' : '#d0c8be'}
                              strokeWidth={1.5}
                            />
                          </button>
                        ))}
                      </div>
                      {rating > 0 && (
                        <p className="text-center text-xs text-sage-400 mt-2 italic">
                          {['', 'Needs improvement', 'Below expectations', 'Getting there', 'Working well', 'Loving it'][rating]}
                        </p>
                      )}
                    </div>

                    {/* Comment */}
                    <div>
                      <p className="text-xs font-bold tracking-widest text-sage-400 uppercase mb-2">
                        Comments <span className="text-sage-300 font-normal normal-case tracking-normal">(optional)</span>
                      </p>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="What's working? What could be better?"
                        rows={3}
                        maxLength={500}
                        className="w-full text-sm text-sage-800 placeholder:text-sage-300 bg-[#faf4f0] border border-[#ead5c8] rounded-xl px-4 py-3 outline-none focus:border-[#c0736a] resize-none transition-colors font-serif leading-relaxed"
                      />
                      <p className="text-right text-[10px] text-sage-300 mt-1">{comment.length}/500</p>
                    </div>

                    {/* Error */}
                    {status === 'error' && (
                      <p className="text-xs text-red-500 text-center">{errorMsg}</p>
                    )}

                    {/* Submit */}
                    <button
                      onClick={handleSubmit}
                      disabled={!rating || status === 'sending'}
                      className="w-full bg-[#4a2e24] text-white py-3.5 rounded-xl font-serif text-base hover:bg-[#3a2018] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {status === 'sending' ? (
                        <>
                          <svg className="animate-spin" viewBox="0 0 24 24" fill="none" width="18" height="18">
                            <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeOpacity="0.3"/>
                            <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                          </svg>
                          Sending...
                        </>
                      ) : 'Send Feedback'}
                    </button>

                    <p className="text-[10px] text-sage-300 text-center">
                      Feedback can be submitted once every 24 hours.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
