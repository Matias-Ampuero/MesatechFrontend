import React, { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';

const OperadorView = () => {
    const [solicitudes, setSolicitudes] = useState([]);

    const cargarSolicitudes = async () => {
        try {
            const response = await apiClient.get('/solicitudes');
            setSolicitudes(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        cargarSolicitudes();
    }, []);

    const cambiarEstado = async (id, nuevoEstado) => {
        try {
            await apiClient.patch(`/solicitudes/${id}/estado`, { estado: nuevoEstado });
            cargarSolicitudes();
        } catch (error) {
            console.error(error);
            alert("Error al cambiar estado. Respeta el flujo de negocio.");
        }
    };

    const estadosDisponibles = ["CREADA", "ASIGNADA", "EN_PROCESO", "RESUELTA", "CERRADA"];

    const getStatusBadge = (estado) => {
        const est = estado?.toUpperCase() || '';
        if(est === 'CREADA') return 'badge badge-blue';
        if(est === 'EN_PROCESO' || est === 'ASIGNADA') return 'badge badge-yellow';
        if(est === 'RESUELTA' || est === 'CERRADA') return 'badge badge-green';
        return 'badge';
    };

    return (
        <div className="animate-fade-in">
            <h2 style={{ fontSize: '28px', marginBottom: '24px' }}>Gestión de Solicitudes (Operador)</h2>
            
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Título</th>
                            <th>Estado Actual</th>
                            <th>Cambiar Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {solicitudes.length === 0 ? (
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No hay solicitudes en el sistema</td>
                            </tr>
                        ) : (
                            solicitudes.map(s => (
                                <tr key={s.id}>
                                    <td><span className="text-muted">#{s.id}</span></td>
                                    <td style={{ fontWeight: 500 }}>{s.titulo}</td>
                                    <td><span className={getStatusBadge(s.estado)}>{s.estado}</span></td>
                                    <td>
                                        <select 
                                            value={s.estado}
                                            onChange={(e) => cambiarEstado(s.id, e.target.value)}
                                            style={{ padding: '6px 12px', fontSize: '13px', width: 'auto', backgroundColor: 'rgba(0,0,0,0.3)' }}
                                        >
                                            {estadosDisponibles.map(est => (
                                                <option key={est} value={est} style={{ color: 'black' }}>{est}</option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OperadorView;
