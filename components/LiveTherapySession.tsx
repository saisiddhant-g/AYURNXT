
import React, { useState, useEffect, useRef } from 'react';
import { SessionTimer, SensationLevel, TherapyMode, THERAPY_PROTOCOLS } from '../therapyProtocol';

interface LiveTherapySessionProps {
  plasterId: string;
  bodyArea: string;
  mode: TherapyMode;
  onSessionComplete: (sensationCheck: SensationLevel, elapsedMinutes: number) => void;
  onEarlyTermination: (reason: string, elapsedMinutes: number) => void;
}

export const LiveTherapySession: React.FC<LiveTherapySessionProps> = ({
  plasterId,
  bodyArea,
  mode,
  onSessionComplete,
  onEarlyTermination
}) => {
  const protocol = THERAPY_PROTOCOLS[mode];
  const timerRef = useRef<SessionTimer>(new SessionTimer(protocol.sessionDurationMinutes));
  const completionAudioRef = useRef<HTMLAudioElement | null>(null);
  
  const [remainingSeconds, setRemainingSeconds] = useState(timerRef.current.getRemainingSeconds());
  const [progress, setProgress] = useState(0);
  const [showSensationCheck, setShowSensationCheck] = useState(false);
  const [sensationChecked, setSensationChecked] = useState(false);
  const [selectedSensation, setSelectedSensation] = useState<SensationLevel | null>(null);

  // Preload completion audio on mount
  useEffect(() => {
    completionAudioRef.current = new Audio('/sounds/therapy-complete.mp3');
    completionAudioRef.current.preload = 'auto';
    
    return () => {
      // Cleanup audio on unmount
      if (completionAudioRef.current) {
        completionAudioRef.current.pause();
        completionAudioRef.current = null;
      }
    };
  }, []);

  // Timer update effect
  useEffect(() => {
    const interval = setInterval(() => {
      const timer = timerRef.current;
      setRemainingSeconds(timer.getRemainingSeconds());
      setProgress(timer.getProgressPercent());

      // Show sensation check at 50% progress (once only)
      if (timer.getProgressPercent() >= 50 && !showSensationCheck && !sensationChecked) {
        setShowSensationCheck(true);
      }

      // Auto-complete when timer finishes
      if (timer.isComplete() && sensationChecked) {
        clearInterval(interval);
        
        // Play completion sound (only on successful completion)
        console.log('Therapy completed. Playing completion sound.');
        if (completionAudioRef.current) {
          completionAudioRef.current.currentTime = 0;
          completionAudioRef.current.play().catch(err => {
            console.error('Audio play failed:', err);
          });
        }
        
        onSessionComplete(selectedSensation || SensationLevel.MILD_WARMTH, timer.getElapsedMinutes());
      }
    }, 1000);

    // Prevent page unload during session
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = 'Therapy session in progress. Are you sure you want to leave?';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [sensationChecked, selectedSensation, showSensationCheck, onSessionComplete]);

  const handleSensationSelect = (sensation: SensationLevel) => {
    setSelectedSensation(sensation);
    setSensationChecked(true);
    setShowSensationCheck(false);

    // Handle strong discomfort - early termination
    if (sensation === SensationLevel.STRONG_DISCOMFORT) {
      const elapsedMinutes = timerRef.current.getElapsedMinutes();
      onEarlyTermination('Strong discomfort reported during sensation check', elapsedMinutes);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="px-6 py-8 max-w-md mx-auto min-h-screen flex flex-col justify-center protocol-transition">
      {/* Session Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-xl mb-4 session-locked">
          <div className="w-2 h-2 bg-emerald-500 rounded-full breathing-glow"></div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Session in Progress</span>
        </div>
        <h2 className="serif-heading text-2xl text-emerald-900 font-semibold mb-1">Active Therapy</h2>
        <p className="text-emerald-700/60 text-sm">{bodyArea}</p>
      </div>

      {/* Main Timer Display - Stitch Circular Progress */}
      <div className="stitch-card p-8 mb-8 relative overflow-hidden">
        {/* Breathing background glow */}
        <div className="absolute inset-0 breathing-glow opacity-20" style={{background: '#E8F3F0'}}></div>
        
        <div className="relative">
          {/* Circular Progress - Stitch Style */}
          <div className="relative w-56 h-56 mx-auto mb-6">
            {/* Outer breathing ring */}
            <div className="absolute inset-0 rounded-full breathing-pulse" style={{
              background: 'radial-gradient(circle, rgba(45, 95, 79, 0.1) 0%, transparent 70%)'
            }}></div>
            
            <svg className="transform -rotate-90 w-56 h-56">
              {/* Background circle */}
              <circle
                cx="112"
                cy="112"
                r="100"
                stroke="#E5E3DF"
                strokeWidth="12"
                fill="none"
              />
              {/* Progress circle - Stitch green */}
              <circle
                cx="112"
                cy="112"
                r="100"
                stroke="#2D5F4F"
                strokeWidth="12"
                fill="none"
                strokeDasharray={628}
                strokeDashoffset={628 - (628 * progress) / 100}
                className="transition-all duration-1000 ease-linear"
                strokeLinecap="round"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(45, 95, 79, 0.3))'
                }}
              />
            </svg>
            
            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-5xl font-bold tabular-nums mb-2" style={{
                color: '#2C3E3B',
                textShadow: '0 2px 8px rgba(45, 95, 79, 0.1)'
              }}>
                {formatTime(remainingSeconds)}
              </div>
              <div className="text-xs uppercase tracking-[0.2em] font-semibold" style={{color: '#9BA8A4'}}>
                Remaining
              </div>
            </div>
          </div>

          {/* Progress Info */}
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold" style={{color: '#2C3E3B'}}>
              {Math.round(progress)}%
            </div>
            <div className="text-sm flex items-center justify-center space-x-2" style={{color: '#6B7C78'}}>
              <i className="fa-solid fa-lock text-xs"></i>
              <span>{protocol.sessionDurationMinutes} minute protocol</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sensation Check Modal - Stitch Style */}
      {showSensationCheck && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 safety-overlay">
          <div className="stitch-card p-6 space-y-5 max-w-md w-full safety-content" style={{
            boxShadow: '0 8px 24px rgba(45, 95, 79, 0.16)'
          }}>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 breathing-glow" style={{
                background: '#2D5F4F',
                boxShadow: '0 4px 16px rgba(45, 95, 79, 0.12)'
              }}>
                <i className="fa-solid fa-hand-dots text-white text-2xl"></i>
              </div>
              <h3 className="font-bold text-lg mb-2" style={{color: '#2C3E3B'}}>How does it feel?</h3>
              <p className="text-sm leading-relaxed" style={{color: '#6B7C78'}}>Select your current sensation</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handleSensationSelect(SensationLevel.MILD_WARMTH)}
                className="w-full p-5 rounded-2xl stitch-card hover:shadow-md transition-all duration-300 text-left group deliberate-action"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{background: '#E8F3F0'}}>
                    <i className="fa-solid fa-circle-check text-xl" style={{color: '#2D5F4F'}}></i>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold mb-1" style={{color: '#2C3E3B'}}>Mild Warmth</div>
                    <div className="text-xs" style={{color: '#6B7C78'}}>Normal therapeutic sensation</div>
                  </div>
                  <i className="fa-solid fa-chevron-right group-hover:translate-x-1 transition-all duration-300" style={{color: '#9BA8A4'}}></i>
                </div>
              </button>

              <button
                onClick={() => handleSensationSelect(SensationLevel.NO_SENSATION)}
                className="w-full p-5 rounded-2xl stitch-card hover:shadow-md transition-all duration-300 text-left group deliberate-action"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{background: '#F5F3EF'}}>
                    <i className="fa-solid fa-circle text-xl" style={{color: '#9BA8A4'}}></i>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold mb-1" style={{color: '#2C3E3B'}}>No Sensation</div>
                    <div className="text-xs" style={{color: '#6B7C78'}}>Minimal or no feeling</div>
                  </div>
                  <i className="fa-solid fa-chevron-right group-hover:translate-x-1 transition-all duration-300" style={{color: '#9BA8A4'}}></i>
                </div>
              </button>

              <button
                onClick={() => handleSensationSelect(SensationLevel.STRONG_DISCOMFORT)}
                className="w-full p-5 rounded-2xl transition-all duration-300 text-left group deliberate-action" style={{
                  background: '#FEE2E2',
                  border: '2px solid #FCA5A5'
                }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{background: '#FCA5A5'}}>
                    <i className="fa-solid fa-shield-heart text-xl" style={{color: '#991B1B'}}></i>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold mb-1" style={{color: '#991B1B'}}>Strong Discomfort</div>
                    <div className="text-xs" style={{color: '#DC2626'}}>Session will end for your safety</div>
                  </div>
                  <i className="fa-solid fa-chevron-right group-hover:translate-x-1 transition-all duration-300" style={{color: '#DC2626'}}></i>
                </div>
              </button>
            </div>

            <div className="stitch-badge-success p-4 text-xs leading-relaxed flex items-start space-x-2">
              <i className="fa-solid fa-shield-heart mt-0.5 flex-shrink-0"></i>
              <span>This check ensures your safety during therapy. Select the option that best describes your current sensation.</span>
            </div>
          </div>
        </div>
      )}

      {/* Session Info */}
      {!showSensationCheck && (
        <div className="glass p-5 rounded-2xl space-y-3 animate-slideUp" style={{animationDelay: '0.2s'}}>
          <div className="flex items-center justify-between text-sm">
            <span className="text-emerald-700/70">Plaster ID</span>
            <span className="font-mono text-emerald-900 font-semibold">{plasterId}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-emerald-700/70">Therapy Mode</span>
            <span className="font-semibold text-emerald-900">
              {mode === TherapyMode.MILD_PAIN && 'Mild Pain Relief'}
              {mode === TherapyMode.MODERATE_PAIN && 'Moderate Pain Relief'}
              {mode === TherapyMode.POST_ACTIVITY && 'Post-Activity Recovery'}
            </span>
          </div>
          {sensationChecked && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-emerald-700/70">Sensation Check</span>
              <span className="flex items-center space-x-1 text-emerald-600">
                <i className="fa-solid fa-circle-check text-xs"></i>
                <span className="font-semibold">Completed</span>
              </span>
            </div>
          )}
        </div>
      )}

      {/* Safety Notice */}
      <div className="mt-8 glass p-4 rounded-2xl border border-emerald-100 animate-slideUp" style={{animationDelay: '0.3s'}}>
        <div className="flex items-start space-x-3">
          <i className="fa-solid fa-shield-heart text-emerald-600 mt-0.5"></i>
          <div className="text-xs text-emerald-700/70 leading-relaxed">
            <p className="font-semibold text-emerald-900 mb-1">Session Locked</p>
            <p>This session cannot be paused or restarted. If you experience strong discomfort, report it during the sensation check.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
