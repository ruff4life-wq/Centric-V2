import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';

export default function Assessment() {
  const { updateAssessment, setName, state } = useUser();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [localName, setLocalName] = useState(state.name);
  
  // Simplified Wheel of Life inputs
  const [wheel, setWheel] = useState(state.assessment.wheelOfLife);
  
  // Simplified ProQOL inputs (just a few key indicators for the demo)
  const [proQOL, setProQOL] = useState({
    compassion: 0,
    burnout: 0,
    trauma: 0
  });

  const handleNext = () => {
    if (step === 0 && localName) {
      setName(localName);
      setStep(1);
    } else if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      updateAssessment({
        wheelOfLife: wheel,
        proQOL: {
          compassionSatisfaction: proQOL.compassion,
          burnout: proQOL.burnout,
          secondaryTraumaticStress: proQOL.trauma
        },
        completed: true
      });
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-sand-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full bg-white rounded-3xl shadow-xl p-8 border border-sage-100"
      >
        {step === 0 && (
          <div className="space-y-6 text-center">
            <h1 className="text-3xl font-serif text-sage-900">Welcome to Centric</h1>
            <p className="text-sage-600">
              A safe space for those who care for others. Before we begin, how should I address you?
            </p>
            <input
              type="text"
              value={localName}
              onChange={(e) => setLocalName(e.target.value)}
              placeholder="Your Name"
              className="w-full text-center text-xl border-b-2 border-sage-200 focus:border-sage-500 outline-none py-2 bg-transparent"
            />
            <button
              onClick={handleNext}
              disabled={!localName}
              className="w-full bg-sage-600 text-white py-3 rounded-xl hover:bg-sage-700 transition-colors disabled:opacity-50"
            >
              Begin Journey
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif text-sage-900 mb-4">The Wheel of Life</h2>
            <p className="text-sm text-sage-600 mb-1">
              Rate your current satisfaction in each area from <strong>1 to 10</strong>.
            </p>
            <div className="flex justify-between text-xs text-sage-400 mb-4 px-0.5">
              <span>1 = Very unsatisfied / major struggle</span>
              <span>10 = Thriving / fully satisfied</span>
            </div>
            <div className="space-y-5">
              {Object.entries(wheel).map(([key, value]) => (
                <div key={key} className="space-y-1.5">
                  <div className="flex justify-between text-sm font-medium text-sage-800">
                    <span>{key}</span>
                    <span className={`font-bold ${value <= 3 ? 'text-red-400' : value <= 6 ? 'text-amber-500' : 'text-sage-600'}`}>
                      {value}/10
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={value}
                    onChange={(e) => setWheel(prev => ({ ...prev, [key]: parseInt(e.target.value) }))}
                    className="w-full accent-sage-600 h-2 bg-sage-100 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-sage-300 px-0.5">
                    <span>1</span>
                    <span>5</span>
                    <span>10</span>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handleNext}
              className="w-full mt-6 bg-sage-600 text-white py-3 rounded-xl hover:bg-sage-700 flex items-center justify-center gap-2"
            >
              Next <ArrowRight size={18} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif text-sage-900">Professional Quality of Life</h2>
            <p className="text-sm text-sage-600 mb-1">
              As a helping professional, it's vital to check your own tank.
            </p>
            <div className="bg-sage-50 border border-sage-100 rounded-xl px-4 py-3 text-xs text-sage-600 flex justify-between">
              <span><strong>1</strong> = Never / Not at all</span>
              <span><strong>3</strong> = Sometimes</span>
              <span><strong>5</strong> = Very Often / Always</span>
            </div>
            
            <div className="space-y-6">
              {[
                { key: 'compassion' as const, label: 'I get satisfaction from being able to help people.' },
                { key: 'burnout' as const, label: 'I feel worn out because of my work as a helper.' },
                { key: 'trauma' as const, label: 'I feel overwhelmed by the trauma of those I help.' },
              ].map(({ key, label }) => (
                <div key={key} className="space-y-2">
                  <label className="text-sm font-medium text-sage-800">{label}</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((v) => (
                      <button
                        key={v}
                        onClick={() => setProQOL(p => ({ ...p, [key]: v }))}
                        className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-colors ${proQOL[key] === v ? 'bg-sage-600 text-white border-sage-600' : 'border-sage-200 hover:bg-sage-50 text-sage-700'}`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-sage-400 px-0.5">
                    <span>Never</span>
                    <span>Sometimes</span>
                    <span>Very Often</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={!proQOL.compassion || !proQOL.burnout || !proQOL.trauma}
              className="w-full mt-6 bg-sage-600 text-white py-3 rounded-xl hover:bg-sage-700 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              Complete Assessment <Check size={18} />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
