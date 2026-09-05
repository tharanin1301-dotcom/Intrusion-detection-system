import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  Shield, 
  LayoutDashboard, 
  Network, 
  AlertTriangle, 
  Workflow, 
  Binary, 
  Radio, 
  Award, 
  Fingerprint, 
  Cpu, 
  Bot, 
  LogOut, 
  ExternalLink,
  ChevronRight,
  UserCheck
} from 'lucide-react';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navGroups = [
    {
      group: 'OPERATIONS',
      items: [
        { name: 'SOC Dashboard', path: '/dashboard', icon: LayoutDashboard, badge: 'LIVE' },
        { name: 'Topology & Assets', path: '/topology', icon: Network },
        { name: 'Live Threat Stream', path: '/alerts', icon: AlertTriangle, badge: '4' },
      ]
    },
    {
      group: 'AUTOMATION & FORENSICS',
      items: [
        { name: 'SOAR Playbooks', path: '/playbooks', icon: Workflow },
        { name: 'DPI & PCAP Lab', path: '/dpi', icon: Binary },
        { name: 'Threat Intel Feed', path: '/threat-intel', icon: Radio, badge: 'NEW' },
        { name: 'Compliance Sandbox', path: '/compliance', icon: Award },
      ]
    },
    {
      group: 'INTELLIGENCE & AI',
      items: [
        { name: 'Attack DNA', path: '/dna', icon: Fingerprint },
        { name: 'Hybrid ML Models', path: '/models', icon: Cpu },
        { name: 'AI SOC Tutor', path: '/tutor', icon: Bot },
      ]
    }
  ];

  return (
    <aside style={{
      width: '260px',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      background: '#0D1530',
      borderRight: '1px solid rgba(255,255,255,0.06)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 100,
      userSelect: 'none'
    }}>
      {/* Brand Header */}
      <div style={{
        padding: '20px 18px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #2196F3 0%, #00BCD4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(33,150,243,0.35)'
          }}>
            <Shield size={22} color="#FFFFFF" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '15px', letterSpacing: '0.02em', color: '#F8FAFC', display: 'flex', alignItems: 'center', gap: '6px' }}>
              AEGIS <span style={{ fontSize: '10px', color: '#38BDF8', background: 'rgba(56,189,248,0.12)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(56,189,248,0.3)' }}>SOC</span>
            </div>
            <div style={{ fontSize: '10.5px', color: '#64748B', letterSpacing: '0.04em' }}>
              NETWORK DEFENSE
            </div>
          </div>
        </div>

        <button 
          onClick={() => navigate('/landing')}
          title="View Landing Page"
          style={{
            background: 'transparent',
            border: 'none',
            color: '#64748B',
            cursor: 'pointer',
            padding: '6px',
            borderRadius: '6px',
            transition: 'color 0.2s',
            display: 'flex',
            alignItems: 'center'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#38BDF8'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#64748B'}
        >
          <ExternalLink size={15} />
        </button>
      </div>

      {/* Navigation Groups */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {navGroups.map((grp) => (
          <div key={grp.group}>
            <div style={{
              fontSize: '9.5px',
              fontWeight: 700,
              color: '#475569',
              letterSpacing: '0.08em',
              padding: '0 8px 6px',
              fontFamily: 'JetBrains Mono, monospace'
            }}>
              {grp.group}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {grp.items.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontSize: '13px',
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? '#F8FAFC' : '#94A3B8',
                      background: isActive ? 'linear-gradient(90deg, rgba(33,150,243,0.18) 0%, rgba(33,150,243,0.05) 100%)' : 'transparent',
                      borderLeft: isActive ? '3px solid #2196F3' : '3px solid transparent',
                      transition: 'all 0.18s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                        e.currentTarget.style.color = '#F8FAFC';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#94A3B8';
                      }
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Icon size={17} color={isActive ? '#38BDF8' : '#64748B'} />
                      <span>{item.name}</span>
                    </div>

                    {item.badge && (
                      <span style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        padding: '1px 6px',
                        borderRadius: '10px',
                        background: item.badge === 'LIVE' ? 'rgba(229,57,53,0.2)' : item.badge === 'NEW' ? 'rgba(0,188,212,0.2)' : 'rgba(255,152,0,0.2)',
                        color: item.badge === 'LIVE' ? '#EF5350' : item.badge === 'NEW' ? '#00E5FF' : '#FFB74D',
                        fontFamily: 'JetBrains Mono, monospace'
                      }}>
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Analyst Status & Logout Footer */}
      <div style={{
        padding: '14px 16px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        background: '#0A1128',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#1E293B',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <UserCheck size={16} color="#38BDF8" />
              </div>
              <span style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#4CAF50',
                border: '1.5px solid #0A1128'
              }} />
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#F8FAFC' }}>
                {localStorage.getItem('user') || 'SecOps Admin'}
              </div>
              <div style={{ fontSize: '10px', color: '#64748B', fontFamily: 'JetBrains Mono, monospace' }}>
                SOC L3 • ACTIVE
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            title="Terminate Session"
            style={{
              background: 'transparent',
              border: '1px solid rgba(229,57,53,0.3)',
              color: '#EF5350',
              padding: '6px 8px',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#E53935';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#EF5350';
            }}
          >
            <LogOut size={13} />
          </button>
        </div>
      </div>
    </aside>
  );
}
