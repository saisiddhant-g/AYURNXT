import { getDemoSessionDuration } from './demoMode';

// Ayurnxt Therapy Protocol System
// Enforces strict state transitions and clinical safety rules

export enum TherapyState {
  IDLE = 'IDLE',
  QR_SCAN = 'QR_SCAN',
  SETUP = 'SETUP',
  LIVE_SESSION = 'LIVE_SESSION',
  SESSION_END = 'SESSION_END',
  PAIN_LOGGING = 'PAIN_LOGGING',
  COMPLIANCE_REVIEW = 'COMPLIANCE_REVIEW'
}

export enum TherapyMode {
  MILD_PAIN = 'MILD_PAIN',
  MODERATE_PAIN = 'MODERATE_PAIN',
  POST_ACTIVITY = 'POST_ACTIVITY'
}

export enum SensationLevel {
  MILD_WARMTH = 'MILD_WARMTH',
  NO_SENSATION = 'NO_SENSATION',
  STRONG_DISCOMFORT = 'STRONG_DISCOMFORT'
}

export enum SessionStatus {
  COMPLETED = 'COMPLETED',
  INCOMPLETE = 'INCOMPLETE',
  TERMINATED_EARLY = 'TERMINATED_EARLY'
}

export interface TherapyProtocolConfig {
  mode: TherapyMode;
  sessionDurationMinutes: number;
  cooldownMinutes: number;
  safetyNotes: string[];
}

export interface BodyArea {
  id: string;
  name: string;
  allowed: boolean;
}

export interface TherapySession {
  id: string;
  plasterId: string;
  bodyArea: string;
  mode: TherapyMode;
  startTime: string;
  endTime?: string;
  durationMinutes: number;
  status: SessionStatus;
  sensationCheck?: SensationLevel;
  painBefore: number;
  painAfter?: number;
  notes?: string;
  terminationReason?: string;
}

export interface ComplianceMetrics {
  totalSessions: number;
  completedSessions: number;
  incompleteSessions: number;
  complianceScore: number; // 0-100
  consistencyStreak: number;
  lastSessionTime?: string;
  cooldownEndsAt?: string;
}

// Protocol configurations for each therapy mode
export const THERAPY_PROTOCOLS: Record<TherapyMode, TherapyProtocolConfig> = {
  [TherapyMode.MILD_PAIN]: {
    mode: TherapyMode.MILD_PAIN,
    sessionDurationMinutes: 30,
    cooldownMinutes: 240, // 4 hours
    safetyNotes: [
      'Mild warmth is expected during therapy',
      'Session will run for 30 minutes',
      'Next session available after 4-hour cooldown',
      'Remove plaster if discomfort increases'
    ]
  },
  [TherapyMode.MODERATE_PAIN]: {
    mode: TherapyMode.MODERATE_PAIN,
    sessionDurationMinutes: 45,
    cooldownMinutes: 360, // 6 hours
    safetyNotes: [
      'Moderate warmth is normal during therapy',
      'Session will run for 45 minutes',
      'Next session available after 6-hour cooldown',
      'Stop immediately if strong discomfort occurs',
      'Ensure area is clean before application'
    ]
  },
  [TherapyMode.POST_ACTIVITY]: {
    mode: TherapyMode.POST_ACTIVITY,
    sessionDurationMinutes: 25,
    cooldownMinutes: 180, // 3 hours
    safetyNotes: [
      'Gentle warmth supports recovery',
      'Session will run for 25 minutes',
      'Next session available after 3-hour cooldown',
      'Best applied within 2 hours post-activity'
    ]
  }
};

// Allowed body areas for therapy
export const BODY_AREAS: BodyArea[] = [
  { id: 'knee', name: 'Knee', allowed: true },
  { id: 'shoulder', name: 'Shoulder', allowed: true },
  { id: 'lower_back', name: 'Lower Back', allowed: true },
  { id: 'neck', name: 'Neck', allowed: true },
  { id: 'elbow', name: 'Elbow', allowed: true },
  { id: 'ankle', name: 'Ankle', allowed: true }
];

// State transition validation
export class TherapyStateManager {
  private currentState: TherapyState = TherapyState.IDLE;
  private stateHistory: TherapyState[] = [];

  canTransitionTo(newState: TherapyState): boolean {
    const validTransitions: Record<TherapyState, TherapyState[]> = {
      [TherapyState.IDLE]: [TherapyState.QR_SCAN],
      [TherapyState.QR_SCAN]: [TherapyState.SETUP],
      [TherapyState.SETUP]: [TherapyState.LIVE_SESSION],
      [TherapyState.LIVE_SESSION]: [TherapyState.SESSION_END],
      [TherapyState.SESSION_END]: [TherapyState.PAIN_LOGGING],
      [TherapyState.PAIN_LOGGING]: [TherapyState.COMPLIANCE_REVIEW],
      [TherapyState.COMPLIANCE_REVIEW]: [TherapyState.QR_SCAN, TherapyState.IDLE]
    };

    return validTransitions[this.currentState]?.includes(newState) || false;
  }

  transitionTo(newState: TherapyState): boolean {
    if (this.canTransitionTo(newState)) {
      this.stateHistory.push(this.currentState);
      this.currentState = newState;
      return true;
    }
    return false;
  }

  getCurrentState(): TherapyState {
    return this.currentState;
  }

  reset(): void {
    this.currentState = TherapyState.IDLE;
    this.stateHistory = [];
  }
}

