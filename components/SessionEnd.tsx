
import React from 'react';
import { SessionStatus } from '../therapyProtocol';

interface SessionEndProps {
  status: SessionStatus;
  terminationReason?: string;
  onProceedToLogging: () => void;
}

export const SessionEnd: React.FC<SessionEndProps> = ({ status, terminationReason, onProceedToLogging }) => {
  const isCompleted = status === SessionStatus.COMPLETED;

  return (
    <div className="px-6 py-8 max-w-md mx-auto min-h-screen flex flex-col justify-center protocol-transition">
      <div className="text-center space-y-8">
        {/* Status Icon - Earned Achievement */}
        <div className="earned-achievement">
          <div className={`inline-flex items-center justify-center w-24 h-24 rounded-3xl mb-4 shadow-2xl ${
            isCompleted 
              ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-emerald-200/50 breathing-pulse' 
              : 'bg-gradient-to-br from-amber-400 to-amber-500 shadow-amber-200/50'
          }`}>
            <i className={`text-white text-5xl ${
              isCompleted ? 'fa-solid fa-circle-check' : 'fa-solid fa-shield-heart'
            }`}></i>
          </div>
          
          <h2 className="serif-heading text-3xl text-emerald-900 font-semibold mb-2">
            {isCompleted ? 'Session Completed' : 'Session Ended'}
          </h2>
          
          <p className="text-emerald-700/60 text-sm">
            {isCompleted 
              ? 'Your therapy session has finished successfully' 
              : 'Session was terminated for your safety'}
          </p>
        </div>

        {/* Completion Message */}
        {isCompleted && (
          <div className="glass p-6 rounded-3xl shadow-lg protocol-slide" style={{animationDelay: '0.1s'}}>
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2 text-emerald-700">
                <i className="fa-solid fa-sparkles"></i>
                <span className="font-semibold">Therapy protocol completed</span>
              </div>
              
              <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
                <p className="text-sm text-emerald-800 leading-relaxed">
                  The herbal plaster has delivered the full therapeutic duration. You may now remove the plaster and proceed to log your experience.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Early Termination Message - Supportive */}
        {!isCompleted && terminationReason && (
          <div className="glass p-6 rounded-3xl shadow-lg border-2 border-amber-100 protocol-slide" style={{animationDelay: '0.1s'}}>
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2 text-amber-700">
                <i className="fa-solid fa-shield-heart"></i>
                <span className="font-semibold">Safety Protocol Activated</span>
              </div>
              
              <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl">
                <p className="text-sm text-amber-900 leading-relaxed mb-3">
                  <strong>Reason:</strong> {terminationReason}
                </p>
                <p className="text-sm text-amber-800 leading-relaxed">
                  Your session was ended as a precaution. Please remove the plaster and allow the area to rest. If discomfort persists, consult a healthcare professional.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Next Steps - Guided */}
        <div className="glass p-6 rounded-3xl shadow-lg space-y-4 protocol-slide" style={{animationDelay: '0.2s'}}>
          <div className="flex items-center space-x-2 mb-3">
            <i className="fa-solid fa-list-check text-emerald-600"></i>
            <h3 className="font-bold text-emerald-900">Next Steps</h3>
          </div>

          <div className="space-y-3 text-left">
            <div className="flex items-start space-x-3 group">
              <div className="w-6 h-6 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                <span className="text-xs font-bold text-emerald-700">1</span>
              </div>
              <p className="text-sm text-emerald-900/80">Remove the therapy plaster carefully</p>
            </div>
            
            <div className="flex items-start space-x-3 group">
              <div className="w-6 h-6 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                <span className="text-xs font-bold text-emerald-700">2</span>
              </div>
              <p className="text-sm text-emerald-900/80">Clean the application area gently</p>
            </div>
            
            <div className="flex items-start space-x-3 group">
              <div className="w-6 h-6 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                <span className="text-xs font-bold text-emerald-700">3</span>
              </div>
              <p className="text-sm text-emerald-900/80">Complete the required pain assessment</p>
            </div>
          </div>
        </div>

        {/* Proceed Button - Deliberate */}
        <button
          onClick={onProceedToLogging}
          className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold py-5 rounded-2xl shadow-xl shadow-emerald-200/50 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2 deliberate-action protocol-slide"
          style={{animationDelay: '0.3s'}}
        >
          <span>Proceed to Pain Assessment</span>
          <i className="fa-solid fa-arrow-right"></i>
        </button>

        {/* Disclaimer */}
        <div className="glass p-4 rounded-2xl border border-emerald-100 protocol-slide" style={{animationDelay: '0.4s'}}>
          <p className="text-xs text-emerald-700/60 leading-relaxed">
            Pain logging is required to track your therapy progress and ensure protocol effectiveness.
          </p>
        </div>
      </div>
    </div>
  );
};
