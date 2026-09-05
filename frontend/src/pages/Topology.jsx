import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Network, 
  Server, 
  Database, 
  Cloud, 
  ShieldCheck, 
  ShieldAlert, 
  Cpu, 
  Radio, 
  Layers, 
  Search, 
  RefreshCw, 
  X, 
  AlertTriangle, 
  Lock, 
  Activity, 
  CheckCircle2, 
  HardDrive
} from 'lucide-react';

export default function Topology() {
  const [selectedSubnet, setSelectedSubnet] = useState('ALL'); // 'ALL' | 'DMZ' | 'CORE' | 'IOT' | 'STORAGE'
  const [selectedNode, setSelectedNode] = useState(null);
  const [filterQuery, setFilterQuery] = useState('');

  const nodes = [
    {
      id: 'node-gw-01',
      name: 'Palo Alto Edge Firewall',
      subnet: 'DMZ',
      type: 'Gateway',
      ip: '10.0.1.1',
      mac: '00:1A:2B:3C:4D:5E',
      os: 'PAN-OS 11.0 Hardened Linux',
      status: 'HEALTHY',
      health: 99,
      load: '14%',
      cves: [],
      x: 15,
      y: 45
    },
    {
      id: 'node-k8s-master',
      name: 'Kubernetes Control Plane',
      subnet: 'CORE',
      type: 'Kubernetes',
      ip: '10.0.2.10',
      mac: '52:54:00:12:34:56',
      os: 'Ubuntu 24.04 LTS (Kernel 6.8)',
      status: 'COMPROMISED',
      health: 64,
      load: '88%',
      cves: [
        { id: 'CVE-2024-21626', severity: 'CRITICAL', title: 'runc container breakout via fd leakage' },
        { id: 'CVE-2023-5044', severity: 'HIGH', title: 'Ingress-nginx arbitrary code injection' }
      ],
      x: 42,
      y: 28
    },
    {
      id: 'node-k8s-worker-01',
      name: 'K8s Worker Node East',
      subnet: 'CORE',
      type: 'Compute',
      ip: '10.0.2.15',
      mac: '52:54:00:98:76:54',
      os: 'Ubuntu 24.04 LTS',
      status: 'HEALTHY',
      health: 96,
      load: '42%',
      cves: [],
      x: 42,
      y: 62
    },
    {
      id: 'node-db-primary',
      name: 'Postgres Aurora Cluster',
      subnet: 'STORAGE',
      type: 'Database',
      ip: '10.0.3.5',
      mac: '06:3A:4C:55:66:77',
      os: 'AWS Aurora Hardened Engine',
      status: 'HEALTHY',
      health: 100,
      load: '22%',
      cves: [],
      x: 75,
      y: 25
    },
    {
      id: 'node-s3-vault',
      name: 'Encrypted S3 Data Lake',
      subnet: 'STORAGE',
      type: 'Storage',
      ip: '10.0.3.88',
      mac: '06:3A:4C:88:99:AA',
      os: 'AWS Object Store KMS-SSE',
      status: 'HEALTHY',
      health: 100,
      load: '5%',
      cves: [],
      x: 75,
      y: 65
    },
    {
      id: 'node-iot-gateway',
      name: 'Factory Floor SCADA RTU',
      subnet: 'IOT',
      type: 'IoT Edge',
      ip: '192.168.10.2',
      mac: 'B8:27:EB:11:22:33',
      os: 'Embedded FreeRTOS v10.4',
      status: 'WARNING',
      health: 78,
      load: '65%',
      cves: [
        { id: 'CVE-2024-3094', severity: 'CRITICAL', title: 'Backdoored upstream XZ utility probe detected' }
      ],
      x: 18,
      y: 80
    }
  ];

  const filteredNodes = nodes.filter(n => {
    const matchesSubnet = selectedSubnet === 'ALL' || n.subnet === selectedSubnet;
    const matchesQuery = n.name.toLowerCase().includes(filterQuery.toLowerCase()) || n.ip.includes(filterQuery);
    return matchesSubnet && matchesQuery;
  });

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      color: '#F8FAFC',
      paddingBottom: '30px'
    }}>
      {/* Header Controls */}
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
            <Network size={22} color="#38BDF8" />
            ENTERPRISE NETWORK TOPOLOGY & ASSET INVENTORY
          </h1>
          <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '3px' }}>
            Interactive node graph with Z-Axis subnet drill-down, live directional vectors, and quarantine triggers
          </div>
        </div>

        {/* Subnet Depth Selectors */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, fontFamily: 'JetBrains Mono' }}>
            DEPTH:
          </span>
          {['ALL', 'DMZ', 'CORE', 'STORAGE', 'IOT'].map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubnet(sub)}
              style={{
                background: selectedSubnet === sub ? '#2196F3' : '#141E33',
                border: '1px solid rgba(255,255,255,0.08)',
                color: selectedSubnet === sub ? '#FFF' : '#94A3B8',
                padding: '5px 12px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Main Canvas & Slide-out Right Drawer Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: selectedNode ? '1fr 360px' : '1fr',
        gap: '20px',
        transition: 'all 0.3s ease'
      }}>
        {/* Visual Graph Canvas */}
        <div style={{
          background: '#1E293B',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '12px',
          padding: '20px',
          minHeight: '620px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 4px 24px rgba(0,0,0,0.2)'
        }}>
          {/* Subnet Labels Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            paddingBottom: '12px',
            fontSize: '11px',
            color: '#64748B',
            fontFamily: 'JetBrains Mono'
          }}>
            <span>ZONE 1: PERIMETER / DMZ</span>
            <span>ZONE 2: APPLICATION RUNTIMES</span>
            <span>ZONE 3: DATA & STORAGE VAULT</span>
          </div>

          {/* SVG Canvas for Traffic Vector Animation */}
          <div style={{
            flex: 1,
            position: 'relative',
            marginTop: '16px',
            borderRadius: '8px',
            background: 'radial-gradient(ellipse at center, #141E33 0%, #0A1128 100%)',
            border: '1px solid rgba(255,255,255,0.04)',
            overflow: 'hidden'
          }}>
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
              {/* Benign Traffic Vector (Blue, thin) */}
              <line x1="15%" y1="45%" x2="42%" y2="62%" stroke="#2196F3" strokeWidth="2" strokeOpacity="0.6" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" values="0;16" dur="1.2s" repeatCount="indefinite" />
              </line>
              <line x1="42%" y1="62%" x2="75%" y2="25%" stroke="#4CAF50" strokeWidth="2" strokeOpacity="0.6" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" values="0;16" dur="1s" repeatCount="indefinite" />
              </line>
              <line x1="42%" y1="62%" x2="75%" y2="65%" stroke="#2196F3" strokeWidth="2" strokeOpacity="0.5" />

              {/* Intercepted Vector to Compromised Node (Red, pulsating thick) */}
              <line x1="15%" y1="45%" x2="42%" y2="28%" stroke="#E53935" strokeWidth="3.5" strokeDasharray="6 4">
                <animate attributeName="stroke-dashoffset" values="0;20" dur="0.6s" repeatCount="indefinite" />
              </line>

              {/* IoT Rogue Probe Vector */}
              <line x1="18%" y1="80%" x2="42%" y2="28%" stroke="#FF9800" strokeWidth="2" strokeDasharray="5 3">
                <animate attributeName="stroke-dashoffset" values="0;16" dur="0.9s" repeatCount="indefinite" />
              </line>
            </svg>

            {/* Nodes Rendered */}
            {filteredNodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              const isCompromised = node.status === 'COMPROMISED';
              const isWarning = node.status === 'WARNING';
              const color = isCompromised ? '#E53935' : isWarning ? '#FF9800' : '#4CAF50';

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  style={{
                    position: 'absolute',
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    transform: 'translate(-50%, -50%)',
                    cursor: 'pointer',
                    zIndex: 10,
                    transition: 'transform 0.2s ease'
                  }}
                >
                  {/* Ping Ring if compromised */}
                  {isCompromised && (
                    <div style={{
                      position: 'absolute',
                      width: '64px',
                      height: '64px',
                      top: '-12px',
                      left: '-12px',
                      borderRadius: '50%',
                      background: 'rgba(229,57,53,0.2)',
                      animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite'
                    }} />
                  )}

                  <div style={{
                    width: '180px',
                    background: isSelected ? 'linear-gradient(135deg, #1E293B 0%, #243447 100%)' : '#141E33',
                    border: `1.5px solid ${isSelected ? '#38BDF8' : color}`,
                    borderRadius: '10px',
                    padding: '10px 12px',
                    boxShadow: isSelected ? '0 0 20px rgba(56,189,248,0.4)' : `0 4px 14px rgba(0,0,0,0.4)`,
                    backdropFilter: 'blur(8px)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{
                        fontSize: '9.5px',
                        padding: '1px 5px',
                        borderRadius: '4px',
                        background: `${color}22`,
                        color: color,
                        fontWeight: 700,
                        fontFamily: 'JetBrains Mono'
                      }}>
                        {node.subnet}
                      </span>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: color,
                        boxShadow: `0 0 8px ${color}`
                      }} />
                    </div>

                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#F8FAFC', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {node.name}
                    </div>

                    <div style={{ fontSize: '10.5px', color: '#94A3B8', fontFamily: 'JetBrains Mono', marginTop: '2px' }}>
                      {node.ip}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#64748B', marginTop: '6px' }}>
                      <span>Load: {node.load}</span>
                      <span style={{ color: color, fontWeight: 600 }}>{node.status}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Canvas Bottom Legend */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '14px',
            fontSize: '11px',
            color: '#94A3B8'
          }}>
            <div style={{ display: 'flex', gap: '20px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '12px', height: '2px', background: '#2196F3' }} />
                Normal TLS 1.3 Flow
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '12px', height: '3px', background: '#E53935' }} />
                Intercepted Threat Vector
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '12px', height: '2px', background: '#FF9800' }} />
                Suspicious Reconnaissance
              </span>
            </div>
            <span>Click any node to open forensic asset drawer</span>
          </div>
        </div>

        {/* Slide-out Right Asset Status Panel */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              style={{
                background: '#1E293B',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
              }}
            >
              <div>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '12px' }}>
                  <div>
                    <span style={{ fontSize: '10px', color: '#38BDF8', fontWeight: 700, fontFamily: 'JetBrains Mono' }}>
                      ASSET FORENSICS
                    </span>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#F8FAFC', margin: '2px 0 0' }}>
                      {selectedNode.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedNode(null)}
                    style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Specs List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px', fontSize: '11.5px', fontFamily: 'JetBrains Mono' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', background: '#141E33', padding: '8px 10px', borderRadius: '6px' }}>
                    <span style={{ color: '#64748B' }}>IP Address:</span>
                    <span style={{ color: '#F8FAFC' }}>{selectedNode.ip}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', background: '#141E33', padding: '8px 10px', borderRadius: '6px' }}>
                    <span style={{ color: '#64748B' }}>MAC Address:</span>
                    <span style={{ color: '#F8FAFC' }}>{selectedNode.mac}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', background: '#141E33', padding: '8px 10px', borderRadius: '6px' }}>
                    <span style={{ color: '#64748B' }}>OS Kernel:</span>
                    <span style={{ color: '#F8FAFC' }}>{selectedNode.os}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', background: '#141E33', padding: '8px 10px', borderRadius: '6px' }}>
                    <span style={{ color: '#64748B' }}>Health Integrity:</span>
                    <span style={{ color: selectedNode.health > 80 ? '#4CAF50' : '#E53935', fontWeight: 700 }}>
                      {selectedNode.health}%
                    </span>
                  </div>
                </div>

                {/* Vulnerabilities section */}
                <div style={{ marginTop: '20px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <AlertTriangle size={14} color="#FF9800" />
                    DETECTED CVE VULNERABILITIES ({selectedNode.cves.length})
                  </div>
                  {selectedNode.cves.length === 0 ? (
                    <div style={{ background: 'rgba(76,175,80,0.1)', border: '1px solid rgba(76,175,80,0.2)', padding: '10px', borderRadius: '6px', fontSize: '11px', color: '#4CAF50' }}>
                      ✓ No known vulnerabilities detected in current scan.
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {selectedNode.cves.map(cve => (
                        <div key={cve.id} style={{
                          background: 'rgba(229,57,53,0.12)',
                          border: '1px solid rgba(229,57,53,0.3)',
                          borderRadius: '6px',
                          padding: '8px 10px',
                          fontSize: '11px'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                            <span style={{ color: '#EF5350', fontFamily: 'JetBrains Mono' }}>{cve.id}</span>
                            <span style={{ color: '#EF5350', fontSize: '9.5px' }}>{cve.severity}</span>
                          </div>
                          <div style={{ color: '#CBD5E1', fontSize: '10.5px', marginTop: '2px' }}>
                            {cve.title}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '20px' }}>
                <button
                  onClick={() => alert(`Node ${selectedNode.name} quarantined from VPC router.`)}
                  style={{
                    background: '#E53935',
                    border: 'none',
                    color: '#FFF',
                    padding: '10px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(229,57,53,0.35)'
                  }}
                >
                  Quarantine & Isolate Subnet
                </button>
                <button
                  onClick={() => alert(`Queued automated vulnerability re-scan for ${selectedNode.ip}`)}
                  style={{
                    background: '#141E33',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#F8FAFC',
                    padding: '10px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Trigger Nessus / Trivy Scan
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
