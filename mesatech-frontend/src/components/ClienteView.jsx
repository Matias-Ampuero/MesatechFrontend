import React, { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';

const ClienteView = () => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [nuevaSolicitud, setNuevaSolicitud] = useState({
        titulo: '',
        descripcion: '',
        categoria: '',
        prioridad: ''
    });

    const cargarSolicitudes = async () => {
        try {
            const response = await apiClient.get('/solicitudes/mias');
            setSolicitudes(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        cargarSolicitudes();
    }, []);

    const handleChange = (e) => {
        setNuevaSolicitud({
            ...nuevaSolicitud,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiClient.post('/solicitudes', nuevaSolicitud);
            cargarSolicitudes();
            setNuevaSolicitud({ titulo: '', descripcion: '', categoria: '', prioridad: '' });
        } catch (error) {
            console.error(error);
        }
    };

    const getStatusBadge = (estado) => {
        const est = estado?.toUpperCase() || '';
        if(est === 'CREADA') return 'badge badge-blue';
        if(est === 'EN_PROCESO' || est === 'ASIGNADA') return 'badge badge-yellow';
        if(est === 'RESUELTA' || est === 'CERRADA') return 'badge badge-green';
        return 'badge';
    };

    return (
        <div className="animate-fade-in">
            <h2 style={{ fontSize: '28px', marginBottom: '24px' }}>Mis Solicitudes de Soporte</h2>
            
            <div className="glass-panel" style={{ marginBottom: '32px' }}>
                <h3 style={{ marginBottom: '16px', fontSize: '18px' }}>Crear Nueva Solicitud</h3>
                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <input name="titulo" value={nuevaSolicitud.titulo} onChange={handleChange} placeholder="Título de la incidencia" required />
                        <input name="categoria" value={nuevaSolicitud.categoria} onChange={handleChange} placeholder="Categoría (Ej: Hardware)" required />
                        <input name="prioridad" value={nuevaSolicitud.prioridad} onChange={handleChange} placeholder="Prioridad (Ej: ALTA)" required />
                    </div>
                    <textarea 
                        name="descripcion" 
                        value={nuevaSolicitud.descripcion} 
                        onChange={handleChange} 
                        placeholder="Describe el problema en detalle..." 
                        required 
                        style={{ 
                            background: 'rgba(0, 0, 0, 0.2)', 
                            border: '1px solid var(--border)', 
                            color: 'var(--text-main)', 
                            padding: '12px 16px', 
                            borderRadius: '8px',
                            minHeight: '100px',
                            fontFamily: 'Inter',
                            width: 'calc(100% - 32px)'
                        }} 
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button type="submit" className="btn btn-primary">
                            <svg style={{ marginRight: '8px' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                            Enviar Solicitud
                        </button>
                    </div>
                </form>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Título</th>
                            <th>Estado</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {solicitudes.length === 0 ? (
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No tienes solicitudes registradas</td>
                            </tr>
                        ) : (
                            solicitudes.map(s => (
                                <tr key={s.id}>
                                    <td><span className="text-muted">#{s.id}</span></td>
                                    <td style={{ fontWeight: 500 }}>{s.titulo}</td>
                                    <td><span className={getStatusBadge(s.estado)}>{s.estado}</span></td>
                                    <td className="text-muted">{new Date(s.fechaCreacion).toLocaleString()}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ClienteView;