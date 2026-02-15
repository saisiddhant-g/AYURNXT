
import React, { useState } from 'react';
import { TherapyMode, THERAPY_PROTOCOLS, BODY_AREAS, BodyArea } from '../therapyProtocol';
import { 
  ConditionCategory, 
  getConditionProtocol, 
  getConditionTiming,
  isConditionSupported,
  getSafetyNotice,
  ConditionValidator
} from '../conditionProtocols';

interface TherapySetupProps {
  plasterId: string;
  onSetupComplete: (bodyArea: string, mode: TherapyMode) => void;
}

export const TherapySetup: React.FC<TherapySetupProps> = ({ plasterId, onSetupComplete }) => {
  const [step, setStep] = useState<'condition' | 'bodyArea' | 'mode'>('condition');
  const [selectedCondition, setSelectedCondition] = useState<ConditionCategory | null>(null);
  const [selectedArea, setSelectedArea] = useState<string>('');
  const [selectedMode, setSelectedMode] = useState<TherapyMode | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleConditionSelect = (condition: ConditionCategory) => {
    // Check if condition is supported
    if (!isConditionSupported(condition)) {
      const notice = getSafetyNotice(condition);
      alert(notice);
      return;
    }
    
    setSelectedCondition(condition);
    setStep('bodyArea');
  };

  const handleBodyAreaSelect = (area: string) => {
    setSelectedArea(area);
    setStep('mode');
  };

  const handleConfirm = () => {
    console.log('Start Therapy clicked');
    console.log('Selected Area:', selectedArea);
    console.log('Selected Mode:', selectedMode);
    console.log('Selected Condition:', selectedCondition);
    
    if (selectedArea && selectedMode && selectedCondition) {
      console.log('Transitioning to ACTIVE state');
      onSetupComplete(selectedArea, selectedMode);
    } else {
      console.error('Missing required selections:', { selectedArea, selectedMode, selectedCondition });
    }
  };

  const selectedProtocol = selectedMode ? THERAPY_PROTOCOLS[selectedMode] : null;
  const conditionProtocol = selectedCondition ? getConditionProtocol(selectedCondition) : null;
  const conditionTiming = selectedCondition ? getConditionTiming(selectedCondition) : null;

  return (
    <div className="px-6 py-8 max-w-md mx-auto space-y-6 protocol-transition">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4" style={{
          background: '#2D5F4F',
          boxShadow: '0 2px 8px rgba(45, 95, 79, 0.08)'
        }}>
          <i className="fa-solid fa-sliders text-white text-xl"></i>
        </div>
        <h2 className="text-3xl font-bold mb-2" style={{color: '#2C3E3B'}}>Therapy Configuration</h2>
        <p className="text-sm" style={{color: '#6B7C78'}}>Configure your supervised therapy protocol</p>
        <div className="mt-3 inline-flex items-center space-x-2 stitch-card px-4 py-2">
          <i className="fa-solid fa-barcode text-sm" style={{color: '#2D5F4F'}}></i>
          <span className="text-xs font-mono" style={{color: '#6B7C78'}}>{plasterId}</span>
        </div>
      </div>

      {/* Progress Indicator - Stitch Style */}
      <div className="flex items-center justify-center space-x-2">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
          step === 'condition' ? 'text-white' : 
          selectedCondition ? 'text-white' : 'text-white'
        }`} style={{
          background: step === 'condition' || selectedCondition ? '#2D5F4F' : '#E5E3DF'
        }}>
          1
        </div>
        <div className="w-12 h-0.5" style={{background: selectedCondition ? '#2D5F4F' : '#E5E3DF'}}></div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
          step === 'bodyArea' || selectedArea ? 'text-white' : 'text-white'
        }`} style={{
          background: step === 'bodyArea' || selectedArea ? '#2D5F4F' : '#E5E3DF'
        }}>
          2
        </div>
        <div className="w-12 h-0.5" style={{background: selectedArea ? '#2D5F4F' : '#E5E3DF'}}></div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
          step === 'mode' || selectedMode ? 'text-white' : 'text-white'
        }`} style={{
          background: step === 'mode' || selectedMode ? '#2D5F4F' : '#E5E3DF'
        }}>
          3
        </div>
      </div>

      {/* STEP 1: Condition Type Selection - Stitch Cards */}
      {step === 'condition' && (
        <section className="stitch-card p-6 space-y-4 protocol-slide">
          <div className="flex items-center space-x-2 mb-2">
            <i className="fa-solid fa-stethoscope text-sm" style={{color: '#2D5F4F'}}></i>
            <h3 className="text-xs font-bold uppercase tracking-wider" style={{color: '#6B7C78'}}>Select Condition Type</h3>
          </div>

          <div className="space-y-3">
            {/* Internal Pain - Orange Icon */}
            <button
              onClick={() => handleConditionSelect(ConditionCategory.INTERNAL_PAIN)}
              className="w-full p-4 rounded-xl transition-all duration-300 text-left deliberate-action stitch-card hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold" style={{color: '#2C3E3B'}}>Internal Pain</span>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background: '#F5E6D8'}}>
                  <i className="fa-solid fa-bone" style={{color: '#D4915C'}}></i>
                </div>
              </div>
              <div className="text-xs mb-2" style={{color: '#6B7C78'}}>
                Deep musculoskeletal pain perceived internally
              </div>
              <div className="text-xs space-y-1" style={{color: '#9BA8A4'}}>
                <div>• Joint pain (knee, shoulder, elbow)</div>
                <div>• Back pain, muscle ache</div>
              </div>
            </button>

            {/* External Pain - Blue/Teal Icon */}
            <button
              onClick={() => handleConditionSelect(ConditionCategory.EXTERNAL_PAIN)}
              className="w-full p-4 rounded-xl transition-all duration-300 text-left deliberate-action stitch-card hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold" style={{color: '#2C3E3B'}}>External Pain</span>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background: '#E8F3F0'}}>
                  <i className="fa-solid fa-hand-dots" style={{color: '#2D5F4F'}}></i>
                </div>
              </div>
              <div className="text-xs mb-2" style={{color: '#6B7C78'}}>
                Surface-level discomfort on intact skin
              </div>
              <div className="text-xs space-y-1" style={{color: '#9BA8A4'}}>
                <div>• Muscle soreness, sprain discomfort</div>
                <div>• Localized tenderness</div>
              </div>
            </button>

            {/* Minor Superficial Wounds - Red Icon */}
            <button
              onClick={() => handleConditionSelect(ConditionCategory.MINOR_SUPERFICIAL_WOUNDS)}
              className="w-full p-4 rounded-xl transition-all duration-300 text-left deliberate-action stitch-card hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold" style={{color: '#2C3E3B'}}>Minor Superficial Wounds</span>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background: '#FEE2E2'}}>
                  <i className="fa-solid fa-bandage" style={{color: '#DC2626'}}></i>
                </div>
              </div>
              <div className="text-xs mb-2" style={{color: '#6B7C78'}}>
                Shallow, non-bleeding, closed wounds only
              </div>
              <div className="text-xs space-y-1" style={{color: '#9BA8A4'}}>
                <div>• Minor scratches (closed, healed)</div>
                <div>• Superficial burns (first-degree)</div>
              </div>
              <div className="mt-2 stitch-badge-warning text-xs">
                ⚠️ Wound must be fully closed, no bleeding
              </div>
            </button>

            {/* Not Supported */}
            <button
              onClick={() => handleConditionSelect(ConditionCategory.NOT_SUPPORTED)}
              className="w-full p-4 rounded-xl transition-all duration-300 text-left deliberate-action opacity-60 cursor-not-allowed"
              style={{background: '#FEE2E2', border: '2px solid #FCA5A5'}}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold" style={{color: '#991B1B'}}>Open/Bleeding/Infected Wounds</span>
                <i className="fa-solid fa-triangle-exclamation" style={{color: '#DC2626'}}></i>
              </div>
              <div className="text-xs mb-2" style={{color: '#991B1B'}}>
                NOT SUPPORTED - Requires professional care
              </div>
              <div className="text-xs" style={{color: '#DC2626'}}>
                Consult a healthcare professional immediately
              </div>
            </button>
          </div>
        </section>
      )}

      {/* STEP 2: Body Area Selection */}
      {step === 'bodyArea' && selectedCondition && (
        <>
          <section className="glass p-6 rounded-3xl shadow-lg space-y-4 protocol-slide">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <i className="fa-solid fa-location-dot text-emerald-600 text-sm"></i>
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800/70">Application Area</h3>
              </div>
              <button
                onClick={() => setStep('condition')}
                className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center space-x-1"
              >
                <i className="fa-solid fa-arrow-left"></i>
                <span>Back</span>
              </button>
            </div>

            <div className="bg-emerald-50 p-3 rounded-xl mb-3">
              <div className="text-xs text-emerald-700">
                <span className="font-semibold">Condition: </span>
                {conditionProtocol?.displayName}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {BODY_AREAS.filter(area => area.allowed).map(area => (
                <button
                  key={area.id}
                  onClick={() => handleBodyAreaSelect(area.id)}
                  className={`p-4 rounded-xl font-semibold transition-all duration-300 text-sm deliberate-action ${
                    selectedArea === area.id
                      ? 'bg-gradient-to-br from-emerald-600 to-emerald-700 text-white shadow-lg shadow-emerald-200/50 scale-105'
                      : 'bg-white/60 text-emerald-700/60 border border-emerald-100 hover:bg-white/80 hover:scale-102'
                  }`}
                >
                  {area.name}
                </button>
              ))}
            </div>
          </section>

          {/* Show condition timing info */}
          {conditionTiming && (
            <section className="glass p-4 rounded-2xl shadow-lg">
              <div className="text-xs font-semibold text-emerald-800 mb-3">Protocol Timing for {conditionProtocol?.displayName}</div>
              <div className="text-xs text-emerald-700 space-y-2">
                <div className="flex justify-between">
                  <span className="text-emerald-600">Session Duration:</span>
                  <span className="font-semibold">{conditionTiming.sessionDuration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-600">Max per Day:</span>
                  <span className="font-semibold">{conditionTiming.maxSessionsPerDay}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-600">Cooldown:</span>
                  <span className="font-semibold">{conditionTiming.cooldownHours} hours</span>
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* STEP 3: Therapy Mode Selection */}
      {step === 'mode' && selectedArea && selectedCondition && (
        <>
          <section className="glass p-6 rounded-3xl shadow-lg space-y-4 protocol-slide">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <i className="fa-solid fa-gauge text-emerald-600 text-sm"></i>
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800/70">Therapy Mode</h3>
              </div>
              <button
                onClick={() => setStep('bodyArea')}
                className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center space-x-1"
              >
                <i className="fa-solid fa-arrow-left"></i>
                <span>Back</span>
              </button>
            </div>

            <div className="bg-emerald-50 p-3 rounded-xl mb-3 space-y-1">
              <div className="text-xs text-emerald-700">
                <span className="font-semibold">Condition: </span>
                {conditionProtocol?.displayName}
              </div>
              <div className="text-xs text-emerald-700">
                <span className="font-semibold">Area: </span>
                {BODY_AREAS.find(a => a.id === selectedArea)?.name}
              </div>
            </div>

            <div className="space-y-3">
              {Object.entries(THERAPY_PROTOCOLS).map(([key, protocol]) => (
                <button
                  key={key}
                  onClick={() => setSelectedMode(protocol.mode)}
                  className={`w-full p-4 rounded-xl transition-all duration-300 text-left deliberate-action ${
                    selectedMode === protocol.mode
                      ? 'bg-gradient-to-br from-emerald-600 to-emerald-700 text-white shadow-lg shadow-emerald-200/50'
                      : 'bg-white/60 border border-emerald-100 hover:bg-white/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-bold ${selectedMode === protocol.mode ? 'text-white' : 'text-emerald-900'}`}>
                      {protocol.mode === TherapyMode.MILD_PAIN && 'Mild Pain Relief'}
                      {protocol.mode === TherapyMode.MODERATE_PAIN && 'Moderate Pain Relief'}
                      {protocol.mode === TherapyMode.POST_ACTIVITY && 'Post-Activity Recovery'}
                    </span>
                    {selectedMode === protocol.mode && (
                      <i className="fa-solid fa-circle-check text-white"></i>
                    )}
                  </div>
                  <div className={`text-xs space-y-1 ${selectedMode === protocol.mode ? 'text-emerald-100' : 'text-emerald-700/70'}`}>
                    <div className="flex items-center space-x-2">
                      <i className="fa-solid fa-clock text-[10px]"></i>
                      <span>{protocol.sessionDurationMinutes} min session</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <i className="fa-solid fa-hourglass text-[10px]"></i>
                      <span>{Math.floor(protocol.cooldownMinutes / 60)}h cooldown</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Protocol Details */}
          {selectedProtocol && (
            <section className="glass p-6 rounded-3xl shadow-lg space-y-4 animate-slideUp">
              <div className="flex items-center space-x-2 mb-2">
                <i className="fa-solid fa-shield-heart text-emerald-600 text-sm"></i>
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800/70">Safety Protocol</h3>
              </div>

              <ul className="space-y-3">
                {selectedProtocol.safetyNotes.map((note, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-emerald-50 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5">
                      <i className="fa-solid fa-check text-xs text-emerald-600"></i>
                    </div>
                    <span className="text-sm text-emerald-900/80 leading-relaxed">{note}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Confirmation Button */}
          {selectedMode && !showConfirmation && (
            <button
              onClick={() => setShowConfirmation(true)}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold py-5 rounded-2xl shadow-xl shadow-emerald-200/50 hover:shadow-2xl hover:scale-[1.02] transition-smooth flex items-center justify-center space-x-2 animate-slideUp"
            >
              <i className="fa-solid fa-arrow-right"></i>
              <span>Review Configuration</span>
            </button>
          )}
        </>
      )}

      {/* Final Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 safety-overlay">
          <div className="glass p-6 rounded-3xl shadow-2xl border-2 border-emerald-200 space-y-4 max-w-md w-full safety-content">
            <div className="text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-md shadow-amber-200/50 breathing-glow">
                <i className="fa-solid fa-shield-heart text-white text-xl"></i>
              </div>
              <h3 className="font-bold text-emerald-900 mb-2 text-lg">Confirm Therapy Protocol</h3>
              <p className="text-sm text-emerald-700/70 mb-4">Please verify your configuration before starting</p>
            </div>

            <div className="bg-white/60 p-4 rounded-xl space-y-2 text-sm border border-emerald-100">
              <div className="flex justify-between">
                <span className="text-emerald-700/70">Condition Type:</span>
                <span className="font-semibold text-emerald-900">
                  {conditionProtocol?.displayName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-700/70">Application Area:</span>
                <span className="font-semibold text-emerald-900">
                  {BODY_AREAS.find(a => a.id === selectedArea)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-700/70">Therapy Mode:</span>
                <span className="font-semibold text-emerald-900">
                  {selectedMode === TherapyMode.MILD_PAIN && 'Mild Pain Relief'}
                  {selectedMode === TherapyMode.MODERATE_PAIN && 'Moderate Pain Relief'}
                  {selectedMode === TherapyMode.POST_ACTIVITY && 'Post-Activity Recovery'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-700/70">Session Duration:</span>
                <span className="font-semibold text-emerald-900">{conditionTiming?.sessionDuration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-700/70">Cooldown Period:</span>
                <span className="font-semibold text-emerald-900">{conditionTiming?.cooldownHours} hours</span>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl">
              <p className="text-xs text-amber-900 leading-relaxed flex items-start space-x-2">
                <i className="fa-solid fa-lock text-amber-600 mt-0.5 flex-shrink-0"></i>
                <span>Once started, the session cannot be paused or restarted. You will be prompted for a sensation check during therapy.</span>
              </p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 py-4 rounded-xl bg-white/60 text-emerald-700/70 font-semibold hover:bg-white/80 transition-all duration-300 border border-emerald-100 deliberate-action"
              >
                Modify
              </button>
              <button
                onClick={handleConfirm}
                className="flex-[2] py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold shadow-lg shadow-emerald-200/50 hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 deliberate-action"
              >
                <i className="fa-solid fa-play"></i>
                <span>Start Therapy Session</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
