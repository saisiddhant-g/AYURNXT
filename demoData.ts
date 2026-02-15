// Demo data generator for Ayurnxt
// This file helps populate the system with sample data for demonstration purposes

import { BandageRecord, ConditionType, WoundType, Severity, DailyLog } from './types';

export const generateDemoData = (): BandageRecord[] => {
  const demoRecords: BandageRecord[] = [
    {
      id: 'AYR-2024-001',
      patientName: 'Sarah Mitchell',
      age: '34',
      gender: 'Female',
      condition: ConditionType.WOUND,
      woundType: WoundType.SURGICAL,
      areaOfApplication: 'Knee',
      severity: Severity.MODERATE,
      startTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      practitionerName: 'Dr. Priya Sharma',
      instructions: {
        timesPerDay: 2,
        durationMinutes: 45,
        totalDays: 10,
        ayurvedicTips: [
          "Cleanse the application area gently with lukewarm water before each session.",
          "Ensure the plaster adheres comfortably without restricting circulation.",
          "Keep the area dry and protected from excessive moisture during therapy.",
          "Practice mindful breathing (Pranayama) to support the body's natural healing response.",
          "Maintain consistent application timing for optimal therapeutic benefit."
        ]
      },
      logs: [
        {
          id: '1',
          timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
          painLevel: 6,
          notes: 'Initial application. Slight discomfort but manageable. Area feels warm.',
          status: 'completed'
        },
        {
          id: '2',
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          painLevel: 5,
          notes: 'Pain reduced slightly. Swelling appears to be decreasing.',
          status: 'completed'
        },
        {
          id: '3',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          painLevel: 4,
          notes: 'Noticeable improvement. Mobility is better. Continuing as prescribed.',
          status: 'completed'
        },
        {
          id: '4',
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          painLevel: 3,
          notes: 'Significant progress. Pain is minimal. Area looks healthier.',
          status: 'completed'
        }
      ],
      reminders: ['08:00', '20:00']
    },
    {
      id: 'AYR-2024-002',
      patientName: 'James Chen',
      age: '45',
      gender: 'Male',
      condition: ConditionType.EXTERNAL_PAIN,
      areaOfApplication: 'Lower Back',
      severity: Severity.SEVERE,
      startTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      practitionerName: 'Dr. Rajesh Kumar',
      instructions: {
        timesPerDay: 3,
        durationMinutes: 45,
        totalDays: 14,
        ayurvedicTips: [
          "Cleanse the application area gently with lukewarm water before each session.",
          "Ensure the plaster adheres comfortably without restricting circulation.",
          "Keep the area dry and protected from excessive moisture during therapy.",
          "Practice mindful breathing (Pranayama) to support the body's natural healing response.",
          "Avoid heavy lifting and maintain proper posture during therapy period."
        ]
      },
      logs: [
        {
          id: '5',
          timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
          painLevel: 8,
          notes: 'Severe pain in lower back. Started therapy as recommended.',
          status: 'completed'
        },
        {
          id: '6',
          timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          painLevel: 7,
          notes: 'Slight improvement. Warmth from plaster is soothing.',
          status: 'completed'
        },
        {
          id: '7',
          timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
          painLevel: 6,
          notes: 'Pain decreasing gradually. Able to move more comfortably.',
          status: 'completed'
        }
      ],
      reminders: ['08:00', '14:00', '20:00']
    },
    {
      id: 'AYR-2024-003',
      patientName: 'Maria Rodriguez',
      age: '28',
      gender: 'Female',
      condition: ConditionType.WOUND,
      woundType: WoundType.ACUTE,
      areaOfApplication: 'Ankle',
      severity: Severity.MILD,
      startTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      practitionerName: 'Dr. Priya Sharma',
      instructions: {
        timesPerDay: 2,
        durationMinutes: 45,
        totalDays: 7,
        ayurvedicTips: [
          "Cleanse the application area gently with lukewarm water before each session.",
          "Ensure the plaster adheres comfortably without restricting circulation.",
          "Keep the area dry and protected from excessive moisture during therapy.",
          "Practice mindful breathing (Pranayama) to support the body's natural healing response.",
          "Elevate the ankle when resting to reduce swelling."
        ]
      },
      logs: [
        {
          id: '8',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          painLevel: 3,
          notes: 'Minor sprain. Plaster application is comfortable.',
          status: 'completed'
        },
        {
          id: '9',
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          painLevel: 2,
          notes: 'Much better today. Swelling has reduced significantly.',
          status: 'completed'
        }
      ],
      reminders: ['09:00', '21:00']
    }
  ];

  return demoRecords;
};

// Function to load demo data into localStorage
export const loadDemoData = () => {
  const demoData = generateDemoData();
  localStorage.setItem('ayurveda_records', JSON.stringify(demoData));
  console.log('✅ Demo data loaded successfully!');
  console.log(`📊 ${demoData.length} sample cases available`);
  console.log('🔑 Try these IDs: AYR-2024-001, AYR-2024-002, AYR-2024-003');
};

// Function to clear all data
export const clearAllData = () => {
  localStorage.removeItem('ayurveda_records');
  console.log('🗑️ All data cleared');
};

// Export for console access
if (typeof window !== 'undefined') {
  (window as any).ayurnxtDemo = {
    loadDemoData,
    clearAllData,
    generateDemoData
  };
}
