package com.mesatech.ms_solicitudes.controller;

import com.mesatech.ms_solicitudes.entity.Solicitud;
import com.mesatech.ms_solicitudes.service.SolicitudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/v1/solicitudes")
public class SolicitudController {

    @Autowired
    private SolicitudService service;

    @PostMapping
    public ResponseEntity<Solicitud> crearSolicitud(@RequestBody Solicitud solicitud, @RequestHeader(value = "X-Usuario", required = false) String usuario) {
        if (solicitud.getUsuarioSolicitante() == null || solicitud.getUsuarioSolicitante().isEmpty()) {
            solicitud.setUsuarioSolicitante(usuario);
        }
        return ResponseEntity.ok(service.crearSolicitud(solicitud));
    }

    @GetMapping("/mias")
    public ResponseEntity<List<Solicitud>> obtenerMisSolicitudes(@RequestHeader("X-Usuario") String usuario) {
        return ResponseEntity.ok(service.obtenerMisSolicitudes(usuario));
    }

    @GetMapping
    public ResponseEntity<List<Solicitud>> obtenerTodas() {
        return ResponseEntity.ok(service.obtenerTodas());
    }

    @PatchMapping("/{id}/estado")
    public ResponseEntity<Solicitud> actualizarEstado(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(service.actualizarEstado(id, body.get("estado")));
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(RuntimeException ex) {
        if (ex.getMessage().contains("Regla de negocio")) {
            return ResponseEntity.status(409).body(ex.getMessage());
        }
        return ResponseEntity.status(400).body(ex.getMessage());
    }
}