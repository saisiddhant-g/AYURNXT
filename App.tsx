
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { QRScanSimulation } from './components/QRScanSimulation';
import { TherapySetup } from './components/TherapySetup';
import { LiveTherapySession } from './components/LiveTherapySession';
import { SessionEnd } from './components/SessionEnd';
import { StructuredPainLogging } from './components/StructuredPainLogging';
import { ComplianceDashboard } from './components/ComplianceDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { Settings } from './components/Settings';
import { AuthService } from './services/authService';
import { UserDataService } from './services/userDataService';
import { 
  TherapyState, 
  TherapyMode, 
  TherapySession, 
  SessionStatus,
  SensationLevel,
  TherapyStateManager
} from './therapyProtocol';

type ViewType = 'landing' | 'protocol' | 'admin' | 'settings';

const App: React.FC = () => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  
  // View management
  const [view, setView] = useState<ViewType>('landing');
  
  // State machine
  const [stateManager] = useState(() => new TherapyStateManager());
  const [currentState, setCurrentState] = useState<TherapyState>(TherapyState.IDLE);
  
  // Session data
  const [currentPlasterId, setCurrentPlasterId] = useState<string>('');
  const [currentBodyArea, setCurrentBodyArea] = useState<string>('');
  const [currentMode, setCurrentMode] = useState<TherapyMode | null>(null);
  const [currentSessionStatus, setCurrentSessionStatus] = useState<SessionStatus>(SessionStatus.COMPLETED);
  const [currentTerminationReason, setCurrentTerminationReason] = useState<string>('');
  const [currentSensation, setCurrentSensation] = useState<SensationLevel>(SensationLevel.MILD_WARMTH);
  const [currentElapsedMinutes, setCurrentElapsedMinutes] = useState<number>(0);
  const [currentPainBefore, setCurrentPainBefore] = useState<number>(0);
  
  // All sessions storage
  const [allSessions, setAllSessions] = useState<TherapySession[]>([]);

  // Check authentication and load user data on mount
  useEffect(() => {
    const session = AuthService.getSession();
    if (session) {
      setIsAuthenticated(true);
      setUserId(session.userId);
      
      // Load user-scoped sessions
      const saved = UserDataService.getSessions(session.userId);
      if (saved) {
        setAllSessions(saved);
      }

      // Load and apply user preferences (including dark mode)
      const preferences = UserDataService.getPreferences(session.userId);
      if (preferences && preferences.darkMode) {
        document.documentElement.classList.add('dark');
      }

      // Check for active session state
      const activeState = UserDataService.getActiveState(session.userId);
      if (activeState) {
        // Restore state in both React state and state manager
        setCurrentState(activeState.state);
        setCurrentPlasterId(activeState.plasterId || '');
        setCurrentBodyArea(activeState.bodyArea || '');
        setCurrentMode(activeState.mode || null);
        setView('protocol');
        
        // Synchronize state manager with restored state
        // Replay transitions to get state manager to the correct state
        if (activeState.state === TherapyState.SETUP) {
          stateManager.transitionTo(TherapyState.QR_SCAN);
          stateManager.transitionTo(TherapyState.SETUP);
        } else if (activeState.state === TherapyState.LIVE_SESSION) {
          stateManager.transitionTo(TherapyState.QR_SCAN);
          stateManager.transitionTo(TherapyState.SETUP);
          stateManager.transitionTo(TherapyState.LIVE_SESSION);
        }
        // Add other states as needed
      }
    }
  }, []);
  // Persist sessions whenever they change (user-scoped)
  useEffect(() => {
    if (allSessions.length > 0 && userId) {
      UserDataService.saveSessions(userId, allSessions);
    }
  }, [allSessions, userId]);

  // Persist active state for page refresh protection (user-scoped)
  useEffect(() => {
    if (userId && currentState !== TherapyState.IDLE && currentState !== TherapyState.COMPLIANCE_REVIEW) {
      UserDataService.saveActiveState(userId, {
        state: currentState,
        plasterId: currentPlasterId,
        bodyArea: currentBodyArea,
        mode: currentMode
      });
    } else if (userId) {
      UserDataService.clearActiveState(userId);
    }
  }, [currentState, currentPlasterId, currentBodyArea, currentMode, userId]);

  // State transition helper
  const transitionTo = (newState: TherapyState): boolean => {
    console.log('=== Transition Attempt ===');
    console.log('From state:', currentState);
    console.log('To state:', newState);
    console.log('State manager current state:', stateManager.getCurrentState());
    console.log('Can transition?', stateManager.canTransitionTo(newState));
    
    if (stateManager.transitionTo(newState)) {
      console.log('✓ Transition successful');
      setCurrentState(newState);
      return true;
    }
    console.error(`✗ Invalid state transition from ${stateManager.getCurrentState()} to ${newState}`);
    return false;
  };

  // Handler: QR Scan Complete
  const handleQRScanComplete = (plasterId: string) => {
    setCurrentPlasterId(plasterId);
    transitionTo(TherapyState.SETUP);
  };

  // Handler: Setup Complete
  const handleSetupComplete = (bodyArea: string, mode: TherapyMode) => {
    console.log('handleSetupComplete called');
    console.log('Body Area:', bodyArea);
    console.log('Therapy Mode:', mode);
    console.log('Current State:', currentState);
    
    setCurrentBodyArea(bodyArea);
    setCurrentMode(mode);
    
    console.log('Attempting transition to LIVE_SESSION');
    const success = transitionTo(TherapyState.LIVE_SESSION);
    console.log('Transition success:', success);
  };

  // Handler: Session Complete
  const handleSessionComplete = (sensation: SensationLevel, elapsedMinutes: number) => {
    setCurrentSensation(sensation);
    setCurrentElapsedMinutes(elapsedMinutes);
    setCurrentSessionStatus(SessionStatus.COMPLETED);
    transitionTo(TherapyState.SESSION_END);
  };

  // Handler: Early Termination
  const handleEarlyTermination = (reason: string, elapsedMinutes: number) => {
    setCurrentTerminationReason(reason);
    setCurrentElapsedMinutes(elapsedMinutes);
    setCurrentSessionStatus(SessionStatus.TERMINATED_EARLY);
    transitionTo(TherapyState.SESSION_END);
  };

  // Handler: Proceed to Pain Logging
  const handleProceedToLogging = () => {
    transitionTo(TherapyState.PAIN_LOGGING);
  };

  // Handler: Pain Logging Complete
  const handlePainLoggingComplete = (data: { painBefore: number; painAfter: number; mobilityNotes?: string }) => {
    setCurrentPainBefore(data.painBefore);
    
    // Create session record
    const newSession: TherapySession = {
      id: Date.now().toString(),
      plasterId: currentPlasterId,
      bodyArea: currentBodyArea,
      mode: currentMode!,
      startTime: new Date(Date.now() - currentElapsedMinutes * 60000).toISOString(),
      endTime: new Date().toISOString(),
      durationMinutes: currentElapsedMinutes,
      status: currentSessionStatus,
      sensationCheck: currentSensation,
      painBefore: data.painBefore,
      painAfter: data.painAfter,
      notes: data.mobilityNotes,
      terminationReason: currentSessionStatus === SessionStatus.TERMINATED_EARLY ? currentTerminationReason : undefined
    };

    // Add to sessions
    setAllSessions(prev => [...prev, newSession]);

    // Transition to compliance review
    transitionTo(TherapyState.COMPLIANCE_REVIEW);
  };

  // Handler: Start New Session
  const handleStartNewSession = () => {
    // Reset session data
    setCurrentPlasterId('');
    setCurrentBodyArea('');
    setCurrentMode(null);
    setCurrentSessionStatus(SessionStatus.COMPLETED);
    setCurrentTerminationReason('');
    setCurrentSensation(SensationLevel.MILD_WARMTH);
    setCurrentElapsedMinutes(0);
    setCurrentPainBefore(0);
    
    // Reset state machine
    stateManager.reset();
    setCurrentState(TherapyState.IDLE);
    
    // Go to QR scan
    transitionTo(TherapyState.QR_SCAN);
  };

  // Handler: Return to Landing
  const handleReturnToLanding = () => {
    stateManager.reset();
    setCurrentState(TherapyState.IDLE);
    setView('landing');
  };

  // Handler: Logout
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout? Your therapy data will be preserved.')) {
      // Remove session only
      AuthService.logout();
      
      // Reset in-memory auth state
      setIsAuthenticated(false);
      setUserId(null);
      
      // Reset view state
      setView('landing');
      stateManager.reset();
      setCurrentState(TherapyState.IDLE);
      
      // Note: Therapy data remains in localStorage
    }
  };

  // Handler: View Admin
  const handleViewAdmin = () => {
    setView('admin');
  };

  // Handler: Select Record from Admin
  const handleAdminRecordSelect = () => {
    // Admin can view but not modify protocol flow
    alert('Session details are read-only. Protocol enforcement prevents modification.');
  };

  // If not authenticated, show login/signup
  if (!isAuthenticated) {
    return showLogin ? (
      <Login 
        onLoginSuccess={() => {
          const session = AuthService.getSession();
          if (session) {
            setUserId(session.userId);
            setIsAuthenticated(true);
            
            // Load user data
            const saved = UserDataService.getSessions(session.userId);
            if (saved) {
              setAllSessions(saved);
            }
          }
        }}
        onSwitchToSignup={() => setShowLogin(false)}
      />
    ) : (
      <Signup 
        onSignupSuccess={() => {
          const session = AuthService.getSession();
          if (session) {
            setUserId(session.userId);
            setIsAuthenticated(true);
          }
        }}
        onSwitchToLogin={() => setShowLogin(true)}
      />
    );
  }

  return (
    <Layout currentView={view} setView={setView} onReturnHome={handleReturnToLanding} onLogout={handleLogout}>
      {/* LANDING PAGE */}
      {view === 'landing' && currentState === TherapyState.IDLE && (
        <div className="max-w-md mx-auto text-center space-y-8 py-16 px-6 relative">
          {/* Extremely subtle radial depth behind hero - barely noticeable */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 pointer-events-none" style={{
            background: 'radial-gradient(circle at 50% 30%, rgba(33, 78, 69, 0.05), transparent 60%)'
          }}></div>
          
          {/* Hero Section */}
          <div className="flex flex-col items-center animate-slideUp relative z-10">
            <div className="relative mb-8">
              {/* Product mockup - medical-grade precision shadow */}
              <img 
                src="/logo-main.png" 
                alt="Ayurnxt Main Logo" 
                className="w-48 h-48 object-contain relative z-10"
                style={{
                  filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.08))'
                }}
              />
            </div>
            
            {/* Brand Name - Deeper authoritative green */}
            <h1 className="text-4xl font-bold mb-3" style={{
              color: '#214E45',
              letterSpacing: '-0.02em'
            }}>
              Ayurnxt
            </h1>
            
            {/* Tagline - Controlled, structured */}
            <p className="text-lg font-semibold mb-2" style={{
              color: '#2C3E3B',
              letterSpacing: '-0.01em'
            }}>
              Smart Ayurvedic Therapy System
            </p>
            <p className="text-sm max-w-xs leading-relaxed" style={{color: '#5F6F6B'}}>
              Protocol-driven supervision for herbal plaster therapy
            </p>
          </div>
          
          {/* Main Card - Tech-Medical precision */}
          <div className="stitch-card p-8 space-y-6 animate-slideUp" style={{animationDelay: '0.1s'}}>
            {/* Badge - Controlled clinical */}
            <div className="stitch-badge-success inline-flex items-center space-x-2 mx-auto">
              <i className="fa-solid fa-shield-heart text-xs"></i>
              <span>Supervised Therapy Protocol</span>
            </div>
            
            {/* Description - Neutral grey */}
            <p className="text-sm leading-relaxed" style={{color: '#5F6F6B'}}>
              Begin your supervised therapy session by scanning the QR code on your standardized therapy plaster
            </p>
            
            {/* CTA Button - Solid, confident */}
            <button 
              onClick={() => {
                setView('protocol');
                transitionTo(TherapyState.QR_SCAN);
              }}
              className="stitch-button-primary w-full flex items-center justify-center space-x-3 group"
            >
              <i className="fa-solid fa-qrcode"></i>
              <span>Scan Therapy Plaster</span>
              <i className="fa-solid fa-arrow-right text-sm group-hover:translate-x-1 transition-all duration-300"></i>
            </button>
            
            {/* Security Badge - Subtle gold accent */}
            <div className="pt-2 flex items-center justify-center space-x-2 text-xs" style={{color: '#5F6F6B'}}>
              <i className="fa-solid fa-lock" style={{color: '#C4A45F'}}></i>
              <span>Protocol-enforced safety system</span>
            </div>
          </div>

          {/* Provider Access */}
          <div className="pt-2 animate-slideUp" style={{animationDelay: '0.2s'}}>
            <button 
              onClick={handleViewAdmin}
              className="stitch-button-secondary mx-auto"
            >
              <i className="fa-solid fa-user-doctor text-sm mr-2"></i>
              <span>Healthcare Provider Portal</span>
            </button>
          </div>
          
          {/* Trust Indicators */}
          <div className="pt-6 animate-slideUp" style={{animationDelay: '0.3s'}}>
            <div className="flex items-center justify-center space-x-6">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background: '#E8F3F0'}}>
                  <i className="fa-solid fa-check-circle text-sm" style={{color: '#2D5F4F'}}></i>
                </div>
                <span className="text-[10px] font-semibold" style={{color: '#6B7C78'}}>Protocol Enforced</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background: '#E8F3F0'}}>
                  <i className="fa-solid fa-check-circle text-sm" style={{color: '#2D5F4F'}}></i>
                </div>
                <span className="text-[10px] font-semibold" style={{color: '#6B7C78'}}>State Validated</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background: '#E8F3F0'}}>
                  <i className="fa-solid fa-check-circle text-sm" style={{color: '#2D5F4F'}}></i>
                </div>
                <span className="text-[10px] font-semibold" style={{color: '#6B7C78'}}>Safety First</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PROTOCOL FLOW */}
      {view === 'protocol' && (
        <>
          {currentState === TherapyState.QR_SCAN && (
            <QRScanSimulation onScanComplete={handleQRScanComplete} />
          )}

          {currentState === TherapyState.SETUP && (
            <TherapySetup 
              plasterId={currentPlasterId}
              onSetupComplete={handleSetupComplete}
            />
          )}

          {currentState === TherapyState.LIVE_SESSION && currentMode && (
            <LiveTherapySession
              plasterId={currentPlasterId}
              bodyArea={currentBodyArea}
              mode={currentMode}
              onSessionComplete={handleSessionComplete}
              onEarlyTermination={handleEarlyTermination}
            />
          )}

          {currentState === TherapyState.SESSION_END && (
            <SessionEnd
              status={currentSessionStatus}
              terminationReason={currentTerminationReason}
              onProceedToLogging={handleProceedToLogging}
            />
          )}

          {currentState === TherapyState.PAIN_LOGGING && (
            <StructuredPainLogging onComplete={handlePainLoggingComplete} />
          )}

          {currentState === TherapyState.COMPLIANCE_REVIEW && (
            <ComplianceDashboard
              sessions={allSessions}
              onStartNewSession={handleStartNewSession}
              onViewProviderPortal={handleViewAdmin}
            />
          )}
        </>
      )}

      {/* ADMIN PORTAL */}
      {view === 'admin' && (
        <AdminDashboard
          records={allSessions.map(session => ({
            id: session.plasterId,
            patientName: `Session ${session.id.slice(-4)}`,
            age: '',
            gender: '',
            condition: session.mode as any,
            areaOfApplication: session.bodyArea,
            severity: session.painBefore > 7 ? 'Severe' as any : session.painBefore > 4 ? 'Moderate' as any : 'Mild' as any,
            startTime: session.startTime,
            practitionerName: 'System',
            instructions: {
              timesPerDay: 2,
              durationMinutes: session.durationMinutes,
              totalDays: 7,
              ayurvedicTips: []
            },
            logs: [],
            reminders: []
          }))}
          onRecordSelect={handleAdminRecordSelect}
        />
      )}

      {/* SETTINGS */}
      {view === 'settings' && (
        <Settings onClose={handleReturnToLanding} />
      )}
    </Layout>
  );
};

export default App;
