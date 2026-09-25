package com.mesatech.ms_catalogo.controller;

import com.mesatech.ms_catalogo.entity.Catalogo;
import com.mesatech.ms_catalogo.service.CatalogoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/v1/catalogo")
public class CatalogoController {

    @Autowired
    private CatalogoService service;

    @GetMapping
    public ResponseEntity<List<Catalogo>> obtenerCatalogo() {
        return ResponseEntity.ok(service.obtenerTodos());
    }

    @PostMapping
    public ResponseEntity<Catalogo> crearItem(@RequestBody Catalogo catalogo) {
        return ResponseEntity.ok(service.guardarItem(catalogo));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarItem(@PathVariable Long id) {
        service.eliminarItem(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Catalogo> actualizarItem(@PathVariable Long id, @RequestBody Catalogo catalogo) {
        catalogo.setId(id);
        return ResponseEntity.ok(service.guardarItem(catalogo));
    }
}