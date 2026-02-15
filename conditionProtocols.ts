/**
 * AYURNXT CONDITION-BASED PROTOCOL TIMINGS
 * 
 * System-defined protocol defaults for condition-specific therapy timing.
 * Based on commonly available practitioner guidance for topical oil applications.
 * 
 * IMPORTANT:
 * - These are demonstration protocol defaults, NOT medical advice
 * - All applications are EXTERNAL ONLY on appropriate skin conditions
 * - Consult healthcare professional for actual treatment decisions
 */

// ════════════════════════════════════════════════════════════════════════════
// CONDITION TYPE DEFINITIONS
// ════════════════════════════════════════════════════════════════════════════

export enum ConditionCategory {
  INTERNAL_PAIN = 'INTERNAL_PAIN',
  EXTERNAL_PAIN = 'EXTERNAL_PAIN',
  MINOR_SUPERFICIAL_WOUNDS = 'MINOR_SUPERFICIAL_WOUNDS',
  NOT_SUPPORTED = 'NOT_SUPPORTED'
}

// ════════════════════════════════════════════════════════════════════════════
// CONDITION PROTOCOL STRUCTURE
// ════════════════════════════════════════════════════════════════════════════

export interface ConditionProtocol {
  conditionType: ConditionCategory;
  displayName: string;
  description: string;
  examples: string[];
  
  // Timing specifications
  sessionDuration: string;              // e.g., "30–45 minutes"
  maxSessionsPerDay: number;            // Maximum sessions in 24 hours
  cooldownHours: number;                // Hours required before next session
  
  // Protocol text for display
  demoProtocolText: string;             // Neutral clinical reminder
  
  // Safety information
  skinRequirements: string[];           // Required skin conditions
  contraindicationWarning?: string;     // Warning for unsupported cases
  
  // UI support
  isSupported: boolean;                 // Whether system supports this condition
  safetyNotice?: string;                // Safety notice for unsupported conditions
}

// ════════════════════════════════════════════════════════════════════════════
// CONDITION-BASED PROTOCOL TIMINGS
// ════════════════════════════════════════════════════════════════════════════

