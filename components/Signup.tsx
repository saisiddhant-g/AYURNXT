import React, { useState } from 'react';
import { AuthService } from '../services/authService';

interface SignupProps {
  onSignupSuccess: () => void;
  onSwitchToLogin: () => void;
}

export const Signup: React.FC<SignupProps> = ({ onSignupSuccess, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    const result = AuthService.register(name, email, password);

    if (result.success) {
      // Auto-login after successful registration
      const loginResult = AuthService.login(email, password);
      if (loginResult.success) {
        onSignupSuccess();
      }
    } else {
      setError(result.error || 'Registration failed');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{
      background: 'linear-gradient(180deg, #F2F5F4 0%, #EDF2F1 100%)'
    }}>
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{
            background: '#FFFFFF',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(0, 0, 0, 0.04)'
          }}>
            <img 
              src="/logo-nav.png" 
              alt="Ayurnxt Logo" 
              className="w-full h-full object-cover scale-[1.4] rounded-full"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{
            color: '#214E45',
            letterSpacing: '-0.02em'
          }}>
            Ayurnxt
          </h1>
          <p className="text-sm" style={{color: '#5F6F6B'}}>
            Clinical Therapy Guidance System
          </p>
        </div>

        {/* Signup Card */}
        <div className="stitch-card p-8 space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-1" style={{
              color: '#214E45',
              letterSpacing: '-0.01em'
            }}>
              Create Account
            </h2>
            <p className="text-sm" style={{color: '#5F6F6B'}}>
              Start your supervised therapy journey
            </p>
          </div>

          {error && (
            <div className="p-4 rounded-xl" style={{
              background: '#FEE2E2',
              border: '1px solid rgba(220, 38, 38, 0.2)'
            }}>
              <p className="text-sm" style={{color: '#991B1B'}}>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{color: '#2C3E3B'}}>
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl transition-all"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid rgba(0, 0, 0, 0.04)',
                  color: '#2C3E3B',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                }}
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{color: '#2C3E3B'}}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl transition-all"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid rgba(0, 0, 0, 0.04)',
                  color: '#2C3E3B',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                }}
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{color: '#2C3E3B'}}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 pr-12 rounded-xl transition-all"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid rgba(0, 0, 0, 0.04)',
                    color: '#2C3E3B',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                  }}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 transition-all hover:scale-110"
                  style={{
                    color: '#214E45',
                    cursor: 'pointer'
                  }}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-sm`}></i>
                </button>
              </div>
              <p className="text-xs mt-1" style={{color: '#9BA8A4'}}>
                Minimum 6 characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{color: '#2C3E3B'}}>
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 pr-12 rounded-xl transition-all"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid rgba(0, 0, 0, 0.04)',
                    color: '#2C3E3B',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                  }}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 transition-all hover:scale-110"
                  style={{
                    color: '#214E45',
                    cursor: 'pointer'
                  }}
                  title={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  <i className={`fa-solid ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'} text-sm`}></i>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="stitch-button-primary w-full"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="text-center pt-4 border-t" style={{borderColor: 'rgba(0, 0, 0, 0.04)'}}>
            <p className="text-sm" style={{color: '#5F6F6B'}}>
              Already have an account?{' '}
              <button
                onClick={onSwitchToLogin}
                className="font-semibold hover:underline"
                style={{color: '#2F5D4F'}}
              >
                Sign In
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs" style={{color: '#9BA8A4'}}>
            Protocol-enforced supervision • State-validated therapy
          </p>
        </div>
      </div>
    </div>
  );
};
