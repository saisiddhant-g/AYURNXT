
import React from 'react';

type ViewType = 'landing' | 'protocol' | 'admin' | 'settings';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewType;
  setView: (view: ViewType) => void;
  onReturnHome?: () => void;
  onLogout?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, setView, onReturnHome, onLogout }) => {
  const handleHomeClick = () => {
    if (currentView !== 'landing') {
      const confirmLeave = window.confirm('Are you sure you want to return to home? Any unsaved progress will be lost.');
      if (confirmLeave) {
        if (onReturnHome) {
          onReturnHome();  // Use the proper handler if provided
        } else {
          window.location.hash = '';
          setView('landing');
        }
      }
    }
  };

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout();
    } else {
      // Fallback if onLogout not provided
      if (window.confirm('Are you sure you want to logout? Your therapy data will be preserved.')) {
        const { AuthService } = require('../services/authService');
        AuthService.logout();
        window.location.reload();
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col max-w-lg mx-auto relative">
      {/* Tech-Medical gradient background */}
      <div className="fixed inset-0 -z-10" style={{
        background: 'linear-gradient(180deg, #F2F5F4 0%, #EDF2F1 100%)'
      }}></div>
      
      {/* Top Navbar - Medical-grade precision */}
      <nav className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between" style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.04)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)'
      }}>
        <div 
          className="flex items-center space-x-3 cursor-pointer group transition-smooth"
          onClick={handleHomeClick}
        >
          {/* Navigation Logo - Medical precision */}
          <div className="w-10 h-10 rounded-full overflow-hidden group-hover:scale-105 transition-smooth" style={{
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(0, 0, 0, 0.04)'
          }}>
            <img 
              src="/logo-nav.png" 
              alt="Ayurnxt Logo" 
              className="w-full h-full object-cover scale-[1.4]"
              style={{
                objectPosition: 'center'
              }}
            />
          </div>
          <span className="text-xl font-semibold" style={{
            color: '#214E45',
            letterSpacing: '-0.02em'
          }}>AYURNXT</span>
        </div>
        
        {currentView !== 'landing' && (
          <div className="flex items-center space-x-2">
            <button 
              onClick={handleHomeClick}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-smooth hover:scale-105"
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(0, 0, 0, 0.04)',
                color: '#2F5D4F',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)'
              }}
              title="Return to Home"
            >
              <i className="fa-solid fa-house text-sm"></i>
            </button>
            
            <button 
              onClick={() => setView('settings')}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-smooth hover:scale-105"
              style={{
                background: currentView === 'settings' ? '#2F5D4F' : '#FFFFFF',
                border: '1px solid rgba(0, 0, 0, 0.04)',
                color: currentView === 'settings' ? '#FFFFFF' : '#2F5D4F',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)'
              }}
              title="Settings"
            >
              <i className="fa-solid fa-gear text-sm"></i>
            </button>
            
            <button 
              onClick={handleLogoutClick}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-smooth hover:scale-105"
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(0, 0, 0, 0.04)',
                color: '#2F5D4F',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)'
              }}
              title="Logout"
            >
              <i className="fa-solid fa-right-from-bracket text-sm"></i>
            </button>
          </div>
        )}
      </nav>

      <main className="flex-1 pb-10 animate-fadeIn">
        {children}
      </main>

      {/* Footer - Tech-Medical system */}
      <footer className="py-6 px-6 text-center space-y-2">
        <p className="text-[10px] uppercase tracking-[0.15em] font-semibold" style={{color: '#214E45'}}>
          Clinical Therapy Guidance System
        </p>
        <p className="text-[9px]" style={{color: '#5F6F6B'}}>
          Not a substitute for professional medical advice • For demonstration purposes
        </p>
      </footer>
    </div>
  );
};
