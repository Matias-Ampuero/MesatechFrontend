import React, { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';

const AdminView = () => {
    const [catalogo, setCatalogo] = useState([]);
    const [nuevoItem, setNuevoItem] = useState({ tipo: '', valor: '' });

    const cargarCatalogo = async () => {
        try {
            const response = await apiClient.get('/catalogo');
            setCatalogo(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        cargarCatalogo();
    }, []);

    const handleChange = (e) => {
        setNuevoItem({
            ...nuevoItem,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiClient.post('/catalogo', nuevoItem);
            cargarCatalogo();
            setNuevoItem({ tipo: '', valor: '' });
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await apiClient.delete(`/catalogo/${id}`);
            cargarCatalogo();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="animate-fade-in">
            <h2 style={{ fontSize: '28px', marginBottom: '24px' }}>Mantenedor de Catálogo</h2>
            
            <div className="glass-panel" style={{ marginBottom: '32px' }}>
                <h3 style={{ marginBottom: '16px', fontSize: '18px' }}>Agregar Nuevo Ítem</h3>
                <form onSubmit={handleSubmit} className="form-group" style={{ marginBottom: 0 }}>
                    <input name="tipo" value={nuevoItem.tipo} onChange={handleChange} placeholder="Tipo (Categoría/Prioridad)" required />
                    <input name="valor" value={nuevoItem.valor} onChange={handleChange} placeholder="Valor" required />
                    <button type="submit" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
                        <svg style={{ marginRight: '8px' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        Agregar Ítem
                    </button>
                </form>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tipo</th>
                            <th>Valor</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {catalogo.length === 0 ? (
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No hay ítems en el catálogo</td>
                            </tr>
                        ) : (
                            catalogo.map(item => (
                                <tr key={item.id}>
                                    <td><span className="text-muted">#{item.id}</span></td>
                                    <td><span className="badge badge-purple">{item.tipo}</span></td>
                                    <td style={{ fontWeight: 500 }}>{item.valor}</td>
                                    <td>
                                        <button onClick={() => handleDelete(item.id)} className="btn btn-danger" style={{ padding: '6px 12px', fontSize: '12px' }}>
                                            Eliminar
                                        </button>
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

export default AdminView;
