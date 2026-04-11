import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';

const pillarColors: Record<string, string> = {
  'Physical Health': '#c0736a',
  'Mental/Emotional': '#7b9ea8',
  'Relationships': '#9a7db8',
  'Career/Work': '#c4a55a',
  'Finances': '#6aab8a',
  'Spirituality': '#d4856a',
};

function getRange(score: number): { label: string; color: string; description: string } {
  if (score <= 3) return {
    label: 'Needs Care',
    color: 'text-red-500',
    description: 'This area is calling for your attention. Be gentle with yourself here.',
  };
  if (score <= 6) return {
    label: 'Growing',
    color: 'text-amber-500',
    description: 'There is movement happening here. Small steps will create real change.',
  };
  return {
    label: 'Thriving',
    color: 'text-emerald-600',
    description: 'This is a strength. Let it anchor and support the areas still developing.',
  };
}

function WheelChart({ wheel }: { wheel: Record<string, number> }) {
  const entries = Object.entries(wheel);
  const cx = 140, cy = 140, maxR = 110;

  const points = entries.map((_, i) => {
    const angle = (i / entries.length) * 2 * Math.PI - Math.PI / 2;
    return { angle };
  });

  const spokePoints = points.map(({ angle }, i) => {
    const [, value] = entries[i];
    const r = (value / 10) * maxR;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  });

  const outerPoints = points.map(({ angle }) => ({
    x: cx + maxR * Math.cos(angle),
    y: cy + maxR * Math.sin(angle),
  }));

  const polygonPath = spokePoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + ' Z';
  const outerPath = outerPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + ' Z';

  return (
    <svg viewBox="0 0 280 280" className="w-full max-w-xs mx-auto">
      {/* Grid rings */}
      {[2, 4, 6, 8, 10].map(ring => (
        <polygon
          key={ring}
          points={points.map(({ angle }) => {
            const r = (ring / 10) * maxR;
            return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
          }).join(' ')}
          fill="none"
          stroke="#e8e0d8"
          strokeWidth="0.8"
        />
      ))}

      {/* Spokes */}
      {outerPoints.map((p, i) => (
        <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#e8e0d8" strokeWidth="0.8" />
      ))}

      {/* Outer boundary */}
      <path d={outerPath} fill="none" stroke="#d0c8be" strokeWidth="1" />

      {/* Filled area */}
      <path d={polygonPath} fill="#c0736a" fillOpacity="0.18" stroke="#c0736a" strokeWidth="2" strokeLinejoin="round" />

      {/* Data points */}
      {spokePoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill="#c0736a" />
      ))}

      {/* Labels */}
      {outerPoints.map((p, i) => {
        const [key] = entries[i];
        const angle = points[i].angle;
        const labelR = maxR + 22;
        const lx = cx + labelR * Math.cos(angle);
        const ly = cy + labelR * Math.sin(angle);
        const anchor = Math.cos(angle) > 0.1 ? 'start' : Math.cos(angle) < -0.1 ? 'end' : 'middle';
        const shortLabel = key.split('/')[0].replace(' Health', '').replace('Career', 'Career');
        return (
          <text
            key={i}
            x={lx}
            y={ly + 4}
            textAnchor={anchor}
            fontSize="9"
            fill="#6b5a4e"
            fontFamily="Georgia, serif"
          >
            {shortLabel}
          </text>
        );
      })}

      {/* Center label */}
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize="10" fill="#9a7a6a" fontFamily="Georgia, serif">
        Wheel of Life
      </text>
    </svg>
  );
}

