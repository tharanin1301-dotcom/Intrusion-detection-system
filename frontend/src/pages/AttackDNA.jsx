import { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Fingerprint, ShieldAlert, Crosshair, AlertTriangle, Cpu } from 'lucide-react';

export default function AttackDNA() {
  const [selectedVector, setSelectedVector] = useState('neptune');

  const attackProfiles = {
    neptune: {
      name: 'Neptune (SYN Flood DoS)',
      type: 'Denial of Service',
      severity: 'CRITICAL',
      color: '#E53935',
      radar: [
        { subject: 'Traffic Volume', A: 95 },
        { subject: 'SYN Error Rate', A: 98 },
        { subject: 'Port Dispersion', A: 25 },
        { subject: 'Payload Size', A: 15 },
        { subject: 'Connection Duration', A: 10 },
        { subject: 'Root Privileges', A: 5 }
      ],
      desc: 'Floods TCP SYN queue without completing 3-way handshakes, exhausting socket buffers on the target gateway.',
      mitre: 'T1498.001',
      heuristic: 'High count, srv_serror_rate > 0.90, dst_host_count == 255'
    },
    portsweep: {
      name: 'PortSweep (Reconnaissance Probe)',
      type: 'Surveillance / Scanner',
      severity: 'WARNING',
      color: '#FF9800',
      radar: [
        { subject: 'Traffic Volume', A: 45 },
        { subject: 'SYN Error Rate', A: 60 },
        { subject: 'Port Dispersion', A: 96 },
        { subject: 'Payload Size', A: 10 },
        { subject: 'Connection Duration', A: 12 },
        { subject: 'Root Privileges', A: 5 }
      ],
      desc: 'Systematically sweeps a single target across sequential ports to discover unpatched listening daemons.',
      mitre: 'T1046',
      heuristic: 'diff_srv_rate > 0.85, dst_host_diff_srv_rate > 0.70'
    },
    buffer_overflow: {
      name: 'Buffer Overflow (User to Root)',
      type: 'Privilege Escalation',
      severity: 'CRITICAL',
      color: '#7C3AED',
      radar: [
        { subject: 'Traffic Volume', A: 20 },
        { subject: 'SYN Error Rate', A: 10 },
        { subject: 'Port Dispersion', A: 15 },
        { subject: 'Payload Size', A: 92 },
        { subject: 'Connection Duration', A: 85 },
        { subject: 'Root Privileges', A: 98 }
      ],
      desc: 'Injects arbitrary shellcode past stack boundaries into root executable processes to hijack execution pointers.',
      mitre: 'T1203',
      heuristic: 'num_compromised > 0, root_shell == 1, hot > 2'
    }
  };

  const active = attackProfiles[selectedVector];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      color: '#F8FAFC',
      paddingBottom: '30px'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#1E293B',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '12px',
        padding: '16px 20px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
      }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Fingerprint size={22} color="#00E5FF" />
            ATTACK DNA FINGERPRINT &amp; RADAR HEURISTICS
          </h1>
          <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '3px' }}>
            Multi-dimensional geometric radar signatures comparing 6 key NSL-KDD attack behavioral axes
          </div>
        </div>

        {/* Vector Toggle Buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {Object.entries(attackProfiles).map(([k, v]) => (
            <button
              key={k}
              onClick={() => setSelectedVector(k)}
              style={{
                background: selectedVector === k ? v.color : '#141E33',
                border: '1px solid rgba(255,255,255,0.08)',
                color: selectedVector === k ? '#FFFFFF' : '#94A3B8',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'JetBrains Mono'
              }}
            >
              {v.type}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Radar Chart + Dimensional Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>
        {/* Radar Chart */}
        <div style={{
          background: '#1E293B',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '12px',
          padding: '24px',
          height: '460px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>
              {active.name} — Geometric Signature
            </h3>
            <span style={{
              fontSize: '10.5px',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '6px',
              background: `${active.color}22`,
              color: active.color,
              fontFamily: 'JetBrains Mono'
            }}>
              MITRE: {active.mitre}
            </span>
          </div>

          <div style={{ flex: 1, position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={active.radar}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94A3B8', fontSize: 11, fontFamily: 'JetBrains Mono' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#64748B', fontSize: 10 }} />
                <Radar name={active.name} dataKey="A" stroke={active.color} fill={active.color} fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Behavioral Breakdown & Heuristics */}
        <div style={{
          background: '#1E293B',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '12px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
        }}>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 16px', color: '#F8FAFC' }}>
              Signature Forensics &amp; Mitigation Strategy
            </h3>

            <div style={{
              background: '#141E33',
              borderLeft: `4px solid ${active.color}`,
              padding: '14px',
              borderRadius: '6px',
              marginBottom: '16px'
            }}>
              <div style={{ fontSize: '11px', color: '#64748B', fontFamily: 'JetBrains Mono', fontWeight: 700 }}>
                VECTOR ANATOMY
              </div>
              <div style={{ fontSize: '13px', color: '#CBD5E1', marginTop: '4px', lineHeight: 1.5 }}>
                {active.desc}
              </div>
            </div>

            <div style={{
              background: '#141E33',
              border: '1px solid rgba(255,255,255,0.04)',
              padding: '14px',
              borderRadius: '6px',
              marginBottom: '16px'
            }}>
              <div style={{ fontSize: '11px', color: '#38BDF8', fontFamily: 'JetBrains Mono', fontWeight: 700 }}>
                NSL-KDD NEURAL CORRELATION RULE
              </div>
              <div style={{ fontSize: '12px', color: '#F8FAFC', marginTop: '4px', fontFamily: 'JetBrains Mono' }}>
                {active.heuristic}
              </div>
            </div>
          </div>

          <div style={{
            background: 'rgba(33,150,243,0.08)',
            border: '1px solid rgba(33,150,243,0.2)',
            padding: '12px',
            borderRadius: '6px',
            fontSize: '11.5px',
            color: '#38BDF8'
          }}>
            ⚡ <strong>Aegis Autonomous Defense:</strong> When confidence matches this DNA pattern, SOAR Playbook PBK-01 triggers immediate subnet isolation.
          </div>
        </div>
      </div>
    </div>
  );
}
