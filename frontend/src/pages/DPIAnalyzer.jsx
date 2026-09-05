import { useState } from 'react';
import { 
  Binary, 
  Search, 
  Filter, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  Code, 
  Terminal, 
  Layers, 
  ChevronRight, 
  Clock, 
  ShieldAlert
} from 'lucide-react';

export default function DPIAnalyzer() {
  const [searchQuery, setSearchQuery] = useState('ip.src == 45.33.32.156 && tcp.port == 80');
  const [selectedPacketId, setSelectedPacketId] = useState('PKT-1082');

  const packets = [
    {
      id: 'PKT-1082',
      time: '14:38:02.104821',
      src: '45.33.32.156:58212',
      dst: '10.0.1.1:80',
      proto: 'TCP',
      length: 74,
      flags: '[SYN] Seq=0 Win=1024 Len=0 MSS=1460',
      tag: 'MALICIOUS (SYN FLOOD)',
      tagColor: '#E53935',
      hexRows: [
        { offset: '0000', hex: '00 1a 2b 3c 4d 5e 52 54 00 12 34 56 08 00 45 00', ascii: '..+<M^RT..4V..E.' },
        { offset: '0010', hex: '00 3c 1a 22 40 00 40 06 b2 a1 2d 21 20 9c 0a 00', ascii: '.<."@.@...-! ...' },
        { offset: '0020', hex: '01 01 e3 64 00 50 00 00 00 00 a0 02 04 00 8e 45', ascii: '...d.P.........E' },
        { offset: '0030', hex: '00 00 02 04 05 b4 04 02 08 0a 01 23 45 67 00 00', ascii: '...........#Eg..' },
        { offset: '0040', hex: '00 00 01 03 03 07 41 45 47 49 53 5f 53 59 4e 00', ascii: '......AEGIS_SYN.' }
      ],
      tree: [
        { layer: 'Frame 1082: 74 bytes on wire (592 bits), 74 bytes captured', status: 'OK' },
        { layer: 'Ethernet II, Src: 52:54:00:12:34:56, Dst: 00:1a:2b:3c:4d:5e', status: 'OK' },
        { layer: 'Internet Protocol Version 4, Src: 45.33.32.156, Dst: 10.0.1.1', status: 'FLAGGED' },
        { layer: 'Transmission Control Protocol, Src Port: 58212, Dst Port: 80, Flags: [SYN]', status: 'CRITICAL' }
      ]
    },
    {
      id: 'PKT-1083',
      time: '14:38:02.105120',
      src: '192.168.1.104:44321',
      dst: '10.0.3.5:5432',
      proto: 'TLSv1.3',
      length: 512,
      flags: 'Application Data [Encrypted]',
      tag: 'BENIGN (NORMAL)',
      tagColor: '#4CAF50',
      hexRows: [
        { offset: '0000', hex: '17 03 03 01 fc 00 00 00 00 00 00 00 01 e2 a4 1b', ascii: '................' },
        { offset: '0010', hex: '7b 90 2a 8f d3 12 55 aa 67 b8 cc 11 94 e1 4f 33', ascii: '{.*...U.g.....O3' },
        { offset: '0020', hex: '99 22 18 a4 ff 10 de ad be ef 48 65 6c 6c 6f 20', ascii: '."........Hello ' },
        { offset: '0030', hex: '53 45 43 55 52 45 20 44 41 54 41 20 54 4f 4b 45', ascii: 'SECURE DATA TOKE' }
      ],
      tree: [
        { layer: 'Frame 1083: 512 bytes on wire (4096 bits)', status: 'OK' },
        { layer: 'Ethernet II, Src: 06:3A:4C:55:66:77, Dst: 06:3A:4C:88:99:AA', status: 'OK' },
        { layer: 'Internet Protocol Version 4, Src: 192.168.1.104, Dst: 10.0.3.5', status: 'OK' },
        { layer: 'Transport Layer Security: TLSv1.3 Encrypted Handshake', status: 'OK' }
      ]
    },
    {
      id: 'PKT-1084',
      time: '14:38:02.106412',
      src: '185.220.101.5:44381',
      dst: '10.0.2.10:22',
      proto: 'TCP',
      length: 60,
      flags: '[FIN, PSH, URG] Xmas Port Probe',
      tag: 'SUSPICIOUS (PORTSWEEP)',
      tagColor: '#FF9800',
      hexRows: [
        { offset: '0000', hex: '00 12 34 56 78 9a bc de f0 12 34 56 08 00 45 00', ascii: '..4Vx.....4V..E.' },
        { offset: '0010', hex: '00 28 00 01 00 00 40 06 7c cc b9 dc 65 05 0a 00', ascii: '.(....@.|...e...' },
        { offset: '0020', hex: '02 0a ad 5d 00 16 00 00 00 01 00 00 00 00 50 29', ascii: '...]..........P)' },
        { offset: '0030', hex: '00 00 a1 b2 00 00 00 00 00 00 00 00 00 00 00 00', ascii: '................' }
      ],
      tree: [
        { layer: 'Frame 1084: 60 bytes on wire', status: 'OK' },
        { layer: 'Ethernet II', status: 'OK' },
        { layer: 'IPv4: Non-RFC Compliant TCP Flags combination', status: 'FLAGGED' },
        { layer: 'TCP: Stealth Xmas Scan Probe [FIN, PSH, URG]', status: 'WARNING' }
      ]
    }
  ];

  const activePacket = packets.find(p => p.id === selectedPacketId) || packets[0];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      color: '#F8FAFC',
      paddingBottom: '30px'
    }}>
      {/* Header & Filter Builder */}
      <div style={{
        background: '#1E293B',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '12px',
        padding: '18px 20px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Binary size={22} color="#00BCD4" />
              DEEP PACKET INSPECTION (DPI) &amp; FORENSIC PCAP ANALYZER
            </h1>
            <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '3px' }}>
              Bit-level forensic payload dissection, protocol tree inspection, and Wireshark syntax query builder
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => alert('Downloading decoded pcap: forensic_dump_2026.pcap')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 14px',
                borderRadius: '6px',
                border: '1px solid rgba(0,188,212,0.3)',
                background: 'rgba(0,188,212,0.1)',
                color: '#00E5FF',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <Download size={14} />
              Export PCAP
            </button>
          </div>
        </div>

        {/* Sticky Query Filter Builder Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: '#0A1128',
          border: '1px solid rgba(56,189,248,0.3)',
          borderRadius: '8px',
          padding: '8px 14px'
        }}>
          <Search size={16} color="#38BDF8" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="e.g. ip.src == 192.168.1.1 && tcp.port == 443 || tcp.flags.syn == 1"
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              color: '#38BDF8',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '12.5px',
              outline: 'none'
            }}
          />
          <div style={{ display: 'flex', gap: '6px' }}>
            {['ip.src', 'tcp.port == 80', 'flags.syn', 'tls.handshake'].map(tag => (
              <span
                key={tag}
                onClick={() => setSearchQuery(prev => `${prev} && ${tag}`)}
                style={{
                  fontSize: '10px',
                  background: '#1E293B',
                  color: '#94A3B8',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontFamily: 'JetBrains Mono',
                  border: '1px solid rgba(255,255,255,0.06)'
                }}
              >
                +{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Split Screen Forensic Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '20px' }}>
        {/* Left: Packet Stream List */}
        <div style={{
          background: '#1E293B',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '12px',
          padding: '18px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
        }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#94A3B8', marginBottom: '12px', fontFamily: 'JetBrains Mono' }}>
            CAPTURED WIRE FRAMES (BUFFER: 2,500)
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {packets.map(pkt => {
              const isSelected = pkt.id === selectedPacketId;
              return (
                <div
                  key={pkt.id}
                  onClick={() => setSelectedPacketId(pkt.id)}
                  style={{
                    background: isSelected ? 'linear-gradient(135deg, #141E33 0%, #1A2844 100%)' : '#141E33',
                    border: `1.5px solid ${isSelected ? '#00BCD4' : 'rgba(255,255,255,0.06)'}`,
                    borderRadius: '8px',
                    padding: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#38BDF8', fontFamily: 'JetBrains Mono' }}>
                      {pkt.id} • {pkt.proto}
                    </span>
                    <span style={{
                      fontSize: '9.5px',
                      fontWeight: 700,
                      color: pkt.tagColor,
                      background: `${pkt.tagColor}18`,
                      padding: '1px 6px',
                      borderRadius: '4px',
                      fontFamily: 'JetBrains Mono'
                    }}>
                      {pkt.tag}
                    </span>
                  </div>

                  <div style={{ fontSize: '11.5px', fontFamily: 'JetBrains Mono', color: '#F8FAFC' }}>
                    {pkt.src} → {pkt.dst}
                  </div>

                  <div style={{ fontSize: '10.5px', color: '#64748B', fontFamily: 'JetBrains Mono', marginTop: '4px' }}>
                    {pkt.flags} • {pkt.length} bytes
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Hex Dump & Protocol Tree Dissection */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Protocol Tree */}
          <div style={{
            background: '#1E293B',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '12px',
            padding: '18px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
          }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#94A3B8', marginBottom: '12px', fontFamily: 'JetBrains Mono' }}>
              PROTOCOL LAYER DISSECTION: {activePacket.id}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {activePacket.tree.map((layer, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#141E33',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '11.5px',
                  fontFamily: 'JetBrains Mono'
                }}>
                  <ChevronRight size={14} color="#38BDF8" />
                  <span style={{ color: layer.status === 'CRITICAL' ? '#EF5350' : layer.status === 'FLAGGED' ? '#FFB74D' : '#F8FAFC' }}>
                    {layer.layer}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Dual-Column Hex Dump Viewer */}
          <div style={{
            background: '#1E293B',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '12px',
            padding: '18px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#00E5FF', fontFamily: 'JetBrains Mono' }}>
                RAW FORENSIC PCAP HEX DUMP
              </div>
              <span style={{ fontSize: '10.5px', color: '#64748B', fontFamily: 'JetBrains Mono' }}>
                OFFSET | 16-BYTE HEXADECIMAL | DECODED ASCII
              </span>
            </div>

            {/* Hex Dump Component */}
            <div style={{
              background: '#0A1128',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '8px',
              padding: '14px',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '12px',
              lineHeight: 1.8,
              overflowX: 'auto'
            }}>
              {activePacket.hexRows.map((row) => (
                <div key={row.offset} style={{ display: 'flex', gap: '24px' }}>
                  <span style={{ color: '#475569', userSelect: 'none' }}>{row.offset}</span>
                  <span style={{ color: '#38BDF8', letterSpacing: '0.05em' }}>{row.hex}</span>
                  <span style={{ color: '#4CAF50', borderLeft: '1px solid #1E293B', paddingLeft: '16px' }}>{row.ascii}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
