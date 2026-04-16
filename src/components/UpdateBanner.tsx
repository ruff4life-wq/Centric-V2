import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles } from 'lucide-react';

const SEEN_VERSION_KEY = 'centric_seen_version';

interface VersionData {
  version: string;
  updatedAt: string;
  changelog: string[];
}

interface UpdateBannerProps {
  onHasUpdate?: (hasUpdate: boolean) => void;
}

export default function UpdateBanner({ onHasUpdate }: UpdateBannerProps) {
  const [versionData, setVersionData] = useState<VersionData | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetch('/version.json?t=' + Date.now())
      .then(r => r.json())
      .then((data: VersionData) => {
        const seen = localStorage.getItem(SEEN_VERSION_KEY);
        if (seen !== data.version) {
          setVersionData(data);
          setVisible(true);
          onHasUpdate?.(true);
        } else {
          onHasUpdate?.(false);
        }
      })
      .catch(() => {
        // Silently fail — no banner if version.json unreachable
        onHasUpdate?.(false);
      });
  }, []);

  const dismiss = () => {
    if (versionData) {
      localStorage.setItem(SEEN_VERSION_KEY, versionData.version);
    }
    setVisible(false);
    onHasUpdate?.(false);
  };

  return (
    <AnimatePresence>
      {visible && versionData && (
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          className="fixed top-0 left-0 right-0 z-40 flex justify-center pointer-events-none px-4 pt-3"
        >
          <div className="pointer-events-auto w-full max-w-sm bg-[#4a2e24] text-white rounded-2xl shadow-xl overflow-hidden">
            <div className="px-5 py-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#c0736a] bg-opacity-20 border border-[#c0736a] border-opacity-30 flex items-center justify-center flex-shrink-0">
                    <Sparkles size={15} className="text-[#c4a078]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold tracking-widest text-[#c4a078] uppercase">
                      App Updated, v{versionData.version}
                    </p>
                    <p className="text-white font-serif text-sm mt-0.5">Here's what's new</p>
                  </div>
                </div>
                <button
                  onClick={dismiss}
                  className="text-[#c4a078] hover:text-white transition-colors flex-shrink-0 mt-0.5"
                >
                  <X size={17} />
                </button>
              </div>

              {/* Changelog */}
              <ul className="mt-3 space-y-1.5">
                {versionData.changelog.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-[13px] text-[#e8d5c4] leading-snug">
                    <span className="text-[#c0736a] mt-0.5 flex-shrink-0">+</span>
                    {item}
                  </li>
                ))}
              </ul>

              <button
                onClick={dismiss}
                className="mt-4 w-full text-center text-xs font-bold tracking-widest text-[#c4a078] uppercase py-2 border border-[#c4a078] border-opacity-30 rounded-xl hover:bg-white hover:bg-opacity-5 transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Hook for Profile tab badge
export function useUpdateBadge(): boolean {
  const [hasBadge, setHasBadge] = useState(false);

  useEffect(() => {
    fetch('/version.json?t=' + Date.now())
      .then(r => r.json())
      .then((data: VersionData) => {
        const seen = localStorage.getItem(SEEN_VERSION_KEY);
        setHasBadge(seen !== data.version);
      })
      .catch(() => setHasBadge(false));
  }, []);

  return hasBadge;
}
