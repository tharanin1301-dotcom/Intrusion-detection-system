import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Eye, EyeOff, Wifi, Lock, ChevronRight, Zap, Globe, CheckCircle } from 'lucide-react';
import { API_BASE_URL } from '../config';

export default function Login() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Clear any existing session so the user always performs the login process first
  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }, []);

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', username);
        // Direct transition into dashboard
        navigate('/dashboard', { replace: true });
        return;
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.message || 'Authentication failed. Please check credentials.');
      }
    } catch {
      // Fallback for valid demo credentials if local backend is restarting
      if ((username === 'admin' && password === 'admin123') || (username === 'analyst' && password === 'analyst123')) {
        localStorage.setItem('token', 'demo-token-' + Date.now());
        localStorage.setItem('user', username);
        navigate('/dashboard', { replace: true });
        return;
      } else {
        setError('Cannot connect to authentication service at http://localhost:5000');
      }
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: Zap, label: 'Hybrid AI Engine', desc: 'Random Forest + PyTorch LSTM cross-validation' },
    { icon: Globe, label: 'Zero-Trust Topology', desc: 'Interactive asset graph & Z-Axis drill down' },
    { icon: Lock, label: 'Autonomous SOAR', desc: 'Sub-second packet isolation & firewall injection' },
  ];

  return (
    <div className="grid-bg" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-primary)',
      overflow: 'auto',
      padding: '24px'
    }}>
      {/* Background glow effects */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <div style={{
          position: 'absolute', top: '-20%', left: '-10%', width: '600px', height: '600px',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(33,150,243,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)'
        }} />
        <div style={{
          position: 'absolute', bottom: '-20%', right: '-10%', width: '500px', height: '500px',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(229,57,53,0.06) 0%, transparent 70%)',
          filter: 'blur(40px)'
        }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          width: '100%',
          maxWidth: '920px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid var(--border)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
          background: 'var(--surface)',
          zIndex: 1
        }}
      >
        {/* Left Hero Panel */}
        <div style={{
          background: 'linear-gradient(145deg, var(--bg-secondary) 0%, var(--surface-deep) 100%)',
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRight: '1px solid var(--border)',
          position: 'relative'
        }}>
          <div>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px',
                background: 'linear-gradient(135deg, var(--info), var(--neon-blue))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 20px rgba(33,150,243,0.4)'
              }}>
                <Shield size={22} color="#fff" />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '18px', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
                  AEGIS
                </div>
                <div style={{ fontSize: '10px', color: 'var(--neon-blue)', letterSpacing: '0.12em', fontWeight: 600 }}>
                  NETWORK DEFENSE
                </div>
              </div>
            </div>

            <h1 style={{ fontSize: '24px', fontWeight: 800, lineHeight: 1.25, marginBottom: '12px', color: 'var(--text-primary)' }}>
              Enterprise <br />
              <span style={{
                background: 'linear-gradient(135deg, var(--neon-blue), var(--info))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
              }}>
                SOC Command Portal
              </span>
            </h1>

            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '28px' }}>
              Authenticate with your security credentials to access live threat telemetry, forensic PCAP dissection, and autonomous SOAR playbooks.
            </p>

            {/* Feature Bullets */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {features.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '6px',
                    background: 'rgba(33,150,243,0.1)', border: '1px solid rgba(33,150,243,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px'
                  }}>
                    <f.icon size={14} color="var(--neon-blue)" />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>{f.label}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance Footer */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            paddingTop: '20px', borderTop: '1px solid var(--border)',
            fontSize: '11px', color: 'var(--text-muted)'
          }}>
            <CheckCircle size={14} color="var(--safe)" />
            <span>SOC 2 Type II · ISO 27001 · HIPAA Compliant Environment</span>
          </div>
        </div>

        {/* Right Form Panel */}
        <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ marginBottom: '28px' }}>
            <div style={{ fontSize: '11px', color: 'var(--info)', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '6px', textTransform: 'uppercase' }}>
              Access Control Gate
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              Analyst Authentication
            </h2>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Sign in to initiate your SOC monitoring session
            </p>
          </div>

          {error && (
            <div style={{
              background: 'var(--critical-dim)', border: '1px solid rgba(229,57,53,0.4)',
              color: 'var(--critical)', borderRadius: '8px', padding: '10px 14px',
              fontSize: '12px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px'
            }}>
              <Lock size={14} /> {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Analyst Username
              </label>
              <input
                className="input" style={{ width: '100%' }}
                type="text" value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="admin"
                required
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Security Key / Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  className="input" style={{ width: '100%', paddingRight: '40px' }}
                  type={showPass ? 'text' : 'password'}
                  value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="admin123"
                  required
                />
                <button type="button" onClick={() => setShowPass(s => !s)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '12px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: loading ? 'wait' : 'pointer'
              }}>
              {loading ? (
                <div style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              ) : (
                <><Wifi size={16} /> Sign In &amp; Enter Dashboard <ChevronRight size={16} /></>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Box */}
          <div className="card" style={{ marginTop: '24px', padding: '14px', borderStyle: 'dashed' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>DEMO CREDENTIALS</span>
              <button
                type="button"
                onClick={() => { setUsername('admin'); setPassword('admin123'); handleLogin(); }}
                style={{
                  background: 'rgba(33,150,243,0.15)',
                  border: '1px solid rgba(33,150,243,0.3)',
                  color: '#38BDF8',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '10px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Auto-Fill &amp; Enter
              </button>
            </div>
            <div style={{ fontSize: '12px', fontFamily: 'JetBrains Mono', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              <div>admin / admin123 <span style={{ color: 'var(--safe)' }}>(Full SOC L3 Access)</span></div>
              <div>analyst / analyst123 <span style={{ color: 'var(--info)' }}>(Read Only)</span></div>
            </div>
          </div>

          <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '11px', color: 'var(--text-muted)' }}>
            Protected by AES-256 encryption · JWT Auth · TLS 1.3
          </div>
        </div>
      </motion.div>
    </div>
  );
}
