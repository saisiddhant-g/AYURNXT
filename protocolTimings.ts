/**
 * AYURNXT PROTOCOL-LEVEL APPLICATION TIMINGS
 * 
 * IMPORTANT BOUNDARIES:
 * - This is NOT medical advice
 * - This is NOT diagnosis or treatment
 * - These are system-defined protocol defaults for demo application
 * - Application is EXTERNAL ONLY on intact skin
 * - "Internal pain" = pain perceived internally (muscle, joint, deep tissue)
 * - Plaster is ALWAYS applied on intact external skin
 * - NO open, bleeding, or infected wounds
 * 
 * Language: Clinical, neutral, safety-oriented
 */

// ════════════════════════════════════════════════════════════════════════════
// PAIN CATEGORY DEFINITIONS
// ════════════════════════════════════════════════════════════════════════════

export enum PainCategory {
  INTERNAL_PAIN = 'INTERNAL_PAIN',      // Deep-seated pain perceived internally
  EXTERNAL_PAIN = 'EXTERNAL_PAIN',      // Surface-level discomfort on closed skin
  HEALED_SKIN = 'HEALED_SKIN'           // Closed/healed skin only (no wounds)
}

// ════════════════════════════════════════════════════════════════════════════
// PROTOCOL TIMING CONFIGURATION
// ════════════════════════════════════════════════════════════════════════════

export interface ProtocolTiming {
  category: PainCategory;
  displayName: string;
  description: string;
  examples: string[];
  
  // Application protocol
  sessionDurationMin: number;           // Minimum session duration (minutes)
  sessionDurationMax: number;           // Maximum session duration (minutes)
  maxSessionsPerDay: number;            // Maximum sessions allowed per day
  cooldownMinHours: number;             // Minimum cooldown before next session
  cooldownMaxHours: number;             // Maximum cooldown before next session
  
  // Expected sensations
  expectedSensations: string[];
  
  // Safety rules
  strictRules: string[];
  
  // System notes
  systemNotes: string[];
  
  // Duration editability
  isDurationEditable: boolean;
}

// ════════════════════════════════════════════════════════════════════════════
// STANDARDIZED PROTOCOL TIMINGS
// ════════════════════════════════════════════════════════════════════════════

export const PROTOCOL_TIMINGS: Record<PainCategory, ProtocolTiming> = {
  
  // ──────────────────────────────────────────────────────────────────────────
  // 1. INTERNAL PAIN (Deep-seated pain perceived internally)
  // ──────────────────────────────────────────────────────────────────────────
  [PainCategory.INTERNAL_PAIN]: {
    category: PainCategory.INTERNAL_PAIN,
    displayName: 'Internal Pain',
    description: 'Deep-seated pain perceived internally (muscle, joint, deep tissue)',
    examples: [
      'Joint pain (knee, shoulder, elbow)',
      'Lower back pain',
      'Muscle spasms',
      'Chronic stiffness'
    ],
    
    sessionDurationMin: 30,
    sessionDurationMax: 45,
    maxSessionsPerDay: 1,
    cooldownMinHours: 8,
    cooldownMaxHours: 12,
    
    expectedSensations: [
      'Mild warmth',
      'Gradual comfort'
    ],
    
    strictRules: [
      'Application is on intact external skin only',
      'Session duration is fixed and non-editable',
      'Maximum 1 session per day',
      'Minimum 8-hour cooldown required between sessions'
    ],
    
    systemNotes: [
      'Duration is fixed and non-editable',
      'Designed for comfort support, not pain cure',
      'System-defined protocol default'
    ],
    
    isDurationEditable: false
  },
  
  // ──────────────────────────────────────────────────────────────────────────
  // 2. EXTERNAL PAIN (Surface-level discomfort on closed skin)
  // ──────────────────────────────────────────────────────────────────────────
  [PainCategory.EXTERNAL_PAIN]: {
    category: PainCategory.EXTERNAL_PAIN,
    displayName: 'External Pain',
    description: 'Surface-level discomfort on closed skin',
    examples: [
      'Muscle soreness',
      'Post-activity fatigue',
      'Localized tenderness',
      'Mild inflammation (non-acute)'
    ],
    
    sessionDurationMin: 20,
    sessionDurationMax: 30,
    maxSessionsPerDay: 1,
    cooldownMinHours: 6,
    cooldownMaxHours: 8,
    
    expectedSensations: [
      'Gentle warmth',
      'Relaxation of area'
    ],
    
    strictRules: [
      'Application is on intact external skin only',
      'Maximum 1 session per day',
      'Minimum 6-hour cooldown required between sessions',
      'Discontinue immediately if irritation occurs'
    ],
    
    systemNotes: [
      'Shorter duration to avoid skin fatigue',
      'Discontinue if irritation occurs',
      'System-defined protocol default'
    ],
    
    isDurationEditable: false
  },
  
  // ──────────────────────────────────────────────────────────────────────────
  // 3. HEALED SKIN (Closed/healed skin only - NO wounds)
  // ──────────────────────────────────────────────────────────────────────────
  [PainCategory.HEALED_SKIN]: {
    category: PainCategory.HEALED_SKIN,
    displayName: 'Healed Skin (Closed Only)',
    description: 'Closed/healed skin only - NO open wounds, bleeding, or infection',
    examples: [
      'Minor healed scratches',
      'Post-wound skin discomfort (no scab, no bleeding)',
      'Residual tenderness after skin closure'
    ],
    
    sessionDurationMin: 15,
    sessionDurationMax: 20,
    maxSessionsPerDay: 1,
    cooldownMinHours: 12,
    cooldownMaxHours: 24,
    
    expectedSensations: [
      'Minimal sensation',
      'Gentle comfort'
    ],
    
    strictRules: [
      'Skin MUST be fully closed',
      'NO cuts, bleeding, discharge, or infection',
      'Immediate removal if irritation occurs',
      'Maximum 1 session per day',
      'Minimum 12-hour cooldown required between sessions'
    ],
    
    systemNotes: [
      'Intended for comfort around healed skin only',
      'NOT for wound healing or infection management',
      'System-defined protocol default'
    ],
    
    isDurationEditable: false
  }
};

