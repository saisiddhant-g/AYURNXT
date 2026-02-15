
import React, { useState } from 'react';
import { DailyLog } from '../types';

interface LogEntryProps {
  onSave: (log: DailyLog) => void;
  onCancel: () => void;
}

export const LogEntry: React.FC<LogEntryProps> = ({ onSave, onCancel }) => {
  const [painLevel, setPainLevel] = useState(5);
  const [notes, setNotes] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const newLog: DailyLog = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      painLevel,
      notes,
      imageUrl: image || undefined,
      status: 'completed'
    };
    onSave(newLog);
  };

  return (
    <div className="px-6 py-8 max-w-md mx-auto space-y-8 animate-slideUp">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="serif-heading text-3xl text-emerald-900 font-semibold">Session Log</h2>
          <p className="text-emerald-700/60 text-sm mt-1">Record your therapy session</p>
        </div>
        <button 
          onClick={onCancel} 
          className="w-10 h-10 rounded-xl bg-white/50 hover:bg-white flex items-center justify-center text-emerald-700/60 hover:text-emerald-700 transition-smooth"
        >
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>
      </div>

      <div className="space-y-6">
        {/* Pain Scale - Premium Design */}
        <section className="glass p-7 rounded-3xl shadow-lg">
          <label className="block text-sm font-bold text-emerald-800/70 uppercase tracking-wider mb-6 text-center">
            Discomfort Level
          </label>
          <div className="flex justify-between items-center mb-6">
            <div className="text-center">
              <span className="text-3xl">😌</span>
              <p className="text-[10px] text-emerald-700/50 mt-1 font-medium">None</p>
            </div>
            <div className="flex-1 mx-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-lg shadow-emerald-200/50 mb-2">
                <span className="text-3xl font-bold text-white">{painLevel}</span>
              </div>
              <p className="text-xs text-emerald-700/60 font-medium">Current Level</p>
            </div>
            <div className="text-center">
              <span className="text-3xl">😫</span>
              <p className="text-[10px] text-emerald-700/50 mt-1 font-medium">Intense</p>
            </div>
          </div>
          <input 
            type="range" 
            min="1" 
            max="10" 
            value={painLevel}
            onChange={(e) => setPainLevel(parseInt(e.target.value))}
            className="w-full h-3 bg-emerald-100 rounded-full appearance-none cursor-pointer accent-emerald-600 shadow-inner"
            style={{
              background: `linear-gradient(to right, #10b981 0%, #10b981 ${(painLevel - 1) * 11.11}%, #d1fae5 ${(painLevel - 1) * 11.11}%, #d1fae5 100%)`
            }}
          />
        </section>

        {/* Notes */}
        <section className="space-y-3">
          <label className="block text-sm font-semibold text-emerald-900/80 flex items-center space-x-2">
            <i className="fa-solid fa-pen-to-square text-emerald-600"></i>
            <span>Session Notes</span>
          </label>
          <textarea 
            className="w-full p-5 rounded-2xl glass border border-emerald-100 focus:outline-none input-glow min-h-[140px] text-emerald-900 placeholder:text-emerald-300 transition-smooth"
            placeholder="How does the area feel? Any changes in appearance, sensation, or healing progress?"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </section>

        {/* Photo Upload - Premium */}
        <section className="space-y-3">
          <label className="block text-sm font-semibold text-emerald-900/80 flex items-center space-x-2">
            <i className="fa-solid fa-camera text-emerald-600"></i>
            <span>Progress Photo (Optional)</span>
          </label>
          <div className="relative group">
            {image ? (
              <div className="relative w-full h-56 rounded-2xl overflow-hidden shadow-lg glass">
                <img src={image} className="w-full h-full object-cover" alt="Progress preview" />
                <button 
                  onClick={() => setImage(null)}
                  className="absolute top-3 right-3 bg-rose-500 text-white w-10 h-10 rounded-xl flex items-center justify-center shadow-lg hover:bg-rose-600 transition-smooth"
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            ) : (
              <label className="w-full h-40 glass border-2 border-dashed border-emerald-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-emerald-300 hover:shadow-lg transition-smooth group">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-3 shadow-md shadow-emerald-200/50 group-hover:scale-110 transition-smooth">
                  <i className="fa-solid fa-camera text-white text-xl"></i>
                </div>
                <span className="text-sm text-emerald-700 font-medium">Capture Progress Photo</span>
                <span className="text-xs text-emerald-600/50 mt-1">Tap to open camera</span>
                <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileChange} />
              </label>
            )}
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex space-x-4 pt-4">
          <button 
            onClick={onCancel}
            className="flex-1 py-4 rounded-2xl bg-white/60 text-emerald-700/70 font-semibold hover:bg-white hover:text-emerald-700 transition-smooth border border-emerald-100"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            disabled={!notes.trim()}
            className={`flex-[2] py-4 rounded-2xl font-semibold shadow-xl flex items-center justify-center space-x-2 transition-smooth ${
              notes.trim()
                ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-emerald-200/50 hover:shadow-2xl hover:scale-[1.02]'
                : 'bg-emerald-200 text-emerald-400 cursor-not-allowed'
            }`}
          >
            <i className="fa-solid fa-check"></i>
            <span>Save Session</span>
          </button>
        </div>
      </div>
    </div>
  );
};
