import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { LayoutDashboard, Users, UserPlus, ShieldAlert, LogOut } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import VendorList from './pages/VendorList';
import AddVendor from './pages/AddVendor';
import Auth from './pages/Auth';
import LandingPage from './pages/LandingPage';
import { AuthProvider, useAuth } from './context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const navItems = [
    { path: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/vendors', icon: <Users size={20} />, label: 'Vendors' },
    { path: '/add-vendor', icon: <UserPlus size={20} />, label: 'Add Vendor' },
  ];

  return (
    <sidebar>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <div style={{ background: 'var(--primary)', padding: '8px', borderRadius: '10px' }}>
          <ShieldAlert color="white" size={24} />
        </div>
        <h2 style={{ fontSize: '1.5rem', letterSpacing: '-0.5px' }}>GRC Guard</h2>
      </div>

      <nav style={{ flex: 1 }}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>

      <button
        onClick={logout}
        className="nav-link"
        style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', marginTop: 'auto' }}
      >
        <LogOut size={20} /> Logout
      </button>

      <div className="glass-card" style={{ padding: '16px', fontSize: '0.85rem', marginTop: '20px' }}>
        <p style={{ color: 'var(--text-muted)' }}>Security Level</p>
        <p style={{ marginTop: '4px', fontWeight: 600 }}>Enhanced Protection</p>
      </div>
    </sidebar>
  );
};

const PrivateRoute = ({ children }) => {
  const { token, loading } = useAuth();
  if (loading) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>Establishing secure connection...</div>;
  return token ? children : <Navigate to="/landing" />;
};

const PublicRoute = ({ children }) => {
  const { token, loading } = useAuth();
  if (loading) return null;
  return token ? <Navigate to="/" /> : children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/landing" element={<PublicRoute><LandingPage /></PublicRoute>} />
          <Route path="/auth" element={<PublicRoute><Auth /></PublicRoute>} />
          <Route path="/*" element={
            <PrivateRoute>
              <div className="grid-layout">
                <Sidebar />
                <main>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/vendors" element={<VendorList />} />
                    <Route path="/add-vendor" element={<AddVendor />} />
                  </Routes>
                </main>
              </div>
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
