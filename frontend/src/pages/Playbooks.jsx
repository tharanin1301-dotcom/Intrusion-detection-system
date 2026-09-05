import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Workflow, 
  Play, 
  CheckCircle2, 
  AlertOctagon, 
  Send, 
  ShieldAlert, 
  Terminal, 
  Sliders, 
  Zap, 
  ToggleLeft, 
  ToggleRight, 
  ArrowRight, 
  Plus, 
  Clock, 
  ExternalLink,
  Lock
} from 'lucide-react';

export default function Playbooks() {
  const [executing, setExecuting] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const [playbooks, setPlaybooks] = useState([
    {
      id: 'PBK-01',
      name: 'Autonomous SYN Flood Mitigation',
      trigger: 'RF+LSTM Confidence > 85% & Type == Neptune',
      actions: ['Rate-limit iptables SYN queue', 'Quarantine edge port', 'Notify #soc-tier1 via Slack'],
      successRate: '99.4%',
      executions: 1420,
      active: true,
      lastRun: '4 mins ago'
    },
    {
      id: 'PBK-02',
      name: 'PortSweep Reconnaissance Quarantine',
      trigger: 'Distinct destination ports probed > 50 / sec',
      actions: ['Drop incoming CIDR on edge router', 'Trigger DPI PCAP recorder (15s buffer)', 'Open Jira P1 ticket'],
      successRate: '98.8%',
      executions: 489,
      active: true,
      lastRun: '18 mins ago'
    },
    {
      id: 'PBK-03',
      name: 'Privilege Escalation Zero-Trust Lockdown',
      trigger: 'U2R payload match or root binary hash alteration',
      actions: ['Freeze target container namespace', 'Revoke IAM session token', 'Page On-Call SecOps L3'],
      successRate: '100%',
      executions: 62,
      active: true,
      lastRun: '2 days ago'
    },
    {
      id: 'PBK-04',
      name: 'Cryptomining Outbound Egress Sever',
      trigger: 'Stratum protocol detected on non-standard ports',
      actions: ['Sever TCP socket connections', 'Apply egress deny-all firewall rule'],
      successRate: '97.6%',
      executions: 215,
      active: false,
      lastRun: '5 days ago'
    }
  ]);

  const togglePlaybook = (id) => {
    setPlaybooks(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));
  };

  const runSimulation = () => {
    setExecuting(true);
    setActiveStep(1);

    setTimeout(() => {
      setActiveStep(2);
      setTimeout(() => {
        setActiveStep(3);
        setTimeout(() => {
          setActiveStep(4);
          setTimeout(() => {
            setExecuting(false);
          }, 1200);
        }, 1000);
      }, 1000);
    }, 1000);
  };

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
            <Workflow size={22} color="#FF9800" />
            SOAR AUTOMATED PLAYBOOKS & INCIDENT ORCHESTRATION
          </h1>
          <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '3px' }}>
            Visual drag-and-drop response workflows for autonomous zero-touch threat neutralization
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={runSimulation}
            disabled={executing}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              background: executing ? '#475569' : '#2196F3',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 700,
              cursor: executing ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 14px rgba(33,150,243,0.35)'
            }}
          >
            <Play size={14} />
            {executing ? 'EXECUTING PIPELINE...' : 'TEST RUN WORKFLOW'}
          </button>
        </div>
      </div>

      {/* Visual Workflow Canvas Builder (Notion/Miro Style) */}
      <div style={{
        background: '#1E293B',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <div style={{ fontSize: '11px', color: '#38BDF8', fontWeight: 700, fontFamily: 'JetBrains Mono' }}>
              ACTIVE VISUAL CANVAS
            </div>
            <h2 style={{ fontSize: '16px', fontWeight: 700, margin: '2px 0 0' }}>
              Playbook PBK-01: Zero-Day SYN Flood Isolation Pipeline
            </h2>
          </div>
          <span style={{ fontSize: '11px', background: 'rgba(76,175,80,0.15)', color: '#4CAF50', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
            ● STATE: ENFORCING
          </span>
        </div>

        {/* Workflow Connected Blocks */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          overflowX: 'auto',
          padding: '20px 10px',
          background: 'radial-gradient(ellipse at center, #141E33 0%, #0A1128 100%)',
          borderRadius: '10px',
          border: '1px solid rgba(255,255,255,0.04)'
        }}>
          {/* Block 1: Trigger */}
          <div style={{
            flex: 1,
            minWidth: '200px',
            background: activeStep === 1 ? 'linear-gradient(135deg, #1E293B 0%, #2A3E5C 100%)' : '#1E293B',
            border: `2px solid ${activeStep === 1 ? '#38BDF8' : '#2196F3'}`,
            borderRadius: '10px',
            padding: '16px',
            boxShadow: activeStep === 1 ? '0 0 20px rgba(56,189,248,0.5)' : 'none',
            transition: 'all 0.3s'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '10px', background: 'rgba(33,150,243,0.15)', color: '#38BDF8', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                STEP 1: TRIGGER
              </span>
              <ShieldAlert size={16} color="#2196F3" />
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#F8FAFC' }}>
              Critical Alert Received
            </div>
            <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '6px', fontFamily: 'JetBrains Mono' }}>
              Hybrid Consensus &gt; 85% &amp; Flow == SYN_FLOOD
            </div>
          </div>

          <div style={{ color: activeStep >= 1 ? '#38BDF8' : '#475569', transition: 'color 0.3s' }}>
            <ArrowRight size={22} />
          </div>

          {/* Block 2: Firewall Action */}
          <div style={{
            flex: 1,
            minWidth: '200px',
            background: activeStep === 2 ? 'linear-gradient(135deg, #1E293B 0%, #3D2222 100%)' : '#1E293B',
            border: `2px solid ${activeStep === 2 ? '#EF5350' : '#E53935'}`,
            borderRadius: '10px',
            padding: '16px',
            boxShadow: activeStep === 2 ? '0 0 20px rgba(229,57,53,0.5)' : 'none',
            transition: 'all 0.3s'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '10px', background: 'rgba(229,57,53,0.15)', color: '#EF5350', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                STEP 2: ENFORCE
              </span>
              <AlertOctagon size={16} color="#E53935" />
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#F8FAFC' }}>
              Isolate Source Subnet
            </div>
            <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '6px', fontFamily: 'JetBrains Mono' }}>
              iptables -I INPUT -s &lt;src_ip&gt; -j DROP
            </div>
          </div>

          <div style={{ color: activeStep >= 2 ? '#38BDF8' : '#475569', transition: 'color 0.3s' }}>
            <ArrowRight size={22} />
          </div>

          {/* Block 3: Forensics Dump */}
          <div style={{
            flex: 1,
            minWidth: '200px',
            background: activeStep === 3 ? 'linear-gradient(135deg, #1E293B 0%, #3B2F1F 100%)' : '#1E293B',
            border: `2px solid ${activeStep === 3 ? '#FFB74D' : '#FF9800'}`,
            borderRadius: '10px',
            padding: '16px',
            boxShadow: activeStep === 3 ? '0 0 20px rgba(255,152,0,0.5)' : 'none',
            transition: 'all 0.3s'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '10px', background: 'rgba(255,152,0,0.15)', color: '#FFB74D', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                STEP 3: FORENSICS
              </span>
              <Terminal size={16} color="#FF9800" />
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#F8FAFC' }}>
              Capture PCAP Buffer
            </div>
            <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '6px', fontFamily: 'JetBrains Mono' }}>
              tcpdump -c 500 -w /tmp/forensic.pcap
            </div>
          </div>

          <div style={{ color: activeStep >= 3 ? '#38BDF8' : '#475569', transition: 'color 0.3s' }}>
            <ArrowRight size={22} />
          </div>

          {/* Block 4: Escalation */}
          <div style={{
            flex: 1,
            minWidth: '200px',
            background: activeStep === 4 ? 'linear-gradient(135deg, #1E293B 0%, #1A3E26 100%)' : '#1E293B',
            border: `2px solid ${activeStep === 4 ? '#81C784' : '#4CAF50'}`,
            borderRadius: '10px',
            padding: '16px',
            boxShadow: activeStep === 4 ? '0 0 20px rgba(76,175,80,0.5)' : 'none',
            transition: 'all 0.3s'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '10px', background: 'rgba(76,175,80,0.15)', color: '#81C784', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                STEP 4: NOTIFY
              </span>
              <Send size={16} color="#4CAF50" />
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#F8FAFC' }}>
              Dispatch Webhook Alert
            </div>
            <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '6px', fontFamily: 'JetBrains Mono' }}>
              Slack #soc-ops &amp; PagerDuty Incident
            </div>
          </div>
        </div>
      </div>

      {/* Playbook Status Grid Table */}
      <div style={{
        background: '#1E293B',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>
            ENTERPRISE PLAYBOOK REGISTRY & TELEMETRY
          </h2>
          <span style={{ fontSize: '11px', color: '#64748B', fontFamily: 'JetBrains Mono' }}>
            TOTAL RUNS: 2,186 • MEAN TIME TO REMEDIATE (MTTR): 840ms
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: '#141E33', color: '#64748B', textAlign: 'left', fontFamily: 'JetBrains Mono' }}>
                <th style={{ padding: '10px 14px' }}>ID</th>
                <th style={{ padding: '10px 14px' }}>PLAYBOOK NAME</th>
                <th style={{ padding: '10px 14px' }}>TRIGGER CONDITION</th>
                <th style={{ padding: '10px 14px' }}>SUCCESS RATE</th>
                <th style={{ padding: '10px 14px' }}>EXECUTIONS</th>
                <th style={{ padding: '10px 14px' }}>LAST TRIGGERED</th>
                <th style={{ padding: '10px 14px', textAlign: 'center' }}>STATUS TOGGLE</th>
              </tr>
            </thead>
            <tbody>
              {playbooks.map(pb => (
                <tr key={pb.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.15s' }}>
                  <td style={{ padding: '12px 14px', color: '#38BDF8', fontFamily: 'JetBrains Mono', fontWeight: 700 }}>
                    {pb.id}
                  </td>
                  <td style={{ padding: '12px 14px', color: '#F8FAFC', fontWeight: 600 }}>
                    {pb.name}
                  </td>
                  <td style={{ padding: '12px 14px', color: '#94A3B8', fontFamily: 'JetBrains Mono', fontSize: '11px' }}>
                    {pb.trigger}
                  </td>
                  <td style={{ padding: '12px 14px', color: '#4CAF50', fontWeight: 700, fontFamily: 'JetBrains Mono' }}>
                    {pb.successRate}
                  </td>
                  <td style={{ padding: '12px 14px', color: '#CBD5E1', fontFamily: 'JetBrains Mono' }}>
                    {pb.executions.toLocaleString()}
                  </td>
                  <td style={{ padding: '12px 14px', color: '#64748B', fontSize: '11px' }}>
                    {pb.lastRun}
                  </td>
                  <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                    <button
                      onClick={() => togglePlaybook(pb.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: pb.active ? '#4CAF50' : '#64748B',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '11.5px',
                        fontWeight: 600
                      }}
                    >
                      {pb.active ? <ToggleRight size={22} color="#4CAF50" /> : <ToggleLeft size={22} color="#64748B" />}
                      <span>{pb.active ? 'ACTIVE' : 'DISABLED'}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
