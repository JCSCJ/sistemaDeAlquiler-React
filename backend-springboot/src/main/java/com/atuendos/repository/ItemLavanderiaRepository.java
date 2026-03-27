package com.atuendos.repository;

import com.atuendos.model.ItemLavanderia;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemLavanderiaRepository extends JpaRepository<ItemLavanderia, Long> {

    List<ItemLavanderia> findByPrioridad(boolean prioridad);
}
