package com.mesatech.ms_solicitudes.controller;

import com.mesatech.ms_solicitudes.entity.Solicitud;
import com.mesatech.ms_solicitudes.service.SolicitudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/v2/solicitudes")
public class SolicitudV2Controller {

    @Autowired
    private SolicitudService service;

    // V2: Retorna las solicitudes pero añade el campo "estadoNormalizado" que combina estado y prioridad (ej: "ALTA - CREADA")
    // Esto demuestra la coexistencia de v1 y v2.
    @GetMapping
    public ResponseEntity<List<SolicitudV2DTO>> obtenerTodasV2() {
        List<Solicitud> solicitudes = service.obtenerTodas();
        
        List<SolicitudV2DTO> response = solicitudes.stream().map(s -> {
            SolicitudV2DTO dto = new SolicitudV2DTO();
            dto.setId(s.getId());
            dto.setTitulo(s.getTitulo());
            dto.setDescripcion(s.getDescripcion());
            dto.setCategoria(s.getCategoria());
            dto.setPrioridad(s.getPrioridad());
            dto.setUsuarioSolicitante(s.getUsuarioSolicitante());
            dto.setEstado(s.getEstado());
            dto.setFechaCreacion(s.getFechaCreacion());
            
            // Nueva logica añadida en v2
            dto.setEstadoNormalizado(s.getPrioridad() + " - " + s.getEstado());
            return dto;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }
}
