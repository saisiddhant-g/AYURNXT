import React, { useState, useEffect } from 'react';
import { AuthService } from '../services/authService';
import { UserDataService } from '../services/userDataService';
import { QRScannerService } from '../services/qrScannerService';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface SettingsProps {
  onClose: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ onClose }) => {
  const session = AuthService.getSession();
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'privacy' | 'device'>('profile');
  
  // Profile state
  const [name, setName] = useState(session?.name || '');
  const [email] = useState(session?.email || '');
  const [editingProfile, setEditingProfile] = useState(false);
  
  // Camera status
  const [cameraStatus, setCameraStatus] = useState<any>(null);
  
  // Export modal
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState<'pdf' | 'png' | null>(null);
  
  // Individual preference states
  const [notifications, setNotifications] = useState(true);
  const [emailReminders, setEmailReminders] = useState(false);
  const [dataSharing, setDataSharing] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Load preferences on mount
  useEffect(() => {
    if (session) {
      const saved = UserDataService.getPreferences(session.userId);
      if (saved && Object.keys(saved).length > 0) {
        setNotifications(saved.notifications ?? true);
        setEmailReminders(saved.emailReminders ?? false);
        setDataSharing(saved.dataSharing ?? false);
        setDarkMode(saved.darkMode ?? false);
        
        // Apply dark mode if enabled
        if (saved.darkMode) {
          document.documentElement.classList.add('dark');
        }
      }
    }
  }, [session]);

  // Load camera status
  useEffect(() => {
    QRScannerService.getCameraStatus().then(setCameraStatus);
  }, []);

  const handleSaveProfile = () => {
    setEditingProfile(false);
    alert('Profile updated successfully');
  };

  const handleToggleNotifications = () => {
    const newValue = !notifications;
    setNotifications(newValue);
    if (session) {
      UserDataService.savePreferences(session.userId, {
        notifications: newValue,
        emailReminders,
        dataSharing,
        darkMode
      });
    }
  };

  const handleToggleEmailReminders = () => {
    const newValue = !emailReminders;
    setEmailReminders(newValue);
    if (session) {
      UserDataService.savePreferences(session.userId, {
        notifications,
        emailReminders: newValue,
        dataSharing,
        darkMode
      });
    }
  };

  const handleToggleDataSharing = () => {
    const newValue = !dataSharing;
    setDataSharing(newValue);
    if (session) {
      UserDataService.savePreferences(session.userId, {
        notifications,
        emailReminders,
        dataSharing: newValue,
        darkMode
      });
    }
  };

  const handleToggleDarkMode = () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    
    // Apply dark mode immediately
    if (newValue) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save preference
    if (session) {
      UserDataService.savePreferences(session.userId, {
        notifications,
        emailReminders,
        dataSharing,
        darkMode: newValue
      });
    }
  };

  const handleTestCamera = async () => {
    const status = await QRScannerService.getCameraStatus();
    setCameraStatus(status);
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all your therapy data? This cannot be undone.')) {
      if (session) {
        UserDataService.clearAllUserData(session.userId);
        alert('All therapy data has been cleared');
        window.location.reload();
      }
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This will permanently delete all your data and cannot be undone.')) {
      const confirmText = prompt('Type "DELETE" to confirm account deletion:');
      if (confirmText === 'DELETE') {
        if (session) {
          // Clear all user data
          UserDataService.clearAllUserData(session.userId);
          
          // Remove session
          AuthService.logout();
          
          // Reload to show login screen
          window.location.reload();
        }
      }
    }
  };

  const handleExportData = () => {
    setShowExportModal(true);
    setExportFormat(null);
  };

  const handleConfirmExport = async () => {
    if (!exportFormat || !session) return;

    if (exportFormat === 'pdf') {
      await generatePDFExport();
    } else if (exportFormat === 'png') {
      await generatePNGExport();
    }

    setShowExportModal(false);
    setExportFormat(null);
  };

  const generatePDFExport = async () => {
    if (!session) return;

    const sessions = UserDataService.getSessions(session.userId);
    const units = UserDataService.getActivatedUnits(session.userId);
    
    // Calculate compliance
    const completedSessions = sessions.filter(s => s.status === 'COMPLETED').length;
    const complianceScore = sessions.length > 0 ? Math.round((completedSessions / sessions.length) * 100) : 0;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPos = 20;

    // Header
    doc.setFontSize(20);
    doc.setTextColor(33, 78, 69); // #214E45
    doc.text('Ayurnxt – Supervised Therapy Record', pageWidth / 2, yPos, { align: 'center' });
    
    yPos += 10;
    doc.setFontSize(10);
    doc.setTextColor(95, 111, 107);
    doc.text(`User: ${session.name}`, pageWidth / 2, yPos, { align: 'center' });
    
    yPos += 5;
    doc.text(`Email: ${session.email}`, pageWidth / 2, yPos, { align: 'center' });
    
    yPos += 5;
    doc.text(`Generated: ${new Date().toLocaleString()}`, pageWidth / 2, yPos, { align: 'center' });
    
    yPos += 15;

    // Section 1: Therapy Summary
    doc.setFontSize(14);
    doc.setTextColor(33, 78, 69);
    doc.text('Therapy Summary', 20, yPos);
    yPos += 8;

    doc.setFontSize(10);
    doc.setTextColor(44, 62, 59);
    doc.text(`Total Sessions: ${sessions.length}`, 20, yPos);
    yPos += 6;
    doc.text(`Completed Sessions: ${completedSessions}`, 20, yPos);
    yPos += 6;
    doc.text(`Compliance Score: ${complianceScore}%`, 20, yPos);
    yPos += 6;
    doc.text(`Activated Units: ${units.length}`, 20, yPos);
    yPos += 12;

    // Section 2: Session History
    if (sessions.length > 0) {
      doc.setFontSize(14);
      doc.setTextColor(33, 78, 69);
      doc.text('Session History', 20, yPos);
      yPos += 8;

      doc.setFontSize(8);
      doc.setTextColor(44, 62, 59);
      
      sessions.slice(0, 10).forEach((session, index) => {
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
        }
        
        const date = new Date(session.startTime).toLocaleDateString();
        doc.text(`${index + 1}. ${date} | ${session.bodyArea} | ${session.mode} | ${session.durationMinutes}min`, 20, yPos);
        yPos += 5;
        doc.text(`   Pain: ${session.painBefore} → ${session.painAfter} | Status: ${session.status}`, 20, yPos);
        yPos += 7;
      });

      yPos += 5;
    }

    // Section 3: Activated Units
    if (units.length > 0 && yPos < 250) {
      doc.setFontSize(14);
      doc.setTextColor(33, 78, 69);
      doc.text('Activated Units', 20, yPos);
      yPos += 8;

      doc.setFontSize(9);
      doc.setTextColor(44, 62, 59);
      
      units.slice(0, 5).forEach((unitId, index) => {
        doc.text(`${index + 1}. Unit ID: ${unitId}`, 20, yPos);
        yPos += 6;
      });

      yPos += 10;
    }

    // Section 4: System Note
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(10);
    doc.setTextColor(95, 111, 107);
    const noteText = 'This document reflects structured usage data collected under the Ayurnxt supervised therapy protocol. It does not constitute medical advice.';
    const splitNote = doc.splitTextToSize(noteText, pageWidth - 40);
    doc.text(splitNote, 20, yPos);

    // Save PDF
    const fileName = `Ayurnxt_Report_${session.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
  };

  const generatePNGExport = async () => {
    if (!session) return;

    const sessions = UserDataService.getSessions(session.userId);
    const completedSessions = sessions.filter(s => s.status === 'COMPLETED').length;
    const complianceScore = sessions.length > 0 ? Math.round((completedSessions / sessions.length) * 100) : 0;

    // Create temporary container
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.width = '600px';
    container.style.padding = '40px';
    container.style.background = '#F2F5F4';
    container.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    
    container.innerHTML = `
      <div style="background: white; border-radius: 16px; padding: 32px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08); border: 1px solid rgba(0, 0, 0, 0.04);">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="color: #214E45; font-size: 28px; font-weight: bold; margin: 0 0 8px 0; letter-spacing: -0.02em;">Ayurnxt</h1>
          <p style="color: #5F6F6B; font-size: 14px; margin: 0;">${session.name}</p>
        </div>
        
        <div style="text-align: center; margin-bottom: 32px;">
          <div style="width: 160px; height: 160px; margin: 0 auto; border-radius: 50%; background: linear-gradient(135deg, #E8F3F0 0%, #D4E8E3 100%); display: flex; align-items: center; justify-content: center; border: 8px solid white; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);">
            <div style="text-align: center;">
              <div style="font-size: 48px; font-weight: bold; color: #214E45; line-height: 1;">${complianceScore}%</div>
              <div style="font-size: 12px; color: #5F6F6B; margin-top: 4px;">Compliance</div>
            </div>
          </div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
          <div style="background: #E8F3F0; padding: 16px; border-radius: 12px; text-align: center;">
            <div style="font-size: 24px; font-weight: bold; color: #214E45;">${sessions.length}</div>
            <div style="font-size: 11px; color: #5F6F6B; margin-top: 4px;">Total Sessions</div>
          </div>
          <div style="background: #E8F3F0; padding: 16px; border-radius: 12px; text-align: center;">
            <div style="font-size: 24px; font-weight: bold; color: #214E45;">${completedSessions}</div>
            <div style="font-size: 11px; color: #5F6F6B; margin-top: 4px;">Completed</div>
          </div>
        </div>
        
        <div style="text-align: center; padding-top: 16px; border-top: 1px solid rgba(0, 0, 0, 0.04);">
          <p style="color: #9BA8A4; font-size: 10px; margin: 0;">Generated ${new Date().toLocaleDateString()}</p>
        </div>
      </div>
    `;

    document.body.appendChild(container);

    try {
      const canvas = await html2canvas(container, {
        backgroundColor: '#F2F5F4',
        scale: 2
      });

      const link = document.createElement('a');
      link.download = `Ayurnxt_Summary_${session.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } finally {
      document.body.removeChild(container);
    }
  };

  return (
    <div className="min-h-screen px-6 py-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2" style={{
            color: '#214E45',
            letterSpacing: '-0.02em'
          }}>
            Settings
          </h1>
          <p className="text-sm" style={{color: '#5F6F6B'}}>
            Manage your account and preferences
          </p>
        </div>
        <button 
          onClick={onClose}
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-smooth hover:scale-105"
          style={{
            background: '#FFFFFF',
            border: '1px solid rgba(0, 0, 0, 0.04)',
            color: '#2F5D4F',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)'
          }}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6 overflow-x-auto">
        {[
          { id: 'profile', label: 'Profile', icon: 'fa-user' },
          { id: 'preferences', label: 'Preferences', icon: 'fa-sliders' },
          { id: 'privacy', label: 'Privacy', icon: 'fa-shield-halved' },
          { id: 'device', label: 'Device', icon: 'fa-camera' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-3 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${
              activeTab === tab.id ? 'stitch-button-primary' : 'stitch-button-secondary'
            }`}
          >
            <i className={`fa-solid ${tab.icon} mr-2`}></i>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          {/* Account Information */}
          <div className="stitch-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold" style={{color: '#214E45'}}>
                Account Information
              </h3>
              {!editingProfile && (
                <button 
                  onClick={() => setEditingProfile(true)}
                  className="text-sm font-semibold hover:underline"
                  style={{color: '#2F5D4F'}}
                >
                  Edit
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{color: '#2C3E3B'}}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!editingProfile}
                  className="w-full px-4 py-3 rounded-xl transition-all"
                  style={{
                    background: editingProfile ? '#FFFFFF' : '#F2F5F4',
                    border: '1px solid rgba(0, 0, 0, 0.04)',
                    color: '#2C3E3B',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{color: '#2C3E3B'}}>
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full px-4 py-3 rounded-xl transition-all"
                  style={{
                    background: '#F2F5F4',
                    border: '1px solid rgba(0, 0, 0, 0.04)',
                    color: '#5F6F6B',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                  }}
                />
                <p className="text-xs mt-1" style={{color: '#9BA8A4'}}>
                  Email cannot be changed
                </p>
              </div>

              {editingProfile && (
                <div className="flex space-x-3 pt-2">
                  <button 
                    onClick={() => setEditingProfile(false)}
                    className="stitch-button-secondary flex-1"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSaveProfile}
                    className="stitch-button-primary flex-1"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Account Stats */}
          <div className="stitch-card p-6">
            <h3 className="text-lg font-bold mb-4" style={{color: '#214E45'}}>
              Account Statistics
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl" style={{background: '#E8F3F0'}}>
                <p className="text-2xl font-bold" style={{color: '#214E45'}}>
                  {session ? UserDataService.getSessions(session.userId).length : 0}
                </p>
                <p className="text-xs" style={{color: '#5F6F6B'}}>Total Sessions</p>
              </div>
              <div className="p-4 rounded-xl" style={{background: '#E8F3F0'}}>
                <p className="text-2xl font-bold" style={{color: '#214E45'}}>
                  {session ? UserDataService.getActivatedUnits(session.userId).length : 0}
                </p>
                <p className="text-xs" style={{color: '#5F6F6B'}}>Activated Units</p>
              </div>
            </div>
          </div>

          {/* Member Since */}
          <div className="stitch-card p-6">
            <h3 className="text-lg font-bold mb-4" style={{color: '#214E45'}}>
              Membership
            </h3>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{
                background: '#E8F3F0'
              }}>
                <i className="fa-solid fa-calendar-check" style={{color: '#214E45'}}></i>
              </div>
              <div>
                <p className="font-semibold" style={{color: '#2C3E3B'}}>
                  Member since {session ? new Date(session.loginTime).toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric' 
                  }) : 'N/A'}
                </p>
                <p className="text-sm" style={{color: '#5F6F6B'}}>
                  Active account
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preferences Tab */}
      {activeTab === 'preferences' && (
        <div className="space-y-6">
          <div className="stitch-card p-6">
            <h3 className="text-lg font-bold mb-6" style={{color: '#214E45'}}>
              App Preferences
            </h3>

            <div className="space-y-4">
              {[
                { 
                  key: 'notifications', 
                  label: 'Push Notifications', 
                  description: 'Receive notifications about therapy sessions',
                  icon: 'fa-bell',
                  checked: notifications,
                  onChange: handleToggleNotifications
                },
                { 
                  key: 'emailReminders', 
                  label: 'Email Reminders', 
                  description: 'Get email reminders for scheduled sessions',
                  icon: 'fa-envelope',
                  checked: emailReminders,
                  onChange: handleToggleEmailReminders
                },
                { 
                  key: 'dataSharing', 
                  label: 'Anonymous Data Sharing', 
                  description: 'Help improve the platform with anonymous usage data',
                  icon: 'fa-chart-line',
                  checked: dataSharing,
                  onChange: handleToggleDataSharing
                },
                { 
                  key: 'darkMode', 
                  label: 'Dark Mode', 
                  description: 'Use dark theme for reduced eye strain',
                  icon: 'fa-moon',
                  checked: darkMode,
                  onChange: handleToggleDarkMode
                }
              ].map(pref => (
                <div key={pref.key} className="flex items-center justify-between p-4 rounded-xl" style={{
                  background: '#F2F5F4',
                  border: '1px solid rgba(0, 0, 0, 0.04)'
                }}>
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{
                      background: '#E8F3F0'
                    }}>
                      <i className={`fa-solid ${pref.icon}`} style={{color: '#214E45'}}></i>
                    </div>
                    <div>
                      <p className="font-semibold" style={{color: '#2C3E3B'}}>
                        {pref.label}
                      </p>
                      <p className="text-xs" style={{color: '#5F6F6B'}}>
                        {pref.description}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={pref.onChange}
                    className={`w-12 h-6 rounded-full transition-all ${
                      pref.checked ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                    style={{
                      position: 'relative'
                    }}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-all absolute top-0.5 ${
                      pref.checked ? 'right-0.5' : 'left-0.5'
                    }`} style={{
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                    }}></div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Privacy Tab */}
      {activeTab === 'privacy' && (
        <div className="space-y-6">
          <div className="stitch-card p-6">
            <h3 className="text-lg font-bold mb-6" style={{color: '#214E45'}}>
              Data & Privacy
            </h3>

            <div className="space-y-4">
              <div className="p-4 rounded-xl" style={{
                background: '#E8F3F0',
                border: '1px solid rgba(0, 0, 0, 0.04)'
              }}>
                <div className="flex items-start space-x-3">
                  <i className="fa-solid fa-shield-halved text-lg mt-1" style={{color: '#214E45'}}></i>
                  <div>
                    <p className="font-semibold mb-1" style={{color: '#214E45'}}>
                      Your Data is Protected
                    </p>
                    <p className="text-sm" style={{color: '#5F6F6B'}}>
                      All therapy data is encrypted and stored securely. We never share your personal health information without your explicit consent.
                    </p>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleExportData}
                className="stitch-button-secondary w-full"
              >
                <i className="fa-solid fa-download mr-2"></i>
                Download My Data
              </button>

              <button 
                onClick={handleClearData}
                className="stitch-button-secondary w-full"
                style={{
                  color: '#DC2626',
                  borderColor: 'rgba(220, 38, 38, 0.2)'
                }}
              >
                <i className="fa-solid fa-trash mr-2"></i>
                Clear All Therapy Data
              </button>
            </div>
          </div>

          <div className="stitch-card p-6" style={{
            borderColor: 'rgba(220, 38, 38, 0.2)'
          }}>
            <h3 className="text-lg font-bold mb-4" style={{color: '#DC2626'}}>
              Danger Zone
            </h3>
            <p className="text-sm mb-4" style={{color: '#5F6F6B'}}>
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <button 
              onClick={handleDeleteAccount}
              className="stitch-button-secondary w-full"
              style={{
                background: '#FEE2E2',
                color: '#991B1B',
                borderColor: 'rgba(220, 38, 38, 0.2)'
              }}
            >
              <i className="fa-solid fa-user-xmark mr-2"></i>
              Delete Account
            </button>
          </div>
        </div>
      )}

      {/* Device Tab */}
      {activeTab === 'device' && (
        <div className="space-y-6">
          <div className="stitch-card p-6">
            <h3 className="text-lg font-bold mb-6" style={{color: '#214E45'}}>
              Device & Camera Permissions
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl" style={{
                background: '#F2F5F4',
                border: '1px solid rgba(0, 0, 0, 0.04)'
              }}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{
                    background: '#E8F3F0'
                  }}>
                    <i className="fa-solid fa-camera" style={{color: '#214E45'}}></i>
                  </div>
                  <div>
                    <p className="font-semibold" style={{color: '#2C3E3B'}}>
                      Camera Access
                    </p>
                    <p className="text-xs" style={{color: '#5F6F6B'}}>
                      Required to activate therapy units
                    </p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  cameraStatus?.permission.status === 'granted' 
                    ? 'bg-green-100 text-green-800'
                    : cameraStatus?.permission.status === 'denied'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {cameraStatus?.permission.status === 'granted' && 'Granted'}
                  {cameraStatus?.permission.status === 'denied' && 'Denied'}
                  {cameraStatus?.permission.status === 'prompt' && 'Not Requested'}
                  {!cameraStatus && 'Checking...'}
                </div>
              </div>

              <button 
                onClick={handleTestCamera}
                className="stitch-button-secondary w-full"
              >
                <i className="fa-solid fa-camera mr-2"></i>
                Test Camera
              </button>

              <div className="p-4 rounded-xl" style={{
                background: '#E8F3F0',
                border: '1px solid rgba(0, 0, 0, 0.04)'
              }}>
                <p className="text-sm" style={{color: '#214E45'}}>
                  <strong>Camera access is required</strong> to activate therapy units by scanning QR codes. 
                  If denied, you can use the simulation option for demo purposes.
                </p>
              </div>

              {cameraStatus?.permission.status === 'denied' && (
                <div className="p-4 rounded-xl" style={{
                  background: '#FEE2E2',
                  border: '1px solid rgba(220, 38, 38, 0.2)'
                }}>
                  <p className="text-sm font-semibold mb-2" style={{color: '#991B1B'}}>
                    Camera Access Denied
                  </p>
                  <p className="text-xs" style={{color: '#DC2626'}}>
                    To enable camera access, please update your browser settings:
                  </p>
                  <ul className="text-xs mt-2 space-y-1" style={{color: '#DC2626'}}>
                    <li>• Chrome: Settings → Privacy and security → Site settings → Camera</li>
                    <li>• Firefox: Settings → Privacy & Security → Permissions → Camera</li>
                    <li>• Safari: Preferences → Websites → Camera</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="stitch-card p-6">
            <h3 className="text-lg font-bold mb-4" style={{color: '#214E45'}}>
              Device Information
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span style={{color: '#5F6F6B'}}>Browser:</span>
                <span style={{color: '#2C3E3B'}} className="font-semibold">
                  {navigator.userAgent.includes('Chrome') ? 'Chrome' : 
                   navigator.userAgent.includes('Firefox') ? 'Firefox' :
                   navigator.userAgent.includes('Safari') ? 'Safari' : 'Other'}
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{color: '#5F6F6B'}}>Platform:</span>
                <span style={{color: '#2C3E3B'}} className="font-semibold">
                  {navigator.platform}
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{color: '#5F6F6B'}}>Camera Available:</span>
                <span style={{color: '#2C3E3B'}} className="font-semibold">
                  {cameraStatus?.available ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(8px)',
            animation: 'fadeIn 0.2s ease-out'
          }}
          onClick={() => setShowExportModal(false)}
        >
          <div 
            className="stitch-card max-w-md w-full p-8"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: 'slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <h2 className="text-2xl font-bold mb-2" style={{color: '#214E45', letterSpacing: '-0.02em'}}>
              Export Therapy Data
            </h2>
            <p className="text-sm mb-6" style={{color: '#5F6F6B'}}>
              Download your structured therapy record in a professional format
            </p>

            <div className="space-y-3 mb-6">
              <button
                onClick={() => setExportFormat('pdf')}
                className={`w-full p-4 rounded-xl text-left transition-all ${
                  exportFormat === 'pdf' ? 'ring-2 ring-green-500' : ''
                }`}
                style={{
                  background: exportFormat === 'pdf' ? '#E8F3F0' : '#F2F5F4',
                  border: '1px solid rgba(0, 0, 0, 0.04)'
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{
                    background: '#FFFFFF',
                    border: '1px solid rgba(0, 0, 0, 0.04)'
                  }}>
                    <i className="fa-solid fa-file-pdf text-lg" style={{color: '#214E45'}}></i>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold" style={{color: '#2C3E3B'}}>Export as PDF</p>
                    <p className="text-xs" style={{color: '#5F6F6B'}}>
                      Structured clinical therapy summary in printable format
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setExportFormat('png')}
                className={`w-full p-4 rounded-xl text-left transition-all ${
                  exportFormat === 'png' ? 'ring-2 ring-green-500' : ''
                }`}
                style={{
                  background: exportFormat === 'png' ? '#E8F3F0' : '#F2F5F4',
                  border: '1px solid rgba(0, 0, 0, 0.04)'
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{
                    background: '#FFFFFF',
                    border: '1px solid rgba(0, 0, 0, 0.04)'
                  }}>
                    <i className="fa-solid fa-image text-lg" style={{color: '#214E45'}}></i>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold" style={{color: '#2C3E3B'}}>Export as PNG</p>
                    <p className="text-xs" style={{color: '#5F6F6B'}}>
                      Visual summary snapshot of therapy performance
                    </p>
                  </div>
                </div>
              </button>
            </div>

            <div className="flex space-x-3">
              <button 
                onClick={() => setShowExportModal(false)}
                className="stitch-button-secondary flex-1"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmExport}
                disabled={!exportFormat}
                className="stitch-button-primary flex-1"
                style={{
                  opacity: exportFormat ? 1 : 0.5,
                  cursor: exportFormat ? 'pointer' : 'not-allowed'
                }}
              >
                Confirm Export
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
