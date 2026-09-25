package com.mesatech.ms_solicitudes.service;

import com.mesatech.ms_solicitudes.entity.Solicitud;
import com.mesatech.ms_solicitudes.repository.SolicitudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Arrays;

@Service
public class SolicitudService {

    @Autowired
    private SolicitudRepository repository;

    public Solicitud crearSolicitud(Solicitud solicitud) {
        if (solicitud.getEstado() == null || solicitud.getEstado().isEmpty()) {
            solicitud.setEstado("CREADA");
        }
        return repository.save(solicitud);
    }

    public List<Solicitud> obtenerMisSolicitudes(String usuario) {
        return repository.findByUsuarioSolicitante(usuario);
    }

    public List<Solicitud> obtenerTodas() {
        return repository.findAll();
    }

    public Solicitud actualizarEstado(Long id, String nuevoEstado) {
        Solicitud solicitud = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Solicitud no encontrada"));

        String estadoActual = solicitud.getEstado().toUpperCase();
        String estadoNuevo = nuevoEstado.toUpperCase();

        if (estadoActual.equals(estadoNuevo)) {
            return solicitud;
        }

        if (estadoNuevo.equals("CANCELADA")) {
            solicitud.setEstado(estadoNuevo);
            return repository.save(solicitud);
        }

        boolean transitionValid = false;

        switch (estadoActual) {
            case "CREADA":
                if (estadoNuevo.equals("ASIGNADA")) transitionValid = true;
                break;
            case "ASIGNADA":
                if (estadoNuevo.equals("EN_PROCESO")) transitionValid = true;
                break;
            case "EN_PROCESO":
                if (estadoNuevo.equals("RESUELTA")) transitionValid = true;
                break;
            case "RESUELTA":
                if (estadoNuevo.equals("CERRADA")) transitionValid = true;
                break;
            case "CERRADA":
            case "CANCELADA":
                throw new RuntimeException("Regla de negocio: No se puede cambiar el estado de una solicitud " + estadoActual);
        }

        if (!transitionValid) {
            throw new RuntimeException("Regla de negocio: Transicion invalida de " + estadoActual + " a " + estadoNuevo + ". El flujo debe ser CREADA -> ASIGNADA -> EN_PROCESO -> RESUELTA -> CERRADA.");
        }

        solicitud.setEstado(estadoNuevo);
        return repository.save(solicitud);
    }
}