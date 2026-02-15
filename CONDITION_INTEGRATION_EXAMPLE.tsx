/**
 * CONDITION PROTOCOL INTEGRATION EXAMPLE
 * 
 * This file demonstrates how to integrate the condition-based protocol
 * timing system into the Ayurnxt therapy application.
 */

import React, { useState } from 'react';
import {
  ConditionCategory,
  getConditionOptions,
  getConditionProtocol,
  getConditionTiming,
  isConditionSupported,
  getSafetyNotice,
  ConditionValidator,
  getProtocolDisplayText
} from './conditionProtocols';

// ════════════════════════════════════════════════════════════════════════════
// EXAMPLE 1: Condition Selection Component
// ════════════════════════════════════════════════════════════════════════════

export const ConditionSelector: React.FC<{
  onSelect: (condition: ConditionCategory) => void;
}> = ({ onSelect }) => {
  const [selectedCondition, setSelectedCondition] = useState<ConditionCategory | null>(null);
  const conditionOptions = getConditionOptions();

  const handleSelect = (condition: ConditionCategory) => {
    setSelectedCondition(condition);
    
    // Check if condition is supported
    if (!isConditionSupported(condition)) {
      // Show safety notice for unsupported conditions
      const notice = getSafetyNotice(condition);
      alert(notice);
      return;
    }
    
    onSelect(condition);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-emerald-900">
        Select Condition Type
      </h3>
      
      <div className="grid gap-3">
        {conditionOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSelect(option.value)}
            disabled={!option.isSupported}
            className={`
              p-4 rounded-lg border-2 text-left transition-all
              ${option.isSupported 
                ? 'border-emerald-300 hover:border-emerald-500 hover:bg-emerald-50' 
                : 'border-gray-300 bg-gray-100 cursor-not-allowed opacity-60'
              }
              ${selectedCondition === option.value ? 'border-emerald-600 bg-emerald-50' : ''}
            `}
          >
            <div className="font-semibold text-emerald-900">
              {option.label}
              {!option.isSupported && (
                <span className="ml-2 text-xs text-red-600 font-normal">
                  (Not Supported)
                </span>
              )}
            </div>
            <div className="text-sm text-emerald-700 mt-1">
              {option.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// EXAMPLE 2: Protocol Display Component
// ════════════════════════════════════════════════════════════════════════════

export const ProtocolDisplay: React.FC<{
  condition: ConditionCategory;
}> = ({ condition }) => {
  const protocol = getConditionProtocol(condition);
  const timing = getConditionTiming(condition);

  if (!protocol.isSupported) {
    return (
      <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6">
        <div className="text-red-900 font-semibold text-lg mb-3">
          ⚠️ Condition Not Supported
        </div>
        <div className="text-red-800 whitespace-pre-line">
          {protocol.safetyNotice}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-emerald-50 border-2 border-emerald-300 rounded-lg p-6 space-y-4">
      <div>
        <h4 className="font-semibold text-emerald-900 text-lg">
          {protocol.displayName}
        </h4>
        <p className="text-emerald-700 text-sm mt-1">
          {protocol.description}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-3">
          <div className="text-xs text-emerald-600 font-medium">Duration</div>
          <div className="text-lg font-semibold text-emerald-900 mt-1">
            {timing.sessionDuration}
          </div>
        </div>
        <div className="bg-white rounded-lg p-3">
          <div className="text-xs text-emerald-600 font-medium">Max/Day</div>
          <div className="text-lg font-semibold text-emerald-900 mt-1">
            {timing.maxSessionsPerDay}
          </div>
        </div>
        <div className="bg-white rounded-lg p-3">
          <div className="text-xs text-emerald-600 font-medium">Cooldown</div>
          <div className="text-lg font-semibold text-emerald-900 mt-1">
            {timing.cooldownHours}h
          </div>
        </div>
      </div>

      <div>
        <div className="text-sm font-medium text-emerald-900 mb-2">Examples:</div>
        <ul className="text-sm text-emerald-700 space-y-1">
          {protocol.examples.map((example, idx) => (
            <li key={idx}>• {example}</li>
          ))}
        </ul>
      </div>

      <div>
        <div className="text-sm font-medium text-emerald-900 mb-2">
          Skin Requirements:
        </div>
        <ul className="text-sm text-emerald-700 space-y-1">
          {protocol.skinRequirements.map((req, idx) => (
            <li key={idx}>• {req}</li>
          ))}
        </ul>
      </div>

      {protocol.contraindicationWarning && (
        <div className="bg-amber-50 border border-amber-300 rounded p-3">
          <div className="text-sm text-amber-900">
            ⚠️ {protocol.contraindicationWarning}
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg p-4 border border-emerald-200">
        <div className="text-xs font-medium text-emerald-600 mb-2">
          PROTOCOL NOTE:
        </div>
        <div className="text-xs text-emerald-800 leading-relaxed">
          {timing.demoProtocolText}
        </div>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// EXAMPLE 3: Session Validation Before Start
// ════════════════════════════════════════════════════════════════════════════

export const useSessionValidation = (condition: ConditionCategory) => {
  const validateSession = (lastSessionTime?: string) => {
    // Validate if session can start
    const validation = ConditionValidator.canStartSession(condition, lastSessionTime);
    
    if (!validation.allowed) {
      return {
        canStart: false,
        message: validation.reason || 'Session cannot be started at this time.'
      };
    }
    
    // Get session duration
    const durationMinutes = ConditionValidator.getSessionDurationMinutes(condition);
    
    return {
      canStart: true,
      durationMinutes,
      message: `Session can start. Duration: ${durationMinutes} minutes.`
    };
  };

  const getCooldownStatus = (lastSessionTime: string) => {
    const remaining = ConditionValidator.formatCooldownRemaining(lastSessionTime, condition);
    return {
      isInCooldown: true,
      remainingTime: remaining
    };
  };

  return {
    validateSession,
    getCooldownStatus
  };
};

// ════════════════════════════════════════════════════════════════════════════
// EXAMPLE 4: Complete Condition Setup Flow
// ════════════════════════════════════════════════════════════════════════════

export const ConditionSetupFlow: React.FC = () => {
  const [step, setStep] = useState<'select' | 'confirm' | 'ready'>('select');
  const [selectedCondition, setSelectedCondition] = useState<ConditionCategory | null>(null);
  const [lastSessionTime] = useState<string | undefined>(undefined); // From user data

  const handleConditionSelect = (condition: ConditionCategory) => {
    setSelectedCondition(condition);
    setStep('confirm');
  };

  const handleConfirm = () => {
    if (!selectedCondition) return;

    // Validate session can start
    const validation = ConditionValidator.canStartSession(
      selectedCondition,
      lastSessionTime
    );

    if (!validation.allowed) {
      alert(validation.reason);
      return;
    }

    setStep('ready');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {step === 'select' && (
        <>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-emerald-900">
              Select Your Condition
            </h2>
            <p className="text-emerald-700 mt-2">
              Choose the condition type that best describes your situation
            </p>
          </div>
          <ConditionSelector onSelect={handleConditionSelect} />
        </>
      )}

      {step === 'confirm' && selectedCondition && (
        <>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-emerald-900">
              Review Protocol
            </h2>
            <p className="text-emerald-700 mt-2">
              Please review the protocol details for your condition
            </p>
          </div>
          <ProtocolDisplay condition={selectedCondition} />
          <div className="flex gap-3">
            <button
              onClick={() => setStep('select')}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
            >
              Back
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
            >
              Confirm & Continue
            </button>
          </div>
        </>
      )}

      {step === 'ready' && selectedCondition && (
        <div className="text-center">
          <div className="text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-emerald-900 mb-2">
            Ready to Start Session
          </h2>
          <p className="text-emerald-700">
            Condition: {getConditionProtocol(selectedCondition).displayName}
          </p>
          <p className="text-emerald-700">
            Duration: {getConditionTiming(selectedCondition).sessionDuration}
          </p>
        </div>
      )}
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// EXAMPLE 5: Integration with Existing TherapySetup Component
// ════════════════════════════════════════════════════════════════════════════

export const enhanceTherapySetupWithConditions = () => {
  // Example of how to integrate into existing TherapySetup.tsx
  
  return {
    // Add condition selection step before body area selection
    addConditionStep: () => {
      console.log('Add condition selection as first step in therapy setup');
    },
    
    // Update session duration based on selected condition
    updateSessionDuration: (condition: ConditionCategory) => {
      const durationMinutes = ConditionValidator.getSessionDurationMinutes(condition);
      console.log(`Set session duration to ${durationMinutes} minutes`);
      return durationMinutes;
    },
    
    // Validate before starting session
    validateBeforeStart: (condition: ConditionCategory, lastSession?: string) => {
      return ConditionValidator.canStartSession(condition, lastSession);
    },
    
    // Display protocol text in setup
    getProtocolText: (condition: ConditionCategory) => {
      return getConditionTiming(condition).demoProtocolText;
    }
  };
};

// ════════════════════════════════════════════════════════════════════════════
// EXAMPLE 6: Quick Reference Usage
// ════════════════════════════════════════════════════════════════════════════

export const quickReferenceExamples = () => {
  // Get all condition timings
  const allTimings = {
    internalPain: getConditionTiming(ConditionCategory.INTERNAL_PAIN),
    externalPain: getConditionTiming(ConditionCategory.EXTERNAL_PAIN),
    minorWounds: getConditionTiming(ConditionCategory.MINOR_SUPERFICIAL_WOUNDS),
    notSupported: getConditionTiming(ConditionCategory.NOT_SUPPORTED)
  };

  console.log('All Timings:', allTimings);

  // Check if condition is supported
  const isSupported = isConditionSupported(ConditionCategory.INTERNAL_PAIN);
  console.log('Is Internal Pain supported?', isSupported); // true

  // Get safety notice for unsupported condition
  const safetyNotice = getSafetyNotice(ConditionCategory.NOT_SUPPORTED);
  console.log('Safety Notice:', safetyNotice);

  // Get full protocol display text
  const displayText = getProtocolDisplayText(ConditionCategory.EXTERNAL_PAIN);
  console.log('Protocol Display:', displayText);

  // Validate session
  const validation = ConditionValidator.canStartSession(
    ConditionCategory.INTERNAL_PAIN,
    '2024-02-08T10:00:00Z'
  );
  console.log('Can start session?', validation);

  return allTimings;
};
