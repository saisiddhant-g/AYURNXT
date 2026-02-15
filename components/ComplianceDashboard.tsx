
import React from 'react';
import { TherapySession, ComplianceMetrics, ComplianceCalculator, CooldownManager, THERAPY_PROTOCOLS, SessionStatus } from '../therapyProtocol';

interface ComplianceDashboardProps {
  sessions: TherapySession[];
  onStartNewSession: () => void;
  onViewProviderPortal: () => void;
}

export const ComplianceDashboard: React.FC<ComplianceDashboardProps> = ({ 
  sessions, 
  onStartNewSession,
  onViewProviderPortal 
}) => {
  const metrics = ComplianceCalculator.calculateMetrics(sessions);
  const painTrend = ComplianceCalculator.detectPainTrend(sessions);
  const shouldConsult = ComplianceCalculator.shouldRecommendConsultation(sessions);
  
  const lastSession = sessions[sessions.length - 1];
  const isInCooldown = lastSession?.endTime 
    ? CooldownManager.isInCooldown(
        lastSession.endTime, 
        THERAPY_PROTOCOLS[lastSession.mode].cooldownMinutes
      )
    : false;
  
  const cooldownRemaining = lastSession?.endTime && isInCooldown
    ? CooldownManager.getCooldownRemainingMinutes(
        lastSession.endTime,
        THERAPY_PROTOCOLS[lastSession.mode].cooldownMinutes
      )
    : 0;

  const formatCooldownTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <div className="px-6 py-8 max-w-md mx-auto space-y-6">
      {/* Header */}
      <div className="text-center animate-slideUp">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4" style={{
          background: '#2D5F4F',
          boxShadow: '0 2px 8px rgba(45, 95, 79, 0.08)'
        }}>
          <i className="fa-solid fa-chart-line text-white text-xl"></i>
        </div>
        <h2 className="text-3xl font-bold mb-2" style={{color: '#2C3E3B'}}>Therapy Progress</h2>
        <p className="text-sm" style={{color: '#6B7C78'}}>Protocol compliance & outcomes tracking</p>
      </div>

      {/* Compliance Score Card - Stitch Style */}
      <div className="stitch-card text-white p-7 relative overflow-hidden earned-achievement" style={{
        animationDelay: '0.1s',
        background: '#2D5F4F',
        boxShadow: '0 8px 24px rgba(45, 95, 79, 0.16)'
      }}>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl breathing-glow" style={{background: 'rgba(232, 243, 240, 0.1)'}}></div>
        <div className="relative">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-3 flex items-center space-x-2" style={{color: '#E8F3F0'}}>
            <i className="fa-solid fa-award text-xs"></i>
            <span>Protocol Compliance</span>
          </p>
          <div className="flex items-end space-x-3 mb-4">
            <div className="text-6xl font-bold tabular-nums" style={{
              textShadow: '0 4px 12px rgba(232, 243, 240, 0.3)'
            }}>{metrics.complianceScore}%</div>
            <div className="text-sm mb-2" style={{color: '#E8F3F0', opacity: 0.7}}>
              {metrics.completedSessions}/{metrics.totalSessions} completed
            </div>
          </div>
          
          {/* Progress Bar - Stitch Style */}
          <div className="h-3 rounded-full overflow-hidden relative" style={{background: 'rgba(0, 0, 0, 0.2)'}}>
            <div 
              className="h-full transition-all duration-1000" 
              style={{ 
                width: `${metrics.complianceScore}%`,
                background: '#E8F3F0',
                boxShadow: '0 0 12px rgba(232, 243, 240, 0.5)'
              }}
            ></div>
          </div>
          
          {metrics.complianceScore === 100 && (
            <div className="mt-3 flex items-center justify-center space-x-2 text-sm" style={{color: '#E8F3F0'}}>
              <i className="fa-solid fa-star"></i>
              <span className="font-semibold">Perfect Compliance</span>
            </div>
          )}
        </div>
      </div>

      {/* Key Metrics Grid - Stitch Cards */}
      <div className="grid grid-cols-2 gap-4 protocol-slide" style={{animationDelay: '0.2s'}}>
        <div className="stitch-card p-5 text-center hover:shadow-md transition-all duration-300">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 ${
            metrics.consistencyStreak > 0 ? 'streak-indicator' : ''
          }`} style={{
            background: '#2D5F4F',
            boxShadow: '0 4px 16px rgba(45, 95, 79, 0.12)'
          }}>
            <i className="fa-solid fa-fire text-white"></i>
          </div>
          <p className="text-2xl font-bold tabular-nums" style={{color: '#2C3E3B'}}>{metrics.consistencyStreak}</p>
          <p className="text-[10px] uppercase tracking-wider font-semibold mt-1" style={{color: '#6B7C78'}}>
            {metrics.consistencyStreak === 1 ? 'Session' : 'Streak'}
          </p>
        </div>
        
        <div className="stitch-card p-5 text-center hover:shadow-md transition-all duration-300">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3" style={{
            background: '#2D5F4F',
            boxShadow: '0 4px 16px rgba(45, 95, 79, 0.12)'
          }}>
            <i className="fa-solid fa-clipboard-check text-white"></i>
          </div>
          <p className="text-2xl font-bold tabular-nums" style={{color: '#2C3E3B'}}>{metrics.completedSessions}</p>
          <p className="text-[10px] uppercase tracking-wider font-semibold mt-1" style={{color: '#6B7C78'}}>Completed</p>
        </div>
      </div>

      {/* Pain Trend Analysis */}
      <div className={`glass p-6 rounded-3xl shadow-lg border-2 animate-slideUp ${
        painTrend === 'improving' ? 'border-emerald-200' :
        painTrend === 'worsening' ? 'border-amber-200' :
        'border-stone-200'
      }`} style={{animationDelay: '0.3s'}}>
        <div className="flex items-center space-x-2 mb-4">
          <i className={`fa-solid ${
            painTrend === 'improving' ? 'fa-arrow-trend-down text-emerald-600' :
            painTrend === 'worsening' ? 'fa-arrow-trend-up text-amber-600' :
            'fa-minus text-stone-500'
          }`}></i>
          <h3 className="font-bold text-emerald-900">Pain Trend Analysis</h3>
        </div>

        <div className={`p-4 rounded-xl ${
          painTrend === 'improving' ? 'bg-emerald-50 border border-emerald-100' :
          painTrend === 'worsening' ? 'bg-amber-50 border border-amber-100' :
          'bg-stone-50 border border-stone-100'
        }`}>
          <p className={`text-sm font-semibold mb-2 ${
            painTrend === 'improving' ? 'text-emerald-900' :
            painTrend === 'worsening' ? 'text-amber-900' :
            'text-stone-700'
          }`}>
            {painTrend === 'improving' && '✓ Pain levels are decreasing'}
            {painTrend === 'worsening' && '⚠ Pain levels are increasing'}
            {painTrend === 'stable' && '→ Pain levels are stable'}
            {painTrend === 'insufficient_data' && 'ℹ Insufficient data for trend analysis'}
          </p>
          <p className={`text-xs leading-relaxed ${
            painTrend === 'improving' ? 'text-emerald-800' :
            painTrend === 'worsening' ? 'text-amber-800' :
            'text-stone-600'
          }`}>
            {painTrend === 'improving' && 'Therapy protocol is showing positive results. Continue as prescribed.'}
            {painTrend === 'worsening' && 'Pain is not improving as expected. Consider consulting a healthcare professional.'}
            {painTrend === 'stable' && 'Pain levels remain consistent. Continue monitoring progress.'}
            {painTrend === 'insufficient_data' && 'Complete more sessions to establish a trend pattern.'}
          </p>
        </div>
      </div>

      {/* Healthcare Consultation Recommendation - Responsible Not Scary */}
      {shouldConsult && (
        <div className="glass p-6 rounded-3xl shadow-lg border-2 border-rose-200 bg-gradient-to-br from-rose-50/50 to-orange-50/30 responsible-warning" style={{animationDelay: '0.4s'}}>
          <div className="flex items-start space-x-4">
            <div className="w-14 h-14 bg-gradient-to-br from-rose-100 to-orange-100 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
              <i className="fa-solid fa-user-doctor text-rose-700 text-xl"></i>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-rose-900 mb-2 flex items-center space-x-2">
                <span>Professional Consultation Recommended</span>
              </h3>
              <p className="text-sm text-rose-800/90 leading-relaxed mb-3">
                Based on your therapy data, we recommend consulting a healthcare professional for further evaluation.
              </p>
              <div className="bg-white/60 border border-rose-200 p-3 rounded-xl">
                <p className="text-xs text-rose-700 leading-relaxed flex items-start space-x-2">
                  <i className="fa-solid fa-info-circle mt-0.5 flex-shrink-0"></i>
                  <span>This system provides guidance only and cannot replace professional medical advice.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cooldown Status */}
      {isInCooldown && (
        <div className="glass p-6 rounded-3xl shadow-lg border-2 border-amber-200 animate-slideUp" style={{animationDelay: '0.5s'}}>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
              <i className="fa-solid fa-hourglass-half text-amber-600"></i>
            </div>
            <div>
              <h3 className="font-bold text-amber-900">Cooldown Period Active</h3>
              <p className="text-xs text-amber-700">Next session available in {formatCooldownTime(cooldownRemaining)}</p>
            </div>
          </div>
          
          <div className="bg-amber-50 border border-amber-100 p-3 rounded-xl">
            <p className="text-xs text-amber-800 leading-relaxed">
              The cooldown period ensures safe therapy intervals. Starting a new session before cooldown ends is not permitted by the protocol.
            </p>
          </div>
        </div>
      )}

      {/* Session History */}
      <div className="glass p-6 rounded-3xl shadow-lg space-y-4 animate-slideUp" style={{animationDelay: '0.6s'}}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <i className="fa-solid fa-clock-rotate-left text-emerald-600 text-sm"></i>
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800/70">Session History</h3>
          </div>
          <span className="text-xs text-emerald-700/60">{sessions.length} total</span>
        </div>

        <div className="space-y-3 max-h-64 overflow-y-auto">
          {sessions.slice().reverse().map((session, idx) => (
            <div key={session.id} className="bg-white/60 p-4 rounded-xl border border-emerald-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <i className={`fa-solid ${
                    session.status === SessionStatus.COMPLETED ? 'fa-circle-check text-emerald-600' :
                    session.status === SessionStatus.TERMINATED_EARLY ? 'fa-triangle-exclamation text-amber-600' :
                    'fa-circle-xmark text-rose-600'
                  } text-sm`}></i>
                  <span className="text-sm font-semibold text-emerald-900">{session.bodyArea}</span>
                </div>
                <span className="text-xs text-emerald-700/60">
                  {new Date(session.startTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-xs text-emerald-700/70">
                <span>{session.durationMinutes} min session</span>
                {session.painAfter !== undefined && (
                  <span className={`font-semibold ${
                    session.painAfter < session.painBefore ? 'text-emerald-600' :
                    session.painAfter > session.painBefore ? 'text-amber-600' :
                    'text-stone-500'
                  }`}>
                    Pain: {session.painBefore} → {session.painAfter}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons - Stitch Style */}
      <div className="space-y-3 animate-slideUp" style={{animationDelay: '0.7s'}}>
        <button
          onClick={onStartNewSession}
          disabled={isInCooldown}
          className={`w-full py-5 rounded-2xl font-semibold flex items-center justify-center space-x-2 transition-all duration-300 ${
            isInCooldown
              ? 'opacity-50 cursor-not-allowed'
              : 'stitch-button-primary'
          }`}
        >
          <i className="fa-solid fa-qrcode"></i>
          <span>{isInCooldown ? 'Cooldown Active' : 'Start New Session'}</span>
        </button>

        <button
          onClick={onViewProviderPortal}
          className="stitch-button-secondary w-full"
        >
          <i className="fa-solid fa-user-doctor text-sm mr-2"></i>
          <span>Provider Portal</span>
        </button>
      </div>

      {/* System Notice */}
      <div className="stitch-card p-4 animate-slideUp" style={{animationDelay: '0.8s'}}>
        <p className="text-xs leading-relaxed text-center" style={{color: '#6B7C78'}}>
          <i className="fa-solid fa-shield-heart mr-1"></i>
          This system enforces standardized therapy protocols. All sessions are tracked for safety and compliance.
        </p>
      </div>
    </div>
  );
};
