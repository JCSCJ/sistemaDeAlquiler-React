package com.atuendos.repository;

import com.atuendos.model.Prenda;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PrendaRepository extends JpaRepository<Prenda, Long> {

    List<Prenda> findByTalla(String talla);

    List<Prenda> findByEstado(String estado);
}
