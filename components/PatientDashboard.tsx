
import React, { useState } from 'react';
import { BandageRecord } from '../types';

interface PatientDashboardProps {
  record: BandageRecord;
  onAddLog: () => void;
}

export const PatientDashboard: React.FC<PatientDashboardProps> = ({ record, onAddLog }) => {
  const [activeTab, setActiveTab] = useState<'instructions' | 'logs' | 'reminders'>('instructions');

  const getProgressPercent = () => {
    if (record.logs.length === 0) return 0;
    const progress = (record.logs.length / (record.instructions.totalDays * record.instructions.timesPerDay)) * 100;
    return Math.min(Math.round(progress), 100);
  };

  return (
    <div className="px-6 py-6 max-w-md mx-auto">
      {/* Premium Hero Card */}
      <div className="glass-dark text-white rounded-3xl p-7 mb-8 shadow-2xl shadow-emerald-900/20 animate-slideUp relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-3xl"></div>
        <div className="relative">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-emerald-200/70 text-[10px] font-bold uppercase tracking-[0.15em] mb-2">Active Therapy</h2>
              <p className="serif-heading text-3xl font-semibold mb-1">{record.patientName}</p>
              <p className="text-emerald-200/60 text-sm">{record.areaOfApplication} • {record.severity}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-3 py-2 rounded-xl text-xs font-mono border border-white/20">
              {record.id}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-emerald-100/80">Therapy Progress</span>
              <span className="font-bold text-emerald-100">{getProgressPercent()}%</span>
            </div>
            <div className="h-3 bg-emerald-950/40 rounded-full overflow-hidden backdrop-blur-sm">
              <div 
                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-300 transition-all duration-1000 shadow-lg shadow-emerald-400/50" 
                style={{ width: `${getProgressPercent()}%` }}
              ></div>
            </div>
            <p className="text-emerald-200/50 text-xs">
              {record.logs.length} of {record.instructions.totalDays * record.instructions.timesPerDay} sessions completed
            </p>
          </div>
        </div>
      </div>

      {/* Premium Tabs */}
      <div className="flex space-x-3 mb-8 animate-slideUp" style={{animationDelay: '0.1s'}}>
        {[
          { id: 'instructions', label: 'Protocol', icon: 'fa-clipboard-list' },
          { id: 'logs', label: 'Journal', icon: 'fa-book-medical' },
          { id: 'reminders', label: 'Schedule', icon: 'fa-bell' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex flex-col items-center py-4 rounded-2xl transition-smooth ${
              activeTab === tab.id 
                ? 'glass shadow-lg text-emerald-700 scale-105' 
                : 'bg-white/40 text-emerald-700/40 hover:bg-white/60'
            }`}
          >
            <i className={`fa-solid ${tab.icon} mb-1.5 text-lg`}></i>
            <span className="text-[10px] font-bold uppercase tracking-wider">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === 'instructions' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-2 gap-4">
              <div className="glass p-5 rounded-2xl text-center shadow-md">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-200/50">
                  <i className="fa-solid fa-clock text-white"></i>
                </div>
                <p className="text-[10px] font-bold text-emerald-700/60 uppercase tracking-wider mb-1">Frequency</p>
                <p className="text-2xl font-bold text-emerald-900">{record.instructions.timesPerDay}x</p>
                <p className="text-xs text-emerald-700/50">per day</p>
              </div>
              <div className="glass p-5 rounded-2xl text-center shadow-md">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-200/50">
                  <i className="fa-solid fa-hourglass-half text-white"></i>
                </div>
                <p className="text-[10px] font-bold text-emerald-700/60 uppercase tracking-wider mb-1">Duration</p>
                <p className="text-2xl font-bold text-emerald-900">{record.instructions.durationMinutes}</p>
                <p className="text-xs text-emerald-700/50">minutes</p>
              </div>
            </div>

            <div className="glass p-6 rounded-3xl shadow-lg">
              <div className="flex items-center space-x-2 mb-5">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-md shadow-emerald-200/50">
                  <i className="fa-solid fa-leaf text-white text-sm"></i>
                </div>
                <h3 className="serif-heading text-xl text-emerald-900 font-semibold">Care Guidelines</h3>
              </div>
              <ul className="space-y-4">
                {record.instructions.ayurvedicTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start space-x-3 group">
                    <div className="w-6 h-6 bg-emerald-50 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5 group-hover:bg-emerald-100 transition-smooth">
                      <i className="fa-solid fa-check text-xs text-emerald-600"></i>
                    </div>
                    <span className="text-sm text-emerald-900/80 leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="space-y-5 animate-fadeIn">
            <button 
              onClick={onAddLog}
              className="w-full glass py-5 rounded-2xl font-semibold text-emerald-700 border-2 border-dashed border-emerald-300 hover:border-emerald-400 hover:shadow-lg transition-smooth flex items-center justify-center space-x-2 group"
            >
              <i className="fa-solid fa-plus group-hover:scale-110 transition-smooth"></i>
              <span>Record New Session</span>
            </button>

            {record.logs.length === 0 ? (
              <div className="py-16 text-center glass rounded-3xl">
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <i className="fa-solid fa-notes-medical text-emerald-300 text-2xl"></i>
                </div>
                <p className="text-emerald-700/50 text-sm font-medium">No sessions recorded yet</p>
                <p className="text-emerald-700/30 text-xs mt-1">Start tracking your therapy progress</p>
              </div>
            ) : (
              record.logs.map((log, idx) => (
                <div key={log.id} className="glass p-5 rounded-2xl shadow-md flex items-start space-x-4 hover:shadow-lg transition-smooth" style={{animationDelay: `${idx * 0.05}s`}}>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md ${
                    log.status === 'completed' 
                      ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' 
                      : 'bg-gradient-to-br from-rose-400 to-rose-500'
                  }`}>
                    <i className={`fa-solid ${log.status === 'completed' ? 'fa-circle-check' : 'fa-circle-xmark'} text-white text-2xl`}></i>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-sm font-bold text-emerald-900">{new Date(log.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                        <p className="text-xs text-emerald-700/60">{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                      <span className="text-xs bg-white/80 text-emerald-700 px-3 py-1.5 rounded-full font-semibold border border-emerald-100">
                        Pain: {log.painLevel}/10
                      </span>
                    </div>
                    <p className="text-sm text-emerald-900/70 italic leading-relaxed">"{log.notes}"</p>
                    {log.imageUrl && (
                      <div className="mt-3 rounded-xl overflow-hidden h-28 bg-emerald-50 border border-emerald-100">
                         <img src={log.imageUrl} alt="Progress" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'reminders' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="glass p-6 rounded-3xl shadow-lg border-2 border-amber-100">
              <div className="flex items-center space-x-3 mb-5">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl flex items-center justify-center shadow-md shadow-amber-200/50">
                  <i className="fa-solid fa-clock text-white"></i>
                </div>
                <h3 className="serif-heading text-xl font-semibold text-amber-900">Daily Schedule</h3>
              </div>
              <p className="text-sm text-amber-800/80 mb-6 leading-relaxed">
                Recommended application times based on your therapy protocol
              </p>
              
              <div className="space-y-3">
                {['08:00 AM', '02:00 PM', '08:00 PM'].slice(0, record.instructions.timesPerDay).map((time, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-white/80 p-4 rounded-xl shadow-sm border border-amber-50 hover:shadow-md transition-smooth">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                      <span className="font-bold text-emerald-900">{time}</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={idx === 0} />
                      <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600 shadow-inner"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold py-5 rounded-2xl shadow-xl shadow-emerald-200/50 hover:shadow-2xl hover:scale-[1.02] transition-smooth flex items-center justify-center space-x-2">
              <i className="fa-solid fa-bell"></i>
              <span>Enable Notifications</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
