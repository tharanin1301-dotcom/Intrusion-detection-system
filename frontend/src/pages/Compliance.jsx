import { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  Download, 
  Clock, 
  Calendar, 
  Mail, 
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import jsPDF from 'jspdf';

export default function Compliance() {
  const [showModal, setShowModal] = useState(false);
  const [scheduleFreq, setScheduleFreq] = useState('WEEKLY');
  const [recipientEmail, setRecipientEmail] = useState('ciso-reports@enterprise.org');

  const frameworks = [
    { name: 'SOC 2 Type II', score: 96, status: 'AUDIT READY', color: '#4CAF50', desc: 'Trust Services Criteria (Security, Availability, Confidentiality)' },
    { name: 'ISO 27001:2022', score: 94, status: 'COMPLIANT', color: '#2196F3', desc: 'Information Security Management Systems (ISMS) Annex A controls' },
    { name: 'HIPAA Security', score: 98, status: 'COMPLIANT', color: '#00BCD4', desc: 'ePHI Transmission Security & Access Control Specifications' },
    { name: 'NIST SP 800-53', score: 91, status: 'REVIEW REQ', color: '#FF9800', desc: 'Federal Security and Privacy Controls for Information Systems' }
  ];

  const controls = [
    { id: 'CC6.1', name: 'Boundary Protection & Firewalls', framework: 'SOC 2', status: 'PASS', lastAudit: 'Today' },
    { id: 'CC6.6', name: 'Logical Access Control & MFA', framework: 'SOC 2', status: 'PASS', lastAudit: 'Yesterday' },
    { id: 'A.12.6', name: 'Technical Vulnerability Management', framework: 'ISO 27001', status: 'PASS', lastAudit: '2 days ago' },
    { id: '164.312', name: 'ePHI Data Encryption in Transit (TLS 1.3)', framework: 'HIPAA', status: 'PASS', lastAudit: 'Today' },
    { id: 'SI-4', name: 'Continuous Information System Monitoring', framework: 'NIST', status: 'AUDIT READY', lastAudit: 'Real-time' },
    { id: 'IR-4', name: 'Incident Handling & Automated SOAR Actions', framework: 'NIST', status: 'PASS', lastAudit: 'Today' }
  ];

  const generateReportPDF = () => {
    const doc = new jsPDF();
    doc.setFillColor(10, 17, 40);
    doc.rect(0, 0, 210, 297, 'F');

    doc.setTextColor(56, 189, 248);
    doc.setFontSize(20);
    doc.text('AEGIS NETWORK SECURITY', 14, 22);

    doc.setFontSize(14);
    doc.setTextColor(248, 250, 252);
    doc.text('EXECUTIVE CISO COMPLIANCE & GOVERNANCE AUDIT', 14, 32);

    doc.setFontSize(10);
    doc.setTextColor(148, 163, 184);
    doc.text(`Generated: ${new Date().toLocaleDateString()} | Auditor: Aegis Automated Verification Engine`, 14, 40);

    doc.setDrawColor(33, 150, 243);
    doc.line(14, 44, 196, 44);

    let y = 54;
    doc.setFontSize(12);
    doc.setTextColor(56, 189, 248);
    doc.text('REGULATORY ADHERENCE BENCHMARKS:', 14, y);
    y += 10;

    frameworks.forEach(f => {
      doc.setFontSize(11);
      doc.setTextColor(248, 250, 252);
      doc.text(`${f.name}: ${f.score}% ADHERENCE [${f.status}]`, 14, y);
      doc.setFontSize(9);
      doc.setTextColor(148, 163, 184);
      doc.text(f.desc, 14, y + 5);
      y += 14;
    });

    y += 8;
    doc.setFontSize(12);
    doc.setTextColor(56, 189, 248);
    doc.text('CORE SECURITY CONTROLS VERIFICATION:', 14, y);
    y += 10;

    controls.forEach(c => {
      doc.setFontSize(10);
      doc.setTextColor(76, 175, 80);
      doc.text(`[${c.status}] ${c.id} - ${c.name} (${c.framework}) - Verified ${c.lastAudit}`, 14, y);
      y += 8;
    });

    doc.save('Aegis_CISO_Compliance_Audit_2026.pdf');
    setShowModal(false);
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
            <Award size={22} color="#4CAF50" />
            COMPLIANCE AUDITING &amp; CISO EXECUTIVE SANDBOX
          </h1>
          <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '3px' }}>
            Automated continuous compliance verification against SOC 2, ISO 27001, HIPAA, and NIST frameworks
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '6px',
            border: 'none',
            background: '#2196F3',
            color: '#FFFFFF',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(33,150,243,0.35)'
          }}
        >
          <FileText size={15} />
          Automated Report Builder
        </button>
      </div>

      {/* Compliance Score Radial Gauges (4 Cards) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px'
      }}>
        {frameworks.map((f) => (
          <div
            key={f.name}
            style={{
              background: '#1E293B',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '12px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
            }}
          >
            {/* Radial Percentage */}
            <div style={{
              width: '90px',
              height: '90px',
              borderRadius: '50%',
              border: `4px solid ${f.color}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 0 18px ${f.color}33`,
              marginBottom: '14px',
              background: '#141E33'
            }}>
              <span style={{ fontSize: '24px', fontWeight: 800, fontFamily: 'JetBrains Mono', color: '#F8FAFC' }}>
                {f.score}%
              </span>
            </div>

            <h3 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 4px', color: '#F8FAFC' }}>
              {f.name}
            </h3>
            <span style={{
              fontSize: '10px',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '10px',
              background: `${f.color}18`,
              color: f.color,
              fontFamily: 'JetBrains Mono',
              marginBottom: '10px'
            }}>
              {f.status}
            </span>
            <p style={{ fontSize: '11px', color: '#94A3B8', margin: 0, lineHeight: 1.4 }}>
              {f.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Security Controls Table */}
      <div style={{
        background: '#1E293B',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>
            VERIFIED AUDIT CONTROLS &amp; CONTINUOUS ATTESTATION
          </h2>
          <span style={{ fontSize: '11px', color: '#64748B', fontFamily: 'JetBrains Mono' }}>
            ALL 6/6 CORE CONTROLS CURRENTLY PASSING
          </span>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr style={{ background: '#141E33', color: '#64748B', textAlign: 'left', fontFamily: 'JetBrains Mono' }}>
              <th style={{ padding: '10px 14px' }}>CONTROL ID</th>
              <th style={{ padding: '10px 14px' }}>CONTROL REQUIREMENT</th>
              <th style={{ padding: '10px 14px' }}>FRAMEWORK</th>
              <th style={{ padding: '10px 14px' }}>EVIDENCE LAST VERIFIED</th>
              <th style={{ padding: '10px 14px' }}>AUDIT STATUS</th>
            </tr>
          </thead>
          <tbody>
            {controls.map((c) => (
              <tr key={c.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: '12px 14px', color: '#38BDF8', fontFamily: 'JetBrains Mono', fontWeight: 700 }}>
                  {c.id}
                </td>
                <td style={{ padding: '12px 14px', color: '#F8FAFC', fontWeight: 600 }}>
                  {c.name}
                </td>
                <td style={{ padding: '12px 14px', color: '#CBD5E1' }}>
                  {c.framework}
                </td>
                <td style={{ padding: '12px 14px', color: '#94A3B8', fontFamily: 'JetBrains Mono', fontSize: '11px' }}>
                  {c.lastAudit}
                </td>
                <td style={{ padding: '12px 14px' }}>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '10px',
                    background: 'rgba(76,175,80,0.15)',
                    color: '#4CAF50',
                    fontFamily: 'JetBrains Mono'
                  }}>
                    ✓ {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Automated Report Builder Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(10, 17, 40, 0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#1E293B',
            border: '1px solid rgba(56,189,248,0.3)',
            borderRadius: '14px',
            width: '460px',
            padding: '24px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.6)'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 6px' }}>
              Schedule Automated Compliance Distribution
            </h3>
            <p style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '20px' }}>
              Generate tamper-evident PDF executive briefings sent directly to designated CISO and auditor inboxes.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, fontFamily: 'JetBrains Mono' }}>
                  DISTRIBUTION FREQUENCY
                </label>
                <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                  {['DAILY', 'WEEKLY', 'MONTHLY'].map(freq => (
                    <button
                      key={freq}
                      onClick={() => setScheduleFreq(freq)}
                      style={{
                        flex: 1,
                        background: scheduleFreq === freq ? '#2196F3' : '#141E33',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: scheduleFreq === freq ? '#FFF' : '#94A3B8',
                        padding: '8px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {freq}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, fontFamily: 'JetBrains Mono' }}>
                  RECIPIENT STAKEHOLDER EMAIL
                </label>
                <input
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  style={{
                    width: '100%',
                    marginTop: '6px',
                    background: '#141E33',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    color: '#F8FAFC',
                    fontSize: '12.5px',
                    fontFamily: 'JetBrains Mono',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
              <button
                onClick={generateReportPDF}
                style={{
                  flex: 1,
                  background: '#4CAF50',
                  border: 'none',
                  color: '#FFF',
                  padding: '10px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Download PDF Audit Now
              </button>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#94A3B8',
                  padding: '10px 16px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
