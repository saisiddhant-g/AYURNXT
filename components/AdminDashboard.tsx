
import React, { useState } from 'react';
import { BandageRecord, ConditionType } from '../types';

interface AdminDashboardProps {
  records: BandageRecord[];
  onRecordSelect: (record: BandageRecord) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ records, onRecordSelect }) => {
  const [filter, setFilter] = useState<ConditionType | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = records.filter(r => {
    const matchesFilter = filter === 'All' || r.condition === filter;
    const matchesSearch = r.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || r.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const exportCSV = () => {
    const headers = "PlasterID,Patient,Condition,Severity,StartTime,SessionsCompleted\n";
    const rows = records.map(r => `${r.id},${r.patientName},${r.condition},${r.severity},${r.startTime},${r.logs.length}`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Ayurnxt_Clinical_Export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const getStats = () => {
    const total = records.length;
    const active = records.filter(r => r.logs.length > 0).length;
    const totalSessions = records.reduce((sum, r) => sum + r.logs.length, 0);
    return { total, active, totalSessions };
  };

  const stats = getStats();

  return (
    <div className="px-6 py-8 max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center animate-slideUp">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl mb-4 shadow-lg shadow-emerald-200/50">
          <i className="fa-solid fa-user-doctor text-white text-2xl"></i>
        </div>
        <h2 className="serif-heading text-3xl text-emerald-900 font-semibold mb-2">Provider Portal</h2>
        <p className="text-emerald-700/60 text-sm">Clinical case management & oversight</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 animate-slideUp" style={{animationDelay: '0.1s'}}>
        <div className="glass p-5 rounded-2xl text-center shadow-md">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md shadow-emerald-200/50">
            <i className="fa-solid fa-users text-white"></i>
          </div>
          <p className="text-2xl font-bold text-emerald-900">{stats.total}</p>
          <p className="text-[10px] text-emerald-700/60 uppercase tracking-wider font-medium mt-1">Total Cases</p>
        </div>
        <div className="glass p-5 rounded-2xl text-center shadow-md">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md shadow-emerald-200/50">
            <i className="fa-solid fa-heartbeat text-white"></i>
          </div>
          <p className="text-2xl font-bold text-emerald-900">{stats.active}</p>
          <p className="text-[10px] text-emerald-700/60 uppercase tracking-wider font-medium mt-1">Active</p>
        </div>
        <div className="glass p-5 rounded-2xl text-center shadow-md">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md shadow-emerald-200/50">
            <i className="fa-solid fa-clipboard-check text-white"></i>
          </div>
          <p className="text-2xl font-bold text-emerald-900">{stats.totalSessions}</p>
          <p className="text-[10px] text-emerald-700/60 uppercase tracking-wider font-medium mt-1">Sessions</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col space-y-3 animate-slideUp" style={{animationDelay: '0.2s'}}>
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600/40"></i>
            <input 
              type="text" 
              placeholder="Search by name or ID..."
              className="w-full pl-11 pr-4 py-3.5 rounded-xl glass border border-emerald-100 focus:outline-none input-glow text-emerald-900 placeholder:text-emerald-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={exportCSV}
            className="px-5 py-3.5 rounded-xl bg-gradient-to-br from-emerald-700 to-emerald-800 text-white font-semibold flex items-center space-x-2 shadow-lg shadow-emerald-200/50 hover:shadow-xl transition-smooth"
          >
            <i className="fa-solid fa-file-export"></i>
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
        
        <select 
          className="w-full px-4 py-3.5 rounded-xl glass border border-emerald-100 focus:outline-none input-glow text-emerald-900 font-medium"
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
        >
          <option value="All">All Condition Types</option>
          {Object.values(ConditionType).map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Records List */}
      <div className="space-y-4 animate-slideUp" style={{animationDelay: '0.3s'}}>
        {filtered.length === 0 ? (
          <div className="glass p-16 rounded-3xl text-center shadow-lg">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-folder-open text-emerald-300 text-3xl"></i>
            </div>
            <p className="text-emerald-700/60 font-medium">No matching cases found</p>
            <p className="text-emerald-700/40 text-sm mt-1">Try adjusting your search or filter</p>
          </div>
        ) : (
          filtered.map((r, idx) => (
            <div 
              key={r.id}
              onClick={() => onRecordSelect(r)}
              className="glass p-5 rounded-2xl shadow-md hover:shadow-xl cursor-pointer transition-smooth group border border-transparent hover:border-emerald-200"
              style={{animationDelay: `${0.3 + idx * 0.05}s`}}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg uppercase tracking-wider">
                    {r.condition}
                  </span>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider ${
                    r.severity === 'Severe' ? 'bg-rose-50 text-rose-600' : 
                    r.severity === 'Moderate' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
                  }`}>
                    {r.severity}
                  </span>
                </div>
                <span className="text-xs text-emerald-700/40 font-mono">{r.id}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-emerald-900 text-lg group-hover:text-emerald-700 transition-smooth">
                    {r.patientName}
                  </p>
                  <p className="text-xs text-emerald-700/60 mt-0.5">
                    {r.areaOfApplication} • Started {new Date(r.startTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end text-emerald-700 space-x-1.5 mb-1">
                    <i className="fa-solid fa-clipboard-check text-sm"></i>
                    <span className="font-bold">{r.logs.length}</span>
                  </div>
                  <p className="text-[10px] text-emerald-700/50 uppercase tracking-wider">Sessions</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
