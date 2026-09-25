package com.mesatech.ms_catalogo.repository;

import com.mesatech.ms_catalogo.entity.Catalogo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CatalogoRepository extends JpaRepository<Catalogo, Long> {
    List<Catalogo> findByTipo(String tipo);
}