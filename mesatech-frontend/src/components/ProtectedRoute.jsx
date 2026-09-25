import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../authConfig';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ role, roles, children }) => {
    const { instance, accounts } = useMsal();
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        const checkRole = async () => {
            if (accounts.length > 0) {
                try {
                    const response = await instance.acquireTokenSilent({
                        ...loginRequest,
                        account: accounts[0]
                    });
                    
                    const decodedToken = jwtDecode(response.accessToken);
                    const userRoles = decodedToken.roles || [];
                    
                    const allowedRoles = roles || [role];
                    const hasAccess = allowedRoles.some(r => userRoles.includes(r));
                    
                    if (hasAccess) {
                        setIsAuthorized(true);
                    } else {
                        setIsAuthorized(false);
                    }
                } catch (error) {
                    console.error("Error al obtener token para validar rol:", error);
                    setIsAuthorized(false);
                }
            } else {
                setIsAuthorized(false);
            }
        };

        checkRole();
    }, [instance, accounts, role]);

    if (isAuthorized === null) {
        return <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>Verificando permisos...</div>;
    }

    if (!isAuthorized) {
        return <Navigate to="/acceso-denegado" replace />;
    }
    
    return children;
};

export default ProtectedRoute;