export const CONDITION_PROTOCOLS: Record<ConditionCategory, ConditionProtocol> = {
  
  // ──────────────────────────────────────────────────────────────────────────
  // 1. INTERNAL PAIN
  // Deep musculoskeletal pain perceived internally
  // ──────────────────────────────────────────────────────────────────────────
  [ConditionCategory.INTERNAL_PAIN]: {
    conditionType: ConditionCategory.INTERNAL_PAIN,
    displayName: 'Internal Pain',
    description: 'Deep musculoskeletal pain perceived internally',
    examples: [
      'Joint pain (knee, shoulder, elbow, hip)',
      'Back pain (lower back, upper back)',
      'Muscle ache (deep tissue discomfort)',
      'Chronic stiffness',
      'Arthralgia (joint discomfort)'
    ],
    
    sessionDuration: '30–45 minutes',
    maxSessionsPerDay: 1,
    cooldownHours: 10,
    
    demoProtocolText: `System-defined protocol default based on commonly available practitioner guidance for topical oil applications. Traditional Ayurvedic thailam-based applications often recommend gentle application followed by a period of 30–45 minutes for deep musculoskeletal discomfort. This is a demonstration protocol and not medical advice. Consult a healthcare professional for personalized treatment guidance.`,
    
    skinRequirements: [
      'Intact external skin only',
      'No open wounds or breaks in skin',
      'Clean, dry application area'
    ],
    
    isSupported: true
  },
  
  // ──────────────────────────────────────────────────────────────────────────
  // 2. EXTERNAL PAIN
  // Surface-level discomfort on intact skin
  // ──────────────────────────────────────────────────────────────────────────
  [ConditionCategory.EXTERNAL_PAIN]: {
    conditionType: ConditionCategory.EXTERNAL_PAIN,
    displayName: 'External Pain',
    description: 'Surface-level discomfort on intact skin',
    examples: [
      'Muscle soreness (post-activity)',
      'Sprain discomfort (closed skin)',
      'Localized tenderness',
      'Mild strain',
      'Post-exercise muscle fatigue'
    ],
    
    sessionDuration: '20–30 minutes',
    maxSessionsPerDay: 1,
    cooldownHours: 8,
    
    demoProtocolText: `System-defined protocol default based on commonly available practitioner guidance. Topical oil applications for surface-level discomfort typically recommend 20–30 minutes of application time. This timing is derived from traditional practices where oils like Murivenna are applied and left on the skin for approximately 30 minutes. This is a demonstration protocol and not medical advice. Consult a healthcare professional for personalized treatment guidance.`,
    
    skinRequirements: [
      'Intact external skin only',
      'No open wounds or active bleeding',
      'Clean application area'
    ],
    
    isSupported: true
  },
  
  // ──────────────────────────────────────────────────────────────────────────
  // 3. MINOR SUPERFICIAL WOUNDS
  // Shallow abrasions, non-bleeding scratches, superficial burns
  // ──────────────────────────────────────────────────────────────────────────
  [ConditionCategory.MINOR_SUPERFICIAL_WOUNDS]: {
    conditionType: ConditionCategory.MINOR_SUPERFICIAL_WOUNDS,
    displayName: 'Minor Superficial Wounds',
    description: 'Shallow abrasions, non-bleeding scratches, superficial burns (healed surface only)',
    examples: [
      'Shallow abrasions (non-bleeding)',
      'Minor scratches (surface level, closed)',
      'Superficial burns (first-degree, healed)',
      'Paper cuts (closed, no bleeding)',
      'Minor skin irritation (healed surface)'
    ],
    
    sessionDuration: '15–20 minutes',
    maxSessionsPerDay: 1,
    cooldownHours: 12,
    
    demoProtocolText: `System-defined protocol default for minor superficial wounds with healed surface only. Application time is limited to 15–20 minutes to minimize skin exposure. This protocol applies ONLY to non-bleeding, closed superficial wounds. This is a demonstration protocol and not medical advice. Consult a healthcare professional for wound care guidance.`,
    
    skinRequirements: [
      'Wound surface must be closed and non-bleeding',
      'No active discharge or weeping',
      'No signs of infection (redness, swelling, warmth)',
      'Superficial layer only (no deep tissue involvement)',
      'Clean, dry wound area'
    ],
    
    contraindicationWarning: 'Do not apply to open, bleeding, or infected wounds. Discontinue immediately if irritation or discomfort occurs.',
    
    isSupported: true
  },
  
  // ──────────────────────────────────────────────────────────────────────────
  // 4. NOT SUPPORTED CASES
  // Open wounds, bleeding, infected wounds
  // ──────────────────────────────────────────────────────────────────────────
  [ConditionCategory.NOT_SUPPORTED]: {
    conditionType: ConditionCategory.NOT_SUPPORTED,
    displayName: 'Not Supported',
    description: 'Conditions not appropriate for external plaster therapy',
    examples: [
      'Open wounds (actively bleeding)',
      'Infected wounds (pus, discharge, fever)',
      'Deep lacerations',
      'Puncture wounds',
      'Surgical wounds (fresh)',
      'Burns (second-degree or higher)',
      'Ulcers (open)',
      'Skin with active infection'
    ],
    
    sessionDuration: 'N/A',
    maxSessionsPerDay: 0,
    cooldownHours: 0,
    
    demoProtocolText: `This condition type is not supported by the Ayurnxt external plaster therapy system.`,
    
    skinRequirements: [],
    
    safetyNotice: `⚠️ SAFETY NOTICE

Consult a healthcare professional; external plaster therapy is not appropriate for this condition.

This system is designed for external application on intact or appropriately healed skin only. Open wounds, bleeding wounds, and infected wounds require professional medical evaluation and treatment.

Please seek immediate medical attention for:
• Open or actively bleeding wounds
• Signs of infection (redness, swelling, warmth, discharge, fever)
• Deep lacerations or puncture wounds
• Burns beyond superficial first-degree
• Any wound requiring professional wound care

This is not a substitute for medical treatment.`,
    
    isSupported: false
  }
};

// ════════════════════════════════════════════════════════════════════════════
// CONDITION SELECTION HELPERS
// ════════════════════════════════════════════════════════════════════════════

/**
 * Get all supported condition categories for user selection
 */
export function getSupportedConditions(): ConditionCategory[] {
  return Object.values(ConditionCategory).filter(
    category => CONDITION_PROTOCOLS[category].isSupported
  );
}

/**
 * Get condition protocol by category
 */
export function getConditionProtocol(category: ConditionCategory): ConditionProtocol {
  return CONDITION_PROTOCOLS[category];
}

/**
 * Check if a condition is supported
 */
export function isConditionSupported(category: ConditionCategory): boolean {
  return CONDITION_PROTOCOLS[category].isSupported;
}

/**
 * Get safety notice for unsupported conditions
 */
export function getSafetyNotice(category: ConditionCategory): string | undefined {
  return CONDITION_PROTOCOLS[category].safetyNotice;
}

// ════════════════════════════════════════════════════════════════════════════
// STRUCTURED OUTPUT FORMAT
// ════════════════════════════════════════════════════════════════════════════

export interface ConditionTimingOutput {
  sessionDuration: string;
  maxSessionsPerDay: number;
  cooldownHours: number;
  demoProtocolText: string;
}

/**
 * Get structured timing output for a condition
 * Returns the format requested: sessionDuration, maxSessionsPerDay, cooldownHours, demoProtocolText
 */
