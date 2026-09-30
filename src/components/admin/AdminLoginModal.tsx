import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DEMO_ADMIN_USERS } from '../../services/supabase';
import { Role } from '../../types';
import {
  ShieldCheck,
  Lock,
  Mail,
  X,
  ArrowRight,
  Sparkles,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  Building2,
  UserCheck
} from 'lucide-react';

export const AdminLoginModal: React.FC = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, login, resetPassword, switchRole, formatNGN } = useApp();

  const [mode, setMode] = useState<'login' | 'forgot_password'>('login');
  const [email, setEmail] = useState('superadmin@iyanuplastic.ng');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isLoginModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    if (mode === 'login') {
      const res = await login(email, password);
      setIsLoading(false);
      if (!res.success) {
        setErrorMessage(res.error || 'Invalid credentials.');
      }
    } else {
      const res = await resetPassword(email);
      setIsLoading(false);
      if (res.success) {
        setSuccessMessage(res.message);
      } else {
        setErrorMessage(res.message || 'Error sending password reset.');
      }
    }
  };

  const handleQuickFill = (user: typeof DEMO_ADMIN_USERS[0]) => {
    setEmail(user.email);
    setPassword('adminSecure#2026');
    setErrorMessage('');
    setSuccessMessage('');
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(15, 23, 42, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '20px'
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '24px',
        width: '100%',
        maxWidth: '540px',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.3)',
        overflow: 'hidden',
        border: '1px solid #e2e8f0',
        animation: 'scaleUp 0.2s ease-out'
      }}>
        {/* Modal Header */}
        <div style={{
          background: 'linear-gradient(135deg, #062826 0%, #0d5c57 50%, #042f2e 100%)',
          padding: '28px 32px',
          color: '#ffffff',
          position: 'relative'
        }}>
          <button
            onClick={() => setIsLoginModalOpen(false)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: '#ffffff',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '8px' }}>
            <img
              src="/logo.png"
              alt="IPS Logo"
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #eab308',
                boxShadow: '0 4px 12px rgba(234, 179, 8, 0.5)'
              }}
            />
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#2dd4bf', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Secure Operations & CRM Portal
              </div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#ffffff', margin: 0 }}>
                IYANU PLASTIC ADMIN
              </h2>
            </div>
          </div>
          <p style={{ fontSize: '0.82rem', color: '#99f6e4', margin: '4px 0 0 0', lineHeight: 1.5 }}>
            Single source of truth authentication backed by Supabase & Role-Based Access Control (RBAC).
          </p>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '32px' }}>
          {errorMessage && (
            <div style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#991b1b',
              padding: '12px 16px',
              borderRadius: '10px',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '20px'
            }}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div style={{
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              color: '#166534',
              padding: '12px 16px',
              borderRadius: '10px',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '20px'
            }}>
              <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Admin Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: '#94a3b8' }} />
                <input
                  type="email"
                  required
                  placeholder="name@iyanuplastic.ng"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 42px',
                    borderRadius: '10px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '0.9rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {mode === 'login' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('forgot_password');
                      setErrorMessage('');
                      setSuccessMessage('');
                    }}
                    style={{ background: 'none', border: 'none', color: '#0f766e', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                  >
                    Forgot Password?
                  </button>
                </div>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: '#94a3b8' }} />
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px 12px 42px',
                      borderRadius: '10px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '0.9rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '0.95rem',
                fontWeight: 800,
                justifyContent: 'center',
                marginTop: '6px',
                opacity: isLoading ? 0.7 : 1
              }}
            >
              {isLoading ? (
                'Authenticating...'
              ) : mode === 'login' ? (
                <>
                  <ShieldCheck size={18} /> Sign In to Admin Portal
                </>
              ) : (
                <>
                  <KeyRound size={18} /> Send Reset Link
                </>
              )}
            </button>

            {mode === 'forgot_password' && (
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setErrorMessage('');
                  setSuccessMessage('');
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#64748b',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                Back to Sign In
              </button>
            )}
          </form>

          {/* Quick Persona Fill for Inspection & Pair-Programming */}
          <div style={{
            marginTop: '28px',
            paddingTop: '20px',
            borderTop: '1px solid #e2e8f0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '10px' }}>
              <Sparkles size={14} color="#0f766e" /> Quick Role Testing (Click to Autofill):
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
              gap: '8px'
            }}>
              {DEMO_ADMIN_USERS.map(usr => (
                <button
                  key={usr.id}
                  type="button"
                  onClick={() => handleQuickFill(usr)}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    background: email === usr.email ? '#f0fdfa' : '#f8fafc',
                    borderColor: email === usr.email ? '#0f766e' : '#e2e8f0',
                    color: email === usr.email ? '#0f766e' : '#334155',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ fontSize: '0.68rem', color: '#64748b', textTransform: 'uppercase' }}>
                    {usr.role.replace('_', ' ')}
                  </div>
                  <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {usr.fullName.split(' ')[0]}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
