import { useState } from 'react';
import { 
  Radio, 
  Search, 
  RefreshCw, 
  ShieldAlert, 
  ShieldCheck, 
  Globe, 
  ExternalLink, 
  AlertTriangle, 
  Terminal, 
  Hash, 
  Server,
  Zap
} from 'lucide-react';

export default function ThreatIntel() {
  const [iocQuery, setIocQuery] = useState('');
  const [syncing, setSyncing] = useState(false);

  const feeds = [
    {
      id: 'FEED-01',
      source: 'AlienVault OTX Pulse',
      time: '6 mins ago',
      title: 'Lazarus Group C2 Infrastructure Refresh',
      type: 'IP_REPUTATION',
      indicator: '194.87.139.14',
      impact: 'VULNERABLE',
      impactDetails: '2 internal bastion hosts communicated with this subnet in past 48h',
      mitre: 'T1071.001 (Web Protocols)',
      confidence: 96
    },
    {
      id: 'FEED-02',
      source: 'MITRE ATT&CK Sync',
      time: '24 mins ago',
      title: 'Active Exploitation of XZ Backdoor Liblzma',
      type: 'SHA256_HASH',
      indicator: 'c64a517d4d7f72f2daeb927a392d89f0e79ec14e77b4f56f0882b94436a49013',
      impact: 'PATCHED',
      impactDetails: 'All enterprise Debian/Ubuntu nodes verified running clean build 5.4.5',
      mitre: 'T1195.001 (Supply Chain)',
      confidence: 100
    },
    {
      id: 'FEED-03',
      source: 'CISA Known Exploited (KEV)',
      time: '1 hour ago',
      title: 'Palo Alto GlobalProtect Zero-Day OS Command Injection',
      type: 'CVE_EXPLOIT',
      indicator: 'CVE-2024-3400 (CVSS 10.0)',
      impact: 'PATCHED',
      impactDetails: 'Hotfix applied to perimeter firewall PAN-OS 11.0.4-h1',
      mitre: 'T1190 (Exploit Public-Facing App)',
      confidence: 99
    },
    {
      id: 'FEED-04',
      source: 'Abuse.ch Feodo Tracker',
      time: '2 hours ago',
      title: 'Qakbot Botnet Active Fast-Flux Domain Cluster',
      type: 'DOMAIN',
      indicator: 'syn-update-cloud.org',
      impact: 'VULNERABLE',
      impactDetails: 'DNS sinkhole not yet updated on secondary DNS server',
      mitre: 'T1568.002 (Fast Flux DNS)',
      confidence: 92
    }
  ];

  const syncFeeds = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      alert('Synchronized 14,280 indicators from AlienVault OTX, MITRE, and CISA feeds.');
    }, 1200);
  };

  const filteredFeeds = feeds.filter(f => 
    f.title.toLowerCase().includes(iocQuery.toLowerCase()) ||
    f.indicator.toLowerCase().includes(iocQuery.toLowerCase()) ||
    f.source.toLowerCase().includes(iocQuery.toLowerCase())
  );

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
            <Radio size={22} color="#00E5FF" />
            GLOBAL THREAT INTELLIGENCE &amp; VULNERABILITY RADAR
          </h1>
          <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '3px' }}>
            Synchronized ingestion from AlienVault OTX, MITRE ATT&amp;CK, and CISA with automated enterprise impact correlation
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={syncFeeds}
            disabled={syncing}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              background: '#2196F3',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 700,
              cursor: syncing ? 'not-allowed' : 'pointer'
            }}
          >
            <RefreshCw size={14} className={syncing ? 'spin' : ''} />
            {syncing ? 'SYNCING FEEDS...' : 'SYNC GLOBAL OTX'}
          </button>
        </div>
      </div>

      {/* Search & Statistics Banner */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        gap: '16px'
      }}>
        {/* Search Bar */}
        <div style={{
          background: '#1E293B',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '12px',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <Search size={18} color="#38BDF8" />
          <input
            type="text"
            value={iocQuery}
            onChange={(e) => setIocQuery(e.target.value)}
            placeholder="Search IoC hash, malicious IP, C2 domain, or CVE identifier..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              color: '#F8FAFC',
              fontSize: '13px',
              outline: 'none',
              fontFamily: 'JetBrains Mono'
            }}
          />
        </div>

        {/* Quick Correlation Metrics */}
        <div style={{
          background: '#1E293B',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '12px',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          fontFamily: 'JetBrains Mono'
        }}>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#FF9800' }}>2 VULNERABLE</div>
            <div style={{ fontSize: '10.5px', color: '#64748B' }}>LOCAL MATCHES</div>
          </div>
          <div style={{ borderLeft: '1px solid rgba(255,255,255,0.06)', height: '30px' }} />
          <div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#4CAF50' }}>14.2K INGESTED</div>
            <div style={{ fontSize: '10.5px', color: '#64748B' }}>IOC SIGNATURES</div>
          </div>
        </div>
      </div>

      {/* Vertical Timeline Feed */}
      <div style={{
        background: '#1E293B',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.2)'
      }}>
        <div style={{ fontSize: '12px', fontWeight: 700, color: '#38BDF8', fontFamily: 'JetBrains Mono', marginBottom: '18px' }}>
          LIVE THREAT ADVISORY STREAM &amp; LOCAL IMPACT ASSESSMENT
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredFeeds.map((item) => {
            const isVulnerable = item.impact === 'VULNERABLE';

            return (
              <div
                key={item.id}
                style={{
                  background: '#141E33',
                  border: isVulnerable ? '1px solid rgba(255,152,0,0.4)' : '1px solid rgba(255,255,255,0.04)',
                  borderLeft: `4px solid ${isVulnerable ? '#FF9800' : '#4CAF50'}`,
                  borderRadius: '8px',
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '20px'
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '11px', color: '#64748B', fontFamily: 'JetBrains Mono' }}>
                      {item.source} • {item.time}
                    </span>
                    <span style={{
                      fontSize: '10px',
                      background: 'rgba(56,189,248,0.1)',
                      color: '#38BDF8',
                      padding: '1px 6px',
                      borderRadius: '4px',
                      fontFamily: 'JetBrains Mono'
                    }}>
                      MITRE: {item.mitre}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#F8FAFC', margin: '0 0 6px' }}>
                    {item.title}
                  </h3>

                  {/* Indicator Box */}
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#0A1128',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontFamily: 'JetBrains Mono',
                    fontSize: '11.5px',
                    color: '#CBD5E1',
                    marginBottom: '8px'
                  }}>
                    <span style={{ color: '#64748B' }}>{item.type}:</span>
                    <span style={{ color: '#38BDF8', fontWeight: 600 }}>{item.indicator}</span>
                  </div>

                  <div style={{ fontSize: '12px', color: '#94A3B8' }}>
                    {item.impactDetails}
                  </div>
                </div>

                {/* Impact Badge */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: '6px',
                    background: isVulnerable ? 'rgba(255,152,0,0.18)' : 'rgba(76,175,80,0.18)',
                    color: isVulnerable ? '#FF9800' : '#4CAF50',
                    fontFamily: 'JetBrains Mono',
                    border: `1px solid ${isVulnerable ? 'rgba(255,152,0,0.4)' : 'rgba(76,175,80,0.4)'}`
                  }}>
                    {isVulnerable ? '⚡ LOCAL VULNERABLE' : '✓ LOCAL PATCHED'}
                  </span>

                  <span style={{ fontSize: '10.5px', color: '#64748B', fontFamily: 'JetBrains Mono' }}>
                    Confidence: {item.confidence}%
                  </span>

                  {isVulnerable && (
                    <button
                      onClick={() => alert(`Triggering automated remediation for ${item.indicator}`)}
                      style={{
                        background: '#FF9800',
                        border: 'none',
                        color: '#0A1128',
                        padding: '4px 10px',
                        borderRadius: '4px',
                        fontSize: '10.5px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Remediate
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
