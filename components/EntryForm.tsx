
import React, { useState } from 'react';
import { ConditionType, WoundType, Severity, BandageRecord } from '../types';
import { BODY_PARTS, DEFAULT_INSTRUCTIONS } from '../constants';
import { getAyurvedaAdvice } from '../services/geminiService';

interface EntryFormProps {
  bandageId: string;
  onComplete: (record: BandageRecord) => void;
}

export const EntryForm: React.FC<EntryFormProps> = ({ bandageId, onComplete }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    gender: 'Other',
    condition: ConditionType.WOUND,
    otherCondition: '',
    woundType: WoundType.ACUTE,
    otherWoundType: '',
    area: BODY_PARTS[0],
    severity: Severity.MILD,
    practitioner: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // AI Generation of custom advice
    const aiAdvice = await getAyurvedaAdvice(formData.condition, formData.severity);
    
    const record: BandageRecord = {
      id: bandageId,
      patientName: formData.patientName || 'Anonymous Patient',
      age: formData.age,
      gender: formData.gender,
      condition: formData.condition,
      otherCondition: formData.otherCondition,
      woundType: formData.condition === ConditionType.WOUND ? formData.woundType : undefined,
      otherWoundType: formData.otherWoundType,
      areaOfApplication: formData.area,
      severity: formData.severity,
      startTime: new Date().toISOString(),
      practitionerName: formData.practitioner || 'Unknown',
      instructions: {
        timesPerDay: formData.severity === Severity.SEVERE ? 3 : 2,
        durationMinutes: 45,
        totalDays: formData.severity === Severity.SEVERE ? 14 : 7,
        ayurvedicTips: [...DEFAULT_INSTRUCTIONS, ...aiAdvice]
      },
      logs: [],
      reminders: []
    };

    onComplete(record);
    setLoading(false);
  };

  return (
    <div className="px-6 py-8 max-w-md mx-auto">
      <div className="mb-8 text-center animate-slideUp">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl mb-4 shadow-lg shadow-emerald-200/50">
          <i className="fa-solid fa-clipboard-medical text-white text-xl"></i>
        </div>
        <h2 className="serif-heading text-3xl text-emerald-900 font-semibold mb-2">Therapy Initialization</h2>
        <p className="text-emerald-700/60 text-sm">Setting up treatment for plaster <span className="font-semibold text-emerald-700">{bandageId}</span></p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <section className="glass p-6 rounded-3xl shadow-lg space-y-5 animate-slideUp" style={{animationDelay: '0.1s'}}>
          <div className="flex items-center space-x-2 mb-2">
            <i className="fa-solid fa-user text-emerald-600 text-sm"></i>
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800/70">Patient Information</h3>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-emerald-900/80 mb-2">Patient Name (Optional)</label>
            <input 
              type="text" 
              placeholder="Full name"
              className="w-full px-4 py-3.5 rounded-xl bg-white/80 border border-emerald-100 focus:outline-none input-glow transition-smooth text-emerald-900"
              value={formData.patientName}
              onChange={(e) => setFormData({...formData, patientName: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-emerald-900/80 mb-2">Age</label>
              <input 
                type="number" 
                placeholder="Years"
                className="w-full px-4 py-3.5 rounded-xl bg-white/80 border border-emerald-100 focus:outline-none input-glow transition-smooth text-emerald-900"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-emerald-900/80 mb-2">Gender</label>
              <select 
                className="w-full px-4 py-3.5 rounded-xl bg-white/80 border border-emerald-100 focus:outline-none input-glow transition-smooth text-emerald-900"
                value={formData.gender}
                onChange={(e) => setFormData({...formData, gender: e.target.value})}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </section>

        {/* Clinical Details */}
        <section className="glass p-6 rounded-3xl shadow-lg space-y-5 animate-slideUp" style={{animationDelay: '0.2s'}}>
          <div className="flex items-center space-x-2 mb-2">
            <i className="fa-solid fa-stethoscope text-emerald-600 text-sm"></i>
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800/70">Clinical Assessment</h3>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-emerald-900/80 mb-2">Condition Type</label>
            <select 
              className="w-full px-4 py-3.5 rounded-xl bg-white/80 border border-emerald-100 focus:outline-none input-glow transition-smooth text-emerald-900"
              value={formData.condition}
              onChange={(e) => setFormData({...formData, condition: e.target.value as ConditionType})}
            >
              {Object.values(ConditionType).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {formData.condition === ConditionType.OTHER && (
             <input 
             type="text" 
             placeholder="Please specify condition..."
             className="w-full px-4 py-3.5 rounded-xl bg-white/80 border border-emerald-100 focus:outline-none input-glow transition-smooth text-emerald-900"
             value={formData.otherCondition}
             onChange={(e) => setFormData({...formData, otherCondition: e.target.value})}
           />
          )}

          {formData.condition === ConditionType.WOUND && (
            <div>
              <label className="block text-sm font-medium text-emerald-900/80 mb-2">Wound Classification</label>
              <select 
                className="w-full px-4 py-3.5 rounded-xl bg-white/80 border border-emerald-100 focus:outline-none input-glow transition-smooth text-emerald-900"
                value={formData.woundType}
                onChange={(e) => setFormData({...formData, woundType: e.target.value as WoundType})}
              >
                {Object.values(WoundType).map(w => <option key={w} value={w}>{w}</option>)}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-emerald-900/80 mb-2">Application Area</label>
            <select 
              className="w-full px-4 py-3.5 rounded-xl bg-white/80 border border-emerald-100 focus:outline-none input-glow transition-smooth text-emerald-900"
              value={formData.area}
              onChange={(e) => setFormData({...formData, area: e.target.value})}
            >
              {BODY_PARTS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-emerald-900/80 mb-3">Severity Assessment</label>
            <div className="grid grid-cols-3 gap-3">
              {Object.values(Severity).map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setFormData({...formData, severity: s})}
                  className={`py-3.5 rounded-xl font-semibold transition-smooth text-sm ${
                    formData.severity === s 
                      ? 'bg-gradient-to-br from-emerald-600 to-emerald-700 text-white shadow-lg shadow-emerald-200/50 scale-105' 
                      : 'bg-white/60 text-emerald-700/60 border border-emerald-100 hover:bg-white/80'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Practitioner */}
        <section className="glass p-6 rounded-3xl shadow-lg space-y-4 animate-slideUp" style={{animationDelay: '0.3s'}}>
          <div className="flex items-center space-x-2 mb-2">
            <i className="fa-solid fa-user-doctor text-emerald-600 text-sm"></i>
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800/70">Supervising Practitioner</h3>
          </div>
          <input 
            type="text" 
            placeholder="Practitioner name (Optional)"
            className="w-full px-4 py-3.5 rounded-xl bg-white/80 border border-emerald-100 focus:outline-none input-glow transition-smooth text-emerald-900"
            value={formData.practitioner}
            onChange={(e) => setFormData({...formData, practitioner: e.target.value})}
          />
        </section>

        {/* Submit Button */}
        <button 
          disabled={loading}
          type="submit"
          className={`w-full py-5 rounded-2xl text-white font-semibold text-base shadow-xl flex items-center justify-center space-x-3 transition-smooth animate-slideUp ${
            loading 
              ? 'bg-emerald-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:shadow-2xl hover:scale-[1.02] shadow-emerald-200/50'
          }`}
          style={{animationDelay: '0.4s'}}
        >
          {loading ? (
            <>
              <i className="fa-solid fa-spinner fa-spin"></i>
              <span>Generating Therapy Plan...</span>
            </>
          ) : (
            <>
              <i className="fa-solid fa-sparkles"></i>
              <span>Initialize Therapy Plan</span>
              <i className="fa-solid fa-arrow-right text-sm"></i>
            </>
          )}
        </button>
        
        {/* Disclaimer */}
        <div className="glass p-4 rounded-2xl text-center animate-slideUp" style={{animationDelay: '0.5s'}}>
          <p className="text-[10px] text-emerald-700/50 leading-relaxed">
            This system provides guidance for herbal plaster therapy. Not a substitute for professional medical diagnosis or treatment.
          </p>
        </div>
      </form>
    </div>
  );
};
