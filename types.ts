// Legacy types for backward compatibility with AdminDashboard
// New protocol system uses types from therapyProtocol.ts

export enum ConditionType {
  WOUND = 'Wound',
  EXTERNAL_PAIN = 'External Pain',
  INTERNAL_PAIN = 'Internal Pain',
  POST_PROCEDURE = 'Post-procedure Care',
  OTHER = 'Other'
}

export enum WoundType {
  ACUTE = 'Acute Wound',
  CHRONIC = 'Chronic Wound',
  SURGICAL = 'Surgical Wound',
  BURN = 'Burn',
  ULCER = 'Ulcer',
  OTHER = 'Other'
}

export enum Severity {
  MILD = 'Mild',
  MODERATE = 'Moderate',
  SEVERE = 'Severe'
}

export interface DailyLog {
  id: string;
  timestamp: string;
  painLevel: number;
  notes: string;
  imageUrl?: string;
  status: 'completed' | 'missed';
}

export interface BandageRecord {
  id: string;
  patientName: string;
  age: string;
  gender: string;
  condition: ConditionType;
  otherCondition?: string;
  woundType?: WoundType;
  otherWoundType?: string;
  areaOfApplication: string;
  severity: Severity;
  startTime: string;
  practitionerName: string;
  instructions: {
    timesPerDay: number;
    durationMinutes: number;
    totalDays: number;
    ayurvedicTips: string[];
  };
  logs: DailyLog[];
  reminders: string[];
}