// ════════════════════════════════════════════════════════════════════════════
// GLOBAL SAFETY ENFORCEMENT
// ════════════════════════════════════════════════════════════════════════════

export const GLOBAL_SAFETY_RULES = {
  // Session enforcement
  preventExtendedSessions: true,
  lockDurationOnceStarted: true,
  
  // Emergency termination
  allowEmergencyStop: true,
  emergencyStopTriggers: [
    'Strong discomfort',
    'Burning sensation',
    'Skin irritation',
    'Unexpected pain increase'
  ],
  
  // Mandatory disclaimers
  mandatoryDisclaimers: [
    'Consult a healthcare professional if pain or discomfort persists.',
    'This system provides comfort support only, not medical treatment.',
    'Application is for external use on intact skin only.'
  ],
  
  // Prohibited conditions
  prohibitedConditions: [
    'Open wounds',
    'Bleeding skin',
    'Infected areas',
    'Broken skin',
    'Active inflammation with swelling',
    'Skin with discharge'
  ]
};

// ════════════════════════════════════════════════════════════════════════════
// SAFETY VALIDATION FUNCTIONS
// ════════════════════════════════════════════════════════════════════════════

export class ProtocolSafetyValidator {
  
  /**
   * Validate if a session can be started based on protocol rules
   */
  static canStartSession(
    category: PainCategory,
    lastSessionTime?: string
  ): { allowed: boolean; reason?: string } {
    const protocol = PROTOCOL_TIMINGS[category];
    
    // Check cooldown period
    if (lastSessionTime) {
      const lastSession = new Date(lastSessionTime).getTime();
      const cooldownMs = protocol.cooldownMinHours * 60 * 60 * 1000;
      const cooldownEnds = lastSession + cooldownMs;
      
      if (Date.now() < cooldownEnds) {
        const remainingMinutes = Math.ceil((cooldownEnds - Date.now()) / 60000);
        return {
          allowed: false,
          reason: `Cooldown period active. ${remainingMinutes} minutes remaining before next session.`
        };
      }
    }
    
    return { allowed: true };
  }
  
  /**
   * Get session duration for a category (non-editable)
   */
  static getSessionDuration(category: PainCategory): number {
    const protocol = PROTOCOL_TIMINGS[category];
    // Return the maximum duration as the fixed duration
    return protocol.sessionDurationMax;
  }
  
  /**
   * Validate if emergency stop is needed based on user feedback
   */
  static shouldEmergencyStop(sensationLevel: string): boolean {
    const dangerousSensations = [
      'strong discomfort',
      'burning',
      'severe pain',
      'intense heat',
      'irritation'
    ];
    
    return dangerousSensations.some(sensation => 
      sensationLevel.toLowerCase().includes(sensation)
    );
  }
  
  /**
   * Get safety guidance message for emergency stop
   */
  static getEmergencyStopGuidance(): string {
    return `
Session terminated for your safety.

Immediate actions:
• Remove the plaster gently
• Cleanse the area with cool water if needed
• Allow skin to rest

${GLOBAL_SAFETY_RULES.mandatoryDisclaimers[0]}
    `.trim();
  }
  
  /**
   * Get protocol timing display for UI
   */
  static getProtocolDisplay(category: PainCategory): string {
    const protocol = PROTOCOL_TIMINGS[category];
    return `
${protocol.displayName}
Duration: ${protocol.sessionDurationMin}–${protocol.sessionDurationMax} minutes
Max sessions per day: ${protocol.maxSessionsPerDay}
Cooldown: ${protocol.cooldownMinHours}–${protocol.cooldownMaxHours} hours

Expected sensations:
${protocol.expectedSensations.map(s => `• ${s}`).join('\n')}

System notes:
${protocol.systemNotes.map(n => `• ${n}`).join('\n')}
    `.trim();
  }
}

// ════════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS FOR UI INTEGRATION
// ════════════════════════════════════════════════════════════════════════════

/**
 * Get all available pain categories for selection
 */
export function getAvailableCategories(): PainCategory[] {
  return Object.values(PainCategory);
}

/**
 * Get protocol timing for a specific category
 */
export function getProtocolTiming(category: PainCategory): ProtocolTiming {
  return PROTOCOL_TIMINGS[category];
}

/**
 * Format cooldown time remaining
 */
export function formatCooldownRemaining(
  lastSessionTime: string,
  category: PainCategory
): string {
  const protocol = PROTOCOL_TIMINGS[category];
  const lastSession = new Date(lastSessionTime).getTime();
  const cooldownMs = protocol.cooldownMinHours * 60 * 60 * 1000;
  const cooldownEnds = lastSession + cooldownMs;
  const remaining = Math.max(0, cooldownEnds - Date.now());
  
  const hours = Math.floor(remaining / (60 * 60 * 1000));
  const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

/**
 * Check if category requires special warnings
 */
export function requiresSpecialWarning(category: PainCategory): boolean {
  return category === PainCategory.HEALED_SKIN;
}

/**
 * Get special warning message for category
 */
export function getSpecialWarning(category: PainCategory): string | null {
  if (category === PainCategory.HEALED_SKIN) {
    return 'CRITICAL: Skin must be fully closed with NO cuts, bleeding, discharge, or infection. Immediate removal if irritation occurs.';
  }
  return null;
}
