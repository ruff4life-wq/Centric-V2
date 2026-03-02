import { motion, AnimatePresence } from 'motion/react';
import { X, Wind, Heart, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

interface DailyPauseProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DailyPause({ isOpen, onClose }: DailyPauseProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (isOpen) setStep(0);
  }, [isOpen]);

  const steps = [
    {
      icon: Wind,
      title: "Breathe",
      text: "Take a deep breath in... hold... and release. Let your shoulders drop.",
      action: "I'm ready"
    },
    {
      icon: Heart,
      title: "Name Your Emotion",
      text: "What are you feeling right now? No judgment, just notice it.",
      action: "I've named it"
    },
    {
      icon: Sun,
      title: "Invite God In",
      text: "Lord, I invite You into this moment. Be my peace.",
      action: "Amen"
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-sage-900/60 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full relative z-10 shadow-2xl overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-sage-400 hover:text-sage-600"
            >
              <X size={24} />
            </button>

            <div className="text-center py-8">
              <motion.div
                key={step}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center"
              >
                <div className="w-20 h-20 bg-sage-100 rounded-full flex items-center justify-center text-sage-600 mb-6">
                  {(() => {
                    const Icon = steps[step].icon;
                    return <Icon size={32} />;
                  })()}
                </div>
                
                <h2 className="text-2xl font-serif text-sage-900 mb-4">
                  {steps[step].title}
                </h2>
                
                <p className="text-sage-600 text-lg mb-8 leading-relaxed">
                  {steps[step].text}
                </p>

                <button
                  onClick={handleNext}
                  className="bg-sage-600 text-white px-8 py-3 rounded-full hover:bg-sage-700 transition-colors font-medium"
                >
                  {steps[step].action}
                </button>
              </motion.div>

              <div className="flex justify-center gap-2 mt-8">
                {steps.map((_, idx) => (
                  <div 
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-colors ${idx === step ? 'bg-sage-600' : 'bg-sage-200'}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