// Session timer management
export class SessionTimer {
  private startTime: number;
  private durationMs: number;
  private endTime: number;

  constructor(durationMinutes: number) {
    const adjustedDuration = getDemoSessionDuration(durationMinutes);
    this.startTime = Date.now();
    this.durationMs = adjustedDuration * 60 * 1000;
    this.endTime = this.startTime + this.durationMs;
  }

  getRemainingSeconds(): number {
    const remaining = Math.max(0, this.endTime - Date.now());
    return Math.floor(remaining / 1000);
  }

  getProgressPercent(): number {
    const elapsed = Date.now() - this.startTime;
    return Math.min(100, (elapsed / this.durationMs) * 100);
  }

  isComplete(): boolean {
    return Date.now() >= this.endTime;
  }

  getElapsedMinutes(): number {
    const elapsed = Date.now() - this.startTime;
    return Math.floor(elapsed / 60000);
  }
}

// Cooldown management
export class CooldownManager {
  static isInCooldown(lastSessionTime: string, cooldownMinutes: number): boolean {
    const lastSession = new Date(lastSessionTime).getTime();
    const cooldownMs = cooldownMinutes * 60 * 1000;
    const cooldownEnds = lastSession + cooldownMs;
    return Date.now() < cooldownEnds;
  }

  static getCooldownRemainingMinutes(lastSessionTime: string, cooldownMinutes: number): number {
    const lastSession = new Date(lastSessionTime).getTime();
    const cooldownMs = cooldownMinutes * 60 * 1000;
    const cooldownEnds = lastSession + cooldownMs;
    const remaining = Math.max(0, cooldownEnds - Date.now());
    return Math.ceil(remaining / 60000);
  }

  static getCooldownEndTime(lastSessionTime: string, cooldownMinutes: number): string {
    const lastSession = new Date(lastSessionTime).getTime();
    const cooldownMs = cooldownMinutes * 60 * 1000;
    return new Date(lastSession + cooldownMs).toISOString();
  }
}

// Compliance calculation
export class ComplianceCalculator {
  static calculateMetrics(sessions: TherapySession[]): ComplianceMetrics {
    const totalSessions = sessions.length;
    const completedSessions = sessions.filter(s => s.status === SessionStatus.COMPLETED).length;
    const incompleteSessions = totalSessions - completedSessions;
    const complianceScore = totalSessions > 0 ? Math.round((completedSessions / totalSessions) * 100) : 0;

    // Calculate consistency streak (consecutive completed sessions)
    let streak = 0;
    for (let i = sessions.length - 1; i >= 0; i--) {
      if (sessions[i].status === SessionStatus.COMPLETED) {
        streak++;
      } else {
        break;
      }
    }

    const lastSession = sessions[sessions.length - 1];

    return {
      totalSessions,
      completedSessions,
      incompleteSessions,
      complianceScore,
      consistencyStreak: streak,
      lastSessionTime: lastSession?.endTime,
      cooldownEndsAt: lastSession?.endTime 
        ? CooldownManager.getCooldownEndTime(
            lastSession.endTime, 
            THERAPY_PROTOCOLS[lastSession.mode].cooldownMinutes
          )
        : undefined
    };
  }

  static detectPainTrend(sessions: TherapySession[]): 'improving' | 'stable' | 'worsening' | 'insufficient_data' {
    const completedSessions = sessions.filter(s => s.status === SessionStatus.COMPLETED && s.painAfter !== undefined);
    
    if (completedSessions.length < 2) {
      return 'insufficient_data';
    }

    // Compare last 3 sessions
    const recentSessions = completedSessions.slice(-3);
    const painChanges = recentSessions.map(s => (s.painAfter || 0) - s.painBefore);
    const avgChange = painChanges.reduce((sum, change) => sum + change, 0) / painChanges.length;

    if (avgChange < -1) return 'improving';
    if (avgChange > 1) return 'worsening';
    return 'stable';
  }

  static shouldRecommendConsultation(sessions: TherapySession[]): boolean {
    const trend = this.detectPainTrend(sessions);
    if (trend === 'worsening') return true;

    // Check for multiple early terminations
    const recentSessions = sessions.slice(-5);
    const earlyTerminations = recentSessions.filter(s => s.status === SessionStatus.TERMINATED_EARLY).length;
    if (earlyTerminations >= 2) return true;

    // Check for consistently high pain levels
    const completedSessions = sessions.filter(s => s.status === SessionStatus.COMPLETED && s.painAfter !== undefined);
    const recentPainLevels = completedSessions.slice(-3).map(s => s.painAfter || 0);
    const avgPain = recentPainLevels.reduce((sum, pain) => sum + pain, 0) / recentPainLevels.length;
    if (avgPain >= 7) return true;

    return false;
  }
}

// Generate unique plaster ID
export function generatePlasterId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `AYR-${timestamp}-${random}`;
}

// Validate state persistence (prevent page refresh bypass)
export function persistSessionState(key: string, data: any): void {
  localStorage.setItem(`ayurnxt_session_${key}`, JSON.stringify(data));
}

export function retrieveSessionState(key: string): any | null {
  const data = localStorage.getItem(`ayurnxt_session_${key}`);
  return data ? JSON.parse(data) : null;
}

export function clearSessionState(key: string): void {
  localStorage.removeItem(`ayurnxt_session_${key}`);
}