export default function Assessment() {
  const { updateAssessment, setName, state } = useUser();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [localName, setLocalName] = useState(state.name);

  // Track which sliders have been touched
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [wheel, setWheel] = useState(state.assessment.wheelOfLife);

  const [proQOL, setProQOL] = useState({
    compassion: 0,
    burnout: 0,
    trauma: 0,
  });

  // Step 3 = results screen shown before navigating
  const [showResults, setShowResults] = useState(false);

  const allWheelTouched = Object.keys(wheel).every(k => touched[k]);

  const handleNext = () => {
    if (step === 0 && localName) {
      setName(localName);
      setStep(1);
    } else if (step === 1 && allWheelTouched) {
      setStep(2);
    } else if (step === 2) {
      // Show results FIRST — updateAssessment called on "Begin Week 1"
      setShowResults(true);
    }
  };

  const handleProceed = () => {
    // Only now mark assessment complete — after user has seen results
    updateAssessment({
      wheelOfLife: wheel,
      proQOL: {
        compassionSatisfaction: proQOL.compassion,
        burnout: proQOL.burnout,
        secondaryTraumaticStress: proQOL.trauma,
      },
      completed: true,
    });
    navigate('/today');
  };

  if (showResults) {
    const entries = Object.entries(wheel);
    const avg = Math.round(entries.reduce((s, [, v]) => s + v, 0) / entries.length);
    const avgRange = getRange(avg);

    return (
      <div className="min-h-screen bg-sand-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl w-full bg-white rounded-3xl shadow-xl p-8 border border-sage-100"
        >
          <div className="text-center mb-6">
            <p className="text-xs font-bold tracking-widest text-[#c0736a] uppercase mb-2">
              Your Starting Point
            </p>
            <h2 className="text-2xl font-serif text-sage-900 mb-1">
              Here is where you are today.
            </h2>
            <p className="text-sm text-sage-500 font-serif italic">
              Not where you will always be. Just where you are right now.
            </p>
          </div>

          {/* Radar chart */}
          <WheelChart wheel={wheel} />

          {/* Overall score */}
          <div className="text-center my-4">
            <p className="text-xs font-bold tracking-widest text-sage-400 uppercase mb-1">
              Overall Average
            </p>
            <p className={`text-3xl font-serif font-bold ${avgRange.color}`}>
              {avg}/10
            </p>
            <p className={`text-sm font-bold ${avgRange.color} mt-0.5`}>
              {avgRange.label}
            </p>
            <p className="text-xs text-sage-500 mt-1 italic font-serif">
              {avgRange.description}
            </p>
          </div>

          {/* Per-pillar breakdown */}
          <div className="space-y-2 mt-4 mb-6">
            {entries.map(([key, value]) => {
              const range = getRange(value as number);
              const color = pillarColors[key] || '#c0736a';
              const pct = ((value as number) / 10) * 100;
              return (
                <div key={key}>
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="text-xs font-serif text-sage-700">{key}</span>
                    <span className={`text-xs font-bold ${range.color}`}>
                      {value}/10, {range.label}
                    </span>
                  </div>
                  <div className="h-1.5 bg-sage-50 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="h-full rounded-full"
                      style={{ background: color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interpretation */}
          <div className="bg-sand-50 border border-sand-100 rounded-2xl p-4 mb-6">
            <p className="text-xs font-bold tracking-widest text-sand-700 uppercase mb-2">
              What this means
            </p>
            <p className="text-sm font-serif text-sand-800 leading-relaxed">
              This is your baseline. Over the next six weeks, you will revisit each of these areas with intention and care. Some scores will shift. Others will take longer. Both are part of the journey.
            </p>
          </div>

          {/* Range legend */}
          <div className="flex justify-between text-xs mb-6 px-1">
            <span className="text-red-400 font-bold">1 to 3: Needs Care</span>
            <span className="text-amber-500 font-bold">4 to 6: Growing</span>
            <span className="text-emerald-600 font-bold">7 to 10: Thriving</span>
          </div>

          <button
            onClick={handleProceed}
            className="w-full bg-[#4a2e24] text-white py-4 rounded-xl font-serif text-base hover:bg-[#3a2018] transition-colors"
          >
            Begin Week 1
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full bg-white rounded-3xl shadow-xl p-8 border border-sage-100"
      >
        <AnimatePresence mode="wait">

          {/* Step 0 — Name + onboarding */}
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-6 text-center"
            >
              <img
                src="/favicon.png"
                alt="AGC Centric"
                className="w-14 h-14 rounded-2xl mx-auto"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
              <h1 className="text-3xl font-serif text-sage-900">Welcome to Centric</h1>
              <p className="text-sage-600">
                The place where you can explore your well-being. Before we begin, how should I address you?
              </p>
              <input
                type="text"
                value={localName}
                onChange={(e) => setLocalName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && localName && handleNext()}
                placeholder="Your Name"
                className="w-full text-center text-xl border-b-2 border-sage-200 focus:border-sage-500 outline-none py-2 bg-transparent"
              />

              <div className="bg-sand-50 border border-sand-100 rounded-2xl p-4 text-left space-y-2">
                <p className="text-xs font-bold tracking-widest text-sand-700 uppercase">
                  Before you begin
                </p>
                <p className="text-sm text-sand-800 leading-relaxed italic font-serif">
                  "This is not a course. It is a practice. A course asks you to show up once a week. A practice asks you to show up every day, even for two minutes. Especially for two minutes."
                </p>
                <p className="text-xs text-sand-600 leading-relaxed">
                  Your weekly module is your anchor. Your daily check-in is your compass. We will invite you back each day, not to grade you, but to ground you.
                </p>
              </div>

              <p className="text-xs text-sage-400 leading-relaxed px-2">
                Centric is a wellness companion, not a clinical service. It supports your journey but does not replace therapy, medical care, or crisis intervention. If you are in crisis, please call or text <strong>988</strong>.
              </p>

              <button
                onClick={handleNext}
                disabled={!localName}
                className="w-full bg-sage-600 text-white py-3 rounded-xl hover:bg-sage-700 transition-colors disabled:opacity-50 font-serif"
              >
                I understand, begin my journey
              </button>
            </motion.div>
          )}

          {/* Step 1 — Wheel of Life */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-serif text-sage-900 mb-2">The Wheel of Life</h2>
                <p className="text-sm text-sage-600">
                  Rate your current satisfaction in each area from 1 to 10. Move each slider to record your score.
                </p>
                <div className="flex justify-between text-xs text-sage-400 mt-2 px-0.5">
                  <span>1 = Very unsatisfied</span>
                  <span>10 = Fully satisfied</span>
                </div>
              </div>

              <div className="space-y-5">
                {Object.entries(wheel).map(([key, value]) => {
                  const isTouched = touched[key];
                  return (
                    <div key={key} className="space-y-1.5">
                      <div className="flex justify-between text-sm font-medium text-sage-800">
                        <span className="flex items-center gap-2">
                          {key}
                          {!isTouched && (
                            <span className="text-[10px] text-amber-400 font-normal">
                              move slider
                            </span>
                          )}
                        </span>
                        <span className={`font-bold ${
                          !isTouched ? 'text-sage-300' :
                          (value as number) <= 3 ? 'text-red-400' :
                          (value as number) <= 6 ? 'text-amber-500' : 'text-sage-600'
                        }`}>
                          {isTouched ? `${value}/10` : '?'}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={value as number}
                        onChange={(e) => {
                          setWheel(prev => ({ ...prev, [key]: parseInt(e.target.value) }));
                          setTouched(prev => ({ ...prev, [key]: true }));
                        }}
                        className="w-full accent-sage-600 h-2 bg-sage-100 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-sage-300 px-0.5">
                        <span>1</span>
                        <span>5</span>
                        <span>10</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {!allWheelTouched && (
                <p className="text-xs text-amber-500 text-center italic">
                  Please move all sliders before continuing.
                </p>
              )}

              <button
                onClick={handleNext}
                disabled={!allWheelTouched}
                className="w-full mt-2 bg-sage-600 text-white py-3 rounded-xl hover:bg-sage-700 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-serif"
              >
                Next <ArrowRight size={18} />
              </button>
            </motion.div>
          )}

          {/* Step 2 — ProQOL */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-serif text-sage-900">Professional Quality of Life</h2>
                <p className="text-sm text-sage-600 mt-1">
                  As a helping professional, it is vital to check your own tank.
                </p>
              </div>

              <div className="bg-sage-50 border border-sage-100 rounded-xl px-4 py-3 text-xs text-sage-600 flex justify-between">
                <span><strong>1</strong> = Never</span>
                <span><strong>3</strong> = Sometimes</span>
                <span><strong>5</strong> = Very Often</span>
              </div>

              <div className="space-y-6">
                {[
                  { key: 'compassion' as const, label: 'I get satisfaction from being able to help people.' },
                  { key: 'burnout' as const, label: 'I feel worn out because of my work as a helper.' },
                  { key: 'trauma' as const, label: 'I feel overwhelmed by the trauma of those I help.' },
                ].map(({ key, label }) => (
                  <div key={key} className="space-y-2">
                    <label className="text-sm font-medium text-sage-800 block">{label}</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((v) => (
                        <button
                          key={v}
                          onClick={() => setProQOL(p => ({ ...p, [key]: v }))}
                          className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-colors ${
                            proQOL[key] === v
                              ? 'bg-sage-600 text-white border-sage-600'
                              : 'border-sage-200 hover:bg-sage-50 text-sage-700'
                          }`}
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
                className="w-full mt-2 bg-sage-600 text-white py-3 rounded-xl hover:bg-sage-700 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-serif"
              >
                See My Results <Check size={18} />
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </motion.div>
    </div>
  );
}
