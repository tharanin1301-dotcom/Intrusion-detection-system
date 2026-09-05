import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, User, Send, Sparkles, HelpCircle, Terminal } from 'lucide-react';

export default function AITutor() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Greetings, Analyst. I am the Aegis AI Cyber Defense Mentor. I can explain NSL-KDD feature mathematics, hybrid RF+LSTM consensus mechanisms, SOAR mitigation playbooks, or real-world CVE exploitation techniques. How can I assist your operations today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const suggestions = [
    'How does the RF + LSTM hybrid consensus eliminate false positives?',
    'Explain the mathematical difference between Neptune and Smurf attacks.',
    'What are the most critical NSL-KDD features for detecting port sweeps?',
    'How does Aegis autonomous SOAR quarantine compromised subnets?',
    'What is the difference between DoS and U2R privilege escalation?'
  ];

  const handleSend = async (text) => {
    if (!text.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInput('');
    setIsTyping(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/ai-tutor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ question: text })
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, { role: 'assistant', content: data.answer }]);
      } else {
        throw new Error();
      }
    } catch {
      // Intelligent fallback explanation if backend tutor route is waiting
      let fallback = "Our dual-layer neural system cross-references 41 NSL-KDD flow features. Random Forest identifies fast static signature branches, while the PyTorch LSTM models temporal sequences to catch low-and-slow reconnaissance. When both agree (confidence > 85%), automated SOAR playbooks trigger sub-second containment.";
      if (text.toLowerCase().includes('neptune') || text.toLowerCase().includes('dos')) {
        fallback = "Neptune is a TCP SYN Flood DoS attack. The attacker sends thousands of TCP SYN packets with forged IP addresses without ever sending the completing ACK. This leaves half-open sockets that exhaust the victim server's backlog queue until legitimate traffic is dropped.";
      } else if (text.toLowerCase().includes('feature')) {
        fallback = "The NSL-KDD dataset features are divided into 4 categories: Basic (e.g. protocol, duration, src_bytes), Content (e.g. num_failed_logins, root_shell), Time-based Traffic (e.g. count, srv_count in 2-second windows), and Host-based Traffic (e.g. dst_host_srv_count, serror_rate).";
      }
      setMessages(prev => [...prev, { role: 'assistant', content: fallback }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      color: '#F8FAFC',
      height: 'calc(100vh - 48px)'
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
            <Bot size={22} color="#38BDF8" />
            AEGIS AI CYBERSECURITY MENTOR &amp; SOC TUTOR
          </h1>
          <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '3px' }}>
            Interactive knowledge engine trained on MITRE ATT&amp;CK, NSL-KDD forensics, and defensive SOC playbooks
          </div>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div style={{
        flex: 1,
        background: '#1E293B',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '12px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        overflowY: 'auto',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
      }}>
        {messages.map((msg, idx) => {
          const isUser = msg.role === 'user';
          return (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={idx}
              style={{
                alignSelf: isUser ? 'flex-end' : 'flex-start',
                maxWidth: '78%',
                background: isUser ? 'linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 100%)' : '#141E33',
                border: isUser ? '1px solid rgba(56,189,248,0.4)' : '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px',
                padding: '14px 18px',
                display: 'flex',
                gap: '12px',
                boxShadow: isUser ? '0 4px 16px rgba(33,150,243,0.25)' : 'none'
              }}
            >
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: isUser ? '#38BDF8' : '#2196F3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {isUser ? <User size={16} color="#0A1128" /> : <Bot size={16} color="#FFFFFF" />}
              </div>
              <div>
                <div style={{ fontSize: '11px', color: isUser ? '#BAE6FD' : '#64748B', fontWeight: 700, marginBottom: '4px', fontFamily: 'JetBrains Mono' }}>
                  {isUser ? 'ANALYST' : 'AEGIS MENTOR'}
                </div>
                <div style={{ fontSize: '13px', lineHeight: 1.6, color: '#F8FAFC' }}>
                  {msg.content}
                </div>
              </div>
            </motion.div>
          );
        })}

        {isTyping && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B', fontSize: '12px', fontFamily: 'JetBrains Mono' }}>
            <Sparkles size={14} className="spin" color="#38BDF8" />
            Analyzing telemetry &amp; drafting guidance...
          </div>
        )}
      </div>

      {/* Suggested Prompt Chips */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        {suggestions.map((sug, i) => (
          <button
            key={i}
            onClick={() => handleSend(sug)}
            style={{
              background: '#141E33',
              border: '1px solid rgba(255,255,255,0.06)',
              color: '#94A3B8',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '11px',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              transition: 'all 0.15s'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#38BDF8'; e.currentTarget.style.color = '#F8FAFC'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#94A3B8'; }}
          >
            {sug}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div style={{
        background: '#1E293B',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px',
        padding: '12px 18px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
          placeholder="Ask anything about network security, NSL-KDD dataset, or threat mitigation..."
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            color: '#F8FAFC',
            fontSize: '13px',
            outline: 'none'
          }}
        />
        <button
          onClick={() => handleSend(input)}
          style={{
            background: '#2196F3',
            border: 'none',
            color: '#FFFFFF',
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(33,150,243,0.3)'
          }}
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
