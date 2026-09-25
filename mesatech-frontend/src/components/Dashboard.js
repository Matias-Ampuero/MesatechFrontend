import React, { useEffect, useState } from 'react';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../authConfig';
import { jwtDecode } from 'jwt-decode';

const Dashboard = () => {
    const { instance, accounts } = useMsal();
    const account = accounts[0];
    
    const [roles, setRoles] = useState([]);
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        if (account) {
            instance.acquireTokenSilent({
                ...loginRequest,
                account: account
            }).then((response) => {
                setAccessToken(response.accessToken);
                const decodedToken = jwtDecode(response.accessToken);
                setRoles(decodedToken.roles || []);
            }).catch((error) => {
                console.error("Error obteniendo el Access Token:", error);
            });
        }
    }, [account, instance]);

    return (
        <div className="animate-fade-in">
            <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '32px', marginBottom: '8px' }}>Dashboard Principal</h2>
                <p className="text-muted">Tus roles asignados: <span style={{ color: 'var(--primary)' }}>{roles.length > 0 ? roles.join(', ') : 'Ninguno'}</span></p>
            </div>

            <div className="cards-grid">
                {/* Vista para el Administrador */}
                {roles.includes('ROLE_ADMINISTRATOR') && (
                    <div className="glass-panel">
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-red-hover)' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                            Vista de Administrador
                        </h3>
                        <ul style={{ color: 'var(--text-muted)', lineHeight: '1.8', paddingLeft: '20px' }}>
                            <li>Ver todas las solicitudes de soporte</li>
                            <li>Gestionar el catálogo de categorías y prioridades</li>
                            <li>Cambiar estado de solicitudes</li>
                        </ul>
                    </div>
                )}

                {/* Vista para el Operador */}
                {roles.includes('ROLE_OPERADOR') && (
                    <div className="glass-panel">
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--secondary)' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
                            Vista de Operador
                        </h3>
                        <ul style={{ color: 'var(--text-muted)', lineHeight: '1.8', paddingLeft: '20px' }}>
                            <li>Ver solicitudes asignadas o disponibles</li>
                            <li>Actualizar estados (Ej: A "En Proceso", "Resuelta")</li>
                            <li>Registrar la atención realizada</li>
                        </ul>
                    </div>
                )}

                {/* Vista para el Cliente */}
                {roles.includes('ROLE_CLIENTE') && (
                    <div className="glass-panel">
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-green)' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            Vista de Cliente
                        </h3>
                        <ul style={{ color: 'var(--text-muted)', lineHeight: '1.8', paddingLeft: '20px' }}>
                            <li>Crear nuevas solicitudes de soporte</li>
                            <li>Consultar el estado de tus solicitudes creadas</li>
                        </ul>
                    </div>
                )}

                {/* Si no tiene ningún rol */}
                {roles.length === 0 && (
                    <div className="glass-panel" style={{ borderColor: 'var(--accent-yellow)' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fbbf24' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                            Sin permisos
                        </h3>
                        <p className="text-muted">Tu cuenta no tiene ningún rol asignado. Contacta al administrador del sistema.</p>
                    </div>
                )}
            </div>

            {accessToken && (
                <div className="glass-panel" style={{ marginTop: '24px', padding: '16px' }}>
                    <p style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600' }}>🔑 Token de Acceso (Debug):</p>
                    <code style={{ wordBreak: 'break-all', fontSize: '12px', color: 'var(--text-muted)' }}>
                        {accessToken.substring(0, 100)}...
                    </code>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
