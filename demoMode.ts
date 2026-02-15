// Demo Mode Helper for Ayurnxt Protocol System
// Allows quick testing without waiting for full session durations

export const DEMO_MODE = {
  enabled: false, // Set to true for quick demos
  sessionDurationMultiplier: 1, // Set to 0.01 for 1% speed (45min → 27sec)
};

// Enable demo mode from browser console:
// window.ayurnxtDemo.enableFastMode()
// window.ayurnxtDemo.disableFastMode()

if (typeof window !== 'undefined') {
  (window as any).ayurnxtDemo = {
    ...(window as any).ayurnxtDemo,
    
    enableFastMode: () => {
      DEMO_MODE.enabled = true;
      DEMO_MODE.sessionDurationMultiplier = 0.02; // 2% speed (45min → 54sec)
      console.log('✅ Fast demo mode enabled');
      console.log('⚡ Sessions will run at 2% speed');
      console.log('📊 45min session → 54 seconds');
      console.log('🔄 Refresh page to apply');
    },
    
    disableFastMode: () => {
      DEMO_MODE.enabled = false;
      DEMO_MODE.sessionDurationMultiplier = 1;
      console.log('✅ Normal mode restored');
      console.log('🔄 Refresh page to apply');
    },
    
    ultraFastMode: () => {
      DEMO_MODE.enabled = true;
      DEMO_MODE.sessionDurationMultiplier = 0.005; // 0.5% speed (45min → 13.5sec)
      console.log('✅ Ultra-fast demo mode enabled');
      console.log('⚡⚡ Sessions will run at 0.5% speed');
      console.log('📊 45min session → 13.5 seconds');
      console.log('🔄 Refresh page to apply');
    },
    
    getStatus: () => {
      console.log('📊 Demo Mode Status:');
      console.log(`  Enabled: ${DEMO_MODE.enabled}`);
      console.log(`  Speed: ${DEMO_MODE.sessionDurationMultiplier * 100}%`);
      console.log(`  45min session → ${Math.round(45 * DEMO_MODE.sessionDurationMultiplier)} minutes`);
    }
  };
  
  console.log('🎯 Ayurnxt Demo Mode Available');
  console.log('💡 Type: window.ayurnxtDemo.enableFastMode()');
}

export function getDemoSessionDuration(normalMinutes: number): number {
  if (DEMO_MODE.enabled) {
    return normalMinutes * DEMO_MODE.sessionDurationMultiplier;
  }
  return normalMinutes;
}
