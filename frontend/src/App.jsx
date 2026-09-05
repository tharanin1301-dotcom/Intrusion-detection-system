import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Topology from './pages/Topology';
import Alerts from './pages/Alerts';
import Playbooks from './pages/Playbooks';
import DPIAnalyzer from './pages/DPIAnalyzer';
import ThreatIntel from './pages/ThreatIntel';
import Compliance from './pages/Compliance';
import AttackDNA from './pages/AttackDNA';
import Models from './pages/Models';
import AITutor from './pages/AITutor';
import Sidebar from './components/Sidebar';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AppLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0A1128' }}>
      <Sidebar />
      <main style={{
        flex: 1,
        padding: '24px 32px',
        marginLeft: '260px',
        overflowY: 'auto',
        height: '100vh',
        background: '#0A1128'
      }}>
        {children}
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route: ALWAYS open the Login page first */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Auth Route */}
        <Route path="/login" element={<Login />} />

        {/* Optional Marketing Landing Page */}
        <Route path="/landing" element={<Landing />} />

        {/* Protected SOC Operations Console - Entered directly after login */}
        <Route path="/dashboard" element={<ProtectedRoute><AppLayout><Dashboard /></AppLayout></ProtectedRoute>} />
        <Route path="/topology" element={<ProtectedRoute><AppLayout><Topology /></AppLayout></ProtectedRoute>} />
        <Route path="/alerts" element={<ProtectedRoute><AppLayout><Alerts /></AppLayout></ProtectedRoute>} />
        
        {/* Forensics & Automation */}
        <Route path="/playbooks" element={<ProtectedRoute><AppLayout><Playbooks /></AppLayout></ProtectedRoute>} />
        <Route path="/dpi" element={<ProtectedRoute><AppLayout><DPIAnalyzer /></AppLayout></ProtectedRoute>} />
        <Route path="/threat-intel" element={<ProtectedRoute><AppLayout><ThreatIntel /></AppLayout></ProtectedRoute>} />
        <Route path="/compliance" element={<ProtectedRoute><AppLayout><Compliance /></AppLayout></ProtectedRoute>} />

        {/* Intelligence & ML Architecture */}
        <Route path="/dna" element={<ProtectedRoute><AppLayout><AttackDNA /></AppLayout></ProtectedRoute>} />
        <Route path="/models" element={<ProtectedRoute><AppLayout><Models /></AppLayout></ProtectedRoute>} />
        <Route path="/tutor" element={<ProtectedRoute><AppLayout><AITutor /></AppLayout></ProtectedRoute>} />

        {/* Fallback to root (which directs to /login or /dashboard) */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
