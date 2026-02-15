// User-Scoped Data Service
// All therapy data is scoped per userId - no cross-user overlap

import { TherapySession } from '../therapyProtocol';

export class UserDataService {
  // Generate user-scoped key
  private static getUserKey(userId: string, dataType: string): string {
    return `ayurnxt_user_${userId}_${dataType}`;
  }

  // ==================== THERAPY SESSIONS ====================
  
  static getSessions(userId: string): TherapySession[] {
    const key = this.getUserKey(userId, 'sessions');
    const data = localStorage.getItem(key);
    if (!data) return [];

    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  static saveSessions(userId: string, sessions: TherapySession[]): void {
    const key = this.getUserKey(userId, 'sessions');
    localStorage.setItem(key, JSON.stringify(sessions));
  }

  static addSession(userId: string, session: TherapySession): void {
    const sessions = this.getSessions(userId);
    sessions.push(session);
    this.saveSessions(userId, sessions);
  }

  // ==================== ACTIVATED QR UNITS ====================
  
  static getActivatedUnits(userId: string): string[] {
    const key = this.getUserKey(userId, 'units');
    const data = localStorage.getItem(key);
    if (!data) return [];

    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  static addActivatedUnit(userId: string, plasterId: string): void {
    const units = this.getActivatedUnits(userId);
    if (!units.includes(plasterId)) {
      units.push(plasterId);
      const key = this.getUserKey(userId, 'units');
      localStorage.setItem(key, JSON.stringify(units));
    }
  }

  static isUnitActivated(userId: string, plasterId: string): boolean {
    const units = this.getActivatedUnits(userId);
    return units.includes(plasterId);
  }

  // ==================== ACTIVE SESSION STATE ====================
  
  static getActiveState(userId: string): any {
    const key = this.getUserKey(userId, 'active_state');
    const data = localStorage.getItem(key);
    if (!data) return null;

    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  }

  static saveActiveState(userId: string, state: any): void {
    const key = this.getUserKey(userId, 'active_state');
    localStorage.setItem(key, JSON.stringify(state));
  }

  static clearActiveState(userId: string): void {
    const key = this.getUserKey(userId, 'active_state');
    localStorage.removeItem(key);
  }

  // ==================== COOLDOWN TIMERS ====================
  
  static getCooldownData(userId: string): any {
    const key = this.getUserKey(userId, 'cooldown');
    const data = localStorage.getItem(key);
    if (!data) return null;

    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  }

  static saveCooldownData(userId: string, cooldownData: any): void {
    const key = this.getUserKey(userId, 'cooldown');
    localStorage.setItem(key, JSON.stringify(cooldownData));
  }

  // ==================== USER PREFERENCES ====================
  
  static getPreferences(userId: string): any {
    const key = this.getUserKey(userId, 'preferences');
    const data = localStorage.getItem(key);
    if (!data) return {};

    try {
      return JSON.parse(data);
    } catch {
      return {};
    }
  }

  static savePreferences(userId: string, preferences: any): void {
    const key = this.getUserKey(userId, 'preferences');
    localStorage.setItem(key, JSON.stringify(preferences));
  }

  // ==================== CLEAR ALL USER DATA ====================
  
  static clearAllUserData(userId: string): void {
    const dataTypes = ['sessions', 'units', 'active_state', 'cooldown', 'preferences'];
    dataTypes.forEach(type => {
      const key = this.getUserKey(userId, type);
      localStorage.removeItem(key);
    });
  }
}
