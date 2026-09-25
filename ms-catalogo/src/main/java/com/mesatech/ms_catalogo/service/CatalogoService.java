package com.mesatech.ms_catalogo.service;

import com.mesatech.ms_catalogo.entity.Catalogo;
import com.mesatech.ms_catalogo.repository.CatalogoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CatalogoService {

    @Autowired
    private CatalogoRepository repository;

    public Catalogo guardarItem(Catalogo catalogo) {
        return repository.save(catalogo);
    }

    public List<Catalogo> obtenerTodos() {
        return repository.findAll();
    }

    public void eliminarItem(Long id) {
        repository.deleteById(id);
    }
}