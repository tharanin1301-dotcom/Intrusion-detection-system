import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Cpu, 
  Activity, 
  ChevronRight, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Globe2, 
  Terminal, 
  Sliders, 
  Layers, 
  FileText, 
  Radio, 
  Server,
  Play
} from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('annual'); // 'monthly' | 'annual'

  const enterpriseClients = [
    { name: 'PALO ALTO SEC', icon: Shield },
    { name: 'CLOUDFLARE INC', icon: Globe2 },
    { name: 'CROWDSTRIKE', icon: Radio },
    { name: 'DATADOG HQ', icon: Activity },
    { name: 'SENTINEL ONE', icon: Lock },
    { name: 'SNOWFLAKE DEF', icon: Server }
  ];

  const bentoFeatures = [
    {
      title: 'Hybrid AI Threat Engine',
      subtitle: 'RF (100 Estimators) + PyTorch LSTM',
      badge: '99.4% Precision',
      desc: 'Dual-layer neural architecture cross-validates 41 network flow dimensions in under 1.8ms to eliminate zero-day alert fatigue.',
      icon: Cpu,
      color: '#2196F3',
      visual: (
        <div style={{
          marginTop: '16px',
          background: 'rgba(10, 17, 40, 0.7)',
          padding: '12px',
          borderRadius: '8px',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '11px',
          border: '1px solid rgba(33, 150, 243, 0.2)'
        }}>
          <div style={{ color: '#38BDF8' }}>$ aegis-ml --stream /dev/eth0</div>
          <div style={{ color: '#4CAF50' }}>✓ RF: attack_score=0.942 [SYN_FLOOD]</div>
          <div style={{ color: '#4CAF50' }}>✓ LSTM: hidden_state=0.918 [ANOMALOUS]</div>
          <div style={{ color: '#E53935', fontWeight: 'bold' }}>⚡ HYBRID CONSENSUS: MITIGATE (1.4ms)</div>
        </div>
      )
    },
    {
      title: 'Zero-Trust Node Topology',
      subtitle: 'Dynamic Perimeter & Micro-segmentation',
      badge: 'Z-Axis Depth',
      desc: 'Visualize every asset across multi-cloud VPCs, edge nodes, and IoT clusters with real-time vector flows and quarantine triggers.',
      icon: Layers,
      color: '#00BCD4',
      visual: (
        <div style={{
          marginTop: '16px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
          textAlign: 'center'
        }}>
          <div style={{ background: 'rgba(30, 41, 59, 0.8)', padding: '10px 6px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#4CAF50' }}>1,284</div>
            <div style={{ fontSize: '10px', color: '#94A3B8' }}>Enforced Nodes</div>
          </div>
          <div style={{ background: 'rgba(30, 41, 59, 0.8)', padding: '10px 6px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#FF9800' }}>0</div>
            <div style={{ fontSize: '10px', color: '#94A3B8' }}>Lateral Breaches</div>
          </div>
          <div style={{ background: 'rgba(30, 41, 59, 0.8)', padding: '10px 6px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#38BDF8' }}>100%</div>
            <div style={{ fontSize: '10px', color: '#94A3B8' }}>TLS 1.3 Audit</div>
          </div>
        </div>
      )
    },
    {
      title: 'Automated SOAR Playbooks',
      subtitle: 'Sub-second Incident Orchestration',
      badge: 'Self-Healing',
      desc: 'Build conditional drag-and-drop mitigation sequences. Instantly sever compromised subnets, push iptables rules, and alert SOC tiers.',
      icon: Zap,
      color: '#FF9800',
      visual: (
        <div style={{
          marginTop: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(10, 17, 40, 0.7)',
          padding: '10px',
          borderRadius: '8px',
          fontSize: '11px',
          fontFamily: 'JetBrains Mono, monospace'
        }}>
          <span style={{ color: '#E53935' }}>[ALERT &gt; 90%]</span>
          <span style={{ color: '#94A3B8' }}>→</span>
          <span style={{ color: '#FF9800' }}>[ISOLATE IP]</span>
          <span style={{ color: '#94A3B8' }}>→</span>
          <span style={{ color: '#4CAF50' }}>[SLACK/PAGER]</span>
        </div>
      )
    }
  ];

  const pricingTiers = [
    {
      name: 'Standard SOC',
      tagline: 'Ideal for growing teams needing core hybrid IDS and automated logging.',
      price: billingCycle === 'annual' ? '$1,490' : '$1,850',
      period: '/month billed annually',
      compliance: ['SOC 2 Type II', 'GDPR Ready'],
      features: [
        'Up to 500 Monitored Network Nodes',
        'Hybrid RF + LSTM Detection Engine',
        'Real-time Threat Map & Visualizer',
        'DPI & PCAP Hex Inspector (7-day buffer)',
        'Email & Slack Escalations'
      ],
      popular: false,
      cta: 'Start 14-Day Trial'
    },
    {
      name: 'Enterprise Shield',
      tagline: 'Comprehensive security suite with custom ML retraining and SOAR workflows.',
      price: billingCycle === 'annual' ? '$3,890' : '$4,650',
      period: '/month billed annually',
      compliance: ['SOC 2 Type II', 'ISO 27001', 'HIPAA', 'NIST SP 800-53'],
      features: [
        'Unlimited Monitored Nodes & Subnets',
        'Continuous Model Retraining on Custom PCAP',
        'Full SOAR Playbook Visual Engine',
        'Live Global Threat Intelligence (AlienVault OTX & MITRE)',
        'Dedicated SOC L3 Engineer Escalation',
        'Sub-second Autonomous Node Isolation'
      ],
      popular: true,
      cta: 'Deploy Enterprise'
    },
    {
      name: 'Defense Gov/Airgap',
      tagline: 'Custom air-gapped on-premise deployments with dedicated hardware acceleration.',
      price: 'Custom',
      period: 'tailored SLA & deployment',
      compliance: ['FedRAMP High', 'FIPS 140-3', 'ITAR', 'ISO 27001'],
      features: [
        '100% Air-Gapped Local Model Execution',
        'Bare-Metal FPGA / GPU Acceleration',
        'Custom Classified Threat Feed Connectors',
        'Executive CISO Regulatory Sandbox & PDF Sign-off',
        '24/7 Red-Team Counter-Strike Support'
      ],
      popular: false,
      cta: 'Contact Sales'
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0A1128',
      color: '#F8FAFC',
      fontFamily: 'Inter, system-ui, sans-serif',
      overflowX: 'hidden'
    }}>
      {/* Top Navbar */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(10, 17, 40, 0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 48px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #2196F3 0%, #00BCD4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(33,150,243,0.4)'
          }}>
            <Shield size={22} color="#FFFFFF" />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '16px', letterSpacing: '0.04em', color: '#F8FAFC' }}>
              AEGIS <span style={{ color: '#38BDF8' }}>NETWORK SECURITY</span>
            </div>
            <div style={{ fontSize: '10px', color: '#64748B', letterSpacing: '0.06em' }}>ENTERPRISE INTRUSION DEFENSE</div>
          </div>
        </div>

        {/* Anchor Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px', fontSize: '13.5px', color: '#94A3B8' }}>
          <a href="#features" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>Platform Capabilities</a>
          <a href="#architecture" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>Hybrid ML Core</a>
          <a href="#pricing" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>Enterprise Pricing</a>
          <a href="#compliance" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>Compliance</a>
        </div>

        {/* Action CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button
            onClick={() => navigate('/login')}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#F8FAFC',
              padding: '9px 18px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#2196F3'; e.currentTarget.style.color = '#38BDF8'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = '#F8FAFC'; }}
          >
            Analyst Sign In
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              background: 'linear-gradient(135deg, #2196F3 0%, #00BCD4 100%)',
              border: 'none',
              color: '#FFFFFF',
              padding: '9px 20px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 18px rgba(33,150,243,0.35)',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Launch SOC Console
            <ChevronRight size={16} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        padding: '90px 48px 60px',
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1.1fr 0.9fr',
        gap: '48px',
        alignItems: 'center'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '20px',
            background: 'rgba(33,150,243,0.1)',
            border: '1px solid rgba(33,150,243,0.3)',
            marginBottom: '24px'
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4CAF50', display: 'inline-block' }} />
            <span style={{ fontSize: '11.5px', fontFamily: 'JetBrains Mono, monospace', color: '#38BDF8', fontWeight: 600 }}>
              NSL-KDD TRAINED HYBRID NEURAL DEFENSE v3.4
            </span>
          </div>

          <h1 style={{
            fontSize: '52px',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            marginBottom: '20px',
            color: '#F8FAFC'
          }}>
            Real-Time <br />
            <span style={{
              background: 'linear-gradient(135deg, #38BDF8 0%, #2196F3 50%, #00E5FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Network Immunity.
            </span>
          </h1>

          <p style={{
            fontSize: '17px',
            lineHeight: 1.6,
            color: '#94A3B8',
            marginBottom: '36px',
            maxWidth: '540px'
          }}>
            Aegis combines Random Forest ensemble classification with PyTorch LSTM recurrent neural networks to stop distributed DoS, stealth port probes, and zero-day intrusions before packet payload delivery.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/dashboard')}
              style={{
                background: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
                border: 'none',
                color: '#FFFFFF',
                padding: '14px 28px',
                borderRadius: '8px',
                fontSize: '14.5px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 24px rgba(33,150,243,0.4)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Request Live Demo
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => navigate('/models')}
              style={{
                background: 'rgba(30, 41, 59, 0.6)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#F8FAFC',
                padding: '14px 24px',
                borderRadius: '8px',
                fontSize: '14.5px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#38BDF8'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'}
            >
              <FileText size={16} color="#38BDF8" />
              View Model Specs
            </button>
          </div>

          {/* Quick Metrics */}
          <div style={{
            marginTop: '44px',
            display: 'flex',
            alignItems: 'center',
            gap: '36px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: '24px'
          }}>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#F8FAFC', fontFamily: 'JetBrains Mono, monospace' }}>
                77.31%
              </div>
              <div style={{ fontSize: '11px', color: '#64748B' }}>LSTM Test Accuracy</div>
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#38BDF8', fontFamily: 'JetBrains Mono, monospace' }}>
                1.4 ms
              </div>
              <div style={{ fontSize: '11px', color: '#64748B' }}>Payload Inference Latency</div>
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#4CAF50', fontFamily: 'JetBrains Mono, monospace' }}>
                0.01%
              </div>
              <div style={{ fontSize: '11px', color: '#64748B' }}>False Positive Rate</div>
            </div>
          </div>
        </motion.div>

        {/* Right Glassmorphism 3D Canvas / Packet Filter Terminal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            background: 'linear-gradient(145deg, #1E293B 0%, #0D1530 100%)',
            border: '1px solid rgba(56, 189, 248, 0.2)',
            borderRadius: '16px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(33,150,243,0.15)',
            overflow: 'hidden'
          }}
        >
          {/* Window Bar */}
          <div style={{
            background: '#141E33',
            padding: '12px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255,255,255,0.06)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF5350' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FFB74D' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#4CAF50' }} />
              <span style={{ fontSize: '11px', color: '#64748B', marginLeft: '8px', fontFamily: 'JetBrains Mono, monospace' }}>
                aegis-dpdk-kernel-interceptor
              </span>
            </div>
            <span style={{ fontSize: '10.5px', color: '#38BDF8', background: 'rgba(56,189,248,0.1)', padding: '2px 8px', borderRadius: '4px', fontFamily: 'JetBrains Mono' }}>
              MONITORING ETH0
            </span>
          </div>

          {/* Terminal / Live Flow Simulation */}
          <div style={{ padding: '20px', fontFamily: 'JetBrains Mono, monospace', fontSize: '11.5px', lineHeight: 1.8 }}>
            <div style={{ color: '#64748B' }}>// Core Hybrid Decision Matrix initializing...</div>
            <div style={{ color: '#4CAF50' }}>[OK] Loaded Random Forest weights: 100 trees, 41 scaled inputs</div>
            <div style={{ color: '#4CAF50' }}>[OK] PyTorch CUDA context active: LSTM 2-layer hidden(64)</div>
            <div style={{ color: '#94A3B8', marginTop: '10px' }}>
              &gt; [14:32:01.08] PACKET IN: 192.168.1.104:44321 → 10.0.0.1:80 [TCP SYN]
            </div>
            <div style={{ color: '#38BDF8' }}>
              &nbsp;&nbsp;├─ RF Score: 0.12 (Normal) | LSTM State: 0.08 (Benign)
            </div>
            <div style={{ color: '#4CAF50' }}>
              &nbsp;&nbsp;└─ DECISION: FORWARD [Normal Flow]
            </div>

            <div style={{ color: '#94A3B8', marginTop: '10px' }}>
              &gt; [14:32:02.44] PACKET IN: 45.33.32.156:58212 → 10.0.0.5:22 [TCP SYN]
            </div>
            <div style={{ color: '#FF9800' }}>
              &nbsp;&nbsp;├─ RF Score: 0.89 (Attack) | LSTM State: 0.94 (Attack)
            </div>
            <div style={{ color: '#E53935', fontWeight: 700 }}>
              &nbsp;&nbsp;└─ CRITICAL ANOMALY: Neptune SYN Flood Vector Detected!
            </div>
            <div style={{
              marginTop: '14px',
              padding: '10px 14px',
              background: 'rgba(229,57,53,0.15)',
              border: '1px solid rgba(229,57,53,0.4)',
              borderRadius: '6px',
              color: '#EF5350',
              fontWeight: 700
            }}>
              ⚡ SOAR AUTO-MITIGATION: Node isolated. Firewall rule iptables -A DROP injected.
            </div>
          </div>
        </motion.div>
      </section>

      {/* Social Proof Marquee */}
      <section style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '30px 48px',
        background: '#0D1530'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: '#64748B', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '20px' }}>
            PROTECTING MISSION-CRITICAL INFRASTRUCTURE AT SCALE
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            gap: '24px'
          }}>
            {enterpriseClients.map((client) => {
              const Icon = client.icon;
              return (
                <div key={client.name} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#64748B',
                  fontWeight: 700,
                  fontSize: '13px',
                  letterSpacing: '0.05em'
                }}>
                  <Icon size={18} />
                  <span>{client.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section id="features" style={{ padding: '80px 48px', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{ fontSize: '12px', color: '#38BDF8', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '8px' }}>
            ENGINEERED FOR MODERN SOC ANALYSTS
          </div>
          <h2 style={{ fontSize: '36px', fontWeight: 800, letterSpacing: '-0.02em', color: '#F8FAFC' }}>
            Zero-Trust Detection Architecture
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '15px', maxWidth: '600px', margin: '12px auto 0' }}>
            Built specifically to address split-second situational awareness during long monitoring shifts.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px'
        }}>
          {bentoFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                style={{
                  background: '#1E293B',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '14px',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.25s ease',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = feat.color;
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = `0 12px 30px rgba(0,0,0,0.4), 0 0 20px ${feat.color}22`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: `${feat.color}18`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={22} color={feat.color} />
                    </div>
                    <span style={{
                      fontSize: '10.5px',
                      fontWeight: 700,
                      color: feat.color,
                      background: `${feat.color}15`,
                      padding: '3px 8px',
                      borderRadius: '12px',
                      fontFamily: 'JetBrains Mono'
                    }}>
                      {feat.badge}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#F8FAFC', marginBottom: '4px' }}>
                    {feat.title}
                  </h3>
                  <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, marginBottom: '12px' }}>
                    {feat.subtitle}
                  </div>
                  <p style={{ fontSize: '13px', color: '#94A3B8', lineHeight: 1.6 }}>
                    {feat.desc}
                  </p>
                </div>

                {feat.visual}
              </div>
            );
          })}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" style={{ padding: '80px 48px', background: '#0D1530', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ fontSize: '12px', color: '#38BDF8', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '8px' }}>
              TRANSPARENT ENTERPRISE TIERS
            </div>
            <h2 style={{ fontSize: '36px', fontWeight: 800, letterSpacing: '-0.02em', color: '#F8FAFC' }}>
              Flexible Deployment & Compliance Pricing
            </h2>
            <p style={{ color: '#94A3B8', fontSize: '15px', maxWidth: '580px', margin: '12px auto 24px' }}>
              Every tier comes pre-validated for SOC 2 Type II, ISO 27001, and GDPR controls out of the box.
            </p>

            {/* Billing Toggle */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: '#1E293B',
              padding: '4px',
              borderRadius: '24px',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <button
                onClick={() => setBillingCycle('monthly')}
                style={{
                  padding: '8px 18px',
                  borderRadius: '20px',
                  border: 'none',
                  background: billingCycle === 'monthly' ? '#2196F3' : 'transparent',
                  color: billingCycle === 'monthly' ? '#FFFFFF' : '#94A3B8',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                style={{
                  padding: '8px 18px',
                  borderRadius: '20px',
                  border: 'none',
                  background: billingCycle === 'annual' ? '#2196F3' : 'transparent',
                  color: billingCycle === 'annual' ? '#FFFFFF' : '#94A3B8',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                Annual <span style={{ fontSize: '10px', background: '#4CAF50', color: '#0A1128', padding: '1px 6px', borderRadius: '8px', fontWeight: 700 }}>SAVE 20%</span>
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                style={{
                  background: tier.popular ? 'linear-gradient(180deg, #1E293B 0%, #172338 100%)' : '#141E33',
                  border: tier.popular ? '2px solid #2196F3' : '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '16px',
                  padding: '36px 30px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  boxShadow: tier.popular ? '0 16px 40px rgba(33,150,243,0.18)' : 'none'
                }}
              >
                {tier.popular && (
                  <span style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#2196F3',
                    color: '#FFFFFF',
                    fontSize: '10.5px',
                    fontWeight: 700,
                    padding: '4px 14px',
                    borderRadius: '12px',
                    letterSpacing: '0.04em'
                  }}>
                    RECOMMENDED FOR ENTERPRISE
                  </span>
                )}

                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#F8FAFC', marginBottom: '8px' }}>
                    {tier.name}
                  </h3>
                  <p style={{ fontSize: '12.5px', color: '#94A3B8', lineHeight: 1.5, minHeight: '38px', marginBottom: '20px' }}>
                    {tier.tagline}
                  </p>

                  <div style={{ marginBottom: '24px' }}>
                    <span style={{ fontSize: '38px', fontWeight: 800, color: '#F8FAFC', fontFamily: 'JetBrains Mono' }}>
                      {tier.price}
                    </span>
                    <span style={{ fontSize: '12px', color: '#64748B', marginLeft: '6px' }}>
                      {tier.period}
                    </span>
                  </div>

                  {/* Compliance Badges */}
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '24px' }}>
                    {tier.compliance.map((c) => (
                      <span key={c} style={{
                        fontSize: '10px',
                        background: 'rgba(56,189,248,0.1)',
                        color: '#38BDF8',
                        border: '1px solid rgba(56,189,248,0.25)',
                        padding: '2px 7px',
                        borderRadius: '4px',
                        fontWeight: 600
                      }}>
                        {c}
                      </span>
                    ))}
                  </div>

                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '20px', marginBottom: '28px' }}>
                    <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#64748B', marginBottom: '12px' }}>
                      INCLUDED CAPABILITIES:
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {tier.features.map((feat) => (
                        <div key={feat} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '12.5px', color: '#CBD5E1' }}>
                          <CheckCircle2 size={16} color="#4CAF50" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/login')}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: tier.popular ? 'none' : '1px solid rgba(255,255,255,0.15)',
                    background: tier.popular ? '#2196F3' : 'transparent',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: '13.5px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (tier.popular) e.currentTarget.style.background = '#1976D2';
                    else e.currentTarget.style.borderColor = '#2196F3';
                  }}
                  onMouseLeave={(e) => {
                    if (tier.popular) e.currentTarget.style.background = '#2196F3';
                    else e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                  }}
                >
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '40px 48px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '12px',
        color: '#64748B'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Shield size={18} color="#2196F3" />
          <span>© 2026 Aegis Network Security Inc. All enterprise rights reserved.</span>
        </div>

        <div style={{ display: 'flex', gap: '24px' }}>
          <span style={{ color: '#4CAF50', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4CAF50' }} />
            All Systems Operational
          </span>
          <span onClick={() => navigate('/dashboard')} style={{ color: '#38BDF8', cursor: 'pointer' }}>SOC Portal</span>
          <span onClick={() => navigate('/compliance')} style={{ color: '#94A3B8', cursor: 'pointer' }}>Compliance Vault</span>
        </div>
      </footer>
    </div>
  );
}