export function getConditionTiming(category: ConditionCategory): ConditionTimingOutput {
  const protocol = CONDITION_PROTOCOLS[category];
  
  return {
    sessionDuration: protocol.sessionDuration,
    maxSessionsPerDay: protocol.maxSessionsPerDay,
    cooldownHours: protocol.cooldownHours,
    demoProtocolText: protocol.demoProtocolText
  };
}

/**
 * Get all condition timings as structured object
 */
export function getAllConditionTimings(): Record<ConditionCategory, ConditionTimingOutput> {
  const timings: Partial<Record<ConditionCategory, ConditionTimingOutput>> = {};
  
  Object.values(ConditionCategory).forEach(category => {
    timings[category] = getConditionTiming(category);
  });
  
  return timings as Record<ConditionCategory, ConditionTimingOutput>;
}

// ════════════════════════════════════════════════════════════════════════════
// VALIDATION & SAFETY CHECKS
// ════════════════════════════════════════════════════════════════════════════

export class ConditionValidator {
  
  /**
   * Validate if session can start for given condition
   */
  static canStartSession(
    category: ConditionCategory,
    lastSessionTime?: string
  ): { allowed: boolean; reason?: string } {
    
    // Check if condition is supported
    if (!isConditionSupported(category)) {
      return {
        allowed: false,
        reason: getSafetyNotice(category)
      };
    }
    
    const protocol = CONDITION_PROTOCOLS[category];
    
    // Check cooldown period
    if (lastSessionTime) {
      const lastSession = new Date(lastSessionTime).getTime();
      const cooldownMs = protocol.cooldownHours * 60 * 60 * 1000;
      const cooldownEnds = lastSession + cooldownMs;
      
      if (Date.now() < cooldownEnds) {
        const remainingHours = Math.ceil((cooldownEnds - Date.now()) / (60 * 60 * 1000));
        return {
          allowed: false,
          reason: `Cooldown period active. ${remainingHours} hours remaining before next session.`
        };
      }
    }
    
    return { allowed: true };
  }
  
  /**
   * Get session duration in minutes (parse from range string)
   */
  static getSessionDurationMinutes(category: ConditionCategory): number {
    const protocol = CONDITION_PROTOCOLS[category];
    
    // Parse "30–45 minutes" to get max value
    const match = protocol.sessionDuration.match(/(\d+)–(\d+)/);
    if (match) {
      return parseInt(match[2]); // Return max duration
    }
    
    // Fallback: try to parse single number
    const singleMatch = protocol.sessionDuration.match(/(\d+)/);
    return singleMatch ? parseInt(singleMatch[1]) : 30;
  }
  
  /**
   * Format cooldown remaining time
   */
  static formatCooldownRemaining(
    lastSessionTime: string,
    category: ConditionCategory
  ): string {
    const protocol = CONDITION_PROTOCOLS[category];
    const lastSession = new Date(lastSessionTime).getTime();
    const cooldownMs = protocol.cooldownHours * 60 * 60 * 1000;
    const cooldownEnds = lastSession + cooldownMs;
    const remaining = Math.max(0, cooldownEnds - Date.now());
    
    const hours = Math.floor(remaining / (60 * 60 * 1000));
    const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }
}

// ════════════════════════════════════════════════════════════════════════════
// UI DISPLAY HELPERS
// ════════════════════════════════════════════════════════════════════════════

/**
 * Get condition selection options for UI dropdown
 */
export interface ConditionOption {
  value: ConditionCategory;
  label: string;
  description: string;
  isSupported: boolean;
}

export function getConditionOptions(): ConditionOption[] {
  return Object.values(ConditionCategory).map(category => {
    const protocol = CONDITION_PROTOCOLS[category];
    return {
      value: category,
      label: protocol.displayName,
      description: protocol.description,
      isSupported: protocol.isSupported
    };
  });
}

/**
 * Get formatted protocol display for UI
 */
export function getProtocolDisplayText(category: ConditionCategory): string {
  const protocol = CONDITION_PROTOCOLS[category];
  
  if (!protocol.isSupported) {
    return protocol.safetyNotice || 'This condition is not supported.';
  }
  
  return `
${protocol.displayName}
${protocol.description}

Session Duration: ${protocol.sessionDuration}
Maximum Sessions per Day: ${protocol.maxSessionsPerDay}
Cooldown Period: ${protocol.cooldownHours} hours

Examples:
${protocol.examples.map(ex => `• ${ex}`).join('\n')}

Skin Requirements:
${protocol.skinRequirements.map(req => `• ${req}`).join('\n')}

${protocol.contraindicationWarning ? `⚠️ ${protocol.contraindicationWarning}\n` : ''}
${protocol.demoProtocolText}
  `.trim();
}
