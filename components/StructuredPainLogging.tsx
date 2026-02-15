
import React, { useState } from 'react';

interface PainLogData {
  painBefore: number;
  painAfter: number;
  mobilityNotes?: string;
}

interface StructuredPainLoggingProps {
  onComplete: (data: PainLogData) => void;
}

export const StructuredPainLogging: React.FC<StructuredPainLoggingProps> = ({ onComplete }) => {
  const [painBefore, setPainBefore] = useState(5);
  const [painAfter, setPainAfter] = useState(5);
  const [mobilityOption, setMobilityOption] = useState<string>('');

  const handleSubmit = () => {
    onComplete({
      painBefore,
      painAfter,
      mobilityNotes: mobilityOption
    });
  };

  const canSubmit = mobilityOption !== '';

  return (
    <div className="px-6 py-8 max-w-md mx-auto space-y-6 protocol-transition">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4" style={{
          background: '#2D5F4F',
          boxShadow: '0 2px 8px rgba(45, 95, 79, 0.08)'
        }}>
          <i className="fa-solid fa-clipboard-check text-white text-xl"></i>
        </div>
        <h2 className="text-3xl font-bold mb-2" style={{color: '#2C3E3B'}}>Pain Assessment</h2>
        <p className="text-sm" style={{color: '#6B7C78'}}>Required data for therapy tracking</p>
      </div>

      {/* Pain Before Session - Stitch Slider */}
      <section className="stitch-card p-7 protocol-slide" style={{animationDelay: '0.1s'}}>
        <label className="block text-sm font-bold uppercase tracking-wider mb-6 text-center" style={{color: '#6B7C78'}}>
          Pain Level BEFORE Session
        </label>
        
        <div className="flex justify-between items-center mb-6">
          <div className="text-center">
            <span className="text-3xl">😌</span>
            <p className="text-[10px] font-semibold mt-1" style={{color: '#9BA8A4'}}>None</p>
          </div>
          <div className="flex-1 mx-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-2 breathing-glow" style={{
              background: '#2D5F4F',
              boxShadow: '0 4px 16px rgba(45, 95, 79, 0.12)'
            }}>
              <span className="text-3xl font-bold text-white tabular-nums">{painBefore}</span>
            </div>
          </div>
          <div className="text-center">
            <span className="text-3xl">😫</span>
            <p className="text-[10px] font-semibold mt-1" style={{color: '#9BA8A4'}}>Severe</p>
          </div>
        </div>
        
        <input 
          type="range" 
          min="0" 
          max="10" 
          value={painBefore}
          onChange={(e) => setPainBefore(parseInt(e.target.value))}
          className="w-full h-3 rounded-full appearance-none cursor-pointer shadow-inner transition-all duration-300"
          style={{
            background: `linear-gradient(to right, #2D5F4F 0%, #2D5F4F ${painBefore * 10}%, #E5E3DF ${painBefore * 10}%, #E5E3DF 100%)`
          }}
        />
        
        <div className="flex justify-between mt-2 text-[10px] font-semibold" style={{color: '#9BA8A4'}}>
          <span>0</span>
          <span>5</span>
          <span>10</span>
        </div>
      </section>

      {/* Pain After Session - Stitch Slider */}
      <section className="stitch-card p-7 protocol-slide" style={{animationDelay: '0.2s'}}>
        <label className="block text-sm font-bold uppercase tracking-wider mb-6 text-center" style={{color: '#6B7C78'}}>
          Pain Level AFTER Session
        </label>
        
        <div className="flex justify-between items-center mb-6">
          <div className="text-center">
            <span className="text-3xl">😌</span>
            <p className="text-[10px] font-semibold mt-1" style={{color: '#9BA8A4'}}>None</p>
          </div>
          <div className="flex-1 mx-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-2 breathing-glow" style={{
              background: '#2D5F4F',
              boxShadow: '0 4px 16px rgba(45, 95, 79, 0.12)'
            }}>
              <span className="text-3xl font-bold text-white tabular-nums">{painAfter}</span>
            </div>
          </div>
          <div className="text-center">
            <span className="text-3xl">😫</span>
            <p className="text-[10px] font-semibold mt-1" style={{color: '#9BA8A4'}}>Severe</p>
          </div>
        </div>
        
        <input 
          type="range" 
          min="0" 
          max="10" 
          value={painAfter}
          onChange={(e) => setPainAfter(parseInt(e.target.value))}
          className="w-full h-3 rounded-full appearance-none cursor-pointer shadow-inner transition-all duration-300"
          style={{
            background: `linear-gradient(to right, #2D5F4F 0%, #2D5F4F ${painAfter * 10}%, #E5E3DF ${painAfter * 10}%, #E5E3DF 100%)`
          }}
        />
        
        <div className="flex justify-between mt-2 text-[10px] font-semibold" style={{color: '#9BA8A4'}}>
          <span>0</span>
          <span>5</span>
          <span>10</span>
        </div>
      </section>

      {/* Pain Change Indicator - Stitch Badge */}
      {painBefore !== painAfter && (
        <div className={`stitch-card p-4 border-2 earned-achievement ${
          painAfter < painBefore 
            ? 'stitch-badge-success' 
            : 'stitch-badge-warning'
        }`} style={{animationDelay: '0.3s'}}>
          <div className="flex items-center justify-center space-x-2">
            {painAfter < painBefore && (
              <>
                <i className="fa-solid fa-arrow-down"></i>
                <span className="text-sm font-semibold">
                  Pain decreased by {painBefore - painAfter} {painBefore - painAfter === 1 ? 'point' : 'points'}
                </span>
              </>
            )}
            {painAfter > painBefore && (
              <>
                <i className="fa-solid fa-arrow-up"></i>
                <span className="text-sm font-semibold">
                  Pain increased by {painAfter - painBefore} {painAfter - painBefore === 1 ? 'point' : 'points'}
                </span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Mobility/Comfort Assessment - Structured */}
      <section className="glass p-6 rounded-3xl shadow-lg space-y-4 protocol-slide" style={{animationDelay: '0.4s'}}>
        <div className="flex items-center space-x-2 mb-2">
          <i className="fa-solid fa-person-walking text-emerald-600 text-sm"></i>
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800/70">Mobility & Comfort</h3>
        </div>

        <div className="space-y-3">
          {[
            { id: 'improved', label: 'Improved mobility', icon: 'fa-circle-up' },
            { id: 'unchanged', label: 'No change in mobility', icon: 'fa-circle' },
            { id: 'reduced', label: 'Reduced mobility', icon: 'fa-lock' },
            { id: 'stiffness', label: 'Increased stiffness', icon: 'fa-circle-down' }
          ].map(option => (
            <button
              key={option.id}
              onClick={() => setMobilityOption(option.label)}
              className={`w-full p-4 rounded-xl transition-all duration-300 text-left deliberate-action ${
                mobilityOption === option.label
                  ? 'bg-gradient-to-br from-emerald-600 to-emerald-700 text-white shadow-lg shadow-emerald-200/50'
                  : 'bg-white/60 border border-emerald-100 hover:bg-white/80'
              }`}
            >
              <div className="flex items-center space-x-3">
                <i className={`fa-solid ${option.icon} ${
                  mobilityOption === option.label ? 'text-white' : 'text-emerald-600'
                }`}></i>
                <span className={`font-semibold ${
                  mobilityOption === option.label ? 'text-white' : 'text-emerald-900'
                }`}>
                  {option.label}
                </span>
                {mobilityOption === option.label && (
                  <i className="fa-solid fa-circle-check ml-auto text-white"></i>
                )}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Submit Button - Deliberate */}
      <button
        onClick={handleSubmit}
        disabled={!canSubmit}
        className={`w-full py-5 rounded-2xl font-semibold flex items-center justify-center space-x-2 transition-all duration-300 protocol-slide deliberate-action ${
          canSubmit
            ? 'stitch-button-primary'
            : 'opacity-50 cursor-not-allowed'
        }`}
        style={{animationDelay: '0.5s'}}
      >
        <i className="fa-solid fa-check"></i>
        <span>Complete Assessment</span>
      </button>

      {/* Info Notice */}
      <div className="stitch-card p-4 protocol-slide" style={{animationDelay: '0.6s'}}>
        <p className="text-xs leading-relaxed text-center flex items-center justify-center space-x-2" style={{color: '#6B7C78'}}>
          <i className="fa-solid fa-lock"></i>
          <span>This structured data helps track therapy effectiveness and ensures protocol compliance</span>
        </p>
      </div>
    </div>
  );
};
