import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { Cpu, Activity, CheckCircle2, Zap, Layers, Server } from 'lucide-react';

export default function Models() {
  const comparisonData = [
    { name: 'Random Forest', accuracy: 77.07, speed: 95, f1: 76.8 },
    { name: 'LSTM (PyTorch)', accuracy: 77.31, speed: 82, f1: 77.1 },
    { name: 'Aegis Hybrid Consensus', accuracy: 84.6, speed: 88, f1: 85.2 },
  ];

  const topFeatures = [
    { rank: 1, name: 'src_bytes', weight: '18.4%', desc: 'Bytes transferred from source to destination' },
    { rank: 2, name: 'dst_bytes', weight: '14.2%', desc: 'Bytes transferred from destination to source' },
    { rank: 3, name: 'count', weight: '12.8%', desc: 'Connections to the same destination in 2 sec' },
    { rank: 4, name: 'srv_serror_rate', weight: '9.6%', desc: 'SYN error rate on the same service' },
    { rank: 5, name: 'dst_host_srv_count', weight: '8.1%', desc: 'Connections to the same service on host' },
    { rank: 6, name: 'same_srv_rate', weight: '7.4%', desc: 'Percentage of connections to same service' }
  ];

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
            <Cpu size={22} color="#38BDF8" />
            HYBRID ML ARCHITECTURE &amp; NSL-KDD NEURAL BENCHMARKS
          </h1>
          <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '3px' }}>
            Ensemble dual-layer consensus combining Random Forest (100 Trees) and PyTorch 2-layer LSTM
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <span style={{
            fontSize: '11px',
            background: 'rgba(76,175,80,0.15)',
            color: '#4CAF50',
            border: '1px solid rgba(76,175,80,0.3)',
            padding: '4px 10px',
            borderRadius: '6px',
            fontFamily: 'JetBrains Mono',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <CheckCircle2 size={13} />
            WEIGHTS ACTIVE (FLASK :5000)
          </span>
        </div>
      </div>

      {/* Model Spec Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Random Forest Card */}
        <div style={{
          background: '#1E293B',
          borderLeft: '4px solid #FF9800',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '10px',
          padding: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: '#FF9800', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={18} color="#FF9800" />
              Random Forest Ensemble
            </h2>
            <span style={{ fontSize: '11px', fontFamily: 'JetBrains Mono', color: '#64748B' }}>scikit-learn v1.4</span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, fontFamily: 'JetBrains Mono', color: '#F8FAFC', marginBottom: '8px' }}>
            77.07% <span style={{ fontSize: '13px', color: '#4CAF50', fontWeight: 600 }}>Test Accuracy</span>
          </div>
          <p style={{ fontSize: '12.5px', color: '#94A3B8', lineHeight: 1.5, marginBottom: '14px' }}>
            100 estimators trained on 125,973 NSL-KDD records. Excels at high-speed linear split classification and signature detection with sub-millisecond inference.
          </p>
          <div style={{ display: 'flex', gap: '8px', fontSize: '11px', fontFamily: 'JetBrains Mono' }}>
            <span style={{ background: '#141E33', padding: '3px 8px', borderRadius: '4px', color: '#CBD5E1' }}>Trees: 100</span>
            <span style={{ background: '#141E33', padding: '3px 8px', borderRadius: '4px', color: '#CBD5E1' }}>Features: 41</span>
            <span style={{ background: '#141E33', padding: '3px 8px', borderRadius: '4px', color: '#CBD5E1' }}>Inference: 0.4ms</span>
          </div>
        </div>

        {/* PyTorch LSTM Card */}
        <div style={{
          background: '#1E293B',
          borderLeft: '4px solid #2196F3',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '10px',
          padding: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: '#38BDF8', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={18} color="#38BDF8" />
              PyTorch Recurrent LSTM
            </h2>
            <span style={{ fontSize: '11px', fontFamily: 'JetBrains Mono', color: '#64748B' }}>PyTorch 2.3 CUDA</span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, fontFamily: 'JetBrains Mono', color: '#F8FAFC', marginBottom: '8px' }}>
            77.31% <span style={{ fontSize: '13px', color: '#4CAF50', fontWeight: 600 }}>Test Accuracy</span>
          </div>
          <p style={{ fontSize: '12.5px', color: '#94A3B8', lineHeight: 1.5, marginBottom: '14px' }}>
            2-layer LSTM with hidden size 64 and dropout 0.2. Models temporal relationships across consecutive flow packets to uncover stealth slow-rate port sweeps.
          </p>
          <div style={{ display: 'flex', gap: '8px', fontSize: '11px', fontFamily: 'JetBrains Mono' }}>
            <span style={{ background: '#141E33', padding: '3px 8px', borderRadius: '4px', color: '#CBD5E1' }}>Layers: 2</span>
            <span style={{ background: '#141E33', padding: '3px 8px', borderRadius: '4px', color: '#CBD5E1' }}>Hidden: 64</span>
            <span style={{ background: '#141E33', padding: '3px 8px', borderRadius: '4px', color: '#CBD5E1' }}>Inference: 1.0ms</span>
          </div>
        </div>
      </div>

      {/* Comparative Bar Chart */}
      <div style={{
        background: '#1E293B',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
      }}>
        <h3 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 16px', color: '#F8FAFC' }}>
          Comparative Neural Evaluation &amp; Consensus Gains
        </h3>
        <div style={{ height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="name" stroke="#64748B" fontFamily="JetBrains Mono" fontSize={11} />
              <YAxis stroke="#64748B" domain={[0, 100]} fontFamily="JetBrains Mono" fontSize={11} />
              <RechartsTooltip contentStyle={{ backgroundColor: '#0A1128', border: '1px solid #334155', borderRadius: '6px', fontSize: '12px' }} />
              <Legend />
              <Bar dataKey="accuracy" fill="#2196F3" name="Accuracy (%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="speed" fill="#00BCD4" name="Throughput Score" radius={[4, 4, 0, 0]} />
              <Bar dataKey="f1" fill="#4CAF50" name="F1-Score (%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top 6 Feature Importances */}
      <div style={{
        background: '#1E293B',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
      }}>
        <h3 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 14px', color: '#F8FAFC' }}>
          Key NSL-KDD Feature Importance (Top Predictors)
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {topFeatures.map((f) => (
            <div key={f.rank} style={{
              background: '#141E33',
              border: '1px solid rgba(255,255,255,0.04)',
              borderRadius: '8px',
              padding: '12px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#38BDF8', fontFamily: 'JetBrains Mono' }}>
                  #{f.rank} {f.name}
                </span>
                <span style={{ fontSize: '11px', color: '#4CAF50', fontWeight: 700, fontFamily: 'JetBrains Mono' }}>
                  {f.weight}
                </span>
              </div>
              <div style={{ fontSize: '11px', color: '#94A3B8' }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
