package com.atuendos.repository;

import com.atuendos.model.Alquiler;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlquilerRepository extends JpaRepository<Alquiler, Long> {

    List<Alquiler> findByClienteId(Long clienteId);

    List<Alquiler> findByEstado(String estado);

    List<Alquiler> findByClienteIdAndEstado(Long clienteId, String estado);
}
