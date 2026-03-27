package com.atuendos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.atuendos.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
}