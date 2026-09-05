import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_BASE_URL } from '../config';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Activity, 
  Server, 
  Zap, 
  Download, 
  RefreshCw, 
  AlertOctagon, 
  Terminal, 
  Radio, 
  Filter, 
  Crosshair, 
  Play, 
  Pause,
  ArrowUpRight,
  Wifi
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip as RechartsTooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis
} from 'recharts';
import jsPDF from 'jspdf';

export default function Dashboard() {
  const [streamActive, setStreamActive] = useState(true);
  const [stats, setStats] = useState({
    activeThreats: 4,
    monitoredNodes: 1284,
    trafficVolume: 4.82, // TB
    avgLatency: 1.4, // ms
    totalInspected: 142890,
    attacksDetected: 382
  });

  const [sparklines, setSparklines] = useState([
    { t: '10:00', threats: 1, traffic: 3.8 },
    { t: '11:00', threats: 3, traffic: 4.1 },
    { t: '12:00', threats: 2, traffic: 4.5 },
    { t: '13:00', threats: 6, traffic: 5.2 },
    { t: '14:00', threats: 4, traffic: 4.8 },
  ]);

  const [selectedThreat, setSelectedThreat] = useState(null);
  const [logFilter, setLogFilter] = useState('ALL'); // 'ALL' | 'CRITICAL' | 'NORMAL'

  const [logs, setLogs] = useState([
    {
      id: 'EVT-9041',
      time: '14:35:12',
      srcIp: '45.33.32.156',
      srcPort: 58212,
      dstNode: 'gateway-dmz-01',
      protocol: 'TCP',
      attackType: 'Neptune (SYN Flood)',
      rfConfidence: 94.2,
      lstmConfidence: 96.8,
      severity: 'CRITICAL',
      status: 'ISOLATED'
    },
    {
      id: 'EVT-9040',
      time: '14:34:58',
      srcIp: '185.220.101.5',
      srcPort: 44381,
      dstNode: 'k8s-ingress-prod',
      protocol: 'TCP',
      attackType: 'PortSweep (Recon)',
      rfConfidence: 82.5,
      lstmConfidence: 79.1,
      severity: 'WARNING',
      status: 'THROTTLED'
    },
    {
      id: 'EVT-9039',
      time: '14:34:42',
      srcIp: '192.168.1.104',
      srcPort: 49200,
      dstNode: 'db-replica-east',
      protocol: 'TCP',
      attackType: 'Normal Payload',
      rfConfidence: 8.2,
      lstmConfidence: 4.1,
      severity: 'SAFE',
      status: 'ALLOWED'
    },
    {
      id: 'EVT-9038',
      time: '14:34:20',
      srcIp: '91.240.118.24',
      srcPort: 60114,
      dstNode: 'auth-service-v2',
      protocol: 'UDP',
      attackType: 'Smurf ICMP Storm',
      rfConfidence: 88.7,
      lstmConfidence: 91.2,
      severity: 'CRITICAL',
      status: 'BLOCKED'
    }
  ]);

  // Live Threat Map Nodes
  const threatNodes = [
    { id: 'gw-1', name: 'Edge Gateway US-East', x: 20, y: 35, status: 'CRITICAL', type: 'Gateway', ip: '10.0.1.1', ping: true },
    { id: 'k8s-1', name: 'K8s Cluster Prod', x: 48, y: 25, status: 'WARNING', type: 'Container', ip: '10.0.2.14', ping: false },
    { id: 'db-1', name: 'Encrypted Vault DB', x: 75, y: 40, status: 'SAFE', type: 'Database', ip: '10.0.3.8', ping: false },
    { id: 'iot-1', name: 'IoT Subnet SCADA', x: 30, y: 72, status: 'CRITICAL', type: 'IoT Edge', ip: '192.168.10.4', ping: true },
    { id: 'soc-1', name: 'SOC Bastion Host', x: 62, y: 70, status: 'SAFE', type: 'Bastion', ip: '10.0.0.254', ping: false },
    { id: 'api-1', name: 'Public API Proxy', x: 85, y: 65, status: 'SAFE', type: 'Proxy', ip: '10.0.4.5', ping: false }
  ];

  const attackDistribution = [
    { name: 'DoS / SYN Flood', value: 52, color: '#E53935' },
    { name: 'PortSweep / Probe', value: 24, color: '#FF9800' },
    { name: 'R2L / Password Guess', value: 14, color: '#00BCD4' },
    { name: 'U2R / Privilege Escalation', value: 10, color: '#7C3AED' }
  ];

  // Periodic simulated packet query to backend /predict
  useEffect(() => {
    if (!streamActive) return;

    const interval = setInterval(async () => {
      try {
        const token = localStorage.getItem('token');
        // generate 41 features with occasional anomalous spikes
        const isAnomalous = Math.random() > 0.65;
        const features = Array.from({ length: 41 }, () => 
          isAnomalous ? Math.random() * 2.5 + 0.8 : Math.random() * 0.4
        );

        const res = await fetch(`${API_BASE_URL}/predict`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          },
          body: JSON.stringify({ features })
        });

        if (res.ok) {
          const data = await res.json();
          const isAttack = data.hybrid_decision === 'ATTACK' || data.final_prediction === 1;
          const severity = isAttack ? (data.risk_level.includes('HIGH') ? 'CRITICAL' : 'WARNING') : 'SAFE';

          const newLog = {
            id: `EVT-${Math.floor(1000 + Math.random() * 9000)}`,
            time: new Date().toLocaleTimeString(),
            srcIp: isAttack ? `194.${Math.floor(Math.random()*200)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}` : `10.0.${Math.floor(Math.random()*4)}.${Math.floor(Math.random()*250)}`,
            srcPort: Math.floor(1024 + Math.random() * 60000),
            dstNode: isAttack ? 'gateway-dmz-01' : 'k8s-ingress-prod',
            protocol: isAttack ? (Math.random() > 0.5 ? 'TCP' : 'UDP') : 'TCP',
            attackType: isAttack ? (Math.random() > 0.5 ? 'Neptune SYN Flood' : 'PortSweep Recon') : 'Normal Flow',
            rfConfidence: +(data.rf_confidence || (isAttack ? 88.5 : 12.3)),
            lstmConfidence: +(data.lstm_confidence || (isAttack ? 92.1 : 8.7)),
            severity,
            status: isAttack ? 'ISOLATED' : 'ALLOWED'
          };

          setLogs(prev => [newLog, ...prev.slice(0, 19)]);
          setStats(prev => ({
            ...prev,
            totalInspected: prev.totalInspected + 1,
            attacksDetected: prev.attacksDetected + (isAttack ? 1 : 0),
            activeThreats: isAttack ? Math.min(12, prev.activeThreats + 1) : Math.max(1, prev.activeThreats)
          }));
        }
      } catch {
        // backend offline or fallback
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [streamActive]);

  // Quick packet injection trigger
  const injectSample = async (forcedAttack = false) => {
    try {
      const token = localStorage.getItem('token');
      const features = Array.from({ length: 41 }, () => forcedAttack ? 2.8 : 0.1);
      const res = await fetch(`${API_BASE_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ features })
      });
      const data = await res.json();
      const isAttack = data.final_prediction === 1 || forcedAttack;
      
      const newLog = {
        id: `EVT-MANUAL-${Math.floor(100 + Math.random() * 900)}`,
        time: new Date().toLocaleTimeString(),
        srcIp: forcedAttack ? '45.142.214.88' : '192.168.1.55',
        srcPort: forcedAttack ? 4444 : 443,
        dstNode: 'edge-dmz-router',
        protocol: 'TCP',
        attackType: forcedAttack ? 'Simulated DoS Injection' : 'Verified Health Probe',
        rfConfidence: forcedAttack ? 96.0 : 4.5,
        lstmConfidence: forcedAttack ? 98.2 : 5.1,
        severity: forcedAttack ? 'CRITICAL' : 'SAFE',
        status: forcedAttack ? 'ISOLATED' : 'ALLOWED'
      };
      setLogs(prev => [newLog, ...prev.slice(0, 19)]);
    } catch {
      alert(`Could not reach backend API at ${API_BASE_URL}`);
    }
  };

  // Export Executive PDF Report
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFillColor(10, 17, 40);
    doc.rect(0, 0, 210, 297, 'F');
    
    doc.setTextColor(56, 189, 248);
    doc.setFontSize(20);
    doc.text('AEGIS NETWORK SECURITY - SOC INCIDENT REPORT', 14, 22);

    doc.setTextColor(148, 163, 184);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toISOString()} | Classification: STRICTLY CONFIDENTIAL`, 14, 30);

    doc.setTextColor(248, 250, 252);
    doc.setFontSize(12);
    doc.text(`Active Threats: ${stats.activeThreats} | Monitored Nodes: ${stats.monitoredNodes}`, 14, 42);
    doc.text(`Total Inspected Packets: ${stats.totalInspected} | Attacks Blocked: ${stats.attacksDetected}`, 14, 50);

    doc.setFontSize(10);
    doc.setTextColor(56, 189, 248);
    doc.text('RECENT MITIGATED ATTACK LOGS:', 14, 65);

    let y = 74;
    logs.slice(0, 10).forEach((l, i) => {
      doc.setTextColor(l.severity === 'CRITICAL' ? 229 : 76, l.severity === 'CRITICAL' ? 57 : 175, l.severity === 'CRITICAL' ? 53 : 80);
      doc.text(`[${l.time}] ${l.id} | ${l.srcIp} -> ${l.dstNode} | ${l.attackType} | ${l.severity} (${l.status})`, 14, y);
      y += 8;
    });

    doc.save('Aegis_SOC_Incident_Summary.pdf');
  };

  const filteredLogs = logs.filter(l => {
    if (logFilter === 'CRITICAL') return l.severity === 'CRITICAL';
    if (logFilter === 'NORMAL') return l.severity === 'SAFE';
    return true;
  });

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      paddingBottom: '30px',
      color: '#F8FAFC'
    }}>
      {/* ── Top Header Control Bar ────────────────────────────────────────── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#1E293B',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '12px',
        padding: '14px 20px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.25)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '8px' }}>
              SOC LIVE OPERATIONS
              <span style={{
                fontSize: '11px',
                background: 'rgba(33,150,243,0.15)',
                color: '#38BDF8',
                border: '1px solid rgba(33,150,243,0.3)',
                padding: '2px 8px',
                borderRadius: '6px',
                fontFamily: 'JetBrains Mono, monospace'
              }}>
                HYBRID RF+LSTM V3
              </span>
            </h1>
            <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '2px' }}>
              Dual-layer consensus engine monitoring 41 NSL-KDD network attributes in real time
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setStreamActive(!streamActive)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: streamActive ? 'rgba(76,175,80,0.15)' : 'rgba(255,152,0,0.15)',
              color: streamActive ? '#4CAF50' : '#FF9800',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {streamActive ? <Pause size={14} /> : <Play size={14} />}
            {streamActive ? 'STREAM ACTIVE' : 'STREAM PAUSED'}
          </button>

          <button
            onClick={() => injectSample(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '6px',
              border: 'none',
              background: '#E53935',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 2px 10px rgba(229,57,53,0.35)'
            }}
          >
            <Zap size={14} />
            Simulate Attack
          </button>

          <button
            onClick={() => injectSample(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: '#141E33',
              color: '#F8FAFC',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <ShieldCheck size={14} color="#4CAF50" />
            Inject Safe Flow
          </button>

          <button
            onClick={exportPDF}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '6px',
              border: '1px solid rgba(33,150,243,0.4)',
              background: 'rgba(33,150,243,0.1)',
              color: '#38BDF8',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <Download size={14} />
            CISO Report
          </button>
        </div>
      </div>

      {/* ── Horizontal Hero Stat Counters Row (Requirement 3: Horizontal) ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
        width: '100%'
      }}>
        {/* Stat 1: Active Threats */}
        <div style={{
          background: '#1E293B',
          borderLeft: '4px solid #E53935',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '10px',
          padding: '18px 20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#EF5350', letterSpacing: '0.04em' }}>
              ACTIVE THREATS
            </span>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              background: 'rgba(229,57,53,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldAlert size={16} color="#E53935" />
            </div>
          </div>
          <div style={{ margin: '12px 0 6px' }}>
            <span style={{ fontSize: '32px', fontWeight: 800, color: '#F8FAFC', fontFamily: 'JetBrains Mono' }}>
              {stats.activeThreats}
            </span>
            <span style={{ fontSize: '11px', color: '#EF5350', marginLeft: '8px', fontWeight: 600 }}>
              +2 pending triage
            </span>
          </div>
          <div style={{ fontSize: '11px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ color: '#E53935' }}>● 1 Critical DoS</span> • 3 Probes
          </div>
        </div>

        {/* Stat 2: Monitored Nodes */}
        <div style={{
          background: '#1E293B',
          borderLeft: '4px solid #4CAF50',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '10px',
          padding: '18px 20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#4CAF50', letterSpacing: '0.04em' }}>
              MONITORED NODES
            </span>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              background: 'rgba(76,175,80,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Server size={16} color="#4CAF50" />
            </div>
          </div>
          <div style={{ margin: '12px 0 6px' }}>
            <span style={{ fontSize: '32px', fontWeight: 800, color: '#F8FAFC', fontFamily: 'JetBrains Mono' }}>
              {stats.monitoredNodes}
            </span>
            <span style={{ fontSize: '11px', color: '#4CAF50', marginLeft: '8px', fontWeight: 600 }}>
              99.98% Healthy
            </span>
          </div>
          <div style={{ fontSize: '11px', color: '#64748B' }}>
            1,280 Online • 4 Isolated Subnets
          </div>
        </div>

        {/* Stat 3: Total Traffic Volume */}
        <div style={{
          background: '#1E293B',
          borderLeft: '4px solid #2196F3',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '10px',
          padding: '18px 20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#38BDF8', letterSpacing: '0.04em' }}>
              TRAFFIC VOLUME (24H)
            </span>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              background: 'rgba(33,150,243,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Activity size={16} color="#2196F3" />
            </div>
          </div>
          <div style={{ margin: '12px 0 6px' }}>
            <span style={{ fontSize: '32px', fontWeight: 800, color: '#F8FAFC', fontFamily: 'JetBrains Mono' }}>
              {stats.trafficVolume} <span style={{ fontSize: '16px', fontWeight: 600, color: '#64748B' }}>TB</span>
            </span>
            <span style={{ fontSize: '11px', color: '#38BDF8', marginLeft: '8px', fontWeight: 600 }}>
              14.2k pkt/s
            </span>
          </div>
          <div style={{ fontSize: '11px', color: '#64748B' }}>
            DPI throughput steady • 0 dropped frames
          </div>
        </div>

        {/* Stat 4: Hybrid ML Latency */}
        <div style={{
          background: '#1E293B',
          borderLeft: '4px solid #00BCD4',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '10px',
          padding: '18px 20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#00E5FF', letterSpacing: '0.04em' }}>
              HYBRID INFERENCE LATENCY
            </span>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              background: 'rgba(0,188,212,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Zap size={16} color="#00BCD4" />
            </div>
          </div>
          <div style={{ margin: '12px 0 6px' }}>
            <span style={{ fontSize: '32px', fontWeight: 800, color: '#F8FAFC', fontFamily: 'JetBrains Mono' }}>
              {stats.avgLatency} <span style={{ fontSize: '16px', fontWeight: 600, color: '#64748B' }}>ms</span>
            </span>
            <span style={{ fontSize: '11px', color: '#4CAF50', marginLeft: '8px', fontWeight: 600 }}>
              Real-Time
            </span>
          </div>
          <div style={{ fontSize: '11px', color: '#64748B' }}>
            RF 100 Trees + PyTorch LSTM hidden(64)
          </div>
        </div>
      </div>

      {/* ── Center Stage: Horizontal Split (Threat Map 65% + Vectors 35%) ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '6.5fr 3.5fr',
        gap: '20px',
        width: '100%'
      }}>
        {/* Left: Interactive Dark-Themed Live Threat Map */}
        <div style={{
          background: '#1E293B',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '12px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#E53935',
                boxShadow: '0 0 10px #E53935'
              }} />
              <h2 style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>
                LIVE THREAT MAP & TOPOLOGICAL VECTOR SURVEILLANCE
              </h2>
            </div>
            <div style={{ display: 'flex', gap: '8px', fontSize: '11px', fontFamily: 'JetBrains Mono' }}>
              <span style={{ color: '#E53935', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#E53935' }} />
                CRITICAL INTERCEPT
              </span>
              <span style={{ color: '#4CAF50', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4CAF50' }} />
                BENIGN BACKBONE
              </span>
            </div>
          </div>

          {/* Map SVG Canvas */}
          <div style={{
            position: 'relative',
            height: '320px',
            background: 'radial-gradient(circle at 50% 50%, #141E33 0%, #0A1128 100%)',
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.04)',
            overflow: 'hidden'
          }}>
            {/* Background Radar Rings */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
              <circle cx="50%" cy="50%" r="60" fill="none" stroke="rgba(33,150,243,0.08)" strokeDasharray="4 4" />
              <circle cx="50%" cy="50%" r="120" fill="none" stroke="rgba(33,150,243,0.06)" strokeDasharray="4 4" />
              <circle cx="50%" cy="50%" r="180" fill="none" stroke="rgba(33,150,243,0.04)" />
              
              {/* Traffic connection lines */}
              <line x1="20%" y1="35%" x2="48%" y2="25%" stroke="#E53935" strokeWidth="2" strokeDasharray="6 3">
                <animate attributeName="stroke-dashoffset" values="0;18" dur="1s" repeatCount="indefinite" />
              </line>
              <line x1="30%" y1="72%" x2="48%" y2="25%" stroke="#E53935" strokeWidth="2" strokeDasharray="6 3">
                <animate attributeName="stroke-dashoffset" values="0;18" dur="0.8s" repeatCount="indefinite" />
              </line>
              <line x1="48%" y1="25%" x2="75%" y2="40%" stroke="#2196F3" strokeWidth="1.5" strokeOpacity="0.4" />
              <line x1="75%" y1="40%" x2="85%" y2="65%" stroke="#4CAF50" strokeWidth="1.5" strokeOpacity="0.4" />
              <line x1="48%" y1="25%" x2="62%" y2="70%" stroke="#2196F3" strokeWidth="1.5" strokeOpacity="0.4" />
            </svg>

            {/* Interactive Nodes */}
            {threatNodes.map((node) => {
              const isCritical = node.status === 'CRITICAL';
              const isWarning = node.status === 'WARNING';
              const color = isCritical ? '#E53935' : isWarning ? '#FF9800' : '#4CAF50';

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedThreat(node)}
                  style={{
                    position: 'absolute',
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    transform: 'translate(-50%, -50%)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    zIndex: 10
                  }}
                >
                  {/* Ping Animation for Critical */}
                  {node.ping && (
                    <span style={{
                      position: 'absolute',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: color,
                      opacity: 0.3,
                      animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite'
                    }} />
                  )}

                  <div style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: '#0A1128',
                    border: `2.5px solid ${color}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 0 12px ${color}99`
                  }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: color }} />
                  </div>

                  <span style={{
                    marginTop: '6px',
                    fontSize: '10px',
                    fontWeight: 600,
                    background: 'rgba(10, 17, 40, 0.85)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    fontFamily: 'JetBrains Mono',
                    color: '#F8FAFC',
                    whiteSpace: 'nowrap'
                  }}>
                    {node.name}
                  </span>
                </div>
              );
            })}

            {/* Node Info Floating Drawer if selected */}
            {selectedThreat && (
              <div style={{
                position: 'absolute',
                bottom: '12px',
                right: '12px',
                background: '#1E293B',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '11px',
                fontFamily: 'JetBrains Mono',
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                zIndex: 20
              }}>
                <div style={{ fontWeight: 700, color: '#38BDF8', marginBottom: '4px' }}>
                  NODE INSPECTION: {selectedThreat.name}
                </div>
                <div style={{ color: '#94A3B8' }}>IP: {selectedThreat.ip} | Type: {selectedThreat.type}</div>
                <div style={{ color: selectedThreat.status === 'CRITICAL' ? '#EF5350' : '#4CAF50', fontWeight: 600, marginTop: '2px' }}>
                  STATUS: {selectedThreat.status}
                </div>
                <div style={{ marginTop: '8px', display: 'flex', gap: '6px' }}>
                  <button
                    onClick={() => { alert(`Isolated node: ${selectedThreat.name}`); setSelectedThreat(null); }}
                    style={{
                      background: '#E53935',
                      border: 'none',
                      color: '#FFF',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '10.5px',
                      fontWeight: 700
                    }}
                  >
                    Quarantine Node
                  </button>
                  <button
                    onClick={() => setSelectedThreat(null)}
                    style={{
                      background: 'transparent',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#94A3B8',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '10.5px'
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Attack Distribution & Consensus Gauge */}
        <div style={{
          background: '#1E293B',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '12px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <h2 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 4px 0' }}>
              ATTACK VECTOR TAXONOMY
            </h2>
            <div style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '14px' }}>
              Classification breakdown across detected intrusion payloads
            </div>

            {/* Donut Chart */}
            <div style={{ height: '170px', position: 'relative' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={attackDistribution}
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {attackDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip contentStyle={{ background: '#0A1128', border: '1px solid #334155', borderRadius: '6px', fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none'
              }}>
                <span style={{ fontSize: '20px', fontWeight: 800, fontFamily: 'JetBrains Mono', color: '#F8FAFC' }}>
                  {stats.attacksDetected}
                </span>
                <span style={{ fontSize: '9.5px', color: '#64748B', fontWeight: 600 }}>ATTACKS BLOCKED</span>
              </div>
            </div>

            {/* Legend list */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '10px' }}>
              {attackDistribution.map(a => (
                <div key={a.name} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#CBD5E1' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: a.color }} />
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Model Consensus Bar */}
          <div style={{
            marginTop: '16px',
            padding: '12px',
            background: '#141E33',
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.04)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '6px' }}>
              <span style={{ color: '#94A3B8' }}>Random Forest Confidence</span>
              <span style={{ color: '#38BDF8', fontFamily: 'JetBrains Mono', fontWeight: 700 }}>94.2%</span>
            </div>
            <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden', marginBottom: '10px' }}>
              <div style={{ width: '94.2%', height: '100%', background: '#2196F3' }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '6px' }}>
              <span style={{ color: '#94A3B8' }}>PyTorch LSTM Confidence</span>
              <span style={{ color: '#00E5FF', fontFamily: 'JetBrains Mono', fontWeight: 700 }}>96.8%</span>
            </div>
            <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: '96.8%', height: '100%', background: '#00BCD4' }} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Split Panel: Real-Time Tabular Logs (Horizontal Wide Table) ── */}
      <div style={{
        background: '#1E293B',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Terminal size={18} color="#38BDF8" />
            <h2 style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>
              REAL-TIME HIGH-DENSITY PACKET LOGS & HEURISTIC AUDIT
            </h2>
            <span style={{
              fontSize: '10.5px',
              fontFamily: 'JetBrains Mono',
              color: '#64748B',
              background: '#141E33',
              padding: '2px 8px',
              borderRadius: '4px'
            }}>
              SHOWING LAST 20 FLOWS
            </span>
          </div>

          {/* Filter Buttons */}
          <div style={{ display: 'flex', gap: '6px' }}>
            {['ALL', 'CRITICAL', 'NORMAL'].map(f => (
              <button
                key={f}
                onClick={() => setLogFilter(f)}
                style={{
                  background: logFilter === f ? '#2196F3' : '#141E33',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: logFilter === f ? '#FFF' : '#94A3B8',
                  padding: '4px 12px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Tabular Dense Log Grid */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '11.5px',
            fontFamily: 'JetBrains Mono, monospace'
          }}>
            <thead>
              <tr style={{
                background: '#141E33',
                color: '#64748B',
                textAlign: 'left',
                borderBottom: '1px solid rgba(255,255,255,0.06)'
              }}>
                <th style={{ padding: '10px 12px' }}>EVENT ID</th>
                <th style={{ padding: '10px 12px' }}>TIMESTAMP</th>
                <th style={{ padding: '10px 12px' }}>SOURCE IP & PORT</th>
                <th style={{ padding: '10px 12px' }}>TARGET NODE</th>
                <th style={{ padding: '10px 12px' }}>PROTOCOL</th>
                <th style={{ padding: '10px 12px' }}>CLASSIFICATION</th>
                <th style={{ padding: '10px 12px' }}>RF CONF</th>
                <th style={{ padding: '10px 12px' }}>LSTM CONF</th>
                <th style={{ padding: '10px 12px' }}>SEVERITY</th>
                <th style={{ padding: '10px 12px' }}>ENFORCEMENT</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => {
                const isCritical = log.severity === 'CRITICAL';
                const isWarning = log.severity === 'WARNING';
                const borderColor = isCritical ? '#E53935' : isWarning ? '#FF9800' : '#4CAF50';
                const rowBg = isCritical ? 'rgba(229,57,53,0.04)' : 'transparent';

                return (
                  <tr
                    key={log.id}
                    style={{
                      background: rowBg,
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                      borderLeft: `3px solid ${borderColor}`,
                      transition: 'background 0.15s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = rowBg}
                  >
                    <td style={{ padding: '10px 12px', color: '#94A3B8' }}>{log.id}</td>
                    <td style={{ padding: '10px 12px', color: '#CBD5E1' }}>{log.time}</td>
                    <td style={{ padding: '10px 12px', color: isCritical ? '#EF5350' : '#38BDF8', fontWeight: 600 }}>
                      {log.srcIp}:{log.srcPort}
                    </td>
                    <td style={{ padding: '10px 12px', color: '#94A3B8' }}>{log.dstNode}</td>
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{
                        background: 'rgba(255,255,255,0.06)',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '10px'
                      }}>
                        {log.protocol}
                      </span>
                    </td>
                    <td style={{ padding: '10px 12px', color: isCritical ? '#EF5350' : '#F8FAFC', fontWeight: 600 }}>
                      {log.attackType}
                    </td>
                    <td style={{ padding: '10px 12px', color: '#94A3B8' }}>{log.rfConfidence}%</td>
                    <td style={{ padding: '10px 12px', color: '#94A3B8' }}>{log.lstmConfidence}%</td>
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{
                        fontSize: '9.5px',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '10px',
                        background: isCritical ? 'rgba(229,57,53,0.2)' : isWarning ? 'rgba(255,152,0,0.2)' : 'rgba(76,175,80,0.2)',
                        color: borderColor
                      }}>
                        {log.severity}
                      </span>
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{
                        fontSize: '10px',
                        color: log.status === 'ISOLATED' ? '#EF5350' : log.status === 'BLOCKED' ? '#FFB74D' : '#4CAF50',
                        fontWeight: 600
                      }}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
