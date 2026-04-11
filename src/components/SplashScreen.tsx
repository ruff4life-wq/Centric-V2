import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<'flying' | 'landed' | 'liftoff' | 'done'>('flying');
  const flapRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const wulRef = useRef<SVGEllipseElement>(null);
  const wurRef = useRef<SVGEllipseElement>(null);
  const wllRef = useRef<SVGEllipseElement>(null);
  const wlrRef = useRef<SVGEllipseElement>(null);
  const bflyRef = useRef<HTMLDivElement>(null);

  const flap = (speed: number, minScale: number) => {
    if (flapRef.current) clearInterval(flapRef.current);
    let t = 0;
    flapRef.current = setInterval(() => {
      t += 0.05;
      const s = 1 - (1 - minScale) * Math.abs(Math.sin(t * speed));
      wulRef.current?.setAttribute('rx', String(20 * s));
      wurRef.current?.setAttribute('rx', String(20 * s));
      wllRef.current?.setAttribute('rx', String(18 * s));
      wlrRef.current?.setAttribute('rx', String(18 * s));
    }, 30);
  };

  const stopFlap = () => {
    if (flapRef.current) clearInterval(flapRef.current);
    wulRef.current?.setAttribute('rx', '20');
    wurRef.current?.setAttribute('rx', '20');
    wllRef.current?.setAttribute('rx', '18');
    wlrRef.current?.setAttribute('rx', '18');
  };

  useEffect(() => {
    const el = bflyRef.current;
    if (!el) return;

    // Phase 1 — slow drift in from top right
    el.style.transition = 'none';
    el.style.top = '-100px';
    el.style.left = '75%';
    el.style.opacity = '0';

    setTimeout(() => {
      el.style.transition = 'top 2.2s cubic-bezier(0.25,0.46,0.45,0.94), left 2.2s cubic-bezier(0.25,0.46,0.45,0.94), opacity 1s ease';
      el.style.top = '38%';
      el.style.left = '50%';
      el.style.opacity = '1';
      flap(2.2, 0.2);
    }, 300);

    // Phase 2 — glide down to land on wordmark
    setTimeout(() => {
      el.style.transition = 'top 1.4s cubic-bezier(0.34,1.1,0.64,1), left 1s ease';
      el.style.top = '52%';
      flap(1.0, 0.55);
      setPhase('landed');
    }, 2700);

    // Phase 3 — gentle resting flutter
    setTimeout(() => {
      flap(0.7, 0.78);
    }, 4200);

    // Phase 4 — go still
    setTimeout(() => {
      stopFlap();
    }, 6000);

    // Phase 5 — pre-flight stir
    setTimeout(() => {
      flap(2.0, 0.3);
      setPhase('liftoff');
    }, 7000);

    // Phase 6 — graceful liftoff arc
    setTimeout(() => {
      el.style.transition = 'top 2s cubic-bezier(0.55,0,1,0.45), left 2s ease-in, opacity 1.2s ease-in 0.6s';
      el.style.top = '-160px';
      el.style.left = '68%';
      el.style.opacity = '0';
      flap(5, 0.08);
    }, 7800);

    // Phase 7 — complete
    setTimeout(() => {
      if (flapRef.current) clearInterval(flapRef.current);
      setPhase('done');
      localStorage.setItem('agc_splash_seen', '1');
      onComplete();
    }, 9800);

    return () => {
      if (flapRef.current) clearInterval(flapRef.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'linear-gradient(135deg, #f9ede8 0%, #f0d0c0 50%, #e8c4b0 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            overflow: 'hidden',
          }}
        >
          {/* Butterfly */}
          <div
            ref={bflyRef}
            style={{
              position: 'absolute',
              top: '-100px',
              left: '75%',
              transform: 'translate(-50%, -50%)',
              opacity: 0,
            }}
          >
            <svg width="90" height="90" viewBox="0 0 80 80">
              <ellipse ref={wulRef} cx="22" cy="26" rx="20" ry="14" fill="#c0736a" opacity="0.92"/>
              <ellipse ref={wurRef} cx="58" cy="26" rx="20" ry="14" fill="#c0736a" opacity="0.92"/>
              <ellipse ref={wllRef} cx="20" cy="46" rx="18" ry="12" fill="#a05a52" opacity="0.92"/>
              <ellipse ref={wlrRef} cx="60" cy="46" rx="18" ry="12" fill="#a05a52" opacity="0.92"/>
              {/* Inner wing highlights */}
              <ellipse cx="24" cy="26" rx="10" ry="7" fill="#d4907a" opacity="0.5"/>
              <ellipse cx="56" cy="26" rx="10" ry="7" fill="#d4907a" opacity="0.5"/>
              {/* Body */}
              <ellipse cx="40" cy="40" rx="4" ry="16" fill="#6a3828"/>
              {/* Antennae */}
              <line x1="40" y1="24" x2="27" y2="11" stroke="#6a3828" stroke-width="1.5" stroke-linecap="round"/>
              <line x1="40" y1="24" x2="53" y2="11" stroke="#6a3828" stroke-width="1.5" stroke-linecap="round"/>
              <circle cx="26" cy="10" r="2.5" fill="#6a3828"/>
              <circle cx="54" cy="10" r="2.5" fill="#6a3828"/>
            </svg>
          </div>

          {/* Wordmark */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(42px, 8vw, 68px)',
              color: '#4a2e24',
              letterSpacing: '-1px',
              marginTop: '80px',
              userSelect: 'none',
            }}
          >
            Centric
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1 }}
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(13px, 2.5vw, 17px)',
              color: '#8a4a3a',
              fontStyle: 'italic',
              marginTop: '12px',
              userSelect: 'none',
            }}
          >
            Rooted in Care — Your Restoration Journey
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.6 }}
            style={{
              fontFamily: 'sans-serif',
              fontSize: '11px',
              letterSpacing: '3px',
              color: '#a0685a',
              marginTop: '10px',
              userSelect: 'none',
            }}
          >
            BY AGC PLLC
          </motion.div>

          {/* Skip button — subtle, bottom right */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            transition={{ delay: 2.5 }}
            onClick={() => {
              if (flapRef.current) clearInterval(flapRef.current);
              localStorage.setItem('agc_splash_seen', '1');
              setPhase('done');
              onComplete();
            }}
            style={{
              position: 'absolute',
              bottom: '24px',
              right: '24px',
              background: 'none',
              border: 'none',
              color: '#8a4a3a',
              fontSize: '13px',
              fontFamily: 'sans-serif',
              cursor: 'pointer',
              letterSpacing: '1px',
            }}
          >
            skip
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
