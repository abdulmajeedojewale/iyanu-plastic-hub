import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle, AlertTriangle, Info, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      maxWidth: '380px',
      pointerEvents: 'none'
    }}>
      {toasts.map(toast => {
        const icons = {
          success: <CheckCircle size={20} color="#10b981" />,
          warning: <AlertTriangle size={20} color="#f59e0b" />,
          info: <Info size={20} color="#3b82f6" />,
          error: <XCircle size={20} color="#ef4444" />
        };

        const bgColors = {
          success: '#ecfdf5',
          warning: '#fffbeb',
          info: '#eff6ff',
          error: '#fef2f2'
        };

        const borderColors = {
          success: '#a7f3d0',
          warning: '#fde68a',
          info: '#bfdbfe',
          error: '#fecaca'
        };

        return (
          <div
            key={toast.id}
            className="animate-slide-right"
            style={{
              backgroundColor: bgColors[toast.type],
              border: `1px solid ${borderColors[toast.type]}`,
              borderRadius: '12px',
              padding: '12px 16px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              pointerEvents: 'auto',
              color: '#1e293b'
            }}
          >
            <div style={{ marginTop: '2px', flexShrink: 0 }}>
              {icons[toast.type]}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 700, margin: 0 }}>{toast.title}</h4>
              <p style={{ fontSize: '0.8rem', color: '#475569', margin: '2px 0 0 0', lineHeight: 1.35 }}>
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                padding: '2px',
                borderRadius: '4px'
              }}
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
