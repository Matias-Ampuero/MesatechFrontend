package com.mesatech.ms_solicitudes.controller;

import java.time.LocalDateTime;

public class SolicitudV2DTO {
    private Long id;
    private String titulo;
    private String descripcion;
    private String categoria;
    private String prioridad;
    private String usuarioSolicitante;
    private String estado;
    private LocalDateTime fechaCreacion;
    private String estadoNormalizado; // Campo agregado en v2

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) { this.categoria = categoria; }
    public String getPrioridad() { return prioridad; }
    public void setPrioridad(String prioridad) { this.prioridad = prioridad; }
    public String getUsuarioSolicitante() { return usuarioSolicitante; }
    public void setUsuarioSolicitante(String usuarioSolicitante) { this.usuarioSolicitante = usuarioSolicitante; }
    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
    public LocalDateTime getFechaCreacion() { return fechaCreacion; }
    public void setFechaCreacion(LocalDateTime fechaCreacion) { this.fechaCreacion = fechaCreacion; }
    public String getEstadoNormalizado() { return estadoNormalizado; }
    public void setEstadoNormalizado(String estadoNormalizado) { this.estadoNormalizado = estadoNormalizado; }
}
