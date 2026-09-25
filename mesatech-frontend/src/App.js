import React from 'react';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { loginRequest } from './authConfig';
import Dashboard from './components/Dashboard';
import ClienteView from './components/ClienteView';
import OperadorView from './components/OperadorView';
import AdminView from './components/AdminView';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';

function NavLinks() {
  const location = useLocation();
  const getStyle = (path) => location.pathname === path ? { color: 'var(--text-main)', background: 'rgba(255, 255, 255, 0.1)' } : {};

  return (
    <nav className="nav-menu">
      <Link to="/" className="nav-link" style={getStyle('/')}>Dashboard</Link>
      <Link to="/cliente" className="nav-link" style={getStyle('/cliente')}>Portal Cliente</Link>
      <Link to="/operador" className="nav-link" style={getStyle('/operador')}>Portal Operador</Link>
      <Link to="/admin" className="nav-link" style={getStyle('/admin')}>Portal Admin</Link>
    </nav>
  );
}

function App() {
  const { instance, accounts } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect(loginRequest).catch(e => {
      console.error(e);
    });
  };

  const handleLogout = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: "/",
    });
  };

  return (
    <Router>
      <div className="app-container animate-fade-in">
        <header className="header">
          <h1 className="header-logo text-gradient">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            MesaTech Cloud
          </h1>
          <AuthenticatedTemplate>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span className="text-muted" style={{ fontSize: '14px' }}>
                👋 {accounts.length > 0 ? accounts[0].name : "Usuario"}
              </span>
              <button onClick={handleLogout} className="btn btn-danger">
                Cerrar sesión
              </button>
            </div>
          </AuthenticatedTemplate>
        </header>
        
        <main>
          <AuthenticatedTemplate>
            <NavLinks />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/cliente" element={
                <ProtectedRoute role="ROLE_CLIENTE">
                  <ClienteView />
                </ProtectedRoute>
              } />
              <Route path="/operador" element={
                <ProtectedRoute role="ROLE_OPERADOR">
                  <OperadorView />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute role="ROLE_ADMINISTRATOR">
                  <AdminView />
                </ProtectedRoute>
              } />
              <Route path="/acceso-denegado" element={
                <div className="glass-panel" style={{ textAlign: 'center', borderColor: 'var(--accent-red)' }}>
                  <h3 style={{ color: 'var(--accent-red)', fontSize: '24px' }}>🛡️ Acceso Denegado</h3>
                  <p className="text-muted">No tienes los permisos necesarios para ver esta página.</p>
                </div>
              } />
            </Routes>
          </AuthenticatedTemplate>

          <UnauthenticatedTemplate>
            <div className="glass-panel" style={{ textAlign: 'center', marginTop: '100px', maxWidth: '400px', margin: '100px auto' }}>
              <h2 style={{ marginBottom: '8px' }}>Bienvenido</h2>
              <p className="text-muted" style={{ marginBottom: '32px' }}>Inicia sesión para acceder a la plataforma corporativa</p>
              <button onClick={handleLogin} className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
                <svg style={{ marginRight: '8px' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
                Iniciar sesión con Microsoft
              </button>
            </div>
          </UnauthenticatedTemplate>
        </main>
      </div>
    </Router>
  );
}

export default App;